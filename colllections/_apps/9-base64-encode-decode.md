---
name: Base64 Encode Decode
---

{% capture intro %}
### Base64 Encode Decode
<!--separator-->
- A simple JavaScript online executer
- Console output (logs, errors, debugs) will be printted in console output box
<!--separator-->
{% endcapture %}

<div class="tool-wrapper mb-4">
    {{ intro | markdownify }}
</div>

<div class="tool-wrapper">

    <h3>Base64 Encode Decode</h3>

    <div class="row">
        <div class="col pr-1">

            <div class="col p-0">
                <label class="form-label" for="encodeInput"><strong>Input your string here</strong></label>
                <textarea type="text" id="encodeInput" name="encodeInput"></textarea>
            </div>

            <button id="encode" type="button" class="btn btn-outline-dark my-2">Encode</button>
            <button id="clearEncode" type="button" class="btn btn-outline-dark my-2">Clear</button>

            <div class="col p-0 mt-3">
                <label class="form-label" for="encodeOutput"><strong>Encoded base64 string</strong></label>
                <textarea class="textarea-sm" type="text" id="encodeOutput" name="encodeOutput" disabled></textarea>
            </div>

        </div>

        <div class="col pl-1">

            <div class="col p-0">
                <label class="form-label" for="decodeInput"><strong>Input your encoded string here</strong></label>
                <textarea type="text" id="decodeInput" name="decodeInput"></textarea>
            </div>

            <button id="decode" type="button" class="btn btn-outline-dark my-2">Decode</button>
            <button id="clearDecode" type="button" class="btn btn-outline-dark my-2">Clear</button>

            <div class="col p-0 mt-3">
                <label class="form-label" for="decodeOutput"><strong>Decoded base64 string</strong></label>
                <textarea class="textarea-sm" type="text" id="decodeOutput" name="decodeOutput" disabled></textarea>
            </div>

        </div>
    </div>
</div>