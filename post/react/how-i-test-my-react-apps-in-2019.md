---
calendar: react
post_year: 2019
post_day: 18
title: How I test my React apps in 2019
image: >-
  https://images.unsplash.com/photo-1529896828179-7d9a0787eee7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1200&q=80
ingress: >-
  Testing your apps is becoming so easy, it's starting to become worth the
  trouble!
description: ''
links:
  - title: Get started with TypeScript and React
    url: 'https://fettblog.eu/typescript-react/'
  - title: React Testing Library
    url: 'https://testing-library.com/docs/react-testing-library/intro'
  - title: Testing JavaScript
    url: 'https://testingjavascript.com/'
authors:
  - Kristofer Giltvedt Selbekk
---
Let me tell you a little Christmas secret: I've never really been a fan of testing. It takes up so much time, makes it harder to refactor your project, and you always feel like you haven't done enough. Testing is a recipe for feeling bad about your efforts. Unless, of course, you have :100: % test coverage, but that's bad in its own right.

**So screw testing, right? Well...**

Truth of the matter is we need those grinchy buzzkills to keep us moving with any kind of confidence. Because no matter how bad writing tests seems to be, doing all of those checks manually on every deploy is definitely not going to happen.

Luckily for us JavaScript developers, testing our apps - and particularly React apps - have become much easier the last couple of years. I'll share some of my hard bought tips from the last couple of years worth of consulting, and hope that you'll find them enjoyable.

## Avoid testing!

The best kind of test is the one you don't have to write explicitly. And as it turns out, we don't have to write most of the tests we used to write! 

A good type system - like TypeScript or ~~Flow~~ well, TypeScript - will catch a whole class of bugs for you without you having to write a single test. Personally, most of the bugs I've introduced over the years could probably have been caught by a type system. Now the darn web app won't show up until I fix them!

So trust a guy that used to hate type systems - embrace that shit right away. Why? Because

```ts
type Props = {
  name: string;
};
```

is a lot less to write than

```js
import React from 'react';
import Component from './Component';
test('does not do something completely embarassing if I forgot to pass a name', () => {
  const { getByText } = render(<Component />);
  expect(getByText('Name: ')).not.toBeInTheDocument();
});
```

## Lint your heart out

If you're not familiar with linting, it's the process of analyzing your code, and checking it against a set of requirements. Sounds a lot like testing, right? 

Truth is, there's two types of linting - annoying and useful. The annoying type of linting is the kind that complains about the trivial stuff like formatting. An automatic bike-shedding tool, of sorts. Just use Prettier, and skip this entire class of annoyance in your pull requests.

The useful kind of linting is the one that catch potential bugs, code smells and accessibility issues in your code. This is the one you want to invest in.

[`eslint`](https://eslint.org/) is the industry linting standard, and I suggest you install the [`eslint-config-react-app`](https://www.npmjs.com/package/eslint-config-react-app) preset as well. With these in your arsenal, you'll be catching and squashing those bugs in no time - all without writing a single line of test code.

## Use the right tooling

Back when I was taught how to test in JavaScript, we used Jasmine and Mocha and Chai and a lot of other tea flavors for some reason. Never thought about that common theme until now, actually 🤔 Cool, anyhow, **stop using all of that stuff right away!** There's better tools out there now, and you should be using those instead.

**Jest** has become the de facto winner of the testing wars - and that's in no small part because of its incredible user experience. You can get started with a simple `npm i jest`, minimal (yet flexible) configuration, and an incredible test watcher experience that is just... great.

But even with Jest, JavaScript testing was a fragile mess at best. We had Enzyme for a bit, which simplified things, but tests were still fragile af. 

2 years ago (wow, has it really been that long?), [Kent C. Dodds](https://twitter.com/kentcdodds) introduced the **React Testing Library**, which was the Jest moment of React testing libraries. 

The React Testing Library (or [@testing-library/react](https://github.com/testing-library/react-testing-library) as it's now known) does a few things very well. It makes sure you're only testing the output, and skipping the implementation details. It also nudges you toward writing accessible apps, while allowing flexibility where you need it. Finally, it makes testing async code a breeze.

## Write tests like your user would

We've eliminated much of the need for manually written tests by now, but there are still a few left we have to write. The ones that mimic your user's behavior.

Whenever I've written a component or piece of UI I find the need to test, I tend to sit down and write up all the scenarios I want to test first. It might look like this:

```js
test('works in the most usual best case scenarios');
test('supports this one weird edge case');
test('handles nested context providers like a boss');
```

Then, I implement. I use the selectors provided by ~~`react-testing-library`~~ `@testing-library/react` to test the output, and I interact with what I've written like the user would have - with clicks, change events and focusing stuff.

I writer longer tests than I used to, too. By asserting that regular interactions - like clicking an accordion, then closing it, then opening it again - works as intended, I feel more like a user writing down steps than a test writer. And that makes me feel good.

## TDD if you want, not because of Uncle Bob

Test driven development is a cool technique to write tests - but it's not always  a good fit for the way you write code, or the way that particular feature should be written.

Instead, play around with the way you write tests until you find something that works for you. Whereas iterating the [red-green-refactor](https://www.codecademy.com/articles/tdd-red-green-refactor) ladder makes sense for some business critical functionality, it's a huge waste of time for more trivial UIs. 

And I'm not sure if it was ever applicable for modern UI programming. One of the main features of TDD back in the days was its quick feedback loop - a feature that's replaced and in many cases surpassed by hot reloading and test watchers. Perhaps it's a better technique when developing your Kotlin backends?

---

So that's it - a few strongly worded paragraphs about how I feel about testing. You might find several of them trivial, and if so I hate to have wasted your time. But at least you didn't waste your time writing bullshit tests, like you used to. 

Takkformeg. 👋
