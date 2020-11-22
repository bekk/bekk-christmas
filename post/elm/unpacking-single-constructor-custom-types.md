---
calendar: elm
post_year: 2020
post_day: 3
title: Unpacking single-constructor custom types
authors:
  - Aksel Wester
---
One of the great things about Elm, is the ability to easily and accurately model your data with the use of custom types. Custom types are usually use when a type can have multiple shapes, or represent multiple state. For instance, you can create a custom type to represent the state of a user in your webapp, like this:

```elm
type UserState
    = NotLoggedIn
    | LoggedIn UserData
```

In this example, a user is either not logged in, in which case we don't have any data about the user, or the user is logged in, and we have some user data. We call the two "variants" of the custom type (`NotLoggedIn` and `LoggedIn`) the custom type's _constructors_. Since the are in fact functions that return a value of type `UserState`.

## Single-constructor custom types

Even though custom types in Elm usually have at least two constructors, you _can_ actually create custom types in Elm with only one constructor. This might seem pointless the first time you hear about it, but it can actually quite useful in certain situations.

Consider, for instance, that you have function for calculating [BMI](https://en.wikipedia.org/wiki/Body_mass_index) in your app. A person's BMI depends on their weight and height, and can be written like this in Elm (using kilos for weight and meters for height):

```elm
bodyMassIndex : Float -> Float -> Float
bodyMassIndex weight height =
    weight / (height * height)    
```

Now, while this function works correctly, it's not exactly a pleasant experience to use. Consider the following code:

```elm
viewBmi : Model -> Html a
viewBmu model ->
    text (bodyMassIndex model.height model.weight)
```

Did you spot the error? No? Well, neither would the Elm compiler. The error is that our `bodyMassIndex` function expects the _first_ argument to be `weight`, but we passed `height`  as the first argument. While the person using our `bodyMassIndex` function would probably notice their error quite fast, it would is still unnecessary that we allow for the error to be made. This is an example of where we could use single-constructor custom types.

We can start by 