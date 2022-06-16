class Common {
    static TODAY = Common.getCurrentDate();

    static AUTO_COMPLETE_FIELDS = ["xxx"];

    static getCurrentDate(timezone = +7) {
        let tmpDate = new Date();
        console.debug("getTime()", tmpDate.getTime());

        let date = new Date(tmpDate.getTime());
        let localTimezone = (-1 * date.getTimezoneOffset()) / 60;

        // Get current date by Singapore timezone
        date.setHours(date.getHours() - localTimezone + timezone);
        console.debug("getTime()", date.getTime());

        return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
            .toJSON()
            .slice(0, 10);
    }

    static getDaysArray(start, end) {
        // Start: "2021-06-09" to End: "2021-06-10"
        let from = new Date(start);
        let to = new Date(end);

        for (
            var arr = [], dt = new Date(from);
            dt <= to;
            dt.setDate(dt.getDate() + 1)
        ) {
            arr.push(new Date(dt));
        }
        return arr;
    }

    static async delayMilis(ms) {
        return new Promise((res) => {
            setTimeout(res, ms);
            console.log(`Waited for ${ms} ms`);
        });
    }

    static async delaySeconds(seconds) {
        return new Promise((res) => {
            setTimeout(res, seconds * 1000);
            console.log(`Waited for ${seconds} seconds`);
        });
    }

    static async displayAlert(
        message,
        isSuccess = true,
        id = "alert",
        timeout = 5
    ) {
        if (isSuccess) {
            $(`#${id}`).attr("class", "alert alert-success");
        } else {
            $(`#${id}`).attr("class", "alert alert-danger");
        }

        $(`#${id}`).html(message);
        $(`#${id}`).attr("style", "display: block;");

        await Common.delayMilis(timeout * 1000);
        $(`#${id}`).attr("style", "display: none;");
    }

    static async inputHandler(event) {
        let elementId = event.data.elementId;

        let tagName = $(`#${elementId}`).prop("tagName");
        if (tagName === undefined) {
            tagName = $(`[name='${elementId}']`).prop("tagName");
        }

        let type = $(`#${elementId}`).prop("type");
        if (type === undefined) {
            type = $(`[name='${elementId}']`).prop("type");
        }

        let input = $(`#${elementId}`).val();
        // DROPDOWN value
        if (tagName === "SELECT") {
            input = $(`#${elementId} option:selected`).val();
        }

        // Remove newline
        if (input && input.includes("\n")) {
            input = input.replaceAll("\n", "+++");
        }

        // CHECKBOX value
        if (tagName === "INPUT" && type === "checkbox") {
            input = $(`#${elementId}`).prop("checked");
        }

        // RADIO value
        if (tagName === "INPUT" && type === "radio") {
            input = $(`input[name='${elementId}']:checked`).val();
        }

        await Common.setStorage(`${elementId}`, input);

        let output = await Common.getStorage(`${elementId}`);
        console.log(`${elementId}`, `[${output}]`);

        if (Common.AUTO_COMPLETE_FIELDS.includes(elementId)) {
            if (input !== undefined && input !== null && input.length > 6) {
                let histories = await Common.getStorage(
                    `${elementId}-history`,
                    true
                );
                histories = histories.reverse();

                if (
                    !histories.includes(input) &&
                    input !== undefined &&
                    input !== null
                ) {
                    histories.push(input);
                }

                if (histories.length > 20) {
                    histories = histories.slice(
                        histories.length - 20,
                        histories.length
                    );
                }
                histories = histories.reverse();

                await Common.setStorage(
                    `${elementId}-history`,
                    histories,
                    true
                );
            }

            let storageHistories = await Common.getStorage(
                `${elementId}-history`,
                true
            );
            console.log(elementId, "histories", storageHistories);

            await Common.makeAutoCompleteField(elementId, storageHistories);
        }
    }

    static async getFieldValue(
        storageKey,
        defaultValue = "",
        isObject = false
    ) {
        let storageValue = await Common.getStorage(storageKey, isObject);
        if (!storageValue) {
            await Common.setStorage(
                storageKey,
                isObject
                    ? Common.convertObjectToBase64String(defaultValue)
                    : defaultValue.replaceAll("\n", "+++"),
                isObject
            );
        }

        let returnValue = await Common.getStorage(storageKey, isObject);
        return isObject ? returnValue : returnValue.replaceAll("+++", "\n");
    }

    static jsonStringifyWithIndents(str) {
        try {
            str = JSON.stringify(jsonToObject(str), null, 4);
        } catch (error) {
            console.warn(
                "Error while formating json string...please check json format..."
            );
        } finally {
            return str;
        }
    }

    static jsonStringify(str) {
        try {
            str = JSON.stringify(jsonToObject(str));
        } catch (error) {
            console.warn(
                "Error while formating json string...please check json format..."
            );
        } finally {
            return str;
        }
    }

    static jsonToObject(jsonStr) {
        try {
            jsonStr = JSON.parse(jsonStr);
        } catch (error) {
            console.warn(
                "Error while converting json object...please check json format..."
            );
        } finally {
            return [jsonStr];
        }
    }

    static async compareArraysIgnoreOrder(a, b) {
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

    static async setupEditor(editorId, maxLines = 15, minLines = 5) {
        let editor = ace.edit(editorId, {
            theme: "ace/theme/solarized_light",
            mode: "ace/mode/text",
            autoScrollEditorIntoView: true,
        });

        if (maxLines !== 0) {
            editor.setOptions({
                maxLines: maxLines,
                minLines: minLines,
            });
        }

        let editorElement = document.getElementById(editorId);
        editorElement.style.fontSize = "16px";
        editorElement.style.color = "#586E75";
        editorElement.style.background = "lightyellow";

        return editor;
    }

    static randomNumericId(length) {
        let random = "";
        for (let i = 0; i < length; i++) {
            let characters = i === 0 ? "123456789" : "0123456789";
            random += characters.charAt(
                Math.floor(Math.random() * characters.length)
            );
        }

        return random;
    }

    static uuid() {
        var dt = new Date().getTime();
        var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
            /[xy]/g,
            (c) => {
                var r = (dt + Math.random() * 16) % 16 | 0;
                dt = Math.floor(dt / 16);
                return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
            }
        );
        return uuid;
    }

    static confirmation(msg) {
        if (!confirm(msg)) {
            throw new Error(`Answer NO for the question: ${msg}`);
        }
    }

    static escapeStr(str) {
        return str !== null ? str.replaceAll('"', '\\"') : str;
    }

    static async copyTextToClipboard(selector) {
        let copyText = document.querySelector(selector);
        copyText.select();
        /* For mobile devices */
        copyText.setSelectionRange(0, 99999);
        navigator.clipboard.writeText(copyText.value);
    }

    static async getUniqueArray(array) {
        return array
            .filter(Boolean)
            .filter((value, index, arr) => arr.indexOf(value) === index);
    }

    static async makeAutoCompleteField(elementId, source) {
        $(`#${elementId}`)
            .autocomplete({
                minLength: 0,
                source: source,
                select: async (event, ui) => {
                    $(`#${elementId}`).val(ui.item.label);
                    await Common.setStorage(elementId, ui.item.label);
                    console.debug(elementId, `[${ui.item.label}]`);
                },
            })
            .on("focus", async () => {
                $(`#${elementId}`).autocomplete(
                    "search",
                    $(`#${elementId}`).val()
                );
            })
            .on("blur", async () => {
                $(`#${elementId}`).val(await Common.getStorage(elementId));
            });
    }

    static async removeStorage(keys) {
        for (const key of keys) {
            console.debug("Removing storage key:", key);
            localStorage.removeItem(key);
        }
        console.debug("Removed all keys:", keys);
    }

    static async getStorage(key, isObject = false) {
        let value = localStorage.getItem(key);
        if (isObject) {
            return await Common.convertBase64StringToObject(value);
        }

        let isValidValue =
            value !== "null" && value !== "undefined" && value !== undefined;
        return isValidValue ? value : "";
    }

    static async convertBase64StringToObject(base64Str) {
        console.debug("Base64 string:", base64Str);

        let jsonStr = atob(base64Str);
        console.debug("Json string:", jsonStr);

        let isValidValue =
            base64Str !== "null" &&
            base64Str !== "undefined" &&
            base64Str !== undefined;
        return isValidValue ? JSON.parse(jsonStr) : [];
    }

    static async setStorage(key, value, isObject = false) {
        if (isObject) {
            value = await Common.convertObjectToBase64String(value);
        }
        localStorage.setItem(key, value);
    }

    static async convertObjectToBase64String(obj) {
        let jsonStr = JSON.stringify(obj, null, 4);
        console.debug("Json string:", jsonStr);

        let base64Str = btoa(jsonStr);
        console.debug("Base64 string:", base64Str);

        return base64Str;
    }

    static async copyTextToClipboard(selector) {
        let $temp = $("<textarea>");
        let brRegex = /<br\s*[\/]?>/gi;

        $("body").append($temp);
        $temp.val($(selector).val().replace(brRegex, "\r\n")).select();

        document.execCommand("copy");
        $temp.remove();
    }

    static async displayElement(selector, displayClass = "inline-flex") {
        let $element = $(selector);
        if ($element.length) {
            if ($element.attr("style").includes("visibility")) {
                $element.attr("style", "visibility: visible");
            } else {
                $element.attr("style", `display: ${displayClass};`);
            }
        }
    }

    static async hideElement(selector) {
        let $element = $(selector);
        if ($element.length) {
            if ($element.attr("style").includes("visibility")) {
                $element.attr("style", "visibility: hidden");
            } else {
                $element.attr("style", "display: none");
            }
        }
    }

    static async clearElementText(selector) {
        let $element = $(selector);
        if ($element.length) {
            $element.val("").trigger("change");
            $element.text("").trigger("change");
            $element.html("").trigger("change");
        }
    }

    static async alertMsg(selector, message, isSuccess, autoHide, timeout) {
        let clazz = isSuccess ? "alert-success" : "alert-danger";
        let removedClazz = isSuccess ? "alert-danger" : "alert-success";

        let $alert = $(selector);
        $alert.text(message);
        $alert.addClass(clazz);
        $alert.removeClass(removedClazz);
        $alert.attr("style", "display: block;");

        if (autoHide) {
            await Common.delaySeconds(timeout);
            $alert.attr("style", "display: none;");
        }
    }

    static async alertWebMsg(message, isSuccess, autoHide = true, timeout = 3) {
        Common.alertMsg("#alert", message, isSuccess, autoHide, timeout);
    }

    static async alertIntroMsg(
        message,
        isSuccess,
        autoHide = true,
        timeout = 3
    ) {
        Common.alertMsg("#alertIntro", message, isSuccess, autoHide, timeout);
    }

    static async calculateCounters(selector) {
        let resultTxt = $(selector).val();
        let characterCount = resultTxt
            .split("")
            .filter((x) => x.replaceAll(/\s*/g, "") && Boolean).length;
        let lineCount = resultTxt
            .split("\n")
            .filter((x) => x.replaceAll(/\s*/g, "") && Boolean).length;

        let wordCount = 0;
        resultTxt.split("\n").forEach((element) => {
            wordCount += element.split(" ").filter(Boolean).length;
        });

        $("#counter").text(
            `Character count: ${characterCount} | Word count: ${wordCount} | Line count: ${lineCount}`
        );
    }

    static async getDeepKeys(obj) {
        var keys = [];
        for (var key in obj) {
            keys.push(key);

            if (typeof obj[key] === "object") {
                var subkeys = getDeepKeys(obj[key]);
                keys = keys.concat(
                    subkeys.map(function (subkey) {
                        return key + "." + subkey;
                    })
                );
            }
        }

        return keys;
    }

    static async objectDeepKeys(obj) {
        return Object.keys(obj)
            .filter((key) => obj[key] instanceof Object)
            .map((key) => objectDeepKeys(obj[key]).map((k) => `${key}.${k}`))
            .reduce((x, y) => x.concat(y), Object.keys(obj));
    }

    static async isValidJson(jsonStr) {
        try {
            JSON.parse(jsonStr);
            return true;
        } catch (err) {
            return false;
        }
    }

    static async getJsonNodePaths(rootObj) {
        let paths = [];
        let jsonNodes = [];

        let nodes = [
            {
                obj: rootObj,
                path: [],
            },
        ];

        while (nodes.length > 0) {
            let n = nodes.pop();
            jsonNodes.push(n);

            if (n.obj) {
                Object.keys(n.obj).forEach((k) => {
                    if (typeof n.obj[k] === "object") {
                        let path = n.path.concat(k);

                        paths.push(path);
                        nodes.unshift({
                            obj: n.obj[k],
                            path: path,
                        });
                    }
                });
            }
        }
        return { paths, jsonNodes };
    }
}

export { Common };
