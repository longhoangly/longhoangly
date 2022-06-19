import { Common } from "./common.js";

$(document).ready(async () => {
    $("#download").click(() => {
        window.open("https://github.com/longhoangly/longhoangly", "_blank");
    });

    $("#nightMode").click(() => {
        // bg-dark means users are in dark mode and want to change to light mode
        let isNight = !$("nav").hasClass("bg-dark");
        Common.setStorage("isNight", isNight);
        Main.setNavBarNightMode(isNight);
        Main.setBodyNightMode(isNight);
        Main.setFooterNightMode(isNight);
    });

    // Get dark mode for website based on local storage memory
    let isNight = (await Common.getStorage("isNight")) == "true" || false;
    Main.setNavBarNightMode(isNight);
    Main.setBodyNightMode(isNight);
    Main.setFooterNightMode(isNight);

    $("body").attr("style", "visibility: visible");

    // Change navigation menu icon
    $("#changeToggle").click(() => {
        let isCollapsed = $("#changeToggle").attr("aria-expanded") === "false";

        $changeToggleIcons = $("#changeToggle>i");
        $changeToggleIcons.toggleClass("bi-x-lg", !isCollapsed);
        $changeToggleIcons.toggleClass("bi-list", isCollapsed);
    });
});

$(window).on("load", () => {
    let footerHeight = $("footer").outerHeight();
    console.log("footer height", footerHeight);

    let headerHeight = $("nav").outerHeight();
    console.log("header height", headerHeight);

    let minHeight = `calc(100vh - ${footerHeight + headerHeight}px)`;
    console.log("main min height", minHeight);

    $("#main").attr("style", `min-height: ${minHeight};`);
});

class Main {
    static async setNavBarNightMode(isNight) {
        let $nav = $("nav");
        let $navBtns = $("button");
        let $nightModeBtn = $("#nightMode");
        let $nightModeIcons = $("#nightMode>i");

        $nav.toggleClass("bg-dark navbar-dark", isNight);
        $nav.toggleClass("bg-light navbar-light", !isNight);

        $navBtns.toggleClass("btn-outline-light", isNight);
        $navBtns.toggleClass("btn-outline-dark", !isNight);

        $nightModeIcons.toggleClass("bi-moon-fill", !isNight);
        $nightModeIcons.toggleClass("bi-sun", isNight);

        let theme = isNight ? "light" : "dark";
        $nightModeBtn.attr("title", `Switch to the ${theme} theme`);
    }

    static async setBodyNightMode(isNight) {
        let $body = $("body");
        $body.toggleClass("bg-dark text-light", isNight);
        $body.toggleClass("bg-light text-dark", !isNight);

        let $cards = $("[name='card']");
        $cards.toggleClass("bg-dark border-light", isNight);
        $cards.toggleClass("bg-light border-dark", !isNight);
    }

    static async setFooterNightMode(isNight) {
        let $footer = $("footer");
        let $footerLinks = $("footer section>a");

        $footer.toggleClass("bg-dark text-light", isNight);
        $footerLinks.toggleClass("text-light", isNight);

        $footer.toggleClass("bg-light text-dark", !isNight);
        $footerLinks.toggleClass("text-dark", !isNight);

        $footerLinks.attr("data-mdb-ripple-color", isNight ? "light" : "dark");
    }

    static async setButtonNightMode(isNight) {
        let $button = $("button");
        if ($button.length) {
            $button.toggleClass("btn-outline-light", isNight);
            $button.toggleClass("btn-outline-dark", !isNight);
        }
    }
}

export { Main };
