---
calendar: react
post_year: 2020
post_day: 18
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
    title: Alternative to CRA and interesting discussion
authors:
  - Joakim Gyllenskepp
---
# A fresh CRA project

After running `create-react-app` your root folder will look something like this:

* Root

  * `node_modules/`
  * `public/`
  * `src/`
  * `package.json`
  * `yarn.lock`
  * `README.md`
  * `.gitignore`

You’re probably familiar with `node_modules`, where the code for all dependencies and peer dependencies of the project are stored.

This `public` folder contains files that we want the user to be able to directly access in the web browser, for example `robots.txt` that is used by search engine crawlers, and `index.html` which React will mount itself to.

In the `src/` folder we find our React code, css-files, Jest test-files, a logo, etc.

`package.json` contains some scripts, all of the dependencies of a project, and some eslint config and a browser-list. As of CRA version 4 we can find the following dependencies: `@testing-library`, `react`, `react-dom`, `web-vitals`, and last but not least the `react-scripts` package which contains scripts and configurations used by CRA. There are also four scripts: `start`, `build`, `test`, and `eject`. We can see that all of these scripts are dependent on `react-scripts` which we found in the dependencies. 

Finally we have the `yarn.lock/package-lock.json`, `README.md`, and `.gitignore` which aren't all that unique to CRA.

If you use the typescript template for CRA, `package.json` will additionaly contain the dependencies `typescript` and some `@types`-dependencies that add ts support to packages that doesn't support typescript out of the box. You will also find `tsconfig.json`, `src/react-app-env.d.ts`, and all the code will be written in Typescript.

# So what happens if you eject the app?

By browsing into `package.json` we can immediately see that a lot have changed. We went from fewer than 10 to more than 60 dependencies! what actually happened is that `react-scripts` and all of its configuration and peer dependencies got replaced by moving all the configuration into our project. Notably we also got a `config`-folder and a `scripts`-folder. There is also some more configuration for `jest` and `babel`.

## scripts

We can see that our scripts have changed a bit, for example our `start` script went from `react-scripts start` to `node scripts/start.js`. In other words, instead of utilizing the `react-scripts` package we’re now running a Javascript-snippet with node to start the app. By navigating into `scripts/start.js` we can see a lengthy script on 166-line that depends on quite a few dependencies.

## config

In the `config`-folder we can now find configurations for Jest, http(s), setup for compiling our modules, environmental config, typescript, and finally there is a lot of config for webpack (800+ lines!!) which is the module bundler running beneath `react-scripts`.

# So is that it?

There we go, now we’re free of CRA and all of the magic happening behind the scenes in CRA and `react-scripts`. We now have full control over dependencies and we’re free to configure our project however we want to. Be careful though, this means that we have full responsibility for maintaining the code. If you want to upgrade some package to the newest version, you have to make sure that everything is compatible with your configuration so that half of your scripts doesn’t accidentally break