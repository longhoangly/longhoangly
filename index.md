---
layout: default
title: Home | Long Ly App
---

<br>
Hi! Welcome to the LongLy.App

This site has some useful tool for processing text, strings and numbers.

Feel free to give it a try and send me messages if any suggestion. Thanks!
<br>
<br>

##### Tools

<div class="table-responsive">
  <table class="table table-bordered">
    <tbody>

      <tr>
        <td>
          <a href="https://ankiflash.com/" target="_blank">
            <h4>1. AnkiFlash</h4>
          </a>
          {% assign desc = "- A tool to generate Anki cards to learn Vietnamese, English, Chinese, Japanese, French
          vocabularies automatically." %}
          <p>{{ desc | markdownify }}</p>
        </td>

        <td>
          <a href="https://ankiweb.net/shared/info/1129289384" target="_blank">
            <h4>2. AnkiFlash Importer</h4>
          </a>
          {% assign desc = '- An add-on helps you to import automatically flashcards which are generated from
          the <a href="https://ankiflash.com/" target="_blank">https://ankiflash.com</a> website.' %}
          <p>{{ desc | markdownify }}</p>
        </td>
      </tr>

      {% for app in site.apps %}

      {% assign indexModulo = forloop.index0 | modulo: 2 %}
      {% if indexModulo == 0 %}
      <tr>
        <td>
          <a href="{{ app.url }}">
            <h4>{{forloop.index0 | plus: 3}}. {{ app.name }}</h4>
          </a>

          {% assign contentSplitted = app.content | split: site.content_separator %}
          <p>{{ contentSplitted[1] | markdownify }}</p>
        </td>

        <td>
          {% assign nextIndex = forloop.index0 | plus: 1 %}
          {% if site.apps.size > nextIndex %}

          {% assign nextApp = site.apps[nextIndex] %}
          <a href="{{ nextApp.url }}">
            <h4>{{nextIndex | plus: 3}}. {{ nextApp.name }}</h4>
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