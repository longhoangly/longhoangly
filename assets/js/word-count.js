$(document).ready(() => {

    $("#result").on("change input", () => {

        calculateCounters("#result")
        calculateKeywordDensity("#result")
    })

    $("#clearCounters").on("click", () => {

        $("#densityTable").html("")
        clearElementText("#result")
        calculateCounters("#result")
    })
})

function calculateCounters(selector) {

    let resultTxt = $(selector).val()

    let characterCountWoSpace = resultTxt.split("").filter(x => x.replaceAll(/\s*/g, '') && Boolean).length
    let characterCount = resultTxt.split("").length

    let wordCount = 0
    resultTxt.split("\n").forEach(line => {
        wordCount += line.split(" ").filter(Boolean).length
    });

    let lineCount = resultTxt.split("\n").filter(x => x.replaceAll(/\s*/g, '') && Boolean).length

    $("#characters").text(characterCount)
    $("#charactersWoSpace").text(characterCountWoSpace)
    $("#words").text(wordCount)
    $("#lines").text(lineCount)
}

function calculateKeywordDensity(selector) {

    let resultTxt = $(selector).val()

    let words = []
    resultTxt.split("\n").forEach(line => {
        line = line.replaceAll(/[.,;!?:\[\]\{\}\|\\@#$%^&*\(\)-+='/<>]/g, " ")
        words = words.concat(line.split(" ").filter(word => word.trim() && Boolean))
    })

    if (words.length == 0) {
        $("#densityTable").html("")
    }

    let uniqueMap = new Map()
    for (i = 0; i < words.length; i++) {

        let currentCount = parseInt(uniqueMap.get(words[i]) || 0)
        uniqueMap.set(words[i], currentCount + 1)
    }

    let uniqueWords = [...uniqueMap.entries()].sort((a, b) => b[1] - a[1])
    let loopSize = uniqueWords.length < 12 ? uniqueWords.length : 12;

    let tableBody
    for (i = 0; i < loopSize; i++) {
        tableBody += `<tr>
            <th scope="row">${i + 1}</th>
            <td>${uniqueWords[i][0]}</td>
            <td>${uniqueWords[i][1]}  ( ${(uniqueWords[i][1] / words.length * 100).toFixed(2)}% )</td >
        </tr > `
    }

    $("#densityTable").html(tableBody)
}