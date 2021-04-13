var textCases = {
    lowerCase: "lower case",
    upperCase: "UPPER CASE",
    sentenseCase: "Sentense case",
    capitalizedCase: "Capitalized Case",
    titleCase: "Title Case",
    inverseCase: "iNVERSE CASE"
}

var originExceptions = "along, the, and, nor, or, yet, so, a, amid, an, apud, as, at, atop, but, by, down, for, from, in, into, like, mid, near, next, of, off, on, onto, out, over, pace, past, per, plus, pro, qua, sans, save, than, till, to, unto, up, upon, via, vice, vs., with"

$(document).ready(function () {

    let isNight = localStorage.getItem("isNight") == "true"
    setButtonNightMode(isNight)

    let excepStorage = localStorage.getItem("exceptions") || ""
    if (excepStorage.length > 0) {
        $("#exceptions").val(excepStorage)
    }

    $("#nightMode").on("click", function () {
        let isNight = localStorage.getItem("isNight") == "true"
        setButtonNightMode(isNight)
    })

    $("#exceptionReset").on("click", function () {
        $("#exceptions").val(originExceptions)
        localStorage.setItem("exceptions", originExceptions)
    })

    $("input[name='desiredCase']").on("change", function () {

        let desiredCase = $("input[name='desiredCase']:checked").val()
        if (desiredCase == textCases.titleCase) {

            displayElement("#exceptions-wrapper")
            displayElement("#exceptionReset")
        } else {
            hideElement("#exceptions-wrapper")
            hideElement("#exceptionReset")
        }
    })

    $("#convert").on("click", function () {

        let resultBox = $("#result").val()
        if (resultBox.length == 0) {
            displayAlertMessage("Please check your input! Nothing to convert!", false)
            return
        }

        let orignalTxt = localStorage.getItem("orignalTxt") || ""
        if (orignalTxt.toLowerCase() != resultBox.toLowerCase()) {
            localStorage.setItem("orignalTxt", resultBox)
        }

        let desiredCase = $("input[name='desiredCase']:checked").val()
        if (desiredCase == textCases.titleCase) {

            let excepStorage = localStorage.getItem("exceptions") || ""
            let excepBox = $("#exceptions").val()

            if (excepStorage.length == 0 || excepStorage.length != excepBox.length) {
                localStorage.setItem("exceptions", excepBox)
                excepStorage = localStorage.getItem("exceptions")
            }

            $("#exceptions").val(excepStorage)
        }

        hideElement("#alert")
        convertStringCase(desiredCase)
    })

    $("#original").on("click", function () {
        let orignalTxt = localStorage.getItem("orignalTxt") || ""
        $("#result").val(orignalTxt)
    })

    $("#copy").on("click", function () {

        if ($("#result").val().length == 0) {
            displayAlertMessage("Nothing in text result!", false)
        } else {
            copyTextToClipboard("#result")
            displayAlertMessage("Text result copied into the clipboard!", true)
        }
    })

    $("#clear").on("click", function () {
        hideElement("#alert")
        clearElementText("#result")
        calculateCounters("#result")
    })

    $("#result").on("change paste input", function () {
        calculateCounters("#result")
    })
})

function convertStringCase(desiredCase) {

    let txtBox = $("#result").val()

    switch (desiredCase) {
        case textCases.upperCase:
            txtBox = txtBox.toLocaleUpperCase()
            break;
        case textCases.sentenseCase:
            txtBox = firstLetterUpper(txtBox)
            break;
        case textCases.capitalizedCase:
            txtBox = capitalizedCase(txtBox)
            break;
        case textCases.titleCase:
            txtBox = titleCase(txtBox)
            break;
        case textCases.inverseCase:
            txtBox = inverseString(txtBox)
            break;
        default:
            // default is lower case
            txtBox = txtBox.toLocaleLowerCase()

    }

    $("#result").val(txtBox).trigger("change")
}

function firstLetterUpper(theString) {
    return theString.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g, function (c) { return c.toUpperCase() });
}

function capitalizedCase(str) {
    return str.toLowerCase().split(" ").map(function (word) {
        return (word.charAt(0).toUpperCase() + word.slice(1));
    }).join(" ");
}

function titleCase(str) {

    let exceptions = $("#exceptions").val().toLowerCase().split(",").map(item => item.trim())
    return str.toLowerCase().split(" ").map(function (word) {

        if (exceptions.includes(word.trim().toLowerCase())) {
            return (word.charAt(0).toLowerCase() + word.slice(1));
        } else {
            return (word.charAt(0).toUpperCase() + word.slice(1));
        }
    }).join(" ");
}

function inverseString(str) {
    return [...str].map(char => char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()).join('');
}
