import { Common } from "../base/common.js";
import { Tool } from "../tool.js";

$(document).ready(async () => {
    var inputEditor = await Tool.setupEditor("input");
    var duplicatesEditor = await Tool.setupEditor("duplicates", true);
    var resultEditor = await Tool.setupEditor("result", true);

    $("#input textarea").on("keyup paste", async () => {
        resultEditor.setValue("");
        duplicatesEditor.setValue("");
        await DuplicatesFinder.findDuplicates(
            inputEditor,
            duplicatesEditor,
            resultEditor
        );
    });

    $("#copyDup").click(async () => {
        if (resultEditor.getValue().length == 0) {
            await Common.displayUiAlert("No duplicate!", false);
        } else {
            await Common.copyEditorTextToClipboard(duplicatesEditor);
            await Common.displayUiAlert(
                "Duplicated lines copied into the clipboard.",
                true
            );
        }
    });

    $("#clearDup").click(async () => {
        inputEditor.setValue("");
        duplicatesEditor.setValue("");
        resultEditor.setValue("");
    });

    $("input[name='sorting']").on("change", () => {
        DuplicatesFinder.sortingResult(inputEditor, resultEditor);
    });
});

export class DuplicatesFinder {
    static async getDuplicates(strArray) {
        let valueMap = new Map();
        for (let i = 0; i < strArray.length; i++) {
            let currentCount = parseInt(valueMap.get(strArray[i]) || 0);
            valueMap.set(strArray[i], currentCount + 1);
        }

        let duplicates = [...valueMap.entries()].sort((a, b) => b[1] - a[1]);

        let duplicateStrs = [];
        duplicates.forEach((x) => {
            if (x[1] > 1) {
                duplicateStrs.push(x.join(" (") + ")");
            }
        });

        return duplicateStrs;
    }

    static async findDuplicates(inputEditor, duplicatesEditor, resultEditor) {
        let strArray = inputEditor
            .getValue()
            .split("\n")
            .filter((x) => x.trim() && Boolean);
        Common.logWarning("strArray", strArray);

        if (strArray.length === 0) {
            return;
        }

        let duplicateStrs = await DuplicatesFinder.getDuplicates(strArray);
        if (duplicateStrs.length > 0) {
            duplicatesEditor.setValue(duplicateStrs.join("\n"));
            let uniques = await Common.distinctArray(strArray);
            resultEditor.setValue(uniques.join("\n"));
        } else {
            Common.displayUiAlert(
                "Yay, No duplicates found, all lines are unique.",
                true
            );
        }
    }

    static async sortingResult(inputEditor, resultEditor) {
        let strArray = inputEditor
            .getValue()
            .split("\n")
            .filter((x) => x.trim() && Boolean);

        if (strArray.length === 0) {
            return;
        }

        let resultArray = await Common.distinctArray(strArray);
        let isNumbers = resultArray.every((x) => {
            // "is Not a Number" => return true if the string is not a number!
            return !isNaN(x);
        });

        let sorting = $("input[name='sorting']:checked").val();
        switch (sorting) {
            case "ascending":
                if (isNumbers) {
                    resultArray.sort((a, b) => {
                        return a - b;
                    });
                } else {
                    resultArray.sort();
                }

                Common.logWarning("sort ascending", resultArray);
                break;

            case "descending":
                if (isNumbers) {
                    resultArray.sort((a, b) => {
                        return b - a;
                    });
                } else {
                    resultArray.sort();
                    resultArray.reverse();
                }

                Common.logWarning("sort descending", resultArray);
                break;

            default:
                Common.logWarning("no-sorting", resultArray);
                break;
        }
        resultEditor.setValue(resultArray.join("\n"));
    }
}
