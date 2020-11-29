---
calendar: elm
post_year: 2020
post_day: 19
title: "WIP: Model, view and update"
ingress: >-
  Elm and other functional programming languages might look weird and scary to
  newcomers, but once you get to know them, functional languages becomes very
  clear and satisfying to work with.

  Let's look at the MVU - Model, View, Update architecture. An idea that started with elm, but has since been adopted and inspired how people write code in all languages.
---
An elm program can be split up into three very simple pieces; **model**, **view**, and **update**.
We'll start with the model. This contains the state of the program.

```elm
-- Model

type alias Model = 
    { presentCounter : Int }
```

The state of the program is currently represented by one property, a counter of how many gifts someone has received that is represented by an `Int` type.
The `Model` is in elm represented by what is called a **record**, and is a central store for all the data we use to represent our application with. The `Model` will at all times contain the most recent data that we want to use in our program. So if a user has clicked something that changes  the state of our program this should create a new state which will be the current state of the program.

So how is the `Model` updated? The state of a program should not be manipulated from all over the place, so the only place that we can use to directly manipulate the `Model` is in the `update` function. This collects messages from our program which is handled in the \`update\` function, so that all updates to the state is collected into one place.

```elm
-- UPDATE
type Msg
    = ReceivePresent

update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        ReceivePresent ->
            ( { model | presentCounter = model.presentCounter + 1 }, Cmd.none )
```

As we can see from the signature of the \`update\` function it takes a `Msg`, and the `Model`, the state of the program. The `Msg` defines what is to be updated, and is a type that is a collection of all the different ways we can update the `Model`. Our central state is then updated in accordance with how `update` handles the specific `Msg` that is received, and the new state is outputted as part of the tuple `( Model, Cmd Msg)`.

The second part of the tuple that is returned is the `Cmd Msg`, which can seem a little cryptical at first. To be able to do operations separate from elm's "model, view, update" lifecycle we need to use commands depicted as the type `Cmd`. These commands will be operations like changing the url path, or fetching some data from an API. As we can see the type `Cmd` also takes a `msg`, which represents an arbitrary message. Notice that \`msg\` and \`Msg\` are different, \`msg\` (with first letter lower cased) represents any arbitrary type, while \`Msg\` (with first letter upper cased) represents an actual type, in this case defined by us. In our case we have defined this as `Msg` which is the type of messages that can update our `Model` in the `update` function. This `Msg` part of `Cmd Msg` is an important element of understanding commands in elm as this is a way of saying "do this command, and give it back to my `update` function". The program then proceeds to update the `Model` in the way that \`update\` is defined to handle that specific \`Msg\` that is provided to the \`Cmd\` type.

The last element in the **MVU**, **the model, view and update** architecture, is the **view.** This is where the html is defined, where we decide how we want the page to look, and how the various html elements should be arranged.

```elm
-- VIEW

view : Model -> Html Msg
view model = 
    Html.div [] []
```

If we didn't have any elements to interact with, or didn't need anything to change in our application, then we would not really need to pay much attention to the other 2 elements in the **MVU architecture**. But like most applications we do off course want to build a webpage that changes as the user interacts with elements in our application.
We can see from the definition of the `view` function that it receives a parameter of the `Model` type which we have learned is the state of our program. The `view` will use the data we have chosen that resides in the `Model` to represent the application correctly. This will always be the newest version of the state, so whenever a `Msg` type is dispatched to the `update` function, this `Msg` will proceed to update the `Model` and the `view` will be rendered with the newly updated `Model`.
The return type of the `view` function is also interesting. This is `Html Msg` where `Html` is the core building block of html code. `Msg` is the `Msg` type that we have defined ourselves and represents `Msg` that we place in our Html code to be able to call back to our `update` function when something specific happens.

For example when a user wants to update his gift-receiving counter. The `Msg` `ReceivePresent` is dispatched to our `update` function, the `Model` is updated, which causes a refresh of the `view`, which at this point shows the updated `view` with the correct and updated model 🎁🎅

```elm
view : Model -> Html Msg
view model =
    Html.button
        [ Events.onClick ReceivePresent ]
        [ Html.text "Number of gifts received: " ++ (String.fromInt model.presentCounter) ]

```