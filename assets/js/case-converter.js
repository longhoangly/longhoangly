var textCases = {
    lowerCase: "lower case",
    upperCase: "UPPER CASE",
    sentenseCase: "Sentense case",
    capitalizedCase: "Capitalized Case",
    titleCase: "Title Case",
    inverseCase: "iNVERSE CASE"
}

$(document).ready(function () {

    $("#nightMode").on("click", function () {
        let isNight = localStorage.getItem("isNight") == "true"
        setButtonNightMode(isNight)
    })

    let isNight = localStorage.getItem("isNight") == "true"
    setButtonNightMode(isNight)

    $("#desiredCase").on("change", function () {

        let desiredCase = $("#desiredCase").val()
        if (desiredCase == textCases.titleCase) {

            displayElement("#exceptions-wrapper")
        } else {
            hideElement("#exceptions-wrapper")
        }
    })

    $("#convert").on("click", function () {

        let txtBox = $("#result").val()
        if (txtBox.length == 0) {

            displayAlertMessage("Please check your input! Nothing to convert!", false)
            return
        }

        let orignalTxt = localStorage.getItem("orignalTxt") || ""
        if (orignalTxt.toLowerCase() != txtBox.toLowerCase()) {

            localStorage.setItem("orignalTxt", txtBox)
        }

        let desiredCase = $("#desiredCase option:selected").text()

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

    let exceptions = $("#exceptions").val().toLowerCase().split(",").map(function (item) {
        return item.trim();
    })

    return str.toLowerCase().split(" ").map(function (word) {

        if (exceptions.includes(word.toLowerCase())) {

            return (word.charAt(0).toLowerCase() + word.slice(1));
        } else {
            return (word.charAt(0).toUpperCase() + word.slice(1));
        }
    }).join(" ");
}

function inverseString(str) {
    return [...str].map(char => char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()).join('');
}
