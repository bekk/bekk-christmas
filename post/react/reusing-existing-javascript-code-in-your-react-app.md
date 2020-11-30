---
calendar: react
post_year: 2020
post_day: 14
title: Reusing existing JavaScript-code in your React app
image: https://images.unsplash.com/photo-1540303795566-d6d68e274b74?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3750&q=80
ingress: >-
  A couple of years ago, a colleague and I created a small JavaScript
  application to toy around with some image processing techniques. I really
  enjoyed the project, and the other day I decided put the same functionality in
  my new React code.


  One way of doing this would be to rewrite the whole thing, and to be honest, it probably would not have been that much work. But it got me thinking, how would I go about injecting the already written code into my React application? I haven't done anything like this before, and if you haven't either, this is a blog post for you!
description: A small article about how I integrated a JavaScript application
  into React code.
authors:
  - Sissel Fladby
---
## **The simple way**

The easiest possible way I could imagine this being done, would be to include the html and the *built* JavaScript needed into my `index.html`, so that is where I will start.

The JavaScript depends on some html, so that has to be included as well.

```
<body>
  <!-- The image workshop -->
  <h1>AlgPip > Photoshop</h1>
  <a href="https://github.com/Matsemann/image-workshop">Se oppgavene / implementasjonen her</a>
  ...
  <!-- Defines some buttons to load images and use effects on them, and canvases to load images into -->
  ...
  <script src="image-workshop.js"></script>
  
  <!-- My new React app is loaded into the div below -->
  <div id="root"></div>
</body>
```

And this works! However, while having the React code and the JavaScript code side by side is very simple, it is not very customisable.

## **Integrating with React**

I wanted to integrate the methods and functions from the JavaScript with my React code, which meant having to import it into the React code.

### Importing the code

First of all, this code is not in any package registry, so in order to have something to work with I simply put the git url into my package.json. Since the code is from a workshop, and I don’t intend to implement the algorithms *again* I choose the solution-branch.

```
"name": "dummy-app",
"version": "0.1.0",
"dependencies": {
    "image-workshop": "https://github.com/Matsemann/image-workshop.git#solution",
    "react": "^17.0.1",
    "react-dom": "^17.0.1",
    "react-scripts": "4.0.0",
    ...
  },
  ...
```

### And so it begins..

Taking the naive approach, I want to import the code to use it in my dummy-app*.* So what happens when I import it?

```
import React from "react";
import workshop from "image-workshop";

const MyFunctionalEditor = () => {...}
```

Uh oh, *TypeError: document.querySelector(...)* is null. So the main problem here is that this code is not really made for being used in other applications. It does a bunch of stuff in *index.js* as it is imported, and it does not export any of the functions I wanted to reuse. Yikes. 

However, since I co-authored the code, I can fork it and fix it for my usage! The same would be alright with any other code as well as long as the license allows it. So: I fork the project, and remove all the noise in index.js and export the functions I need.

```
const Editor = require('./Editor');
const colorfilter = require('./effects/warmfilter');
const invert = require('./effects/invert');
const histogramequalization = require('./effects/histogramequalization');
const medianfilter = require('./effects/medianfilter');
const sharpen = require('./effects/sharpen');

/*const editor = new Editor();...*/

module.exports = {Editor, histogramequalization, medianfilter, invert, colorfilter, sharpen};
```

Then we can just use these functions in our code:\
Note that I have to include the `<canvas id="..`. because the JS depends on it.

```
import React, { useEffect } from "react";
import { Editor, histogramequalization, medianfilter, invert, colorfilter, sharpen } from "image-workshop";

const MyFunctionalEditor = () => {
    const editor = useMemo(() => new Editor(), []);

    useEffect(() => {
        editor.loadImage("tower.jpg");
    }, [editor])

    return (
        <div>
            <h1>AlgPip > Photoshop</h1>
            <a href="https://github.com/Matsemann/image-workshop">Se oppgavene / implementasjonen her</a>

            <div>
                <select onChange={(e) => editor.loadImage(e.target.value)}>
                    <option>tower.jpg</option>
                    <option>logo512.png</option>
                </select>
                <button onClick={() => editor.applyEffect(invert)}>Invert</button>
                <button onClick={() => editor.applyEffect(colorfilter)}>Warm</button>
                <button onClick={() => editor.applyEffect(sharpen)}>Sharpen</button>
                <button onClick={() => editor.applyEffect(medianfilter, 3)}>Median filter</button>
                <button onClick={() => editor.applyEffect(histogramequalization)}>Histogram equalization</button>
            </div>
            <div className="canvasContainer">
                <div>
                    <h3>Edited:</h3>
                    <canvas style={{height: 400}} id="edited"/>
                </div>
                <div>
                    <h3>Original:</h3>
                    <canvas style={{height: 400}} id="original"/>
                </div>
            </div>
            <p>Photo by <a
                href="https://unsplash.com/@photoholgic?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Photoholgic</a> on <a
                href="https://unsplash.com/?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a>
            </p>
            <canvas className="hidden" id="loaderCanvas"/>
        </div>
    )
}

export default MyFunctionalEditor;
```

![Screenshot of the resulting app, with one edited photo and the original side by side](https://i.ibb.co/jwWZNxJ/Screenshot-from-2020-11-29-18-14-15.png "And success! I get my own version of photoshop inside my React app!")