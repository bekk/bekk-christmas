---
calendar: elm
post_year: 2020
post_day: 2
title: Unpacking Records
image: https://unsplash.com/photos/IkjROahgUoo
ingress: Records in Elm are quite similar to the trusty old objects in
  JavaScript. Consider objects with a type as in TypeScript and the comparison
  is even closer. If you’ve worked with React and/or ES6, you may have used
  destructuring to compact and increase the clarity of your code that deals with
  objects. This article invites you to take a look at some techniques that Elm
  offers to that same end.
authors:
  - Jørgen Tu Sveli
---
In this article we will look at destructuring records when they appear as function parameters. The basic syntax for this is:

```elm
cartItem = { unitPrice = 19, amount = 2 }

calculateTotal { unitPrice, amount } =
    unitPrice * amount

calculateTotal cartItem -- 38
```

If we are after 2 properties of the record but also want to retain a reference to the whole of the record, Elm allows this:

```elm
type alias CartItem = 
    { unitPrice: Int
    , amount: Int
    , description
    }

cartItem = { unitPrice = 19, amount = 2, description = "Washable, reusable face mask" }

calculateTotal ({unitPrice, amount} as wholeItem) =
    unitPrice * amount\
        |> debug wholeItem
```

Here we unwrap unitPrice and amount to calculate the total, but keep a reference to the whole record. The debug function needs access to the rest of the record, to print the description and the total, but we let the first function handle calculating the total.

Let’s look at a more realistic example. Records appear somewhere in the model of most elm apps. The model is used differently throughout an elm app: In some functions, the model is updated and only one or a few of the members are touched. In other functions, larger numbers of members of the model are read at the same time. This is seen typically in view code.

Behold the Model of the Elm todomvc app.

```elm
type alias Model =
    { entries : List Entry
    , field : String
    , uid : Int
    , visibility : String
    }
```

The top-level view function in todomvc defines the top level structure of the view and delegates parts of the model for rendering:

```elm
view : Model -> Html Msg
view model =
    div
        [ class "todomvc-wrapper"
        , style "visibility" "hidden"
        ]
        [ section
            [ class "todoapp" ]
            [ lazy viewInput model.field
            , lazy2 viewEntries model.visibility model.entries
            , lazy2 viewControls model.visibility model.entries
            ]
        , infoFooter
        ]
```

We could apply some pattern matching here to avoid repeating `model.`:



```elm
view : Model -> Html Msg
view { entries, field, visibility } =
    div
        [ class "todomvc-wrapper"
        , style "visibility" "hidden"
        ]
        [ section
            [ class "todoapp" ]
            [ lazy viewInput field
            , lazy2 viewEntries visibility entries
            , lazy2 viewControls visibility entries
            ]
        , infoFooter
        ]
```