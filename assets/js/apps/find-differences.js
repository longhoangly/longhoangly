import { Common } from "../base/common.js";
import { Tool } from "../tool.js";

$(document).ready(async () => {
    var inEditor1 = await Tool.setupEditor("inTxt1");
    var inEditor2 = await Tool.setupEditor("inTxt2");
    var outEditor = await Tool.setupEditor("outTxt");
    var outEditor1 = await Tool.setupEditor("outTxt1");
    var outEditor2 = await Tool.setupEditor("outTxt2");

    $("#find").click(async () => {
        let diffs = await DifferencesFinder.findDifferences(
            inEditor1,
            inEditor2
        );
        outEditor.setValue(diffs.common.join("\n"));
        outEditor1.setValue(diffs.aDiff.join("\n"));
        outEditor2.setValue(diffs.bDiff.join("\n"));
    });

    $("#clearDiff").click(() => {
        inEditor1.setValue("");
        inEditor2.setValue("");
        outEditor.setValue("");
        outEditor1.setValue("");
        outEditor2.setValue("");
        Tool.hideElement("#alert");
    });
});

export class DifferencesFinder {
    static async findDifferences(editor1, editor2) {
        let inLines1 = editor1
            .getValue()
            .split("\n")
            .filter((x) => x.trim() && Boolean);
        let inLines2 = editor2
            .getValue()
            .split("\n")
            .filter((x) => x.trim() && Boolean);

        // find diffs
        return await Common.compareTwoArrays(inLines1, inLines2);
    }

    static async highlightDifferences(inLines1, inLines2) {
        if (
            inLines1 != undefined &&
            inLines1.length > 0 &&
            inLines2 != undefined &&
            inLines2.length > 0
        ) {
            if (inLines1.length !== inLines2.length) {
                Common.displayUiAlert(
                    "Not mached!! Two lists have different lengths!!",
                    false
                );
            } else if (diffs.aDiff.size === 0 && diffs.bDiff.size === 0) {
                Common.displayUiAlert("Yay, all matched.", true, false);
            } else {
                Common.displayUiAlert(
                    "Not matched!! Two lists have the same length, but there are different!!",
                    false
                );
            }
        }
    }
}
