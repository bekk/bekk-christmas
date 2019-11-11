---
calendar: kotlin
post_year: 2019
post_day: 15
title: 'Work in progress: Reified type'
---
## Intro

Search for reified in code on github, and you'll get about 247k hits. Limit it to Kotlin, and it's around 50k. But what is it?

## A generic function

Here's the signature of a generic function

```kotlin
fun<T> genericFunc(foo: Int): T
```

It allows us to perform some function on an Int which should be able to return any type.
However, as we don't have any information about the type returned, we can't really do anything other than to define this as an operation on lists, maps or the like.

## The KClass parameter

To be able to do something with the type, we introduce the KClass parameter.

```kotlin
fun<T> genericFunc(foo: Int, clazz: KClass<*>): T {
    return ObjectMapper().readValue(foo, clazz.java)
}

// Usage
val bar: Data = genericFunc("{\"answer\": 42}", Data::class.java)
```

The class parameter allows us access to a type without having to instantiate an object of class T and send it in. The KClass argument sent in is usually the same as T.
A common use case for this pattern is when you have a string of, say, JSON, and you want to deserialize it into some object.
In fact, libraries like GSON and Jackson offer functions like this to serialize from some supported format to an object.
A downside with the current implementation is that it doesn't support generics very well - the class passed will be that of e.g. List, but it won't have any information about the type of the List elements.
And isn't that extra parameter a bit nasty?

## Reified type

Enter the `reified` keyword.

> **reify**: to consider or represent (something abstract) as a material or concrete thing : to give definite content and form to (a concept or idea) 

With this defintion from [Merriam-Webster](https://www.merriam-webster.com/dictionary/reify) in mind, lets look at an example.

```kotlin
inline fun<reified T> getJson(input: String): T {
    return ObjectMapper().readValue(input, object : TypeReference<T>(){})
}

//Usage
val reifiedList = getJson<List<Name>>("[{\"name\": \"Thomas\"}, {\"name\": \"Karoline\"}, {\"name\": \"Børre\"}]")
```

The `reified` keyword allows us access to the generic type like it was an actual type in the function body.
No more passing `::class` parameters, just call the function with the type you wish to get back.
However, Kotlin has type inference! So we can slim this down even more.

```kotlin
val reifiedList: List<Name> = getJson("[{\"name\": \"Thomas\"}, {\"name\": \"Karoline\"}, {\"name\": \"Børre\"}]")
```

Now look at that.
