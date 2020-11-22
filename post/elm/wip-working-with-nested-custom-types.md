---
calendar: elm
post_year: 2020
post_day: 6
title: "WIP: Working with nested custom types"
image: https://unsplash.com/photos/_wDRxQA0T-A
ingress: Custom types are powerful data structures that might feel somewhat
  complicated to work with. Well, they aren't! Once you learn the tricks you
  will realise how elegantly they can be manipulated. 🤫
authors:
  - Ragnhild Aalvik
---
Custom types in Elm are used for defining our own data types that can have different possible *variants*. This data structure can be viewed as a tree, with each branch representing one variant of the data type. Each variant, or branch, can itself contain a new custom type, resulting in a recursive tree structure. We call this a nested custom type. 

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

The `Fruit` type contains different variants of a fruit, one of them being `Citrus`. `Citrus` itself contains another custom type, namely `CitrusFruit`, which can be either `Orange`, `Lemon`, or `Lime`. 

What if we want to write a function that returns a png-image of a given fruit? Then we would have to unwrap the fruit using a `case..of` expression. This could be done like this:

```elm
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

Destructuring a nested custom type like this is both unnecessary and ineffective. In fact, this case-expression can be significantly simplified by just pattern matching on the different variants of `Citrus` in the outer case-expression like this:

```elm
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

See now how this function is much easier to scan, as all the different cases are at the same level? Knowing this little "trick" will both make your code more readable, and you will feel like you're telling a secret the next time you show this to someone else. At least, that's how I feel 😉