import { Common } from "../common.js";

$(document).ready(() => {
    let excepStorage = Common.getStorage("exceptions") || "";
    if (excepStorage.length > 0) {
        $("#exceptions").val(excepStorage);
    }

    $("#exceptionReset").click(() => {
        $("#exceptions").val(CaseConverter.ORIGIN_EXCEPTIONS);
        Common.setStorage("exceptions", CaseConverter.ORIGIN_EXCEPTIONS);
    });

    $("input[name='desiredCase']").on("change", () => {
        let desiredCase = $("input[name='desiredCase']:checked").val();
        if (desiredCase == CaseConverter.TEXT_CASES.titleCase) {
            Common.displayElement("#exceptions-wrapper");
            Common.displayElement("#exceptionReset");
        } else {
            Common.hideElement("#exceptions-wrapper");
            Common.hideElement("#exceptionReset");
        }
    });

    $("#convert").click(async () => {
        let resultBox = $("#result").val();
        if (resultBox.length == 0) {
            alertWebMsg("Please check your input! No text input!", false);
            return;
        }

        let orignalTxt = (await Common.getStorage("orignalTxt")) || "";
        if (orignalTxt.toLowerCase() != resultBox.toLowerCase()) {
            Common.setStorage("orignalTxt", resultBox);
        }

        let desiredCase = $("input[name='desiredCase']:checked").val();
        if (desiredCase == CaseConverter.TEXT_CASES.titleCase) {
            let excepStorage = (await Common.getStorage("exceptions")) || "";
            let excepBox = $("#exceptions").val();

            if (
                excepStorage.length == 0 ||
                excepStorage.length != excepBox.length
            ) {
                Common.setStorage("exceptions", excepBox);
                excepStorage = await Common.getStorage("exceptions");
            }

            $("#exceptions").val(excepStorage);
        }
        CaseConverter.convertStringCase(desiredCase);
    });

    $("#original").click(async () => {
        let orignalTxt = (await Common.getStorage("orignalTxt")) || "";
        $("#result").val(orignalTxt);
    });
});

class CaseConverter {
    static TEXT_CASES = {
        lowerCase: "lower case",
        upperCase: "UPPER CASE",
        sentenseCase: "Sentense case",
        capitalizedCase: "Capitalized Case",
        titleCase: "Title Case",
        inverseCase: "iNVERSE CASE",
    };

    static ORIGIN_EXCEPTIONS =
        "along, the, and, nor, or, yet, so, a, amid, an, apud, as, at, atop, but, by, down, \
        for, from, in, into, like, mid, near, next, of, off, on, onto, out, over, pace, past, per, plus, pro, qua, \
        sans, save, than, till, to, unto, up, upon, via, vice, vs., with";

    static async convertStringCase(desiredCase) {
        let txtBox = $("#result").val();

        switch (desiredCase) {
            case CaseConverter.TEXT_CASES.upperCase:
                txtBox = txtBox.toLocaleUpperCase();
                break;
            case CaseConverter.TEXT_CASES.sentenseCase:
                txtBox = await CaseConverter.firstLetterUpper(txtBox);
                break;
            case CaseConverter.TEXT_CASES.capitalizedCase:
                txtBox = await CaseConverter.capitalizedCase(txtBox);
                break;
            case CaseConverter.TEXT_CASES.titleCase:
                txtBox = await CaseConverter.titleCase(txtBox);
                break;
            case CaseConverter.TEXT_CASES.inverseCase:
                txtBox = await CaseConverter.inverseString(txtBox);
                break;
            default:
                // default is lower case
                txtBox = txtBox.toLocaleLowerCase();
        }

        $("#result").val(txtBox).trigger("change");
    }

    static async firstLetterUpper(string) {
        return string
            .toLowerCase()
            .replace(/(^\s*\w|[\.\!\?]\s*\w)/g, function (c) {
                return c.toUpperCase();
            });
    }

    static async capitalizedCase(string) {
        return string
            .toLowerCase()
            .split(" ")
            .map(function (word) {
                return word.charAt(0).toUpperCase() + word.slice(1);
            })
            .join(" ");
    }

    static async titleCase(string) {
        let exceptions = $("#exceptions")
            .val()
            .toLowerCase()
            .split(",")
            .map((item) => item.trim());
        return string
            .toLowerCase()
            .split(" ")
            .map(function (word) {
                if (exceptions.includes(word.trim().toLowerCase())) {
                    return word.charAt(0).toLowerCase() + word.slice(1);
                } else {
                    return word.charAt(0).toUpperCase() + word.slice(1);
                }
            })
            .join(" ");
    }

    static async inverseString(string) {
        return [...string]
            .map((char) =>
                char === char.toUpperCase()
                    ? char.toLowerCase()
                    : char.toUpperCase()
            )
            .join("");
    }
}
