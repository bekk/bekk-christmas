---
calendar: functional
post_year: 2020
post_day: 16
title: Typeclasses in Haskell (and Elm?!)
authors:
  - Øyvind Stette Haarberg
---
# Typeclasses

Typeclasses are a way to allow functions to take constraints on the type of arguments, allowing for ad hoc polymorphic functions (we say ad hoc as the function for the concrete type is provided when invoked).
They were originally introduced as a way to overload arithmetic and equality operators in Haskell, but they have many other uses as well.
Interfaces are a similar concept in object-oriented languages.

You can use the `+` function to add both integers and floats, so the type of + clearly can't be `Int -> Int -> Int` or `Float -> Float -> Float`. We can't insert arbitrary types (`[3] + [4]` is an error for instance, by trying to add two lists), so the type of `+` must be more restrictive than `a -> a -> a`. The type of `+` is actually

```haskell
(+) :: Num a => a -> a -> a
```

where `Num a =>` denotes a typeclass constraint on the type a, requiring to be an instance of the Num typeclass.

The powerful part of defining functions on constrained types is that it is extensible, and we can implement a typeclass if we want to be able to use these functions for our custom types. Let's say we are modeling an analog clock in our program, and we have a type for time:

```haskell
data AnalogTime = Time Int Int -- hours and minutes
```

we can then provide an instance for the `Eq` typeclass (the name `Eq` derives from _equality_), which allows us to compare types using `(==)` for equal and `(/=)` for not equal:

```haskell
instance Eq AnalogTime where
    (Time hoursA minutesA) == (Time hoursB minutesB) = hoursA == hoursB && minutesA == minutesB
```

Note that by just implementing `(==)`, we can also use the `(/=)` operator for AnalogTime values.
Now that AnalogTime has an instance for the `Eq` typeclass, we
can also provide an instance for the `Ord` typeclass. The `Ord` typeclass has functions for types with an _ordering_, or in other words types that can be compared with for example `>` or `<`. This is because all `Ord` instances are required to have an `Eq`instance, as we can see from the definition:

```haskell
class Eq a => Ord a where
    (<=) :: a -> a -> Bool
    -- other functions omitted
```

## The "freebies" of typeclasses

As we saw with the `Eq`instance we didn't have to provide all functions for the functions of the typeclass. This benefit might not seem to be significant when looking at `Eq`, but for other typeclasses like `Foldable` you get a whole load of functions already defined if you implement a sufficient part of the typeclass functions.

If we look at the info for the `Ord` typeclass we can see that the minimal definition is providing `(<=)`. Just by providing a function for comparing lesser than or equal, we gain the other comparisons, as well as the `max` and `min` functions for free.

## A world without custom typeclasses

In Haskell we can define custom typeclasses, and also provide instances for any custom type as a typeclass.
In the Elm programming language we cannot define custom typeclasses, and you are also unable to provide instances for the existing typeclasses. There are some typeclasses in Elm, such as `number`, `comparable` and `appendable`, which allow for functions such as `(+)`, `(>=)` and `(++)` to take in a variety of built-in types. If you want to write functions that can work for several different types as long as they have some function defined, the functions you need have to be an explicit part of the function's type.

```elm
type Ordering = LT | EQ | GT

listSort : (a -> a -> Ordering) -> List a -> List b
```

The Elm definition looks similar to a Haskell definition using typeclasses:

```haskell
listSort :: Ord a => [a] -> [a]
```

This way you don't have the added abstraction of providing a mapping to some other type. It is easier to use the `Ord` typeclass still, as you have more functions out of the box such as `min` that can be used.

A difference between the Haskell and Elm examples is that for Haskell the correct function for comparing the elements will be sourced by the `Ord` instance for a (whichever type a turns out to be), but for the Elm examples you have to provide the correct instance when calling the function.

The need to know the types is easier to see if you look at the `map`-functions in the Elm standard library. Instead of having a single map-function for some typeclass, Elm provides different mapping functions for the standard containers (such as `List.map`, `Set.map`, `Maybe.map` and so on). This way you don't need typeclasses for foldables, but there is no way to map over some structure in Elm without also knowing _what_ that structure is. This is a tighter coupling to the types used. If the underlying type changes in your model, say from a `List` to a `Set`, then any functions simply mapping over the elements now have to provide the appropriate mapping function.

## Custom typeclasses in Elm?

In some ways you are able to do a similar thing to typeclasses in Elm by passing around records containing the necessary definitions for a typeclass:

```elm
-- Elm custom typeclass
type alias Ord a =
    { lessThan : a -> a -> Bool
    , greaterThan : a -> a -> Bool
    , equal : a -> a -> Bool
    }
```

And we can now use this to again define our list sort:

```elm
listSort : Ord a -> List a -> List a
```

Not too far off from our Haskell `listSort`!

You still can't extend the built-in typeclasses and the typeclass functions aren't provided implicitly, but you can write functions using a constrained type as you know that the caller has to provide the instance for your typeclass.

One thing that breaks with this approach is typeclasses for higher-kinded polymorphism. Trying to use a record to implement a similar set of functions as `Foldable` in Haskell (the typeclass of types that can be "folded over", a more general version of `reduce` for instance) illustrates this issue.

It is sufficient to only define `foldr` for a `Foldable` instance, similar to `(<=)` for `Ord`.

```haskell
foldr :: Foldable t => (a -> b -> b) -> b -> t a -> b
```

We can see from the definition of `foldr` that we have a type `t` that operates in a similar way to `List` (as an example) where the type isn't just `List` but `List` of `a`.
If we try the same approach as for `Ord` we get a syntax error on the `t a` part of the function definition, as this is not supported in Elm.

If you want to try typeclasses like these in Elm there is a [package](https://package.elm-lang.org/packages/nikita-volkov/typeclasses/latest/) with several custom typeclasses implemented, by the way of using type aliases for records.
