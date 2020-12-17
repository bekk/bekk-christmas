---
calendar: elm
post_year: 2020
post_day: 18
title: The Builder Pattern
ingress: Elm doesn't have a concept of required and optional arguments. Every
  function takes all the arguments they specify, no more, no less. But sometimes
  we want to be able to specify only some arguments to a function, and use
  default values for the rest. The builder pattern is one solution to that
  challenge.
authors:
  - Aksel Wester
---
Let's start with a common use case for the builder pattern in Elm: view elements. These are reusable elements that can be used in view code in different places in an app. The most common examples are buttons, input fields, and links. What these elements have in common is that they should be reusable, but that they are not necessarily identical everywhere they are used. A button could be solid or just have an outline, and have different colors depending on where you use it. Text input fields could differ in size, have error messages, or be disabled.

If we were to write separate functions for each of these variants of view elements, we would end up with many similiar, but slightly different, functions, to account for all the combinations of characteristics.

There are multiple strategies to deal with this challenge in Elm, and Brian Hicks examines many of them in his excellent talk [_Robot Buttons from Mars_](https://youtu.be/PDyWP-0H4Zo), which is where I first learned about the builder pattern in Elm. To see the alternatives to the builder pattern, and the limitations with those alternatives, I would encourage you to watch that talk.

## A Simple Text Field

We will examine this technique by creating a element for text input fields. We will start out with only required arguments, and build out the capabilities from there. We want our text field to take 3 required arguments: `value` (the text the user has typed), `onChange` (the message to be sent when the user types), and a `label` text, to help with accessibility. In our example we will start with the following, simplified HTML, where our required arguments are shown in braces:

```elm
label []
    [ {label}
    , input
        [ type_ "text"
        , value {value}
        , onChange {onChange}
        ]
    ]
```

We will keep all the functionality related to text inputs in one file, which we will call `Input.elm`. And we will structure our code around an opaque type called `Input`, which will hold all of our options for the text field. `Input` has the following type signature:

```elm
type Input msg
    = Input
        { value : String
        , onChange : String -> msg
        , label : String
        }
```

We will create a constructor function for making an `Input`, which will be exposed by our module:

```elm
input : { label : String, onChange : String -> msg } -> String -> Input msg
input inputOptions valueString =
    Input
        { value = valueString
        , onChange = inputOptions.onChange
        , label = inputOptions.label
        }
```

To transform an `Input` into `Html`, we create the following function:

```elm
toHtml : Input msg -> Html msg
toHtml (Input options) =
    label []
        [ options.label
        , input
            [ type_ "text"
            , value options.value
            , onChange options.onChange
            ]
        ]
```

So to use our new view element, we do the following (where `NameChanged` is a message that takes a `String` as an argument):

```elm
view model =
    Input.input { label = "Name", onChange = NameChanged } "Aksel"
        |> Input.toHtml
```

If that's the only way our text fields look and behave, this would have been an extremely overengineered solution. But the moment we have different needs in different text fields, this solution starts to shine.

## Expanding Capabilities

We can continue by adding the ability for our text fields to have a placeholder text. Placeholder texts shouldn't be required in all text fields in our app, so we will add it as a `Maybe String` in our options record:

```elm
type Input msg
    = Input
        { value : String
        , onChange : String -> msg
        , label : String
        , placeholder: Maybe String
        }
```

Then we have to add it to our constructor. But crucially, we won't require it as an argument, we will just initialize it to `Nothing`:

```elm
input : { label : String, onChange : String -> msg } -> String -> Input msg
input inputOptions valueString =
    Input
        { value = valueString
        , onChange = inputOptions.onChange
        , label = inputOptions.label
        , placeholder = Nothing
        }
```

To use the placeholder in the HTML, we modify the `toHtml` function to take the option into account:

```elm
toHtml : Input msg -> Html msg
toHtml (Input options) =
    label []
        [ options.label
        , input
            [ type_ "text"
            , value options.value
            , onChange options.onChange
            , case option.placeholder of
                Just placeholderString ->
                    placeholder placeholderString

                Nothing ->
                    -- This is just an attribute that doesn't change the html
                    classList []
            ]
        ]
```

To actually set a placeholder on a text field, we create the following function:

```elm
withPlaceholder : String -> Input msg -> Input msg
withPlaceholder placeholderString (Input options) =
    Input { options | placeholder = Just placeholderString }
```

And to use the `withPlaceholder` function in our view, we simply add one line:

```elm
view =
    Input.input { label = "Name", onChange = NameChanged } "Aksel"
        |> Input.withPlaceholder "Type your name here..."
        |> Input.toHtml
```

The handy thing here is that adding the placeholder capability to our `Input` module doesn't have to result in any code changes in places that already use the text field without a placeholder! This is especially important as your app starts to grow, and you are using a view element in tens or hundreds of places in your code!

## Conclusion

In this article I have hopefully shown that the builder pattern is a nice way to handle optional arguments in Elm. Whether using the builder pattern is right for you in your app depends on the size and complexity of your code base. But if you find yourself adding a lot of helper functions for different variations of view elements, I hope you will give it a try. I, at least, have really enjoyed working with it.