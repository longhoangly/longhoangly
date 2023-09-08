export class Base {
    static #ENABLED_DEBUG_LOG = false;

    static #ENABLED_DEBUG_TRACE = false;

    static RESPONSE_TYPE = {
        TEXT: "text",
        JSON: "json",
        RESPONSE: "response",
    };

    static jsonToString(json) {
        try {
            if (typeof json === "object") {
                json = JSON.stringify(json);
            } else {
                json = JSON.stringify(JSON.parse(json));
            }
        } catch (error) {
            Base.logDebug(
                "Error while converting json object to string...please check json format...",
                error
            );
        } finally {
            return json;
        }
    }

    static stringToJson(jsonStr) {
        let json = jsonStr;
        try {
            json = JSON.parse(jsonStr);
        } catch (error) {
            Base.logDebug(
                "Error while converting string to json object...please check json format...",
                error
            );
        } finally {
            return json;
        }
    }

    static async removeStorage(keys) {
        for (const key of keys) {
            Base.logInfo("Removing storage key:", key);
            localStorage.removeItem(key);
        }
        Base.logInfo("Removed all storage keys:", keys);
    }

    static async getStorage(key) {
        let value = localStorage.getItem(key);

        if (Base.isValidJson(value)) {
            value = Base.stringToJson(value);
        } else if (value === "true" || value === "false") {
            value = value === "true";
        }

        Base.logInfo("Getting storage...", key, value);
        return value;
    }

    static async setStorage(key, value) {
        Base.logInfo("Saving storage...", key, value);

        if (Base.isValidJson(value)) {
            value = Base.jsonToString(value);
        }

        localStorage.setItem(key, value);
    }

    static async getJsonStorage(keysChain) {
        if (keysChain.length === 0) {
            throw new Error("keysChain must have at least two keys.");
        }

        let firstKey = keysChain.shift();
        let json = await Base.getStorage(firstKey);

        let value = await Base.#getJsonValue(keysChain, json);
        Base.logDebug("Return storage JSON...", value);

        return value;
    }

    static async #getJsonValue(keysChain, json) {
        Base.logDebug("Getting value from", json, "by", keysChain);

        if (json) {
            if (keysChain.length === 1) {
                return json[keysChain.shift()];
            } else {
                let firstKey = keysChain.shift();
                return Base.#getJsonValue(keysChain, json[firstKey]);
            }
        } else {
            return undefined;
        }
    }

    static async setJsonStorage(keysChain, value) {
        if (keysChain.length === 0) {
            throw new Error("keysChain must have at least two keys.");
        }

        let firstKey = keysChain.shift();
        let json = await Base.getStorage(firstKey);

        let storedJson = await Base.#setJsonValue(keysChain, value, json);
        Base.logDebug("Saving storage JSON...", storedJson);

        await Base.setStorage(firstKey, storedJson);
        return storedJson;
    }

    static async #setJsonValue(keysChain, value, json) {
        Base.logDebug("Setting", value, "to", json, "by", keysChain);

        if (json) {
            if (keysChain.length === 1) {
                json[keysChain.shift()] = value;
                return json;
            } else {
                let firstKey = keysChain.shift();
                let subJson = await Base.#setJsonValue(
                    keysChain,
                    value,
                    json[firstKey]
                );
                json[firstKey] = subJson;
                return json;
            }
        } else {
            json = {};
            json[keysChain.shift()] = value;
            return json;
        }
    }

    static logSuccess(...args) {
        console.log(
            Base.#decorLogMsg(args),
            "color: lightgreen",
            "[Logger]",
            ...args
        );

        if (Base.#ENABLED_DEBUG_TRACE) {
            console.trace();
        }
    }

    static logWarning(...args) {
        console.log(
            Base.#decorLogMsg(args),
            "color: darkorange",
            "[Logger]",
            ...args
        );

        if (Base.#ENABLED_DEBUG_TRACE) {
            console.trace();
        }
    }

    static logInfo(...args) {
        console.log(
            Base.#decorLogMsg(args),
            "color: darkgray",
            "[Logger]",
            ...args
        );

        if (Base.#ENABLED_DEBUG_TRACE) {
            console.trace();
        }
    }

    static logError(...args) {
        console.log(Base.#decorLogMsg(args), "color: red", "[Logger]", ...args);

        if (Base.#ENABLED_DEBUG_TRACE) {
            console.trace();
        }
    }

    static logDebug(...args) {
        if (Base.#ENABLED_DEBUG_LOG) {
            console.log(
                Base.#decorLogMsg(args),
                "color: red",
                "[Logger]",
                ...args
            );
        }

        if (Base.#ENABLED_DEBUG_TRACE) {
            console.trace();
        }
    }

    static #decorLogMsg(args) {
        let msgConfig = "%c%s ";

        args.forEach((argument) => {
            const type = typeof argument;
            switch (type) {
                case "bigint":
                    msgConfig += "%o ";
                    break;
                case "number":
                    msgConfig += "%o ";
                    break;
                case "boolean":
                    msgConfig += "%o ";
                    break;
                case "string":
                    msgConfig += "%s ";
                    break;
                case "object":
                    msgConfig += "%o ";
                    break;
                case "undefined":
                    msgConfig += "%o ";
                    break;
                default:
                    msgConfig += "%o ";
            }
        });

        return msgConfig;
    }

    static async fetchWithRetries(
        url,
        headers,
        method = "GET",
        payload = null,
        resType = Base.RESPONSE_TYPE.JSON
    ) {
        let retryTimes = await Base.getStorage("retryTimes");
        let retryInterval = await Base.getStorage("retryInterval");
        let retryCodes = (await Base.getStorage("retryCodes"))
            .split(",")
            .filter(Boolean);

        let json;
        let requestCount = 0;
        do {
            json = await Base.fetchNeutral(
                url,
                headers,
                method,
                payload,
                resType
            );

            requestCount++;
            if (json.error === undefined || requestCount === retryTimes) {
                break;
            }
            await Base.delayTime(retryInterval);
        } while (
            json.error !== undefined &&
            retryCodes.includes(json.error.code)
        );

        return json;
    }

    static async fetchNeutral(
        fetchUrl,
        headers,
        method = "GET",
        payload = null,
        resType = Base.RESPONSE_TYPE.JSON
    ) {
        if (payload !== null) {
            if (Base.isValidJson(payload)) {
                payload = Base.jsonToString(payload);
            }

            if (payload instanceof FormData) {
                let formData = {};
                for (const pair of payload.entries()) {
                    formData[pair[0]] = pair[1];
                }

                Base.logDebug(
                    method,
                    "FetchURL",
                    fetchUrl,
                    "Headers",
                    headers,
                    "Payload",
                    formData
                );
            }
        }

        let reqOptions = {
            method: method,
            headers: new Headers(headers),
            body: payload,
            redirect: "follow",
            credentials: "include",
            mode: "cors",
            referrer: fetchUrl,
            referrerPolicy: "strict-origin-when-cross-origin",
        };

        let response;
        let finalResponse;

        try {
            response = await Base.fetchWithTimeout(fetchUrl, reqOptions);
            try {
                if (resType === Base.RESPONSE_TYPE.TEXT) {
                    finalResponse = await response.text();
                } else if (resType === Base.RESPONSE_TYPE.JSON) {
                    finalResponse = await response.clone().json();
                } else if (resType === Base.RESPONSE_TYPE.RESPONSE) {
                    finalResponse = response;
                }

                if (!response.ok || response.status !== 200) {
                    Base.logError(
                        method,
                        "FetchURL",
                        fetchUrl,
                        "Payload",
                        payload,
                        "Response",
                        response
                    );
                } else {
                    Base.logInfo(
                        method,
                        fetchUrl,
                        "Payload",
                        payload,
                        "Response",
                        finalResponse
                    );
                }
            } catch (error) {
                finalResponse = await response.text();
                Base.logError(
                    method,
                    "FetchURL",
                    fetchUrl,
                    "Payload",
                    payload,
                    "Response",
                    response,
                    "Error",
                    error
                );
            }
        } catch (error) {
            Base.logError(
                method,
                "FetchURL",
                fetchUrl,
                "Payload",
                payload,
                "Response",
                response,
                "Error",
                error
            );
        }

        return finalResponse;
    }

    static async fetchWithTimeout(url, options = {}, reqTimeout = 30) {
        let storageTimeout = await Base.getStorage("requestTimeout");
        if (storageTimeout) {
            reqTimeout = storageTimeout;
        }
        const { timeout = reqTimeout * 1000 } = options;

        const abortController = new AbortController();
        const id = setTimeout(() => abortController.abort(), timeout);

        const response = await fetch(url, {
            ...options,
            signal: abortController.signal,
        });

        clearTimeout(id);
        return response;
    }

    static async getJsonContent(jsonPath) {
        Base.logInfo("JQuery getting JSON file.", jsonPath);
        let json = await $.getJSON(jsonPath, (data) => {
            Base.logInfo("Json", data);
        }).fail((err) => {
            Base.logError("an error has occurred.", err);
        });
        return json;
    }

    static async getHtmlContent(url) {
        Base.logInfo("JQuery getting HTML content.", url);
        let html = await $.get(url, (data) => {
            Base.logInfo("Html", data);
        }).fail((err) => {
            Base.logError("an error has occurred.", err);
        });
        return html;
    }

    static async fetchJsonContent(jsonPath) {
        Base.logInfo("JS navitve fetching JSON file.", jsonPath);
        let response = await fetch(jsonPath);
        let json = await response.json();
        Base.logSuccess("Json", json);
        return json;
    }

    static getWeekNo(offset) {
        let currentdate = new Date();
        var oneJan = new Date(currentdate.getFullYear(), 0, 1);

        var numberOfDays =
            (currentdate.getTime() - oneJan.getTime()) / (24 * 60 * 60 * 1000);

        var weekNo =
            Math.ceil((currentdate.getDay() + 1 + numberOfDays) / 7) + offset;

        Base.logWarning(
            `The week number of the date (${currentdate}) is ${currentdate.getFullYear()}-W${String(
                weekNo
            ).padStart(2, "0")}.`
        );

        return `${currentdate.getFullYear()}-W${String(weekNo).padStart(
            2,
            "0"
        )}`;
    }

    static async getCookie(url, cookieName) {
        let cookie = await chrome.cookies.get({
            url: url,
            name: cookieName,
        });

        if (cookie !== null && cookie != undefined && cookie.value) {
            Base.logInfo("Found cookie", url, cookie.value);
            return cookie.value;
        }

        Base.logWarning("Cookie not found!!", url);
    }

    static isValidJson(value) {
        if (typeof value === "object" || Array.isArray(value)) {
            value = JSON.stringify(value);
        }

        try {
            JSON.parse(value);
            if (typeof value === "boolean" || value === "") {
                return false;
            } else {
                return true;
            }
        } catch (err) {
            return false;
        }
    }

    static async isNumber(value) {
        let matches = value.match(/^\d+$/g);
        return matches !== null && matches.length > 0;
    }

    static async openNewTab(url, isActive = false, forceOpenUrl = false) {
        let hostname = new URL(url).hostname;
        let tabs = await chrome.tabs.query({ url: `*://${hostname}/*` });
        Base.logInfo("tabs", tabs);

        if (tabs.length === 0 || forceOpenUrl) {
            Base.logInfo("Opening URL", url);

            let activeTab = await Base.getActiveTab();
            await chrome.tabs.create({
                url: url,
                active: isActive,
                index: parseInt(activeTab.index) + 1,
            });
        } else {
            Base.logInfo("URL already openned!", url);
        }
    }

    static async flattenJSON(obj = {}, res = {}, extraKey = "") {
        for (let key in obj) {
            if (
                typeof obj[key] !== "object" ||
                // We will return array of values. Array of object will be proceed recursive.
                (Array.isArray(obj[key]) &&
                    obj[key].length > 0 &&
                    typeof obj[key][0] !== "object")
            ) {
                res[extraKey + key] = obj[key];
            } else {
                await Base.flattenJSON(obj[key], res, `${extraKey}${key}.`);
            }
        }
        return res;
    }

    static async compareTwoJsonObjects(jsonA, jsonB) {
        let flattenJsonA = await Base.flattenJSON(jsonA);
        const sortObjectA = await Base.sortObject(flattenJsonA);

        let flattenJsonB = await Base.flattenJSON(jsonB);
        const sortObjectB = await Base.sortObject(flattenJsonB);

        return JSON.stringify(sortObjectA) === JSON.stringify(sortObjectB);
    }

    static async sortObject(obj) {
        return Object.keys(obj)
            .sort()
            .reduce((r, k) => ((r[k] = obj[k]), r), {});
    }

    static async removeJsonByKeys(obj = {}, keyList = []) {
        for (let key in obj) {
            if (!Array.isArray(obj) && !keyList.includes(key)) {
                delete obj[key];
            } else {
                if (typeof obj[key] === "object") {
                    await Base.removeJsonByKeys(obj[key], keyList);
                }
            }
        }
        return obj;
    }

    static async simpleEscape(str) {
        return str !== null ? str.replaceAll('"', '\\"') : null;
    }

    static async simpleUnescape(str) {
        return str !== null ? str.replaceAll('\\"', '"') : null;
    }

    static async encodeUriBase64(str) {
        return btoa(encodeURI(str));
    }

    static async decodeUriBase64(str) {
        return decodeURI(atob(str));
    }

    static convertObjToUrlParams(obj) {
        const formData = new URLSearchParams();
        for (const key in obj) {
            if (Array.isArray(obj[key]) || Base.isValidJson(obj[key])) {
                formData.append(key, Base.jsonToString(obj[key]));
            } else {
                formData.append(key, obj[key]);
            }
        }

        return formData.toString();
    }

    static async copyEditorTextToClipboard(editor) {
        navigator.clipboard.writeText(editor.getValue());
    }

    static async copyTextToClipboard(selector) {
        let copyText = document.querySelector(selector);

        copyText.select();
        /* For mobile devices */
        copyText.setSelectionRange(0, 99999);

        navigator.clipboard.writeText(copyText.value);
    }

    static distinctArray(arr) {
        return arr
            .filter(Boolean)
            .filter((value, index, array) => array.indexOf(value) === index);
    }

    static async sendMessageToTab(tabId, msgObj) {
        let promise = await new Promise((resolve, reject) => {
            chrome.tabs.sendMessage(tabId, msgObj, (response) => {
                Base.logWarning("response from tab", response);

                if (chrome.runtime.lastError) {
                    return reject(chrome.runtime.lastError);
                }
                resolve(response);
            });
        });

        return promise;
    }

    static async sendMessageToBackground(msgObj) {
        let promise = await new Promise((resolve, reject) => {
            chrome.runtime.sendMessage(msgObj, (response) => {
                Base.logWarning("response from background", response);

                if (chrome.runtime.lastError) {
                    return reject(chrome.runtime.lastError);
                }
                resolve(response);
            });
        });

        return promise;
    }

    static confirmAlert(msg) {
        if (!confirm(msg)) {
            throw new Error("You choose Cancel option!");
        }
    }

    static stopAlert(msg) {
        throw new Error(`Stoooop execution here!! Reason: ${msg}`);
    }

    static randomString(
        length,
        includedChars = false,
        includedSpecials = false
    ) {
        let random = "";

        for (let i = 0; i < length; i++) {
            let characters = i === 0 ? "123456789" : "0123456789";

            if (includedChars) {
                characters +=
                    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
            }

            if (includedSpecials) {
                characters += "!@#$%^&*()_+-={};':\"|.<>?";
            }

            random += characters.charAt(
                Math.floor(Math.random() * characters.length)
            );
        }

        return random;
    }

    static randomInt(max) {
        return Math.floor(Math.random() * max + 1);
    }

    // Compare two arrays
    static equalsIgnoreOrder(a, b) {
        if (a.length !== b.length) return false;
        const uniqueValues = new Set([...a, ...b]);

        for (const v of uniqueValues) {
            const aCount = a.filter((e) => e === v).length;
            const bCount = b.filter((e) => e === v).length;

            if (aCount !== bCount) return false;
        }

        return true;
    }

    static async compareTwoArrays(a, b) {
        let uniqueValues = new Set([...a, ...b]);
        uniqueValues = [...uniqueValues];

        let aDiff = uniqueValues.filter((e) => !b.includes(e));
        console.log("aDiff values", aDiff);

        let bDiff = uniqueValues.filter((e) => !a.includes(e));
        console.log("bDiff values", bDiff);

        let common = uniqueValues.filter((e) => a.includes(e) && b.includes(e));
        console.log("common values", common);

        return { aDiff: aDiff, bDiff: bDiff, common: common };
    }

    static uuid() {
        let dt = new Date().getTime();
        let uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
            /[xy]/g,
            (c) => {
                let r = (dt + Math.random() * 16) % 16 | 0;
                dt = Math.floor(dt / 16);
                return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
            }
        );

        return uuid;
    }

    static randomElement(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    static requiredField(fieldValue) {
        if (!fieldValue) {
            throw new Error(
                `Expected required field, but actual value is '${fieldValue}'`
            );
        }
    }

    static async delayTime(ms) {
        return new Promise((res) => {
            setTimeout(res, ms);
            Base.logInfo(`Waiting for ${ms} ms`);
        });
    }

    static async getActiveTab() {
        let [activeTab] = await chrome.tabs.query({
            active: true,
            currentWindow: true,
        });

        return activeTab;
    }

    static getDaysArray(start, end) {
        // From: "2021-06-09" to "2021-06-10"
        for (
            var arr = [], dt = new Date(start);
            dt <= end;
            dt.setDate(dt.getDate() + 1)
        ) {
            arr.push(new Date(dt));
        }
        return arr;
    }

    static getCurrentDate() {
        let tmpDate = new Date();
        console.debug("tmpDate.getTime()", tmpDate.getTime());

        let date = new Date(tmpDate.getTime());
        let localTimezone = (-1 * date.getTimezoneOffset()) / 60;

        // Get current date by Singapore timezone
        let timezone = +8;
        date.setHours(date.getHours() - localTimezone);
        date.setHours(date.getHours() + timezone);
        console.debug("date.getTime()", date.getTime());

        return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
            .toJSON()
            .slice(0, 10);
    }

    static async waitUntil(handler, retryInterval = 0, timeoutMilis = 60000) {
        if (retryInterval === 0) {
            retryInterval = await Base.getStorage("retryInterval");
        }

        let result;
        let isTrue = false;

        let maxChecks = parseInt(timeoutMilis / retryInterval);
        for (let index = 0; index < maxChecks; index++) {
            Base.logWarning(`Waiting until ${handler.name}...returns TRUE!!`);

            result = await handler();
            isTrue = result.isTrue;

            if (isTrue) {
                Base.logWarning(
                    `>>> Handler ${handler.name} returned ${isTrue}...STOP waiting!!`
                );
                break;
            }
            await Base.delayTime(retryInterval);
        }

        if (!isTrue) {
            Base.logError(
                `>>> Handler ${handler.name} is ${isTrue}!! Max check times reached!!`
            );
        }

        return result;
    }

    static async setElementColor(selector, colorCode) {
        // $(selector).css("cssText", `color: ${colorCode} !important`);
        $(selector).css("color", colorCode);
    }

    static setIntervalNoDelay(func, interval, ...args) {
        func(...args);
        return setInterval(func, interval, ...args);
    }

    static async disableElement(selector) {
        $(selector).prop("disabled", true);
    }

    static async enableElement(selector) {
        $(selector).prop("disabled", false);
    }

    static async sha256(message) {
        // encode as UTF-8
        const msgBuffer = new TextEncoder().encode(message);

        // hash the message
        const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);

        // convert ArrayBuffer to Array
        const hashArray = Array.from(new Uint8Array(hashBuffer));

        // convert bytes to hex string
        const hashHex = hashArray
            .map((b) => b.toString(16).padStart(2, "0"))
            .join("");

        Base.logWarning(message, "hased 256 to", hashHex);

        return hashHex;
    }
}
