$(document).ready(function () {

    $("#nightMode").on("click", function () {
        let isNight = localStorage.getItem("isNight") == "true"
        setButtonNightMode(isNight)
    })

    let isNight = localStorage.getItem("isNight") == "true"
    setButtonNightMode(isNight)

    $("#generate").on("click", function () {

        var qty = $("#num").val() || 0
        var characters = $("#characters").val()
        var length = $("#length").val() || 1

        var separator = $("input[name='separator']:checked").val()
        var isUnique = $("#unique").is(":checked")

        cleanUpPreviousResult()
        generateRandomStrings(qty, characters, length, separator, isUnique)
    })

    $("#copy").on("click", function () {

        if ($("#result").val().length == 0) {

            displayAlertMessage("Nothing in text result!", false)

        } else {

            copyTextToClipboard("#result")
            displayAlertMessage("Text result copied into the clipboard!", true)
        }
    })
})

function generateRandomStrings(qty, characters, length, separator, isUnique) {

    if (!qty || qty == 0 || !characters && characters.length == 0 || !length || length == 0) {

        displayAlertMessage("Please check your inputs! All fields are required!", false)
        return
    }

    var strings = []
    do {

        var randString = ''
        for (var i = 0; i < length; i++) {
            randString += characters.charAt(Math.floor(Math.random() * characters.length))
        }

        if (!isUnique) {

            strings.push(randString)
            qty--
        } else if (isUnique && !strings.includes(randString)) {

            strings.push(randString)
            qty--
        }

    } while (qty > 0)

    $("#result").val(separator == "+++" ? strings.join("\n") : strings.join(separator))
}