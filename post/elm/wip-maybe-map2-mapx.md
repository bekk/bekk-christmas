---
calendar: elm
post_year: 2020
post_day: 14
title: Combining Maybe's in Elm
ingress: Ever needed to combine different Maybe-values to produce another value?
  In this article, we explore just that.
authors:
  - Fredrik Løberg
---
Let us say that you are given the task to implement a function which combines two values to some other type if, and only if, both values are present.
For example, consider the following function:

```elm
type alias ContactPerson =
    { firstname: String
    , lastname: String
    }

toContactPerson : Maybe String -> Maybe String -> Maybe ContactPerson
toContactPerson firstname lastname =
    ...
```

This function is trivial to implement, at least if you are somewhat familiar with the `Maybe` type.
With standard pattern-matching, `toContactPerson` can be implemented like this:

```elm
toContactPerson : Maybe String -> Maybe String -> Maybe ContactPerson
toContactPerson maybeFirstname maybeLastname =
    case ( maybeFirstname, maybeLastname ) of
        ( Just firstname, Just lastname ) ->
            Just (ContactPerson firstname lastname)

        _ ->
            Nothing
```

This implementation is already somewhat strenuous to read. Now, imaging how it reads when we expand the `ContactPerson` with additional fields such as phoneNumber, email, address, etc. Not very pleasant!


Another, arguably much more readable, approach is to use the utility functions `Maybe.map2`, `Maybe.map3`, `Maybe.map4`, and so on.
While `Maybe.map` takes a function `a -> b` and a `Maybe a`, `Maybe.map2` takes a function `a -> b -> c` and two Maybe's, `Maybe a` and `Maybe b`.
The mapping function is applied if, and only if, both values are present. With `Maybe.map2`, our `toContactPerson` function can be improved to:


```elm
toContactPerson : Maybe String -> Maybe String -> Maybe ContactPerson
toContactPerson maybeFirstname maybeLastname =
    Maybe.map2 ContactPerson maybeFirstname maybeLastname
```

or if we exploit partial application:

```elm
toContactPerson : Maybe String -> Maybe String -> Maybe ContactPerson
toContactPerson =
    Maybe.map2 ContactPerson
```