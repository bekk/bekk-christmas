---
calendar: elm
post_year: 2020
post_day: 18
title: The Builder Pattern
authors:
  - Aksel Wester
---
The builder pattern is a useful way to structure some parts of your code in Elm.

Elm doesn't have a concept of required and optional arguments. Every function takes all the arguments they specify, no more, no less. But sometimes we want to be able specify only some arguments to a function, and use default values for the rest. The builder pattern is one solution to that challenge.

Let's start with a common use for the builder pattern in Elm: view elements. These are reusable elements that can be used in view code different places in an app. The most common examples are buttons, input fields, links. What these elements have in commons is that they should be reusable, but that they shouldn't always be identical. A botton could be solid or just have an outline, and have different colors depending on where you use it. Text input fields could differ in size, have error messages, or be disabled.

If we were to write separate functions for each of these variants of view elements, we would end up with many, many similiar, but slightly different, functions, to account for all the combinations of characteristics.

There are multiple strategies to deal with this challenge in Elm, and Brian Hicks examines many of them his excellent talk [_Robot Buttons from Mars_](https://youtu.be/PDyWP-0H4Zo), which is where I first learned about the builder pattern in Elm. To see the alternatives to the builder pattern, and their limitations, I would encourage you to watch that talk.

## A Text Field

We will examine this technique by creating a element for text input fields. We will start out just having required arguments, and build out the capabilities from there. We want our text field to take 3 required arguments: `value` (the text the user has types), `onChange` (the message to be sent when the user types), and a `label` text, to help with accessibility. In our example we will start with the following, simplefied HTML, where the our arguments will be in the braces:

```elm
label []
    [ {label}
    , input
        [ type_ "text"
        , value {value}
        , onChange {msg}
        ]
    ]
```


