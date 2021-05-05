$(document).ready(() => {

    $("#encode").on("click", () => {

        clearElementText("#encodeOutput")
        hideElement("#alert")
        encodeBase64String()
    })

    $("#clearEncode").on("click", () => {

        clearElementText("#encodeInput")
        clearElementText("#encodeOutput")
        hideElement("#alert")
    })

    $("#decode").on("click", () => {

        clearElementText("#decodeOutput")
        hideElement("#alert")
        decodeBase64String()
    })

    $("#clearDecode").on("click", () => {

        clearElementText("#decodeInput")
        clearElementText("#decodeOutput")
        hideElement("#alert")
    })
})

function encodeBase64String() {

    let parallel = $("#parallel").is(":checked")
    let split76 = $("#split76").is(":checked")
    let charset = $("input[name='charset']:checked").val()

    let input = $("#encodeInput").val()

    let asciiInput = charset == "utf16" ? toBinary(input) : input
    let encoded = ""
    try {
        encoded = btoa(asciiInput)
    } catch (err) {
        displayAlertMessage("Looks like input string does not have UTF-8 charset. Would you try UTF-16 charset?", false)
    }

    let chunks = []
    if (split76) {
        chunks = encoded.match(/.{1,76}/g)
    }

    $("#encodeOutput").val(split76 ? chunks.join("\n") : encoded)
}

function decodeBase64String() {

    let parallel = $("#parallel").is(":checked")
    let split76 = $("#split76").is(":checked")
    let charset = $("input[name='charset']:checked").val()

    let input = $("#decodeInput").val()

    if (split76) {
        input = input.replaceAll("\n", "")
    }

    let encoded = ""
    try {
        encoded = atob(input)
    } catch (err) {
        displayAlertMessage("Looks like input string does not have UTF-8 charset. Would you try UTF-16 charset?", false)
    }

    let binaryOutput = charset == "utf16" ? fromBinary(encoded) : encoded
    $("#decodeOutput").val(binaryOutput)
}


function toBinary(string) {
    const codeUnits = new Uint16Array(string.length);
    for (let i = 0; i < codeUnits.length; i++) {
        codeUnits[i] = string.charCodeAt(i);
    }
    return String.fromCharCode(...new Uint8Array(codeUnits.buffer));
}

function fromBinary(binary) {
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < bytes.length; i++) {
        bytes[i] = binary.charCodeAt(i);
    }
    return String.fromCharCode(...new Uint16Array(bytes.buffer));
}