---
calendar: elm
post_year: 2020
post_day: 9
title: Hurry, curry!
image: https://images.unsplash.com/photo-1565280654386-36c3ea205191?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80
ingress: Today we'll look at an interesting property of Elm known as currying.
  We will only explain the principle today, then spend the next two days seeing
  how it can be useful in practise.
description: Elm currying
links:
  - title: Wikipedia article on currying
    url: https://en.wikipedia.org/wiki/Currying
authors:
  - Robin Heggelund Hansen
---
Have you ever wondered why type signatures look the way they do? They seem intuitive for simple functions such as this:

```elm
aboveZero : Int -> Bool
```

Here we can see that `aboveZero` is a function which takes an `Int` and returns a `Bool`. Seems straightforward. Now look at this function:

```elm
isBetween : Int -> Int -> Int -> Bool
```

Many will read this type signature in a different way compared the the easier definition we saw earlier. They might say that `isBetween` is a function which takes three `Int`s and returns a `Bool`. But if that's the case, why are we forced to write all those arrows? Especially considering arrows seemingly work both as a input separator _and_ as a separator between inputs and outputs.

Actually, arrows _only_ seperate one input value and a return value. The type signature for `isBetween` should be read as 'a function that takes an `Int` _and returns a function_ that takes an `Int` and returns a function that takes an `Int` and returns `Bool`'. This is the same type signature, but written differently:

```elm
isBetween : Int -> (Int -> (Int -> Bool))
```

For esthetic reasons, Elm allow us to write the type signature without the parentheses.

The key thing to learn from this is that there is no such thing as a function taking multiple arguments. All functions take _exactly_ one argument, and returns something else. That something else might be another function. This also means that when calling a function with more than one argument, it's not only _valid_ to call it in the following way, it's also what conceptually happens:

```elm
(((isBetween 1) 2) 3)
```

This property of functions only taking one argument is known as currying, and is a defining feature of languages like Elm and Haskell. But why should you care about this? When is this knowledge ever useful?

That's what we'll explore in the coming days.