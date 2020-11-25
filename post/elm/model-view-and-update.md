---
calendar: elm
post_year: 2020
post_day: 19
title: Model, view and update
ingress: >-
  Elm and other functional programming languages might look weird and scary to
  newcomers, but once you get to know them, functional languages becomes very
  clear and satisfying to work with.

  Let's look at the MVU - Model, View, Update. An idea that started with elm, but has since been adopted and inspired how people write code in all languages.
---
* What to talk about to make this exciting?
* Talk about how this can be applied in other languages?
* Central place of storage for state.

An elm program can be split up into three very simple pieces; the **model**, **view**, and **update**.
We'll start with the model. This contains the state of the program.
```elm
-- Model

type alias Model = 
    { presentCounter : Int
    , receivedGifts : List String
    }

```
The `Model` is in elm represented of what is called a record, and is a central store for all the data we use to represent our application. The `Model` will (or at least should) at all times contain the most recent data that we want to use in our program. So if a user has clicked something that changes  What resides in the `Model` is what we provide to the view.


So how is the `Model` updated? The state of a program should not be manipulated from all over the place, so the only place that we can use to directly manipulate the `Model` is in the `update` function.
```elm
-- UPDATE
type Msg
    = ReceivePresent
    | 

update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        ReceivePresent ->
            ( { model | presentCounter = model.presentCounter + 1 }, Cmd.none )

```
As we can see from the signature of the function it takes a `Msg`, and the `Model`, the state of the program. The `Msg` defines what is to be updated, and is a type that is a collection of all the different ways we can update the state of our program, the `Model`. Our central state is then updated in accordance with how `update` handles the specific `Msg` that is received, and the new state is outputted as part of the tuple `( Model, Cmd Msg)`.

The second part of the tuple that is returned is the `Cmd Msg`. To be able to do operations separate from the elm, "model, view, update" lifecycle we need to use commands depicted as the type `Cmd`. These commands will be operations like changing the url path, or fetching some data from an API. However the type `Cmd` also takes a `msg`, which is an arbitrary message. In our case we have defined this as `Msg` which is the type of messages that can update our `Model` in the `update` function. This `Msg` part of `Cmd Msg` is important as this is a way of saying "do this command, and give it back to my `update` function and update the `Model` this way.

```elm
```



```elm
-- VIEW

view : Model -> Html Msg
view model = 
    Html.div [] []
```


