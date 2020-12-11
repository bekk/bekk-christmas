---
calendar: elm
post_year: 2020
post_day: 23
title: When it comes to ports, three's a crowd.
image: https://images.unsplash.com/photo-1568558100488-e5f38185a9d4?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=3072&q=80
ingress: Now that you've learned how to define both incomming and outgoing
  ports, you might wonder how many of them you need. It might seem reasonable to
  require two ports for each javascript function you wish to call, but what if I
  told you'll need, at most, two for the entire application?
description: Elm dual port pattern
links:
  - title: The importance of ports, by Murphy Randle
    url: https://www.youtube.com/watch?v=P3pL85n9_5s
authors:
  - Robin Heggelund Hansen
---
Now that you know about ports you might be wondering how you'd make use of them in an actual application. For the sake of this article, lets pretend that we're going to implement a todo application. We dont't want our todos to dissapear every time you leave the application, so we've decided to write a little bit of javascript to store our todos in local storage:

```javascript
function getTodos() {
    return JSON.parse(localStorage.get('todos') || '{}');
}

function saveTodo(text) {
    const id = JSON.parse(localStorage.get('index') || '0') + 1;
    const todos = getTodos();

    todos[id] = { 'id': id, 'text': text };

    localStorage.put('index', id);
    localStorage.put('todos', JSON.stringify(todos));
}

function deleteTodoById(id) {
    const todos = getTodos();
    delete todos[id];
    localStorage.put('todos', JSON.stringify(todos));
}
```

To access this code from the Elm side of our application, we'll need to use ports. One way to wrap this javascript code looks like this:

```javascript
import { Elm } from 'Main.elm';

const app = Elm.Main.init({});

app.ports.getTodos.subscribe(() => {
    const todos = getTodos();
    app.ports.getTodosComplete.send(todos);
});

app.ports.saveTodo.subscribe((text) => {
    saveTodo(text);
    app.ports.saveTodoComplete.send([]);
});

app.ports.deleteTodoById.subscribe((id) => {
    deleteTodoById(id);
    app.ports.deleteTodoByIdComplete.send([]);
});
```

And on the Elm side of our code we need to define our ports:

```elm
port getTodos : () -> Cmd msg
port getTodosComplete : (Json.Encode.Value -> msg) -> Sub msg

port saveTodo : String -> Cmd msg
port saveTodoComplete : (() -> msg) -> Sub msg

port deleteTodoById : Int -> Cmd msg
port deleteTodoByIdComplete : (() -> msg) -> Sub msg
```

For the sake of brevity, I'll leave out the Elm code which shows the actual implementation. We should have covered that in the past two days.

While this works, you're probably thinking that this is _a lot_ of work for wrapping three functions. Is this really how javascript interop is supposed to work?

The answer to that is yes, and no. Yes, all javascript integration is supposed to happen through ports but no, it's not supposed to be this much work. What we need to do is to think a bit differently about how we should interop with our javascript code. Instead of wrapping each and every function, what should do instead is to treat javascript as a service. A service with a well defined API, and which responds by sending us messages about important things.

Take a look at the javascript code again. Is it really important to get a message each time one function has successfully run? Probably not. In fact, the only thing we really care about is the state of our todos. A better setup of ports is:

```elm
port loadTodos : () -> Cmd msg
port saveTodo : String -> Cmd msg
port deleteTodoById : Int -> Cmd msg

port todosUpdated : (Json.Encode.Value -> msg) -> Sub msg
```

So you see that by changing our mindset a little, we can reduce the number of ports we need. This is good for several reasons:

* Ports are not namespaced. Two ports with the same name, even when defined in different Elm modules, will cause one to overwrite the other.
* Having many ports might make it difficult to keep track of how an application makes use of javascript.

Actually, when looking at the one subscription we have left, you might realize that we don't actually need more ports than two: one for outgoing messages and one for incomming messages.

Since you can send and receive json with ports, you can send any number of complex messages into and out of Elm. You also get greater control when encoding/decoding json. You can ignore values or be more strict, or even less strict, about what you expect from incomming values.

## Conclusion

When working with ports it's important to not be too specific. Clearly define your API, and only implement messages that actually matter to your application. At the same time, having many ports do not scale well. Try to keep to as few ports as you can. Remember, you only ever _need_ two.