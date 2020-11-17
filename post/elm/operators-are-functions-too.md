---
calendar: elm
post_year: 2020
post_day: 12
title: Operators are functions, too
image: https://images.unsplash.com/photo-1509228468518-180dd4864904?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80
ingress: Much of Elm's power stems from the fact that most things are just
  functions. So how does operators fit in?
authors:
  - Robin Heggelund Hansen
---
Imagine that we have a list of example first names, and another list of example last names. Let's also imagine that our task is to come up with a set of example full names. We could solve the problem like so:

```elm
exampleNames : List String
exampleNames =
    List.map2 (\firstName lastName -> firstName ++ lastName) listOfFirstNames listOfLastNames
```

This works, but the anonymous function we've made takes a surprisingly large amount of screen real estate considering how little it actually does.

We could try to improve the situation by turning this into a proper function:

```elm
combineStrings : String -> String -> String
combineStrings left right =
    left ++ right
    
exampleNames : List String
exampleNames =
    List.map2 combineStrings listOfFirstNames listOfLastNames
```

This works, but creating a function which just applies the ++ operator feels like more work than should be necessary.

The good news is that it is, in fact, uneccessary. Operators are functions, too.

Operators are special as they're the only functions which can be used with infix notation. That means its arguments are placed on both sides of the function. However, you can turn an operator back into a "regular" function by wrapping it with parenthesees, like this:

```elm
combineStrings : String -> String -> String
combineStrings left right =
    (++) left right
```

As long as they're wrapped by parenthesees, operators work like any other function in Elm. Which means we could write the original exampleNames implementation like so:

```elm
exampleNames : List String
exampleNames =
    List.map2 (++) listOfFirstNames listOfLastNames
```

You might have noticed that we have a bug here. Normally, a full name will have its first and last name seperated by whitespace, but our current implementation will join the first and last name without any space between them.

We could solve this by prefixing all last names with a single space, and then combine first names and last names together. Since operators are just functions, this allows us to make use of partial application:

```elm
exampleNames : List String
exampleNames =
  List.map ((++) " ") listOfLastNames
      |> List.map2 (++) listOfFirstNames
```

## Summary

While operators work differently from regular functions by default, you can make them work like any regular function by wrapping them in parentheses. Done correctly, this can make your code more succinct and easier to read.