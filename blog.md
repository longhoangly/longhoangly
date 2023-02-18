---
title: Blog | LongLy.Info
---
##### Latest Posts

<ul class="mt-4">
  {% for post in site.posts %}
    {% unless post.tags contains 'draft' %}
      <li>
        <a href="{{ post.url }}">{{ post.title }}</a>
        [{{ post.date | date_to_string }}]
        {{ post.excerpt }}
      </li>
    {% endunless %}
  {% endfor %}
</ul>
