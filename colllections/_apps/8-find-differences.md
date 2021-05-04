---
name: Find Differences
js: find-differences
---

{% capture intro %}
### Find Differences
<!--separator-->
- This tool find all differences between two list of text lines
- The differences will be printted into output textbox
<!--separator-->
{% endcapture %}

<div class="tool-wrapper mb-4">
    {{ intro | markdownify }}
</div>

<div class="tool-wrapper">

    <h3>Find Differences</h3>

    <div class="no-gutters mt-2">

        <div class="row">

            <div class="col pr-1">
                <button id="find" type="button" class="btn btn-outline-dark my-2">Find</button>
                <button id="clearSort" type="button" class="btn btn-outline-dark my-2">Clear</button>
                <br>
                <label class="form-label" for="input_1"><strong>Input your first lines list</strong></label>
                <textarea type="text" id="input_1" name="input_1"></textarea>
            </div>

            <br>
            <div class="col pl-1">
                <div class="mb-2"></div>
                <br>
                <br>
                <label class="form-label" for="input_2"><strong>Input your second lines list</strong></label>
                <textarea type="text" id="input_2" name="input_2"></textarea>
            </div>

        </div>

        <div class="row">

            <div class="col pr-1">
                <label class="form-label" for="result_1"><strong>Lines in first list but not in second
                        one</strong></label>
                <textarea class="textarea-sm" type="text" id="result_1" name="result_1" disabled></textarea>
            </div>

            <br>
            <div class="col pl-1">
                <label class="form-label" for="result_2"><strong>Lines in second list but not in first
                        one</strong></label>
                <textarea class="textarea-sm" type="text" id="result_2" name="result_2" disabled></textarea>
            </div>

        </div>

        <label id="counter" class="form-label" for="result_1">Character count: 0 | Word count: 0 | Line count: 0</label>
        <div id="alert" class="alert mt-2" role="alert" style="display: none"></div>

    </div>

</div>