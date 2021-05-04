
$(document).ready(() => {

    $("#find").on("click", () => {

        clearElementText("#result_1")
        clearElementText("#result_2")
        hideElement("#alert")
        findDifferences()
    })

    $("#clearDiff").on("click", () => {

        clearElementText("#input_1")
        clearElementText("#input_2")
        clearElementText("#result_1")
        clearElementText("#result_2")
        hideElement("#alert")
    })
})


function findDifferences() {

    let inputLines_1 = $("#input_1").val().split("\n").filter(x => x.trim() && Boolean)
    let inputLines_2 = $("#input_2").val().split("\n").filter(x => x.trim() && Boolean)

    let outputLines_1 = []
    let outputLines_3 = []
    inputLines_1.forEach(element => {
        if (!inputLines_2.includes(element)) {
            outputLines_1.push(`<div><mark>${element}</mark></div>`)
        } else {
            outputLines_3.push(element)
        }
    })

    let outputLines_2 = []
    inputLines_2.forEach(element => {
        if (!inputLines_1.includes(element)) {
            outputLines_2.push(`<div><mark>${element}</mark></div>`)
        }
    })

    if (inputLines_1.length !== inputLines_2.length) {

        displayAlertMessage("Not mached!! Two lists have different length!!", false)

    } else if (!outputLines_1.join(" ").includes("mark") && !outputLines_2.join(" ").includes("mark")) {

        displayAlertMessage("All matched!!!", true)
    } else {

        displayAlertMessage("Not matched!! Two list have the same length, but there are differences!!", false)
    }

    $("#result_1").html(outputLines_1.join("\n"))
    $("#result_2").html(outputLines_2.join("\n"))
    $("#result_3").html(outputLines_3.join("\n"))
}