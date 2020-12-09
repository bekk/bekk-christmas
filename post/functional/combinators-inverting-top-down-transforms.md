---
calendar: functional
post_year: 2020
post_day: 10
title: Combinators - Inverting Top-Down Transforms
ingress: "Today and tomorrow we are excited to have a guest writer sharing some
  of his thoughts on the topic of functional programming: Dillon Kearns, known
  for projects such as elm-graphql, elm-typescript-interop, and the podcast [Elm
  Radio](https://elm-radio.com/). We hope you enjoy!"
authors:
  - Dillon Kearns
---
One of my favorite things about functional programming is the ability to work and think in a very localized area of code. Let's talk about some of the patterns that make that possible.
​
I won't go into how immutability, managed effects, or lack of global variables help us reason locally - although they really do! What I want to focus on here is the power of individual transformations composed together, rather than making one big transformation. This concept is sometimes called a Combinator.
​
## Top-Down Vs. Bottom-Up Transformations
​
In my JavaScript days, I remember a particularly tricky area of code where we had a big list of data in a format defined by the server. We needed to take product listings, pull out specific options and inventory information, normalize them, and then apply filters from the UI to show/hide and sort search results.
​
There were deeply nested fields, and some incongruities in the shape of the data. Some values were nullable. Some had specific normalization we needed to apply to get data from multiple sources to match.
​
We had a lot of big unit tests to make sure things were working. Even so, it was so difficult to go in to our series of lodash function calls and find _where_ you needed to make a change. And once you did, you would want to make sure you added several new test cases to make sure you didn't miss a spot or mishandle a special case.
​
We would sit in awe as the person most familiar with the codebase correctly traversed the nested arrays and objects to get to the exact right place and make a change on the first try. It was a lot to hold in our heads, and it was quite error prone.
​
The challenge was that using that paradigm to normalize JSON data required thinking of the data as a monolith. We certainly abstracted out functions to help with parts of the normalization. And we used lodash to do functional style mapping over the arrays of data and key-value objects. But mapping over arrays and objects only gets you part of the way there. We still needed to keep a map in our heads of the structure of the data so we could go into a specific area, traverse it, and change it.
​
We weren't using TypeScript at the time, but even if we had been, the challenge would remain of having to navigate the structure from the top down in order to add a new transformation. Type-safety is a huge help, but it only gets you part of the way there to the benefits of localized reasoning.
​
These top-down transformations require you to think of the data as a Monolith. In contrast, with Combinators you work bottom-up and you can think locally about a sub-problem.
​
## What is a Combinator?
​
The term Combinator is used because you can _combine_ the smaller units to build up the whole. A Combinator is the idea of building something up by combining small "base" values into more complex ones.
​
It sounds complicated and hard to wrap your brain around, but once it clicks it feels natural. Much like thinking about recursion. "Define a function in terms of itself" sounds intimidating. Until you realize it's very declarative and readable to express things that way.
​
```elm
fibonacci n =
  if n <= 1 then
    n
  else
    fibonacci ( n - 1 ) + fibonacci ( n - 2 )
```
​
This recursive definition can be read as _what_ a fibonacci number is (declarative), instead of _how_ it is calculated (imperative). It's pretty close to how you would teach fibonacci to a human. It just so happens that computers can understand it, too!
​
Recursion is a good analogy for Combinators:
​
- A Combinator is declarative (not imperative)
- A Combinator is either defined in terms of other Combinators (analagous to a recursive self-invocation), or it is a "base" combinator (analagous to a recursive base case)
​
Let's look at an example of a Combinator in Elm. The `elm/json` package is how you turn untyped JSON data into typed Elm data (or an `Err` `Result` value if the structure doesn't match).
​
```elm
personDecoder : Decoder { name : String, birthday : Posix }
    Decode.map2
        (\name birthday -> { name = name, birthday = birthday })
        nameDecoder
        birthdayDecoder
```
​
What are `nameDecoder` and `birthdayDecoder`? Some kind of decoder. We're _combining_ them. Note that we can think about the decoders here at a high-level, and drop into the details as needed.
​
At some point, following our Decoder definitions we will find a Decoder that doesn't just compose Decoders, but directly resolves to a value (similar to our recursive "base case").
​
```elm
nameDecoder =
  Decode.field "full-name" Decode.string
```
​
`Decode.string` is going to resolve to some value. But we can compose Decoders together in more ways than just combining them or reading JSON values within a JSON property (like `"full-name"`).
​
Another key technique for a Combinator is that we can transform them.
​
```elm
birthdayDecoder : Decoder Time.Posix
birthdayDecoder =
  Decode.field "birthday-date-time" iso8601DateDecoder
```
​
If we follow the definitions, we finally end up with a direct "base" Decoder for `birthdayDecoder`.
​
```elm
iso8601DateDecoder : Decoder Time.Posix
iso8601DateDecoder =
    Decode.string
        |> Decode.andThen (\dateTimeString ->
        case iso8601StringToTime dateTimeString of
            Ok time -> Decode.succeed time
            Err error -> Decode.fail error
        )
```
​
This time, we are transforming the raw String into an Elm `Time.Posix` value.
​
This feels like magic at first, much like recursion does the first time you encounter it. But once you get used to it, it becomes quite natural to define things declaratively this way. And there are some huge benefits to this approach when it comes to narrowing the scope of what you need to pull into your head to understand a section of code or make a change. In other words, Combinators help localized reasoning.
​
## Inverting the Monolithic Top-Down Approach
​
In summary, top-down, imperative transforms tend to:
​
- Work their way down from the top first (rather than being able to start the change from the relevant sub-section)
- Happen in multiple passes
​
By using a Combinator, you can also avoid passing data through various transformation stages, and instead only ever have the data in the desired form. Since you are building up both the JSON Decoder and its type information at the same type, you are guaranteed to either
​
1. End up with well-typed data (happy path), or
2. End up with a clear error
​
This is a huge benefit for the Combinator pattern. This gives you explicit, clearly defined paths, with types fully describing the possibilites. Take a look at Alexis King's article [Parse, Don't Validate](https://lexi-lambda.github.io/blog/2019/11/05/parse-don-t-validate/) for some great insights about that.
​
## Combinators Beyond JSON Decoders
​
This pattern isn't specific to a language, like Elm, or a domain, like JSON.
​
You can use these same concepts in TypeScript with a library like [`io-ts`](https://github.com/gcanti/io-ts). And you can apply this thinking to a lot more problems than JSON. Some examples in the Elm ecosystem:
​
- [`elm/random`](https://package.elm-lang.org/packages/elm/random/latest/)
- [`elm/parser`](https://package.elm-lang.org/packages/elm/parser/latest/)
- Creating fuzzers (property-based test data) in [`elm/test`](https://package.elm-lang.org/packages/elm-explorations/test/latest/)
- [`elm-graphql`](https://github.com/dillonkearns/elm-graphql)
- [`elm-validate`](https://package.elm-lang.org/packages/rtfeldman/elm-validate/latest/)
​
## Next Post
​
Thanks for reading! In the next post, I will share lessons learned about this technique and how it made me realize why I loved one type-safe library I built, and am now rebuilding another to learn these lessons a few years later.