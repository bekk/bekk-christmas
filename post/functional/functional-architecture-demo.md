---
calendar: functional
post_year: 2020
post_day: 22
title: A Functional Architecture Demo
ingress: >-
  When I first started learning functional programming, I had already been
  programming for many years, mostly in object oriented languages the last
  decade. How would the architecture for a functional program look like?
  How can we avoid mutation, which is a cornerstone of OOP? How can
  functions be used as an abstraction?
links:
  - title: Demo repository
    url: >-
      https://github.com/simendsjo/functional-christmas-2020_functional-architecture-demo
authors:
  - Simen Endsjø
---

# Introduction

In this post, I'm going to show the design of a functional program which
solved a difficult problem while being easy to get right and performant.
By avoiding mutation, we were also able to implement "time-travel" to
look how an action would affect the future, easy rollbacks and stale
data detection.

In OOP, there are often deep call-stacks, which I consider a smell
itself, and mutation of state and side-effects often happen at a deep
level. When constructing an application which should be mostly pure with
immutable data, we have to push the side-effects up the call-stack to
the outer boundary. This means that we need to return to the caller
rather than keep diving deeper in the call-stack.

To recap some terminology:

pure  
Given the same arguments, it returns the same result. And it has no
effect (other than generating heat) on the outside world. This means no
visible mutation, and no visible side-effects.

immutable  
Once a value is set, it cannot be changed. "Mutation" is done by
constructing a new copy rather than modifying in place.

side-effect  
A modification to state outside the local environment.

There are some key parts in the architecture I'm demoing here:

State  
A record containing all state in the application

Operation  
A small language of verbs which describes changes to `State`

ApplicationEvent  
Some external event which should trigger changes to our state

Handler  
A function which maps from an `ApplicationEvent` to an `Operation`

You don't need an event driven application to take advantage of the
architecture in this post. Using just immutable state with pure
functions to change the state, will still yield most of the benefits.
Having events and a custom language might be a nice addition, or it
might be over-engineering.

Given the above parts, the flow of the application is then:

-   Something triggers an `ApplicationEvent`
-   `Handlers` translates to `Operations`
-   We run each `Operation` on the `State`, producing an updated `State`
-   We use the new state for fun and profit

When the new state is produced, we can act on the result by interpreting
the changes. We might validate the changes. We might save to the
database. We might detect stale data by rerunning the application. We
might use it for transactions. Our production implementation does all
this, not just without any side-effects or mutation, but **because**
there are no side-effects or mutations. We can safely rerun things,
throw away things, copy, interpret results, and there are never a chance
of introducing an error outside of our changes – Changes in one place
can never affect something else.


# Smaller demo

We'll go through the key parts of our [Small](https://github.com/simendsjo/functional-christmas-2020_functional-architecture-demo/blob/main/Small.fs) demo.
More/different comments are in the actual source file, so I encourage
you to look there as well.

The demo will model changes to an Order Line in an online shopping
chart. It's probably completely overkill for such use, but it's
difficult to create good examples – see an actual use-case in the Large
demo.

We can Add an OrderLine, we can Increment and Decrement the count, and
we can Remove an OrderLine. To make things a bit more interesting, I
also added a Reset and Add with another initial count than 1.

We'll use an integer as a unique id for the OrderLine, and a integer for
the actual count and initial value.

``` fsharp
type Key = int
type Value = int
```

## Defining a custom language for our domain

We encode the possible operations on an OrderLine using a Discriminated
Union (also called a Sum Type). These operations are the verbs in our
domain, and our Embedded Domain Specific Language (EDSL) for
manipulating OrderLine items.

Only Set is needed to support our described operations, but we create
some more constructs in our language. Putting more in the language will
make mapping events to operations simpler as the language is more
expressive, at the cost of a more complex language. It's difficult to
decide what goes in the language, and what should only be helper
functions. If you need to distinguish between different operations (e.g.
increment vs set) when interpreting the operations, having them as
separate operations might be a good idea.

``` fsharp
type Operation =
    | Set of (Key * Value)
    | Reset of Key
    | Remove of Key
    | Incr of Key
    | Decr of Key
```

## Application state as an immutable record

The State is where we hold information about all OrderItems. The state
includes things necessary to execute our lanugage. In addition, we keep
things which is convenient for other usecases, but could in theory just
as well be held in other structures. The `Audit` field is a list of all
operations which has been executed, which makes it easy to do things
like maintaining an audit log, persisting changes, detecting stale data,
rollback transactions, and so on.

Our last field, `LastPersisted`, is state for the interpreter which
persists changes to disk. Depending on the interpreter and application,
this state might be better to keep separate.

Having a single structure makes it easy to have a clean architecture
without much boilerplate (just `State -> State` functions), but it can
be difficult to find out what information is used where, and who changes
what. As with any decision, it's a tradeoff, but having a simple
architecture might be more beneficial than a clean separation of state –
remember, there is no mutation or side-effects in the functions which
operates on the state!

``` fsharp
type State = {
    Data : Map<Key, (Value * Value)> // (Initial, Current)
    Audit : Operation list
    LastPersisted : Operation
} with
    static member Empty = {
        Data = Map.empty
        Audit = []
        // Store an invalid value for simplicity rather than creating a NullObject, null, Option, empty list etc.
        LastPersisted = Remove -1
    }
```

## Helpers for "manipulating" state, i.e. State -&gt; State functions

As you start creating mappings from `ApplicationEvent` to `Operation`,
you'll quickly see patterns repeating for state querying and
manipulation. I like to extract these to helper functions as I go. For
our demo, I've created three helper functions.

Notice that the design here is to "never fail", and rather just return
sensible defaults instead. This of course depends on the application,
but this demo is modelled after our production application, which should
never fail to process an event.

``` fsharp
[<Literal>]
let defaultInitial = 1

// Get value or default if the key doesn't exist
let getValue (key : Key) (state : State) : (Value * Value) =
    state.Data
    |> Map.tryFind key
    |> Option.defaultValue (defaultInitial, defaultInitial)

// Set initial and value
let setInitialAndValue (key : Key) (initial : Value) (value : Value) (state : State) : State =
    { state with Data = Map.add key (initial, value) state.Data }

// Set only value. Note that we reuse both other functions
let setValue (key : Key) (value : Value) (state : State) : State =
    let initial, _ = getValue key state
    setInitialAndValue key initial value state
```

## Interpreting our language and executing on State

With the helper functions, we're now able to process our language. We'll
look at each operation, and manipulate the state accordingly. As a final
step, we log the operation we've executed. Even though we "execute" the
language, we're not mutating any existing state or doing any
side-effects. We're creating a new state as we go. It's thus important
that we use immutable/persistent datastructures that's fast for such
use, and that we're using them correctly e.g. by prepending to the list
rather than appending.

You might notice a `print` inside here, and scream SIDE-EFFECT! And yes,
it's true, but it's for demo purposes, and you shouldn't do this :)

``` fsharp
let execute (op : Operation) (state : State) : State =
    match op with
    | Set (key, value) ->
        setValue key value state
    | Reset key ->
        let initial, value = getValue key state
        setInitialAndValue key initial value state
    | Remove key ->
        { state with Data = Map.remove key state.Data }
    | Incr key ->
        let _, value = getValue key state
        setValue key (value + 1) state
    | Decr key ->
        let _, value = getValue key state
        setValue key (value - 1) state
    |> fun state ->
        printfn "Executed %A" op
        { state with Audit = op :: state.Audit }
```

## Interpreting our language and auditlog to persist to database

Now that we have a way of changing the state, we can write an
interpreter that runs side-effects. This simulates writing to a
database. Remember that this interpreter has its state in `State`, so it
has to return a copy of it. In Haskell, this would be a
`State -> IO State` function as it has side-effects, but in F\#, we just
do side-effects without help from the type-system. The interpreters can
be made more efficient by avoiding unnecessary work. \[Add 1, Remove 1\]
can be reduced to a noop.

``` fsharp
let persist (state : State) : State =
    state.Audit
    |> Seq.takeWhile (fun op -> not (obj.ReferenceEquals(op, state.LastPersisted)))
    |> Seq.rev
    |> Seq.fold (fun state op ->
        printfn "Saving %A" op
        { state with LastPersisted = op }
    ) state
```

## Mapping application events to our custom language

We still haven't hooked our implementation up to the outer application,
but let's do this now. The key part is our `Handler` function which does
the mapping. It can access the state in case it needs to look at
anything, and it returns an `Operation option` in case the
`ApplicationEvent` should trigger a change in the state. An alternative
implementation could return `Operation list` instead to support 0+
rather than just 0-1. For events which should trigger more than one
change, we can just write multiple handlers, which is what we did in our
production application. In retrospect, a list would have been more
expressive, and might have made some mappings more readable.

``` fsharp
type ApplicationEvent(key) =
    member val Key = key with get, set

type Handler = State -> ApplicationEvent -> Operation option
```

Given an event has happened in the application, we need a way to run
this through all possible handlers, accumulating the changes. This
implementation runs in sequence, where each handler will see the changes
done by the previous. Depending on the use-case, you might want to run
them in parallel, merging the result, or similar.

``` fsharp
let handle (handlers : Handler list) (ev : ApplicationEvent) (state : State) : State =
    printfn "handle %A" ev
    handlers
    |> Seq.fold (fun state handler ->
        handler state ev
        |> Option.map (fun op -> execute op state)
        |> Option.defaultValue state
    ) state
```

When we write handlers, we'll quickly notice some patterns, and we can
write helpers for these. As the handlers are functions, the helpers are
in the form of Higher Order Functions, which means functions that takes
functions as arguments and/or returns a new function as the result – our
helpers does both. For our usecase, we'll define two functions to avoid
writing too much type-casting. Our production application has helpers
down to the operations as many different events should trigger the same
operations.

``` fsharp
let onEventOptional<'ev, 'op when 'ev :> ApplicationEvent> ctor (handler : ('ev -> 'op option)) : Handler = fun _ ev ->
    if ev :? 'ev then
        handler (ev :?> 'ev)
        |> Option.map ctor
    else
        None

let onEvent<'ev, 'op when 'ev :> ApplicationEvent> ctor (handler : ('ev -> 'op)) : Handler = fun source ->
    onEventOptional<'ev, _> ctor (handler >> Some) source
```

Now we can create the mappings themselves. As our language is complex,
the handlers are simple. If the language was much smaller, complexity
would have to be pushed into helper functions and/or handlers. This is a
tradeoff, and there is probably no right or wrong answer. Think about
how this would relate to the programming languages you know. Simpler
programming languages, pushes the complexity to the users, while in more
expressive languages, the complexity can be hidden in libraries. We're
using the helpers here, but there's nothing wrong with dropping down a
level when needed.

Our events is very simple

``` fsharp
type OrderLineCreated(key) =
    inherit ApplicationEvent(key)

type OrderLineWithInitialValueCreated(key, value) =
    inherit ApplicationEvent(key)
    member val Value = value with get,set

type OrderLineRemoved(key) =
    inherit ApplicationEvent(key)

type OrderLineReset(key) =
    inherit ApplicationEvent(key)

type OrderLineProductAdded(key) =
    inherit ApplicationEvent(key)

type OrderLineProductRemoved(key) =
    inherit ApplicationEvent(key)
```

And as the events map nicely to our language, the handlers are also
simple.

``` fsharp
let handlers : Handler list = [
    onEvent<OrderLineCreated, _>
        Set
        (fun ev -> (ev.Key, defaultInitial))
    onEvent<OrderLineWithInitialValueCreated, _>
        Set
        (fun ev -> (ev.Key, ev.Value))
    onEvent<OrderLineReset, _>
        Reset
        (fun ev -> ev.Key)
    onEvent<OrderLineProductAdded, _>
        Incr
        (fun ev -> ev.Key)
    onEvent<OrderLineProductRemoved, _>
        Decr
        (fun ev -> ev.Key)
]
```

## Demoing our implementation

And that should be everything needed to support our application. We can
test it by running some events through the system. We first create a
couple of orderlines and does some changes to them. We then persist the
result, and finally do some more changes and persist again. We'll see
that the second persist will only process the new changes.

``` fsharp
printfn "Demo Small"
printfn "=========="
let events : ApplicationEvent list =
    [
    OrderLineCreated 1 // 1
    OrderLineProductAdded 1 // 2

    OrderLineWithInitialValueCreated (2, 2)
    OrderLineProductAdded 2 // 3
    OrderLineReset 2 // 2
    ]

printfn "Processing application events: %A" events

let oldState = State.Empty
let newState =
    events
    |> Seq.fold (fun state ev -> handle handlers ev state) oldState
let newState = persist newState
printfn "State: %A" newState

let oldState = newState
let events : ApplicationEvent list =
    [
        OrderLineProductRemoved 2 // 1
    ]

printfn ""
printfn "Processing application events: %A" events
let newState =
    events
    |> Seq.fold (fun state ev -> handle handlers ev state) oldState
let newState = persist newState
printfn "Old state: %A" oldState
printfn "New state: %A" newState
```

The output from the demo application

``` example
Demo Small
==========
Processing application events: [Small+OrderLineCreated; Small+OrderLineProductAdded;
 Small+OrderLineWithInitialValueCreated; Small+OrderLineProductAdded;
 Small+OrderLineReset]
handle Small+OrderLineCreated
Executed Set (1, 1)
handle Small+OrderLineProductAdded
Executed Incr 1
handle Small+OrderLineWithInitialValueCreated
Executed Set (2, 2)
handle Small+OrderLineProductAdded
Executed Incr 2
handle Small+OrderLineReset
Executed Reset 2
Saving Set (1, 1)
Saving Incr 1
Saving Set (2, 2)
Saving Incr 2
Saving Reset 2
State: { Data = map [(1, (1, 2)); (2, (1, 3))]
  Audit = [Reset 2; Incr 2; Set (2, 2); Incr 1; Set (1, 1)]
  LastPersisted = Reset 2 }

Processing application events: [Small+OrderLineProductRemoved]
handle Small+OrderLineProductRemoved
Executed Decr 2
Saving Decr 2
Old state: { Data = map [(1, (1, 2)); (2, (1, 3))]
  Audit = [Reset 2; Incr 2; Set (2, 2); Incr 1; Set (1, 1)]
  LastPersisted = Reset 2 }
New state: { Data = map [(1, (1, 2)); (2, (1, 2))]
  Audit = [Decr 2; Reset 2; Incr 2; Set (2, 2); Incr 1; Set (1, 1)]
  LastPersisted = Decr 2 }
```

## Concluding remarks

This concludes our little demo, with an architecture which is pure,
immutable, and side-effect free. The side-effects is pushed to the
boundaries, making the core of the application easy to test and make bug
free. [Check out the repository](https://github.com/simendsjo/functional-christmas-2020_functional-architecture-demo) for some code and the larger demo based
on the production application. If you're interested in learning more
about F\#, I wrote a short post with various useful links at the
[Getting Started With F\#](https://functional.christmas/2020/17)
calendar post.
