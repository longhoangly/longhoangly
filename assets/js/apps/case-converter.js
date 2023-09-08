import { Common } from "../base/common.js";
import { Tool } from "../tool.js";

$(document).ready(async () => {
    var editor = await Tool.setupEditor("result");

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
            Tool.displayElement("#exceptions-wrapper");
            Tool.displayElement("#exceptionReset");
        } else {
            Tool.hideElement("#exceptions-wrapper");
            Tool.hideElement("#exceptionReset");
        }
    });

    $("#convert").click(async () => {
        let resultTxt = editor.getValue();
        if (resultTxt.length == 0) {
            Common.displayUiAlert(
                "Please check your input! No text input!",
                false
            );
            return;
        }

        let orignalTxt = (await Common.getStorage("orignalTxt")) || "";
        if (orignalTxt.toLowerCase() != resultTxt.toLowerCase()) {
            Common.setStorage("orignalTxt", resultTxt);
        }

        let desiredCase = $("input[name='desiredCase']:checked").val();
        if (desiredCase == CaseConverter.TEXT_CASES.titleCase) {
            let excepStorage = (await Common.getStorage("exceptions")) || "";
            let excepTxt = $("#exceptions").val();

            if (
                excepStorage.length == 0 ||
                excepStorage.length != excepTxt.length
            ) {
                Common.setStorage("exceptions", excepTxt);
                excepStorage = await Common.getStorage("exceptions");
            }

            $("#exceptions").val(excepStorage);
        }

        CaseConverter.convertStringCase(editor, desiredCase);
    });

    $("#original").click(async () => {
        let orignalTxt = (await Common.getStorage("orignalTxt")) || "";
        editor.setValue(orignalTxt);
    });
});

export class CaseConverter {
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

    static async convertStringCase(editor, desiredCase) {
        let inputTxt = editor.getValue();

        switch (desiredCase) {
            case CaseConverter.TEXT_CASES.upperCase:
                inputTxt = inputTxt.toLocaleUpperCase();
                break;
            case CaseConverter.TEXT_CASES.sentenseCase:
                inputTxt = await CaseConverter.firstLetterUpper(inputTxt);
                break;
            case CaseConverter.TEXT_CASES.capitalizedCase:
                inputTxt = await CaseConverter.capitalizedCase(inputTxt);
                break;
            case CaseConverter.TEXT_CASES.titleCase:
                inputTxt = await CaseConverter.titleCase(inputTxt);
                break;
            case CaseConverter.TEXT_CASES.inverseCase:
                inputTxt = await CaseConverter.inverseString(inputTxt);
                break;
            default:
                inputTxt = inputTxt.toLocaleLowerCase();
        }

        editor.setValue(inputTxt);
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
