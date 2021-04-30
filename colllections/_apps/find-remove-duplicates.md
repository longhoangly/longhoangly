---
title: Find / Remove Duplicates | Long Ly
js: find-remove-duplicates
---

{% capture intro %}
### Find / Remove Duplicates
- This tool finds and removes duplicated lines from an input text
- Additional provided some sorting options:
    - No Sorting
    - Ascending
    - Descending
{% endcapture %}

<div class="tool-wrapper mb-4">
    {{ intro | markdownify }}
</div>

<div class="tool-wrapper">

    <h3>Find / Remove Duplicates</h3>
    <br>

    <button id="cpDuplicates" type="button" class="btn btn-outline-dark mb-2">Copy Duplicates</button>
    <button id="copy" type="button" class="btn btn-outline-dark mb-2">Copy Result</button>
    <button id="clearDuplicates" type="button" class="btn btn-outline-dark mb-2">Clear</button>
    <div id="alert" class="alert mt-2" role="alert" style="display: none"></div>

    <div class="no-gutters mt-3">

        <div class="row">
            <div class="col pr-1">
                <label class="form-label" for="input"><strong>Input your text into this box</strong></label>
                <textarea type="text" id="input" name="input"></textarea>
            </div>
            <div class="col pl-1">
                <label class="form-label" for="duplicates"><strong>Duplicated lines shown in this box (n? times)</strong></label>
                <textarea type="text" id="duplicates" name="duplicates" disabled></textarea>
            </div>
        </div>

        <br>
        <form class="form-inline w-100 mb-2">

            <label class="form-check-label mr-3" for="sorting">Sorting</label>
            <div class="form-check form-check-inline mr-3">
                <input class="form-check-input" type="radio" name="sorting" id="noSorting" value="noSorting" checked>
                <label class="form-check-label" for="noSorting">
                    No sorting
                </label>
            </div>

            <div class="form-check form-check-inline mr-3">
                <input class="form-check-input" type="radio" name="sorting" id="ascending" value="ascending">
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

        <label class="form-label" for="result"><strong>Result: output textbox with duplicates removed!</strong></label>
        <textarea class="textarea-sm" type="text" id="result" name="result" disabled></textarea>
        <label id="counter" class="form-label" for="result">Character count: 0 | Word count: 0 | Line count: 0</label>
    </div>

</div>