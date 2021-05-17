---
name: JSON Viewer / Editor
js: ["external/jsoneditor.min", "external/lodash.min"]
module: ["diff-wrapper", "json-viewer"]
css: ["external/jsoneditor.min", "apps/jsoneditor.custom"]
---

{% capture intro %}
### JSON Viewer / Compare JSON
<!--separator-->
- A simple viewer / editor to make your JSON more beautiful
- It has a toggle button to switch between two main modes
- Code view
- Tree view
<!--separator-->
{% endcapture %}


<div class="tool-wrapper mb-4">
    {{ intro | markdownify }}
</div>

<div class="tool-wrapper">

    <h3>JSON Viewer / Compare JSON</h3>

    <div class="form-check form-check mb-2">
        <input class="form-check-input" type="checkbox" id="compareJson" data-toggle="tooltip"
            title="check if you want to compare two JSON's.">
        <label class="form-check-label" for="compareJson">Compare JSON's?</label>
    </div>

    <div id="alert" class="alert mt-2" role="alert" style="display: none"></div>

    <div class="row my-3">

        <div class="col">
            <label class="form-label" for="jsoneditor1"><strong>Input your JSON here</strong></label>
            <br>
            <div id="jsoneditorLeft"></div>
        </div>

        <div id="secondView" class="col pl-0" style="display: none;">
            <label class="form-label" for="jsoneditor2"><strong>Second JSON to compare with</strong></label>
            <br>
            <div id="jsoneditorRight"></div>
        </div>

    </div>
</div>