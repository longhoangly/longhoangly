import { Common } from "../common.js";

var consoleOutput = await Common.setupEditor("consoleOutput", true);
consoleOutput.setHighlightActiveLine(true);

$(window).on("load", async () => {
    if (consoleOutput) {
        // JS console hooks
        console.defaultLog = console.log.bind(console);
        console.logs = [];
        console.log = function () {
            // default & console.log()
            console.defaultLog.apply(console, arguments);
            // new & array data
            console.logs.push(Array.from(arguments));
            // ace logs
            let currentLogs = consoleOutput.getValue().trim();
            currentLogs =
                currentLogs.length > 0 ? currentLogs + "\n" : currentLogs;
            consoleOutput.setValue(
                currentLogs + Array.from(arguments).join(" ")
            );
        };

        console.defaultError = console.error.bind(console);
        console.errors = [];
        console.error = function () {
            // default & console.error()
            console.defaultError.apply(console, arguments);
            // new & array data
            console.errors.push(Array.from(arguments));
            // ace logs
            let currentLogs = consoleOutput.getValue().trim();
            currentLogs =
                currentLogs.length > 0 ? currentLogs + "\n" : currentLogs;
            consoleOutput.setValue(
                currentLogs + Array.from(arguments).join(" ")
            );
        };

        console.defaultDebug = console.debug.bind(console);
        console.debugs = [];
        console.debug = function () {
            // default & console.debug()
            console.defaultDebug.apply(console, arguments);
            // new & array data
            console.debugs.push(Array.from(arguments));
            // ace logs
            let currentLogs = consoleOutput.getValue().trim();
            currentLogs =
                currentLogs.length > 0 ? currentLogs + "\n" : currentLogs;
            consoleOutput.setValue(
                currentLogs + Array.from(arguments).join(" ")
            );
        };
    }
});

$(document).ready(async () => {
    var editor = await Common.setupEditor("editor", false, "javascript");

    $("#execute").click(() => {
        let jsScript = editor.getValue();
        if (jsScript.length === 0) {
            consoleOutput.setValue(
                "Could you please check your input? No JS code found!"
            );
            return;
        }
        consoleOutput.setValue("");
        try {
            eval(jsScript);
        } catch (error) {
            Common.alertWebMsg(error, false);
        }
    });

    $("#clearJs").click(() => {
        console.logs.length = 0;
        console.errors.length = 0;
        console.debugs.length = 0;
        editor.setValue("");
        consoleOutput.setValue("");
    });

    editor.on("change", () => {
        consoleOutput.setValue("");
    });
});
