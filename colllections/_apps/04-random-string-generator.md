---
name: Random String Generator
js: apps/random-string-generator
break: true
---

{% capture intro %}
### Generate Random String
<!-- separator -->
- This tool creates random strings from a list of given characters (letters and digits)
    - Maximum quantity of strings: 300
    - Minimum length of each string: 1
    - Maximum length of each string: 1000
- Unique option to generate only unique strings
<!-- separator -->
{% endcapture %}

<div class="tool-wrapper mb-4">
  {{ intro | markdownify }}
</div>

<div class="tool-wrapper">
  <h3>Generate Random String</h3>
  <div class="row no-gutters align-items-center my-3">
    <div>Generate</div>
    <input
      type="number"
      min="1"
      max="300"
      class="form-control input-box"
      id="num"
      name="num"
      value="5"
      oninput="validity.valid||(value='300');"
    >

    <div>random string(s) from</div>
    <input
      type="text"
      maxlength="1000"
      class="form-control input-box"
      id="characters"
      name="characters"
      value="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    >

    <div>with length</div>
    <input
      type="number"
      min="1"
      max="1000"
      class="form-control input-box"
      id="length"
      name="length"
      value="50"
      oninput="validity.valid||(value='1000');"
    >

    <div>in the box below</div>
  </div>

  <div class="no-gutters mb-3">
    <span class="me-3">Separate by?</span>

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
      <label class="form-check-label" for="space"> A space </label>
    </div>

    <i class="fas fa-grip-lines-vertical"></i>

    <div class="form-check form-check-inline ms-3">
      <input
        class="form-check-input"
        type="checkbox"
        id="unique"
        data-toggle="tooltip"
        title="check if you want to generate unique strings."
      >
      <label class="form-check-label" for="unique">Unique string?</label>
    </div>
  </div>

  <button id="generate" type="button" class="btn btn-outline-dark">Generate</button>
  <button id="copy" type="button" class="btn btn-outline-dark">Copy</button>
  <button id="clear" type="button" class="btn btn-outline-dark">Clear</button>
  <div id="alert" class="alert mt-2" role="alert" style="display: none"></div>

  <div class="no-gutters mt-3">
    <label class="form-label" for="result"><strong>Generated</strong> random strings</label>
    <textarea type="text" id="result" name="result"></textarea>
    <label id="counter" class="form-label" for="result">Character count: 0 | Word count: 0 | Line count: 0</label>
  </div>
</div>
