import { Common } from "../base/common.js";
import { Tool } from "../tool.js";

$(document).ready(() => {
    // Json editor on the right
    let jsonRight = {};
    let jsonEditorRight = new JSONEditor(
        document.getElementById("jsoneditorRight"),
        {
            mode: "code",
            onClassName: JsonFormater.onClassName,
            onChangeText: (j) => {
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
            onClassName: JsonFormater.onClassName,
            onChangeText: (j) => {
                jsonLeft = j;
                jsonEditorRight.refresh();
            },
            onModeChange: (newMode, oldMode) => {
                Common.logWarning("change to mode", newMode);
                jsonEditorRight.setMode(newMode);
            },
        },
        jsonLeft
    );

    $("#compareJson").on("change", () => {
        let compareJson = $("#compareJson").is(":checked");
        if (compareJson) {
            Tool.displayElement("#compare");
            Tool.displayElement("#clearJson");
            Tool.displayElement("#secondView", "inline");
        } else {
            Tool.hideElement("#compare");
            Tool.hideElement("#clearJson");
            Tool.hideElement("#secondView");
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
            Common.logWarning("Two JSON had differences");
            jsonEditorLeft.expandAll();
            jsonEditorRight.expandAll();
        }
    });

    $("#clearJson").click(() => {
        jsonEditorLeft.setMode("code");
        jsonEditorRight.setMode("code");
    });
});

export class JsonFormater {
    // To highlight diffs in tree mode
    static async onClassName({ path, field, value }) {
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
}
