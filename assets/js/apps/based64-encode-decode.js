
$(document).ready(() => {

    $("#input").on("change input", () => {

        clearElementText("#result")
        hideElement("#alert")
        sortingHandler(true)
    })

    $("#clearSort").on("click", () => {

        clearElementText("#input")
        clearElementText("#result")
        hideElement("#alert")
    })

    $("input[name='sorting']").on("change", () => {

        sortingHandler(true)
    })
})

function sortingHandler(hasAlert = false) {

    let strArray = $("#input").val().split("\n").filter(x => x.trim() && Boolean)
    console.log("strArray", strArray)

    if (strArray.length === 0) {
        if (hasAlert) {
            displayAlertMessage("Please enter text in input texbox!", false)
        }
        return
    }

    let sortedLines = sortLines(strArray)
    $("#result").val(sortedLines.join("\n")).trigger("change")
}


function sortLines(strArray) {

    let isNumbers = strArray.every((x) => {
        // "is Not a Number" => return true if the string is not a number!
        return !isNaN(x)
    })

    let sorting = $("input[name='sorting']:checked").val()

    switch (sorting) {

        case "descending":
            if (isNumbers) {
                strArray.sort((a, b) => { return b - a })
            } else {
                strArray.sort()
                strArray.reverse()
            }
            console.log("sort descending", strArray)
            break

        default:
            if (isNumbers) {
                strArray.sort((a, b) => { return a - b })
            } else {
                strArray.sort()
            }
            console.log("sort ascending", strArray)
    }

    return strArray
}