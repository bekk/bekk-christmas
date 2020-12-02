---
calendar: elm
post_year: 2020
post_day: 21
title: "WIP: Inbound ports"
ingress: What if your application needs frequent real-time updates, like
  messages posted by other users? We probably want to use some kind of
  websocket? How do we go about receiving messages sent from a websocket into
  the Elm lifecycle? We use inbound ports🌈
---
If we are in need of communication with a websocket, we need to communicate with the JavaScript outside of our elm code. Ports in elm are designed to do just that. 

This will be our `index.html` file that contain our application
```html
<!DOCTYPE HTML>
<html>

<head>
  <meta charset="UTF-8">
  <title>🎅Elm🎅</title>
</head>

<body>
    <div id="myapp"></div>
</body>

<script type="text/javascript">
<!-- This is where we write our javascript code! -->
</script>

</html>
```
Between the `script` html tags is where we will write our JavaScript code and initialise our elm app through initialising our `Main.elm` file. 
Along with the initialisation of our elm program we will need to create our websocket, and also set up communication between this and our elm program.
First we will set up what we need in our `index.html` file before venturing into our elm program and make sure we receive the messages there.

We initialise our elm program and initialise our websocket that we want to communicate with, within the html `script` tags in our `index.html`.
```
<script type="text/javascript">
const app = Elm.Main.init({
});

const socket = new WebSocket('wss://friend.network.app.org');

socket.addEventListener("message", function(event) {
    app.ports.messageReceiver.send(event.data);
});

</script>
```
Lastly we set up our communication between the elm program and the websocket. This last code snippet connects to a port within the elm code which then has the responsibility of handling the message received.

Now, let's get into our elm code and make sure we listen for the messages coming to our yet to be defined port, and handle these correctly.

```elm
port messageReceiver : (String -> msg) -> Sub msg
```
