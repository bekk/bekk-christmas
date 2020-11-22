---
calendar: elm
post_year: 2020
post_day: 3
title: Unpacking single-constructor custom types
authors:
  - Aksel Wester
---
One of the great things about Elm, is the ability to easily and accurately model your data with the use of custom types. Custom types are normally used when a type can have multiple shapes, or represent multiple state. For instance, you can create a custom type to represent the state of a user in your webapp, like this:

```elm
type UserState
    = NotLoggedIn
    | LoggedIn UserData
```

In this example, a user is either not logged in, in which case we don't have any data about the user, or the user _is_ logged in, and we have some user data. We call the two "variants" of the custom type (`NotLoggedIn` and `LoggedIn`) the custom type's _constructors_. Since they are, in fact, functions that return a value of type `UserState`.

## Single-constructor Custom Types

Even though custom types in Elm usually have at least two constructors, you can actually create custom types in Elm with only one constructor. This might seem pointless the first time you hear about it, but it can actually be quite useful in certain situations. We will examine one use for these single-constructor custom types in this post, while we will look at another, probably more widely used use for them in a post later in December.

In our use case, we will consider the situation where we have a function for calculating [body mass index (BMI)](https://en.wikipedia.org/wiki/Body_mass_index) in our app. A person's BMI depends on their weight and height, and can be written like this in Elm (using kilos for weight and meters for height):

```elm
bodyMassIndex : Float -> Float -> Float
bodyMassIndex weight height =
    weight / (height * height)    
```

Now, while this function works correctly, it's not exactly a pleasant experience to use. Consider, for example, the following code, where we use the `bodyMassIndex` function:

```elm
viewBmi : Model -> Html a
viewBmu model ->
    text (bodyMassIndex model.height model.weight)
```

Did you spot the error? No? Well, neither would the Elm compiler. The error is that our `bodyMassIndex` function expects the _first_ argument to be `weight`, but we passed _`height`_  as the first argument. While the person using our `bodyMassIndex` function would probably notice their error quite fast, it is still unnecessary that we allow for the error to be made. This is an example of where we could use single-constructor custom types.

We can start by making two single-constructor custom types:

```elm
type Weight
    = Weight Float

type Height
    = Height Float
```

Both constructors of the custom types have the same name as the name of the custom type, which is normal to do with single-constructor custom types.
Next, let's say we change our `bodyMassIndex` function to have the following signature:

```elm
bodyMassIndex : Weight -> Height -> Float
```

Now we can use the new version of `bodyMassIndex` in the view:

```elm
viewBmi : Model -> Html a
viewBmu model ->
    text (bodyMassIndex (Height model.height) (Weight model.weight))
```

If we did this, we would get a compilation error, saying that `bodyMassIndex` expects it's first argument to be a `Weight`, not a `Height`, which is what we wanted to achieve!

The price of this refactor, however, is the added complexity to our `bodyMassIndex` function, since the most basic implementation of the new type signature would be something like the following:

```elm
bodyMassIndex : Weight -> Height -> Float
bodyMassIndex weight height =
    case weight of
        Weight weightFloat ->
            case height of
                Height heightFloat
                    weightFloat / (heightFloat * heightFloat)
```

At this point, you are probably thinking that this isn't worth it. Because that is one _ugly_ function. But don't worry, Elm has a neat trick for making this function _almost_ as simple as the first version, which had only `Float`s as arguments.

Similarly to the technique described in [yesterday's post](https://elm.christmas/2020/1), where Jørgen showed that we can pattern match on fields in a record _in the argument definition_ of a function, we can also do this with single-constructor custom types. The name of the constructor and the variable name you want to use is written inside parenthesis in the function definition, which makes the function almost identical to the first version of the function:

```elm
bodyMassIndex : Weight -> Height -> Float
bodyMassIndex (Weight weight) (Height height) =
    weight / (height * height)
```

The overhead of making a refactor like this is now almost nothing, and can, in certain situations give your code guarantees that it otherwise wouldn't have.

Worth noting is that this pattern mathing only works with single-constructor custom types, not custom types with multiple constructors. And, as mentioned above, we will see another use for this technique of using single-constructor custom types, later in December.
