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
                let histories = await Common.getStorage(`${elementId}-history`);
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
                `${elementId}-history`
            );
            console.log(elementId, "histories", storageHistories);

            await Common.makeAutoCompleteField(elementId, storageHistories);
        }
    }

    static async getFieldValue(key, defaultValue = "") {
        let storageValue = await Common.getStorage(key);

        if (
            storageValue === undefined ||
            ["routeDate", "rssDeliveryDate"].includes(key)
        ) {
            await Common.setStorage(key, defaultValue);
        }

        return await Common.getStorage(key);
    }

    static jsonToStringWithIndents(str) {
        try {
            str = JSON.stringify(stringToObject(str), null, 4);
        } catch (error) {
            console.warn(
                "Error while formating json string...please check json format..."
            );
        } finally {
            return str;
        }
    }

    static jsonToString(json) {
        try {
            if (typeof json === "object") {
                json = JSON.stringify(json);
            } else {
                json = JSON.stringify(JSON.parse(json));
            }
        } catch (error) {
            Common.logWarning(
                "Error while converting json object to string...please check json format..."
            );
        } finally {
            return json;
        }
    }

    static stringToObject(jsonStr) {
        try {
            jsonStr = JSON.parse(jsonStr);
        } catch (error) {
            Common.logWarning(
                "Error while converting string to json object...please check json format..."
            );
        } finally {
            return jsonStr;
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

    static async setupEditor(
        editorId,
        readonly = false,
        mode = "text",
        maxLines = 20,
        minLines = 10
    ) {
        let editor = ace.edit(editorId, {
            theme: "ace/theme/solarized_light",
            mode: `ace/mode/${mode}`,
            autoScrollEditorIntoView: true,
            readOnly: readonly,
        });

        if (maxLines !== 0) {
            editor.setOptions({
                maxLines: maxLines,
                minLines: minLines,
            });
        }

        let editorElement = document.getElementById(editorId);
        editorElement.style.fontSize = "16px";
        editorElement.style.color = "#374549";
        editorElement.style.background = "#d3dcdf";
        $(".ace_gutter").css("backgroundColor", "#b5c4c9");

        return editor;
    }

    static randomNumericId(length) {
        let random = "";
        for (let i = 0; i < length; i++) {
            let numbers = i === 0 ? "123456789" : "0123456789";
            random += numbers.charAt(
                Math.floor(Math.random() * numbers.length)
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

    static async copyTextToClipboard(editor) {
        navigator.clipboard.writeText(editor.getValue());
    }

    static async copyTextAreaToClipboard(selector) {
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
            Common.logInfo("Removing storage key:", key);
            localStorage.removeItem(key);
        }
        Common.logInfo("Removed all storage keys:", keys);
    }

    static async getStorage(key) {
        let value = localStorage.getItem(key);
        Common.logInfo("Get storage...", key, value);
        return value;
    }

    static async setStorage(key, value) {
        Common.logInfo("Saving storage...", key, value);
        localStorage.setItem(key, value);
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
            if (
                $element.attr("style") === undefined ||
                $element.attr("style").includes("display")
            ) {
                $element.attr("style", "display: none");
            } else {
                $element.attr("style", "visibility: hidden");
            }
        }
    }

    static async clearElementText(selector) {
        let $element = $(selector);
        if ($element.length) {
            $element.val("");
            $element.text("");
            $element.html("");
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
        await Common.alertMsg("#alert", message, isSuccess, autoHide, timeout);
    }

    static async alertIntroMsg(
        message,
        isSuccess,
        autoHide = true,
        timeout = 3
    ) {
        await Common.alertMsg(
            "#alertIntro",
            message,
            isSuccess,
            autoHide,
            timeout
        );
    }

    static async calculateCounters(editor, selectorId = "counter") {
        let resultTxt = editor.getValue();
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

        $(`#${selectorId}`).text(
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

    static logSuccess(...args) {
        console.log(
            Common.#decorateLogMsg(args),
            "color: #00FF00",
            "[Logger]",
            ...args
        );
    }

    static logWarning(...args) {
        console.log(
            Common.#decorateLogMsg(args),
            "color: #FFA500",
            "[Logger]",
            ...args
        );
    }

    static logInfo(...args) {
        console.log(
            Common.#decorateLogMsg(args),
            "color: #919191",
            "[Logger]",
            ...args
        );
    }

    static logError(...args) {
        console.log(
            Common.#decorateLogMsg(args),
            "color: red",
            "[Logger]",
            ...args
        );
    }

    static #decorateLogMsg(args) {
        let messageConfig = "%c%s ";

        args.forEach((argument) => {
            const type = typeof argument;
            switch (type) {
                case "bigint":
                    messageConfig += "%o ";
                    break;
                case "number":
                    messageConfig += "%o ";
                    break;
                case "boolean":
                    messageConfig += "%o ";
                    break;
                case "string":
                    messageConfig += "%s ";
                    break;
                case "object":
                    messageConfig += "%o ";
                    break;
                case "undefined":
                    messageConfig += "%o ";
                    break;
                default:
                    messageConfig += "%o ";
            }
        });

        return messageConfig;
    }
}

export { Common };
