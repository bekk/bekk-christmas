---
calendar: kotlin
post_year: 2019
post_day: 15
title: When we need a concrete generic
image: >-
  https://images.unsplash.com/photo-1495806284221-6b81ceff1305?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2978&q=80
ingress: >-
  While using Java or Kotlin, have you ever needed the actual type of the type
  parameter in a generic function? Meet reified!
links:
  - title: Inline Functions and Reified Type Parameters - Kotlin Programming Language
    url: 'https://kotlinlang.org/docs/reference/inline-functions.html'
authors:
  - Thomas Oddsund
---
Search for reified on github, and you'll get about 247k hits. Limit it to Kotlin, and it's around 50k. But what is it?

## A generic function

First, here's the signature of a generic function

```kotlin

fun<T> genericFunc(foo: Int): T

```

The function allows us to perform some operation on an Int which should be able to return any type. However, as we don't have any information about the type returned, the function is severly limited. Functions with a signature like this is often just some CRUD operation on a generic container type(e.g. List).

## The KClass parameter

To be able to do something based on the type of the generic parameter, we introduce the KClass parameter.

```kotlin

fun<T> getJson(foo: Int, clazz: KClass<*>): T {    
    
    return ObjectMapper().readValue(foo, clazz.java)
    
}

// Usage
val bar: Data = getJson("{\"answer\": 42}", Data::class.java)
```

Usually, the KClass argument is used to reveal the actual type to the function. By doing it this way, the type can be revealed without the call-site having to instantiate and pass in a dummy object. In the example, this is seen to be one way that the [FasterXML/jackson](https://github.com/FasterXML/jackson) project offers to deserialize from some supported format to an object. A similar solution is also offered by other libraries, like GSON.

A downside with the current implementation is that it doesn't support generics very well. The class passed will be that of e.g. List, but it won't have any information about the type of the List elements. And isn't that extra parameter a bit nasty?

## Reified type

Enter the `reified` keyword.

> **reify**: to consider or represent (something abstract) as a material or concrete thing : to give definite content and form to (a concept or idea) 

With this defintion from [Merriam-Webster](https://www.merriam-webster.com/dictionary/reify) in mind, lets look at an example. One caveat though; `reified` requires it to be an inline function, denoted by the `inline` keyword. Inline, as the name implies, means that the function will be inlined at the call site - something we'll cover in another article!

```kotlin

inline fun<reified T> getJson(input: String): T {
    return ObjectMapper().readValue(input, T::class.java)
}

// Usage
val bar: Data = getJson<Data>("{\"answer\": 42}")
```

By adding `reified` to the type parameter, we get access to the generic type like it was an actual type. No more passing `::class` parameters, just call the function with the type parameter!

To sweeten the deal, remember that Kotlin has type inference. Let's trim it down just a litle bit extra. If you want Jackson to support generics and their element type as well, such as `List<Name>` instead of just `List`, replace `T::class.java` with `object : TypeReference<T>(){}`.

```kotlin

inline fun<reified T> getJson(input: String): T {
    return ObjectMapper().readValue(input, object : TypeReference<T>(){})
}

val reifiedList: List<Name> = getJson("[{\"name\": \"Thomas\"}, {\"name\": \"Karoline\"}, {\"name\": \"Børre\"}]")
```

Now look at that. One could even suspect that someone had thought of [functions](https://github.com/FasterXML/jackson-module-kotlin/blob/master/src/main/kotlin/com/fasterxml/jackson/module/kotlin/Extensions.kt) like this already!
