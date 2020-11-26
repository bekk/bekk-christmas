---
calendar: elm
post_year: 2020
post_day: 6
title: Climbing trees
image: https://cdn.pixabay.com/photo/2017/12/28/01/02/tree-3044200_960_720.jpg
ingress: Custom types are powerful data structures that might seem somewhat
  complicated to work with, at least if they are nested. Let's take a look at
  how we can deal with nested custom types in a simple way! 🍊
authors:
  - Ragnhild Aalvik
---
Custom types in Elm are used when defining data types that can have different possible *variants*. We can think of this data structure as a tree, with each branch representing one variant of the data type. Each variant, or branch, can itself contain a new custom type, resulting in a nested tree structure. We call this a nested custom type.

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

The `Fruit` type contains different variants of a fruit, with one of them being `Citrus`. `Citrus` itself contains another custom type, namely `CitrusFruit`, which makes `Fruit` an example of a nested custom type.

What if we want to write a function that returns a png-image of a given fruit? Then we would have to destructure the fruit using a `case..of` expression. This could be done like this:

```elm
image : Fruit -> String
image fruit =
    case fruit of
        Apple ->
            "apple.png"

        Pear ->
            "pear.png"

        Citrus citrus ->
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
        Apple -> 
            "apple.png"

        Pear -> 
            "pear.png"

        Citrus Orange -> 
            "orange.png"

        Citrus Lemon ->
            "lemon.png"

        Citrus Lime ->
            "lime.png"
```

See how much easier this function is to scan? 🧐 This little "trick" is something people new to Elm often don't know about, which is a pity as it makes the code both easier to write and more readable. A win-win!

Finally, Let's look at a real-life example of how this technique can help us make the `update`-function more readable. When writing Elm applications the custom type `Msg` is likely to become nested at some point. One example is when making a `Msg` for data received from an http request, let's call it `RagnhildsFavoriteFruitsReceived`. This `Msg` would typically contain the requested data wrapped in a `Result`, as the http request could fail. Using the technique described above, the `Result` can be unwrapped directly, by creating two branches for `RagnhildsFavoriteFruitsReceived` in the update function, like this: 

```elm
update msg model = 
    case msg of 
        RagnhildsFavoriteFruitsReceived (Ok []) -> 
            -- do something if the list of fruits is empty 🤔

        RagnhildsFavoriteFruitsReceived (Ok fruits) -> 
            -- do something meaningful with the fruits

        RagnhildsFavoriteFruitsReceived (Err err) -> 
            -- do something with the error

        ...
```

Notice the first branch with an empty list? This is a bonus-trick for even more explicit pattern matching. As the compiler scans the branches from top to bottom, if the received list of fruits is empty it will hit the first branch and do something special in this case. This illustrates that the described technique is not limited to custom types but can be used on all sorts of values. Try it out the next time you climb some trees!