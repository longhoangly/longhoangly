---
title: Sort Lines | Long Ly
js: sort-lines
---

{% capture intro %}
### Sort Lines
- This tool sorts all lines from an input text
- There are two options for sorting:
    - Ascending
    - Descending
- These sorting options can work with text or numbers
{% endcapture %}

<div class="tool-wrapper mb-4">
    {{ intro | markdownify }}
</div>

<div class="tool-wrapper">

    <h3>Sort Lines</h3>

    <button id="copy" type="button" class="btn btn-outline-dark my-2">Copy Result</button>
    <button id="clearSort" type="button" class="btn btn-outline-dark my-2">Clear</button>
    <div id="alert" class="alert mt-2" role="alert" style="display: none"></div>

    <div class="no-gutters mt-2">

        <div class="col pr-1">
            <label class="form-label" for="input"><strong>Input your text into this box</strong></label>
            <textarea type="text" id="input" name="input"></textarea>
        </div>

        <br>
        <form class="form-inline w-100 mb-2">

            <label class="form-check-label mr-3" for="sorting">Sorting</label>

            <div class="form-check form-check-inline mr-3">
                <input class="form-check-input" type="radio" name="sorting" id="ascending" value="ascending" checked>
                <label class="form-check-label" for="ascending">
                    Ascending
                </label>
            </div>

            <div class="form-check form-check-inline mr-3">
                <input class="form-check-input" type="radio" name="sorting" id="descending" value="descending">
                <label class="form-check-label" for="descending">
                    Descending
                </label>
            </div>

        </form>

        <label class="form-label" for="result"><strong>Result: output textbox with sorted lines</strong></label>
        <textarea class="textarea-sm" type="text" id="result" name="result" disabled></textarea>

        <label id="counter" class="form-label" for="result">Character count: 0 | Word count: 0 | Line count: 0</label>
    </div>

</div>