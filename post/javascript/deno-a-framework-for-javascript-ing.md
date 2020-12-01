---
calendar: javascript
post_year: 2020
post_day: 3
title: Deno, a framework for JavaScript-ing
image: https://images.unsplash.com/photo-1546064124-7393cbb5c142?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80
ingress: >-
  It's been two and a half year since Ryan Dahl, the creator of Node.js entered
  the stage on JSConf EU. In his presentation, he apologizes to the JavaScript
  community and discusses the *10 things [he] regrets about Node.* Towards the
  end, he reveals his new project, an alternative framework for JavaScript
  development.


  The new project is called *Deno.* And this year, Deno finally left the alpha stage, offering a stable CLI and solid documentation. Which means it's the perfect time to have a closer look!
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
## A Swiss Army Knife of JavaScript

Deno's official philosophy is to be *a productive and secure scripting environment for the modern programmer.* Simply put, Deno enables you to execute JavaScript straight in your terminal, without the need for a web browser.

Sounds like Node, doesn't it? Yes. Like Node, Deno is built upon Chrome's open source [V8 engine](https://v8.dev/), which compiles our JavaScript to machine code. Like Node, Deno comes with a simple command-line interface. Like Node, Deno is made by Ryan Dahl.

Still – Deno is a new take on Node, offering a set of modern approaches:

- *Security by default*: In Deno, programs run without special permissions like access to the file system, network access and read-access to environment variables. There are special flags for enabling and fine-tuning these permissions for programs you trust.
- *TypeScript compatibility:* Deno supports, and encourages the use of TypeScript without any additional configuration.
- *Standard modules*: Deno offers an audited set of standard modules for things like filesystem access. This also includes APIs common in the browser, like *fetch* and the *window* global.
- *Built-in utilities*: Deno comes with a set of handful utilities like a formatter, linter, a file watcher, script bundler, a testing framework and much more.

The built-in utilities may be the biggest selling point of Deno. Surely, with Node's enormous ecosystem, you can get all of these tools from NPM. Format your code with *Prettier*, check it with *ESLint*, use *Nodemon* to watch for changes, bundle your files with *Webpack*, test your code with *Jest* and so on. But Deno tries to bake all these features into a single executable – like a Swiss army knife of JavaScript development.

![List of subcommands available in Deno: bundle, cache, completions, doc, eval, fmt, help, info, install, lint, repl, run, test, types, upgrade.](https://i.imgur.com/mhOzA8y.png)
*Just look at all these tools! 🛠*

## Kill the package manager!

So, Node can do a lot of the things you get from Deno, using the right configuration and third-party dependencies. To install these dependencies, you use the included Node Package Manager, or NPM for short. NPM has seen some criticism over the years, regarding both the centralized registry and the comically large `node_modules` folder. Despite these challenges, it remains a user-friendly method of bundling other people's code into your own application.

Deno, on the other hand, has taken a very different approach. Dependencies must be specified with a full url:

```ts
import { serve } from "https://deno.land/std@0.79.0/http/server.ts";
```

Speaking of dependencies – Deno does not support `require()`, as we all know from Node. Rather, it uses the superior syntax of ES Modules! That means you can `import` and `export` dependencies just like you would in a browser app.

Anyway, this design decision of importing full URLs has a bunch of consequences. First, there is no need for a centralized package repository. There is no NPM equivalent for Deno, there are only URLs. In addition, since the version is also included in this URL, there is no `package.json` file for listing dependencies.

I must admit, this didn't sound very compelling to me. Imports getting more verbose, and no common registry to search for dependencies? But here's the thing. As explained in their documentation, Deno doesn't try to be a full replacement to Node. And they do admit Node and NPM is likely to exist for a while. Rather, Deno tries to be an alternative JavaScript framework, a toolkit better designed for certain tasks.

## Try it today

I'm sold on one thing. Over the years, I've come to love JavaScript, and TypeScript even more so. To me, it's the perfect language for hobby projects, scripting, automation, app development and so on. I've had my fair share of Python for scripting as well, even Bash, but I prefer TypeScript every day. However, Node is not always a pleasure to work with. You cannot use ES Modules out of the box. To  compile TypeScript, you need a plugin. To test your code, you need an external testing framework. Deno offers all of these, plus more, in a single executable.

Then there's the little things, like the `window` global. In Deno, you can use `alert`, `prompt` and `confirm` like you would in a browser, and it just works:

```ts
const name = await window.prompt("What is your name?");
console.log(`Good morning, ${name}!`);
```

You also get an implementation of `fetch`for network requests. And for lifecycle management, you can set up your program in `window.addEventListener("load", handler)` and gracefully shut it down with `window.addEventListener("unload", handler)`. Deno will type-check your code, format, lint and run it. You can even install a script as an executable for your shell environment, with the `deno install` command.

For all these goodies, I think Deno deserves a go.