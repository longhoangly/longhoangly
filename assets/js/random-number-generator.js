$(document).ready(function () {

    $("#nightMode").on("click", function () {
        let isNight = localStorage.getItem("isNight") || false.toString()
        setButtonNightMode(isNight)
    })

    let isNight = localStorage.getItem("isNight") || false.toString()
    setButtonNightMode(isNight)

    $("#generate").on("click", function () {
        var radioValue = $("input[name='separator']:checked").val();
        $("#result").text(radioValue)
        generateRandomNumbers(1, 1, 10, ",", true)
    })
})

function setButtonNightMode(isNight) {

    $("button").toggleClass("btn-outline-light", isNight == "true")
    $("button").toggleClass("btn-outline-dark", isNight == "false")
}

function generateRandomNumbers(qty, from, to, separator, isUnique) {

    var range = parseInt(from) - parseInt(to)
    console.log("range", range)

    var array = Array(range).fill().map((x,i)=>i);
    console.log("array", array)

}