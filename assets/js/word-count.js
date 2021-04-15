$(document).ready(function () {

    $("#result").on("change paste input", function () {
        calculateCounters("#result")
    })
})

function calculateCounters(selector) {

    let resultTxt = $(selector).val()
    let characterCount = resultTxt.split("").filter(x => x.replaceAll(/\s*/g, '') && Boolean).length
    let lineCount = resultTxt.split("\n").filter(x => x.replaceAll(/\s*/g, '') && Boolean).length

    let wordCount = 0
    resultTxt.split("\n").forEach(element => {
        wordCount += element.split(" ").filter(Boolean).length
    });

    $("#counter").text(`Character count: ${characterCount} | Word count: ${wordCount} | Line count: ${lineCount}`)
}