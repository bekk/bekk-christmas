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

First things first. Elixir is a functional language with syntax inspired by Ruby. It inherits a lot its data structure and related syntax from Erlang which in many ways is its biggest influence.

The article [Elixir Design Goals](https://elixir-lang.org/blog/2013/08/08/elixir-design-goals/) describes the relation to Erlang like this:

> Elixir is meant to be compatible with the Erlang VM and the existing ecosystem. When we talk about Erlang, we can break it into three parts:
>
> * A functional programming language, called Erlang
> * A set of design principles, called OTP
> * The Erlang Virtual Machine, referred to as EVM or BEAM
>
> Elixir runs in the same virtual machine and is compatible with OTP. Not only that, all the tools and libraries available in the Erlang ecosystem are also available in Elixir, simply because there is no conversion cost from calling Erlang from Elixir and vice-versa.

(You can think of Elixirs relationship to Erlang as Kotlin to Java and the JVM. But where the underlying VM for Kotlin is made for a object oriented language and therefor constrains Kotlin in many ways, whereas Elixir and Erlang is much more similar.)

A hello world example in Elixir might look something like this:

```ruby
defmodule Helloer
  def hello_world do
    IO.puts("Hello, World!")
  end
end
```

As for other inspirations Elixir has syntax inspired from Ruby and Erlang, docstrings from Python, polymorphism and protocols from Clojure, macros and meta-programming from different Lisps, just to name a few. 

## Killer applications

Most programming languages has their ["killer application"](https://en.wikipedia.org/wiki/Killer_application); Libraries or framework which in itself is enough to make the transition or try it out. For Ruby it was the web framework Ruby on Rails and in many ways Elixir has its own Rails: Phoenix.

### Phoenix web framework

[Phoenix](https://www.phoenixframework.org/) is inspired by Rails (the team originally behind Elixir was previously a Ruby shop) and was an early addition to the Elixir community but has learned from years of Rails development and made its own opinions in addition to the natural changes needed when going from and object oriented language to a functional language.
Compared to Rails, Phoenix has, with the help of the Erlang VM, great performance and some of you might have heard about Phoenix' amazing [2 million simultaneous web sockets](https://www.phoenixframework.org/blog/the-road-to-2-million-websocket-connections) benchmark!

### The Nerves Project

Another interesting project in the Elixir ecosystem is the embeded/IoT project [Nerves](https://www.nerves-project.org/). Nerves make it possible to use Elixir code to create embeded system where one previously would have needed to use a low level language like C. This does not stop you from bringing you own code (like C, C++, Python, Rust, and more) and using Nerves as a platform for your IoT project.
As they say on the project web site:

> Nerves is a complete IoT platform and infrastructure for you to build and deploy maintainable embedded systems.

## The BEAM

As mentioned earlier Elixir runs on the Erlang VM which is often called BEAM (Bogdan's/Björn's Erlang Abstract Machine) and is in many ways the biggest selling point for Elixir. Erlang and the BEAM has over