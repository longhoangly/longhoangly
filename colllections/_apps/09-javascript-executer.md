---
name: JavaScript Executer
js: ["external/ace/ace"]
---

{% capture intro %}
### JavaScript Executer
<!--separator-->
- A simple JavaScript online executer
- Console output (logs, errors, debugs) will be printted in console output box
<!--separator-->
{% endcapture %}

<div class="tool-wrapper mb-4">
    {{ intro | markdownify }}
</div>

{% include js-executer.html %}
