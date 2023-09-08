import { Common } from "../base/common.js";
import { Tool } from "../tool.js";

$(document).ready(async () => {
    var inputEditor = await Tool.setupEditor("input");
    var resultEditor = await Tool.setupEditor("result");

    $("#input textarea").on("keyup paste", () => {
        resultEditor.setValue("");
        LinesSorter.sortingHandler(inputEditor, resultEditor);
    });

    $("#clearSort").click(() => {
        inputEditor.setValue("");
        resultEditor.setValue("");
    });

    $("input[name='sorting']").on("change", () => {
        LinesSorter.sortingHandler(inputEditor, resultEditor);
    });
});

export class LinesSorter {
    static async sortingHandler(inputEditor, resultEditor, hasAlert = true) {
        let strArray = inputEditor
            .getValue()
            .split("\n")
            .filter((x) => x.trim() && Boolean);

        if (strArray.length === 0) {
            if (hasAlert) {
                Common.displayUiAlert(
                    "Please check your input! No text input!",
                    false
                );
            }
            return;
        }

        let sortedLines = await LinesSorter.sortLines(strArray);
        resultEditor.setValue(sortedLines.join("\n"));
    }

    static async sortLines(strArray) {
        let isNumbers = strArray.every((x) => {
            // "is Not a Number" => return true if the string is not a number!
            return !isNaN(x);
        });

        let sorting = $("input[name='sorting']:checked").val();

        switch (sorting) {
            case "descending":
                if (isNumbers) {
                    strArray.sort((a, b) => {
                        return b - a;
                    });
                } else {
                    strArray.sort();
                    strArray.reverse();
                }
                Common.logWarning("sort descending", strArray);
                break;

            default:
                if (isNumbers) {
                    strArray.sort((a, b) => {
                        return a - b;
                    });
                } else {
                    strArray.sort();
                }
                Common.logWarning("sort ascending", strArray);
        }

        return strArray;
    }
}
