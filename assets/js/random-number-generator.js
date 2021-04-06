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

    } else if (isUnique && to - from + 1 < qty) {

        $("#error").text("Unique flag checked! The range should be bigger than quantity of random numbers!")
        $("#error").attr("style", "display: block")
        return
    }

    var inputs = Array(to - from + 1).fill().map((_, i) => i + from)
    var results = []

    for (i = 0; i < qty; i++) {
        const index = Math.floor(Math.random() * inputs.length)

        results.push(inputs[index])
        if (isUnique) {
            inputs.splice(index, 1)
        }
    }

    $("#result").val(separator == "+++" ? results.join("\n") : results.join(separator))
}

function cleanUpOldResult() {
    $("#result").val("")
    $("#error").attr("style", "display: none")
}