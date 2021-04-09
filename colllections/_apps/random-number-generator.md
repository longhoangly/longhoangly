---
title: Random Number Generator | Long Ly
js: random-number-generator
---

{% capture intro %}
### Generate Random Number
- This tool creates random numbers within a range
- Unique option to generate only unique numbers
- Maximum quantity of number: 5000
- Minimum value of the range: 0
- Maximum value of the range: 1000000000000000000
{% endcapture %}

<div class="tool-wrapper mb-4">
    {{ intro | markdownify }}
</div>

<div class="tool-wrapper">

    <h3>Generate Random Number</h3>
    <div class="row no-gutters align-items-center my-3">

        <div>Generate</div>
        <input type="number" min="1" max="5000" class="input-box" id="num" name="num" value="5"
            oninput="validity.valid||(value='5000');">

        <div>random number(s) from</div>
        <input type="number" min="0" max="1000000000000000000" class="input-box" id="from" name="from" value="1"
            oninput="validity.valid||(value='0');">

        <div>to</div>
        <input type="number" min="0" max="1000000000000000000" class="input-box" id="to" name="to" value="150"
            oninput="validity.valid||(value='1000000000000000000');">

        <div>in the box below</div>

    </div>

    <div class="no-gutters mb-3">
        <span class="mr-3">Separate by?</span>

        <div class="form-check form-check-inline mr-3">
            <input class="form-check-input" type="radio" name="separator" id="line" value="+++" checked>
            <label class="form-check-label" for="line">
                New line
            </label>
        </div>

        <div class="form-check form-check-inline mr-3">
            <input class="form-check-input" type="radio" name="separator" id="comma" value=",">
            <label class="form-check-label" for="comma">
                Comma
            </label>
        </div>

        <div class="form-check form-check-inline mr-3">
            <input class="form-check-input" type="radio" name="separator" id="space" value=" ">
            <label class="form-check-label" for="space">
                A space
            </label>
        </div>

        <i class="fas fa-grip-lines-vertical"></i>

        <div class="form-check form-check-inline ml-3">
            <input class="form-check-input" type="checkbox" id="unique" data-toggle="tooltip"
                title="check if you want to generate unique numbers.">
            <label class="form-check-label" for="unique">Unique numbers?</label>
        </div>

    </div>

    <button id="generate" type="button" class="btn btn-outline-dark">Generate</button>
    <div id="error" class="alert alert-danger mt-2" role="alert" style="display: none"></div>

    <div class="no-gutters mt-3">
        <label class="form-label" for="result">Generated random numbers</label>
        <textarea type="text" id="result" name="result"></textarea>
    </div>

</div>