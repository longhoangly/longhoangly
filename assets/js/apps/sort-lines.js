import { Common } from "../common.js";

$(document).ready(async () => {
    var inputEditor = await Common.setupEditor("input");
    var resultEditor = await Common.setupEditor("result");

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

class LinesSorter {
    static async sortingHandler(inputEditor, resultEditor, hasAlert = true) {
        let strArray = inputEditor
            .getValue()
            .split("\n")
            .filter((x) => x.trim() && Boolean);

        if (strArray.length === 0) {
            if (hasAlert) {
                Common.alertWebMsg(
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
                console.log("sort descending", strArray);
                break;

            default:
                if (isNumbers) {
                    strArray.sort((a, b) => {
                        return a - b;
                    });
                } else {
                    strArray.sort();
                }
                console.log("sort ascending", strArray);
        }

        return strArray;
    }
}

export { LinesSorter };
