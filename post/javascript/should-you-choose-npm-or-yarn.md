---
calendar: javascript
post_year: 2019
post_day: 10
title: Should you choose npm or yarn?
image: >-
  https://images.unsplash.com/photo-1494961104209-3c223057bd26?ixlib=rb-1.2.1&auto=format&fit=crop&w=1892&q=80
ingress: >-
  Every team has to make various decisions before, and during, the development
  of a digital product. One of these usually involves `yarn`, `npm` or another
  tool to build and package javascript code. Some developers have a burning
  desire to go in a certain direction, and sometimes they end up spending a
  considerable amount of time trying to make decisions that in fact will have
  little impact in their everyday life. 
description: 'yarn npm node package management '
links:
  - title: yarn
    url: 'https://yarnpkg.com/lang/en/'
  - title: npm
    url: 'https://www.npmjs.com/package/npm'
authors:
  - Charlie Midtlyng
---

To understand why this is an interesting decision to make in the first place, we need to have a look at the history of package management in javascript.

* **Pre `npm`**: frontend dependencies are downloaded manually and stored into the repositories 📁
* **2010**: `npm` is released and supports `nodejs` 📦
* **2012**: `npm` usage is dramatically increasing - primarily due to `Browserifys` browser support 🎉
* **2012**: `npm` get a competitor, `bower`, that entirely supports browsers 💻
* **2012-2016**: The number of dependencies for frontend projects increases exponentially 🤯
* **2012-2016**: Building and installing frontend applications becomes slower and slower 🐢
* **2012-2016**: An infinite amount of (duplicated) dependencies are stored in nested folders within the magic `node_modules` ☢️
* **2012-2016**: `rm -rf node_modules` the most frequently used command as a frontend developer..? 🗑
* **2015**: `bower` lose the battle against `npm` 💀
* **2015**: `node_modules` are changed to a (more) flatten file structure! 🕸
* **2016**: [`left-pad` becomes the worldwide news of the day](https://qz.com/646467/how-one-programmer-broke-the-internet-by-deleting-a-tiny-piece-of-code) 👈
* **2016**: `yarn` is released 🚀
  * Supports both `npm` and `bower` repositories
  * `yarn.lock` locks installed versions and provide deterministic dependencies. No more `rm -rf node_modules`! 
  * `yarn install` spend about half the time versus `npm install` (without using cache)
  * Caching and offline mode enables build processes to consume nearly no time
* **2016**: `npm` releases `shrinkwrap` 🧯
  * An attempt to handle dependency locking
  * Unfortunately, several errors and promising more than it could manage - the reputation of the tool became poor
* **2017**: `npm` 5 is released 🔓
  * `package-lock.json` is their new tool, `shrinkwrap` is put aside
  * `package-lock.json` take on the fight against `yarns` lock file
* **2018**: `npm ci` is released 🛬
  * Build code using `package-lock.json` directly 
  * No expensive security and version analyses on the dependencies
  * Build time is drastically reduced on the build server!
* **2018**: `npm` 6 is released 👮‍♀️
  * `npm` check security vulnerabilities for dependencies to be installed
  * No significant variance in build time between `yarn` and `npm`
* **2019**: `tink` is in beta mode 🦋
  * Avoid using `node_modules` and rather have one file with hashes for each dependency in the project
  * Not yet production-ready
* ...

### Phew 🥵
As we can see, after the release of `yarn`, `npm` has been inspired (and forced?) to develop lots of good tools and mechanisms. `yarn` should get credit for addressing some important problems related to `npm` and put pressure on their competitor back in 2016.  Both speed, security and deterministic package handling are essential features that allow today's developers to focus and concentrate on creating value - and not fighting the tool.

### Conclusion 🤔
For convenience, I would recommend most teams (who have to make numerous other and more important technologically decisions) to choose the easiest option - `npm`. It is shipped with `node` and is, in 2019, sufficient enough to handle package management in a good manner.

### Always an exception? 🧐
When using monorepo, `yarn workspaces` is a popular alternative whereas `npm` doesn't offer an equivalent alternative. `lerna` is a package that also supports usage of monorepos and works with both `npm` and `yarn` (with `workspaces`)

### pnpm 🥉
PS: It should be mentioned that `pnpm` is the third option for package management. `pnpm's` selling point is not downloading a package if it is already downloaded in another repository - which is similar to dependency management in Java, `maven`. At the time of writing, `pnpm` is not as mature and production-ready as `yarn` or `npm`
