---
name: JSON Viewer / Editor
js: ["external/jsoneditor.min", "apps/json-viewer"]
css: ["external/jsoneditor.min", "apps/jsoneditor.custom"]
module: ["jsoneditor"]
---

{% capture intro %}
### JSON Viewer / Editor
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
    <div class="row">

        <div class="col pr-1">
            <label class="form-label" for="jsoneditor1"><strong>Input your JSON here</strong></label>
            <br>
            <div id="jsoneditor1"></div>
        </div>

        <div class="col pl-1">
            <label class="form-label" for="jsoneditor2"><strong>Synced JSON displayed here</strong></label>
            <br>
            <div id="jsoneditor2"></div>
        </div>

    </div>
</div>