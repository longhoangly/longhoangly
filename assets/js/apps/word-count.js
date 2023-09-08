import { Common } from "../base/common.js";
import { Tool } from "../tool.js";

$(document).ready(async () => {
    var resultEditor = await Tool.setupEditor("result");

    $("#result textarea").on("keyup paste", () => {
        WordCounter.calculateCounters(resultEditor);
        WordCounter.calculateKeywordDensity(resultEditor);
    });

    $("#clearCounters").click(async () => {
        $("#densityTable").html("");
        await resultEditor.setValue("");
        await WordCounter.calculateCounters(resultEditor);
    });
});

export class WordCounter {
    static async calculateCounters(editor) {
        let resultTxt = editor.getValue();
        let characterCountWoSpace = resultTxt
            .split("")
            .filter((x) => x.replaceAll(/\s*/g, "") && Boolean).length;
        let characterCount = resultTxt.split("").length;

        let wordCount = 0;
        resultTxt.split("\n").forEach((line) => {
            wordCount += line.split(" ").filter(Boolean).length;
        });

        let lineCount = resultTxt
            .split("\n")
            .filter((x) => x.replaceAll(/\s*/g, "") && Boolean).length;

        $("#characters").text(characterCount);
        $("#charactersWoSpace").text(characterCountWoSpace);
        $("#words").text(wordCount);
        $("#lines").text(lineCount);
    }

    static async calculateKeywordDensity(editor) {
        let resultTxt = editor.getValue();
        Common.logWarning("input words", resultTxt.split("\n"));
        await WordCounter.setKeywordDensity(resultTxt.split("\n"));
    }

    static async setKeywordDensity(lines) {
        let words = [];

        lines.forEach((line) => {
            line = line.replaceAll(
                /[.,;!?:\[\]\{\}\|\\@#$%^&*\(\)-+='/<>]/g,
                " "
            );
            words = words.concat(
                line.split(" ").filter((word) => word.trim() && Boolean)
            );
        });

        if (words.length == 0) {
            $("#densityTable").html("");
        }

        let uniqueMap = new Map();
        for (let i = 0; i < words.length; i++) {
            let currentCount = parseInt(uniqueMap.get(words[i]) || 0);
            uniqueMap.set(words[i], currentCount + 1);
        }

        let uniqueWords = [...uniqueMap.entries()].sort((a, b) => b[1] - a[1]);
        let loopSize = uniqueWords.length < 15 ? uniqueWords.length : 15;

        let tableBody;
        for (let i = 0; i < loopSize; i++) {
            tableBody += `<tr>
                <th scope="row">${i + 1}</th>
                <td>${uniqueWords[i][0]}</td>
                <td>${uniqueWords[i][1]}  ( ${(
                (uniqueWords[i][1] / words.length) *
                100
            ).toFixed(2)}% )</td >
            </tr > `;
        }

        $("#densityTable").html(tableBody);
    }
}
