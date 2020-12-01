---
calendar: elm
post_year: 2020
post_day: 5
title: Letting functions in
image: https://images.unsplash.com/photo-1605329540489-afc28d074eb8?w=1226&h=400&fit=max&crop=edges
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
We can also keep going and move our lambda function into a local function:

```elm
shoppingCart : List Item -> Translator -> List (Html msg)
shoppingCart items translate =
    let
        showPrice price =
            formatPrice "€" (formatNumberWithSeparator "," price)

        showItems item =
            div []
                [ h3 [] [ text item.name ]
                , p [] [ text <| translate item.description ]
                , p [] [ text <| showPrice item.price ]
                ]
    in
    items
        |> List.map showItems
```

This makes it even clearer what the actual view-logic is, as we can more easily separate view-logic from the logic that generates the view for each item.
Additionally, local functions can be type-annotated, as such:

```elm
shoppingCart : List Item -> Translator -> List (Html msg)
shoppingCart items translate =
    let
        showPrice : Float -> String
        showPrice price =
            formatPrice "€" (formatNumberWithSeparator "," price)

        showItems : Item -> Html msg
        showItems item =
            div []
                [ h3 [] [ text item.name ]
                , p [] [ text <| translate item.description ]
                , p [] [ text <| showPrice item.price ]
                ]
    in
    items
        |> List.map showItems
```

This can make it clearer what the code does, but can also hurt readability.
Remember to think about whether the type annotation helps making the code clearer, or if it just introduces visual clutter.

Now go on and let the functions in!
