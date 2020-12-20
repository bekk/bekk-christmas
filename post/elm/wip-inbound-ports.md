---
calendar: elm
post_year: 2020
post_day: 21
title: Inbound ports - receiving external messages in Elm
ingress: What if your elm program needs to communicate with the JavaScript
  enclosing the app? Maybe you need some kind of messages flowing into the elm
  lifecycle and need to act on such events? To receive messages from JavaScript
  we can make use of inbound ports🌈
---
If we are in need of communication with the JavaScript, outside of our elm code inbound ports are designed to do just that. 

There are various ways to define the entry to our elm app. We can do this both through an \`index.js\` file, and an \`index.html\`. We'll use the \`index.html\` for this example. Our \`index.html\` file can be seen below

```html
<!DOCTYPE HTML>
<html>

<head>
  <meta charset="UTF-8">
  <title>🎅Elm🎅</title>
  <script src="main.js"></script>
</head>

<body>
    <div id="elm-app"></div>
</body>

<script type="text/javascript">
<!-- This is where we write our javascript code! -->
</script>

</html>
```

Between the `script` html tags is where we will write our JavaScript code and initialise our elm app through initialising our `Main.elm` file. Also notice the script tags on line 7, this loads our compiled elm code and is required. This enables the possibility to call a \`Elm.Main.init()\` function in JavaScript, which initialises our application.

We'll start by initialising our application with the \`Elm.Main.init()\` function inside the `script` tags in `index.html` where our JavaScript code resides.

```html
<script type="text/javascript">

    var app = Elm.Main.init({
        node: document.getElementById('elm-app')
    });

</script>
```

Next we'll finally the code required on the JavaScript side to be able to send messages into our elm lifecycle.

```html
<script type="text/javascript">

    …

    app.ports.getTodos.subscribe(() => {
        const helloFromJSMessage = "Hello from JavaScript!"
        app.ports.helloFromJS.send(helloFromJSMessage);
    });

</script>
```

We will now have to write the code that will be receiving whatever JavaScript wants to tell us, *inside* our elm program.
Part of initialising our elm program inside `Main.elm` is telling it where it will find the `view`, `update`, the `init` function and so on. Here you will also find where you supply the `subscriptions` function, which describes to elm which ports exists.

```elm

port helloFromJS : (String -> msg) -> Sub msg


main : Program () Model Msg
main =
  Browser.element
    { init = init
    , view = view
    , update = update
    , subscriptions = subscriptions
    }



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions _ =
  helloFromJS HelloFromJS


type Msg 
    = SomeOtherMsg
    | HelloFromJS

```

We define our port, `helloFromJS`, and our `subscriptions`. Next step is to tap into the elm lifecycle. You can see that we started a little bit already, by telling the `subscription` function that it should send the `HelloFromJS` `Msg` when it receives a message from the `helloFromJS` port. 
Every time JavaScript sends a message to elm, the port `helloFromJS` will receive it, and the `update` function will be called with the `HelloFromJS` message.

```elm

-- UPDATE

update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        SomeOtherMsg ->
            …
        
        HelloFromJS messageFromJS ->
            { model | latesMessageFromJs = messageFromJS }



```

From here we will able to add it to our `Model`, or proceed to perform a side effect (`Cmd Msg`).