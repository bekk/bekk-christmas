---
calendar: react
post_year: 2020
post_day: 2
title: "War stories: The move from Flow to TypeScript"
image: https://images.unsplash.com/photo-1483794344563-d27a8d18014e?ixid=MXwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDZ8fHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60
ingress: |-
  Some background…

  We are 8 full time developers contributing to the code base. 

  The app is broken up into packages 24 packages

  Bla bla bla
links:
  - url: https://skovhus.github.io/blog/flow-to-typescript-migration/
    title: Migrating from Flow to TypeScript using flow-to-ts
  - title: flow-to-ts playground
    url: https://flow-to-ts.netlify.app/
authors:
  - Kent Andersen
---
## The why

Flows ease of use with React / React Native, and gradual approach to typing made it an ideal framework to help us detect type errors and stay consistent. 

I was not in the room when the decision to adapt Flow was made. But I recon the discussion went like this. How will this affect our current speed? Do we need to change the build pipeline? What new dependencies will we need to include? The answer is of course none, no, and babel-flow-plugin. 

Fast forward two years and Flow was still with us, however it was getting harder and harder ignore the elephant in the room. Flows momentum was not what it one was. Other Facebook product had started to[ make the switch](https://github.com/facebook/jest/pull/7554), and in the community [Facebooks commitment was being questioned](https://github.com/facebook/flow/issues/7365). As of November 2020 11 authors have pushed 44 commits to Flow’s master branch and merged 0 pull-requests, compared to 23 authors and 100 commits to TypeScript’s master branch with 85 merged pull requests.

Editor integration and developer experience with Flow left a lot to be desired. Our team is splitt 50/50 between IntelliJ IDEA and Visual Studio Code. Both editors has extensive support for autocomplete, type checking and refactoring for TypeScript, with Flow not so much. 

Flow had done a pretty good job, but it was time to move on.

## Getting ready to convert

What is the current state of out application? What do we need to do get it ready?

In the clients repository there are tree clients, web - app - widget. Code is grouped by domain and module, with platform specific implementations residing next to each other, [read more in last years calendar](https://preview.bekk.christmas/react/2019/23). Up until that point we used custom file extensions to separate the web and native implementations. The native bundler would look for files with extensions `.native.js` and `.js` and the web bundler would look for `.web.js` and `.js`. A component folder would contain both a `index.web.js` and `index.native.js` and import of said component would only refer to the folder and let the bundler pick the correct implementation. This worked great and ensured only correct files where bundle for the platform. However, static code analyses, such as ESLint and Flow, would frequently get lost, and match against the wrong implementation. Resulting in a lot of false negatives and false positives.

It is easy to regarded this as a limitation in the utilities, but actually it is symptoms of how much of a anti pattern the platform extensions is. It became apparent that it had to go. All `index.native.js` and `index.web.js` was renamed to `native.js` and `web.js`, and imports was updated with `/native` or `/web`. The result was rather nice. Instead of hiding the  dual implementation complexity, it was highlighted, and static analyses worked as expected.

Another issue with any codebase of a given size is unused code. ESLint can detect if a variable or method is unused within the file, which is great, however once you add a export in front of it your on your own. Finding unused code across the whole repository has been a combination of gut feeling and find in all files. The goal was to detect all unused exports as part of the testing process. Luckily this is not a new problem. There are several packages available. The code in [js-unused-exports](https://github.com/devbridge/js-unused-exports) was relatively easy to understand, so I [forked the hell out of it](https://github.com/kentandersen/js-unused-exports). Sure sex is great, but have you ever removed 812 unused exports.

## Choosing a strategy

With the code base pruned and in shipshape, there was time to choose migration path. As with all migration there are really only two approaches; Big bang where nothing works until everything works, or hybrid where both systems exists side by side. It's really a question of where do you want to place the additional complexity and how long do you want to spend in the transition phase.

In a big bang approach there is only one type system, which gives you low complexity in build, but high complexity in the application. The transition phase is short, but intense, as all code needs to be rewritten before anything can be released. 

In a hybrid approach there is two type systems, which gives you high complexity in build, but low complexity in the application. The transition phase is longer, with code remaining unchanged until you choose to convert it, but no block on releases.

Generally I prefer the big bang, just get done with it. But a hybrid approach seemed alluring. I decided to give it a try. The setup is quite easy. Building the application with both type systems is pretty straight forward. React Native supports it out of the box, for webpack you need to enable the "@babel/typescript” preset for `.ts` and `.tsx` files using [overrides](https://babeljs.io/docs/en/options#overrides). The hard part it getting the two type systems to talk to each other. There is no built in support for TypeScript in Flow or vice-versa. The only way for the two systems to understand each other is by manually bridging the gap using declaration files. Creating declaration files not hard but tedious. Having to keep them in sync with the rapidly changing implementations that’s a recipe for disaster. 

Lets say Flow imports a module implemented in TypeScript. That module takes one parameter, a string, and returns another string. This is also defined in the declaration file. Then one day we need to change the implementation so that it returns an object of strings, one for each supported language, instead. Usually you would change the implementation, run type check to see where it crashes, and update the usages. But now the TypeScript implementation differs from the Flow declaration file. Flow will still think it receives a string and calls all clear, regardless of what TypeScript says. You have now erected a iron curtain across your application, and every time you jump from one side to the other your risk of getting shot in the face.

This is a fundamental problem with the hybrid approach, and grows the longer you’re in the transition phase. After this realisation it was time for a U turn, lets do a big bang instead.

## Lets do what we came here to do 

We have added support structures, polished, and made plans, but at this moment there are 0% TypeScript in the repository.\
We had blocked out tree weeks to do the translation, full freeze, all hands on deck. I had two fears; cross cutting issues halting all work, and people unintentionally fixing the same things. When you have the luxury of full focus, it is important to utilise people as best as possible. A week before work was scheduled to begun I created a parallel, secret (not really secret), master branch to prepare the work. The plan was come Monday, all code would have been converted, and all controls would be configured.

In order to achieve this I have to spend as much time possible configuring controls and fixing cross cutting issues and as little converting Flow code. Kahn Academy saved me an unbelievable amount of work with their  [`flow-to-ts`](https://github.com/Khan/flow-to-ts) utility. It translates Flow to TypeScript keeping almost all of the type information, and renames the file to .ts or .tsx (depending on jsx usage). Translating the 1300 plus source files took under two minutes with only 10 needed any manual touch. 

Once all files had been converted I could start work on getting control frameworks up and running, mainly ESLint. ESLint is built around a plugin architecture. It comes bundled with a standard javascript-parser and the built-in rule set, everything else is a plugin. Robert Cooper has written a great [in depth on configuring ESLint with TypeScript](https://www.robertcooper.me/using-eslint-and-prettier-in-a-typescript-project). In our setup it was basically changing parser from `babel-eslint` to `@typescript-eslint/parser`, replacing `flowtype/recommended` with `@typescript-eslint/recommended` and `@typescript-eslint/eslint-recommended `extensions. To not get overrun with errors I recommend starting the ESLint on a subfolder with only few files and work your way from there.

With ESLint up and running, it was time to fix formatting issues. `flow-to-ts` has built in support for Prettier, but it did not work with our ESLint - Prettier combo, and defaulted to standard formatting. The result was a lot of formatting errors. The solution was as easy as running `eslint --fix` which cleaned all issues, and made files look somewhat similar as before the translation. 

Because the file extension had changed it was important that git marked the file as being moved, not removed + added, to preserve the history. Since Flow and TypeScript syntax is roughly equal, and ESLint ensured correct formatting, 99% of files preserved history. 

## The big freeze

The 3 week freeze was upon us. All that matters was getting the number of errors down to 0. There was no time for refactoring, and little to no code changes. By converting all source files to TypeScript we take on a lot of risk, and the last thing we needed was additional risk in the form of changes to the application. The outputted code should be close to identical to pre-TypeScript. 

There was a lot of work to be done. Roughly 5000 TypeScript errors, 800 ESLint errors and 250 failing tests. To get one thing out of the way, and boost moral, we went all in on fixing ESLint errors. There was a lot of recurring errors "Unexpected any" and "Don't use \`Object\` as a type". None of these errors was hard to fix, but after a couple of hundred of them it starts to become quite dull. To my surprise, we reached 0 ESLint errors before the end of the first day.

With ESLint errors gone it was time to parallelise. When using TypeScript with Babel, type checking and transpiling are two separate tasks. Babel strips away the TypeScript semantics regardless of whether or not it works. Getting the applications to build was not dependent on passing type checking.

We defined tree goals; Getting all tests to pass. Getting the application to build, Passing type check. Two developers focused on getting the tests to pass, two on fixing the build, and the remaining four worked on reducing TypeScript errors. At the end of day two fixing tests and fixing build, was done. 

At the start of day tree, with only TypeScript errors left, it  

 everyone was focus on getting that number to 0. 

![](/assets/screenshot-2020-12-01-at-20.18.50.png)

Oi her var det stopp! Dette gjennstår

* Rulle av folk
* Hvordan gikk det, oppsummering
* Tiden det tok
* Oppnådd (kortsiktig) gevinst
* @ts-ignore