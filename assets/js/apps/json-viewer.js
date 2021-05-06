$(document).ready(() => {

    var editor = ace.edit("editor")
    editor.setTheme("ace/theme/twilight")
    editor.session.setMode("ace/mode/json")

    editor.setOptions({
        autoScrollEditorIntoView: true,
        copyWithEmptySelection: true,
        highlightActiveLine: true,
        highlightSelectedWord: true,
        selectionStyle: "text",
        minLines: 100,
        fontSize: 16
    })

})
