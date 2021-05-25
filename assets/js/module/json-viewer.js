'use strict';

import * as d from './diff-wrapper.js';

$(document).ready(() => {

    // modify class to make editors bigger
    $(".col-lg-8").addClass("col-lg").removeClass("col-lg-8")

    // Json editor on the left
    let jsonLeft = {}
    let idLeft = "jsoneditorLeft"
    let changeModeSelectorLeft = `#${idLeft} .change-mode`

    let optionsLeft = {

        mode: "code",
        onClassName: onClassName,
        onChangeJSON: (newJson) => {

            jsonLeft = newJson
            jsonEditorLeft.refresh()
            jsonEditorRight.refresh()
            heightUpdateFunction(jsonEditorLeft, idLeft, jsonEditorRight, idRight)
        },
        onChangeText: (jsonString) => {

            if (isValidJson(jsonString)) {
                jsonLeft = JsonFromString(jsonString)
                heightUpdateFunction(jsonEditorLeft, idLeft, jsonEditorRight, idRight)
                clearHighlights()
            }
        },
        onModeChange: (newMode, oldMode) => {

            addToggleButton(idLeft, jsonEditorLeft.getMode())
            $(changeModeSelectorLeft).on("click", () => {
                changeModeHandler(changeModeSelectorLeft, jsonEditorLeft, idLeft, jsonEditorRight, idRight)
            })
        }
    }

    let containerLeft = document.getElementById(idLeft)
    let jsonEditorLeft = new JSONEditor(containerLeft, optionsLeft, jsonLeft)
    addToggleButton(idLeft, jsonEditorLeft.getMode())

    $(changeModeSelectorLeft).on("click", () => {
        changeModeHandler(changeModeSelectorLeft, jsonEditorLeft, idLeft, jsonEditorRight, idRight)
    })

    // Json editor on the right
    let jsonRight = {}
    let optionsRight = {

        mode: "code",
        onClassName: onClassName,
        onChangeJSON: (newJson) => {

            jsonRight = newJson
            jsonEditorLeft.refresh()
            jsonEditorRight.refresh()
            heightUpdateFunction(jsonEditorLeft, idLeft, jsonEditorRight, idRight)
        },
        onChangeText: (jsonString) => {

            if (isValidJson(jsonString)) {
                jsonRight = JsonFromString(jsonString)
                heightUpdateFunction(jsonEditorLeft, idLeft, jsonEditorRight, idRight)
                clearHighlights()
            }
        }
    }

    let idRight = "jsoneditorRight"
    let containerRight = document.getElementById(idRight)
    let jsonEditorRight = new JSONEditor(containerRight, optionsRight, jsonRight)

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

        jsonEditorLeft.setMode("code")
        jsonEditorRight.setMode("code")
        clearHighlights()

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

        formatHandler(jsonEditorRight)
    })

    // compare jsons handler
    $("#compare").on("click", () => {

        formatHandler(jsonEditorLeft)
        formatHandler(jsonEditorRight)
        highlightDiffsInCodeMode(jsonEditorLeft, idLeft, jsonEditorRight, idRight)
    })

    // clear jsons in editors
    $("#clearJson").on("click", () => {
        clearHighlights()
    })
})

function addToggleButton(containerId, mode) {

    let editorMenu = document.querySelector(`#${containerId} .jsoneditor-menu`)
    var buttonChangeMode = document.createElement('button')
    buttonChangeMode.type = 'button'
    buttonChangeMode.className = 'change-mode'
    buttonChangeMode.title = "Toggle code mode on / off "
    buttonChangeMode.innerHTML = '<i class="fas fa-code"></i>'
    editorMenu.prepend(buttonChangeMode) // create change mode button

    if (mode === "code") {
        $(`#${containerId} .change-mode`).addClass("selected")
    } else {
        $(`#${containerId} .change-mode`).removeClass("selected")
    }
}

async function changeModeHandler(changeModeSelectorLeft, jsonEditorLeft, idLeft, jsonEditorRight, idRight) {

    let currentMode = jsonEditorLeft.getMode()
    if (currentMode === "code") {

        if (jsonEditorLeft.getText().length === 0) {
            jsonEditorLeft.set({})
        }

        if (jsonEditorRight.getText().length === 0) {
            jsonEditorLeft.set({})
        }

        jsonEditorLeft.setMode("tree")
        jsonEditorRight.setMode("tree")
        $(changeModeSelectorLeft).removeClass("selected")

    } else {

        jsonEditorLeft.setMode("code")
        jsonEditorRight.setMode("code")
        $(changeModeSelectorLeft).addClass("selected")
    }
}

async function highlightDiffsInCodeMode(jsonEditorLeft, idLeft, jsonEditorRight, idRight) {

    if (isValidJson(jsonEditorLeft.getText()) && isValidJson(jsonEditorRight.getText())) {

        await delayTime(200)
        let compareJson = $("#compareJson").is(":checked")
        if (compareJson) {

            console.log("highlight diffs in code mode...")
            let diffs = d.getDiffLines(jsonEditorLeft.get(), jsonEditorRight.get())

            let leftIndexes = diffs.aDiff.keys()
            let index = leftIndexes.next()
            while (!index.done) {
                $(`#${idLeft} .ace_line_group`).eq(index.value).addClass("different_element")
                index = leftIndexes.next()
            }

            let rightIndexes = diffs.bDiff.keys()
            index = rightIndexes.next()
            while (!index.done) {
                $(`#${idRight} .ace_line_group`).eq(index.value).addClass("different_element")
                index = rightIndexes.next()
            }
        }
    }
}

function clearHighlights() {
    $(".ace_line_group").removeClass("different_element")
}

async function heightUpdateFunction(jsonEditorLeft, idLeft, jsonEditorRight, idRight) {

    let noLinesLeft = d.getNumLines(jsonEditorLeft.get())
    let noLinesRight = d.getNumLines(jsonEditorRight.get())

    // 35 is menu height, 26 is status height
    let newHeightLeft = `${(noLinesLeft + 2) * 16 + 35 + 26}px`
    let newHeightRight = `${(noLinesRight + 2) * 16 + 35 + 26}px`

    let commonHeight = newHeightLeft >= newHeightRight ? newHeightLeft : newHeightRight
    console.log("commonHeight", commonHeight)

    $(`#${idLeft}`).height(commonHeight)
    $(`#${idRight}`).height(commonHeight)
    $(".ace_content").height(commonHeight)
}

function formatHandler(jsonEditor) {

    let compareJson = $("#compareJson").is(":checked")
    let mode = jsonEditor.getMode()

    if (compareJson && mode === "code") {

        console.log("Formating Json...")
        jsonEditor.set(jsonEditor.get())
    }
}