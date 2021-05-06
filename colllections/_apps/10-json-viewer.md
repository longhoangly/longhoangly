---
name: JSON Viewer / Editor
js: ["apps/json-viewer", "ace/ace"]
---

{% capture intro %}
### JSON Viewer / Editor
<!--separator-->
- A simple viewer / editer to make your JSON more beautiful
- It also supports to format JS code
<!--separator-->
{% endcapture %}


<div class="tool-wrapper mb-4">
    {{ intro | markdownify }}
</div>

<div class="tool-wrapper">

    <h3>JSON Viewer / Editor</h3>

    <div class="row">
        <div class="col pr-1">

            <div class="col p-0">
                <label class="form-label" for="editor"><strong>Input your JSON here</strong></label>
                <br>
                <div id="editor"></div>
            </div>

        </div>

        <div class="col pl-1">

            <div class="col p-0">
                <label class="form-label" for="decodeInput"><strong>Input your encoded string here</strong></label>
                <textarea type="text" id="decodeInput" name="decodeInput"></textarea>
            </div>

        </div>
    </div>

    <div id="alert" class="alert mt-2" role="alert" style="display: none"></div>

</div>