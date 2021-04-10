
$(document).ready(function () {

    $("#download").on("click", function () {
        window.open("https://github.com/longhoangly/longhoangly.github.io", "_blank")
    })

    $("#nightMode").on("click", function () {
        // Everytime users click on night mode button, it means they want to change mode
        // Then reversed current night mode value is user's expectation!
        let isNight = !$("nav").hasClass("bg-dark")
        localStorage.setItem("isNight", isNight)

        setNavBarNightMode(isNight)
        setBodyNightMode(isNight)
        setFooterNightMode(isNight)
    })

    // Set night mode for website based on local storage memory
    let isNight = localStorage.getItem("isNight") == "true" || false

    setNavBarNightMode(isNight)
    setBodyNightMode(isNight)
    setFooterNightMode(isNight)
    $("body").attr("style", "visibility: visible !important")


    // Change navigation menu icon
    $("#changeToggle").on("click", function () {

        var isCollapsed = $("#navbarSupportedContent").hasClass("show")
        $("#changeToggle>i").toggleClass("fa-times", !isCollapsed)
        $("#changeToggle>i").toggleClass("fa-bars", isCollapsed)
    })
})

$(window).on("load", function () {

    // Set sticky responsive footer
    var footerHeight = $("footer").outerHeight()
    console.log("footer height", footerHeight)

    var headerHeight = $("nav").outerHeight()
    console.log("header height", headerHeight)

    var minHeight = `calc(100vh - ${footerHeight + headerHeight}px)`
    console.log("main min height", minHeight)

    $("#main").attr("style", `min-height: ${minHeight};`)
})

function setNavBarNightMode(isNight) {

    $("nav").toggleClass("bg-dark navbar-dark", isNight)
    $("nav>div>button").toggleClass("btn-outline-light", isNight)

    $("nav").toggleClass("bg-light navbar-light", !isNight)
    $("nav>div>button").toggleClass("btn-outline-dark", !isNight)

    $("#nightMode>i").toggleClass("fa-moon", !isNight)
    $("#nightMode>i").toggleClass("fa-sun", isNight)

    var theme = isNight ? "light" : "dark"
    $("#nightMode").attr("title", `Switch to the ${theme} theme`)
}

function setBodyNightMode(isNight) {

    $("body").toggleClass("bg-dark text-light", isNight)
    $("body").toggleClass("bg-light text-dark", !isNight)
}

function setFooterNightMode(isNight) {

    $("footer").toggleClass("bg-dark text-light", isNight)
    $("footer section>a").toggleClass("text-light", isNight)

    $("footer").toggleClass("bg-light text-dark", !isNight)
    $("footer section>a").toggleClass("text-dark", !isNight)

    $("footer section>a").attr("data-mdb-ripple-color", isNight ? "light" : "dark")
}

function setButtonNightMode(isNight) {

    $("button").toggleClass("btn-outline-light", isNight)
    $("button").toggleClass("btn-outline-dark", !isNight)
}

function copyTextToClipboard(selector) {

    var $temp = $("<textarea>")
    var brRegex = /<br\s*[\/]?>/gi

    $("body").append($temp)
    $temp.val($(selector).val().replace(brRegex, "\r\n")).select()

    document.execCommand("copy")
    $temp.remove()
}

function cleanUpPreviousResult() {
    $("#result").val("")
    $("#alert").attr("style", "display: none")
}

function displayAlertMessage(message, isSuccess) {

    var clazz = isSuccess ? "alert-success" : "alert-danger"
    var obsoleteClazz = isSuccess ? "alert-danger" : "alert-success"

    $("#alert").text(message)
    $("#alert").addClass(clazz)
    $("#alert").removeClass(obsoleteClazz)
    $("#alert").attr("style", "display: block")
}