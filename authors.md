---
title: Authors | Long Ly
---

# All authors for this blog!

<ul>
    {% for author in site.authors %}
    <li>
        <a href="{{ author.url }}">{{ author.name }}</a>
        <div>{{ author.position }}</div>
        <p>{{ author.content | markdownify }}</p>
    </li>
    {% endfor %}
</ul>
