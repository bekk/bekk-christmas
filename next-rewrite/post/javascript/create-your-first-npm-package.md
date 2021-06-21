---
calendar: javascript
post_year: 2020
post_day: 8
title: Create your first NPM package!
image: https://images.unsplash.com/photo-1512909481869-0eaa1e9817ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80
ingress: Maybe you are burning inside with an idea of an NPM package that could
  revolutionize the world? Or maybe you just want to see what it's all about?
  This article will be a simple tutorial on how you can get started with
  creating NPM packages - which I, personally, found to be a quite useful skill
  to have!
description: Want to create a NPM package? Og just want to see what it is all
  about? Then this is the guide for you.
links:
  - title: Why publishing your own npm packages can make you a better developer
    url: https://dev.to/thegeoffstevens/why-publishing-your-own-npm-packages-can-make-you-a-better-developer-2lc6
  - url: https://docs.npmjs.com/creating-node-js-modules
    title: Creating Node.js modules
  - title: The official NPM documentation
    url: https://docs.npmjs.com/
  - url: https://security.christmas/2020/2
    title: Security when using NPM packages
authors:
  - Niklas Molnes Hole
---


The NPM library is huge! Some developers have even created a [drinking game](https://npmdrinkinggame.party/) because of this. However, where does these packages come from? And how can I create one? I am glad you asked! To answer this, we have to travel to the NPM package factory at the North Pole and gain Santa's tr... No, but seriously, how are they made?

## Creating NPM packages are easier than you might think!

To start from the basics you will need a computer with [Node.js][node] installed.

Next, you will have to make sure that when you open your terminal ([3 ways to open a terminal on Windows](https://www.wikihow.com/Open-Terminal-in-Windows), [7 ways to open a terminal on Mac](https://www.idownloadblog.com/2019/04/19/ways-open-terminal-mac/), [Linux users should already know how to do this]()), write `npm` and press `Enter ↵`, it does not return an error, but rather:

<img alt="Check that the `npm` command works." class="light-theme-image" src="https://s8.gifyu.com/images/render1607352000960.gif" />
<img alt="Check that the `npm` command works." class="dark-theme-image" src="https://s8.gifyu.com/images/render1607351226314.gif" />

If this is how your terminal looks like now, then you are ready to move on. If not, you can try out [this link](https://docs.npmjs.com/common-errors).

### Create a folder

Before we begin with using NPM, it important that you work inside a folder (or directory) on your computer that is only dedicated to your NPM package. If you don't, you can risk publishing files with sensitive information! And we don't want sensitive information publicly on the Internet, do we?

As we have already opened our terminal from the previous step, we can easily create a folder just by typing in these commands:

<!--
```bash
mkdir name-of-your-package
# This will create a folder (mkdir = make directory)

cd name-of-your-package
# This will move the terminal into the folder (cd = change directory)
```

See how that is done in the GIF below:
-->

<img alt="Create a folder in the terminal" class="light-theme-image" src="https://s8.gifyu.com/images/render1607294686732.gif" />
<img alt="Create a folder in the terminal" class="dark-theme-image" src="https://s8.gifyu.com/images/render1607294600020.gif" />

### Create or generate a `package.json` file

In every NPM project, there exists a file called `package.json`:

```json
{
  "name": "days-until-christmas",
  "version": "0.0.1",
  "description": "I lost the count so I made this to keep myself up-to-date next time",
  "main": "index.js",
  "scripts": {},
  "dependencies": {},
  "keywords": [],
  "author": "🎅 <santa@javascript.christmas> (https://javascript.christmas)",
  "license": "MIT"
}
```

This is necessary as it first of all gives a `name` to your package. Secondly, it contains information about the `version` of the project - such that users of this package can ensure they are using the correct version. You can find information of all the configurations [here](https://docs.npmjs.com/cli/v6/configuring-npm/package-json).

The most important configuration to note here is the `main` value, which is set to `index.js`. `index.js` will now act as the entry file for the NPM package, meaning this is where you need to **place your code**. You can add more files later, but the entry file will always be the heart of your package and all other files needs to be connected to this file somehow.

Side note: *Even though we will not be using this configuration, it is worth mentioning that you can use `dependencies` to include other packages into your package. This enables you to use every single one of the 1.4 million packages in your project! You should probably not include every package in your project, though, as your [`node_modules`](https://docs.npmjs.com/cli/v6/configuring-npm/folders#node-modules) folder (containing your `dependencies`) [can get quite big really fast](https://www.reddit.com/r/node/comments/4z48e2/is_it_normal_to_have_a_100k_files780_mb_in_the/), and [some packages can introduce potential security issues](https://www.trendmicro.com/vinfo/us/security/news/cybercrime-and-digital-threats/hacker-infects-node-js-package-to-steal-from-bitcoin-wallets). It is usually a good indication to use popular packages with few dependencies, and if that is not enough, you can use [`npm audit`](https://docs.npmjs.com/cli/v6/commands/npm-audit).*

To make the `package.json` file, you get two choices:

1. Create a file with that name in your package folder. Then copy the code above into it.
2. Or type `npm init` into your terminal. You will then be prompted with a few questions which results in a generated `package.json` file.

Choose what you feel the most comfortable with.

### Add some code into your `index.js` file

At last, you need to add some JavaScript code to your package that other projects can use. In this tutorial, we are making a package that can calculate days until christmas.

```javascript
// Content of the index.js file
function daysUntilChristmas() {
  const timeInADay = 24 * 60 * 60 * 1000;
  const now = new Date();
  const thisYear = now.getFullYear();
  let dateOfChristmas = new Date(thisYear, 11, 24).getTime();
  if (dateOfChristmas < now - timeInADay) {
    dateOfChristmas = new Date(thisYear + 1, 11, 24).getTime();
  }
  return Math.abs(Math.ceil((dateOfChristmas - now) / timeInADay));
}

module.exports = daysUntilChristmas;
```

The last line will make the function `daysUntilChristmas` accessible by those who want to use your package. Be sure to remember to include this!

## Publishing your package to NPM

When you are ready to test your package, or actually release it, you will need to go through these steps:

### 1. Create a user on NPM and log in

If you do not have an NPM user - like most humans - you will need to [sign up on the NPM website][npm-signup].

Back in the terminal, you will now need to run:

```bash
npm login
```

Now, just follow the instructions.

### 2. Set your package version

Before every release you will need to change your package version as it is not possible to overwrite a existing published version. However, changing a version is fairly simple. Just manually type this in your terminal:

```bash
npm version 0.0.1
```

You can also just change the version in `package.json` manually.

### 3. Publish your package!

This is the last step:

```bash
npm publish
```

And tadaa! You will soon be able to see your package on [https://www.npmjs.com/package/\<your-package\>](https://www.npmjs.com/package/<your-package>) (you might also get some seconds of fame on the [NPM frontpage](https://www.npmjs.com/) 🤩), as well as adding it to your next project using `npm install --save <your-package>` or `yarn add <your-package>`. If you do not want your project to be publicly visible you can read about how it is done [here](https://docs.npmjs.com/creating-and-publishing-private-packages) and [here](https://docs.npmjs.com/package-scope-access-level-and-visibility).

Here is also a demo of the [`days-until-christmas`](https://www.npmjs.com/package/days-until-christmas) package from the example which could be worth checking out:

<iframe height="265" style="width: 100%;" scrolling="no" title="Days Until Christmas package" src="https://codepen.io/niklasmh/embed/wvzWqgO?height=265&theme-id=dark&default-tab=js,result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/niklasmh/pen/wvzWqgO'>Days Until Christmas package</a> by Niklas Molnes Hole
  (<a href='https://codepen.io/niklasmh'>@niklasmh</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

The source code can be found here: [https://github.com/niklasmh/days-until-christmas](https://github.com/niklasmh/days-until-christmas)

Be also sure to check out the articles linked at the bottom if you want to dive deeper into the NPM world. There is so much you can do, and this article only scratched the tip of the iceberg.

# What to do now

Now, you have few more things you can do in your future life:

- Use your NPM package to revolutionize the world, or at least the developer world. [You can also read about how it can revolutionize you, as well](https://dev.to/thegeoffstevens/why-publishing-your-own-npm-packages-can-make-you-a-better-developer-2lc6).
- Shrink your monolith of a project into something smaller and easier to work with by moving some of your code into NPM packages. Within reasonable bounds, of course. Too many NPM packages could be a nightmare to maintain too.
- Contribute to other NPM packages. I can really recommend this! [\#hacktoberfest](https://hacktoberfest.digitalocean.com)
- Copy your NPM package onto a USB stick and give it as a gift to your family and friends. I am sure they would appreciate it!

Thanks for reading! I hope you have created a wishlist, cause I already know what packages I want for christmas 😏🎅

[react]: https://www.npmjs.com/package/react
[lodash]: https://www.npmjs.com/package/lodash
[chalk]: https://www.npmjs.com/package/chalk
[node]: https://nodejs.org/en/
[npm]: https://www.npmjs.com
[npm-signup]: https://www.npmjs.com/signup