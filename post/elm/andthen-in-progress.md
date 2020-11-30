---
calendar: elm
post_year: 2020
post_day: 15
title: Reducing boilerplate code in Elm with Maybe.andThen
ingress: Working with the `Maybe` type in Elm may result in excessive pattern
  matching because Elm forces us to handle all possible outcomes. In this
  article, we investigate how the `Maybe.andThen` function can be used to
  improve readability by reducing unnecessary pattern matching and boilerplate
  code.
description: ""
links:
  - url: https://package.elm-lang.org/packages/elm/core/latest/Maybe#andThen
    title: andThen documentation
authors:
  - Simen Fonnes
---
Consider that we want to implement a function that takes a `String` name which consists of several names and returns the last name if it exists. The signature can look something like this:

```elm
toLastName : Maybe String -> Maybe String
```
We implement the `toLastName` function by splitting the `String` on space, reversing the list, and finally collecting the first element in the reversed list. Using `Maybe.map`, we can do it like this:

```elm
toLastName : Maybe String -> Maybe String
toLastName name =
    name
        |> Maybe.map (String.split " ")
        |> Maybe.map List.reverse
        |> Maybe.map List.head
        |> Maybe.withDefault Nothing
```

As you can see, we end up with `Maybe (Maybe String)` after `List.head` operation, because `head` operation returns a `Maybe String`. Therefore, we have to use a `Maybe.withDefault`, in order to extract the inner `Maybe`. To remove this line of unnecessary code, we can use the `andThen` function:

```elm
andThen : (a -> Maybe b) -> Maybe a -> Maybe b
andThen callback maybe =
    case maybe of
        Just value ->
            callback value

        Nothing ->
            Nothing
```
[andThen implementation](https://package.elm-lang.org/packages/elm/core/latest/Maybe#andThen)

`andThen` is a function very similar to `map`, but the mapping function is of type `a -> Maybe b` rather than `a -> b`. The idea here is that the transformation function we supply as parameter one is only applied if parameter two is present (i.e., a `Just`). `andThen` returns the return type in the transformation function, but if `Maybe a` is `Nothing`, `andThen` returns `Nothing` and thus proceeds to the next chain in the pipeline. Essentially, this means that you don’t have to pattern match the `Maybe` you are working with, which reduces boilerplate code.

By using `andThen` function, we can remove the excessive line in the previous implementation:

```elm
toLastName : Maybe String -> Maybe String
toLastName name =
    name
        |> Maybe.map (String.split " ")
        |> Maybe.map List.reverse
        |> Maybe.andThen List.head
```

As we have seen so far in this article, `andThen` is suitable for transformations that may fail, in contrary to `map`. `map` is fit for transformations that cannot fail. As such, we can also use `andThen` as a filter. By forcing the transformation to fail, by returning `Nothing`, when the value does not satisfy some condition, we have created a filter. 

Let’s say that we reimplement the same `toLastName` function, but this time we want to return `Nothing` if the last last name is less than seven characters. Using `map`, we can implement it like this:

```elm
toLastName : Maybe String -> Maybe String
toLastName name =
    name
        |> Maybe.map (String.split " ")
        |> Maybe.map List.reverse
        |> Maybe.andThen List.head
        |> Maybe.map
            (\lastName ->
                if String.length lastName >= 7 then
                    Just lastName

                else
                    Nothing
            )
        |> Maybe.withDefault Nothing
```

In this example, we also end up with a `Maybe String` and thus need an additional `withDefault` expression. If we, on the other hand, make use of `andThen`, we remove this line:

```elm
toLastName : Maybe String -> Maybe String
toLastName name =
    name
        |> Maybe.map (String.split " ")
        |> Maybe.map List.reverse
        |> Maybe.andThen List.head
        |> Maybe.andThen
            (\lastName ->
                if String.length lastName >= 7 then
                    Just lastName

                else
                    Nothing
            )
```