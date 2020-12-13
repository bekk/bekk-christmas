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
links:
  - url: https://reactjs.org/docs/integrating-with-other-libraries.html
    title: Integrating with Other Libraries
  - url: https://reactjs.org/docs/refs-and-the-dom.html
    title: Refs and the DOM
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

You see, while the JavaScript app in itself is nice enough, I actually wanted to "extract" the image processing functions from that app, and use those together with my React code, which meant having to import it into the React code.

### Importing the code

First of all, this code is not in any package registry, so in order to have something to work with I simply put the git url into my package.json.

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

Taking the naive approach, I want to import the code to use it in my dummy React app. So what happens when I import it?

```
import React from "react";
import workshop from "image-workshop";

const MyFunctionalEditor = () => {...}
```

Uh oh, *TypeError: document.querySelector(...)* is null. So the main problem here is that this code is not really made for being used in other applications. It does a bunch of stuff in *index.js* as it is imported, and it does not export any of the functions I wanted to reuse. Yikes. 

However, since I co-authored the code, I can fork it and tweak on it a bit for my usage! The same would be alright with any other code as well as long as the license allows it. So: I fork the project, and remove all the noise in `index.js` and export the functions I need.

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

Then we can just use these functions in our code. I have made a new "FunctionalEditor" in React that uses the Editor and all the effect functions from the image-workshop:\
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

![Screenshot of the resulting app, with one edited photo and the original side by side](https://i.ibb.co/jwWZNxJ/Screenshot-from-2020-11-29-18-14-15.png)

And success! I get my own version of photoshop inside my React app!

### querySelector >:(

And I am mostly happy with this, all is well *as long as I have HTML-elements with a certain id,* because the JavaScript code uses querySelector to find the DOM-elements to manipulate. This also puts restraints on my React code. In order to truly have customisable code, the JavaScript should not care what I name my elements or where I put them.

Instead of having the render function in the image-workshop use querySelector to grab the canvasses, it would be better to refer to the elements directly. That way, I can also basically send any canvas to be rendered.

```
//Editor.js

//Render function as it used to be
render(image, canvasName) {
        //canvasName is either "original" or "edited"
        const canvas = document.querySelector("#" + canvasName);
        const context = canvas.getContext('2d');

        canvas.width = image.width;
        canvas.height = image.height;

        context.putImageData(image.imageData, 0, 0);
    }

//Wouldn't this be nicer? 
render(image, canvasName, canvas) {
    const context = canvas.getContext('2d');

    canvas.width = image.width;
    canvas.height = image.height;

    context.putImageData(image.imageData, 0, 0);
 }
```

Since the editor now needs access to the canvas-element, we can create refs that belong to the canvasses and pass them to the *loadImage* and *applyEffect* functions in Editor.js.

```
const MyFunctionalEditor = () => {
    const editor = useMemo(() => new Editor(), []);
    const originalCanvasRef = React.createRef();
    const editedCanvasRef = React.createRef();

    useEffect(() => {
        editor.loadImage("tower.jpg", editedCanvasRef.current, originalCanvasRef.current);
    }, [editor, editedCanvasRef, originalCanvasRef])

    return (
                ...
                <button id="invert" className="notgroup" onClick={() => editor.applyEffect(invert, editedCanvasRef.current)}>Invert</button>
                ...
                <div>
                    <h3>Edited:</h3>
                    <canvas style={{height: 400}} ref={editedCanvasRef} />
                </div>
                <div>
                    <h3>Original:</h3>
                    <canvas style={{height: 400}} ref={originalCanvasRef} />
                </div>
                ...
          )
}
```

\
And that is pretty much it! This small JavaScript project is turned into a simple API, and used in modern React code. I hope you enjoyed this article, and hopefully the next time you encounter an awesome non-React library you'd like to try out, you won't be scared off!