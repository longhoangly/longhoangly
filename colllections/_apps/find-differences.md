---
index: 8
name: Find Differences
module: ["ace.js", "apps/find-differences"]
---

{% capture intro %}
### Find Differences
<!-- separator -->
- This tool find all differences between two list of text lines
- The differences will be printted into output textbox
<!-- separator -->
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
        <br>
        <label class="form-label" for="inTxt1"><strong>Input first lines list</strong></label>
        <div class="ace_editor" id="inTxt1" name="inTxt1"></div>
      </div>

      <div class="col pl-1">
        <div class="mb-2"></div>
        <br>
        <br>
        <br>
        <label class="form-label" for="inTxt2"><strong>Input second lines list</strong></label>
        <div class="ace_editor" id="inTxt2" name="inTxt2"></div>
      </div>
    </div>

    <br>
    <div class="row">
      <br>
      <div class="col pl-1">
        <label class="form-label" for="outTxt"><strong>Lines belong to both list</strong></label>
        <div class="ace_editor" id="outTxt" name="outTxt"></div>
      </div>
    </div>

    <br>
    <div class="row">
      <div class="col pr-1">
        <label class="form-label" for="outTxt1"><strong>Lines belong only to the first list</strong></label>
        <div class="ace_editor" id="outTxt1" name="outTxt1"></div>
      </div>

      <br>
      <div class="col pl-1">
        <label class="form-label" for="outTxt2"><strong>Lines belong only to the second list</strong></label>
        <div class="ace_editor" id="outTxt2" name="outTxt2"></div>
      </div>
    </div>

    <div id="alert" class="alert mt-2" role="alert" style="display: none"></div>
  </div>
</div>
