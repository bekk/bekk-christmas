---
calendar: functional
post_year: 2020
post_day: 18
title: Types and Kinds
ingress: There are plenty of buzzwords when it comes to type systems. Today we
  take a closer look at the concepts related to *kinds*.
description: ""
links: []
authors:
  - Jørgen Granseth
---
## Types

Type systems are cool. Or - some are cool, others can be a bit of a hassle, but they all strive to let your compiler check that your intentions (type annotations) match your implementation (actual code). So types are there to allow us to catch bugs even before our programs run. Pretty neat! The more advanced the type system, the more logic can be declared in types and the more bugs you can catch with the help of your trusty compiler beforehand. 

Now, type systems were not created equal, and there are limits to which guarantees your types can provide. Haskell is an example of a language with a very sophisticated type system, more or less derived from the mathematical field of category theory, closely related to formal logic. Unsurprisingly this allows for a bunch of fancy type magic that lets the compiler check a lot of complex logic on your programs if you just nudge it in the right direction.


### Concrete Types

At the base level of our programs we have values, and these values have types. `Int`, `String` and `Maybe [Bool]` are all concrete types, which means that values in your program can be these things. Everything else is abstractions over concrete types.

The definition of `Maybe` is essentially this:

```haskell
data Maybe a = Just a | Nothing
```

The `a` here is a parametrically polymorphic type parameter. In a language like Java, a similar effect is achieved with generic types. In a language like English, this means that `Maybe` needs another type to become a concrete type. You can't have a value that's just (*sic.*) `Maybe`: It is a *type constructor*, which is akin to a function in the domain of types: it takes a type and gives you another type.

## Kinds

The kind of a type is an abstraction over its "shape" in terms of types. Concrete types are the simplest types, and they have kind `*`, pronounced "type".

`Maybe` has kind `* -> *` because it takes a concrete type as an argument and gives you another concrete type.

```haskell
data Either a b = Left a | Right b
```

It follows that a type like `Either` has kind `* -> * -> *`. You get the idea.

### Higher-kinded types

An `Int` or `String` is just a value. In a pure functional language there is no significant difference between a value and a function that takes no arguments, so we can think of values as functions that take no arguments and return a value. These are the simplest functions; they do not operate on any values, so we assign them an abstraction score - or *order* - of 0.

A step up from values we have what are normally considered functions; a construct that takes one or more values and returns a value. They operate on arguments and outputs that are values, so their level of abstraction is higher; they are of order 1.

A higher-order function is a function with order greater than 1 (who'd-a thunk it!) - in other words a function that operates on other functions.

In an analogous way, a higher-kinded type is a type that operates on other types so that their level of abstraction from concrete types is greater than 1.

```haskell
data StringContainerContainer c = AptlyNamedConstructor { value :: c String }
```

Exactly what we were looking for - a contrived example! Let's do a quick analysis of its kind: The `StringContainerContainer` clearly takes a polymorphic type argument, so it has to be a "type" to *something*; `* -> ?!`. But that *something* cannot be a concrete type since it has to take `String` as a type parameter. `String` has kind `*`, so `c` must have kind `* -> *`, and `StringContainerContainer` therefore has kind `(* -> *) -> *`. We have found a type that operates on a more complex type than concrete types, so it is a higher-kinded type!

Note how this is fundamentally different from the kind of `Either`. `Either` is not a higher-kinded type since it only operates on concrete types: Haskell supports partial application in the type domain and the kind signatures are curried in the same way as their type counterparts. It follows that a partially applied `Either String` must have kind `* -> *`, so `* -> * -> *` is equivalent to `* -> (* -> *)`.

### Higher-kinded polymorphism

Functors exist in many languages. The essence of a functor is some context that you can *map* over, i.e. lift a function into the context and apply it in a sensible manner. A list is a straightforward example of a functor. In Haskell, they are abstracted as a type class:

```haskell
class Functor f where
	fmap :: (a -> b) -> f a -> f b
```

In the signature of `fmap` we see that the polymorphic type parameter `f` is simultaneously polymorphic in another type. The payoff is that we can supply a rich ecosystem of functionality based on these class operators that allow code reuse for *any* functor (or other type class) while keeping the guarantees of static typing.

Most languages do not support higher-kinded polymorphism. However, it turns out that it is possible to achieve a lightweight higher-kindedness in languages whose type systems only support first-order kinds through a process called type defunctionalisation (Yallop & White, [*Lightweight higher-kinded polymorphism*](https://www.cl.cam.ac.uk/~jdy22/papers/lightweight-higher-kinded-polymorphism.pdf), 2014). If you have half an hour to spare, I recommend [this talk on how the concept is realised in Kotlin's functional abstraction library, *Arrow*](<https://www.youtube.com/watch?v=ERM0mBPNLHc>).