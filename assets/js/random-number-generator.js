$(document).ready(function () {

    $("#nightMode").on("click", function () {
        let isNight = localStorage.getItem("isNight") || false.toString()
        setButtonNightMode(isNight)
    })

    let isNight = localStorage.getItem("isNight") || false.toString()
    setButtonNightMode(isNight)

    $("#generate").on("click", function () {

        var qty = $("#num").val()
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

    if (from > to) {

        $("#error").text("Please check your input! 'max' value should be bigger than 'min' value!")
        $("#error").attr("style", "display: block")
        return

    } else if (isUnique && to - from -99 < qty) {

        $("#error").text("Unique flag checked! The range should be big enough (100 units) to compare with quantity of random number!")
        $("#error").attr("style", "display: block")
        return
    }

    var count = 0
    var results = []
    do {

        var randNum = Math.floor(Math.random() * (to - from)) + from
        if (!isUnique) {

            results.push(randNum)
            count++
        } else if (isUnique && !results.includes(randNum)) {

            results.push(randNum)
            count++
        }

    } while (count < qty)

    $("#result").val(separator == "+++" ? results.join("\n") : results.join(separator))
}

function cleanUpOldResult() {
    $("#result").val("")
    $("#error").attr("style", "display: none")
}