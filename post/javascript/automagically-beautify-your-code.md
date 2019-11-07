---
calendar: javascript
post_year: 2018
post_day: 7
title: Automagically beautify your code
image: >-
  https://images.unsplash.com/photo-1529220502050-f15e570c634e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1701&q=80
ingress: Let your tools do the dirty work
links:
  - title: An ESLint sandbox that demonstrates how it's used
    url: 'https://eslint.org/demo/'
  - title: A Prettier sandbox where you can try it out!
    url: 'https://prettier.io/playground/'
  - title: 'StandardJS is pretty nice too, try it at their demo page'
    url: 'https://standardjs.com/demo.html'
authors:
  - Kristine Steine
---
Let's be honest - manually formatting your code is super boring.

In any project, consistent code formatting brings value by improving readability and reducing frustration among coworkers. Some coders are really good at writing readable, understandable code, with consistent patterns and _just_ the right amount of spacing. But honestly - I'm not one of them. You'll find me writing drafts of code until it works the way it should, then I'll start working on readability. I want my code to make sense to my coworkers (not to mention: to myself the next time I read it!) and I _dread_ receiving code reviews requiring formatting changes. At the same time, I find spending time manually converting code to match our team's code conventions really draining 😩

## Don't bother doing it yourself 🤷
Enter [ESLint](https://eslint.org)! ESLint is a linting tool that helps you achieve consistent code by configuring rules describing your team's preferred code format and patterns. Installation is really simple:

```sh
$ npm install eslint --save-dev
$ eslint --init
```

You should now see a file named `.eslintrc` in your directory. This is your config file, describing the environment your code runs in and the rules you want your code to follow. ESLint comes with [a set of available rules](https://eslint.org/docs/rules/), but you can also [write your own ones](https://eslint.org/docs/developer-guide/working-with-rules) if you feel like it. Rules come with docs describing what the rule evaluates as correct or incorrect code, as well as any available configuration options.

The rules in `.eslintrc` can be turned off, set to warn (meaning ESLint will not throw an error, just show a warning in your console) or set to throw errors:

```js
  "rules": {
    "semi": "off",
    "eqeqeq": "warn",
    "quotes": ["error", "single"] // specify options by adding them to an array along with the rule config
  }
```

To have ESLint check your files, run this command:

```sh
$ eslint yourfile.js
```

Even better, let's have ESLint fix as many errors automatically as possible:

```sh
$ eslint yourfile.js --fix
```

## Someone else has already thought of good rule sets 🙌
Alright. So you've got ESLint set up, but configuring rules is a bit of a chore. Instead of defining all the rules yourself, you can have your config extend another project's config. Neat! In your `.eslintrc` file, you can remove all the rules and add this:

```js
  "extends": "some-other-imported-config"
```

Okay, so that's not actually a valid config. But here are some widely used ones you should take a look at:
- Airbnb has a really nice [base-config](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb-base/) that I personally love to use. They have also shared [their config for React projects](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb), including accessibility checks and their set of best practices.
- Google's JavaScript style guide is available as an [ESLint config](https://github.com/google/eslint-config-google)
- If you've set up your own formatting rules but want to avoid accessibility issues, there's a [react-a11y plugin for ESLint](https://github.com/evcohen/eslint-plugin-jsx-a11y) that adds accessibility rules. You can configure these yourself or use the recommended set of rules using this extension: `"extends": "plugin:jsx-a11y/recommended"`

You can still override an imported config by configuring rules under the `rules` property. Now you have a really nice tool that will help you write readable code, enforce accessibility and best practices!

## Don't touch that file! 😮
If you want ESLint to keep its hands off some of your files (`node_modules` comes to mind), you can [add a CLI argument](https://eslint.org/docs/user-guide/command-line-interface#ignoring-files-from-linting) or an `.eslintignore`-file. Ours looks something like this:

```
node_modules
assets
build
```

## But wait, there's more 😎
Let's fix even more formatting automatically. There are some really good formatting tools that will improve your workflow immensely (trust me!).

My team uses [Prettier](https://prettier.io), which is a code formatter that will go through your code formatting and _just fix it_. Nice! Prettier allows you some configuration control, but you don't really have to configure much at all. Prettier has an [online sandbox](https://prettier.io/playground) that you can use to test the tool, or to prettify a code snippet. You can use Prettier as a standalone tool, but I mostly use it in combination with the full Airbnb ESLint config. Just add `"prettier"` to your list of extended ESLint configs, and ESLint will know not to worry about formatting - but still tell you about accessibility issues, unused code and bad patterns.

If you want even less config, and you're not into semicolons, check out [StandardJS](https://standardjs.com/). StandardJS is a linter and formatter that will do much of the same as ESLint and Prettier, without the config. Just like Prettier, you can use this as a [standalone tool](https://github.com/standard/standard) or [in combination with ESLint](https://github.com/standard/eslint-config-standard).

Save more time: Both of these can be configured to format files on save in most editors!

## Are we done yet?
Almost! I just want to tell you about one last thing. Let's save even more time by having ESLint (and Prettier, in my case) verify your code during pull requests. In our `package.json` we have a couple of npm scripts that have to run without errors in order to merge a pull request:

```
  "scripts": {
    "verify": "npm run verify:lint && npm run verify:format",
    "verify:format": "prettier '**/*.{less,js}' --ignore-path='.eslintignore' -l"
    "verify:lint": "eslint ."
  }
```

Never worry about pushing ugly, unused, or inconsistent code to master branch again! I hope this is useful for you in some way - thanks for reading, and happy coding!
