---
index: 4
name: Random Number Generator
module: ["ace.js", "apps/random-number"]
---

{% capture intro %}
### Generate Random Number
<!-- separator -->
- This tool creates random numbers within a range
<!-- separator -->
  - Maximum quantity of number: 5000
  - Minimum value of the range: 0 
  - Maximum value of the range: 100000000000000000
  - Unique option to generate only unique numbers
{% endcapture %}

<div class="tool-wrapper mb-4">
  {{ intro | markdownify }}
</div>

<div class="tool-wrapper">
  <h3>Generate Random Number</h3>
  <div class="row no-gutters align-items-center my-3">
    <div class="col-auto">Generate</div>
    <input
      type="number"
      min="1"
      max="5000"
      class="col-auto form-control input-box-short"
      id="num"
      name="num"
      value="5"
      oninput="validity.valid||(value='5000');"
    >

    <div class="col-auto">random number(s) from</div>
    <input
      type="number"
      min="0"
      max="100000000000000000"
      class="col-auto form-control input-box-long"
      id="from"
      name="from"
      value="0"
      oninput="validity.valid||(value='0');"
    >

    <div class="col-auto">to</div>
    <input
      type="number"
      min="0"
      max="100000000000000000"
      class="col-auto form-control input-box-long"
      id="to"
      name="to"
      value="150"
      oninput="validity.valid||(value='100000000000000000');"
    >

    <div class="col-auto">in the box below</div>
  </div>

  <div class="no-gutters mb-3">
    <span class="me-3">Separated by?</span>

    <div class="form-check form-check-inline me-3">
      <input class="form-check-input" type="radio" name="separator" id="line" value="+++" checked>
      <label class="form-check-label" for="line"> New line </label>
    </div>

    <div class="form-check form-check-inline me-3">
      <input class="form-check-input" type="radio" name="separator" id="comma" value=",">
      <label class="form-check-label" for="comma"> Comma </label>
    </div>

    <div class="form-check form-check-inline me-3">
      <input class="form-check-input" type="radio" name="separator" id="space" value=" ">
      <label class="form-check-label" for="space"> Space </label>
    </div>

    <i class="bi bi-grip-vertical"></i>

    <div class="form-check form-check-inline ms-3">
      <input
        class="form-check-input"
        type="checkbox"
        id="unique"
        data-toggle="tooltip"
        title="check if you want to generate unique numbers."
      >
      <label class="form-check-label" for="unique">Unique numbers?</label>
    </div>
  </div>

  <button id="generate" type="button" class="btn btn-outline-dark">Generate</button>
  <button id="copy" type="button" class="btn btn-outline-dark">Copy</button>
  <button id="clear" type="button" class="btn btn-outline-dark">Clear</button>
  <div id="alert" class="alert mt-2" role="alert" style="display: none"></div>

  <div class="no-gutters mt-3">
    <label class="form-label" for="result"><strong>Generated</strong> random numbers</label>
    <div class="ace_editor" id="result" name="result"></div>
    <label id="counter" class="form-label" for="result">Character count: 0 | Word count: 0 | Line count: 0</label>
  </div>
</div>
