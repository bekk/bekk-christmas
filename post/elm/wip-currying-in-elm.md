---
calendar: elm
post_year: 2020
post_day: 9
title: "WIP: Currying in Elm"
ingress: A function that takes several arguments can often be tiresome to read,
  and not logically satisfying to use. By utilising currying you can split up
  such functions into small logical building blocks that makes such pieces of
  code easier to both read and work with.
---
Simply put, currying is to partially apply a function. In programming languages where you don't have currying and you don't supply all the arguments when you call it, you will get a compile error. 

In elm you can start by calling the function with one of several arguments, allowing you to supply the other arguments at a later time. The function will then return a partially applied function, which you can use to build a logically better program.

Let's see a simple example. 

We all want hard presents for christmas, lets write a simple function to check that a present is hard using currying.
We will use the function `String.contains` from the String Elm library. This is the type signature of contains
```elm
contains : String -> String -> Bool
```
It takes 2 strings, checking to see if the first string is part of the second string, then returning a Bool of True or False. Here we can use currying to see if a present is hard or soft by making a function that receives the description of a present. 
```elm
isHardPresent : String -> Bool 
isHardPresent = 
    String.contains "hard"
```
We partially apply the String.contains function to write a function to check if a present is desirable or not. The second String will be supplied to the `String.contains` function where the `isHardPresent` function is used.
```elm
> isHardPresent “A sweather from grandma, soft” 
False
> isHardPresent “A playstation 5 game, hard” 
True
```
When looking for a christmas present to buy for a kid, this function will tell you if you should buy it or not.

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
As you can see, currying can be used in a number of useful ways🎅





