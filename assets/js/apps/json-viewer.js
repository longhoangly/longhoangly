$(document).ready(() => {

    $(".col-lg-8").addClass("col-lg").removeClass("col-lg-8")

    const initialJson = {
        "Array": [1, 2, 3],
        "Boolean": true,
        "Null": null,
        "Number": 123,
        "Object": { "a": "b", "c": "d" },
        "String": "Hello World"
    }

    let jsoneditorId1 = "jsoneditor1"
    let changeModeSelector1 = `#${jsoneditorId1} .change-mode`

    let container1 = document.getElementById(jsoneditorId1)
    let options1 = {
        mode: "code",
        onChangeText: (jsonString) => {
            jsonEditor2.updateText(jsonString)
        },
        onChangeJSON: (jsonString) => {
            jsonEditor2.update(jsonString)
        },
        onModeChange: (newMode, oldMode) => {

            console.log('Mode switched from', oldMode, 'to', newMode)
            addToggleButton(jsoneditorId1, jsonEditor1.getMode())

            $(changeModeSelector1).on("click", () => {

                let currentMode = jsonEditor1.getMode()
                if (currentMode === "code") {

                    jsonEditor1.setMode("tree")
                    $(changeModeSelector1).removeClass("selected")
                } else {

                    jsonEditor1.setMode("code")
                    $(changeModeSelector1).addClass("selected")
                }
            })
        }
    }

    let jsonEditor1 = new JSONEditor(container1, options1, initialJson)
    addToggleButton(jsoneditorId1, jsonEditor1.getMode())

    $(changeModeSelector1).on("click", () => {

        let currentMode = jsonEditor1.getMode()
        if (currentMode === "code") {

            jsonEditor1.setMode("tree")
            $(changeModeSelector1).removeClass("selected")
        } else {

            jsonEditor1.setMode("code")
            $(changeModeSelector1).addClass("selected")
        }
    })

    let jsoneditorId2 = "jsoneditor2"
    let changeModeSelector2 = `#${jsoneditorId2} .change-mode`

    let container2 = document.getElementById(jsoneditorId2)
    let options2 = {
        mode: "tree",
        onChangeText: (jsonString) => {
            jsonEditor1.updateText(jsonString)
        },
        onChangeJSON: (jsonString) => {
            jsonEditor1.update(jsonString)
        },
        onModeChange: (newMode, oldMode) => {

            console.log('Mode switched from', oldMode, 'to', newMode)
            addToggleButton(jsoneditorId2, jsonEditor2.getMode())

            $(changeModeSelector2).on("click", () => {

                let currentMode = jsonEditor2.getMode()
                if (currentMode === "code") {

                    jsonEditor2.setMode("tree")
                    $(changeModeSelector2).removeClass("selected")
                } else {

                    jsonEditor2.setMode("code")
                    $(changeModeSelector2).addClass("selected")
                }
            })
        }
    }

    let jsonEditor2 = new JSONEditor(container2, options2, initialJson)
    addToggleButton(jsoneditorId2, jsonEditor2.getMode())

    $(changeModeSelector2).on("click", () => {

        let currentMode = jsonEditor2.getMode()
        if (currentMode === "code") {

            jsonEditor2.setMode("tree")
            $(changeModeSelector2).removeClass("selected")
        } else {

            jsonEditor2.setMode("code")
            $(changeModeSelector2).addClass("selected")
        }
    })
})

function addToggleButton(id, mode) {

    let editorMenu = document.querySelector(`#${id} .jsoneditor-menu`)
    var buttonChangeMode = document.createElement('button');
    buttonChangeMode.type = 'button';
    buttonChangeMode.className = 'change-mode';
    buttonChangeMode.title = "Toggle code mode on / off ";
    buttonChangeMode.innerHTML = '<i class="fas fa-code"></i>'
    editorMenu.prepend(buttonChangeMode); // create change mode button

    if (mode === "code") {
        $(`#${id} .change-mode`).addClass("selected")
    } else {
        $(`#${id} .change-mode`).removeClass("selected")
    }
}