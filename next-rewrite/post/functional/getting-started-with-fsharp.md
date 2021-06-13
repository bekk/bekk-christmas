---
calendar: functional
post_year: 2020
post_day: 17
title: Getting started with F#
ingress: >-
  F# is a fun and mature functional-first programming language for the .NET platform. Taking the first steps to learn a new language can be daunting, so in this post, we'll give some pointers on where to start.
links:
authors:
  - Simen Endsjø
---

Getting started with F\#
========================

The JVM has a long tradition for hosting other lanugages than Java, and
it even has some functional languages like Scala, Kotlin and Eta
(Haskell). For CLR (.NET), there aren't as many choices, but the one it
has is mature and a joy to use.

Description from [fsharp.org](https://fsharp.org)

> F\# is a mature, open source, cross-platform, functional-first
> programming language. It empowers users and organizations to tackle
> complex computing problems with simple, maintainable and robust code.

And from
[Wikipedia](https://en.wikipedia.org/wiki/F_Sharp_(programming_language))

> F\# is a functional-first, general purpose, strongly typed,
> multi-paradigm programming language that encompasses functional,
> imperative, and object-oriented programming methods. F\# is most often
> used as a cross-platform Common Language Infrastructure (CLI) language
> on .NET Core, but it can also generate JavaScript and graphics
> processing unit (GPU) code.

F\# is a language in the ML-family, but borrows from other languages as
well. While multi-paradigm, it has been designed to make functional
programming the preferred paradigm. It is a very practical language with
great interop with .NET and C\#, so all the APIs and libraries you
already know can be used. It has also always been developed in the open,
and has a strong open-source community around it.

Several features of F\# should also be somewhat familiar to modern C\#
programmers as C\# has borrowed/been inspired by several features from
F\#. Async/await, pattern matching and records to name a few. I salute
C\# for these efforts, but it's difficult to retroactively add such
features in a non-breaking way while gaining all the benefits. So these
new features have a much cleaner design in F\#, and there are yet
features C\# haven't gained.

While there might be areas where F\# especially shine, for me, it's a
general purpose language which fits business applications really well.
It makes it easy to model domains in a way that's easy to read and
reason about, while being robust and easy to change. Scott Wlaschin has
a serie on [Why Use
F\#](https://fsharpforfunandprofit.com/posts/why-use-fsharp-intro/)
which I wont try to replicate here, but might act as a nice starting
point to see some of the benefits of the language and paradigm. If
you're more into examples, my [upcoming post about functional
architecture](https://functional.christmas/2020/22) (broken link until
December 22nd) will demo an application using several key F\# features
to model a pure, functional architecture.

Everyone takes a different approach to learning, so I won't try to teach
F\# here, but rather give some links to work as possible starting
points.

The main entry-point for F\# would be the main website,
[fsharp.org](https://fsharp.org/). This is a treasure trove of links,
and I'm pretty sure you can find direct links for everything I'm posting
here from that site. From the [about
page](https://fsharp.org/about/index.html), you'll find links to guides
and more.

The quickest way to test code is using one of the online environments
like the old [try.fsharp.org](https://try.fsharp.org/) or the newer
[tryfsharp.fsbolero.io](https://tryfsharp.fsbolero.io/), which is made
with Bolero (Blazor for F\#). For those wishing to use a local editor,
there are plenty of editors available, with popular choices being
[Visual Studio](https://visualstudio.microsoft.com/vs/community/)
(remember to enable it), [Project
Rider](https://www.jetbrains.com/rider/), [Ionide](https://ionide.io/)
for VSCode and Vim and
[fsharp-mode](https://github.com/fsharp/emacs-fsharp-mode) for Emacs.

The latest version, F\# 5.0, which was released together with .NET 5.0,
and had a [strong focus on interactive
programming](https://devblogs.microsoft.com/dotnet/announcing-f-5/) (see
[.NET Interactive](https://github.com/dotnet/interactive)), so you can
use [Jupyter
notebook](https://mybinder.org/v2/gh/dotnet/interactive/main?urlpath=lab),
nteract and [VSCode
Notebooks](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.dotnet-interactive-vscode).
Together with it's static type system, and easy and terse syntax, it's a
good fit data analysts and non-developers.

When I first started with functional programming and F\#, I found [Scott
Wlaschins F\# for fun and profit](https://fsharpforfunandprofit.com/)
was filled with indispensable resources, and probably one of the biggest
reasons I really got into FP.

In addition to fsharp.org, Microsoft is officially supporting the
language, and therefore also has plenty of resources from the entrypoint
at [dot.net](https://dotnet.microsoft.com/learn/fsharp/).

While you can use all .NET libraries, there are also plenty of libraries
which has been created to play on the strengths of F\#. fsharp.org has a
nice [overview of the community and the
projects](https://fsharp.org/community/projects/) with links to
important projects, the [F\# Community Project Incubation
Space](https://github.com/fsprojects) and the [Awesome F\#
list](https://github.com/fsprojects/awesome-fsharp) (which has
additional links at the bottom).

To stay up to date on what's going on in the F\# world, I follow [Sergey
Tihons F\# Weekly](https://sergeytihon.com/), which is a nice and
thorough weekly aggregation.

So hopefully this will give you something to look at and play with if
you're interested in a mature, practical and fun programming language.
