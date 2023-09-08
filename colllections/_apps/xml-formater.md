---
index: 12
name: XML Formatter
css: ["tool.css", "apps/jsoneditor.custom.css"]
jss: ["ace.js", "tool.js", "apps/xml-formater.js"]
---
{% capture intro %}
### XML Formatter
<!-- separator -->
- A simple viewer / editor to make your XML readable and more beautiful
<!-- separator -->
{% endcapture %}

<div id="intro" class="tool-wrapper mb-4">
  {{ intro | markdownify }}
  <div id="alertIntro" class="alert mt-2" role="alert" style="display: none"></div>
</div>

<div class="tool-wrapper">
  <h3>XML Formatter</h3>

  <button id="formatXml" type="button" class="btn btn-outline-dark my-2">Format</button>
  <button id="clearXml" type="button" class="btn btn-outline-dark my-2">Clear</button>
  <div id="alert" class="alert mt-2" role="alert" style="display: none"></div>
  <br>

  <label class="form-label" for="xml-formatted"><strong>Input your XML here!</strong></label>
  <div class="ace_editor" id="xml-formatted" name="xml-formatted"></div>
</div>
