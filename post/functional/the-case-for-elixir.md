---
calendar: functional
post_year: 2020
post_day: 5
title: The case for Elixir
ingress: Today I want to give you an intro to the programming language Elixir,
  some of its features and why you might want to check it out!
links:
  - title: "Video: Intro to OTP"
    url: https://www.youtube.com/watch?v=CJT8wPnmjTM
  - url: https://www.youtube.com/watch?v=zL2wcqS78UA
    title: "Video: Why we adopted Elixir"
  - url: https://blog.discord.com/scaling-elixir-f9b8e1e7c29b
    title: "Elixir at Discord: Scaling Elixir"
  - url: https://www.fastcompany.com/3026758/inside-erlang-the-rare-programming-language-behind-whatsapps-success
    title: "Erlang at Whatsapp: Inside Erlang, The Rare Programming Language Behind
      WhatsApp’s Success"
authors:
  - Harald Ringvold
---
## The basics

First things first: Elixir is a concurrent functional language that runs on the Erlang VM. It is inspired by many different languages where Ruby and Erlang probably is the most obvious based on the syntax.

Elixir is a strongly dynamically typed language. This puts it in the same category as Ruby and Python, but it also has optional functionality for compile time type checking. 

Elixir inherits a lot its data structures and related syntax from Erlang which in many ways is its biggest influence. [Elixir Design Goals](https://elixir-lang.org/blog/2013/08/08/elixir-design-goals/) describes the relation to Erlang like this:

> Elixir is meant to be compatible with the Erlang VM and the existing ecosystem. When we talk about Erlang, we can break it into three parts:
>
> * A functional programming language, called Erlang
> * A set of design principles, called OTP
> * The Erlang Virtual Machine, referred to as EVM or BEAM
>
> Elixir runs in the same virtual machine and is compatible with OTP. Not only that, all the tools and libraries available in the Erlang ecosystem are also available in Elixir, simply because there is no conversion cost from calling Erlang from Elixir and vice-versa.

This is a great feature of Elixir that we will talk more about later.

As for other inspirations Elixir has docstrings from Python, polymorphism and protocols from Clojure, macros and meta-programming from different Lisps, just to name a few. 

### Hello World!

As said, Elixir is concurrent functional programming language. For the functional part it means that Elixir mainly uses functions and modules for code structure and and has other features that often are assositated with functional languages. We'll talk about the concurrent part later. 

A hello world example in Elixir might look something like this:

```elixir
defmodule HelloWorld
  def hello_world do
    IO.puts("Hello, World!")
  end
end
```

Here we define a module with a function that simply writes "Hello, World!" to the console.

Elixirs types are immutable, but variables can be reassigned/rebound which was a bit weird for someone like me who got started with FP through Elm where there are no variables, just constants. <sup>[^1]</sup>


## Killer applications

Many programming languages has a ["killer application"](https://en.wikipedia.org/wiki/Killer_application); Libraries, frameworks or use cases which in itself is enough to make the transition or try it out. For Ruby it was the web framework Ruby on Rails and in many ways Elixir has its own Rails: Phoenix.

### Phoenix web framework

[Phoenix](https://www.phoenixframework.org/) is inspired by Rails (the team originally behind Elixir was previously a Ruby shop) and was an early addition to the Elixir community but has learned from years of Rails development and made its own opinions in addition to the natural changes needed when going from and object oriented language to a functional language.
Compared to Rails, Phoenix has, with the help of the Erlang VM, great performance and some of you might have heard about Phoenix' amazing [2 million simultaneous web sockets](https://www.phoenixframework.org/blog/the-road-to-2-million-websocket-connections) benchmark!


### The Nerves Project

Another interesting project in the Elixir ecosystem is the embedded/IoT project [Nerves](https://www.nerves-project.org/). Nerves make it possible to use Elixir code to create embedded system where one previously would have needed to use a low level language like C. This does not stop you from bringing you own code (like C, C++, Python, Rust, and more) and using Nerves as a platform for your IoT project.
As they say on the project web site:

> Nerves is a complete IoT platform and infrastructure for you to build and deploy maintainable embedded systems.


## The BEAM and OTP

When talking about the advantages of Elixir it is hard to not talk about the advantages of Erlang and its VM, BEAM (Bogdan's Erlang Abstract Machine) and this is where the concurrent part of Elixir comes in. It is in many ways the biggest selling point for Elixir. Erlang and the BEAM has proved its resiliency over many years, exemplified in giving Ericssons 9 nines (99.9999999%) availability in their AXD301 switch.<sup>[^2]</sup> It is known for its "let it break" philosophy and self-healing properties and by being compatible with Erlang, Elixir inherits a lot of these traits.

Elixirs creator, Jose Valim, attributes one the motivation factors for the creation of Elixir to the rise of multi-core CPUs and the need to utilize these. Ruby and other languages with a global interperter lock (GIL) limits this, but the Erlang VM and the tools and design prinsiples of OTP has proven to be a great choice for creating concurrent, performant and resilient applications.


### Everything is a process

Everything in the BEAM is a process. These are not OS processes, but lightweight processes which can be cheaply spawned and killed. In his PhD thesis the co-inventor of Erlang, Joe Armstrong, summarized Erlangs principles regarding processes:

- Everything is a process.
- Processes are strongly isolated.
- Process creation and destruction is a lightweight operation.
- Message passing is the only way for processes to interact.
- Processes have unique names.
- If you know the name of a process you can send it a message.
- Processes share no resources.
- Error handling is non-local.
- Processes do what they are supposed to do or fail.

Sidenote: For some this may sound vaguely familiar. Some object oriented languages has had similar prinsiples, but instead of processes they are applied to objects. Smalltalk is reported to be one of the inspirations to Erlang and it is fun to think about Erlang/Elixir being a functional language but still be more object oriented than some object origented languages. This is of course not the case as the definition of OOP has changed over time and Elixir/Erlang is a functional language, but it is fun to ponder the similarities. 😄 Back to the main story! 😅

These unique principles for processes where they communicate through messages lays a great foundation for creating concurrent application, but there is one more piece to the puzzle: OTP.

### OTP - The Open Telecom Platform
As with so many other parts of this article OTP is a big topic and could be a separate article, but I'll try make it short! The name is a bit weird now but it was created by Ericsson for their telephone switches in the 80s and 90s so i guess it makes sense. 🤷‍♂️

What exactly OTP is and how it relates Erlang might be a bit hard to understand as it is such a integral part of many Erlang applications. In essence OTP is a set of design principles and standards, and the tools and libraries to make it easier to create applications that adheres to them.<sup>[^3]</sup> Since Elixir is compatible with OTP we can leverage these prinsiples and technologies that has been battle tested in high pressure and critical application for decades!


## The take-away

After all this talk about Erlang, BEAM og OTP I can gladly inform you that it is stricly something you need to understand or know to much about. You can reap the benefits of highly performing web applications and resilient IoT applications without a deep knowledge the BEAM or OTP. It would ceratinly help but not a pre requisite. And that is the great thing about Elixir: it is an approachable language with battle tested underpinnings! 💪

It might not be your idea of a perfect language. It is not mine either, but that should not stop me from using the great tools at my disposal. If you are all into Haskell or the likes it might not be something you would use and that is OK. 😄 Now might know a little more about Elixir and Erlang and some more knowledge is always a good thing.

If you would like to check Elixir out I recommend checking out [the official Getting started guide](https://elixir-lang.org/getting-started/introduction.html) or the interactice guide [Try Elixir](https://try-elixir.herokuapp.com/) and trying out a project Phoenix or Nerves. Hands-on experience is always better than something you read on the internet! 🤓

Psst! By the way: there are other languages that run on the BEAM. [Lisp variants](https://lfe.io/) and now lately some work on [strong staticly compiled ML-like languges](https://gleam.run/) if you are into that!


[^1]: https://stackoverflow.com/questions/29967086/are-elixir-variables-really-immutable
[^2]: [Concurrency Oriented Programming in Erlang, p27](https://www.rabbitmq.com/resources/armstrong.pdf)
[^3]: [What is OTP?](https://learnyousomeerlang.com/what-is-otp)