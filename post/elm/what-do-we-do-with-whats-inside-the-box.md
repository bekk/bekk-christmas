---
calendar: elm
post_year: 2020
post_day: 13
title: What do we do with what's inside the box?
image: https://images.unsplash.com/photo-1513201099705-a9746e1e201f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2167&q=80
ingress: Elm doesn't have nulls or undefineds. What it does have is the Maybe
  type and while it's a pleasent type to work with, it might take some getting
  used to if you're coming from a language like Java or Python. Let's take a
  look at how we perform some basic operations over the Maybe type.
links:
  - url: https://package.elm-lang.org/packages/elm/core/latest/Maybe
    title: Documentation of the Maybe type
authors:
  - Robin Heggelund Hansen
---
Imagine we're creating game and we're adding a feature that will display the player's high score at the end of a run. If this is the first time the game is being played, there will be no high score recorded. It seems reasonable then to use `Maybe Int` to represent a high score.

To display this on screen, we would first have to convert the value to a string and then wrap it within an html element. That could all be done like this:

```elm
viewHighScore : Maybe Int -> Html a
viewHighScore highscore =
  case highscore of
    Just score ->
      Html.text (String.fromInt score)
      
    Nothing ->
      Html.text ""
```

This works, but it could be improved. By making use of two functions known as `Maybe.map` and `Maybe.withDefault` we could get rid of the pattern matching, and thereby increase the signal-to-noise ratio of the code.

`Maybe.map` works by applying a function to a maybe if, and only if, it contains a value. If the `Maybe` is `Nothing`, then the result of `Maybe.map` is also `Nothing`. So if you want to convert a `Maybe Int` to a `Maybe String` you could do this:

```elm
{-|
  If passed (Just 5), it will return (Just "5")
  If passed Nothing, it will return Nothing
-}
toMaybeString : Maybe Int -> Maybe String
toMaybeString maybe =
  Maybe.map String.fromInt maybe
```

So far, so good. We can use this to re-write or original function:

```elm
viewHighScore : Maybe Int -> Html a
viewHighScore highscore =
  case Maybe.map String.fromInt highscore of
    Just score ->
      Html.text score
      
    Nothing ->
      Html.text ""
```

This might not seem much better than what we started with. Some of you might even consider this to be worse. The good news is that we can make use of another function to get rid of the pattern match all together, which is `Maybe.withDefault`.

`Maybe.withDefault` takes in a concrete value and a `Maybe`. If the `Maybe` type contains a value, that value is returned. If, however, the `Maybe` is `Nothing`, then the concrete value will be returned.

```elm
Maybe.withDefault 1 Nothing == 1
Maybe.withDefault 1 (Just 5) == 5
```

By using `Maybe.map` in combination with `Maybe.withDefault` and some pipe operators, we can simplify our original function further:

```elm
viewHighScore : Maybe Int -> Html a
viewHighScore highscore =
  highscore
    |> Maybe.map String.fromInt
    |> Maybe.withDefault ""
    |> Html.text
```

Compare this to our original attempt. What have we gained?

I'd argue that it's more clear what this function does now. You can see at the bottom line of the function that no matter what happens in the lines above, we're going to return a value wrapped in `Html.text`.

It's also clear that if we have a high score, we're going to convert it to a `String` and if we don't have a high score, we'll simply return the empty `String`. You can of course see this in our first attempt too, but only after you've mentally parsed each branch of the `case of` statement.

This was just a simple example. More complex uses of `Maybe` will benefit more from use of `Maybe.map` and `Maybe.andThen`.

## In summary

Pattern matching on `Maybe` is powerful and flexible, but might not result in code that is easy to understand. Making use of specialised functions and piping them together can lead to less code that is also more intuitive.