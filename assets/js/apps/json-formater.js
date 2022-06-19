import { Common } from "../common.js";
import { Tool } from "../tool.js";

$(document).ready(() => {
    // To highlight diffs in tree mode
    function onClassName({ path, field, value }) {
        let nodeClass = "the_same_element";

        if (field !== undefined && value !== undefined) {
            let compareJson = $("#compareJson").is(":checked");
            if (
                compareJson &&
                Common.isValidJson(jsonEditorLeft.getText()) &&
                Common.isValidJson(jsonEditorRight.getText())
            ) {
                let leftValue = _.get(jsonLeft, path);
                let rightValue = _.get(jsonRight, path);

                if (leftValue === undefined || rightValue === undefined) {
                    nodeClass = "undefined";
                } else {
                    nodeClass = _.isEqual(leftValue, rightValue)
                        ? "the_same_element"
                        : "different_element";
                }
            }
        }

        return nodeClass;
    }

    // Json editor on the right
    let jsonRight = {};
    let jsonEditorRight = new JSONEditor(
        document.getElementById("jsoneditorRight"),
        {
            mode: "code",
            onClassName: onClassName,
            onChangeJSON: (j) => {
                jsonRight = j;
                jsonEditorLeft.refresh();
            },
        },
        jsonRight
    );

    // Json editor on the left
    let jsonLeft = {};
    let jsonEditorLeft = new JSONEditor(
        document.getElementById("jsoneditorLeft"),
        {
            modes: ["code", "tree"],
            onClassName: onClassName,
            onChangeJSON: (j) => {
                jsonLeft = j;
                jsonEditorRight.refresh();
            },
            onModeChange: (newMode, oldMode) => {
                console.log("change to mode", newMode);
                jsonEditorRight.setMode(newMode);
            },
        },
        jsonLeft
    );

    $("#compareJson").on("change", () => {
        let compareJson = $("#compareJson").is(":checked");
        if (compareJson) {
            Common.displayElement("#compare");
            Common.displayElement("#clearJson");
            Common.displayElement("#secondView", "inline");
        } else {
            Common.hideElement("#compare");
            Common.hideElement("#clearJson");
            Common.hideElement("#secondView");
        }
    });

    $("#compare").click(async () => {
        jsonEditorLeft.setMode("tree");
        jsonEditorRight.setMode("tree");

        jsonLeft = jsonEditorLeft.get();
        jsonRight = jsonEditorRight.get();

        jsonEditorLeft.refresh();
        jsonEditorRight.refresh();

        if ($(".different_element").length > 0) {
            console.log("Two JSON had differences");
            jsonEditorLeft.expandAll();
            jsonEditorRight.expandAll();
        }
    });

    $("#clearJson").click(() => {
        jsonEditorLeft.setMode("code");
        jsonEditorRight.setMode("code");
    });
});

// $(window).on("load", async () => {
//     await Common.alertIntroMsg(
//         Tool.INTRO_WARN_MSG,
//         true,
//         true,
//         Tool.INTRO_SHOW_TIME
//     );
//     await Common.hideElement("#intro");
// });
