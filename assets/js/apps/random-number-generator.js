$(document).ready(() => {

    $("#generate").on("click", () => {

        let qty = $("#num").val() || 0
        let from = parseInt($("#from").val())
        let to = parseInt($("#to").val())

        let separator = $("input[name='separator']:checked").val()
        let isUnique = $("#unique").is(":checked")

        hideElement("#alert")
        clearElementText("#result")
        generateRandomNumbers(qty, from, to, separator, isUnique)
    })

})

function generateRandomNumbers(qty, from, to, separator, isUnique) {

    if (qty == 0 || !from && from != 0 || !to && to != 0) {

        displayAlertMessage("Please check your inputs! All fields are required!", false)
        return

    } else if (from > to) {

        displayAlertMessage("Please check your inputs! 'max' value should be bigger than 'min' value!", false)
        return

    } else if (isUnique && to - from - 99 < qty) {

        displayAlertMessage("Unique flag checked! The range should be big enough (100 units) to compare with quantity of random number!", false)
        return
    }

    let numbers = []
    do {

        let randNum = Math.floor(Math.random() * (to - from + 1)) + from
        if (!isUnique) {

            numbers.push(randNum)
            qty--
        } else if (isUnique && !numbers.includes(randNum)) {

            numbers.push(randNum)
            qty--
        }

    } while (qty > 0)

    $("#result").val(separator == "+++" ? numbers.join("\n") : numbers.join(separator)).trigger("change")
}