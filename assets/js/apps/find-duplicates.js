import { Common } from "../common.js";

$(document).ready(async () => {
    var inputEditor = await Common.setupEditor("input");
    var duplicatesEditor = await Common.setupEditor("duplicates", true);
    var resultEditor = await Common.setupEditor("result", true);

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
            await Common.alertWebMsg("No duplicate!", false);
        } else {
            await Common.copyTextToClipboard(duplicatesEditor);
            await Common.alertWebMsg(
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

class DuplicatesFinder {
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
        console.log("strArray", strArray);

        if (strArray.length === 0) {
            return;
        }

        let duplicateStrs = await DuplicatesFinder.getDuplicates(strArray);
        if (duplicateStrs.length > 0) {
            duplicatesEditor.setValue(duplicateStrs.join("\n"));
            let uniques = await Common.getUniqueArray(strArray);
            resultEditor.setValue(uniques.join("\n"));
        } else {
            Common.alertWebMsg(
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

        let resultArray = await Common.getUniqueArray(strArray);
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

                console.log("sort ascending", resultArray);
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

                console.log("sort descending", resultArray);
                break;

            default:
                console.log("no-sorting", resultArray);
                break;
        }
        resultEditor.setValue(resultArray.join("\n"));
    }
}

export { DuplicatesFinder };
