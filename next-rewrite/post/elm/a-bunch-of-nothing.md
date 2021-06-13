---
calendar: elm
post_year: 2020
post_day: 16
title: A Bunch of Nothing
image: https://unsplash.com/photos/BkigsnKJK34
ingress: >
  One of the great advantages of Elm is its strong runtime guarantees, and one
  important technique

  it uses to achieve this is using data types such as `Maybe` and `Result` to handle errors,

  instead of having values like `null` or `undefined` in the language.

  These structures are very nice to work with, but if you don't know the tools

  at your disposal, they can be tricky.
links:
  - url: https://package.elm-lang.org/packages/elm/core/latest/List#filterMap
    title: "See the documentation on `List.filterMap`:"
  - title: "More functions from on `Maybe` from `Maybe.Extra`:"
    url: https://package.elm-lang.org/packages/elm-community/maybe-extra/latest/
authors:
  - Gaute Berge
---
Suppose you have some data such as:
```elm
data : List String
data = ["1", "17", "a87", "34", "3b7"]
```
This was supposed to be a list of integers, but for whatever reason whoever provided you with this data
also left in a bunch of garbage like `"a87"`. You're only interested in the strings that are valid integers,
and you also want to work with them as integers, not strings. Let's start writing our `convert` function.

We can convert strings to integers with the function
```elm
String.toInt : String -> Maybe Int
```
and we can use our old friend `List.map` to apply the conversion to all the elements in the list:
```elm
List.map String.toInt data
-- [Just 1, Just 17, Nothing, Just 34, Nothing]
```

Now we have our integers, wrapped in `Just`, so all we have to do now is to remove the values that are `Nothing`.

"I know this one! That's `List.filter`, right?", you might have said prior to learning the lesson that
I am getting to in this post. Let's try.

```elm
List.filter isJust (List.map String.toInt data)
```

There are two problems with this solution:

First of all, `isJust` is not provided by the core library.
We could get it from `elm-community/maybe-extra`, or we could save ourselves a dependency
and just define it ourselves:
```elm
isJust maybe = 
    case maybe of
        Just _ -> True
        Nothing -> False
```

Now we can see if it works:
```elm
List.filter isJust (List.map String.toInt data)
-- [Just 1, Just 17, Just 34]
```

We got rid of the bad entries, but we have another problem.
All our values are still wrapped up in `Just`!
Each time you would want to use these values, you would have to handle the case of it being `Nothing`,
even though we just made sure all the `Nothing`-values are gone.
We have now introduced an impossible state 💀.
What we really want is a function with the type 
```elm
convert : List String -> List Int
```
as opposed to what we had, which was:
```elm
convert : List String -> List (Maybe Int)
```

Fortunately the solution is very simple!
The core library provides the function which does exactly this:
```elm
List.filterMap : (a -> Maybe b) -> List a -> List b
```
`List.filterMap` takes a function that produces a `Maybe`, and applies that functions to all the elements of a list
while unpacking the `Just`-values, and removing the `Nothing`-values.

Our final convert function can then be defined simply as:
```elm
convert = List.filterMap String.toInt

convert data
-- [1, 17, 34]
```

## Conclusion
Error handling in Elm is easy as long as you you have the right functions in your tool belt.
With `List.filterMap` and a few more you will be able to handle anything 🎉
