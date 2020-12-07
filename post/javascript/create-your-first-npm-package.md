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
description: ""
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

NPM, or Node Package Manager, is a software "library" where JavaScript developers can browse and find handy tools for their projects. These tools - or packages, to be more precise - could be frontend libraries (like [`react`][react]), a bunch of useful algorithms (like [`lodash`][lodash]), or command line tool enhancers (like [`chalk`][chalk] - actually made by a [Norwegian NPM legend](https://github.com/sindresorhus)).

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
  "author": "🎅 <santa@javascript.christmas>",
  "license": "MIT"
}
```

This is necessary as it first of all gives a `name` to your package. Secondly, it contains information about the `version` of the project - such that users of this package can ensure they are using the correct version. You can find information of all the configurations [here](https://docs.npmjs.com/cli/v6/configuring-npm/package-json).

The most important configuration to note here is the `main` value which is set to `index.js`. `index.js` will now be the entry file for the NPM package, meaning this is where you need to **place your code**. You can add more files later, but the entry file will always be the heart of your package.

Side note: _Even though we will not be using this configuration, it is worth mentioning that you can use `dependencies` to include other packages into your package. This enables you to use every single one of the 1.4 million packages in your project! You should probably not include every package in your project, though, as your `node_modules` folder (containing your `dependencies`) [can get quite big really fast](https://www.reddit.com/r/node/comments/4z48e2/is_it_normal_to_have_a_100k_files780_mb_in_the/), and [some packages can introduce potential security issues](https://www.trendmicro.com/vinfo/us/security/news/cybercrime-and-digital-threats/hacker-infects-node-js-package-to-steal-from-bitcoin-wallets). It is usually a good indication to use popular packages with few dependencies, and if that is not enough, you can use [`npm audit`](https://docs.npmjs.com/cli/v6/commands/npm-audit)._

<!-- Skrive kort om hvordan man lager den -->

This was much information! Lets do something. Type this into your terminal:

```bash
npm init
```

You will now be prompted with a lot of questions. Usually you are good with the default values, and **all the values can be changed later**, so you can mostly just hit the `Enter ↵` button with no input, like this:

<!-- Gif -->

### Create something!!!

At last, you need to add some code to your project. In this tutorial, we are making a package that can calculate the days until christmas - in case you need to be reminded of this:

### ARE WE DONE ALREADY?!

There is one more step! Bare with me:

## Publishing your package to NPM

This is the fun part. When you are ready to test your package, or actually release it, you will need to go through these steps:

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

Be also sure to check out the articles linked at the bottom if you want to dive deeper into the NPM world. There is so much you can do, and this article only scratched the tip of the iceberg.

# What to do now

Now, you have few more things you can do in your future life:

- Use your NPM package to revolutionize the world, or at least the developer world. [You can also read about how it can revolutionize you, as well](https://dev.to/thegeoffstevens/why-publishing-your-own-npm-packages-can-make-you-a-better-developer-2lc6).
- Shrink your monolith of a project into something smaller and easier to work with by moving some of your code into NPM packages. Within reasonable bounds, of course. Too many NPM packages could be a nightmare to maintain too.
- Contribute to other NPM packages. I can really recommend this! [\#hacktoberfest](https://hacktoberfest.digitalocean.com)
- Copy your NPM package onto a USB stick and give it as a gift to your family and friends. I am sure they would appreciate it!

<!-- Show a demo of how the package is used using an iframe. Use codepen of something -->

<!-- I think I am going to create an actual example as there is much learning in concrete examples -->

Thanks for reading! I hope you have created a wishlist, cause I already know what packages I want for christmas 😏🎅

[react]: https://www.npmjs.com/package/react
[lodash]: https://www.npmjs.com/package/lodash
[chalk]: https://www.npmjs.com/package/chalk
[node]: https://nodejs.org/en/
[npm]: https://www.npmjs.com
[npm-signup]: https://www.npmjs.com/signup
