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
In this article we will look at destructuring or pattern matching as it is commonly referred to within Elm, of records when they appear as function parameters. The focus is on functions for now, even though the technique can be applied in other cases as well. The basic syntax for this is presented in the example below. The code declares a type for a shopping cart item and a function that calculates the total for that cart item:

```elm
type alias CartItem = 
    { unitPrice: Int
    , amount: Int
    }

cartItem = { unitPrice = 19, amount = 2 }

calculateTotal : CartItem -> Int
calculateTotal { unitPrice, amount } =
    unitPrice * amount

calculateTotal cartItem -- 38
```

If we would like shorthand access to a subset of the fields but also want to retain a reference to the whole of the record, we're in luck since Elm allows this:

```elm
type alias CartItem = 
    { unitPrice: Int
    , amount: Int
    , description
    }

cartItem = { unitPrice = 19, amount = 2, description = "Washable, reusable face mask" }

calculateTotal ({unitPrice, amount} as wholeItem) =
    unitPrice * amount\
        |> otherFunction wholeItem
```

Here we unwrap unitPrice and amount to calculate the total, but keep a reference to the whole record. The `otherFunction` needs access to the rest of the record, but calculating the total.

Let’s move on to an example from the real world. Records appear somewhere in the model of most elm apps. The model is used differently throughout an elm app: In some functions, the model is updated and only one or a few of the members are touched. In other functions, larger numbers of members of the model are read at the same time. This is seen typically in view code.

Behold the Model of the [Elm todomvc app](https://github.com/evancz/elm-todomvc/blob/master/src/Main.elm).

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