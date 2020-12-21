---
calendar: elm
post_year: 2020
post_day: 22
title: Outbound ports
image: https://images.unsplash.com/photo-1556805256-a0650b57d008?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80
ingress: In yesterday's [post](/2020/21), we learned about inbound ports in Elm.
  Today, instead of receiving a message, we want to send a message from our Elm
  application to the outside world (JavaScript).
description: elm ports
---
It is easy to imagine that we will have the need to communicate something from inside our Elm app to JavaScript. We might be using some browser API that doesn't exist in Elm and that is needed to be imported in JavaScript (FIX THIS SENTENCE).

First we will declare our outgoing port.

```elm
port sendButtonClickedMessage : String -> Cmd Msg
```

From the definition of the function we can see that this simple port will send out a `String` value. The naming suggests that it does so when we click a button.

So how do we connect this outgoing port to our code in the Elm lifecycle? First we will write the code where this button that we click resides.

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

The `update` function proceeds to call the port and supply the `String` that will be received in our JavaScript code enclosing our Elm applications. This code in JavaScript that will be receiving the message lives in the `index.html` file, within the `script` tags that we learned about in yesterday's [post](/2020/21).

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

It might happen that we send out a little more complicated messages than just a `String` type. In these other cases we can send out a json structure that can be received in JavaScript. We can use [Json-encoder](https://package.elm-lang.org/packages/elm/json/latest/Json-Encode) to turn Elm values into this json structure.