---
calendar: elm
post_year: 2020
post_day: 8
title: Peeking Inside Lists
image: https://source.unsplash.com/s8QSJTJI6qg
ingress: Working with lists in Elm is nice, but getting a sense of what’s inside
  a list can be tricky. In this article we will look at a techinque that allows
  us to get access to the elements inside a list.
authors:
  - Aksel Wester
---
We will start by looking at a somewhat finicky example. Let's say we have a list of text notes in our app, that we want to display. If there are multiple notes in the list, we would like to show all the elements in their minimized form. If there is only one note in the list, we would like to show a maximized view of that note, since showing a list with only one element is a waste in that case. And lastly, if the list is empty, we would like to display a message saying that the list is empty.

To meet those requirements, we could write something like this:

```elm
view : List Note -> Html a
view notes =
    if List.length notes == 1 then
        case List.first notes of
            Just first ->
                viewNote first

            Nothing ->
                -- This should never happen
                text ""

    else if List.length notes == 0 then
        viewEmptyList

    else
        -- There is more than one element in the list
        viewMinimizedNotes notes
```

Now, this function is _fine_. But it could be a lot simpler! The main problem is in the case where we have only one text note. When we have entered the first branch of the if-statement, we _know_ that there is exactly one element in the list, but we still have to use `List.first` to get access to that element. And since the compiler doesn't know that there is a first element in the list, we still have to account for the `Nothing`-case.

Wouldn't it be nice if we could get access to the elements inside the list _at the same time_ as we got information about the structure of the list? Well sure, and there is actually a way to do this in Elm.

## Pattern Matching on Lists

Before we get to the solution, let's take a short detour through list making. In Elm, we can create lists in multiple ways. We can use square brackets to create them: `[ 1, 2, 3 ]`. We can use functions, like `List.singleton 1` (which results in the list `[ 1 ]`). We can also use the [`::` operator](https://package.elm-lang.org/packages/elm/core/latest/List#::) from the `List` module. The `::` operator works by adding an element to the start of a list, like this:

```elm
1 :: [ 2, 3 ]
-- Results in: [ 1, 2, 3 ]

1 :: []
-- Results in: [ 1 ]

a = [ 3, 4 ]
1 :: 2 :: a
-- Results in: [ 1, 2, 3, 4 ]
```

Now, the `::` operator is used for creating lists, but it can also be used to pattern match on lists in case-statements! Let's take a look at an example:

```elm
case list of
    first :: rest ->
        "There is at least one element in the list, and the first element is: " ++ first

    [] ->
        "The list is empty"
```

As we can see from the example, pattern matching on lists gives us information about the shape of the list _at the same time_ that we get access to the elements in the list!

Let's use this technique to rewrite our `view` function from before:

```elm
view : List Note -> Html a
view notes =
    case notes of
        onlyNote :: [] ->
            viewNote onlyNote

        [] ->
            viewEmptyList

        _ ->
            viewMinimizedNotes notes
```

Doesn't this look way better?

There are many more things you can do with pattern matching on lists, which we don't have time to get into today. But I suggest that you experiment to see what is possible! You could for instance get access to multiple elements (`first :: second :: rest`), or reverse the list (with `List.reverse`) and get access to the elements from the back. The possibilities aren't quite endless, but there are at least a long list of them.