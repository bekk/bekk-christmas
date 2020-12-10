---
calendar: functional
post_year: 2020
post_day: 11
title: Types Without Borders Isn't Enough
authors:
  - Dillon Kearns
---
At Elm Conf 2018, I gave a talk called Types Without Borders<sup>[^types-without-borders]</sup>. In the talk, I discussed the idea of preserving type information when crossing the boundary between languages or environments.

I gave a demo of two different libraries that follow that principle: `elm-graphql`<sup>[^elm-graphql]</sup>, and `elm-typescript-interop`<sup>[^elm-typescript-interop]</sup>. `elm-graphql` has stood the test of time quite well.

`elm-typescript-interop` was a solid idea at the time, but it missed something fundamentally that `elm-graphql` got right. So I'm rethinking it from scratch and introducing a new incarnation of that project that I'm, creatively, calling `elm-ts-interop`<sup>[^elm-ts-interop]</sup>. In this post, I'll explore the missing piece, which needed a fresh look after a few years to discover: using a Combinator approach. I wrote about Combinators in-depth in yesterday's post<sup>[^combinators-post]</sup>. Before I explain the new approach in `elm-ts-interop`, let me describe the original approach of `elm-typescript-interop`.

## The original elm-typescript-interop

The idea of `elm-typescript-interop` is to look at your Elm source code and find all the ports and their type information. In Elm, a port is a way to send messages to or from JavaScript. Since JavaScript doesn't have the same guarantees that Elm does, ports are a way to have an environment with sound types and no runtime exceptions. But you can still communicate with JavaScript, just by sending messages with the concept of the Actor Model - messages can go out, and messages can come in.

You define a port with a type annotation like this:

```elm
-- this gives you a function to send a message to JavaScript
showModal : { title : String, message : String, style : String } -> Cmd msg

-- this gives you a subscription to listen for messages from JavaScript
gotLocalStorage : ( { key : String, value : Json.Decode.Value } -> msg ) -> Sub msg
```

You can learn more in the [Elm Guide's section on ports](https://guide.elm-lang.org/interop/ports.html).

And in your app, you would call

```elm
showModal { title = "Could not find that discount code", message = "Could not found discount code " ++ discountCode ++ ". Please try again.", style = "Warning" }
```

`elm-typescript-interop` takes that type information and generates TypeScript type definitions for setting up your Elm code. This is quite handy because it gives you

- Intellisense for autocompletions when you wire up your ports in your JavaScript entrypoint
- TypeScript errors if you pass in incorrect data
- TypeScript type information about the incoming data from Elm

Wiring up your ports looks something like this:

```js
const app = Elm.Main.init({ flags: flagData });

app.ports.showModal.subscribe(function (data) {
  // show modal based on `data` we got from Elm
});
```

`elm-typescript-interop` generates TypeScript declarations to bring some type-safety to this process. In hindsight, this type-safety is great, but the overall approach misses the bigger picture.

## The problem with the original approach

People would often ask, "what's the best way to send your Elm Custom Types through a port?" Elm automatically sends basic types through ports, like `String`, `Int`, records, lists, etc. And if you're wondering why Elm doesn't just automatically convert any type to JSON, Evan Czaplicki's document describing his vision for data interchange<sup>[^data-interchange]</sup> is worth a read.

Initially, I thought that I would eventually come up with a way to automatically serialize Elm types, again by statically analyzing your Elm source code. Then you could serialize that data into TypeScript types automatically. I tried sketching out some design ideas, but never came up with anything that felt satisfying.

So what that left you with was using `elm-typescript-interop` to be a serialization/de-serialization layer. But you would then need a second layer to convert that into proper Elm data.

Let's take our example from above

```elm
showModal { title = "Could not find that discount code", message = "Could not found discount code " ++ discountCode ++ ". Please try again.", style = "Warning" }
```

What if our ideal data type in Elm doesn't have that exact shape that we want to send to TypeScript?

```elm
type ModalDialog
  = FatalError ErrorCode
  | Warning { title : String, message : String }
  | Info { title : String, message : String }
```

Now we need a translation function to turn that data type into a format that our port can serialize.

```elm
modalDialogToPort : ModalDialog -> Cmd msg
modalDialogToPort modalDialog =
    case modalDialog of
        FatalError errorCode ->
            showModal { title = "Internal Error", message = "Please contact support with code " ++ errorCodeToString errorCode, style = "Error" }
```

We have the same limitation for building the desired format that our TypeScript code needs to consume. There are certain data types that we wouldn't be able to express with typed data that we can send through an Elm port, like a key-value object with dynamic keys.

But specific limitations with data types that can't be serialized isn't the root problem. Regardless of those limitations, we can't assume that the data format needed in TypeScript and the ideal format in our Elm code are the same. So we need to transfer the data, while also transforming it. If you read yesterday's post, this may all ring a bell. You guessed it - it's time for a Combinator!

## Getting the best of both worlds with Combinators

[^data-interchange]: Evan Czaplicki's [vision for data interchange in Elm](https://gist.github.com/evancz/1c5f2cf34939336ecb79b97bb89d9da6).
[^types-without-borders]: [Types Without Borders](https://www.youtube.com/watch?v=memIRXFSNkU) at Elm Conf 2018
[^elm-graphql]: https://github.com/dillonkearns/elm-graphql
[^elm-typescript-interop]: https://github.com/dillonkearns/elm-typescript-interop
[^elm-ts-interop]: https://github.com/dillonkearns/elm-ts-interop
[^combinators-post]: [Combinators - Inverting Top-Down Transforms](https://functional.christmas/2020/10)
