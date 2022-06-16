import { Common } from "./common.js";

$(document).ready(() => {
    $("#copy").click(() => {
        if ($("#result").val().length == 0) {
            Common.alertWebMsg("No text result!", false);
        } else {
            Common.copyTextToClipboard("#result");
            Common.alertWebMsg("Text result copied into the clipboard.", true);
        }
    });

    $("#clear").click(() => {
        Common.clearElementText("#result");
        Common.calculateCounters("#result");
    });

    $("#result").on("change input", () => {
        Common.calculateCounters("#result");
    });
});

class Tool {
    static INTRO_SHOW_TIME = 5;

    static INTRO_WARN_MSG = `Introduction section will be hidden after ${Common.INTRO_SHOW_TIME} seconds... You can refresh to see it or read it on Home page!`;
}

export { Tool };
