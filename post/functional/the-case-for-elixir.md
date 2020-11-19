---
calendar: functional
post_year: 2020
post_day: 5
title: The case for Elixir
ingress: ""
links:
  - url: https://elixir-lang.org/blog/2013/08/08/elixir-design-goals/
    title: Elixir Design Goals
authors:
  - Harald Ringvold
---
Today I want to make the case for the programming language Elixir. We will be looking at the basic features of the languages, notable projects and use cases and look a bit under the hood to why Elixir is so compelling.


## The basics

First things first. Elixir is a concurrent functional language that runs on the Erlang VM. It is inspired by many different languages where Ruby and Erlang probably is the most obvious based on the syntax.

Elixir is a strongly dynamicly typed language. This puts it in the same category as Ruby and Python, but it also has optional functionality for compile time type checking. 

Elixir inherits a lot its data structures and related syntax from Erlang which in many ways is its biggest influence. [Elixir Design Goals](https://elixir-lang.org/blog/2013/08/08/elixir-design-goals/) describes the relation to Erlang like this:

> Elixir is meant to be compatible with the Erlang VM and the existing ecosystem. When we talk about Erlang, we can break it into three parts:
>
> * A functional programming language, called Erlang
> * A set of design principles, called OTP
> * The Erlang Virtual Machine, referred to as EVM or BEAM
>
> Elixir runs in the same virtual machine and is compatible with OTP. Not only that, all the tools and libraries available in the Erlang ecosystem are also available in Elixir, simply because there is no conversion cost from calling Erlang from Elixir and vice-versa.

(You can think of Elixirs relationship to Erlang as Kotlin to Java and the JVM. But where the underlying VM for Kotlin is made for a object oriented language and therefor constrains Kotlin in many ways, whereas Elixir and Erlang is much more similar.)

### Hello World!
A hello world example in Elixir might look something like this:

```elixir
defmodule Helloer
  def hello_world do
    IO.puts("Hello, World!")
  end
end
```

As for other inspirations Elixir has docstrings from Python, polymorphism and protocols from Clojure, macros and meta-programming from different Lisps, just to name a few. 


## Killer applications

Many programming languages has a ["killer application"](https://en.wikipedia.org/wiki/Killer_application); Libraries, frameworks or use cases which in itself is enough to make the transition or try it out. For Ruby it was the web framework Ruby on Rails and in many ways Elixir has its own Rails: Phoenix.

### Phoenix web framework

[Phoenix](https://www.phoenixframework.org/) is inspired by Rails (the team originally behind Elixir was previously a Ruby shop) and was an early addition to the Elixir community but has learned from years of Rails development and made its own opinions in addition to the natural changes needed when going from and object oriented language to a functional language.
Compared to Rails, Phoenix has, with the help of the Erlang VM, great performance and some of you might have heard about Phoenix' amazing [2 million simultaneous web sockets](https://www.phoenixframework.org/blog/the-road-to-2-million-websocket-connections) benchmark!


### The Nerves Project

Another interesting project in the Elixir ecosystem is the embeded/IoT project [Nerves](https://www.nerves-project.org/). Nerves make it possible to use Elixir code to create embeded system where one previously would have needed to use a low level language like C. This does not stop you from bringing you own code (like C, C++, Python, Rust, and more) and using Nerves as a platform for your IoT project.
As they say on the project web site:

> Nerves is a complete IoT platform and infrastructure for you to build and deploy maintainable embedded systems.


## The BEAM and OTP

When talking about the advantages of Elixir it is hard to not talk about the advantages of Erlang and is VM, BEAM (Bogdan's Erlang Abstract Machine). It is in many ways the biggest selling point for Elixir. Erlang and the BEAM has proved its resiliency over many years, examplified in giving Ericssons 9 nines (99.9999999%) availability in their AXD301 switch ([ "Concurrency Oriented Programming in Erlang, p27](https://www.rabbitmq.com/resources/armstrong.pdf)). It is known for its "let it break" philosophy and self-healing properties and by being compatible with Erlang, Elixir inherits a lot of these traits.)

Elixirs creator, Jose Valim, attributes one the motivation factors for the creation of Elixir to the rise of multicore CPUs and the need to utilize these. Ruby and other languages with a global interperter lock (GIL) limits this, but the Erlang VM and the tools and design prinsiples of OTP has proven to be a great choice for creating concurrent, performant and recilient applications.


### Everything is a process
Everything in the BEAM is a process. These are not OS processes, but lightweight processes which can be cheaply spawned and killed. In his PhD thesis the co-inventor of Erlang, Joe Armstrong, summerized Erlangs principles regarding processes:

- Everything is a process.
- Processes are strongly isolated.
- Process creation and destruction is a lightweight operation.
- Message passing is the only way for processes to interact.
- Processes have unique names.
- If you know the name of a process you can send it a message.
- Processes share no resources.
- Error handling is non-local.
- Processes do what they are supposed to do or fail.

Sidenote: For some this may sound vaguely familiar. Some object oriented languages has had similiar priniples, but instead of processes they are applied to objects. Smalltalk is reported to be one of the inspirations to Erlang and it is fun to think about Erlang/Elixir being a functional language but still be more object oriented than some object origented languages. This is of course not the case as the definition of OOP has changed over time and Elixir/Erlang is a functional and concurrent language (what Joe called Concurrency Oriented Programming), but it is fun to ponder the similarities. ^^,

Back to the main story! :sweat_smile: These uniqe principles for processes lays a great foundation for creating concurrent application, but there is one more piece to the puzzle: OTP.

### OTP - The Open Telecom Platform
As with so many other parts of this article OTP is a big topic and could be a separate article, but I'll try make it short!

What exactly OTP is and how it relates Erlang might be a bit hard to understand as it is such a integral part of many Erlang applications. In essence OTP is a set of design principles and standards, and the tools and libraries to make it easier to create applications that adheres to them.<sup>[^1]</sup> Since Elixir is compatible with OTP we can leverage these prinsiples and technologies that has been battle tested in high pressure and critical application for decades!


## The take-away

After all this talk about Erlang, BEAM og OTP I can gladly inform you that it is stricly something you need to understand or know to much about. You can reap the benefits of highly performing web applications and recilient IoT applications without a deep knowledge the BEAM or OTP. It would ceratinly help but not a pre requisite. And that is the great thing about Elixir: it is an approachable language with battle tested underpinnings! :muscule:

It might not be your idea of a perfect language. It is not mine either, but that should not stop us from using the great tools at our disposal.

If you would like to check Elixir out I recommend checking out [the official Getting started guide](https://elixir-lang.org/getting-started/introduction.html) and trying out Phoenix or Nerves.


[^1]: https://learnyousomeerlang.com/what-is-otp