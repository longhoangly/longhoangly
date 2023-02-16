- This site uses Google fonts by adding links to the head of HTML page like below.  
<br>
    - _&lt;link
href="https://fonts.googleapis.com/css2?family=Mali:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;1,200;1,300;1,400;1,500;1,600;1,700&amp;display=swap"
rel="stylesheet"&gt;_  
<br>
    - _&lt;link
href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&amp;display=swap"
rel="stylesheet"&gt;_  
<br>

- If we create collections folder, its name should not have underscore! such as **"collections", "all_items"**... **_posts** and **_drafts** need to be in collection
folder as well, if not no post artical will be shown on Jekyll website.
    - **_config.yml** should define where is collection folder!  
<br>

- Cannot render markdown file inside a html tag by include technique! But can capture / assign content from markdown file into a
variable, then load them as an object with option markdowntify
