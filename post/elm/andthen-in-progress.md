---
calendar: elm
post_year: 2020
post_day: 15
title: andThen *IN PROGRESS*
ingress: hello
description: ""
authors:
  - Simen Fonnes
---
We want to implement a function which gives the last name of a string, if it exist. In form of a Maybe String. 

```
toLastName : Maybe String -> Maybe String
```
We implement the function by splitting the string on space, reversing the list and finally using list head to get the first element in the reversed list. By using Maybe.map, we can do it like this:

```
toLastName name =
    name
    |> Maybe.map (String.split " ")
    |> Maybe.map List.reverse
    |> Maybe.map List.head
    |> Maybe.withDefault Nothing
```

As you can see, we end up with Maybe (Maybe String) after List.head operation, because List.head returns a Maybe List. Therefore, we have to use a Maybe.withDefault, in order to extract the inner Maybe.

However, if we use andThen, we can do it like this:

```
toLastName name =
    name
    |> Maybe.map (String.split " ")
    |> Maybe.map List.reverse
    |> Maybe.andThen List.head
```

Using andThen, we see that List.head is only executed if name is Just. 