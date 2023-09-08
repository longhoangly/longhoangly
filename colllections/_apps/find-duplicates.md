---
index: 7
name: Find Duplicates
css: ["tool.css"]
jss: ["ace.js", "tool.js", "apps/find-duplicates.js"]
---
{% capture intro %}
### Find Duplicates
<!-- separator -->
- This tool finds and removes duplicated lines from an input text
<!-- separator -->
- Additional provided some sorting options:
    - No Sorting
    - Ascending
    - Descending
- Based on input text, the tool will sort text as strings or numbers
{% endcapture %}

<div class="tool-wrapper mb-4">
  {{ intro | markdownify }}
</div>

<div class="tool-wrapper">
  <h3>Find Duplicates</h3>
  <br>

  <button id="copyDup" type="button" class="btn btn-outline-dark mb-2">Copy Duplicates</button>
  <button id="copy" type="button" class="btn btn-outline-dark mb-2">Copy Result</button>
  <button id="clearDup" type="button" class="btn btn-outline-dark mb-2">Clear</button>
  <div id="alert" class="alert mt-2" role="alert" style="display: none"></div>

  <div class="no-gutters mt-3">
    <div class="row">
      <div class="col pr-1">
        <label class="form-label" for="input"><strong>Input your text into this box</strong></label>
        <div class="ace_editor" id="input" name="input"></div>
      </div>
      <div class="col pl-1">
        <label
          class="form-label"
          for="duplicates"
          ><strong>Duplicated lines shown in this box (n? times)</strong></label
        >
        <div class="ace_editor" id="duplicates" name="duplicates"></div>
      </div>
    </div>

    <br>
    <form class="form-inline w-100 mb-2">
      <label class="form-check-label me-3" for="sorting">Sorting</label>
      <div class="form-check form-check-inline me-3">
        <input class="form-check-input" type="radio" name="sorting" id="noSorting" value="noSorting" checked>
        <label class="form-check-label" for="noSorting">No sorting</label>
      </div>

      <div class="form-check form-check-inline me-3">
        <input class="form-check-input" type="radio" name="sorting" id="ascending" value="ascending">
        <label class="form-check-label" for="ascending">Ascending</label>
      </div>

      <div class="form-check form-check-inline me-3">
        <input class="form-check-input" type="radio" name="sorting" id="descending" value="descending">
        <label class="form-check-label" for="descending">Descending</label>
      </div>
    </form>

    <label class="form-label" for="result"><strong>Result: output textbox with duplicates removed!</strong></label>
    <div class="ace_editor" id="result" name="result"></div>
    <label id="counter" class="form-label" for="result">Character count: 0 | Word count: 0 | Line count: 0</label>
  </div>
</div>
