---
calendar: functional
post_year: 2019
post_day: 20
title: Functors - What are they?
image: >-
  https://images.unsplash.com/photo-1515155075601-23009d0cb6d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=3024&q=80
ingress: >-
  A functor might sound very strange and esoteric but chances are you have used
  it in some ways. Some of you probably a lot! In this article we will look at
  what they are and some reasons they are useful.
links:
  - title: 'Functors, Applicatives, And Monads In Pictures'
    url: >-
      http://adit.io/posts/2013-04-17-functors,_applicatives,_and_monads_in_pictures.html
  - title: 'LambaCast Episode 16: Functors'
    url: 'https://soundcloud.com/lambda-cast/16-functors'
authors:
  - Harald Ringvold
---
Lets start with a definition, and then try to make sense of it. This will not be a comprehensive explanation and we will be glossing over some details in the interest of brevity but it will hopefully be enough you get you started.

> A functor is a structure that has a mapping function that can transform the values inside the functor

As with [monads](https://functional.christmas/2019/5) a functor can be thought of as a container or structure that holds some value. But it is not just a dumb container. The structure might have different states or behavior which makes the values inside inaccessible. The mapping function will ensure that we can safely access and transform the values.

By having the structure define and uphold its own rules through the mapping function we do not need to know all the different rules and edge cases for accessing the value. The functor handles this and all we need to do is to use the mapping function. It makes our coding life easier! 😄

This might seem to make little sense now but stay with me. We will start in off in a language many might be familiar with: JavaScript!

## My first functor

The functor that are used the most without people even knowing it are probably arrays in JavaScript. One of the ways that you know something is a functor is if it has the `map` function.

The map function on arrays are used to transform (or map 😎) the values inside 
it to another type (or another instance of the same type):

```javascript
[1,2,3].map(x => String(x))
// outputs: ["1","2","3"]
```

Map takes one parameter which is a one-parameter function. When sent (or applied) to `map` this function will in turn be called with each of the values in the array giving us a new array containing the newly transformed values. In the above example we are transforming the numbers to strings.

Note that when mapping arrays we always get back an array. The values in it can be transformed into strings, ints, objects or arrays (or any valid JS type) but they will always be inside an Array.

## The Maybe functor

In the statically typed functional language Elm these functional concepts are used all the time but without actually talking about the technical names. Lets look at one of the most used besides lists/arrays: Maybe.

Elm does not have `null` or `undefined` so values that might not be available have to be represented in other ways.

For this the Elm standard library has a type called [Maybe](https://package.elm-lang.org/packages/elm/core/latest/Maybe), which is defined like this:

```elm
type Maybe a
    = Just a
    | Nothing
```

This defines a type called Maybe which contains a value `a` (small letter means any type). It represents to different "states": `Just` for when you have a value and `Nothing` when you have nothing. 

You might have been in a situation where some of the data you get from the backend might not allways be available so you end up having to check of fields are `null` or `undefined`. In Elm we can use Maybe to model this.

Lets say you have a field of type Int that might not be available in all situations and we model with a Maybe. This gives us a value of `Maybe Int`. We might later need this value to be a string. We can use `Maybe.map` and `String.fromInt` to easily convert it to Elms string type:

```elm
-- maybeInt might be Just 42 or Nothing

Maybe.map String.fromInt maybeInt
-- output: Maybe String
```
Later we can use Elms case expression to get the value so we can display it to the user.

```
showString maybeString =
    case maybeString of 
        Just theString ->
            theString
        Nothing ->
            "No value here this time :/"
```


## More complicated structures

The Maybe type is fairly intuitive in that we understand that when we have and instance of `Nothing` there is nothing to do and it is relatively simple to just use a case expression to access and transform the value that way. If the type/structure we are working on is more complicated like the [RemoteData](https://package.elm-lang.org/packages/krisajenkins/remotedata/latest/RemoteData#RemoteData) type the `map` function makes our life easier.

```elm
type RemoteData e a
    = NotAsked
    | Loading
    | Failure e
    | Success a
```

This type represents and helps us model the states a HTTP request can be in. In many situations the interesting part is the Success state and its value. 
If we want to access the value we expect after a successful request through the case expression it would look something like this:

```
case remoteDataValue of
    Success value ->
        transformFunction value

    Loading ->
        Loading

    NotAsked ->
        NotAsked

    Failure error ->
        Failure error
```

This gets tiresome very quickly! Functor to the rescue! 🎉  

`RemoteData.map` makes it easy for us to transform this value without a case statement where we need to handle every possible state of the type.

This has the same functionality as the code above:

```
RemoteData.map transformFunction remoteDataValue
```

Does not that look a bit easier to use? 😄

There is a lot more to be said about functors but I hope this was a good intro. If you want to explore it more I recommend you to take a look at [Functors, Applicatives, And Monads In Pictures](http://adit.io/posts/2013-04-17-functors,_applicatives,_and_monads_in_pictures.html) which has greate illustrations.
