'use strict';

import * as d from './diff-wrapper.js';

let editorId1 = "input_1"
let editorId2 = "input_2"

let inputLines_1 = undefined
let inputLines_2 = undefined
let diffs = undefined

$(document).ready(() => {

    // modify class to make editors bigger
    $(".col-lg-8").addClass("col-lg").removeClass("col-lg-8")

    var editor1 = ace.edit(editorId1)
    editor1.setTheme("ace/theme/solarized_light")
    editor1.session.setMode("ace/mode/text")
    document.getElementById(editorId1).style.fontSize = "16px"
    document.getElementById(editorId1).style.color = "#586E75"
    document.getElementById(editorId1).style.background = "lightyellow"

    var editor2 = ace.edit(editorId2)
    editor2.setTheme("ace/theme/solarized_light")
    editor2.session.setMode("ace/mode/text")
    document.getElementById(editorId2).style.fontSize = "16px"
    document.getElementById(editorId2).style.color = "#586E75"
    document.getElementById(editorId2).style.background = "lightyellow"

    $("#find").on("click", () => {
        findDifferences(editor1, editor2)
        highlightDifferences()
    })

    $("#clearDiff").on("click", () => {
        editor1.setValue("")
        editor2.setValue("")
        $("#alert").attr("style", "display: none;")
        inputLines_1 = undefined
        inputLines_2 = undefined
        diffs = undefined
    })

    editor1.session.on("changeScrollTop", async () => {
        await delayTime(100)
        highlightDifferences()
    })

    editor2.session.on("changeScrollTop", async () => {
        await delayTime(100)
        highlightDifferences()
    })
})

$(window).on("load", async () => {
    await alertIntroMsg(introAlertMsg, true, introShowingTime)
})

function findDifferences(editor1, editor2) {

    inputLines_1 = editor1.getValue().split("\n").filter(x => x.trim() && Boolean)
    inputLines_2 = editor2.getValue().split("\n").filter(x => x.trim() && Boolean)

    // find diffs
    diffs = d.compareTwoArray(inputLines_1, inputLines_2)
    console.log("common values", diffs.common)

    return diffs
}

function highlightDifferences() {

    if (inputLines_1 != undefined && inputLines_1.length > 0 &&
        inputLines_2 != undefined && inputLines_2.length > 0) {

        let startLine_1 = $(`#${editorId1} .ace_gutter-cell`).eq(0).text()
        let startLine_2 = $(`#${editorId2} .ace_gutter-cell`).eq(0).text()

        let leftIndexes = diffs.aDiff.keys()
        let index = leftIndexes.next()
        while (!index.done) {
            if (!diffs.common.has(index) && index.value + 1 - startLine_1 >= 0) {
                $(`#${editorId1} .ace_line`).eq(index.value + 1 - startLine_1).addClass("different_element")
            }
            index = leftIndexes.next()
        }

        let rightIndexes = diffs.bDiff.keys()
        index = rightIndexes.next()
        while (!index.done) {
            if (!diffs.common.has(index) && index.value + 1 - startLine_2 >= 0) {
                $(`#${editorId2} .ace_line`).eq(index.value + 1 - startLine_2).addClass("different_element")
            }
            index = rightIndexes.next()
        }

        if (inputLines_1.length !== inputLines_2.length) {

            alertWebMsg("Not mached!! Two lists have different lengths!!", false, false)
        } else if (diffs.aDiff.size === 0 && diffs.bDiff.size === 0) {

            alertWebMsg("Yay, all matched.", true, false)
        } else {

            alertWebMsg("Not matched!! Two lists have the same length, but there are different!!", false, false)
        }
    }
}