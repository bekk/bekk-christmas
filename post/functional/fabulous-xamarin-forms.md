---
calendar: functional
post_year: 2019
post_day: 11
title: Fabulous Xamarin Forms
authors:
  - Runar Ovesen Hjerpbakk
---
[Xamarin](https://dotnet.microsoft.com/apps/xamarin) is a well-known framework from Microsoft allowing you to use C# to write cross-platform apps for iOS, Android, Tizen and more. With Xamarin Forms, a cross-platform native UI-layer built on top of Xamarin itself, even the views and logic can be shared.

![Xamarin Forms Arcitechture](https://hjerpbakk.com/img/bekk-christmas/xamarin-forms.png)

This is great for the object-oriented guys and gals, but what about functionally oriented people? Good news! Xamarin supports F#, Microsoft's functional language, as a first-class citizen on the platform. And just like C#, F# can utilize the entire .Net ecosystem and gives us some exciting choices in regards to app architecture. MVC and MVVM are great for what they are, but haphazardly mutation of state easily leads to bugs and more complicated testing harnesses.

Luckily, with the power of F#, a better way exists

[Fabulous](https://github.com/fsprojects/Fabulous) is a fabulous framework for crafting apps with the ultra-simple Model-View-Update architecture, know from [Elm](https://elmprogramming.com/model-view-update-part-1.html) and [Flutter](https://buildflutter.com/functional-model-view-update-architecture-for-flutter/), using F# and Xamarin Forms.

![Model-View-Update Arcitechture](https://hjerpbakk.com/img/bekk-christmas/model-view-update.svg)

## Fabulous Arcitechture

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
