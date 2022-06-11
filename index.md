---
layout: default
title: Home | QaTips
---

<br>
Hi! Welcome to the <a href="{{site.url}}">QaTips.Dev</a>

This site has some useful tools for processing text, strings and numbers.

Feel free to give it a try and send me messages if any suggestion. Thanks!
<br>
<br>

##### Tools

<div class="container">
  <div class="row row-cols-3">
    {% assign apps = site.apps %}
    {% for app in apps %}
      {% assign idx = forloop.index0 %}
        <div class="col border p-2 pb-0">
          <a
            {% if app.link %}
              href="{{ app.link }}" target="_blank"
            {% else %}
              href="{{ app.url }}"
            {% endif %}
          >
            <h4>{{ idx | plus: 1 }}. {{ app.name }}</h4>
          </a>

          {% assign intro = app.content | split: site.content_separator %}
          <p>{{ intro[1] | markdownify }}</p>
        </div>
    {% endfor %}
  </div>
</div>
<br>
