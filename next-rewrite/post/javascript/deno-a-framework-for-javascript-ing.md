---
calendar: javascript
post_year: 2020
post_day: 3
title: Deno, a framework for JavaScript-ing
image: https://images.unsplash.com/photo-1546064124-7393cbb5c142?w=1226&h=800&fit=crop
ingress: >-
  Back in 2009, Ryan Dahl entered the stage on JSConf and presented his newest
  project, *Node.js*. And since then, Node has grown into an enormous ecosystem
  with over *1.5 million packages* on NPM.


  9 years later, during JSConf 2018, he enters the stage again. This time, he apologizes to the JavaScript community and discusses the [10 things he regrets about Node](https://www.youtube.com/watch?v=M3BM9TB-8yA). Towards the end, he reveals his new project, an alternative framework for JavaScript development.


  The new project is called Deno. And this year, Deno finally left the alpha stage, offering a stable CLI and solid documentation. Which means it's the perfect time to have a closer look!
description: This year, Deno finally left the alpha stage, offering a stable CLI
  and solid documentation. Which means it's a perfect time to have a closer
  look!
links:
  - title: 10 Things I Regret About Node.js
    url: https://www.youtube.com/watch?v=M3BM9TB-8yA
  - title: Deno on Github
    url: https://github.com/denoland/deno
  - title: Docs for Deno
    url: ttps://deno.land/
authors:
  - Kjetil Svalestuen
---
## Server-side development, reimagined

Deno's official philosophy is to be a *productive and secure scripting environment for the modern programmer*. Simply put, Deno enables you to execute JavaScript straight in your terminal, without the need for a web browser.

Sounds like Node, doesn't it? Yes. Like Node, Deno is built upon Chrome's open source [V8 engine](https://v8.dev/), which compiles our JavaScript to machine code. Like Node, Deno comes with a simple command-line interface. Like Node, Deno is made by Ryan Dahl.

Still – Deno is a new take on server-side JavaScript, offering a more modern design:

- *Security by default*: In Deno, programs run without special permissions like access to the file system, network access and read-access to environment variables. There are special flags for enabling and fine-tuning these permissions for programs you trust.
- *TypeScript compatibility:* Deno supports, and encourages the use of TypeScript without any additional configuration.
- *Standard modules*: Deno offers an audited set of standard modules for things like filesystem access. This also includes APIs common in the browser, like *fetch* and the *window* global.
- *Built-in utilities*: Deno comes with a set of handful utilities like a formatter, linter, a file watcher, script bundler, a testing framework and much more.

The built-in utilities may be the biggest selling point of Deno, supplying the developer with a set of commands only available in Node through a large number of third-party dependencies. Just look at all these tools! 🛠️

![List of available subcommands in Deno](https://i.imgur.com/mhOzA8y.png)

## Kill the package manager

Node can do almost all the things you get from Deno by using said third-party dependencies. These are installed using NPM, the *Node Package Manager*. NPM has seen some criticism over the years, regarding both the centralized registry and the comically large `node_modules` folder. Despite these challenges, it remains a user-friendly method of bundling other people's code into your own application.

Deno, on the other hand, has taken a very different approach. Dependencies must be specified with a full url:

```jsx
import { serve } from "https://deno.land/std@0.79.0/http/server.ts";
```

Speaking of dependencies – Deno does not use `require()`, as we all know from Node. Rather, it uses the superior syntax of ES Modules! That means you can `import` and `export` dependencies just like you would in a browser app.

Anyway, this design decision of importing full URLs has a bunch of consequences. First, there is no need for a centralized package repository. There is no NPM equivalent for Deno, there are only URLs. In addition, since the version is also included in this URL, there is no `package.json` file for listing dependencies.

I must admit, this didn't sound very compelling to me. Imports getting more verbose, and no common registry to search for dependencies? But here's the thing. As explained in their documentation, Deno doesn't try to be a full replacement to Node. And they do admit Node and NPM is likely to exist for a while. Rather, Deno tries to be an alternative JavaScript framework, a toolkit better designed for certain tasks.

## A Swiss Army Knife

Over the years, I've come to love JavaScript, and TypeScript even more so. To me, it's the perfect language for hobby projects, automation, app development and so on. As for scripting, I've written my fair share of Python and Bash, but I still prefer TypeScript.

Node is not always a pleasure to work with. You cannot use ES Modules out of the box. To compile TypeScript, you need a plugin like `ts-node`. You format your code with `Prettier`, check it using `ESLint`, use `Nodemon` to watch for file changes and `Webpack` for bundling your files. To test your code, you need an external framework like `Jest`. The list goes on. Deno offers all of these tools, plus more, in a single executable – like a Swiss army knife of JavaScript development.

Then there's the little things, such as the `window` global. In Deno, you can use `alert`, `prompt` and `confirm` just like you would in a browser:

```jsx
const name = await window.prompt("What is your name?"); // > What is your name? Kjetil
console.log(`Good morning, ${name}!`); // > Good morning, Kjetil!
```

You also get an implementation of `fetch`for doing network requests. You can gracefully manage lifecycle events just like you would in the browser. When you're done, you can even install your script as an executable for your shell environment, with the `deno install` command.

![Installing a script with Deno](https://i.imgur.com/cF9AERr.png)

All these features amount to a great developer experience in JavaScript's matured ecosystem. And for that, I think Deno deserves a place in our toolkit, alongside Node.