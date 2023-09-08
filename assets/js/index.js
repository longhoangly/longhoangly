import { Common } from "./base/common.js";
import { Constant } from "./base/constant.js";

$(document).ready(async () => {
    // Reder UI fields
    await Index.setupLayout();

    // Register handlers
    await Index.setupHandlers();

    // Load storage config
    await Index.nightModeChangedHandler(true);
    await Index.menuCollapsedChangedHandler(true);
    $("body").attr("style", "visibility: visible");

    // Ready logs
    Common.logWarning(Constant.FINISHED_APP_LOADING_MSG);
});

export class Index {
    static async setupLayout() {
        let fieldConfigs = [
            {
                type: "checked",
                handler: Index.nightModeChangedHandler,
                fields: [{ id: "nightMode", default: true }],
            },
            {
                type: "checked",
                handler: Index.menuCollapsedChangedHandler,
                fields: [{ id: "menuCollapsed", default: true }],
            },
        ];
        await Common.configDataFields(fieldConfigs);
    }

    static async setupHandlers() {
        $("#download").click(() => {
            window.open("https://github.com/longhoangly/longhoangly", "_blank");
        });
    }

    static async nightModeChangedHandler(isFirstLoad) {
        let nightMode = await Common.getStorage("nightMode");
        nightMode = isFirstLoad === true ? nightMode : !nightMode;

        Common.logWarning("nightMode", nightMode);
        await Common.setStorage("nightMode", nightMode);

        await Index.#setNavBarNightMode(nightMode);
        await Index.#setBodyNightMode(nightMode);
        await Index.#setFooterNightMode(nightMode);
    }

    static async menuCollapsedChangedHandler(isFirstLoad) {
        let menuCollapsed = await Common.getStorage("menuCollapsed");
        menuCollapsed = isFirstLoad === true ? true : !menuCollapsed;

        Common.logWarning("menuCollapsed", menuCollapsed);
        await Common.setStorage("menuCollapsed", menuCollapsed);

        let $menuCollapsedIcons = $("#menuCollapsed>i");
        await $menuCollapsedIcons.toggleClass("bi-x-lg", !menuCollapsed);
        await $menuCollapsedIcons.toggleClass("bi-list", menuCollapsed);
    }

    static async #setNavBarNightMode(isNight) {
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

        $nightModeBtn.attr(
            "title",
            `Switch to the ${isNight ? "light" : "dark"} theme`
        );
    }

    static async #setBodyNightMode(isNight) {
        let $body = $("body");
        $body.toggleClass("bg-dark text-light", isNight);
        $body.toggleClass("bg-light text-dark", !isNight);

        let $cards = $("[name='card']");
        $cards.toggleClass("bg-dark border-light", isNight);
        $cards.toggleClass("bg-light border-dark", !isNight);
    }

    static async #setFooterNightMode(isNight) {
        let $footer = $("footer");
        let $footerLinks = $("footer section>a");

        $footer.toggleClass("bg-dark text-light", isNight);
        $footerLinks.toggleClass("text-light", isNight);

        $footer.toggleClass("bg-light text-dark", !isNight);
        $footerLinks.toggleClass("text-dark", !isNight);

        $footerLinks.attr("data-mdb-ripple-color", isNight ? "light" : "dark");
    }
}
