---
title: Résumé
---

<div class="container">

    <div class="row no-gutters">
        <div class="col-12 col-sm-6 col-md-8">
            <h1 style="font-size: 90px">Long Ly</h1>
        </div>

        <div class="col-6 col-md-4">
            Web: https://longhoangly.com<br>
            Phone: +84 947 222 600<br>
            Email: longhoangly [at] gmail.com<br>
            Download: <a href="https://drive.google.com/file/d/11ohreCpNSBPshCmPXwxacjv8n8YmL3Ta/view?usp=sharing"
                target="_blank">PDF version</a>
        </div>
    </div>

    <div class="row no-gutters mt-4">
        <div class="col-12 col-sm-6 col-md-8">
            {% for resume in site.resumes %}
            <h5>{{ resume.title }}</h5>
            <h6>{{ resume.company | upcase }}</h6>
            <h6>{{ resume.timeline }}</h6>
            <p>{{ resume.content | markdownify }}</p>
            <hr>
            {% endfor %}
        </div>

        <div class="col-6 col-md-4">

        </div>
    </div>

</div>