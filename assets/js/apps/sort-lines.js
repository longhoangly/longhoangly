import { Common } from "../common.js";

$(document).ready(() => {
    $("#input").on("change input", () => {
        Common.clearElementText("#result");
        LinesSorter.sortingHandler(true);
    });

    $("#clearSort").click(() => {
        Common.clearElementText("#input");
        Common.clearElementText("#result");
    });

    $("input[name='sorting']").on("change", () => {
        LinesSorter.sortingHandler(true);
    });
});

class LinesSorter {
    static async sortingHandler(hasAlert = false) {
        let strArray = $("#input")
            .val()
            .split("\n")
            .filter((x) => x.trim() && Boolean);
        console.log("strArray", strArray);

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
        $("#result").val(sortedLines.join("\n")).trigger("change");
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
