'use strict';

import * as d from './diff-wrapper.js';

let editorId1 = "input_1"
let editorId2 = "input_2"

$(document).ready(() => {

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
        findAndHighlightDifferences(editor1, editorId1, editor2, editorId2)
    })

    $("#clearDiff").on("click", () => {
        editor1.setValue("")
        editor2.setValue("")
    })
})


function findAndHighlightDifferences(editor1, editorId1, editor2, editorId2) {

    let inputLines_1 = editor1.getValue().split("\n").filter(x => x.trim() && Boolean)
    let inputLines_2 = editor2.getValue().split("\n").filter(x => x.trim() && Boolean)

    // Change height
    let commonNumLines = inputLines_1.length >= inputLines_2.length ? inputLines_1.length : inputLines_2.length
    let commonHeight = `${(commonNumLines + 5) * 16}px`

    $(`#${editorId1}`).height(commonHeight)
    $(`#${editorId2}`).height(commonHeight)
    $(".ace_content").height(commonHeight)

    // find diffs
    let diffs = d.compareTwoArray(inputLines_1, inputLines_2)

    console.log("aDiff", diffs.aDiff)
    console.log("bDiff", diffs.bDiff)
    console.log("common", diffs.common)

    let leftIndexes = diffs.aDiff.keys()
    let index = leftIndexes.next()
    while (!index.done) {
        // if (diffs.common.has(index)) {
            $(`#${editorId1} .ace_line`).eq(index.value).addClass("different_element")
        // }
        index = leftIndexes.next()
    }

    let rightIndexes = diffs.bDiff.keys()
    index = rightIndexes.next()
    while (!index.done) {
        // if (diffs.common.has(index)) {
            $(`#${editorId2} .ace_line`).eq(index.value).addClass("different_element")
        // }
        index = rightIndexes.next()
    }

    if (inputLines_1.length !== inputLines_2.length) {

        alertWebMsg("Not mached!! Two lists have different lengths!!", false)

    } else if (diffs.aDiff.size === 0 && diffs.bDiff.size === 0) {

        alertWebMsg("Yay, all matched.", true)
    } else {

        alertWebMsg("Not matched!! Two lists have the same length, but there are differences!!", false)
    }
}