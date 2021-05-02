$(document).ready(() => {

    $("#download").on("click", () => {
        window.open("https://github.com/longhoangly/longhoangly.github.io", "_blank")
    })

    $("#nightMode").on("click", () => {
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
    $("body").attr("style", "visibility: visible")

    // Change navigation menu icon
    $("#changeToggle").on("click", () => {

        let isCollapsed = $("#navbarSupportedContent").hasClass("show")

        $changeToggleIcons = $("#changeToggle>i")
        $changeToggleIcons.toggleClass("fa-times", !isCollapsed)
        $changeToggleIcons.toggleClass("fa-bars", isCollapsed)
    })
})

$(window).on("load", () => {

    // Set sticky responsive footer
    let footerHeight = $("footer").outerHeight()
    console.log("footer height", footerHeight)

    let headerHeight = $("nav").outerHeight()
    console.log("header height", headerHeight)

    let minHeight = `calc(100vh - ${footerHeight + headerHeight}px)`
    console.log("main min height", minHeight)

    $("#main").attr("style", `min-height: ${minHeight};`)
})

function setNavBarNightMode(isNight) {

    let $nav = $("nav")
    let $navBtns = $("button")
    let $nightModeBtn = $("#nightMode")
    let $nightModeIcons = $("#nightMode>i")

    $nav.toggleClass("bg-dark navbar-dark", isNight)
    $navBtns.toggleClass("btn-outline-light", isNight)

    $nav.toggleClass("bg-light navbar-light", !isNight)
    $navBtns.toggleClass("btn-outline-dark", !isNight)

    $nightModeIcons.toggleClass("fa-moon", !isNight)
    $nightModeIcons.toggleClass("fa-sun", isNight)

    let theme = isNight ? "light" : "dark"
    $nightModeBtn.attr("title", `Switch to the ${theme} theme`)
}

function setBodyNightMode(isNight) {

    let $body = $("body")
    $body.toggleClass("bg-dark text-light", isNight)
    $body.toggleClass("bg-light text-dark", !isNight)

    let $cards = $("[name='card']")
    $cards.toggleClass("bg-dark border-light", isNight)
    $cards.toggleClass("bg-light border-dark", !isNight)
}

function setFooterNightMode(isNight) {

    let $footer = $("footer")
    $footerLinks = $("footer section>a")

    $footer.toggleClass("bg-dark text-light", isNight)
    $footerLinks.toggleClass("text-light", isNight)

    $footer.toggleClass("bg-light text-dark", !isNight)
    $footerLinks.toggleClass("text-dark", !isNight)

    $footerLinks.attr("data-mdb-ripple-color", isNight ? "light" : "dark")
}