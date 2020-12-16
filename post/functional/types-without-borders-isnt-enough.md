---
calendar: functional
post_year: 2020
post_day: 11
title: Types Without Borders Isn't Enough
image: https://images.unsplash.com/photo-1604936243528-8fc27e66ece6?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&fit=crop&w=1238&h=400&crop=edges
ingress: Today we are excited to reveal the second article from our guest writer
  Dillon Kearns, known for projects such as elm-graphql, elm-typescript-interop,
  and the Elm Radio podcast! If you didn't catch the one from yesterday, be sure
  to check it out as well! We hope you enjoy!
links:
  - title: Types Without Borders
    url: https://www.youtube.com/watch?v=memIRXFSNkU
  - title: Vision for Data Interchange
    url: https://gist.github.com/evancz/1c5f2cf34939336ecb79b97bb89d9da6
  - title: elm-ts-interop
    url: https://github.com/dillonkearns/elm-ts-interop
authors:
  - Dillon Kearns
---
At Elm Conf 2018, I gave a talk called [Types Without Borders](https://www.youtube.com/watch?v=memIRXFSNkU). In the talk, I discussed the idea of preserving type information when crossing the boundary between languages or environments.

I gave a demo of two different libraries that follow that principle: [`elm-graphql`](https://github.com/dillonkearns/elm-graphql), and [`elm-typescript-interop`](https://github.com/dillonkearns/elm-typescript-interop). `elm-graphql` has stood the test of time quite well.

`elm-typescript-interop` was a solid idea at the time, but it missed something fundamentally that `elm-graphql` got right. So I'm rethinking it from scratch and introducing a new incarnation of that project that I'm, creatively, calling [`elm-ts-interop`](https://github.com/dillonkearns/elm-ts-interop). In this post, I'll explore the missing piece, which needed a fresh look after a few years to discover: using a Combinator approach. I wrote about Combinators in-depth in [yesterday's post](https://functional.christmas/2020/10). Before I explain the new approach in `elm-ts-interop`, let me describe the original approach of `elm-typescript-interop`.

## The original elm-typescript-interop

The idea of `elm-typescript-interop` is to look at your Elm source code and find all the ports and their type information. In Elm, a port is a way to send messages to or from JavaScript. Since JavaScript doesn't have the same guarantees that Elm does, ports are a way to have an environment with sound types and no runtime exceptions. But you can still communicate with JavaScript, just by sending messages with the concept of the Actor Model - messages can go out, and messages can come in.

You define a port with a type annotation like this:

```elm
-- this gives you a function to send a message to JavaScript
reportEvent : { title : String, message : String, kind : String } -> Cmd msg

-- this gives you a subscription to listen for messages from JavaScript
gotLocalStorage : ( { key : String, value : Json.Decode.Value } -> msg ) -> Sub msg
```

You can learn more in the [Elm Guide's section on ports](https://guide.elm-lang.org/interop/ports.html).

And in your app, you would call

```elm
reportEvent
    { title = "Could not find that discount code"
    , message = "Could not found discount code " ++ discountCode ++ "."
    , kind = "Warning"
    }
```

`elm-typescript-interop` takes that type information and generates TypeScript type definitions for setting up your Elm code. This is quite handy because it gives you

- Intellisense for autocompletions when you wire up your ports in your JavaScript entrypoint
- TypeScript errors if you pass in incorrect data
- TypeScript type information about the incoming data from Elm

Wiring up your ports looks something like this:

```js
const app = Elm.Main.init({ flags: flagData });

app.ports.reportEvent.subscribe(function (data) {
  // report event based on `data` we got from Elm
});
```

`elm-typescript-interop` generates TypeScript declarations to bring some type-safety to this process. In hindsight, this type-safety is great, but the overall approach misses the bigger picture.

## The problem with the original approach

People would often ask, "what's the best way to send your Elm Custom Types through a port?" Elm automatically sends basic types through ports, like `String`, `Int`, records, lists, etc. You can also send generic JSON data through a port. You'll have to use the `elm/json` package to turn your data to or from typed Elm data. If you're wondering why Elm doesn't just automatically convert any type to JSON, Evan Czaplicki's document describing his [vision for data interchange](https://gist.github.com/evancz/1c5f2cf34939336ecb79b97bb89d9da6) is worth a read.

Initially, I thought that I would eventually come up with a way to automatically serialize more advanced Elm types, again by statically analyzing your Elm source code. Then you could serialize that data into TypeScript types automatically. I tried sketching out some design ideas, but never came up with anything that felt satisfying.

So what that left you with was using `elm-typescript-interop` to be a serialization/de-serialization layer. But you would then need a second layer to convert that into proper Elm data.

Let's take our example from above

```elm
reportEvent
    { title = "Could not find that discount code"
    , message =
        "Could not found discount code "
            ++ discountCode
            ++ ". Please try again."
    , kind = "Warning"
    }
```

What if our ideal data type in Elm doesn't have that exact shape that we want to send to TypeScript? Let's say our ideal Elm type is this

```elm
type Error
  = FatalError ErrorCode
  | Warning { title : String, message : String }
```

Now we need a translation function to turn that data type into a format that our port can serialize.

```elm
reportElmErrorType : Error -> Cmd msg
reportElmErrorType error =
    case error of
        FatalError errorCode ->
            reportEvent
                { title = "Internal Error"
                , message =
                    "Please contact support with code "
                        ++ errorCodeToString errorCode
                , kind = "Error"
                }
```

Just as we couldn't use our ideal data type in Elm because it used an advanced type that can't be automatically serialized, our ideal TypeScript type that we want to serialize to can't be expressed directly. We can't use expressive TypeScript types like [discriminated unions](https://basarat.gitbook.io/typescript/type-system/discriminated-unions).

But specific limitations with serializing to/from advanced data types isn't the root problem. Regardless of those limitations, we can't assume that the data format needed in TypeScript and the ideal format in our Elm code are the same. So we need to transfer the data, while also transforming it. If you read yesterday's post, this may all ring a bell. You guessed it - it's time for a Combinator!

## Getting the best of both worlds with Combinators

Let's say our ideal type that TypeScript would like to work with looks like this

```typescript
type Event = Error | PageNavigation;
type Error = {
  kind: "Error";
  errorId?: string;
  message: string;
  context?: string;
};

type PageNavigation = {
  kind: "PageNavigation";
  path: string;
};
```

Our `elm-ts-interop` `Encoder` would look something like this:

```elm
import Json.Encode as JE
import TsInterop.Encode as Encode exposing (Encoder)


type Event
    = ErrorEvent Error
    | PageNavigationEvent Url


type alias Url =
    { path : String }


eventEncoder : Encoder Event
eventEncoder =
    Encode.union
        (\vPageNavigation vError value ->
            case value of
                PageNavigationEvent url ->
                    vPageNavigation url

                ErrorEvent errorData ->
                    vError errorData
        )
        |> Encode.variant pageNavigationEncoder
        |> Encode.variant errorEncoder
        |> Encode.buildUnion


pageNavigationEncoder : Encoder Url
pageNavigationEncoder =
    Encode.object
        [ Encode.required "kind" identity (Encode.literal <| JE.string "PageNavigation")
        , Encode.required "path" .path Encode.string
        ]


errorEncoder : Encoder Error
errorEncoder =
    rawErrorEncoder
        |> Encode.map
            (\value ->
                case value of
                    FatalError errorCode ->
                        { errorId = Just (errorCodeToString errorCode)
                        , message = "Fatal error."
                        , context = Nothing
                        }

                    Warning details ->
                        { errorId = Nothing
                        , message = details.message
                        , context = Nothing
                        }
            )


rawErrorEncoder :
    Encoder
        { errorId : Maybe String
        , message : String
        , context : Maybe String
        }
rawErrorEncoder =
    Encode.object
        [ Encode.optional "errorId" .errorId Encode.string
        , Encode.required "message" .message Encode.string
        , Encode.optional "context" .context Encode.string
        , Encode.required "kind" identity (Encode.literal <| JE.string "Error")
        ]

```

Just by writing this Elm code, we have the exact TypeScript type `type Event = Error | PageNavigation` that was our ideal TypeScript type! This allows us to express much more nuanced types between Elm and TypeScript (in this case we have a TypeScript Discriminated Union, for example). The type information from this `Encoder` is synced by running an `elm-ts-interop` command-line tool.

This `Encoder` does two things:

- Acts as an Adaptor to get the formats to line up (think American-to-European power adaptor)
- Preserves type information on both sides as it does this!

This is crucial. In building up the adaptor, the API builds up type information about what data it expects to come in, and what data types can go out. This is the missing piece from Types Without Borders! Why is this so important? There are several benefits:

- We can express much more nuanced type information through this API
- This is a Combinator, so we can build up very complex transformations by composing together easy-to-understand building blocks (see [yesterday's post on Combinators](https://functional.christmas/2020/10))

Because of this new approach, we now have the added benefit that we can use a single Elm port to send all possible messages to TypeScript, and a single port to receive all messages from TypeScript.

That means instead of remembering to register each port, but getting no warning if we forget one, we can use TypeScript to guarantee that we've handled every incoming message!

```typescript
app.ports.fromElm.subscribe((fromElm) => {
  switch (fromElm.tag) {
    case "reportEvent":
      AnalyticsService.notify(fromElm.data);
      break;
    case "scrollIntoView":
      document.getElementById(fromElm.id)?.scrollIntoView(fromElm.data);
      break;
    // exhaustive check will fail if there are unhandled cases
  }
});
```

Again, this is because of the power of the Combinator pattern. Since a Combinator is just built up of other Combinators, we can build up very complex data serialization out of smaller pieces, and then _combine_ them into one type that's nice to work with in an exhaustive switch statement<sup>[^exhaustive-switch]</sup>!

## Sneak peak of elm-ts-interop

Thanks for reading! I'll be releasing `elm-ts-interop` very soon, so stay tuned. If you want a sneak peak, you can browse this [preview of the documentation](https://elm-doc-preview.netlify.app/TsInterop-Encode?repo=dillonkearns%2Felm-ts-interop&version=main). I'd love to hear your thoughts. Let me know what you think on Twitter [@dillontkearns](https://twitter.com/dillontkearns)!

[^exhaustive-switch]: To make sure you get errors if your switch statements are missing a case in TypeScript, you'll need to either use [this trick](https://stackoverflow.com/a/39419171), or use the [`@typescript-eslint/switch-exhaustiveness-check`](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/switch-exhaustiveness-check.md) `eslint` rule.
