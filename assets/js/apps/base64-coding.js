import { Common } from "../base/common.js";
import { Tool } from "../tool.js";

$(document).ready(async () => {
    var encodeInput = await Tool.setupEditor("encodeInput");
    var encodeOutput = await Tool.setupEditor("encodeOutput");
    var decodeInput = await Tool.setupEditor("decodeInput");
    var decodeOutput = await Tool.setupEditor("decodeOutput");

    $("#encode").click(() => {
        encodeOutput.setValue("");
        Base64Encoder.encodeBase64Handler(encodeInput, encodeOutput);
    });

    $("#clearEncode").click(() => {
        encodeInput.setValue("");
        encodeOutput.setValue("");
    });

    $("#copyEncode").click(() => {
        if (encodeOutput.getValue().length == 0) {
            Common.displayUiAlert("No encoded string!", false);
        } else {
            Common.copyEditorTextToClipboard(encodeOutput);
            Common.displayUiAlert(
                "Encoded string copied into the clipboard.",
                true
            );
        }
    });

    $("#decode").click(() => {
        decodeOutput.setValue("");
        Base64Encoder.decodeBase64Handler(decodeInput, decodeOutput);
    });

    $("#clearDecode").click(() => {
        decodeInput.setValue("");
        decodeOutput.setValue("");
    });

    $("#copyDecode").click(() => {
        if (decodeOutput.getValue().length == 0) {
            Common.displayUiAlert("No decoded string!", false);
        } else {
            Common.copyEditorTextToClipboard(decodeOutput);
            Common.displayUiAlert(
                "Decoded string copied into the clipboard.",
                true
            );
        }
    });

    $("#parallel").on("change", () => {
        if ($("#parallel").is(":checked")) {
            $("#split76").prop("disabled", true);
        } else {
            $("#split76").prop("disabled", false);
        }
    });

    $("#split76").on("change", () => {
        if ($("#split76").is(":checked")) {
            $("#parallel").prop("disabled", true);
        } else {
            $("#parallel").prop("disabled", false);
        }
    });
});

export class Base64Encoder {
    static async encodeBase64Handler(encodeInput, encodeOutput) {
        let charset = $("input[name='charset']:checked").val();
        let input = encodeInput.getValue();

        if (input.length === 0) {
            Common.displayUiAlert(
                "Please check your input! No text input!",
                false
            );
            return;
        }

        let parallel = $("#parallel").is(":checked");
        if (!parallel) {
            let encoded = await Base64Encoder.encodeBase64String(
                charset,
                input
            );
            let chunks = [];

            let split76 = $("#split76").is(":checked");
            if (split76) {
                chunks = encoded.match(/.{1,76}/g);
            }

            encodeOutput.setValue(split76 ? chunks.join("\n") : encoded);
        } else {
            let inputs = input.split("\n");

            let outputs = [];
            for (let i = 0; i < inputs.length; i++) {
                let encoded = await Base64Encoder.encodeBase64String(
                    charset,
                    inputs[i]
                );
                outputs.push(encoded);
            }

            encodeOutput.setValue(outputs.join("\n"));
        }
    }

    static async encodeBase64String(charset, input) {
        let asciiInput =
            charset == "utf16" ? await Base64Encoder.toBinary(input) : input;
        let encoded = "";

        try {
            encoded = btoa(asciiInput);
        } catch (err) {
            Common.displayUiAlert(
                "Looks like input string does not have UTF-8 charset. Would you try UTF-16 charset?",
                false
            );
        }

        return encoded;
    }

    static async decodeBase64Handler(decodeInput, decodeOutput) {
        let charset = $("input[name='charset']:checked").val();
        let input = decodeInput.getValue();

        if (input.length === 0) {
            Common.displayUiAlert(
                "Please check your input! No text input!",
                false
            );
            return;
        }

        let parallel = $("#parallel").is(":checked");
        if (!parallel) {
            let split76 = $("#split76").is(":checked");
            if (split76) {
                input = input.replaceAll("\n", "");
            }

            let decoded = await Base64Encoder.decodeBase64String(input);
            let binaryOutput =
                charset == "utf16"
                    ? await Base64Encoder.fromBinary(decoded)
                    : decoded;
            decodeOutput.setValue(binaryOutput);
        } else {
            let inputs = input.split("\n");
            let outputs = [];

            for (let i = 0; i < inputs.length; i++) {
                let decoded = await Base64Encoder.decodeBase64String(inputs[i]);
                let binaryOutput =
                    charset == "utf16"
                        ? await Base64Encoder.fromBinary(decoded)
                        : decoded;
                outputs.push(binaryOutput);
            }

            decodeOutput.setValue(outputs.join("\n"));
        }
    }

    static async decodeBase64String(input) {
        let decoded = "";
        try {
            decoded = atob(input);
        } catch (err) {
            Common.displayUiAlert(
                "Looks like input string does not have UTF-8 charset. Would you try UTF-16 charset?",
                false
            );
        }

        return decoded;
    }

    static async toBinary(string) {
        const codeUnits = new Uint16Array(string.length);
        for (let i = 0; i < codeUnits.length; i++) {
            codeUnits[i] = string.charCodeAt(i);
        }

        try {
            return String.fromCharCode(...new Uint8Array(codeUnits.buffer));
        } catch (error) {
            console.error(error);
        }
    }

    static async fromBinary(binary) {
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < bytes.length; i++) {
            bytes[i] = binary.charCodeAt(i);
        }

        try {
            return String.fromCharCode(...new Uint16Array(bytes.buffer));
        } catch (error) {
            console.error(error);
        }
    }
}
