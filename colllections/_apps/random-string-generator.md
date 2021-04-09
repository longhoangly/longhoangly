---
title: Random String Generator | Long Ly
js: random-string-generator
---

<br>
{% capture intro %}
### Generate Random String
- This tool creates random strings from a list of given characters (letters and digits)
- Unique option to generate only unique strings
- Maximum quantity of strings: 5000
- Minimum length of each string: 1
- Maximum length of each string: 1000000000000000000000
{% endcapture %}

<div class="tool-wrapper tool-intro">
    {{ intro | markdownify }}
</div>

<div class="h-50 d-flex align-items-center justify-content-center">
    <div class="tool-wrapper tool-box">

        <h3>Generate Random String</h3>
        <div class="row no-gutters align-items-center my-2">

            <div>Generate</div>
            <input type="number" min="1" max="5000" class="input-box" id="num" name="num" value="5"
                oninput="validity.valid||(value='5000');">

            <div>random string(s) from</div>
            <input type="text" maxlength="1000000000" class="input-box" id="characters" name="characters"
                value="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ">

            <div>with length</div>
            <input type="number" min="1" max="1000000000000000000000" class="input-box" id="length" name="length"
                value="50" oninput="validity.valid||(value='50');">

            <div>in the box below</div>

        </div>

        <div class="row no-gutters align-items-center mb-3">
            <span class="mr-3">Separate by?</span>

            <div class="form-check mr-3">
                <input class="form-check-input" type="radio" name="separator" id="line" value="+++" checked>
                <label class="form-check-label" for="line">
                    New line
                </label>
            </div>

            <div class="form-check mr-3">
                <input class="form-check-input" type="radio" name="separator" id="comma" value=",">
                <label class="form-check-label" for="comma">
                    Comma
                </label>
            </div>

            <div class="form-check mr-3">
                <input class="form-check-input" type="radio" name="separator" id="space" value=" ">
                <label class="form-check-label" for="space">
                    A space
                </label>
            </div>
            ||
            <span class="mx-3">Unique string?</span>
            <div class="input-group-text">
                <input type="checkbox" id="unique" data-toggle="tooltip"
                    title="check if you want to generate unique strings.">
            </div>

        </div>

        <button id="generate" type="button" class="btn btn-outline-dark">Generate</button>
        <div id="error" class="alert alert-danger mt-2" role="alert" style="display: none"></div>

        <div class="row no-gutters align-items-center mt-3">
            <label class="form-label" for="result">Generated random strings</label>
            <textarea type="text" id="result" name="result"></textarea>
        </div>

    </div>
</div>
<br>