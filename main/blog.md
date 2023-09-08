---
title: Blog | LongLy.Info
---
##### Latest Posts

<ul class="mt-4">
  {% for post in site.posts %}
    {% unless post.tags contains 'draft' %}
      {% assign paths = post.relative_path | split: '/' | last | split: '.md' | first | split: '-' %}
      {% assign postTitle = '' %}
      {% for path in paths offset: 3 %}
        {% assign postTitle = postTitle | append: path | append: ' ' %}
      {% endfor %}
      {% assign postTitle = postTitle | strip %}

      <li>
        <a href="{{ post.url }}">{{ postTitle }}</a>
        [{{ post.date | date_to_string }}]
        {{ post.excerpt }}
      </li>
    {% endunless %}
  {% endfor %}
</ul>
