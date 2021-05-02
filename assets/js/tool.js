$(document).ready(() => {

    $("#copy").on("click", () => {

        if ($("#result").val().length == 0) {

            displayAlertMessage("Nothing in text result box!", false)
        } else {

            copyTextToClipboard("#result")
            displayAlertMessage("Text result copied into the clipboard!", true)
        }
    })

    $("#clear").on("click", () => {

        clearElementText("#result")
        calculateCounters("#result")
        hideElement("#alert")
    })

    $("#result").on("change input", () => {

        calculateCounters("#result")
    })

})

function setButtonNightMode(isNight) {

    let $button = $("button")
    if ($button.length) {

        $button.toggleClass("btn-outline-light", isNight)
        $button.toggleClass("btn-outline-dark", !isNight)
    }
}

function copyTextToClipboard(selector) {

    let $temp = $("<textarea>")
    let brRegex = /<br\s*[\/]?>/gi

    $("body").append($temp)
    $temp.val($(selector).val().replace(brRegex, "\r\n")).select()

    document.execCommand("copy")
    $temp.remove()
}

function displayElement(selector) {

    let $element = $(selector)
    if ($element.length) {

        if ($element.attr("style").includes("visibility")) {

            $element.attr("style", "visibility: visible")
        } else {

            $element.attr("style", "display: inline-flex")
        }
    }
}

function hideElement(selector) {

    let $element = $(selector)
    if ($element.length) {

        if ($element.attr("style").includes("visibility")) {

            $element.attr("style", "visibility: hidden")
        } else {

            $element.attr("style", "display: none")
        }
    }
}

function clearElementText(selector) {

    let $element = $(selector)
    if ($element.length) {

        $element.val("").trigger("change")
        $element.text("").trigger("change")
    }
}

function displayAlertMessage(message, isSuccess) {

    let clazz = isSuccess ? "alert-success" : "alert-danger"
    let removedClazz = isSuccess ? "alert-danger" : "alert-success"

    $alert = $("#alert")
    $alert.text(message)
    $alert.addClass(clazz)
    $alert.removeClass(removedClazz)
    $alert.attr("style", "display: block")
}

function calculateCounters(selector) {

    let resultTxt = $(selector).val()
    let characterCount = resultTxt.split("").filter(x => x.replaceAll(/\s*/g, '') && Boolean).length
    let lineCount = resultTxt.split("\n").filter(x => x.replaceAll(/\s*/g, '') && Boolean).length

    let wordCount = 0
    resultTxt.split("\n").forEach(element => {
        wordCount += element.split(" ").filter(Boolean).length
    });

    $("#counter").text(`Character count: ${characterCount} | Word count: ${wordCount} | Line count: ${lineCount}`)
}