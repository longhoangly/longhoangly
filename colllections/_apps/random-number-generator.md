---
title: Random Number Generator | Long Ly
js: random-number-generator
---

<br>
{% capture intro %}
### Generate Random Number

- This tool creates random numbers within a range
- maximum quantity of number: 5000

- minimum value of the range: 0
- maximum value of the range: 1000000000000000000000
{% endcapture %}

<div class="tool-wrapper">
    {{ intro | markdownify }}
</div>

<div class="h-50 d-flex align-items-center justify-content-center">
    <div class="tool-wrapper">

        <h3>Generate Random Number</h3>
        <div class="row no-gutters align-items-center my-2">

            <div>Generate</div>
            <input type="number" min="1" max="5000" class="input-box" id="num" name="num" value="1"
                oninput="validity.valid||(value='5000');">

            <div>random number(s) from</div>
            <input type="number" min="0" max="1000000000000000000000" class="input-box" id="from" name="from" value="1"
                oninput="validity.valid||(value='0');">

            <div>to</div>
            <input type="number" min="0" max="1000000000000000000000" class="input-box" id="to" name="to" value="150"
                oninput="validity.valid||(value='150');">

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
            <span class="mx-3">Unique number?</span>
            <div class="input-group-text">
                <input type="checkbox" id="unique" data-toggle="tooltip"
                    title="check if you want to generate unique numbers.">
            </div>

        </div>

        <button id="generate" type="button" class="btn btn-outline-dark">Generate</button>
        <div id="error" class="alert alert-danger mt-2" role="alert" style="display: none"></div>

        <div class="row no-gutters align-items-center mt-3">
            <label class="form-label" for="result">Generated random numbers</label>
            <textarea type="text" id="result" name="result"></textarea>
        </div>

    </div>
</div>
<br>