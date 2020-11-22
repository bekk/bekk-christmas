---
calendar: elm
post_year: 2020
post_day: 15
title: andThen *IN PROGRESS*
ingress: Working with `Maybes` in Elm might result in excessive pattern matching
  because Elm forces us to handle every outcome of a `Maybe`. In this article,
  we investigate how we can use the `Maybe.andThen` function to reduce pattern
  matching and in turn get less boilerplate code with improved readability.
description: ""
authors:
  - Simen Fonnes
---
Consider that we want to implement a function that takes a String name which consists of several names and returns the last name in this string if it exists. In form of a Maybe String. The signature can look something like this:

```elm
toLastName : Maybe String -> Maybe String
```
We implement the toLastName function by splitting the string on space, reversing the list, and finally using List.head operation to get the first element in the reversed list. Using Maybe.map, we can do it like this:

```elm
toLastName name =
    name
        |> Maybe.map (String.split " ")
        |> Maybe.map List.reverse
        |> Maybe.map List.head
        |> Maybe.withDefault Nothing
```

As you can see, we end up with Maybe (Maybe String) after List.head operation, because List.head returns a Maybe List. Therefore, we have to use a Maybe.withDefault, in order to extract the inner Maybe. To remove this line of unnecessary code, we can use the Maybe.andThen function.

andThen is a function in which you may provide two parameters. The first parameter is a transformation function (a -> Maybe b), and the second parameter is a (Maybe a). The idea here is that the transformation function we supply as parameter one is only applied if parameter two is present (i.e., a Just). andThen returns the return type in the transformation function, but if Maybe a is Nothing, andThen returns Nothing and thus proceeds to the next in the chain in the pipeline. Essentially, this means that you don’t have to pattern match the Maybe you are working with, which reduces boilerplate code.

```elm
toLastName name =
    name
        |> Maybe.map (String.split " ")
        |> Maybe.map List.reverse
        |> Maybe.andThen List.head
```

Using andThen, we see that List.head is only executed if name is Just. 

We can also use andThen to filter.
```elm
toLastName : Maybe String -> Maybe String
```

```elm
nameWithSevenChars2 =
    Just "Simen Fonnes"
        |> Maybe.map (String.split " ")
        |> Maybe.andThen List.head
        |> Maybe.map
            (\e ->
                if String.length e >= 7 then
                    Just e

                else
                    Nothing
            )
        |> Maybe.withDefault (Just "Mindre enn sju sjars")
        |> Maybe.withDefault "Mindre enn sju sjars"
```

And here, using andThen:

```elm
nameWithSevenChars =
    Just "Simen Fonnes"
        |> Maybe.map (String.split " ")
        |> Maybe.andThen List.head
        |> Maybe.andThen
            (\e ->
                if String.length e >= 7 then
                    Just e

                else
                    Nothing
            )
        |> Maybe.withDefault "Mindre enn sju sjars"
```