---
calendar: javascript
post_year: 2020
post_day: 8
title: Create your first NPM package!
image: https://images.unsplash.com/photo-1512909481869-0eaa1e9817ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80
ingress: NPM packages are used by most frontend developers, but only a few have attempted to create them. Do you want to be one of them? Then follow along!
description: ""
links:
  - url: https://docs.npmjs.com/creating-node-js-modules
    title: Creating Node.js modules
  - title: The official NPM documentation
    url: https://docs.npmjs.com/
authors:
  - Niklas Molnes Hole
---

# [WIP]

<!--Finding it hard to find the perfect present for a family member or a friend? Do not worry! Today we will learn how you can make your OWN JavaScript present wrapped inside a NPM package. This article assumes that your whole family and all your friends are fluent in JavaScript and will find this package very useful - at least I think that is reasonable to assume.-->

NPM, or Node Package Manager, is a "library" (think of an actual library) where JavaScript developers can browse and find useful tools for their projects. These tools could be frontend libraries (like [`react`][react]), a bunch of useful algorithms ([`lodash`][lodash]), or command line tool enhancers (like [`chalk`][chalk] - actually made by a [Norwegian NPM legend](https://github.com/sindresorhus)).

The NPM library is huge! Some developers have even created a [drinking game](https://npmdrinkinggame.party/) because of this. However, where does these tools - or more term specific - packages come from? To answer this, we have to travel to the NPM package factory at the North Pole and gain Santa's tr... No, but seriously, how are they made?

## Creating NPM packages are easier than you might think!

<!--_(This could depend on how familiar you are with JavaScript)_-->

To start out, you will need [Node.js][node] installed on your machine. This is essential. Next, you have to make sure that when you open your terminal, write `npm` and press `Enter ↵`, it does not return an error, but rather:

![Check that the `npm` command works.](https://i.ibb.co/YddJbbm/npm-check.png)

If this is your output, then you are good to move on! <!-- If not, try out these links: <Provide some links here for debugging>. -->

...

## Publishing your package to NPM

Finally, when you are ready to test your package, or actually release it, you will need to go through these steps:

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

And tadaa! You will soon be able to see your package on [https://www.npmjs.com/package/\<your-package\>](https://www.npmjs.com/package/<your-package>), as well as adding it to your next project using `npm install <your-package>` or `yarn add <your-package>`. If you do not want your project to be publicly visible you can read about how it is done [here](https://docs.npmjs.com/creating-and-publishing-private-packages) and [here](https://docs.npmjs.com/package-scope-access-level-and-visibility).

Be also sure to check out the articles linked at the bottom if you want to dive deeper into the NPM world. There is so much you can do, and this article only scratched the tip of the iceberg.

# `npm install <insert something here...>`

<!-- I think I am going to create an actual example as there is much learning in concrete examples -->

Thanks for reading! Hope you have created a wishlist, cause I already know what packages I want for christmas 😏🎅 <!--ELLER Hope you want to ..., cause I would like them packages below my christmas three 😍🎅-->

Further reading:

-   ...Create your firt NPM package articles
-   NPM dokumentasjon
-   Security when using NPM packages (maybe link to https://preview.bekk.christmas/security/2020/2 (https://security.christmas/2020/2))

[react]: https://www.npmjs.com/package/react
[lodash]: https://www.npmjs.com/package/lodash
[chalk]: https://www.npmjs.com/package/chalk
[node]: https://nodejs.org/en/
[npm]: https://www.npmjs.com
[npm-signup]: https://www.npmjs.com/signup 'kanskje nevne noe om Github packages'
