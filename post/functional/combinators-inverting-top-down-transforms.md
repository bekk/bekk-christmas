---
calendar: functional
post_year: 2020
post_day: 10
title: Combinators - Inverting Top-Down Transforms
image: https://images.unsplash.com/photo-1577675396914-b32d06b30596?ixlib=rb-1.2.1&ixid=MX
  dwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&w=1238&h=400&fit=crop&crop=edges
ingress: "Today and tomorrow we are excited to have a guest writer sharing some
  of his thoughts on the topic of functional programming: Dillon Kearns, known
  for projects such as
  [elm-graphql](https://github.com/dillonkearns/elm-graphql),
  [elm-typescript-interop](https://github.com/dillonkearns/elm-typescript-inter\
  op), and the [Elm Radio](https://elm-radio.com/) podcast! We hope you enjoy!"
authors:
  - Dillon Kearns
---
One of my favorite things about functional programming is the ability to work and think in a very localized area of code. Let's talk about some of the patterns that make that possible.

I won't go into how immutability, managed effects, or lack of global variables help us reason locally - although they really do! What I want to focus on here is the power of individual transformations composed together, rather than making one big transformation. This concept is sometimes called a Combinator.

## Top-Down Vs. Bottom-Up Transformations

In my JavaScript days, I remember a particularly tricky area of code where we had a big list of data in a format defined by the server. We needed to take product listings, pull out specific options and inventory information, normalize them, and then apply filters from the UI to show/hide and sort search results.

There were deeply nested fields, and some incongruities in the shape of the data. Some values were nullable. Some had specific normalization we needed to apply to get data from multiple sources to match.

We had a lot of big unit tests to make sure things were working. Even so, it was so difficult to go in to our series of lodash function calls and find _where_ you needed to make a change. And once you did, you would want to make sure you added several new test cases to make sure you didn't miss a spot or mishandle a special case.

We would sit in awe as the person most familiar with the codebase correctly traversed the nested arrays and objects to get to the exact right place and make a change on the first try. It was a lot to hold in our heads, and it was quite error prone.

The challenge was that using that paradigm to normalize JSON data required thinking of the data as a monolith. We certainly abstracted out functions to help with parts of the normalization. And we used lodash to do functional style mapping over the arrays of data and key-value objects. But mapping over arrays and objects only gets you part of the way there. We still needed to keep a map in our heads of the structure of the data so we could go into a specific area, traverse it, and change it.

We weren't using TypeScript at the time, but even if we had been, the challenge would remain of having to navigate the structure from the top down in order to add a new transformation. Type-safety is a huge help, but it only gets you part of the way there to the benefits of localized reasoning.

## What is a Combinator?

The term Combinator is used because you can _combine_ the smaller units to build up the whole. A Combinator is the idea of building something up by combining small "base" values into more complex ones. The values could be a JSON Decoder, a syntax parser, a random number generator. The key is that the simplest form can be composed together to build something complex - but (this is important) the simple thing and the complex thing are the same kind of thing!

Combinators share some parallels with the concept of recursion (defining a function in terms of itself).

```elm
fibonacci n =
  if n <= 1 then
    n
  else
    fibonacci ( n - 1 ) + fibonacci ( n - 2 )
```

This recursive definition can be read as _what_ a fibonacci number is (declarative), instead of _how_ it is calculated (imperative). No mention of _how_ to loop over in each iteration - it's simply written in terms of itself, like a math equation. It's pretty close to how you would teach fibonacci to a human. It just so happens that computers can understand it, too!

Recursion is a good analogy for Combinators:

- A Combinator is declarative (not imperative)
- A Combinator is either defined in terms of other Combinators (analogous to a recursive self-invocation), or it is a "base" combinator (analogous to a recursive base case)

Let's look at an example of a Combinator in Elm. The `elm/json` package is how you turn untyped JSON data into typed Elm data (or an `Err` `Result` value if the structure doesn't match).

```elm
personDecoder :
    Decoder
        { name : String
        , birthday : Time.Posix
        }
personDecoder =
    Decode.map2
        (\name birthday ->
            { name = name
            , birthday = birthday
            }
        )
        nameDecoder
        birthdayDecoder
```

What are `nameDecoder` and `birthdayDecoder`? They're both some kind of `Decoder`. We're _combining_ them. Note that we can think about the Decoders here at a high-level, and drop into the details as needed.

At some point, following our `Decoder` definitions we will find a `Decoder` that doesn't just compose Decoders, but directly resolves to a value (similar to our recursive **base case**).

```elm
nameDecoder : Decoder String
nameDecoder =
    Decode.string
        |> Decode.field "full-name"
```

`Decode.string` is going to resolve to some value. But we can compose Decoders together in more ways than just combining them or reading JSON values within a JSON property (like `"full-name"`).

Another key technique for a Combinator is that we can transform them.

```elm
birthdayDecoder : Decoder Time.Posix
birthdayDecoder =
  Decode.field "birthday-date-time" iso8601DateDecoder
```

If we follow the definitions, we finally end up with a direct "base" Decoder for `birthdayDecoder`.

```elm
iso8601DateDecoder : Decoder Time.Posix
iso8601DateDecoder =
    Decode.string
        |> Decode.andThen
            (\dateTimeString ->
                case iso8601StringToTime dateTimeString of
                    Ok time ->
                        Decode.succeed time

                    Err error ->
                        Decode.fail error
            )
```

This time, we are transforming the raw String into an Elm `Time.Posix` value. `iso8601StringToTime` is a function that takes a `String` and gives a `Result String Time.Posix`. When we transform the "base" `Decoder` (`Decode.string`), the type changes with it.

These are some of the basic building blocks of a Combinator. Let's explore how these building blocks lend themselves to breaking down a problem into smaller pieces, without needing to pull in all the surrounding context.

## Combinators are trees

With the JS code where I was working with JSON from the server, I was working on the data top-down, and carving out new "seams" to transform data as needed. In contrast, with a Combinator you already have a place to work. You can visualize a Combinator as a tree. You build up a complex Combinator from the bottom up, and you can think locally about any sub-problem (think sub-tree). Each sub-problem is like a little box that you can work in. Once you find the right box, you don't need to worry about what's outside of that box, you can just focus on what's inside the box you're working on. You don't need to create a new point to make your transformation, because it already exists.

For example, if we need to normalize the names we're getting from the server, we just find the right box and work within that.

```elm
nameDecoder : Decoder String
nameDecoder =
    Decode.string
        |> Decode.map normalizeName
        |> Decode.field "full-name"
```

Or if the name may have a different format, we just make that change within our box, blissfully unaware of the JSON structure surrounding our box.

```elm
nameDecoder : Decoder String
nameDecoder =
    Decode.oneOf [ Decode.string, firstLastDecoder ]
        |> Decode.map normalizeName
        |> Decode.field "full-name"

firstLastDecoder : Decoder String
firstLastDecoder =
    Decode.map2 (++)
        (Decode.field "first")
        (Decode.field "last")
```

Joël Quenneville has a nice visualization of this concept in his article [Elm's Universal Pattern](https://thoughtbot.com/blog/elms-universal-pattern).

## Intermediary Data

Another quality of transforming data in an imperative style is that it can happen in multiple passes. Each iteration to transform the data can yield an intermediary data format that isn't useful except as input to the next transformation phase.

By using a Combinator, you can avoid passing data through various transformation stages. A Combinator represents a set of operations/transformations. You don't actually _use_ the Combinator until you've built it up. If you need to tweak something, you transform the Combinator. So the data is never exposed in your app in an intermediary format.

We are building up both the JSON Decoder and its type information at the same time. Since the types and operations/transformations are in sync, we are guaranteed to either

1. End up with well-typed data (happy path), or
2. End up with a clear error

I really love this quality of the Combinator pattern. This gives you explicit, clearly defined paths, with types fully describing the possibilites. Take a look at Alexis King's article [Parse, Don't Validate](https://lexi-lambda.github.io/blog/2019/11/05/parse-don-t-validate/) for some great insights about that.

## Combinators Beyond JSON Decoders

This pattern isn't specific to a language, like Elm, or a domain, like JSON.

You can use these same concepts in TypeScript with a library like [`io-ts`](https://github.com/gcanti/io-ts). And you can apply this thinking to a lot more problems than JSON. Some examples in the Elm ecosystem:

- [`elm/random`](https://package.elm-lang.org/packages/elm/random/latest/)
- [`elm/parser`](https://package.elm-lang.org/packages/elm/parser/latest/)
- Creating fuzzers (property-based test data) in [`elm/test`](https://package.elm-lang.org/packages/elm-explorations/test/latest/)
- [`elm-graphql`](https://github.com/dillonkearns/elm-graphql)
- [`elm-validate`](https://package.elm-lang.org/packages/rtfeldman/elm-validate/latest/)

## Next Post

Thanks for reading! In the next post, I will share lessons learned about this technique and how it made me realize why I loved one type-safe library I built, and am now rebuilding another to learn these lessons a few years later.
