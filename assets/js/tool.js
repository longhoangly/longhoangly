import { Common } from "./common.js";

$(document).ready(async () => {
    if ($("#result").length > 0) {
        var resultEditor = await Common.setupEditor("result");

        $("#copy").click(() => {
            if (resultEditor.getValue().length == 0) {
                Common.alertWebMsg("No text result!", false);
            } else {
                Common.copyTextToClipboard(resultEditor);
                Common.alertWebMsg(
                    "Text result copied into the clipboard.",
                    true
                );
            }
        });

        $("#clear").click(() => {
            resultEditor.setValue("");
            Common.calculateCounters(resultEditor);
        });

        $("#result").on("input DOMSubtreeModified", () => {
            Common.calculateCounters(resultEditor);
        });
    }
});

class Tool {
    static INTRO_SHOW_TIME = 3;

    static INTRO_WARN_MSG = `Introduction section will be hidden after ${Tool.INTRO_SHOW_TIME} seconds... You can refresh to see it or read it on Home page!`;
}

export { Tool };
