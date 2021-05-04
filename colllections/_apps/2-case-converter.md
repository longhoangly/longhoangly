---
name: Case Converter
link: /case-converter.html

title: Case Converter | Long Ly
js: case-converter
---

{% capture intro %}
### Case Converter
<!--separator-->
- This tool converts the input text into a desired case
- There are some cases supported:
    - lower case
    - UPPER CASE
    - Sentense case
    - Capitalized Case
    - Title Case (supported custom exceptions, input into textbox)
    - iNVERSE CASE
<!--separator-->
{% endcapture %}

<div class="tool-wrapper mb-4">
    {{ intro | markdownify }}
</div>

<div class="tool-wrapper">

    <h3>Case Converter</h3>
    <div class="row no-gutters align-items-center my-3">

        <form class="form-inline w-100">

            <label class="form-check-label mr-3" for="desiredCase">Desired Case</label>
            <div class="form-check form-check-inline mr-3">
                <input class="form-check-input" type="radio" name="desiredCase" id="lower" value="lower case" checked>
                <label class="form-check-label" for="lower">
                    lower case
                </label>
            </div>

            <div class="form-check form-check-inline mr-3">
                <input class="form-check-input" type="radio" name="desiredCase" id="upper" value="UPPER CASE">
                <label class="form-check-label" for="upper">
                    UPPER CASE
                </label>
            </div>

            <div class="form-check form-check-inline mr-3">
                <input class="form-check-input" type="radio" name="desiredCase" id="sentense" value="Sentense case">
                <label class="form-check-label" for="sentense">
                    Sentense case
                </label>
            </div>

            <div class="form-check form-check-inline mr-3">
                <input class="form-check-input" type="radio" name="desiredCase" id="capitalized"
                    value="Capitalized Case">
                <label class="form-check-label" for="capitalized">
                    Capitalized Case
                </label>
            </div>

            <div class="form-check form-check-inline mr-3">
                <input class="form-check-input" type="radio" name="desiredCase" id="title" value="Title Case">
                <label class="form-check-label" for="title">
                    Title Case
                </label>
            </div>

            <div class="form-check form-check-inline mr-3">
                <input class="form-check-input" type="radio" name="desiredCase" id="inverse" value="iNVERSE CASE">
                <label class="form-check-label" for="inverse">
                    iNVERSE CASE
                </label>
            </div>

            <div id="exceptions-wrapper" class="form-check col-sm-8 mt-2" style="display: none">
                <label class="form-check-label mr-2" for="exceptions">Exceptions</label>
                <input type="text" class="form-control w-100" id="exceptions"
                    value="along, the, and, nor, or, yet, so, a, amid, an, apud, as, at, atop, but, by, down, for, from, in, into, like, mid, near, next, of, off, on, onto, out, over, pace, past, per, plus, pro, qua, sans, save, than, till, to, unto, up, upon, via, vice, vs., with">
            </div>

        </form>

    </div>

    <button id="convert" type="button" class="btn btn-outline-dark">Convert</button>
    <button id="original" type="button" class="btn btn-outline-dark">Original</button>
    <button id="copy" type="button" class="btn btn-outline-dark">Copy</button>
    <button id="clear" type="button" class="btn btn-outline-dark">Clear</button>
    <button id="exceptionReset" type="button" class="btn btn-outline-dark" style="display: none">Reset
        Exceptions</button>
    <div id="alert" class="alert mt-2" role="alert" style="display: none"></div>

    <div class="no-gutters mt-3">
        <label class="form-label" for="result">Input your text here! <strong>Converted</strong> case text replaces
            yours!</label>
        <textarea type="text" id="result" name="result"></textarea>
        <label id="counter" class="form-label" for="result">Character count: 0 | Word count: 0 | Line count: 0</label>
    </div>

</div>