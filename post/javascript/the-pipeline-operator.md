---
calendar: javascript
post_year: 2018
post_day: 12
title: The Pipeline Operator
image: >-
  https://images.unsplash.com/photo-1428585227457-326f25f9cee2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80
ingress: >-
  Yet another new feature proposal for JavaScript that we'll live perfectly fine
  without (but would at the same time also be very handy).
links:
  - title: Pipeline operator proposal at TC39
    url: 'https://github.com/tc39/proposal-pipeline-operator'
  - title: Pipeline operator Babel plugin
    url: 'https://www.npmjs.com/package/@babel/plugin-proposal-pipeline-operator'
  - title: Partial application at TC39
    url: 'https://github.com/tc39/proposal-partial-application'
authors:
  - Erik Wendel
---

Evaluate the following expression:

```js
divideByTwo(square(triple(double(increment(0)))))
```

The answer is eighteen.
How about that readability, huh?

Developers having used F#, Elixir, Elm (or a bunch of other languages) will be reaching for what's called "the pipeline operator" before you can say Santa Claus.

The pipeline operator allows for a much nicer syntax to the above code, where you start with the first input to the chain of functions, rather than the last function in the chain:

```js
1 |> increment |> double |> triple |> square |> divideByTwo
```

The pipeline operator simply swaps the order from `fn3 fn2 fn1 object` to `object fn1 fn2 fn3`.

If you're familiar with the unix pipe tool (of course you are), you already understand how this works.

## Why do I care?

Because it's coming to JavaScript!

Well, maybe. 

It's currently a TC39 feature proposal in stage 1, meaning it's still considered experimental and that the syntax might very well change before it ends up the language specification.

## Functions With Multiple Arguments

This also plays well with multi-argument functions:

```js
increment(0)
    |> x => add(5, x)
    |> x => divideBy(x, 2)
```

By using arrow functions, we can create new functions that make sure our piped values end up in the right place in the argument list for the next function of the pipeline.

This can be improved further by using another new language feature proposal: the partial application operator.

```js
increment(0)
    |> add(5, ?)
    |> (?, 2)
```

As seen in the example, the partial application operator enables `?` as a placeholder for the value that will be passed from the previous step in the pipeline chain.

Under the hood, calling a function with `?` will create a new function with the other arguments bound to their values.

Given a function `add`:

```js
function add(x,y) {
    return x + y
}

// calling
add(5, ?)

// will give you 
function (y) {
    return 5 + y
}
```

## I want this, now!

Good! 

There's been some concerns about this feature among those who govern the ECMAScript standard. As a result, several different variations of this feature has been discussed:

1. The original pipeline operator proposal

2. The ["Smart Pipelines"](https://github.com/js-choi/proposal-smart-pipelines) proposal

3. The ["F# Pipelines"](https://github.com/valtech-nyc/proposal-fsharp-pipelines) proposal

As we understand, the committee is currently awaiting feedback from the community on experiences using these, before moving forward.

This basically means, that the next step of the process involves people like you and me actually using it in real projects and sharing our experiences.

What are you waiting for?
