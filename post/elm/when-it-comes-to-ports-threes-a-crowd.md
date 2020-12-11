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

And on the Elm side of our code:

```elm

```