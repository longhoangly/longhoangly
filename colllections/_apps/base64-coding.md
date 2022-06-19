---
index: 9
name: Base64 Encode Decode
module: ["ace.js", "apps/base64-coding"]
break: true
---

{% capture intro %}
### Base64 Encode Decode
<!-- separator -->
- This tool provides encode and decode Base64 strings
<!-- separator -->
- It supports two main charsets (UTF-8, UTF-16) and also has options
    - Encode / decode each line separately
    - Split encoded string into 76 character wide chunks
{% endcapture %}

<div class="tool-wrapper mb-4">
  {{ intro | markdownify }}
</div>

<div class="tool-wrapper">
  <h3>Base64 Encode Decode</h3>

  <div class="form-check form-check-inline mt-3">
    <input
      class="form-check-input"
      type="checkbox"
      id="parallel"
      data-toggle="tooltip"
      title="check if you want to encode / decode multiple lines."
    >
    <label
      class="form-check-label"
      for="parallel"
      >Encode / decode each line separately (parallel proceed multiple lines)</label
    >
  </div>
  <br>

  <div class="form-check form-check-inline mb-3">
    <input
      class="form-check-input"
      type="checkbox"
      id="split76"
      data-toggle="tooltip"
      title="check if you want to encode / decode multiple lines."
    >
    <label class="form-check-label" for="split76">Split encoded string into 76 character wide chunks (MIME).</label>
  </div>

  <form class="form-inline w-100 mb-2">
    <label class="form-check-label me-3" for="charset">Charset</label>
    <div class="form-check form-check-inline me-3">
      <input class="form-check-input" type="radio" name="charset" id="utf8" value="utf8" checked>
      <label class="form-check-label" for="utf8"> UTF-8 </label>
    </div>

    <div class="form-check form-check-inline me-3">
      <input class="form-check-input" type="radio" name="charset" id="utf16" value="utf16">
      <label class="form-check-label" for="utf16"> UTF-16 </label>
    </div>
  </form>

  <div class="row">
    <div class="col pr-1">
      <div class="col p-0">
        <label class="form-label" for="encodeInput"><strong>Input your string here</strong></label>
        <div class="ace_editor" id="encodeInput" name="encodeInput"></div>
      </div>

      <button id="encode" type="button" class="btn btn-outline-dark my-2">Encode</button>
      <button id="clearEncode" type="button" class="btn btn-outline-dark my-2">Clear</button>
      <button id="copyEncode" type="button" class="btn btn-outline-dark my-2">Copy Encoded String</button>

      <div class="col p-0 mt-3">
        <label class="form-label" for="encodeOutput"><strong>Encoded base64 string</strong></label>
        <div class="ace_editor" id="encodeOutput" name="encodeOutput"></div>
      </div>
    </div>

    <div class="col pl-1">
      <div class="col p-0">
        <label class="form-label" for="decodeInput"><strong>Input your encoded string here</strong></label>
        <div class="ace_editor" id="decodeInput" name="decodeInput"></div>
      </div>

      <button id="decode" type="button" class="btn btn-outline-dark my-2">Decode</button>
      <button id="clearDecode" type="button" class="btn btn-outline-dark my-2">Clear</button>
      <button id="copyDecode" type="button" class="btn btn-outline-dark my-2">Copy Decoded String</button>

      <div class="col p-0 mt-3">
        <label class="form-label" for="decodeOutput"><strong>Decoded base64 string</strong></label>
        <div class="ace_editor" id="decodeOutput" name="decodeOutput"></div>
      </div>
    </div>
  </div>

  <div id="alert" class="alert mt-2" role="alert" style="display: none"></div>
</div>
