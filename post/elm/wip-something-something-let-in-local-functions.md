---
calendar: elm
post_year: 2020
post_day: 5
title: "WIP: Something something let-in/local functions"
image: https://images.unsplash.com/photo-1605329540489-afc28d074eb8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80
links:
  - url: https://elm-lang.org/docs/syntax#let-expressions
    title: Let expressions and local functions
authors:
  - Isak Sunde Singh
---
When writing view-logic, there's always tons of stuff that needs to be processed in some small way. Either texts that need to be translated, numbers that need a thousand-separator, etc. Oftentimes, these things can clutter up the code and make it harder to understand what really is going on. Let's look at an example.

Say you're writing some code to show a shopping cart at a web-shop. For each item you need to show the item's name, its description and its price. The name needs to be displayed, the description is a type that can be translated to the user's language and the price should be formatted with the correct thousand-separators and currency:

```elm
shoppingCart : List Item -> Translator -> List (Html msg)
shoppingCart items translate =
    items
        |> List.map
            (\item ->
                div []
                    [ h3 [] [ text item.name ]
                    , p [] [ text (translate item.description) ]
                    , p [] [ text (formatPrice "€" (formatNumberWithSeparator "," item.price)) ]
                    ]
            )
```

This looks cluttered for a new developer. What could help make it clearer? Well, to start off, we could try to extract part of the code into local variables, such as the formatted price:

```elm
shoppingCart : List Item -> Translator -> List (Html msg)
shoppingCart items translate =
    let
        formattedPrice =
            formatPrice "€" (formatNumberWithSeparator "," item.price)
    in
    items
        |> List.map
            (\item ->
                div []
                    [ h3 [] [ text item.name ]
                    , p [] [ text (translate item.description) ]
                    , p [] [ text formattedPrice ]
                    ]
            )
```

Turns out, we can't really do that as we only have access to the `item`-value inside the lambda-function given to `List.map`. What we instead could do is use a function that accepts an item and returns the formatted value. However, adding such a small function next to the `shoppingCart`-function to do just that one little thing makes it difficult to see the more important functions such as shoppingCart. Also, it is only going to be used in the `shoppingCart`-function. There should be a better way.

This is where local functions come in! `let-in`-blocks do not only allow us to create local variables, but also local functions that can only be used within the surrounding function. Let's see how that looks:

```elm
shoppingCart : List Item -> Translator -> List (Html msg)
shoppingCart items translate =
    let
        showPrice price =
            formatPrice "€" (formatNumberWithSeparator "," price)
    in
    items
        |> List.map
            (\item ->
                div []
                    [ h3 [] [ text item.name ]
                    , p [] [ text <| translate item.description ]
                    , p [] [ text <| showPrice item.price ]
                    ]
            )
```

And now our view-logic for the shopping cart should be more clear while not cluttering our global scope!
