---
calendar: functional
post_year: 2020
post_day: 4
title: The case for Elixir
ingress: Today I want to give you an introduction to the programming language
  Elixir, some of its features and why you might want to check it out!
links:
  - url: https://www.youtube.com/watch?v=zL2wcqS78UA
    title: "Video: Why we adopted Elixir"
  - url: https://blog.discord.com/scaling-elixir-f9b8e1e7c29b
    title: "Elixir at Discord: Scaling Elixir"
  - title: "Video: Intro to OTP"
    url: https://www.youtube.com/watch?v=CJT8wPnmjTM
  - url: https://www.fastcompany.com/3026758/inside-erlang-the-rare-programming-language-behind-whatsapps-success
    title: "Erlang at Whatsapp: Inside Erlang, The Rare Programming Language Behind
      WhatsApp’s Success"
authors:
  - Harald Ringvold
---
## The basics

First things first: Elixir is a concurrent functional language that runs on the Erlang VM. It is inspired by many different languages where Ruby and Erlang are most obvious ones based on the syntax.

Elixir is a [strong, dynamically typed language](https://thinkingelixir.com/elixir-in-the-type-system-quadrant/). This puts it in the same category as Ruby and Python and it has optional functionality for compile time type checking as well.Elixirs data structures are immutable, but variables can be reassigned/rebound. <sup>[^rebinding]</sup> This was a bit strange for me in that I got started with FP through Elm where there are no variables, just constants.

Elixir inherits a lot its data structures and related syntax from Erlang which in many ways is its biggest influence. [Elixir Design Goals](https://elixir-lang.org/blog/2013/08/08/elixir-design-goals/) describes the relation to Erlang like this:

> Elixir is meant to be compatible with the Erlang VM and the existing ecosystem. When we talk about Erlang, we can break it into three parts:
>
> * A functional programming language, called Erlang
> * A set of design principles, called OTP (Open Telecom Plaform)
> * The Erlang Virtual Machine, referred to as EVM or BEAM
>
> Elixir runs in the same virtual machine and is compatible with OTP. Not only that, all the tools and libraries available in the Erlang ecosystem are also available in Elixir, simply because there is no conversion cost from calling Erlang from Elixir and vice-versa.

This is a great feature of Elixir that we will talk more about later.

As for other inspirations Elixir has docstrings from Python, polymorphism and protocols from Clojure, macros and meta-programming from different Lisps, just to name a few. <sup>[^inspiration]</sup>

### Hello World!

As I said, Elixir is a concurrent functional programming language. For the functional part it means that Elixir mainly uses functions and modules for code structure and has other features that are associated with functional languages. We'll talk about the concurrent part later. 

A hello world example in Elixir might look something like this:

```elixir
defmodule HelloWorld
  def hello_world do
    IO.puts("Hello, World!")
  end
end
```

Here we define a module with a function that simply writes "Hello, World!" to the console.
 

## Killer applications

Many programming languages has ["killer apps"](https://en.wikipedia.org/wiki/Killer_application); libraries, frameworks and use cases, that in themself are enough to justify the transition to the language or try it out. For Ruby it was the web framework Ruby on Rails and in many ways Elixir has its own Rails: Phoenix.

### Phoenix web framework

[Phoenix](https://www.phoenixframework.org/) is inspired by Rails (the team originally behind Elixir was previously a Ruby shop) and was an early addition to the Elixir community. The creators of Phoenix has learned from years of Rails development and made their own opinions in addition to the natural changes needed when going from an object oriented language to a functional language.
Compared to Rails Phoenix has with the help of the Erlang VM great performance. Some of you might have heard about Phoenix' amazing [2 million simultaneous web sockets](https://www.phoenixframework.org/blog/the-road-to-2-million-websocket-connections) benchmark!

### The Nerves Project

Another interesting project in the Elixir ecosystem is the embedded/IoT project [Nerves](https://www.nerves-project.org/). Nerves makes it possible to use Elixir code to create embedded system where previously you would have had to use a low level language like C. This does not stop you from bringing your own code (like C, C++, Python, Rust, and more) while using Nerves as a platform for your IoT project.
The project web site says:

> Nerves is a complete IoT platform and infrastructure for you to build and deploy maintainable embedded systems.

## The BEAM and OTP

When talking about the advantages of Elixir it is hard to not talk about the advantages of Erlang and its virtual machine, the BEAM (Bogdan's Erlang Abstract Machine). It is in many ways the biggest selling point for Elixir. We are now talking about the concurrent part of Elixir. Erlang and the BEAM has shown its resiliency over many years, exemplified in giving Ericsson 9 nines (99.9999999%) availability in their AXD301 switch.<sup>[^nine9s]</sup> It is known for its "let it break" philosophy and self-healing properties and by being compatible with Erlang, Elixir inherits a lot of these traits.

Elixirs creator, Jose Valim, attributes one of the motivational factors for the creation of Elixir to the rise of multi-core CPUs and the need to utilize these. Ruby and other languages with a global interperter lock (GIL) limits this, but the Erlang VM and the tools and design prinsiples of OTP have proven to be a great choice for creating concurrent, performant and resilient applications.

### Everything is a process

Everything in the BEAM is a process. These are not OS processes, but lightweight processes which can be cheaply spawned and killed. In his PhD thesis the co-inventor of Erlang, Joe Armstrong, summarized Erlangs principles regarding processes:

> * Everything is a process.
> * Processes are strongly isolated.
> * Process creation and destruction is a lightweight operation.
> * Message passing is the only way for processes to interact.
> * Processes have unique names.
> * If you know the name of a process you can send it a message.
> * Processes share no resources.
> * Error handling is non-local.
> * Processes do what they are supposed to do or fail.

Sidenote: For some this may sound vaguely familiar. Some object oriented languages has had similar principles, but instead of processes they are applied to objects. Smalltalk is reported to be one of the inspirations to Erlang and it is fun to think about Erlang being a functional language but still be more object oriented than some object oriented languages. This is of course not the case as the definition of OOP has changed over time and Erlang is a functional language, but it is fun to ponder the similarities. 😄 Back to the main story! 😅

These unique principles for processes where they communicate through messages lays a great foundation for creating concurrent application, but there is one more piece to the puzzle: OTP.

### OTP - The Open Telecom Platform

As with so many other parts of this article OTP is a big topic and could be a separate article, but I'll try make it short! Today the name is a bit strange but it was created by Ericsson for their telephone switches in the 80s and 90s so in that context in makes more sense.

OTP is an integral part of many Erlang applications. In essence OTP is a set of design principles and standards including tools and libraries to make it easier to create applications that adheres to them.<sup>[^otp]</sup> 



Since Elixir is compatible with OTP we can leverage these principles and technologies that has been battle tested in high-pressure and critical applications for decades!

## The take-away

Luckily you don't need to understand or know much about Erlang, BEAM and OTP. 
Without deep knowledge of these topics you can still reap the benefits of highly performing web applications and resilient IoT applications. It would certainly help but it is not a prerequisite. This is the great thing about Elixir: it is an approachable language with battle tested underpinnings! 💪

It might not be your idea of a perfect language. It is not mine either, but that does not stop me from using the great tools at my disposal. If you are all into Haskell or the likes it might not be something you would use and that is OK. Whatever your preferences are you might now know a little more about Elixir and Erlang and some more knowledge is always a good thing. 😄

If you would like to check Elixir out I recommend checking out [the official Getting started guide](https://elixir-lang.org/getting-started/introduction.html) or the interactive guide [Try Elixir](https://try-elixir.herokuapp.com/) and then trying out a project with Phoenix or Nerves. Hands-on experience is always better than something you read on the internet! 🤓

Psst! By the way: there are other languages that run on the BEAM. [Lisp variants](https://lfe.io/) and lately some work on [strong statically compiled ML-like languges](https://gleam.run/) if you are into that!

[^inspiration]: [What languages inspired the design of Elixir (programming language)? - Quora](https://www.quora.com/What-languages-inspired-the-design-of-Elixir-programming-language/answer/Ian-Heggie)
[^rebinding]: https://stackoverflow.com/questions/29967086/are-elixir-variables-really-immutable
[^nine9s]: [Concurrency Oriented Programming in Erlang, p27](https://www.rabbitmq.com/resources/armstrong.pdf)
[^otp]: [What is OTP?](https://learnyousomeerlang.com/what-is-otp)