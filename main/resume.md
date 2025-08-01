---
title: Résumé | Long Ly
---

<div class="container resume">
  <div class="row no-gutters">

    <div class="col-12 col-md-8">
      <div class="row no-gutters">
        <div class="col-12 col-md-8">
          <h1 style="font-size:100px">Long Ly</h1>
        </div>

        <!-- <div class="col-12 col-md-4">
          <img
            src="{{site.url}}/assets/image/main/avatar_2.jpg"
            class="img-thumbnail shadow"
            style="width: 60%;"
            alt="Long Ly"
          >
        </div> -->
      </div>
    </div>

    <div class="col-12 col-md-4 mt-2">
      Phone: +84 947 222 600<br>
      Email: longhoangly [at] gmail.com<br>
      Linkedin: <a href="https://www.linkedin.com/in/longhoangly">longhoangly</a><br>
      Location: Vietnam
    </div>

  </div>

  <div class="row no-gutters mt-4">
    <div class="col-12 col-md-8 pe-5">
      {% assign intros = site.resumes | where: "type", "intro" | sort: 'index' | reverse %}
      {% for intro in intros %}
        <p>{{ intro.content | markdownify }}</p>
      {% endfor %}
      <br>

      <b>EXPERIENCE</b>
      {% assign experiences = site.resumes | where: "type", "experience" | sort: 'index' | reverse %}
      {% for experience in experiences %}
        <hr>
        <div style="font-weight: bold; margin-top: 4px;">{{ experience.title }}</div>
        <div>{{ experience.company | upcase }}</div>
        <div style="font-weight: lighter;">{{ experience.timeline }} | {{ experience.based }}</div>
        <p>{{ experience.content | markdownify }}</p>
      {% endfor %}
    </div>

    <div class="col-12 col-md-4">
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
