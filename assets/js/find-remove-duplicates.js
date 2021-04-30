
$(document).ready(() => {

    let $input = $("#input")
    let $duplicates = $("#duplicates")
    let $result = $("#result")

    $input.on("change input", () => {

        hideElement("#alert")
        clearElementText("#result")
        clearElementText("#duplicates")

        let strArray = $input.val().split("\n").filter(x => x.replaceAll(/\s*/g, '') && Boolean)
        console.log("strArray", strArray)

        if (strArray.length === 0) {
            displayAlertMessage("Please enter text in input texbox!", false)
            return
        }

        let duplicateStrs = getDuplicates(strArray)
        if (duplicateStrs.length > 0) {

            $duplicates.val(duplicateStrs.join("\n"))

            let uniques = getUniques(strArray)
            $result.val(uniques.join("\n")).trigger("change")

        } else {
            displayAlertMessage("No duplicates found! All lines are unique.", true)
        }
    })

    $("#cpDuplicates").on("click", () => {

        if ($("#result").val().length == 0) {

            displayAlertMessage("Nothing in duplicate box!", false)
        } else {

            copyTextToClipboard("#duplicates")
            displayAlertMessage("Duplicated text copied into the clipboard!", true)
        }
    })


    $("#clearDuplicates").on("click", () => {

        hideElement("#alert")

        clearElementText("#input")
        clearElementText("#duplicates")
        clearElementText("#result")

        calculateCounters("#result")
    })

    $("input[name='sorting']").on("change", () => {

        let strArray = $input.val().split("\n").filter(x => x.replaceAll(/\s*/g, '') && Boolean)

        if (strArray.length === 0) {
            displayAlertMessage("Please enter text in input texbox!", false)
            return
        }

        let uniques = getUniques(strArray)
        uniqueSortingHandler(uniques)
    })
})

function getDuplicates(strArray) {

    let valueMap = new Map()
    for (i = 0; i < strArray.length; i++) {

        let currentCount = parseInt(valueMap.get(strArray[i]) || 0)
        valueMap.set(strArray[i], currentCount + 1)
    }

    let duplicates = [...valueMap.entries()].sort((a, b) => b[1] - a[1])

    let duplicateStrs = []
    duplicates.forEach((x) => {

        if (x[1] > 1) {
            duplicateStrs.push(x.join(" (") + ")")
        }
    })

    console.log("duplicateStrs", duplicateStrs)
    return duplicateStrs
}

function getUniques(strArray) {

    let uniques = strArray.filter((v, i, a) => a.indexOf(v) === i)

    return uniques
}

function uniqueSortingHandler(resultArray) {

    let isNumbers = resultArray.every((x) => {
        // "is Not a Number" => return true if the string is not a number!
        return !isNaN(x)
    })
    console.log("isNumbers", isNumbers)

    let $result = $("#result")
    let sorting = $("input[name='sorting']:checked").val()

    switch (sorting) {

        case "ascending":

            if (isNumbers) {
                resultArray.sort((a, b) => { return a - b })
            } else {
                resultArray.sort()
            }

            console.log("sort ascending", resultArray)
            $result.val(resultArray.join("\n")).trigger("change")
            break

        case "descending":

            if (isNumbers) {
                resultArray.sort((a, b) => { return b - a })
            } else {
                resultArray.sort()
                resultArray.reverse()
            }

            console.log("sort descending", resultArray)
            $result.val(resultArray.join("\n")).trigger("change")
            break

        case "noSorting":
            console.log("no-sorting", resultArray)
            $result.val(resultArray.join("\n")).trigger("change")
    }
}