import { Common } from "../common.js";

$(document).ready(() => {
    let $input = $("#input");
    let $duplicates = $("#duplicates");
    let $result = $("#result");

    $input.on("change input", async () => {
        await Common.clearElementText("#result");
        await Common.clearElementText("#duplicates");
        await DuplicatesFinder.findDuplicates($input, $duplicates, $result);
    });

    $("#copyDup").click(async () => {
        if ($result.val().length == 0) {
            await Common.alertWebMsg("No duplicate!", false);
        } else {
            await Common.copyTextToClipboard("#duplicates");
            await Common.alertWebMsg(
                "Duplicated lines copied into the clipboard.",
                true
            );
        }
    });

    $("#clearDup").click(async () => {
        await Common.clearElementText("#input");
        await Common.clearElementText("#duplicates");
        await Common.clearElementText("#result");
        await Common.calculateCounters("#result");
    });

    $("input[name='sorting']").on("change", () => {
        DuplicatesFinder.sortingResult($input, $result);
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

    static async getUniques(strArray) {
        let uniques = strArray.filter((v, i, a) => a.indexOf(v) === i);
        return uniques;
    }

    static async findDuplicates($input, $duplicates, $result) {
        let strArray = $input
            .val()
            .split("\n")
            .filter((x) => x.trim() && Boolean);
        console.log("strArray", strArray);

        if (strArray.length === 0) {
            return;
        }

        let duplicateStrs = await DuplicatesFinder.getDuplicates(strArray);
        if (duplicateStrs.length > 0) {
            $duplicates.val(duplicateStrs.join("\n"));

            let uniques = await DuplicatesFinder.getUniques(strArray);
            $result.val(uniques.join("\n")).trigger("change");
        } else {
            Common.alertWebMsg(
                "Yay, No duplicates found, all lines are unique.",
                true
            );
        }
    }

    static async sortingResult($input, $result) {
        let strArray = $input
            .val()
            .split("\n")
            .filter((x) => x.trim() && Boolean);

        if (strArray.length === 0) {
            return;
        }

        let resultArray = await DuplicatesFinder.getUniques(strArray);
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
                $result.val(resultArray.join("\n")).trigger("change");
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
                $result.val(resultArray.join("\n")).trigger("change");
                break;

            default:
                console.log("no-sorting", resultArray);
                $result.val(resultArray.join("\n")).trigger("change");
                break;
        }
    }
}

export { DuplicatesFinder };
