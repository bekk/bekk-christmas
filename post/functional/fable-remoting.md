---
calendar: functional
post_year: 2020
post_day: 6
title: Fable Remoting
image: https://unsplash.com/photos/0qn41654miY
ingress: ""
---
I am a big fan of F#
It is very enjoyable to code in and I really like its domain modelling capabilities.
You can use it for fullstack development and easily share code between the front and back end.
Lets take a look at Fable remoting, a really interesting way of doing this.

This is how Fable remoting is described on its [github page](https://github.com/Zaid-Ajaj/Fable.Remoting).

> \[...] it abstracts away Http and Json and lets you think of your client-server interactions only in terms of pure stateless functions that are statically checked at compile-time

Basicly what this means is that you don´t have to deal with HTTP calls, serializing or deserializing models, you just have to deal with functions.

I will assume some familiarity with F# and model-view-update (the Elm architecture). I will, however, add some great F# resources at the bottom of this article.

We will scaffold the project with [SAFE-Stack](https://safe-stack.github.io/).
This will give us a fullstack project that has a nice and simple todo list set up with fable remoting, this todo list is what we will be editing.

Our project has an assortment of files. One of them `shared.fs` is where the code shared between client and server lives. Lets take a look at it.

The very first thing in this file is the record defining our todo type. 

```fsharp
// shared.fs
type Todo =
    { Id : Guid
      Description : string }
```

Nice and simple! We also have a module that lets us validate and create our todos.

Then there's the following, which is used to create the routes that Fable remoting will be using to perform requests for us.

```fsharp
// shared.fs
module Route =
    let builder typeName methodName =
        sprintf "/api/%s/%s" typeName methodName
```

And finally the interface defining our API.

```fsharp
// shared.fs
Type ITodosApi =
    { getTodos : unit -> Async<Todo list>
      addTodo : Todo -> Async<Todo> }
```

As you can see the todo list supports two operations already.

* `getTodos` which takes no arguments and returns a list of todos.
* `addTodo` which takes a todo as input and returns the newly created todo.

Now lets take a look at how the frontend uses this.

### Frontend

In `Index.fs` we have a todo API:

```fsharp
// index.fs
let todosApi =
    Remoting.createApi()
    |> Remoting.withRouteBuilder Route.builder
    |> Remoting.buildProxy<ITodosApi>
```

This creates the API so it is ready for the client to use.
We can see the first example of how to use it in the `init` function.

```fsharp
// index.fs
let init(): Model * Cmd<Msg> =
  let model =
       { Todos = []
         Input = "" }
   let cmd = Cmd.OfAsync.perform todosApi.getTodos () GotTodos
   model, cmd
```

This sets up the MVU model and asks the backend for all the todos.
Once this async function is resolved the `GotTodos` command is executed. 
In `GotTodos` is also where the todos gets stored in our model.

Performing requests with Fable remoting is that easy!
No strings, no serialization, no deserialization, none of that boring stuff!
It's just a function call and it is all type safe!

Time to look at the backend.

### Backend

The server needs to implement the API-interface defined in the shared file.
And we can find that implementation in `Server.fs`

```fsharp
// server.fs
let todosApi =
    { getTodos = fun () -> async { return storage.GetTodos() }
      addTodo =
        fun todo -> async {
            match storage.AddTodo todo with
            | Ok () -> return todo
            | Error e -> return failwith e
        } }
```

This is an implementation of the interface defined in the shared file.
In this example all the functions are declared within the type, but they could just as well be separate as long as they match the interface.

So before we head on lets do a quick recap:

* We saw the model defining our todos - this is what we will send backwards and forwards in our app.
* There is a function that creates and handles the routes for us
* Explored the interface defining what functions we can use to interact with the server
* Saw the interace implementation on the server!

Cool! Now that we are all caught up lets start editing this API and expanding it a little bit.
Here we go... Lets delete a todo!

### Deletion time

Lets start by adding a function to the interface in `Shared.fs`.

```fsharp
// shared.fs
type ITodosApi =
    { getTodos : unit -> Async<Todo list>
      addTodo : Todo -> Async<Todo>
      deleteTodo : Guid -> Async<Guid>}
```

Our interface now supports deletion!
All the functions we define in this interface have to return an async and we want to know if the delete succeeded. So we return the `guid` of the deleted todo item if it succeeds.

In order to make the backend delete todos we need to edit the storage class SAFE Stack provided for us. 
So we add this function right here. For more context on this class feel free to checkout the [code](<>) on github.

```fsharp
// shared.fs
member __.DeleteTodo (id: Guid) =
    let toDelete = todos.Find(fun x -> x.Id = id)
    let deletedTodo = todos.Remove(toDelete)
    if deletedTodo then
        Ok id
    else
        sprintf "Unable to delete todo with GUID: %A" id
        |> Error
```

Here we try to find a todo with the same GUID as we passed in. If we find one we try to remove it from our list.
If it is removed wrap the Id into an `Ok` type and return. Otherwise we return an `Error`.

The only thing missing from having a finished API is implementing the delete function itself.
All it has to do is call the call the delete method on the storage class.
In reality this could be editing a database or whatever else you fancy.

```fsharp
// shared
let todosApi =
    { getTodos = fun () -> async { return storage.GetTodos() }
      addTodo =
        fun todo -> async {
            match storage.AddTodo todo with
            | Ok () -> return todo
            | Error e -> return failwith e
        }
      // Our function starts here
      deleteTodo =
          fun id -> async {
              match storage.DeleteTodo(id) with
              | Ok _ -> return id
              | Error e -> return failwith e
      }
    }
```

Now we need to reflect these changes in the frontend.
We need some new commands so we can call our function and delete a todo from the list.
In `Index.fs` we change the `Msg` type

```fsharp
// index
type Msg =
    | GotTodos of Todo list
    | SetInput of string
    | AddTodo
    | AddedTodo of Todo
    | DeleteTodo of Guid // Called when we click the delete button
    | DeletedTodo of Guid // Called when we get a reply from the server
```

We now have 2 new commands to implement in the `update` function. They look like this.

```fsharp
// index.fs
| DeleteTodo id ->
    let cmd = Cmd.OfAsync.perform todosApi.deleteTodo id DeletedTodo
    model, cmd
| DeletedTodo id ->
    let todosAfterRemove = List.filter (fun x -> x.Id <> id ) model.Todos
    { model with Todos = todosAfterRemove }, Cmd.none
```

Again we use the endpoint with the same pattern. We call the function, and when it resolves, perform a command.

Finally we need to have some way of actually calling this function and deleting it from the view.

In the `containerBox` function we list each todo and we want to add a button there.
Lets also add some inline styling (you might want to look away).

```fsharp
// index.fs
for todo in model.Todos do
    div [ Style [ Display DisplayOptions.Flex; Custom("justify-content", "space-between"); MarginBottom 10 ] ]
        [
            li [] [ str todo.Description ]
            Button.button [
                Button.Color IsDanger
                Button.Size IsSmall 
                // This is where we delete
                Button.OnClick (fun _ -> DeleteTodo todo.Id |> dispatch)
            ] [ str "X"  ]
        ]
```

And that's it.
Here we have it. We added a delete route for our todos.

Heres a quick demo!


![Deletion demo](assets/working.gif)

It is important to keep in mind that under the hood this is just normal HTTP requests going backwards and forwards. That means you can still test them using Postman and similar tools.

Finally another pretty cool thing we can do is document our api and get a nice overview of it - kind of like swagger.
The following is a really simple documentation that can be accessed at `localhost:8085/api/todos/docs`

```
// server.fs
let docs = Docs.createFor<ITodosApi>()
let todosApiDocs =
    Remoting.documentation "Todos Api"
        [
            docs.route <@ fun (api: ITodosApi) -> api.getTodos @>
            |> docs.alias "Get all todos"
            |> docs.description "Returns a list of all todos"

            docs.route <@ fun (api: ITodosApi) -> api.addTodo @>
            |> docs.alias "Add new todo"
            |> docs.description "Adds a new todo item to the list"

            docs.route <@ fun (api: ITodosApi) -> api.deleteTodo @>
            |> docs.alias "Delete a todo"
            |> docs.description "Removes a todo item from the list"
        ]
```

![Docs demo](assets/docs.gif)

### And thats it!

Let do a quick recap of what we did:

* Scaffolded a project with SAFE stack. This gave us a project with a client and server.
* We added a function definition to the API interface.
* Added an implementation of said interface on our backend.
* Added a button that called our new function on the frontend.
* At no point did we create any extra create or write models, we just used the one domain model we defined.

While being a simple example of using Fable remoting. I think it is clear to see how you can communicate between client and server without having to worry about serialization, deserialization, misspelling your path name - or anything like that!
It is simply defining and implementing a common interface and calling those functions, oh and did I mention that its all type safe?
You can just focus on your domain models and doman logic.
I find it really neat!
Hopefully you found it interesting too!

Check the source code for this [github](https://github.com/Bjorn-Strom/Holiday)

If you want to read more about Fable Remoting you can check out [this blog post](https://github.com/Zaid-Ajaj/Fable.Remoting) by the author of Fable Remoting Zaid Ajaj or go check out [SAFE stack](https://safe-stack.github.io/).

Zaid has also written an [excellent and free book](https://zaid-ajaj.github.io/the-elmish-book/#/) about Elmish, If you want to learn more I suggest you go take a look!