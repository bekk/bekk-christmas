---
calendar: functional
post_year: 2020
post_day: 21
title: Using F# in Xamarin Apps
description: "F# is not a natural drop-in replace for C# when writing mobile
  apps, but rather an excellent option for modeling our domain. Giving
  expressive power, ease of testing and clean code where it matters the most:
  the business rules and their data."
---
My first post in this year's calendar on [some improved functional aspects of C#](https://functional.christmas/2020/5) was immediately met with some [well deserved snark](https://www.reddit.com/r/csharp/comments/k749sf/functional_c/geotkbc):

![F# asks; am I joke to you?](https://hjerpbakk.com/img/christmas/am-i-a-joke.png)

Well, no, but I still love C# more 😘

However, [F#](https://functional.christmas/2020/17) is a fun and well-designed language with a loyal following, OK tooling support from Microsoft and has one great advantage over other primarily functional languages: *the entire .Net ecosystem is available to us*! And this naturally includes Xamarin and the power to easily write modern mobile apps using your favorite language.

![Four important concepts](https://hjerpbakk.com/img/christmas/four-concepts.png)

As a language F# has a couple of striking benefits over C#:

- The concise syntax makes it easier to focus on what matters instead of boiler plate code
- The really expressive type system makes domain modeling a breeze with more options than C# and with perhaps even more correctness
- My beloved immutability has always been a staple of F#
- And as a functional first language, all the nice functional patterns are available to us in a natural way

<h2>Mobile development with F#</h2>

Getting started is as easy as downloading Visual Studio and choosing F# as our language of choice in the `New Project` wizard.

![File -> New F# Project](https://hjerpbakk.com/img/christmas/new-fsharp-project.png)

With the tooling in place, what advantages will F# give us on mobile?

On the naive face of it, not much.

Take iOS for example, with its heavy use of MVC. Consider the following example of a `ViewController` containing a pristine green background with a simple heartfelt label:

```fsharp
open System
open Foundation
open UIKit

[<Register ("ViewController")>]
type ViewController (handle:IntPtr) =
    inherit UIViewController (handle)

    override x.ViewDidLoad () =
        base.ViewDidLoad ()
        let label = new UILabel(x.View.Frame)
        label.BackgroundColor <- UIColor.Green // Mutation
        label.Text <- "F# ❤️" // Mutation
        x.View.Add label
```

One screen, one color, one label and **TWO mutations**.

A discourageable start, but there is hope.

## All in with MVU

A year ago, I wrote about using the [Fabulous framework and MVU pattern](https://functional.christmas/2019/11) on this very blog, thus making mobile go fully functional.

As fabulous as Fabulous can be, this road requires commitment. From us, our team and preferably out organization too! The thinking behind MVU is markedly different from MVVM or MVC and needs to be understood for the pattern to be more effective and less error prone than its older friends.

MVU is best utilized in a green field setting or within logically self-contained parts of the app.

## The .Net advantage

Since F# easily interfaces with other .Net languages, we don't need to go all in.

A safe introduction to mobile development with F# is to model the domain using F#, and use C# (and XAML) to describe and interact with the UI-layer. In MVVM and MVC both, the *M* might better be described by [F#'s richer type system](https://viktorvan.github.io/fsharp/domain-modeling-with-fsharp/).

In addition, this approach is easier on our peers, since modeling in F# can be done piecemeal even in mature code bases. Should be an easy sell!

## Conclusion

To summarize, both iOS' and Android's UI frameworks are naturally object oriented, same for Xamarin Forms. Thus, F# is not a natural drop-in replace for C# when writing mobile apps, but rather an excellent option for modeling our domain. Giving expressive power, ease of testing and clean code where it matters the most: the business rules and their data.

Unless off course we go [Full Elmish](https://www.elm.christmas/2020).
