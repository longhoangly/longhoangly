---
title: Résumé | LongLy.Info
---

<div class="container resume">
  <div class="row no-gutters">

    <div class="col-12 col-md-8">
      <div class="row no-gutters">
        <div class="col-12 col-md-8">
          <h1 style="font-size:90px">Long Ly</h1>
        </div>

        <div class="col-12 col-md-4">
          <img
            src="{{site.url}}/assets/image/main/avatar_2.jpg"
            class="img-thumbnail shadow"
            style="width: 60%;"
            alt="Long Ly"
          >
        </div>
      </div>
    </div>

    <div class="col-12 col-md-4 mt-2">
      Web: <a href="{{ site.url }}">{{ site.url }}</a><br>
      Phone: +84 947 222 600<br>
      Email: longhoangly@gmail.com<br>
      <span id="pdfBtn">
        Print:
        <a href="#" onclick="pdfVersion();">
            PDF version
        </a>
      </span>
    </div>

  </div>

  <div class="row no-gutters mt-4">
    <div class="col-12 col-md-8 pe-5">
      <b>EXPERIENCE</b>
      {% assign experiences = site.resumes | where: "type", "experience" | sort: 'index' | reverse %}
      {% for experience in experiences %}
        {% if experience.company == "KMS Technology" %}
          {% for i in (1..8) %}
            <br>
          {% endfor %}
        {% endif %}

        <hr>
        <div style="font-weight: bold; margin-top: 4px;">{{ experience.title }}</div>
        <div>{{ experience.company | upcase }}</div>
        <div style="font-weight: lighter;">{{ experience.timeline }} | {{ experience.based }}</div>
        <p>{{ experience.content | markdownify }}</p>
      {% endfor %}
    </div>

    <div class="col-12 col-md-4">
      <b>MYSELF</b>
      <hr>
      {% assign intros = site.resumes | where: "type", "intro" | sort: 'index' | reverse %}
      {% for intro in intros %}
        <p>{{ intro.content | markdownify }}</p>
      {% endfor %}
      <br>

      <b>ACADEMICS</b>
      <hr>
      {% assign academics = site.resumes | where: "type", "academic" | sort: 'index' | reverse %}
      {% for academic in academics %}
        <div style="font-weight: bold; margin-top: 4px;">{{ academic.title }}</div>
        <div>{{ academic.company | upcase }}</div>
        <div style="font-weight: lighter;">{{ academic.timeline }} | {{ academic.based }}</div>
        <p>{{ academic.content | markdownify }}</p>
      {% endfor %}
      <br>

      <b>SKILLS</b>
      <hr>
      {% assign skills = site.resumes | where: "type", "skills" | sort: 'index' | reverse %}
      {% for skill in skills %}
        <p>{{ skill.content | markdownify }}</p>
      {% endfor %}
    </div>

  </div>
</div>
<br>
