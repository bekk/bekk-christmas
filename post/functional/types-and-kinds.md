---
calendar: functional
post_year: 2020
post_day: 18
title: Types and Kinds
ingress: ""
description: ""
links: []
authors:
  - Jørgen Granseth
---
## Type systems

Type systems are cool. Or - some are cool, others can be a bit of a hassle, but they all strive to let your compiler check that your intentions (type annotations) match your implementation (actual code). So types are there to allow us to catch bugs even before our programs run. Pretty neat! The more advanced the type system, the more logic can be declared in types and the more bugs you can catch with the help of your trusty compiler beforehand. 

Now, type systems were not created equal, and there are limits to which guarantees your types can provide. Haskell is an example of a language with a very sophisticated type system, more or less derived from the mathematical field of category theory, which is closely related to formal logic. Unsurprisingly this allows for a bunch of fancy type magic that lets the compiler check a lot of complex logic on your programs.

You may have heard buzz words like "higher-kinded types" thrown around, so today we take a closer look at *kinds*.

## Concrete Types

At the base level of our programs we have values, and these values have types. `Int`, `String` and `Maybe [Bool]` are all concrete types, which means that values in your program can be these things. Everything else is abstractions over concrete types.

The definition of `Maybe` is essentially this:

```
data Maybe a = Just a | Nothing
```

The `a` here is a parametrically polymorphic type parameter. In languages like Java, a similar effect is achieved with generics. In languages like English, this means that `Maybe` needs another type to become a concrete type. You can't have a value that's just (*sic.*) `Maybe`: It's a *type constructor*, which is akin to a function in the domain of types: it takes a type and returns another type.

## Kinds

The *kind* of a type is an abstraction over its "shape" in terms of other types. Concrete types are the simplest types, and they have kind `*`, pronounced "type".

`Maybe` has kind `* -> *` because it takes a concrete type as an argument and gives you another concrete type. It follows that a type like `Either a b` has kind `* -> * -> *`; you get the idea.

### Higher-kinded types

An `Int` or `String` value is just that - a value. In a pure functional program there is no significant difference between a value and a function that takes no arguments, so we can think of values as functions that take no arguments and return a value. These are the simplest functions, let's assign them a complexity, or *order*, of 0.

A step up from values we have what are normally considered functions; a construct that takes one or more values and returns a value. They operate on values, so their complexity is higher; they are of order 1.

A higher-order function is a function with order > 1 (who'd-a thunk it!), so a function that operates on other functions. A higher-kinded type is a type that operates on other complex types, so that their complexity is greater than 1.

```
data StringContainerContainer c = { value :: c String }
```

Exactly what we were hoping for - a contrived example! Let's do a quick analysis of its kind: The `StringContainerContainer` clearly takes a polymorphic type argument, so it has to be a "type" to *something*. But that *something* is clearly not a concrete type since it has to take `String` as a type parameter. `String` has kind `*`, so `c` must have kind `* -> *`, and `StringContainerContainer` therefore has kind `(* -> *) -> *`. We have found a type that operates on a more complex type than concrete types, so it is a higher-kinded type!

Note how this is fundamentally different from the kind of `Either`. `Either` is not a higher-kinded type since it only operates on concrete types: `Either String` must have kind `* -> *`, so `* -> * -> *` is equivalent to `* -> (* -> *)` because the language also supports partial application in the type domain and the signatures are curried.

### Higher-kinded polymorphism

*Functors* exist in many languages - the essence is some context that you can *map* over, i.e. lift a function into the context in a sensible manner. A list is a straightforward example of a functor. In Haskell, functors are abstracted as a *type class*:

```
class Functor f where
	fmap :: (a -> b) -> f a -> f b
```

From the signature of `fmap` we see that it is polymorphic in another type `a`, but is itself polymorphic! This is a tricky concept to implement in a compiler because it requires an actual abstraction over generics rather than simply casting its usage compile-time and checking the resulting concrete types.

However it turns out that it is possible to achieve a lightweight higher-kindedness in languages whose type systems do not support them natively [(Yallop & White*, Lightweight higher-kinded polymorphism*, 2014)](https://www.cl.cam.ac.uk/~jdy22/papers/lightweight-higher-kinded-polymorphism.pdf). If you have half an hour to spare, I recommend [this talk on how the concept is implemented in *Arrow*](<https://www.youtube.com/watch?v=ERM0mBPNLHc>), the functional companion to Kotlin.