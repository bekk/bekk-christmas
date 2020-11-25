---
calendar: elm
post_year: 2020
post_day: 8
title: Peaking Inside Lists
---
Working with lists in Elm is often quite nice, but sometimes it can feel a bit difficult to get a sense of what is inside a list. In this article we will look at a techinque that allows us to get access to elements inside a list.

We will start by looking at a somewhat tricky example. Let's say we have a list of somethings in our app, that we want to display. If there are multiple somethings inside the list, we would like to show all the elements in their minimized form. If there is only one something in the list, we would like to show a maximized view of that something, since showing a list with only one element is a waste in that case. And lastly, if the list is empty, we would like to display a message saying that the list is empty.

To meet those requirements, we would have to write something like this:

```elm
view: List Something -> Html a
view somethings =
    if List.length somethings == 1 then
        case List.first somethings of
            Just first ->
                 viewSomething first

            Nothing ->
                 -- This should never happen
                 text ""

    else if List.length > 1 then
        viewMinimizedSomethings somethings

    else
        -- The list is empty
        viewEmptyList
```

Now, this function is _fine_, But it could be a lot simpler! The main problem is in the case where we have only one something. When we have entered the first branch of the if-statement, we _know_ that there is exactly one element in the list, but we still have to use `List.first` to get access to that element. And since the compiler doesn't know that there is a first element in the list, we still have to account for the `Nothing`-case.

Wouldn't it be nice if we could get access to the elements inside the list _at the same time_ as we got information about the structure of the list? Well sure, and there is actually a way to do this in Elm.

## Pattern matching on lists

