---
calendar: functional
post_year: 2019
post_day: 8
title: JSON Decoding in Elm
image: >-
  https://images.unsplash.com/photo-1481603707406-47fe6021a1c0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80
authors:
  - Aksel Wester
---
JSON is probably the most common way of representing data that is being sent between a server and a browser.
JSON stands for JavaScript Object Notation, and, as the name implies,
dealing with JSON in JavaScript is pretty straight forward.
When you get JSON from the server in a web app written in JavaScript, you can just run `JSON.parse()` on the
string containing the JSON to get a proper JavaScript value out.
Or the library you use for HTTP requests might even do it for you. 

Things aren't as straight forward in Elm, where we have to decode our JSON to get Elm values out of it,
but hopefully this article will give you some advice,
which will make JSON decoding a bit easier.

## `Decoder a`

The [`Decoder`](https://package.elm-lang.org/packages/elm/json/latest/Json-Decode#Decoder) type
is the fundamental building block of all JSON decoders in Elm.
It is what we define to tell Elm how to get an Elm value from some JSON.
Unlike `JSON.parse()` in JavaScript, a decoder is not a function, it is just a value.
The way I like to think of it, is that a decoder is a recipe.
And the recipe is for Elm to know how to turn a string containing JSON into an Elm value.

The proper type definition of the `Decoder` type isn't actually `Decoder`, it is `Decoder a`.
The `a` in the type definition is a [_type variable_](https://elm.christmas/2018/4),
which means that it can be any type.
The `a` is what the decoder decodes. It is the result of following the recipe, if the decoding is successful.
In other words a `Decoder String` is a recipe to decode a `String` from a JSON value,
a `Decoder Int` is the same for an `Int`.
And if we want to turn a JSON value into a type we have made ourselves, for instance `type Christmas`,
we would write a `Christmas` decoder, with the type signature `Decoder Christmas`. 

The [Json.Decode package](https://package.elm-lang.org/packages/elm/json/latest/Json-Decode)
defines the basic decoders we use to decode a string containing JSON, like
[`string`](https://package.elm-lang.org/packages/elm/json/latest/Json-Decode#string),
[`int`](https://package.elm-lang.org/packages/elm/json/latest/Json-Decode#int) and
[`list`](https://package.elm-lang.org/packages/elm/json/latest/Json-Decode#list),
along with the other data types that can be represented in JSON.

## Decode Backend Data

JSON decoding can often be quite difficult to reason about,
especially if the JSON value you are decoding doesn't map neatly onto the Elm value you are decode into.
I have often found myself lost in huge decoders that I don't understand anything of,
even though I wrote them myself only a couple of weeks earlier.
The best strategy I have found to make my JSON decoders more simple to both read and understand,
is to write them in two steps. First, deocde the JSON as simply as possible to an intermediate Elm value,
_and then_, convert that intermediate Elm value to the value you actually want.

Let's look at an example.
Let's say we have an endpoint on our server, that returns JSON that looks like this: 

```json
{
  "type-of-christmas": "WHITE" | "LAST" | "ITS_BEGINNING_TO_LOOK_A_LOT_LIKE",
  "first-snow": "2018-10",
  "last-snow": "2019-02" // Nullable
}
```

In this contrived Christmas example, we have three fields in an object.
The first field has the key `"type-of-christmas"`, and the value is a string.
The string should only be one of three variants: `"WHITE"`, `"LAST"`, and `"ITS_BEGINNING_TO_LOOK_A_LOT_LIKE"`.
The second field has the key `"first-snow"`, and it holds the year and month of the first snow for one Christmas,
represented as a string.
The last field also has the year and month represented as a string, but this time of the season's last snowfall,
and the field has the key `"last-snow"`.
The `"type-of-christmas"` and `"first-snow"` fields are not nullable fields, meaning that they should always contain strings,
not `null`, while the field `"last-snow"` _can_ contain `null`.

Let's say we want our `Christmas` type in Elm to be an [opaque type](https://elm.christmas/2018/17).
Then it could look something like this:[^1]

```elm
type Christmas
    = Christmas
        { typeOfChristmas : TypeOfChristmas
        , firstSnow : YearMonth
        , lastSnow : Maybe YearMonth
        }

type TypeOfChristmas
    = White
    | Last
    | ItsBeginningToLookALotLike
``` 
     
Decoding the JSON directly into this might be a little difficult.
It would at least be difficult to read the code afterwards.
So instead we start by decoding the JSON to a temporary type, I usually just call this type `BackendData`:

```elm
type alias BackendData =
    { typeOfChristmas : String
    , firstSnow : String
    , lastSnow : Maybe String
    }
``` 

Decoding this type, on the other hand, is quite easy, so let's do that!
I usually always use NoRedInk's [`json-decode-pipeline` package](https://package.elm-lang.org/packages/NoRedInk/elm-json-decode-pipeline/latest),
but you can also use the `map3` and `field` functions in the Json.Decode package, to decode `BackendData`.
Using `elm-decode-pipeline`, the decoder for `BackendData` would look like this:

```elm
import Json.Decode exposing (Decoder, succeed)
import Json.Decode.Pipeline exposing (required)

backendDataDecoder : Decoder BackendData
backendDataDecoder =
    succeed BackendData
        |> required "type-of-christmas" Json.Decode.string
        |> required "first-snow" Json.Decode.string
        |> required "last-snow" (Json.Decode.nullable Json.Decode.string)
```

That's pretty straight forward, but we don't actually want a `BackendData` value,
we want a `Christmas` value. To get that we need to use to use some other functions in the Json.Decode package.

## `map` and `andThen`

`map` and `andThen` are two functions we can use to transform our `BackendData` decoder into a `Christmas` decoder.
We can start by looking at their type definitions, to get a sense of what we can use the functions for.

The following is the type definition for `map`:

```elm
map : (a -> value) -> Decoder a -> Decoder value
```

This type signature looks suspiciously like every other type signature of functions called `map`
(see my article from last Christmas on `map` functions [here](https://elm.christmas/2018/9)).
We see from the type signature that `map` takes two arguments, a function from `a` to `value`,
and a `Decoder a`, and that it returns a `Decoder value`.

What the `map` function actually does is that it applies a function to the value that has been decoded,
if the decoding succeeded. This makes it so that the result of the decoding is the result applying the function to the decoded value,
instead of the decoded value.
We will go into more detail on this, but first, let's look at the type signature of `andThen`:[^2]

```elm
andThen : (a -> Decoder value) -> Decoder a -> Decoder value
```

We can see that the type signature of `andThen` is quite similar to `map`, with one notable exception.
The difference is that instead of the first argument being a function `(a -> value)`,
it is a function `(a -> Decoder value)`.

So what does this difference mean? It means that the two functions (`map` and `andThen`),
can be used in slightly different situations.
We can use `map` when we want to transform a value that is being decoded,
while `andThen` can be used when we want to make a transformation than _might fail_.
That is the main distinction between when we want to use each function.

So, going back to our `Christmas` example, we have now created a decoder for `BackendData`,
and we want to use that decoder to create a decoder for `Christmas`.
To do that we will have to use either `map` or `andThen` or both. So, which one is it?

To find out, we don't really have to think about decoders,
we only have to think about our two types, and answer the question:
Can all values of type `BackendData` be turned into a value of type `Christmas`?
To answer that question, we can look at the fields in `Christmas`.
The `typeOfChristmas` field is of type `TypeOfChristmas`, which is a custom type,
but the type we have in `BackendData` is a `String`.
Since not all strings can be mapped to one of the three variations of `TypeOfChristmas`,
we know that we have a transformation that isn't always successful.
Therefore we need to use `andThen`.

This is what our actual `Christmas` decoder will look like:

```elm
decoder : Decoder Christmas
decoder =
    backendDataDecoder
        |> Json.Decode.andThen backendDataToChristmas

backendDataToChristmas : BackendData -> Decoder Christmas
backendDataToChristmas backendData =
    -- body
```

In our case, `BackendData` is the `a`, and `Christmas` is the `value`, from the type signature of `andThen`.
The last thing we have to do now is to write the function `backendDataToChristmas`,
which takes `BackendData` as an argument, and returns a `Decoder Christmas`.

To write `backendDataToChristmas` we have to have decoders for `TypeOfChristmas` and `YearMonth`.
We will only show the implementation of the decoder for `TypeOfChristmas`, but the two are quite similar.
To create a decoder, we can use [`succeed`](
https://package.elm-lang.org/packages/elm/json/latest/Json-Decode#succeed) and [`fail`](
https://package.elm-lang.org/packages/elm/json/latest/Json-Decode#fail) from the Json.Decode package.
`succeed` takes an argument of a certain type, and returns a `Deocder` for that type (which always succeeds).
While `fail` takes a string explaining why the decoder failed, and returns a decoder of any type (which always fails).
In the case of `TypeOfChristmas`, we will write a function that takes a string as an argument,
and returns a `Decoder TypeOfChristmas`.
This is what it looks like:

```elm
decodeTypeOfChristmas : String -> Decoder TypeOfChristmas
decodeTypeOfChristmas string =
    if string == "WHITE" then
        succeed White

    else if string == "LAST" then
        succeed Last

    else if string == "ITS_BEGINNING_TO_LOOK_A_LOT_LIKE" then
        succeed ItsBeginningToLookALotLike

    else
        fail ("The string " ++ string ++ " is not a valid TypeOfChristmas")
```

In this function, we just have an if-expression,
and we check whether the string being decoded matches the values we expect in that field.
In the cases where the value matches our expectation,
we return a successful decoder that contains a `TypeOfChristmas`.
And in the else-branch, we return a failing decoder with an explanation of why we had to fail.

## Putting it all together

To wrap things up, we can pretend that we have made two more functions, `decodeYearMonth` and `decodeMaybeYearMonth`,
with the following type signatures:

```elm
decodeYearMonth : String -> Decoder YearMonth

decodeMaybeYearMonth : Maybe String -> Decoder (Maybe YearMonth)
```

In that case, we now have all the building blocks to implement the `backendDataToChristmas` function from before.
And it goes like this:

```elm
backendDataToChristmas : BackendData -> Decoder Christmas
backendDataToChristmas backendData =
    Json.Decode.map3
        initChristmas
        (decodeTypeOfChristmas backendData.typeOfChristmas)
        (decodeYearMonth backendData.firstSnow)
        (decodeMaybeYearMonth backendData.lastSnow)


initChristmas : TypeOfChristmas -> YearMonth -> Maybe YearMonth -> Christmas
initChristmas typeOfChristmas firstSnow lastSnow =
    Christmas
        { typeOfChristmas = typeOfChristmas
        , firstSnow = firstSnow
        , lastSnow = lastSnow
        }
```

We use `Json.Decode.map3`, which is like `map` except that it takes three decoders as arguments instead of one.
And the function we use as the first argument to `map3`, returns a `Christmas`,
meaning that `backendDataToChristmas` returns a `Decoder Christmas`, and we have completed our task.

## Don't be afraid to `fail`

When creating more complex decoders,
where the JSON representation of our data doesn't line up perfectly with the type we want in Elm,
we often have to use the `succeed` and `fail` functions, like we did above.
It might be tempting to avoid `succeed` and `fail` entirely,
and just use a default value instead of failing.
But I would suggest that you do not do that.

Writing decoders that can fail, might seem a bit scary.
But failing decoders have helped me discover bugs in the backend code,
which I never noticed in the JavaScript apps using those endpoints,
specifically because the decoders I wrote failed whenever the data from the server didn't line up with my expectations.

As long as you take care to write the decoding failures to a log somewhere,
you should feel confident that your decoders aren't the source of bugs,
but actually help uncover them.

## Conclusion

So, in conclusion, to more easily write good and maintainable decoders, simply follow these guidelines:

1. Decode your BackendData first
2. Transform that BackendData with `map` or `andThen`
3. Don't be afraid to `fail`

Happy decoding, and happy holidays!


[^1]: We won't actually define `YearMonth`, but you can imagine what the definition looks like.

[^2]: I changed the name of the type variable from `b` to `value` to match `map`s type signature in the package.
 
