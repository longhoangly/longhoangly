---
title: Résumé | Long Ly
---

<div class="container">

    <div class="row no-gutters">
        <div class="col-12 col-sm-6 col-md-8">
            <h1 style="font-size: 90px">Long Ly</h1>
        </div>

        <div class="col-6 col-md-4">
            Web: {{ site.url }}}<br>
            Phone: +84 947 222 600<br>
            Email: longhoangly [at] gmail.com<br>
            Download: <a href="https://drive.google.com/file/d/11ohreCpNSBPshCmPXwxacjv8n8YmL3Ta/view?usp=sharing"
                target="_blank">PDF version</a>
        </div>
    </div>

    <div class="row no-gutters mt-4">
        <div class="col-12 col-sm-6 col-md-8 pr-5">
            EXPERIENCE
            <hr>
            {% assign experiences = site.resumes | where: "type", "experience" | sort: 'index' | reverse %}
            {% for experience in experiences %}
            <div style="font-weight: bold; margin-top: 4px;">{{ experience.title }}</div>
            <div>{{ experience.company | upcase }}</div>
            <div style="font-weight: lighter;">{{ experience.timeline }} | {{ experience.based }}</div>
            <p>{{ experience.content | markdownify }}</p>
            <hr>
            {% endfor %}
        </div>

        <div class="col-6 col-md-4">
            MYSELF
            <hr>
            {% assign intros = site.resumes | where: "type", "intro" | sort: 'index' | reverse %}
            {% for intro in intros %}
            <p>{{ intro.content | markdownify }}</p>
            {% endfor %}
            <br>

            ACADEMICS
            <hr>
            {% assign academics = site.resumes | where: "type", "academic" | sort: 'index' | reverse %}
            {% for academic in academics %}
            <div style="font-weight: bold; margin-top: 4px;">{{ academic.title }}</div>
            <div>{{ academic.company | upcase }}</div>
            <div style="font-weight: lighter;">{{ academic.timeline }} | {{ academic.based }}</div>
            <p>{{ academic.content | markdownify }}</p>
            {% endfor %}
            <br>

            SKILLS
            <hr>
            {% assign skills = site.resumes | where: "type", "skills" | sort: 'index' | reverse %}
            {% for skill in skills %}
            <p>{{ skill.content | markdownify }}</p>
            {% endfor %}
        </div>
    </div>

</div>
<br>