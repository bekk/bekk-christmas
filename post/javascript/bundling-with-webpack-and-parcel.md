---
calendar: javascript
post_year: 2018
post_day: 10
title: Bundling with webpack and Parcel
image: >-
  https://images.unsplash.com/photo-1506862047911-9815cdcb77c2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3300&q=80
ingress: How we bundle our code for development and production
authors:
  - Espen Hellerud
---
# Bundling with webpack and Parcel
Modern web applications are typically written with a modular pattern. This involves keeping our JavaScript in separate files and folders based on functionality. If we want to make use of our JavaScript code, not only do we have to add each file to the html, but also make sure each file is added in correct order of dependency. Or do we?

## Bundling JavaScript
The problem presented above is a JavaScript bundler's main task to solve. In essence, any bundler starts with a given entry file. The dependencies of the entry file are traversed and all visited files are added to the same file, known as the bundle. The bundle, containing all of the necessary code, is the output of the bundler, and the only file the html needs to reference.

In this post we will take a brief look at two popular bundlers, webpack and Parcel, and how they bundle our code. Additionally, we will also explore how they further improve our daily life when building web applications.

These two JavaScript files will be used to show how:

```js
// ./index.js

import { greet } from './santa';

greet();
```
```js
// ./santa.js

alert('Merry Christmas!');
```

### A simple webpack example
Let us see how we can make webpack build our bundle. First of all, initialize a npm project and install webpack.
```
$ npm init -y
$ npm i webpack webpack-cli --save-dev
```
Now we only have to specify the entry file, which we will put in a config file.

```js
// ./webpack.config.js

module.exports = {
  entry: './src/index.js',
};
```

For an easy way to run webpack, add it to the npm scripts in `./package.json`

```json
// ./package.json
...
"scripts": {
  "build": "webpack"
  }
...
```

Finally run the npm script to bundle the files.
```
$ npm run build
```
The config file will automatically be detected. By default webpack will place the processed bundle in `./dist/main.js`. Inside the bundle we will find the contents of both `index.js` and `santa.js` in addition to some extra code inserted by webpack.

Now let's see if the code actually does anything. We will create an html file which references our bundled code and host it locally with a development server. Earlier this had to be done by hosting a local server, for instance with express. This is all part of the past now, since webpack have created a dev server for us. It is called `webpack-dev-server` and needs just a couple lines of configuration. Start by creating `./index.html`

```html
// ./index.html

<html>
  <body>
    <script src="./dist/main.js"></script>
  </body>
</html>
```

Install `webpack-dev-server` from npm.

```
$ npm i webpack-dev-server --save-dev
```
Next, we will extend `./webpack.config.js` with a bit more configuration for the dev server.

```js
// ./webpack.config.js

module.exports {
    ...
    devServer: {
      contentBase: './',
      publicPath: '/dist'
    }
  }
```
We feed the dev server with two variables. `contentBase` specifies where in the filesystem our files will be served from, `./` is the location of `index.html`. Meanwhile `publicPath` sets the location of where the dev server will host the bundle. Since `index.html` looks for the bundle in `./dist/bundle.js`, we use `/dist` as the value.

As we did with the building of a bundle, we will also run the dev server with a npm script. Add the following script to `./package.json`:

```json
// ./package.json
...
"scripts": {
  "build": "webpack --mode=production"
  "start": "webpack-dev-server --mode=development"
  }
...
```
In addition to adding another npm script, we have also specified [mode](https://webpack.js.org/concepts/mode/) in our scripts. It tells webpack to optimize for either a production or development environment. Now we can use `start` to run a local development server, and `build` to create a bundle optimized for a production environment. By starting the dev server, we can visit [http://localhost:8080/](http://localhost:8080/) and receive a nice and warm greeting from our browser.

### A simple Parcel example

Older webpack setups are known to be large and complex, but with webpack 4 and webpack-dev-server, setup is far more friendly. However, when it comes to simplicity, Parcel takes it to a whole other level. 
Create a package.json and install Parcel globally.

```
npm init -y
npm i -g parcel-bundler
```

All we need now, is an html file to feed Parcel as the entry point.

```html
// index.html

<html>
  <body>
    <script src="./index.js"></script>
  </body>
</html>
```

Run Parcel with `index.html`. A dev server will automatically start, so go ahead and visit [http://localhost:1234](http://localhost:1234) for another greeting.

```
$ parcel index.html
```

If we want to bundle our code for production, Parcel has a production mode. It will optimize the bundle, just like `mode=production` does for webpack, and output a file instead of starting the dev server. Run the following command, and feed it `./index.js` instead of `./index.html`.
```
$ parcel build index.js
```

## Which is best?

Although the two examples above show some differences between webpack and Parcel, a bundler impacts your project in a lot of other ways. For instance, Parcel claims to use 50 percent less time than webpack to build a project containing 1700 modules. Parcel is also undoubtedly more beginner friendly, giving a lot of features, like code splitting and hot module replacement, with no configuration. That being said, we have to appreciate how incredibly configurable webpack is. It allows us to tailor webpack to the specific needs of any project. It also lets developers extends its core features with custom plugins and loaders.
