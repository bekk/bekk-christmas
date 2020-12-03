---
calendar: react
post_year: 2020
post_day: 16
title: "[UTKAST] Underneath Create React App"
image: https://images.unsplash.com/photo-1484603738253-e5b73679e8cb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2000&q=80
ingress: Ever since I started coding, Create React App (CRA) has been my go-to
  when starting up a new React project. After working with CRA applications
  daily for over a year, I haven’t really put much thought into what is actually
  going on beneath the surface of CRA. I’ve simply been happy copy-pasting `npx
  create-react-app my-app` into the terminal so that I can start coding as soon
  as possible. But recently I started to get curious, what is actually happening
  here?
links:
  - url: https://spin.atomicobject.com/2020/01/28/eject-create-react-app-drawbacks/
    title: Don’t Eject! – Leave your Create React App in the Disc Drive
  - url: https://create-react-app.dev/docs/available-scripts/
    title: Create react app script documentation
  - url: https://dev.to/nikhilkumaran/don-t-use-create-react-app-how-you-can-set-up-your-own-reactjs-boilerplate-43l0
    title: Alternatives to CRA and some interesting discussion
authors:
  - Joakim Gyllenskepp
---
# A fresh CRA project
Note: This article is based on create react app version 4.

After running `create-react-app` your root folder will look something like this:

* Root
  * `src/`
  * `public/`
  * `package.json`
  * `node_modules/`
  * `.gitignore` / `README.md`

You're probably quite familiar with all of these folders. The `src/` folder contains React code, CSS, and some test files. There's also the `public` folder that will be 
publicly available from the web browser, for example `robots.txt` that is used by search engine crawlers, and `index.html` which React will mount itself to. Furthermore there's `README.md`, `yarn.lock/package-lock.json`, and `.gitignore`.

That leaves us with `package.json` which contains some scripts and all of the dependencies of the application, and `node_modules` where all of these dependencies and their peer dependencies will be stored. Slightly related, the `yarn.lock/package-lock.json` files are used to get consistent installs of the application across different machines.

So how can we get all of these files up and running in someone's web browser?

# Lets inspect package.json

First of all `package.json` contains some crucial dependencies such as `react` and `react-dom`. There's also `@testing-library` for testing your code, `web-vitals` for measuring the performance of the app, and finally `react-scripts` which I will get back to in a bit.

Secondly, there are 4 scripts: `start`, `build`, `test`, and `eject`. The `start` script is used to run the application locally, `build` will build an optimized version of the application into the `build`-folder, and `test` is used to run all of the test files in the app. More on the `eject` script later. Note that all of these scripts are dependent on `react-scripts`. Interesting... What is actually going on here?

# React scripts
The `react-scripts` package is the core of create react app. When `react-scripts` is defined in `package.json`, all of the customs scripts and configuration used by create app will be downloaded into `node_modules` and used by the application. These configuration makes it possible to use `scss`, `eslint`, `jest`, `dotenv`, `babel`, and `webpack` in a CRA application. 

As mentioned above, all of the scripts in `package.json` are dependent on `react-scripts`. The code for all of those scripts can actually be found inside the configuration of `react-scripts`, and even though they might seem really simple from your own application, these scripts are actually quite lengthy and complex.

# Lets get back to the eject script

This script will remove `react-scripts` from your application by moving all of the functionality from `react-scripts` into your own application.

After ejecting, it is clear that a lot has changed by opening `package.json`. The number of dependencies went from fewer than 10 to more than 60! That means that there are over 50 dependencies hidden inside `react-scripts`. There's also a heap of other configuration that got replaced by moving all the configuration and dependencies into our project. A lot of these things were put into a `config`- and  `scripts`-folder.

## scripts

We can see that our scripts have changed a bit, for example our `start` script went from `react-scripts start` to `node scripts/start.js`. In other words, instead of utilizing the `react-scripts` package we’re now running a Javascript-snippet with node to start the app. By navigating into `scripts/start.js` we can see a quite lengthy script with quite a few dependencies.

## config

In the `config`-folder we can now find configurations for Jest, http(s), setup for compiling our modules, environmental config, typescript, and a lot of config for webpack (800+ lines!!), which is the module bundler running beneath `react-scripts`.

# So is that it?

There we go, now we’re free of CRA and all of the magic happening behind the scenes in CRA and `react-scripts`. We now have full control over dependencies and we’re free to configure our project however we want to. Be careful though, this means that we have full responsibility for maintaining the code. If you want to upgrade some packages to the newest version, you have to make sure that everything is compatible with your configuration so that half of your scripts doesn’t accidentally break