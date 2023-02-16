---
index: 11
name: JSON Formatter
module: ["jsoneditor.min.js", "apps/json-formater"]
css: ["apps/jsoneditor.custom"]
---

{% capture intro %}
### JSON Formatter
<!-- separator -->
- A simple viewer / editor to make your JSON readable and more beautiful
<!-- separator -->
- Provide a toggle button to compare two JSON's
    - Auto compare will run in Tree view
    - Click Compare button to switch to Tree view and do comparation
- It also has a toggle button to switch between two main modes (on menu bar)
    - Code view
    - Tree view
{% endcapture %}

<div id="intro" class="tool-wrapper mb-4">
  {{ intro | markdownify }}
  <div id="alertIntro" class="alert mt-2" role="alert" style="display: none"></div>
</div>

<div class="tool-wrapper">
  <h3>JSON Formatter</h3>

  <div class="form-check form-check mb-2">
    <input
      class="form-check-input"
      type="checkbox"
      id="compareJson"
      data-toggle="tooltip"
      title="check if you want to compare two JSON's."
    >
    <label class="form-check-label" for="compareJson">Compare JSON's?</label>
  </div>

  <button id="compare" type="button" class="btn btn-outline-dark mb-2" style="display: none">Compare</button>
  <button id="clearJson" type="button" class="btn btn-outline-dark mb-2" style="display: none">Clear Comparation</button>
  <div id="alert" class="alert mt-2" role="alert" style="display: none"></div>

  <div class="row mb-4">
    <div class="col">
      <label class="form-label" for="jsoneditorLeft"><strong>Input your JSON here</strong></label>
      <br>
      <div id="jsoneditorLeft"></div>
    </div>

    <div id="secondView" class="col pl-0" style="display: none;">
      <label class="form-label" for="jsoneditorRight"><strong>Second JSON to compare with</strong></label>
      <br>
      <div id="jsoneditorRight"></div>
    </div>
  </div>
</div>
