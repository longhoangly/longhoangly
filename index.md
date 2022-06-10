---
layout: default
title: Home | Long Ly App
---

<br>
Hi! Welcome to the <a href="{{site.url}}">QaTips.Dev</a>

This site has some useful tools for processing text, strings and numbers.

Feel free to give it a try and send me messages if any suggestion. Thanks!
<br>
<br>

##### Tools

<div class="table-responsive">
  <table class="table table-bordered">
    <tbody>
      {% assign apps = site.apps %}
      {% for app in apps %}
        {% assign indexModulo = forloop.index0 | modulo: 2 %}
        {% if indexModulo == 0 %}
          <tr>
            <td>
              <a
                href="{% if app.link %} {{ app.link }} {% else %} {{ app.url }} {% endif %}"
                {% if app.link %}
                  target="_blank"
                {% endif %}
              >
                <h4>{{ forloop.index0 | plus: 1 }}. {{ app.name }}</h4>
              </a>

              {% assign contentSplitted = app.content | split: site.content_separator %}
              <p>{{ contentSplitted[1] | markdownify }}</p>
            </td>

            <td>
              {% assign nextIndex = forloop.index0 | plus: 1 %}
              {% if apps.size > nextIndex %}
                {% assign nextApp = apps[nextIndex] %}
                <a href="{{ nextApp.url }}">
                  <h4>{{ nextIndex | plus: 1 }}. {{ nextApp.name }}</h4>
                </a>

                {% assign contentSplitted = nextApp.content | split: site.content_separator %}
                <p>{{ contentSplitted[1] | markdownify }}</p>
              {% endif %}
            </td>
          </tr>
        {% endif %}
      {% endfor %}
    </tbody>
  </table>
</div>
<br>
