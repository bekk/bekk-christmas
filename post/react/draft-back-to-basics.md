---
calendar: react
post_year: 2020
post_day: 11
title: "[Draft] Back to basics"
image: https://images.unsplash.com/photo-1492584115029-f633e64c61fa?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=2167&q=80
ingress: It's so easy nowadays to get a web application up and running in just a
  couple of minutes. We've got tools like Create-react-app, React boilerplate,
  Slingshot etc., which let developers set up and prototype anything blazing
  fast. These tools come with Webpack, Babel and more already configured for
  you, so you don't have to know anything about it or what it is used for.  This
  is obviously very valuable and cost-effective, but we also have to remember to
  keep in touch with our roots and get some sense of what is going on under the
  hood. So for today's topic we will be going back to the basics and see how we
  can set up most of what we need from scratch!
description: "Bekk Christms Webpack Babel React "
links:
  - title: Webpack
    url: https://webpack.js.org/
  - title: Babel
    url: https://babeljs.io/
  - url: https://medium.com/the-node-js-collection/modern-javascript-explained-for-dinosaurs-f695e9747b70
    title: Modern javascript explained for dinosaurs
authors:
  - Aryan Iranzamini
---


### Introduction - Setting up the project

Today we will looking at how one could set up a simple React application from scratch. You can get far by just using React together with Webpack and Babel, and that is exactly what we'll be looking at. The way we will do this is by first setting up a simple application that is displaying some text using JavaScript and HTML. Then throughout the article we will be adding Webpack, Babel and React to see how one would go about it and how it affects the code/project.

Lets start off by just adding an empty HTML file that imports Lodash:\
`index.html` 

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Sample project</title>
    <meta charset="UTF-8" />
    <script src="https://unpkg.com/lodash@4.17.20"></script>
  </head>

  <body>
  </body>
</html>
```

Let's now add some text to the site using Javascript. Consider the following file `index.js`

```javascript
// src/index.js
function component() {
  const element = document.createElement("div");

  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = _.join(["Hello", "world!"], " ");

  return element;
}

document.body.appendChild(component());
```

```html
...
<body>
    <script src="./src/index.js"></script>
</body>
...
```

Now if we call our javascript code from an inline script in the html file, we can display some text.

Cool, but we can do better!

### Configuring Webpack

This part is not as scary as some people might think, and we will see here that it's quite easy to get a simple configuration that lets us get started with our application. But first and foremost, what is Webpack and why do we need it?

### What

Webpack is a \*module bundler\* for the web, which in practice means that it takes all your assets (JS, CSS, Images, etc.) and packages them into bundles that browsers understand.

**Why**

To execute JavaScript code in the browser we have to include every `.js` file in a script tag in the html page, make sure they are loaded in the correct order so e.g utility functions are loaded before other parts of the code that rely on them, and so on. This is tedious, error prone and hardly scales well. It is much easier to work with modules, but the problem is that browsers don't understand them - well not unless you translate it for them.

Let's recreate the code sample above but this time using modules and Webpack.

1. Run `npm init` to initialize the package manager for the project
2. Install webpack along with a html plugin, `npm install webpack html-webpack-plugin --save-dev`
3. For Webpack to know what to do, we need to specify a configuration file `webpack.config.js`:

```javascript
const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
      new HtmlWebPackPlugin({
        template: "./index.html",
      }),
    ],
};
```

In the configuration file above, we tell Webpack to look for the `index.js` file in the src folder to start its bundling process, and that the output should be in a file called `main.js` in a new folder `/dist`. The purpose of the html plugin is that it generates an HTML5 file that includes all your Webpack-bundles in the body using script tags.

Now that Webpack is in place, we can rewrite our `index.js` file to use the installed version of Lodash that we got through npm.

```javascript
import _ from "lodash"; // Use lodash installed from npm

function component() {
  const element = document.createElement("div");

  element.innerHTML = _.join(["Hello", "world!"], " ");

  return element;
}

document.body.appendChild(component());
```

All we need to do now is to run `npx webpack` to the start the bundling process and serve our new files. Open the `./dist/index.html` and check to see that it works!

### Setting up Babel

The next step is to configure Babel. But before we jump right into it, I'll try to explain its function and usage as briefly as possible.

**What**

Babel is a "transpiler" for JavaScript. A transpiler is a tool used to take a high-level programming language and turn it into another (or same) high-level programming language. In our case, Babel takes JavaScript code and turns it into backwards compatible JavaScript code.

**Why**

The JavaScript language is continuously being updated with new features and functionality which browsers cannot really keep up with. This means that using the latest language features might break your application for some or all browsers. To be able to use the latest features and ensure that we do not mess things up, we can use babel to convert our current code to another equivalent piece of code that we know is universally supported.

Now that you're an expert on transpiling, let's set it up!

Babel is configured using presets. There are two presets that we're interested in, babel-preset-env and preset-react, which we need to install. For Babel to work at all we also need to install the core-library. Lastly, for Webpack to be able to talk to Babel during its bundling process, it needs babel-loader. We won't dive into Webpack loaders in this article, but essentially what you need to know is that Babel is configured using presets and babel-loader is what helps Webpack use Babel.

Now go ahead and run:

`npm install @babel-core @babel-preset-env @preset-react --save-dev`\
`npm install babel-loader`

Then add the presets to your `.babelrc`  configuration file:

```javascript
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

Lastly, we need to update our Webpack config file and tell Webpack to use babel during its bundling process.

```javascript
module: {
    ...
    rules: [
    ...
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
  },
```

The configuration above tells Webpack to use Babel for files matching the regexp given in test, which are files ending with `.js` or `.jsx`.

### Putting the pieces together

We have almost everything we need! The last missing piece is obviously to incorporate React.

Go ahead and install React: `npm install react react-dom`\
And then rewrite the pesky old JavaScript code in `src/index.js` using React:

```javascript
import React from "react";
import ReactDOM from "react-dom";

const App = () => {
  return <div>Hello world!</div>;
};

ReactDOM.render(<App />, document.getElementById("app"));
```

Done! We should now have a fully working application that is built using React, Webpack and Babel. There are of course a lot more tools that could help you and your project on its way, but the goal of this article is just to show how one could set up a very basic working project from scratch. I hope you have found this article somewhat useful. If you wish to learn more, please visit the links down below.

Merry Christmas!