
$(document).ready(function () {
    $("#nightMode").on('click', function () {
        var isNight = $(this).attr('aria-pressed')

        setNavBarNightMode(isNight)
        setBodyNightMode(isNight)
        // setFooterNightMode(isNight)
    })
});

function setNavBarNightMode(isNight) {
    if (isNight === "false") {
        $("#navbar").removeClass("bg-light")
        $("#navbar").removeClass("navbar-light")
        $("#navbar.div.button").each(function (index, obj) {
            $(this).removeClass("btn-outline-dark")
        });

        $("#navbar").addClass("bg-dark")
        $("#navbar").addClass("navbar-dark")
        $("#navbar.div.button").each(function (index, obj) {
            $(this).addClass("btn-outline-light")
        });
    } else {
        $("#navbar").removeClass("bg-dark")
        $("#navbar").removeClass("navbar-dark")
        $("#navbar.div.button").each(function (index, obj) {
            $(this).removeClass("btn-outline-light")
        });

        $("#navbar").addClass("bg-light")
        $("#navbar").addClass("navbar-light")
        $("#navbar.div.button").each(function (index, obj) {
            $(this).addClass("btn-outline-dark")
        });
    }
}

function setBodyNightMode(isNight) {

    if (isNight === "false") {
        $("#body").removeClass("bg-light")
        $("#body").removeClass("text-dark")

        $("#body").addClass("bg-dark")
        $("#body").addClass("text-light")
    } else {
        $("#body").removeClass("bg-dark")
        $("#body").removeClass("text-light")

        $("#body").addClass("bg-light")
        $("#body").addClass("text-dark")
    }
}

function setFooterNightMode(isNight) {
    if (isNight === "false") {
        $("#footer").removeClass("bg-light")
        $("#footer").removeClass("text-dark")
        $("#footer_section.a").removeClass("text-dark")

        $("#footer").addClass("bg-dark")
        $("#footer").addClass("text-light")
        $("#footer_section.a").attr("data-mdb-ripple-color", "light")
    } else {
        $("#footer").removeClass("bg-dark")
        $("#footer").removeClass("text-light")
        $("#footer_section.a").removeClass("text-light")

        $("#footer").addClass("bg-light")
        $("#footer").addClass("text-dark")
        $("#footer_section.a").attr("data-mdb-ripple-color", "dark")
    }
}