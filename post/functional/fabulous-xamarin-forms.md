---
calendar: functional
post_year: 2019
post_day: 11
title: Fabulous Xamarin Forms
links:
  - title: Getting Started
    url: >-
      https://fsprojects.github.io/Fabulous/Fabulous.XamarinForms/index.html#getting-started
  - title: Example GitHub repo
    url: 'https://github.com/Sankra/fabulous-xamarin-forms'
authors:
  - Runar Ovesen Hjerpbakk
---
[Xamarin](https://dotnet.microsoft.com/apps/xamarin) is a well-known framework from Microsoft allowing you to use C# to write cross-platform apps for iOS, Android, Tizen and more. With Xamarin Forms, a cross-platform native UI-layer built on top of Xamarin itself, even the views and logic can be shared.

![Xamarin Forms Architecture](https://hjerpbakk.com/img/bekk-christmas/xamarin-forms.png)

This is great for the object-oriented guys and gals, but what about functionally oriented people? Good news! Xamarin supports F#, Microsoft's functional language, as a first-class citizen on the platform. And just like C#, F# can utilize the entire .Net ecosystem and gives us some exciting choices in regards to app architecture. MVC and MVVM are great for what they are, but haphazardly mutation of state easily leads to bugs and more complicated testing harnesses.

Luckily, with the power of F#, a better way exists

[Fabulous](https://github.com/fsprojects/Fabulous) is a fabulous framework for crafting apps with the ultra-simple Model-View-Update architecture, know from [Elm](https://elmprogramming.com/model-view-update-part-1.html) and [Flutter](https://buildflutter.com/functional-model-view-update-architecture-for-flutter/), using F# and Xamarin Forms.

![Model-View-Update Architecture](https://hjerpbakk.com/img/bekk-christmas/model-view-update.svg)

## Fabulous Architecture

```fsharp
type Msg =
    | ...

/// The model from which the view is generated
type Model = 
    { ... }

/// Returns the initial state
let init() = { ... }

/// The funtion to update the view
let update (msg:Msg) (model:Model) = ...

/// The view function giving updated content for the page
let view (model: Model) dispatch = ...

type App () as app = 
    inherit Application ()

    let runner = 
        Program.mkSimple init update view
        |> Program.withConsoleTrace
        |> XamarinFormsProgram.run app
```

### Fabulous Model

The `Model` is the core data from which the whole state of the app can be resurrected. The `init` function returns your initial model. The update function updates the model as messages are received.

### Fabulous view function

The `view` function computes the GUI using the given model. The GUI consists of an immutable object graph of the Xamarin Forms views and controls to be used.

### Fabulous update function

Each model has an `update` function for message processing. The messages are either messages from the `view` or from external events. From these, a new model can be computed.

## Fabulous example

The following is a complete example of an app, the source is [available on github](https://github.com/Sankra/fabulous-xamarin-forms).

<video width="295" height="640" controls>
  <source src="https://hjerpbakk.com/img/bekk-christmas/app.MP4" type="video/mp4">
</video>

```fsharp
namespace FabulousApp

open Fabulous
open Fabulous.XamarinForms
open Xamarin.Forms

module App = 
    type Model = 
      { Count : int
        Step : int
        TimerOn: bool }

    type Msg = 
        | Increment 
        | Decrement 
        | Reset
        | SetStep of int
        | TimerToggled of bool
        | TimedTick

    let initModel = { Count = 0; Step = 1; TimerOn = false }

    let init () = initModel, Cmd.none

    let timerCmd =
        async { do! Async.Sleep 200
                return TimedTick }
        |> Cmd.ofAsyncMsg

    let update msg model =
        match msg with
        | Increment -> { model with Count = model.Count + model.Step }, Cmd.none
        | Decrement -> { model with Count = model.Count - model.Step }, Cmd.none
        | Reset -> init ()
        | SetStep n -> { model with Step = n }, Cmd.none
        | TimerToggled on -> { model with TimerOn = on }, (if on then timerCmd else Cmd.none)
        | TimedTick -> 
            if model.TimerOn then 
                { model with Count = model.Count + model.Step }, timerCmd
            else 
                model, Cmd.none

    let view (model: Model) dispatch =
        View.ContentPage(
          backgroundColor = Color.White,
          content = View.StackLayout(padding = Thickness 20.0, verticalOptions = LayoutOptions.Center,
            children = [ 
                View.Label(text = sprintf "%d" model.Count, fontSize = FontSize.Named(NamedSize.Title), horizontalOptions = LayoutOptions.Center, width=200.0, horizontalTextAlignment=TextAlignment.Center)
                View.Button(text = "Increment", command = (fun () -> dispatch Increment), horizontalOptions = LayoutOptions.Center)
                View.Button(text = "Decrement", command = (fun () -> dispatch Decrement), horizontalOptions = LayoutOptions.Center)
                View.Label(text = "Timer", horizontalOptions = LayoutOptions.Center)
                View.Switch(isToggled = model.TimerOn, toggled = (fun on -> dispatch (TimerToggled on.Value)), horizontalOptions = LayoutOptions.Center)
                View.Slider(minimumMaximum = (0.0, 10.0), value = double model.Step, valueChanged = (fun args -> dispatch (SetStep (int (args.NewValue + 0.5)))), horizontalOptions = LayoutOptions.FillAndExpand)
                View.Label(text = sprintf "Step size: %d" model.Step, horizontalOptions = LayoutOptions.Center) 
                View.Button(text = "Reset", horizontalOptions = LayoutOptions.Center, command = (fun () -> dispatch Reset), commandCanExecute = (model <> initModel))
            ]))
            
    let program = Program.mkProgram init update view

type App () as app = 
    inherit Application ()

    let runner = 
        App.program
        |> XamarinFormsProgram.run app
```

## Fabulous advantages

Using immutable models, this architecture has a couple of advantages:

- The `init`, `update` and `view` functions can be easily tested in isolation
- Models can be easily saved and restored
- Business logic is performed consistently, no need to understand the sum of a host of smaller interdependent changes

And off course, Fabulous supports [Live Update](https://fsprojects.github.io/Fabulous/Fabulous.XamarinForms/tools.html), enabling you to make and see the effect of these changes in the simulator without redeploying the app.

<video width="640" height="353" controls>
  <source src="https://hjerpbakk.com/img/bekk-christmas/live-update-1080.mp4" type="video/mp4">
</video>

Xamarin Forms can truly be fabulous.
