var textCases = {
    lowerCase: "lower case",
    upperCase: "UPPER CASE",
    sentenseCase: "Sentense case",
    capitalizedCase: "Capitalized Case",
    titleCase: "Title Case",
    inverseCase: "iNVERSE CASE"
}

var originExceptions = "along, the, and, nor, or, yet, so, a, amid, an, apud, as, at, atop, but, by, down, \
    for, from, in, into, like, mid, near, next, of, off, on, onto, out, over, pace, past, per, plus, pro, qua, \
    sans, save, than, till, to, unto, up, upon, via, vice, vs., with"

$(document).ready(() => {

    let excepStorage = localStorage.getItem("exceptions") || ""
    if (excepStorage.length > 0) {
        $("#exceptions").val(excepStorage)
    }

    $("#exceptionReset").on("click", () => {
        $("#exceptions").val(originExceptions)
        localStorage.setItem("exceptions", originExceptions)
    })

    $("input[name='desiredCase']").on("change", () => {

        let desiredCase = $("input[name='desiredCase']:checked").val()
        if (desiredCase == textCases.titleCase) {

            displayElement("#exceptions-wrapper")
            displayElement("#exceptionReset")
        } else {
            hideElement("#exceptions-wrapper")
            hideElement("#exceptionReset")
        }
    })

    $("#convert").on("click", () => {

        let resultBox = $("#result").val()
        if (resultBox.length == 0) {
            alertWebMsg("Please check your input! No text input!", false)
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

        convertStringCase(desiredCase)
    })

    $("#original").on("click", () => {
        let orignalTxt = localStorage.getItem("orignalTxt") || ""
        $("#result").val(orignalTxt)
    })

})

function convertStringCase(desiredCase) {

    let txtBox = $("#result").val()

    switch (desiredCase) {
        case textCases.upperCase:
            txtBox = txtBox.toLocaleUpperCase()
            break
        case textCases.sentenseCase:
            txtBox = firstLetterUpper(txtBox)
            break
        case textCases.capitalizedCase:
            txtBox = capitalizedCase(txtBox)
            break
        case textCases.titleCase:
            txtBox = titleCase(txtBox)
            break
        case textCases.inverseCase:
            txtBox = inverseString(txtBox)
            break
        default:
            // default is lower case
            txtBox = txtBox.toLocaleLowerCase()

    }

    $("#result").val(txtBox).trigger("change")
}

function firstLetterUpper(string) {
    return string.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g,
        function (c) { return c.toUpperCase() });
}

function capitalizedCase(string) {
    return string.toLowerCase().split(" ").map(function (word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(" ");
}

function titleCase(string) {

    let exceptions = $("#exceptions").val().toLowerCase().split(",").map(item => item.trim())
    return string.toLowerCase().split(" ").map(function (word) {

        if (exceptions.includes(word.trim().toLowerCase())) {
            return word.charAt(0).toLowerCase() + word.slice(1);
        } else {
            return word.charAt(0).toUpperCase() + word.slice(1);
        }
    }).join(" ");
}

function inverseString(string) {
    return [...string].map(char => char === char.toUpperCase() ?
        char.toLowerCase() : char.toUpperCase()).join('');
}
