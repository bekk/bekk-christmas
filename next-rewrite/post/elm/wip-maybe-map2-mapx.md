---
calendar: elm
post_year: 2020
post_day: 14
title: Combining Maybes in Elm
ingress: Have you ever needed to combine different Maybe-values to produce
  another value? In this article, we explore just that.
links:
  - url: https://package.elm-lang.org/packages/elm/core/latest/Maybe#map2
    title: Maybe.map2
  - url: https://package.elm-lang.org/packages/elm-community/maybe-extra/latest/Maybe-Extra
    title: Maybe.Extra
authors:
  - Fredrik Løberg
---
Let us say that we are given the task to implement a function that combines two values to some other type if, and only if, both values are present.
For example, consider the following `toContactPerson` function:

```elm
type alias ContactPerson =
    { firstName: String
    , lastName: String
    }

toContactPerson : Maybe String -> Maybe String -> Maybe ContactPerson
toContactPerson firstName lastName =
    ...
```

This function is trivial to implement, at least if you are somewhat familiar with the `Maybe` type.
With standard pattern-matching, `toContactPerson` can be implemented like this:

```elm
toContactPerson : Maybe String -> Maybe String -> Maybe ContactPerson
toContactPerson maybeFirstName maybeLastName =
    case ( maybeFirstName, maybeLastName ) of
        ( Just firstName, Just lastName ) ->
            Just (ContactPerson firstName lastName)

        _ ->
            Nothing
```

Simple enough, but you may have already noticed that this implementation is somewhat strenuous to read. Now, imagine how it would read if we expanded the `ContactPerson` record with additional fields such as address, phone number, email, etc. Not very pleasant!


Another, arguably much more readable, approach is to use the utility functions `Maybe.map2`, `Maybe.map3`, `Maybe.map4`, and so on.
While [`Maybe.map`](https://package.elm-lang.org/packages/elm/core/latest/Maybe#map) takes a function `a -> b` and a `Maybe a`, [`Maybe.map2`](https://package.elm-lang.org/packages/elm/core/latest/Maybe#map2) takes a function `a -> b -> c` and two Maybes, `Maybe a` and `Maybe b`.
The mapping function is applied if, and only if, both values are present. With `Maybe.map2`, our `toContactPerson` function can be improved to:


```elm
toContactPerson : Maybe String -> Maybe String -> Maybe ContactPerson
toContactPerson maybeFirstName maybeLastName =
    Maybe.map2 ContactPerson maybeFirstName maybeLastName
```

or if we exploit partial application:

```elm
toContactPerson : Maybe String -> Maybe String -> Maybe ContactPerson
toContactPerson =
    Maybe.map2 ContactPerson
```


Expanding `ContactPerson` further with more properties is also trivial:

```elm
toContactPerson : Maybe String -> Maybe String -> Maybe String -> Maybe ContactPerson
toContactPerson =
    Maybe.map3 ContactPerson

toContactPerson : Maybe String -> Maybe String -> Maybe String -> Maybe String -> Maybe ContactPerson
toContactPerson =
    Maybe.map4 ContactPerson

toContactPerson : Maybe String -> Maybe String -> Maybe String -> Maybe String -> Maybe String -> Maybe ContactPerson
toContactPerson =
    Maybe.map5 ContactPerson
```

Notice that there is no `Maybe.map6` or above in the standard library of Elm. Consequently, if we shall ever need them, we have to get them elsewhere. We can either implement them ourselves or just use the `Maybe.mapN`-capabilities of the [`Maybe.Extra`-library](https://package.elm-lang.org/packages/elm-community/maybe-extra/latest/Maybe-Extra#andMap). Although, the need for `Maybe.map6` and above can often be avoided by handling the Maybes at an earlier stage. If we, for example, are dealing with a form with multiple steps, we may be able to extract some of the values from their Maybe-wrapper before continuing to the next step in the form. At least the required fields, that is. In other words, it is often a good idea to check if the Maybes can be handled at an earlier stage before reaching for these functions.