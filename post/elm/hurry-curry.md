---
calendar: elm
post_year: 2020
post_day: 9
title: Hurry, curry!
image: https://images.unsplash.com/photo-1565280654386-36c3ea205191?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80
ingress: Today we're going to take a closer look at an interesting property of
  Elm called currying. We will only explain the principle today, then spend the
  next two days seeing how it can be useful in practise.
links:
  - title: Wikipedia article on currying
    url: https://en.wikipedia.org/wiki/Currying
authors:
  - Robin Heggelund Hansen
---
Have you ever wondered why function type signatures look the way they do? Sure, it starts simple enough:

```elm
aboveZero : Int -> Bool
```

\`aboveZero\` is a function which takes an \`Int\` and returns a \`Bool\`. Simple enough. Now look at this function:

```elm
isBetween : Int -> Int -> Int -> Bool
```

Most people would change the way they read this compared the the easier definition we saw earlier. Many will say that \`isBetween\` is a function which takes three \`Int\`s and returns a \`Bool\`. Why are we forced to write all those arrows, though? Especially considering arrows seemingly works both as a input seperator \_and\_ as a seperator between inputs and inputs.

Actually, arrows \_only\_ seperates one input value and a return value. The type signature for \`isBetween\` should be read as 'a function that takes an \`Int\` \_and returns a function\_ that takes an \`Int\` and returns a function that takes an \`Int\` and returns \`Bool\`'.

There really is no such thing as a function taking multiple arguments. All functions take exactly one argument, and returns something else. That something else might be another function. That also means that when calling a function that seemingly takes multiple arguments, it's not only \_valid\_ to call it in the following way, it's also conceptually what happens:

```elm
(((isBetween 1) 2) 3)
```

This property of functions ever only taking one argument is known as currying, and is a pretty defining feature in languages like Elm and Haskell. But when is it ever useful? That's what we'll explore in the coming days.