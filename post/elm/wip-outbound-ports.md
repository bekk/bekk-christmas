---
calendar: elm
post_year: 2020
post_day: 22
title: Outbound ports
ingress: Yesterday, we learned about inbound ports in elm. Today, instead of
  receiving a message, we want to send a message from our elm application to the
  outside world (JavaScript).
---
It is easy to imagine that we will have the need to communicate something from inside our elm app to JavaScript. We might be using some browser API that doesn't exist in elm and that is needed to be imported in JavaScript (FIX THIS).

First we will declare our outgoing port.

```elm
port sendButtonClickedMessage : String -> Cmd Msg
```

From the definition of the function we can see that this simple port will send out a `String` value. The naming suggests that it does so when we click a button.

So how do we connect this outgoing port to our code in the elm lifecycle? First we will write the code where this button that we click resides.

```elm
view : Model -> Html Msg
view model =
    Html.button [ Events.onClick (SendOutgoingMessage "ButtonClicked!") ]
        [ Html.text "Click me!" ]
```

In this `view` we have a `Html.button` that when clicked, calls the `update` function with the message `SendOutgoingMessage`.

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

The `update` function proceeds to call the port and supply the `String` that will be received in our JavaScript code enclosing our elm applications. This code in JavaScript that will be receiving the message lives within 

```javascript
app.ports.sendOutgoingMessage.subscribe(function(messageText) {
    socket.send(messageText);
});
```