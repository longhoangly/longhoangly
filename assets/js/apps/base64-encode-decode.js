$(document).ready(() => {

    $("#encode").on("click", () => {

        clearElementText("#encodeOutput")
        encodeBase64Handler()
    })

    $("#clearEncode").on("click", () => {

        clearElementText("#encodeInput")
        clearElementText("#encodeOutput")
    })

    $("#copyEncode").on("click", () => {

        if ($("#encodeOutput").val().length == 0) {

            alertWebMsg("No encoded string!", false)
        } else {

            copyTextToClipboard("#encodeOutput")
            alertWebMsg("Encoded string copied into the clipboard.", true)
        }
    })

    $("#decode").on("click", () => {

        clearElementText("#decodeOutput")
        decodeBase64Handler()
    })

    $("#clearDecode").on("click", () => {

        clearElementText("#decodeInput")
        clearElementText("#decodeOutput")
    })

    $("#copyDecode").on("click", () => {

        if ($("#decodeOutput").val().length == 0) {

            alertWebMsg("No decoded string!", false)
        } else {

            copyTextToClipboard("#decodeOutput")
            alertWebMsg("Decoded string copied into the clipboard.", true)
        }
    })

    $("#parallel").on("change", () => {

        if ($("#parallel").is(":checked")) {

            $("#split76").prop("disabled", true);
        } else {
            $("#split76").prop("disabled", false);
        }
    })

    $("#split76").on("change", () => {

        if ($("#split76").is(":checked")) {

            $("#parallel").prop("disabled", true);
        } else {
            $("#parallel").prop("disabled", false);
        }
    })
})

function encodeBase64Handler() {

    let charset = $("input[name='charset']:checked").val()
    let input = $("#encodeInput").val()

    if (input.length === 0) {
        alertWebMsg("Please check your input! No text input!", false)
        return
    }

    let parallel = $("#parallel").is(":checked")
    if (!parallel) {

        let encoded = encodeBase64String(charset, input)
        let chunks = []

        let split76 = $("#split76").is(":checked")
        if (split76) {
            chunks = encoded.match(/.{1,76}/g)
        }

        $("#encodeOutput").val(split76 ? chunks.join("\n") : encoded)

    } else {

        let inputs = input.split("\n")
        let outputs = []

        for (let i = 0; i < inputs.length; i++) {

            let encoded = encodeBase64String(charset, inputs[i])
            outputs.push(encoded)
        }

        $("#encodeOutput").val(outputs.join("\n"))
    }
}

function encodeBase64String(charset, input) {

    let asciiInput = charset == "utf16" ? toBinary(input) : input
    let encoded = ""

    try {
        encoded = btoa(asciiInput)
    } catch (err) {
        alertWebMsg("Looks like input string does not have UTF-8 charset. Would you try UTF-16 charset?", false)
    }

    return encoded
}

function decodeBase64Handler() {

    let charset = $("input[name='charset']:checked").val()
    let input = $("#decodeInput").val()

    if (input.length === 0) {
        alertWebMsg("Please check your input! No text input!", false)
        return
    }

    let parallel = $("#parallel").is(":checked")
    if (!parallel) {

        let split76 = $("#split76").is(":checked")
        if (split76) {
            input = input.replaceAll("\n", "")
        }

        let decoded = decodeBase64String(input)
        let binaryOutput = charset == "utf16" ? fromBinary(decoded) : decoded
        $("#decodeOutput").val(binaryOutput)

    } else {

        let inputs = input.split("\n")
        let outputs = []

        for (let i = 0; i < inputs.length; i++) {

            let decoded = decodeBase64String(inputs[i])
            let binaryOutput = charset == "utf16" ? fromBinary(decoded) : decoded
            outputs.push(binaryOutput)
        }

        $("#decodeOutput").val(outputs.join("\n"))
    }
}

function decodeBase64String(input) {

    let decoded = ""
    try {
        decoded = atob(input)
    } catch (err) {
        alertWebMsg("Looks like input string does not have UTF-8 charset. Would you try UTF-16 charset?", false)
    }

    return decoded
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