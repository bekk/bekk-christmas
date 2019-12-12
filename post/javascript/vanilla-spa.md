---
calendar: javascript
post_year: 2019
post_day: 12
title: Vanilla SPA
image: >-
  https://images.unsplash.com/photo-1465161191540-aac346fcbaff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1200&q=80
ingress: Let us look at what it takes to create our own SPA
authors:
  - Dag Frode Solberg
---
Back when I started studying IT, I wanted to create a Single Page Application(SPA). I knew some HTML, CSS, and JavaScript, and that was enough to get something up and running.

It is easy to add React, Vue, or Angular to a project that might not need it. Writing everything from scratch is a way to remind us of what these frameworks solve for us and how they limit us.

Let’s look at how we can create a simple SPA, just using vanilla JavaScript.


## Templates

Let's start by creating some way of showing content. We will do this by creating a `page` class that will be hidden by default. In the next section, we will look at code that will add a class to the `active` page to show the correct content. The main page gets to be the default page shown until the JavaScript has loaded.

The templates we create for the SPA let us add static content and placeholders for the different pages. Usually, only parts of the page are dynamic.

```html
<html>
  <head>
    <meta charset="utf-8" />
    <link rel="stylesheet" type="text/css" href="main.css" />
  </head>
  <body>
    <div id="main" class="page active">
      <h1>Forside</h1>
      Alle ...
    </div>
    <div id="toll" class="page">
      <a href="#main">&lt; Tilbake til forsiden</a>
      <h1>Tollstations</h1>
      <div id="tollstations"></div>
    </div>
    <div id="page404" class="page">
      <h1>404</h1>
      <h2 id="page404-error"></h2>
    </div>
    <script src="main.js"></script>
  </body>
</html>
```

To access the templates, you can define an object structure to make it easier to reference the correct elements.

```js
// Define html element references
PAGES = {};

// Main page
PAGES.main = {};
PAGES.main.page = document.querySelector("#main");

// Some other page
PAGES.toll = {};
PAGES.toll.page = document.querySelector("#toll");
PAGES.toll.content = document.querySelector("#tollstations");

// 404
PAGES.page404 = {};
PAGES.page404.page = document.querySelector("#page404");
PAGES.page404.error = document.querySelector("#page404-error");
```

## Navigation

We now have multiple pages in our SPA, most of them hidden with CSS. To make this a SPA we need some way of navigating between the pages.

By using the function `window.onhashchange`, we can detect when the hash in the URL changes. Combining this with anchors, and we have a way detect when we should changing the content of the SPA.

The URL hash is easily accessible through `location.hash`.

```js
var path;

// Navigation
function navigate() {
  // Get the url path in a easy
  path = location.hash
    .substr(1)
    .toLowerCase()
    .split("/");

  // Find what page to show
  var currentPage = path[0];
  if (!PAGES.hasOwnProperty(currentPage)) {
    if (path[0] === "") {
      currentPage = "main";
    } else {
      currentPage = "page404";
    }
  }

  // Hide the previous active page
  for (var page in PAGES) {
    if (PAGES.hasOwnProperty(page)) {
      PAGES[page].page.classList.remove("active");
    }
  }

  // Show the active page and run its custom script
  PAGES[currentPage].page.classList.add("active");
}

// First time loading the page
navigate();

window.onhashchange = navigate;
```

To only show the `active` page, we need to add some styling to hide all pages that is not `active`.

```css
.page {
  display: none;
}

.page.active {
  display: block;
}
```

## Custom code for each page

Some of the pages need to load some additional information based on parameters in the URL. To achieve this, we can create a map of the pages with the code to run for each page.

```js
// Code to run for each page
pageFunctions = {};

// Custom code to run when showing the 404 page
pageFunctions.page404 = function() {
  PAGES.page404.error.innerHTML = `Page ${location.hash.substr(1)} not found!`;
};
```

To run the custom code, we need to hook the custom code to the navigate function by adding some code to the end of our navigate function.

```js
//Run custom page code if it exists
if (pageFunctions.hasOwnProperty(currentPage)) {
  pageFunctions[currentPage]();
}
```

## Adding dynamic content

To add some dynamic content to the page, we create a new custom function for the page "toll" and add a REST call.

We use `fetch` to retrieve the data and `reduce` to generate what we will show.

```js
pageFunctions.toll = function() {
  fetch("https://hotell.difi.no/api/json/vegvesen/bomstasjoner?")
    .then(response => response.json())
    .then(json => {
      PAGES.toll.content.innerHTML = json.entries.reduce((acc, toll) => {
        return (acc += tollInfo(toll));
      }, "");
    });
};

function tollInfo(toll) {
  return `
  <div class="toll">
  <h2>${toll.navn}</h2>
  <h3>Takst stor bil: ${toll.takst_stor_bil}</h3>
  <h3>Takst liten bil: ${toll.takst_liten_bil}</h3>
  </div>
  `;
}
```

## Demo

Bringing it all together and we have a working SPA. 

<iframe height="500" style="width: 100%;" scrolling="no" title="Vanilla SPA" src="https://codepen.io/dagfs/embed/abbrJYp?height=500&theme-id=default&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/dagfs/pen/abbrJYp'>Vanilla SPA</a> by Dag
  (<a href='https://codepen.io/dagfs'>@dagfs</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## Final thoughts

Not bad, considering it is only a few lines of HTML, CSS, and Javascript? I might not use frameworks for all of my pet projects in the time to come. But I will probably continue using frameworks for more significant projects with other developers. I would prefer not to create my version of [BobX](https://thedailywtf.com/articles/We-Use-BobX). 


