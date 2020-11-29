---
calendar: react
post_year: 2020
post_day: 14
title: Reusing existing JavaScript-code in your React app
image: https://images.unsplash.com/photo-1540303795566-d6d68e274b74?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3750&q=80
ingress: WIP
description: React
authors:
  - Sissel Fladby
---
## **Motivation**

Can I import this random JavaScript into my React code? Background and blabla

## **The easiest way**

Importing the JavaScript into script-tag in html...

## **Other ways**

Blablabla customization and other things

### Getting the code

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

export default class MyClassEditor extends React.Component {...}
```

Uh oh, *TypeError: document.querySelector(...)* is null. So the main problem here is that this code is not really made for being used in other applications. It does a bunch of stuff in *index.js* as it is imported, and it does not export any of the functions I wanted to reuse. Yikes. 

However, since I co-authored the code I can fork it and fix it for my usage. The same would be alright with any other code as well as long as the license allows it. So: I fork the project, and remove all the noise in index.js and export the functions I need.

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

 Then we can just use these functions in our code:

```
import React from "react";
import { Editor, histogramequalization, medianfilter, invert, colorfilter, sharpen } from "image-workshop";

export default class MyClassEditor extends React.Component {

    componentDidMount() {
        this.editor = new Editor();
        this.editor.loadImage("tower.jpg");
    }

    render() {
        return (
            <div>
                <h1>AlgPip > Photoshop</h1>
                <a href="https://github.com/Matsemann/image-workshop">Se oppgavene / implementasjonen her</a>
        
                <button id="invert" onClick={() => this.editor.applyEffect(invert)}>Invert</button>
                <button id="warmfilter" onClick={() => this.editor.applyEffect(colorfilter)}>Warm</button>
                <button id="sharpen" onClick={() => this.editor.applyEffect(sharpen)}>Sharpen</button>
                <button id="medianfilter" onClick={() => this.editor.applyEffect(medianfilter, 3)}>Median filter</button>
                <button id="histogramequalization" onClick={() => this.editor.applyEffect(histogramequalization)}>Histogram equalization</button>
                <h2>Edited:</h2>
                <canvas id="edited"></canvas>
                <h2>Original:</h2>
                <canvas id="original"></canvas>
                <canvas id="loaderCanvas"></canvas>
            </div>
        )
    }
}
```

And success! I get my own version of photoshop inside my React app!

![Screenshot of the resulting app, with one edited photo and the original side by side](https://i.ibb.co/jwWZNxJ/Screenshot-from-2020-11-29-18-14-15.png)