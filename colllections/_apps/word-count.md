---
title: Word Count | Long Ly
js: word-count
css: tool
---

{% capture intro %}
### Word Count
- This tool counts characters, words, and lines for a string
- Characters counted with and without spaces
- It also provided a list of word of word density
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

            <form class="form-inline w-100">

                <div name="card" class="card border-dark text-center count-box mr-3">
                    <div class="card-header">Characters</div>
                    <div class="card-body">
                        <h5 class="card-title">0</h5>
                    </div>
                </div>

                <div name="card" class="card border-dark text-center count-box mr-3">
                    <div class="card-header">Characters w/o Spaces</div>
                    <div class="card-body">
                        <h5 class="card-title">0</h5>
                    </div>
                </div>

                <div name="card" class="card border-dark text-center count-box mr-3">
                    <div class="card-header">Words</div>
                    <div class="card-body">
                        <h5 class="card-title">0</h5>
                    </div>
                </div>

                <div name="card" class="card border-dark text-center count-box mr-3">
                    <div class="card-header">Lines</div>
                    <div class="card-body">
                        <h5 class="card-title">0</h5>
                    </div>
                </div>

            </form>

            <div class="no-gutters mt-3">
                <label class="form-label" for="result">Input your text here!</label>
                <textarea type="text" id="result" name="result"></textarea>
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
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>100</td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>200</td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td>Bird</td>
                        <td>300</td>
                    </tr>
                    <tr>
                        <th scope="row">4</th>
                        <td>Bird</td>
                        <td>300</td>
                    </tr>
                    <tr>
                        <th scope="row">5</th>
                        <td>Bird</td>
                        <td>300</td>
                    </tr>
                    <tr>
                        <th scope="row">6</th>
                        <td>Bird</td>
                        <td>300</td>
                    </tr>
                    <tr>
                        <th scope="row">7</th>
                        <td>Bird</td>
                        <td>300</td>
                    </tr>
                    <tr>
                        <th scope="row">8</th>
                        <td>Bird</td>
                        <td>300</td>
                    </tr>
                    <tr>
                        <th scope="row">9</th>
                        <td>Bird</td>
                        <td>300</td>
                    </tr>
                    <tr>
                        <th scope="row">10</th>
                        <td>Bird</td>
                        <td>300</td>
                    </tr>
                </tbody>
            </table>
        </div>

    </div>
</div>