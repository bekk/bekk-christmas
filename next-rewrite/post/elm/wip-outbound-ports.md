---
calendar: elm
post_year: 2020
post_day: 22
title: Outbound ports
image: https://images.unsplash.com/photo-1556805256-a0650b57d008?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80
ingress: In yesterday's [post](/2020/21), we learned about inbound ports in Elm.
  Today, instead of receiving a message, we want to send a message from our Elm
  application to the outside world that is JavaScript.
description: elm ports
---
At some point when writing an Elm program we might have the need to communicate something from inside our application to JavaScript, and as we have learned that is exactly the function of ports in Elm. We use ports to be able to bridge the world between JavaScript and Elm.

The first thing we will need to do in accomplishing sending a message from our application is to define our outgoing port.

```elm
port sendButtonClickedMessage : String -> Cmd Msg
```

From the definition of the function we can see that this simple port will send out a `String` value. We will send messages through this port when a user clicks a button in our application.

So how do we connect this outgoing port to our code in the Elm lifecycle? We will start by writing the `view` code where this button resides.

```elm
view : Model -> Html Msg
view model =
    Html.button [ Events.onClick (SendOutgoingMessage "ButtonClicked!") ]
        [ Html.text "Click me to send a message to JavaScript!" ]
```

In this `view` we have a `Html.button` that when clicked, causes the `update` function to be called with the `Msg` `SendOutgoingMessage`.

```elm
type Msg
    = SomeOtherMessage
    | SendOutgoingMessage String


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        SomeOtherMessage ->
            …
        
        SendOutgoingMessage messageToSend ->
            ( model, sendButtonClickedMessage messageToSend )
```

The `update` function proceeds to call the port and supply the `String` that will be received in JavaScript. On the Javascript side we will be receiving the messages in the `index.html` file that we learned about in yesterday's [post](/2020/21).

```html
<script type="text/javascript">

    var app = Elm.Main.init({
        node: document.getElementById('elm-app')
    });


    app.ports.sendButtonClickedMessage.subscribe(function(messageText) {
        console.log(messageText);
    });
</script>
```

The message sent from Elm will be received in the above javascript function, and inside this code block we can proceed to do whatever we want to do with the information received from Elm.

We might want to send out a little more complicated messages than just a `String` type. In these other cases we can use [Json-encoder](https://package.elm-lang.org/packages/elm/json/latest/Json-Encode) to turn the desired Elm values into a json structure.