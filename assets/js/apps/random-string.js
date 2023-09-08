import { Common } from "../base/common.js";
import { Tool } from "../tool.js";

$(document).ready(async () => {
    var resultEditor = await Tool.setupEditor("result");

    $("#generate").click(() => {
        let qty = $("#num").val() || 0;
        let characters = $("#characters").val();
        let length = $("#length").val() || 1;

        let separator = $("input[name='separator']:checked").val();
        let isUnique = $("#unique").is(":checked");

        resultEditor.setValue("");
        StringGenerator.generateRandomStrings(
            resultEditor,
            qty,
            characters,
            length,
            separator,
            isUnique
        );
    });
});

export class StringGenerator {
    static async generateRandomStrings(
        editor,
        qty,
        characters,
        length,
        separator,
        isUnique
    ) {
        if (
            !qty ||
            qty == 0 ||
            (!characters && characters.length == 0) ||
            !length ||
            length == 0
        ) {
            Common.displayUiAlert(
                "Please check your inputs, all fields are required!",
                false
            );
            return;
        }

        let strings = [];
        do {
            let randString = "";
            for (let i = 0; i < length; i++) {
                randString += characters.charAt(
                    Math.floor(Math.random() * characters.length)
                );
            }

            if (!isUnique) {
                strings.push(randString);
                qty--;
            } else if (isUnique && !strings.includes(randString)) {
                strings.push(randString);
                qty--;
            }
        } while (qty > 0);

        editor.setValue(
            separator == "+++" ? strings.join("\n") : strings.join(separator)
        );
    }
}
