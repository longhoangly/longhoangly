---
index: 6
name: Sort Lines
css: ["tool.css"]
jss: ["ace.js", "tool.js", "apps/sort-lines.js"]
---
{% capture intro %}
### Sort Lines
<!-- separator -->
- This tool sorts all lines from an input text
<!-- separator -->
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

  <div class="no-gutters mt-2">
    <div class="row">
      <div class="col pr-1">
        <button id="copy" type="button" class="btn btn-outline-dark my-2">Copy Result</button>
        <button id="clearSort" type="button" class="btn btn-outline-dark my-2">Clear</button>
        <br>

        <label class="form-label" for="input"><strong>Input your text into this box</strong></label>
        <div class="ace_editor" id="input" name="input"></div>
        <label
          id="counter"
          class="form-label"
          for="input"
          >Character count: 0 | Word count: 0 | Line count: 0</label
        >
      </div>

      <br>
      <div class="col pl-1">
        <form class="form-inline w-100 mb-2">
          <label class="form-check-label me-3" for="sorting">Sorting</label>

          <div class="form-check form-check-inline me-3">
            <input
              class="form-check-input"
              type="radio"
              name="sorting"
              id="ascending"
              value="ascending"
              checked
            >
            <label class="form-check-label" for="ascending">Ascending</label>
          </div>

          <div class="form-check form-check-inline me-3">
            <input class="form-check-input" type="radio" name="sorting" id="descending" value="descending">
            <label class="form-check-label" for="descending">Descending</label>
          </div>
        </form>

        <br>
        <label class="form-label" for="result"><strong>Result: output textbox with sorted lines</strong></label>
        <div class="ace_editor" id="result" name="result"></div>
      </div>
    </div>

    <div id="alert" class="alert mt-2" role="alert" style="display: none"></div>
  </div>
</div>
