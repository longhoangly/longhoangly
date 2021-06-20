$(document).ready(() => {

    $("#copy").on("click", () => {

        if ($("#result").val().length == 0) {

            alertWebMsg("No text result!", false)
        } else {

            copyTextToClipboard("#result")
            alertWebMsg("Text result copied into the clipboard.", true)
        }
    })

    $("#clear").on("click", () => {

        clearElementText("#result")
        calculateCounters("#result")
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

function displayElement(selector, displayClass = "inline-flex") {

    let $element = $(selector)
    if ($element.length) {

        if ($element.attr("style").includes("visibility")) {

            $element.attr("style", "visibility: visible")
        } else {

            $element.attr("style", `display: ${displayClass};`)
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
        $element.html("").trigger("change")
    }
}

async function alertWebMsg(message, isSuccess, autoHide = true, timeout = 3) {

    let clazz = isSuccess ? "alert-success" : "alert-danger"
    let removedClazz = isSuccess ? "alert-danger" : "alert-success"

    $alert = $("#alert")
    $alert.text(message)
    $alert.addClass(clazz)
    $alert.removeClass(removedClazz)
    $alert.attr("style", "display: block;")

    if (autoHide) {
        await delayTime(timeout * 1000)
        $alert.attr("style", "display: none;")
    }
}

async function alertIntroMsg(message, isSuccess, autoHide = true, timeout = 3) {

    let clazz = isSuccess ? "alert-success" : "alert-danger"
    let removedClazz = isSuccess ? "alert-danger" : "alert-success"

    $alert = $("#alertIntro")
    $alert.text(message)
    $alert.addClass(clazz)
    $alert.removeClass(removedClazz)
    $alert.attr("style", "display: block;")

    if (autoHide) {
        await delayTime(timeout * 1000)
        $alert.attr("style", "display: none;")
    }

    $("#intro").attr("style", "display: none;")
}

function calculateCounters(selector) {

    let resultTxt = $(selector).val()
    let characterCount = resultTxt.split("").filter(x => x.replaceAll(/\s*/g, '') && Boolean).length
    let lineCount = resultTxt.split("\n").filter(x => x.replaceAll(/\s*/g, '') && Boolean).length

    let wordCount = 0
    resultTxt.split("\n").forEach(element => {
        wordCount += element.split(" ").filter(Boolean).length
    })

    $("#counter").text(`Character count: ${characterCount} | Word count: ${wordCount} | Line count: ${lineCount}`)
}