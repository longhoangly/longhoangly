
$(document).ready(function () {

    $("#nightMode").on("click", function () {

        // Everytime users click on night mode button, it means they want to change mode, then reversed current night mode value is user's expectation!
        let isNight = (!$("body").hasClass("bg-dark")).toString()
        console.log("save localStorage isNight", isNight)
        localStorage.setItem("isNight", isNight)

        setNavBarNightMode(isNight)
        setBodyNightMode(isNight)
        setFooterNightMode(isNight)
    })

    // Set night mode for website based on local storage memory
    let isNight = localStorage.getItem("isNight")
    console.log("get localStorage isNight", isNight)

    setNavBarNightMode(isNight)
    setBodyNightMode(isNight)
    setFooterNightMode(isNight)
    $("body").attr("style", "visibility: visible !important");
})

$(window).on("load", function () {

    // Set sticky responsive footer
    var offsetHeight = $("footer").outerHeight() + $("nav").outerHeight()
    var minHeight = `calc(100vh - ${offsetHeight}px)`

    $("#main").attr("style", `min-height: ${minHeight};`);
    console.log("main min-height", minHeight)
})

function setBodyNightMode(isNight) {

    if (isNight == "true") {
        $("body").addClass("bg-dark text-light").removeClass("bg-light text-dark")
    } else {
        $("body").addClass("bg-light text-dark").removeClass("bg-dark text-light")
    }
}

function setNavBarNightMode(isNight) {

    if (isNight == "true") {
        $("nav").addClass("bg-dark navbar-dark").removeClass("bg-light navbar-light")
        $("nav>div>button").addClass("btn-outline-light").removeClass("btn-outline-dark")
        $("#nightMode").text("Light Mode")
    } else {
        $("nav").addClass("bg-light navbar-light").removeClass("bg-dark navbar-dark")
        $("nav>div>button").addClass("btn-outline-dark").removeClass("btn-outline-light")
        $("#nightMode").text("Night Mode")
    }
}

function setFooterNightMode(isNight) {

    if (isNight == "true") {
        $("footer").addClass("bg-dark text-light").removeClass("bg-light text-dark")
        $("footer section>a").addClass("text-light").removeClass("text-dark").attr("data-mdb-ripple-color", "light")
    } else {
        $("footer").addClass("bg-light text-dark").removeClass("bg-dark text-light")
        $("footer section>a").addClass("text-dark").removeClass("text-light").attr("data-mdb-ripple-color", "dark")
    }
}