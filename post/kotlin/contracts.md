---
calendar: kotlin
post_year: 2020
post_day: 17
title: Contracts
image: https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1226&h=400&fit=crop&crop=edges
ingress: "Kotlin contracts are a way to help the compiler get more information
  about what the code actually does. Sometimes the compiler can’t infer all the
  information we as programmers know. "
authors:
  - Vegard Veiset
---
What are they? What do they mean? Where can we find them? Let's take a look at an example to get an idea of what contracts are good for.

```kotlin
fun getLength(str: String?): Int = str!!.length
val str: String? = "hello"
val length: Int = getLength(str)
str.toUpperCase() // compilation error
```

As we have given `str` the type of a nullable String the compiler can’t know that `str.toUpperCase` is a safe operation here, even though we know that `str` is clearly never null. How can we use contracts help us with this?

```kotlin
fun getLength(str: String?): Int {
    contract { returns() implies (str != null) }
    return str!!.length
}

val str: String? = "hello"
val length: Int = getLength(str)
str.toUpperCase() // now compiles
```


What is this magic? `str.toUpperCase()` now compiles. This is because we have told the compiler, or given it a contract, that says if getLength returns anything `str` cannot possibly be null. To share this arcane knowledge about our software with the compiler we placed a `contract` inside the getLength function. We have told the compiler that `str` cannot be null with `returns() implies (str != null)`. Nothing stops us from sending in an actual null-value to getLength and breaking everything, but using a contract we promised not to do that!

With contracts we describe behaviour we expect to happen using information the compiler doesn't know about. This means it is not necessarily correct, but it's a guarantee, or a contract, we give the compiler.

The `returns` statement inside the contract can be used to tell the behaviour we expect for when the function returns either `true`, `false` or `null`. Let's explore that, what happens if we give the compiler something thats only true for some cases? 

```kotlin
fun isUpperCase(arg: String?): Boolean {
    contract { returns(true) implies (arg != null) }
    return arg?.capitalize() == arg ?: false
}

val nullable: String? = "hello"
when (isUpperCase(nullable)) {
    true -> nullable.toUpperCase()
    false -> nullable?.toLowerCase()
}
```

When isUpperCase returns true we can be sure that our nullable string isn't null because we know the inner workings of our isUpperCase function, and while it's false we simply don't know and have to do an actual null-check. The point here is that we have helped the compiler with some extra information, so it has the same assumptions as we have.

There are also some other cool things we can do with contracts, namely give information about how we invoke a code block.

```kotlin
fun <T> once(block: () ->T) {
    contract { callsInPlace(block, InvocationKind.EXACTLY_ONCE) }
    block()
}

val x: Int
once {
    x = 10
}
```

Using `callsInPlace` we can give information about how we use the `block`-lambda passed to our `once` function. In this case we are saying that we will invoke it `EXACTLY_ONCE`. This allows us to assign a `val` inside a different scope, where we normally can’t infer anything about how many times it would be called. For all the compiler knows the function could have looked something like this:

```kotlin
fun <T> once(block: () ->T) {
    block()
    block()
}
```

Without using contracts and implying that we only call the lambda we would get an error when trying to assign a value inside a different function scope. This is since the lambda might be called twice and we would try to reassign a val, which is a no-no. 

If you look through the standard library you find contracts used a lot. And if we look at the source code of `let` we can see contracts being used.

```kotlin
public inline fun <T, R> T.let(block: (T) -> R): R {
    contract {
        callsInPlace(block, InvocationKind.EXACTLY_ONCE)
    }
    return block(this)
}
```

This contract is what what allows us to write something like:

```kotlin
val myInt: Int
str.let {
    myInt = 45
}
```

Again, this is because we've as programmers have given the compiler a guarantee that `{ myInt = 45 }` will only be invoked once. Neat.


A pitfall with contracts is that you might give the compiler the wrong idea, leading unhappy times. Contracts are still experimental and personally I haven’t found too many uses for them in day to day development, but they are a cool feature that I hope we see expanded in the future. 

