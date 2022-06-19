---
index: 2
name: Word Count
module: ["ace.js", "apps/word-count"]
---

{% capture intro %}
### Word Count
<!-- separator -->
- This tool counts characters, words, and lines for input text
<!-- separator -->
- Characters counted with and without spaces
- It also provided a list of word density (15 most appeared words) 
  - This will help you to have a better sense when writing SEO articles
{% endcapture %}

<div class="tool-wrapper mb-4">
  {{ intro | markdownify }}
</div>

<div class="tool-wrapper">
  <h3>Word Count</h3>
  <div class="mb-2">Characters, Words, Lines Counts</div>

  <div class="row no-gutters mt-3">
    <div class="col-12 col-sm-6 col-md-8 pr-4">
      <div class="row row-cols-auto m-0">
        <div class="col p-0">
          <div name="card" class="card border-dark text-center count-box">
            <div class="card-header">Characters</div>
            <div class="card-body">
              <h5 id="characters" class="card-title">0</h5>
            </div>
          </div>
        </div>

        <div class="col p-0">
          <div name="card" class="card border-dark text-center count-box">
            <div class="card-header">Characters w/o Spaces</div>
            <div class="card-body">
              <h5 id="charactersWoSpace" class="card-title">0</h5>
            </div>
          </div>
        </div>

        <div class="col p-0">
          <div name="card" class="card border-dark text-center count-box">
            <div class="card-header">Words</div>
            <div class="card-body">
              <h5 id="words" class="card-title">0</h5>
            </div>
          </div>
        </div>

        <div class="col p-0">
          <div name="card" class="card border-dark text-center count-box">
            <div class="card-header">Lines</div>
            <div class="card-body">
              <h5 id="lines" class="card-title">0</h5>
            </div>
          </div>
        </div>
      </div>

      <button id="clearCounters" type="button" class="btn btn-outline-dark my-2">Clear</button>

      <div class="no-gutters mt-3">
        <label class="form-label" for="result"><strong>Input your text here!</strong></label>
        <div class="ace_editor" id="result" name="result"></div>
      </div>
    </div>
    <div class="col-6 col-md-4">
      <table class="table table-sm">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Keyword Density</th>
            <th scope="col">Count</th>
          </tr>
        </thead>
        <tbody id="densityTable"></tbody>
      </table>
    </div>
  </div>
</div>
