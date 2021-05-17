'use strict';

import * as d from './diff-wrapper.js';

$(document).ready(() => {

    $(".col-lg-8").addClass("col-lg").removeClass("col-lg-8")

    let jsonLeft = ""
    let idLeft = "jsoneditorLeft"
    let changeModeSelectorLeft = `#${idLeft} .change-mode`

    let optionsLeft = {

        mode: "code",
        onClassName: onClassName,
        onChangeJSON: (newJson) => {

            jsonLeft = newJson
            jsonEditorLeft.refresh()
            jsonEditorRight.refresh()
        },
        onChangeText: (jsonString) => {

            jsonLeft = isValidJson(jsonString)
            heightUpdateFunction(jsonEditorLeft, idLeft);
            highlightDiffsInCodeMode(jsonEditorLeft, idLeft, jsonEditorRight, idRight)
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


    let jsonRight = ""
    let optionsRight = {

        mode: "code",
        onClassName: onClassName,
        onChangeJSON: (newJson) => {

            jsonRight = newJson
            jsonEditorLeft.refresh()
            jsonEditorRight.refresh()
        },
        onChangeText: (jsonString) => {

            jsonRight = isValidJson(jsonString)
            heightUpdateFunction(jsonEditorRight, idRight);
            highlightDiffsInCodeMode(jsonEditorLeft, idLeft, jsonEditorRight, idRight)
        }
    }

    let idRight = "jsoneditorRight"
    let containerRight = document.getElementById(idRight)
    let jsonEditorRight = new JSONEditor(containerRight, optionsRight, jsonRight)

    function onClassName({ path, field, value }) {

        let nodeClass = "the_same_element"
        let compareJson = $("#compareJson").is(":checked")
        if (compareJson && validateInputJson(jsonEditorLeft) && validateInputJson(jsonEditorRight)) {

            let leftValue
            if (jsonLeft) {
                leftValue = _.get(jsonLeft, path)
            }

            let rightValue
            if (jsonRight) {
                rightValue = _.get(jsonRight, path)
            }

            if (leftValue === undefined || rightValue === undefined) {
                nodeClass = 'undefined'
            } else {
                nodeClass = _.isEqual(leftValue, rightValue) ? 'the_same_element' : 'different_element'
            }
        }

        return nodeClass
    }

    $("#compareJson").on("change", async () => {

        jsonEditorLeft.setMode("code")
        jsonEditorRight.setMode("code")
        $(".ace_line_group").removeClass("different_element")

        let compareJson = $("#compareJson").is(":checked")
        if (compareJson) {

            await displayElement("#secondView", "inline")

            await delayTime(100)
            highlightDiffsInCodeMode(jsonEditorLeft, idLeft, jsonEditorRight, idRight)
        } else {

            hideElement("#secondView")
        }
    })

    // Set initial size to match initial content
    heightUpdateFunction(jsonEditorLeft, idLeft);
    heightUpdateFunction(jsonEditorRight, idRight);
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

        if (jsonEditorLeft.getText().length > 0) {
            jsonEditorLeft.setMode("tree")
        } else {
            alertWebMsg("Please check your inputs. Valid JSON's required.", false)
        }

        if (jsonEditorRight.getText().length > 0) {
            jsonEditorRight.setMode("tree")
        } else {
            alertWebMsg("Please check your inputs. Valid JSON's required.", false)
        }

        $(changeModeSelectorLeft).removeClass("selected")
    } else {

        jsonEditorLeft.setMode("code")
        jsonEditorRight.setMode("code")
        $(changeModeSelectorLeft).addClass("selected")

        await delayTime(100)
        highlightDiffsInCodeMode(jsonEditorLeft, idLeft, jsonEditorRight, idRight)
    }
}

async function highlightDiffsInCodeMode(jsonEditorLeft, idLeft, jsonEditorRight, idRight) {

    $(".ace_line_group").removeClass("different_element")
    if (validateInputJson(jsonEditorLeft) && validateInputJson(jsonEditorRight)) {

        console.log("clearing highlights...")
        await delayTime(200)

        let compareJson = $("#compareJson").is(":checked")
        if (compareJson) {

            console.log("highlight diffs in code mode...")
            let diffs = d.getDiffLines(jsonEditorLeft.get(), jsonEditorRight.get())

            let leftIndexes = diffs.aDiff.keys()
            let index = leftIndexes.next();
            while (!index.done) {
                $(`#${idLeft} .ace_line_group`).eq(index.value).addClass("different_element")
                index = leftIndexes.next();
            }

            let rightIndexes = diffs.bDiff.keys()
            index = rightIndexes.next();
            while (!index.done) {
                $(`#${idRight} .ace_line_group`).eq(index.value).addClass("different_element")
                index = rightIndexes.next();
            }
        }
    }
}

function heightUpdateFunction(jsonEditor, editorId) {

    if (validateInputJson(jsonEditor)) {

        let noLines = d.getNumLines(jsonEditor.get())

        // 35 is menu height, 26 is status height
        let newHeight = `${(noLines + 2) * 16 + 35 + 26}px`;

        $(`#${editorId}`).height(newHeight);
    }
};

function validateInputJson(jsonEditor) {

    let isValid = false

    if (isValidJson(jsonEditor.getText()) !== undefined) {
        isValid = true
    } else {
        alertWebMsg("Please check your inputs. Valid JSON's required.", false)
    }

    return isValid
}