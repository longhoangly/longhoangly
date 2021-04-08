$(document).ready(function () {

    $("#nightMode").on("click", function () {
        let isNight = localStorage.getItem("isNight") || false.toString()
        setButtonNightMode(isNight)
    })

    let isNight = localStorage.getItem("isNight") || false.toString()
    setButtonNightMode(isNight)

    $("#generate").on("click", function () {

        var qty = $("#num").val() || 0
        var from = parseInt($("#from").val())
        var to = parseInt($("#to").val())

        var separator = $("input[name='separator']:checked").val()
        var isUnique = $("#unique").is(":checked")

        cleanUpOldResult()
        generateRandomNumbers(qty, from, to, separator, isUnique)
    })
})

function setButtonNightMode(isNight) {

    $("button").toggleClass("btn-outline-light", isNight == "true")
    $("button").toggleClass("btn-outline-dark", isNight == "false")
}

function generateRandomNumbers(qty, from, to, separator, isUnique) {

    if (qty == 0 || !from && from != 0 || !to && to != 0) {

        $("#error").text("Please check your inputs! All fields are required!")
        $("#error").attr("style", "display: block")
        return

    } else if (from > to) {

        $("#error").text("Please check your inputs! 'max' value should be bigger than 'min' value!")
        $("#error").attr("style", "display: block")
        return

    } else if (isUnique && to - from - 99 < qty) {

        $("#error").text("Unique flag checked! The range should be big enough (100 units) to compare with quantity of random number!")
        $("#error").attr("style", "display: block")
        return
    }

    var numbers = []
    do {

        var randNum = Math.floor(Math.random() * (to - from + 1)) + from
        if (!isUnique) {

            numbers.push(randNum)
            qty--
        } else if (isUnique && !numbers.includes(randNum)) {

            numbers.push(randNum)
            qty--
        }

    } while (qty > 0)

    $("#result").val(separator == "+++" ? numbers.join("\n") : numbers.join(separator))
}

function cleanUpOldResult() {
    $("#result").val("")
    $("#error").attr("style", "display: none")
}