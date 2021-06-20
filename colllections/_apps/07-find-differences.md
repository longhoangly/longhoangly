---
name: Find Differences
js: ["external/ace/ace"]
module: ["diff-wrapper", "find-differences"]
css: ["apps/find-differences"]
---

{% capture intro %}

### Find Differences

<!--separator-->

- This tool find all differences between two list of text lines
- The differences will be printted into output textbox
<!--separator-->
{% endcapture %}

<div id="intro" class="tool-wrapper mb-4">
    {{ intro | markdownify }}
    <div id="alertIntro" class="alert mt-2" role="alert" style="display: none"></div>
</div>

<div class="tool-wrapper">

    <h3>Find Differences</h3>

    <div class="no-gutters mt-2">

        <div class="row">
            <div class="col pr-1">
                <button id="find" type="button" class="btn btn-outline-dark my-2">Find</button>
                <button id="clearDiff" type="button" class="btn btn-outline-dark my-2">Clear</button>
                <br>
                <label class="form-label" for="input_1"><strong>Input your first lines list</strong></label>
                <div class="textarea" id="input_1" name="input_1"></div>

            </div>

            <br>
            <div class="col pl-1">
                <div class="mb-2"></div>
                <br>
                <br>
                <label class="form-label" for="input_2"><strong>Input your second lines list</strong></label>
                <div class="textarea" id="input_2" name="input_2"></div>
            </div>
        </div>

        <div id="alert" class="alert mt-2" role="alert" style="display: none"></div>

    </div>

</div>