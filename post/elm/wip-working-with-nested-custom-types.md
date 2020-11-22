---
calendar: elm
post_year: 2020
post_day: 6
title: "WIP: Working with nested custom types"
image: https://pixabay.com/no/photos/treet-tree-top-grenen-nakne-grenen-3044200/
ingress: Custom types are powerful data structures that might feel somewhat
  complicated to work with, at least if they are nested. Well, they aren't! In
  this article we take a look at how to work with nested custom types. 🍊
authors:
  - Ragnhild Aalvik
---
Custom types in Elm are used when defining our own data types that can have different possible *variants*. We can think of this data structure as a tree, with each branch representing one variant of the data type. Each variant, or branch, can itself contain a new custom type, resulting in a recursive tree structure. We call this a nested custom type. But how can we handle these types?

Let's look at an example. Say we have a, very simplified, custom type `Fruit`:

```elm
type Fruit 
	= Apple 
	| Pear
	| Citrus CitrusFruit

type CitrusFruit
	= Orange
	| Lemon
	| Lime
```

The `Fruit` type contains different variants of a fruit, with one of them being `Citrus`. `Citrus` itself contains another custom type, namely `CitrusFruit`, which can be either `Orange`, `Lemon`, or `Lime`. This makes `Fruit` an example of a nested custom type.

What if we want to write a function that returns a png-image of a given fruit? Then we would have to destructure the fruit using a `case..of` expression. This could be done like this:

```elm
image : Fruit -> String
image fruit =
    case fruit of
        Fruit Apple ->
            "apple.png"
        Fruit Pear ->
            "pear.png"
        Fruit (Citrus citrus) ->
            case citrus of
                Orange ->
                    "orange.png"
                Lemon ->
                    "lemon.png"
                Lime ->
                    "lime.png"
```

As you can see, this way of unwrapping the `Fruit` requires two `case..of` expressions. The resulting code is not very readable and can, in fact, be written in a much simpler way! We can simply destructure the whole `Fruit` in one `case..of` expression like this:

```elm
imageImproved : Fruit -> String
imageImproved fruit = 
    case fruit of 
        Fruit Apple -> 
            "apple.png"
        Fruit Pear -> 
            "pear.png"
        Fruit (Citrus Orange) -> 
            "orange.png"
        Fruit (Citrus Lemon) ->
            "lemon.png"
        Fruit (Citrus Lime) ->
            "lime.png"
```

See how much easier this function is to scan? 🧐 This little "trick" is something people new to Elm often don't know about, which is a pity as it makes the code both easier to write and more readable. A win-win!