---
title: Authors | Long Ly App
---

##### All authors on this blog!

<ul>
    {% for author in site.authors %}
    <li>
        <a href="{{ author.url }}">{{ author.name }}</a>
        <div>{{ author.position }}</div>
        <p>{{ author.content | markdownify }}</p>
    </li>
    {% endfor %}
</ul>
