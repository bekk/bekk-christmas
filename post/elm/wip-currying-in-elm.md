---
calendar: elm
post_year: 2020
post_day: 10
title: Partial application of functions!
image: https://images.unsplash.com/photo-1503416997304-7f8bf166c121?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2978&q=80
ingress: Currying (👈 which you read about in yesterday's [post](9)) enables
  partial application, which lets us split up functions into small logical
  building blocks which are easier to both read and work with.
authors:
  - Vetle Bu Solgård
---
In programming languages where you don't have currying, you'll get a compiler error if you do not provide all the arguments to a function. As you've just learned yesterday, however, currying will instead return a new function if you provide a subset of its arguments. Such a function is known as a partially applied function.

Let's see a simple example. 

We all want hard presents for christmas, lets write a function to check that a present is hard using currying.
We will use the function `String.contains` from the Elm core library. This is it's type signature👇
```elm
contains : String -> String -> Bool
```

It takes two `String`s, checking to see if the first `String´ is part of the second `String, then returning a `Bool` of `True` or `False`. Here we can make use of partial application to see if a present is hard or soft by making a function that receives the description of a present.

```elm
isHardPresent : String -> Bool 
isHardPresent = 
    String.contains "hard"
```

We partially apply the `String.contains` function to write a function to check if a present is desirable or not. The second `String` will be supplied to the `String.contains` function where the `isHardPresent` function is used.

```elm
isHardPresent “A sweather from grandma, soft”
 -- False
isHardPresent “A playstation 5 game, hard”
 -- True
```

Simply supply the description of the present and the function will tell you if the present is worth buying.
If we want to be a little more effective when christmas shopping, we can do this operation with lists of presents by using the function `List.filter`.

```elm
filter : (a -> Bool) -> List a -> List a
```

The filter function takes a predicate and a list. It then only keeps elements that satisfy this predicate.

```elm
filterHardPresents : List String -> List String
filterHardPresents =
  List.filter isHardPresent
```

We only supply the predicate argument to the `List.filter` function here, and can now use this function on all our lists of presents.
As you can see, partial application can be used in a number of useful ways! And just like that you have good present/bad present filter function ready to accompany you when christmas shopping🎅

```elm
filterHardPresents [ "Soft sweather from grandma", "Hard playstation game", "Hard fun toy", "Soft pillow", "Useless soft clothes" ]
> [ "Hard playstation game", "Hard fun toy" ]
```