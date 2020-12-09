---
calendar: functional
post_year: 2020
post_day: 13
title: Handling asynchronous data in TypeScript
ingress: When making web applications most times you fetch stuff from some
  remote location, and usually with XHR. These operations are asynchronous and
  can fail for a myriad of reasons. Handling them well is important to make sure
  the users of your applications have a good time.
links:
  - url: http://blog.jenkster.com/2016/06/how-elm-slays-a-ui-antipattern.html
    title: How Elm Slays a UI Antipattern
  - url: https://medium.com/javascript-inside/slaying-a-ui-antipattern-in-react-64a3b98242c
    title: Slaying a UI Antipattern in React
  - url: https://blogg.kantega.no/slaying_a_ui_antipattern_with_typescript_and_react/
    title: https://blogg.kantega.no/slaying_a_ui_antipattern_with_typescript_and_react/
authors:
  - Ingar Almklov
---
There have been written many blog posts detailing the issues with naive approaches and offering solutions.

[](http://blog.jenkster.com/2016/06/how-elm-slays-a-ui-antipattern.html)<http://blog.jenkster.com/2016/06/how-elm-slays-a-ui-antipattern.html>

[](https://medium.com/javascript-inside/slaying-a-ui-antipattern-in-react-64a3b98242c)<https://medium.com/javascript-inside/slaying-a-ui-antipattern-in-react-64a3b98242c>

[](https://blogg.kantega.no/slaying_a_ui_antipattern_with_typescript_and_react/)<https://blogg.kantega.no/slaying_a_ui_antipattern_with_typescript_and_react/>

The topic of this article will be a practical one. I have been using [](https://github.com/devexperts/remote-data-ts)<https://github.com/devexperts/remote-data-ts> for some time now and find that it solves the problem for me in a nice way. The problem with this library is right there in the readme:

> Docs & Examples Coming soon (check the source)

This is not really the best way to start your relationship with a new library. Usually I would have closed the tab right then and there, but up until that point the alternatives I'd found all had some parts that irked me. Some used strange naming conventions, some didn't have the utility functions needed to be usable, and some kept using `any` or other weak typing choices.

Do note that when I say "strange naming conventions" I mean naming conventions that differ from established FP-lingo. When I work with something that is a functor I expect it to have `map`, not `doIfSuccess`.

So I decided to read the source. It helped a bit. I found out that the examples in the readme just weren't correct. There is no `foldL` on any instance of `RemoteData<E, A>`. Kind of annoying.

I also found out that all functions for working with `RemoteData`s are curried functions that take the `RemoteData` as their last argument. This feels good as it makes piping stuff nice. However, JavaScript/TypeScript does not have any built-in syntax to support piping (yet [](https://github.com/tc39/proposal-pipeline-operator)<https://github.com/tc39/proposal-pipeline-operator>). Ah well, let's get back to that later. Time to try using the library.

```tsx
import { RemoteData, map, success } from '@devexperts/remote-data-ts';

const data: RemoteData<never, number> = success(2);

const result: RemoteData<never, number> = map((x) => x + 1)(data);
```

As with a regular `Either` type, this follows the convention of having the error type as the first type variable and the success type as the second one. Since we're explicitly creating a success-case we can safely use `never` as the "error type".

This should work, right? The success-type of `data` is a `number` so I should be fine passing my function that increments that `number` to `map`. But alas, it doesn't work! TypeScript complains that `x` in our callback is of type `unknown`.

Okay, let's try giving TypeScript some more to work with:

```tsx
import { RemoteData, map, success } from "@devexperts/remote-data-ts";

const data: RemoteData<never, number> = success(2);

const result: RemoteData<never, number> = map((x: number) => x + 1)(data);
```

Ah, there we go. TypeScript is happy and it compiles and works.

Now, for a more realistic example we want to handle more cases, and for that we can use `fold`. `fold` takes four functions for handling (in order) the `initial`, `pending`, `failure` and `success` cases.

```tsx
import { RemoteData, fold, success } from "@devexperts/remote-data-ts";

const data: RemoteData<string, number> = success(2);

const result: string = fold(
  () => "initial",
  () => "loading...",
  (err: string) => err,
  (x: number) => `result: ${x + 1}`
)(data);
```

This all looks pretty nice, but it is kind of annoying to have to specify the types of the arguments to the failure and success callbacks. Sure, we could specify the types as type arguments like so: `fold<string, number, string>` but it still feels redundant. The information is there in the type of `data` after all! Surely there must be a better way to do this.

So, what to do? Luckily for me, I have a colleague who I knew had been using this library before. He pointed me in the direction of what was being hinted at in the first line in the README: "Heavily based on fp-ts lib." What it should have read was "This library is annoying to use without fp-ts. Please also install and use fp-ts, as this library on its own is like a car with square wheels. Sure, it might get you where you're going, but it won't be comfortable".

That colleague I mentioned also pointed me straight to the answer to my frustrations: [](https://gcanti.github.io/fp-ts/modules/function.ts.html#pipe)<https://gcanti.github.io/fp-ts/modules/function.ts.html#pipe>. Remember I mentioned that having the data as the last argument tends to make "pipeline style programming" nice? Yeah, this was that I needed.

If you didn't read yesterday's article I recommend you read it, as it explains both `fp-ts` in general and how `pipe` works in particular.

Now, with this new superpower we can finally write our code without having redundant type information all over the place in addition to it looking way nicer:

```tsx
import { RemoteData, fold, success } from "@devexperts/remote-data-ts";
import { pipe } from "fp-ts/function";

const data: RemoteData<string, number> = success(2);

const result: string = pipe(
  data,
  fold(
    () => "initial",
    () => "loading...",
    (err) => err,
    (x) => `result: ${x + 1}`
  )
);
```

A more complex version of our first example could also be written

```tsx
import { RemoteData, map, getOrElse, success } from "@devexperts/remote-data-ts";
import { pipe } from "fp-ts/function";

const data: RemoteData<string, number> = success(2);

const result: string = pipe(
  data,
  map((x) => `The answer is ${x + 1}`),
  getOrElse(() => "no answer")
);
```

And there you have it. This is how to nicely handle remote data in TypeScript. Now that you know how it's supposed to be used, reading the code over at [](https://github.com/devexperts/remote-data-ts/blob/master/src/remote-data.ts)<https://github.com/devexperts/remote-data-ts/blob/master/src/remote-data.ts> should give you a better feel for how you can use it in your application.