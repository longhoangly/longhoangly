---
layout: default
title: Home | Long Ly App
---

<br>
Hi! Welcome to the
<a href="{{site.url}}">QaTips.Dev</a>

This site has some useful tools for processing text, strings and numbers.

Feel free to give it a try and send me messages if any suggestion. Thanks!
<br>
<br>

##### Tools

<div class="table-responsive">
    <table class="table table-bordered">
        <tbody>

                {% capture ankiFlash %}
                {
                      "name": "AnkiFlash",
                      "url": "https://ankiflash.com/",
                      "content": "- Generates Anki flashcards automatically for learning Vietnamese, English, Chinese, Japanese, French vocabularies."
                }
            {% endcapture %}
            {% component type:"json", source_type: "string", source: "{{ankiFlash}}", collectionVariable: "myData" %}


            <h4>{{ ankiFlash.name }}</h4>
            <h4>{{ ankiFlash.url }}</h4>
            <h4>{{ ankiFlash.content }}</h4>
            <!-- {% assign ankiFlash = myData | split:'' %} -->

            {% assign apps = site.apps %}
            {% for app in apps %}
                {% assign indexModulo = forloop.index0 | modulo: 2 %}
                {% if indexModulo == 0 %}

                    <tr>
                        <td>
                            <a href="{{ app.url }}">
                                <h4>{{forloop.index0 | plus: 2}}.
                                    {{ app.name }}</h4>
                            </a>

                            {% assign contentSplitted = app.content | split: site.content_separator %}
                            <p>{{ contentSplitted[1] | markdownify }}</p>
                        </td>

                        <td>
                            {% assign nextIndex = forloop.index0 | plus: 1 %}
                            {% if apps.size > nextIndex %}

                                {% assign nextApp = apps[nextIndex] %}
                                <a href="{{ nextApp.url }}">
                                    <h4>{{nextIndex | plus: 2}}.
                                        {{ nextApp.name }}</h4>
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
