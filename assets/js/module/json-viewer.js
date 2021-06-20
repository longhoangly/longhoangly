'use strict';

import * as d from './diff-wrapper.js';

let compareClicked = false
let diffs = undefined

let idLeft = "jsoneditorLeft"
let jsonEditorRight = undefined

let idRight = "jsoneditorRight"
let jsonEditorLeft = undefined

$(document).ready(() => {

    // modify class to make editors bigger
    $(".col-lg-8").addClass("col-lg").removeClass("col-lg-8")


    // Json editor on the right
    let jsonRight = {}
    let optionsRight = {

        mode: "code",
        onClassName: onClassName,
        onChangeJSON: (newJson) => {

            compareClicked = false
            jsonRight = newJson
            jsonEditorLeft.refresh()
            jsonEditorRight.refresh()
        },
        onChangeText: (jsonString) => {

            compareClicked = false
            if (isValidJson(jsonString)) {
                jsonRight = JsonFromString(jsonString)
                clearHighlights()
            }
        }
    }

    let containerRight = document.getElementById(idRight)
    jsonEditorRight = new JSONEditor(containerRight, optionsRight, jsonRight)
    jsonEditorRight.aceEditor.session.on("changeScrollTop", scrollHandler)


    // Json editor on the left
    let jsonLeft = {}
    let optionsLeft = {

        modes: ["code", "tree"],
        onClassName: onClassName,
        onChangeJSON: (newJson) => {

            compareClicked = false
            jsonLeft = newJson
            jsonEditorLeft.refresh()
            jsonEditorRight.refresh()
        },
        onChangeText: (jsonString) => {

            compareClicked = false
            if (isValidJson(jsonString)) {
                jsonLeft = JsonFromString(jsonString)
                clearHighlights()
            }
        },
        onModeChange: (newMode, oldMode) => {

            compareClicked = false
            console.log("change to mode", newMode)
            jsonEditorRight.setMode(newMode)
        }
    }

    let containerLeft = document.getElementById(idLeft)
    jsonEditorLeft = new JSONEditor(containerLeft, optionsLeft, jsonLeft)
    jsonEditorLeft.aceEditor.session.on("changeScrollTop", scrollHandler)


    // fallback function to highlight diffs in tree mode
    function onClassName({ path, field, value }) {

        let nodeClass = "the_same_element"
        if (field !== undefined) {
            let compareJson = $("#compareJson").is(":checked")
            if (compareJson && isValidJson(jsonEditorLeft.getText()) && isValidJson(jsonEditorRight.getText())) {

                let leftValue = _.get(jsonLeft, path)
                let rightValue = _.get(jsonRight, path)

                if (leftValue === undefined || rightValue === undefined) {
                    nodeClass = "undefined"
                } else {
                    nodeClass = _.isEqual(leftValue, rightValue) ? "the_same_element" : "different_element"
                }
            }
        }

        return nodeClass
    }


    // compareJson checkbox handler
    $("#compareJson").on("change", () => {

        jsonEditorRight.setMode("code")
        jsonEditorLeft.setMode("code")
        clearHighlights()

        // hide or show right json editor when user click on compare json checkbox
        let compareJson = $("#compareJson").is(":checked")
        if (compareJson) {

            displayElement("#compare")
            displayElement("#clearJson")
            displayElement("#secondView", "inline")
        } else {

            hideElement("#compare")
            hideElement("#clearJson")
            hideElement("#secondView")
        }

        // make sure json editor right has correct height
        formatJsonInCodeMode(jsonEditorRight)
    })


    // compare jsons handler
    $("#compare").on("click", async () => {

        compareClicked = true
        formatJsonInCodeMode(jsonEditorLeft)
        formatJsonInCodeMode(jsonEditorRight)

        diffs = await getDiffs()
        highlightDiffsInCodeMode()

        jsonEditorLeft.aceEditor.session.off("changeScrollTop", scrollHandler)
        jsonEditorRight.aceEditor.session.off("changeScrollTop", scrollHandler)

        jsonEditorLeft.aceEditor.session.on("changeScrollTop", scrollHandler)
        jsonEditorRight.aceEditor.session.on("changeScrollTop", scrollHandler)
    })


    // clear jsons in editors
    $("#clearJson").on("click", () => {

        compareClicked = false
        clearHighlights()
    })
})

$(window).on("load", async () => {
    await alertIntroMsg(introAlertMsg, true, introShowingTime)
})

async function getDiffs() {

    if (isValidJson(jsonEditorLeft.getText()) && isValidJson(jsonEditorRight.getText())) {

        await delayTime(200)
        let diffs = d.getDiffLines(jsonEditorLeft.get(), jsonEditorRight.get())

        const aLines = JsonFromObjWithNewLines(jsonEditorLeft.get()).split('\n');
        const bLines = JsonFromObjWithNewLines(jsonEditorRight.get()).split('\n');

        if (aLines.length !== bLines.length) {

            alertWebMsg("Not mached!! Two JSON's have different lengths!!", false, false)
        } else if (diffs.aDiff.size === 0 && diffs.bDiff.size === 0) {

            alertWebMsg("Yay, all matched.", true, false)
        } else {

            alertWebMsg("Not matched!! Two JSON's have the same length, but there are different!!", false, false)
        }

        return diffs
    }

    return undefined
}

async function highlightDiffsInCodeMode() {

    console.log("highlight diffs in code mode...")
    if (compareClicked) {

        diffs = await getDiffs()
        if (diffs) {
            let startLine_1 = $(`#${idLeft} .ace_gutter-cell`).eq(0).text()
            let startLine_2 = $(`#${idRight} .ace_gutter-cell`).eq(0).text()

            let leftIndexes = diffs.aDiff.keys()
            let index = leftIndexes.next()
            while (!index.done) {
                if (!diffs.common.has(index) && index.value + 1 - startLine_1 >= 0) {
                    $(`#${idLeft} .ace_line_group`).eq(index.value + 1 - startLine_1).addClass("different_element")
                }
                index = leftIndexes.next()
            }

            let rightIndexes = diffs.bDiff.keys()
            index = rightIndexes.next()
            while (!index.done) {
                if (!diffs.common.has(index) && index.value + 1 - startLine_2 >= 0) {
                    $(`#${idRight} .ace_line_group`).eq(index.value + 1 - startLine_2).addClass("different_element")
                }
                index = rightIndexes.next()
            }
        }
    }
}

function clearHighlights() {
    $(".ace_line_group").removeClass("different_element")
}

async function scrollHandler() {
    await delayTime(100)
    highlightDiffsInCodeMode()
}

function formatJsonInCodeMode(jsonEditor) {
    let compareJson = $("#compareJson").is(":checked")
    let mode = jsonEditor.getMode()

    if (compareJson && mode === "code") {
        jsonEditor.set(jsonEditor.get())
    }
}