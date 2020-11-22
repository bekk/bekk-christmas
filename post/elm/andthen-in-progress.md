---
calendar: elm
post_year: 2020
post_day: 15
title: andThen *IN PROGRESS*
ingress: The problem
description: ""
authors:
  - Simen Fonnes
---
We want to implement a function which gives the last name of a string, if it exist. In form of a Maybe String. 

```elm
toLastName : Maybe String -> Maybe String
```
We implement the function by splitting the string on space, reversing the list and finally using list head to get the first element in the reversed list. By using Maybe.map, we can do it like this:

```elm
toLastName name =
    name
        |> Maybe.map (String.split " ")
        |> Maybe.map List.reverse
        |> Maybe.map List.head
        |> Maybe.withDefault Nothing
```

As you can see, we end up with Maybe (Maybe String) after List.head operation, because List.head returns a Maybe List. Therefore, we have to use a Maybe.withDefault, in order to extract the inner Maybe.

andThen is a function in which you may provide two parameters. The first parameter is a transformation function (a -> Maybe b), and the second parameter is a (Maybe a). The idea here is that the transformation function we supply as parameter one is only applied if parameter two is present (i.e., a Just). andThen returns the return type in the transformation function, but if Maybe a is Nothing, andThen returns Nothing and thus proceeds to the next in the chain in the pipeline. Essentially, this means that you don’t have to pattern match the Maybe you are working with, which reduces boilerplate code.

However, if we use andThen, we can do it like this:

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