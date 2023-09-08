import { Common } from "./base/common.js";

$(document).ready(async () => {
    if ($("#result").length > 0) {
        var resultEditor = await Tool.setupEditor("result");

        $("#copy").click(() => {
            if (resultEditor.getValue().length == 0) {
                Common.displayUiAlert("No text result!", false);
            } else {
                Common.copyEditorTextToClipboard(resultEditor);
                Common.displayUiAlert(
                    "Text result copied into the clipboard.",
                    true
                );
            }
        });

        $("#clear").click(() => {
            resultEditor.setValue("");
            Tool.calculateCounters(resultEditor);
        });

        //--------------------------------------------
        // Observe changes from result textarea box
        let target = $("#result")[0];

        // Create an observer instance
        let observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                // let newNodes = mutation.addedNodes; // DOM NodeList

                // if (newNodes !== null) {
                //     // If there are new nodes added
                //     //alert('something has been changed');
                // }

                Tool.calculateCounters(resultEditor);
            });
        });

        // Configuration of the observer
        let config = {
            attributes: true,
            childList: true,
            characterData: true,
            subtree: true,
        };

        // Pass in the target node, as well as the observer options
        observer.observe(target, config);

        // Later, you can stop observing
        // observer.disconnect();
        //--------------------------------------------
    }
});

export class Tool {
    static INTRO_SHOW_TIME = 3;

    static INTRO_WARN_MSG = `Introduction section will be hidden after ${Tool.INTRO_SHOW_TIME} seconds... You can refresh to see it or read it on Home page!`;

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
}
