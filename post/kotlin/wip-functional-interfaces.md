---
calendar: kotlin
post_year: 2020
post_day: 21
title: Functional Interfaces
image: https://images.unsplash.com/photo-1510736661179-a0d68edb2f90?w=1226&h=400&fit=crop&crop=edges
ingress: Functional interfaces was introduced in Kotlin 1.3 and is a way of
  giving lambdas proper types  which can make our code more readable and make
  the intent clearer.
authors:
  - Vegard Veiset
---
Let's start with a simple lambda. A lambda can typically be written as follows:

```kotlin
val uppercaseFn: (String) -> String = {
    it.toUpperCase()
}
println(uppercaseFn("Hello")) // HELLO
```

If you need a refresher on lambdas check out [last year's post about lambdas](https://kotlin.christmas/2019/18). To make our code easier to understand we can replace the lambda type signatures with a typealias:

```kotlin
typealias Uppercase = (String) -> String
val uppercaseFn: Uppercase = {
    it.toUpperCase()
}
println(uppercaseFn("Hello")) // HELLO
```

Typealiases are just syntactic sugar that will be rewritten to the underlying type at compilation, this means that the typealias `Uppercase` will be replaced with `(String) ->String` when we compile. The issue with typealiases is that it doesn’t ensure that we actually pass a function that with a typealias, we can pass any function that matches the signature of the typealias. Typealiases still work wonders to make complex types easier to read, but we get no guarantee that the function we pass actually uses the type alias. 

```kotlin
fun myFunction: (String) -> String = { it.upperCase() }
fun uppercase: Uppercase = { it.upperCase() }
fun doStuff(f: Uppercase) = f()

doStuff(myFunction) // valid
doStuff(uppercase) // valid
```


As we see in the example sending both functions are valid, even though only one uses the typealias. My suggestion is to be careful when using typealiases and make them private so the false abstraction doesn’t leak into our codebase. Now for functional interfaces. A functional interface, or a single abstract method (SAM), is an interface with a single abstract method. It can have multiple methods but only a single abstract one. Let's start with an example of a functional interface where we want to add a suffix to a string. 

```kotlin
fun interface Suffix {
    fun exclaim(s: String): String
}
val suffixFn: Suffix = Suffix {
    "$it!"
}
println(suffixFn.exclaim("Hello") // "Hello!"
```

Here we define an interface for our function and we can create a function based on that interface. The syntax for creating a function when using functional interfaces is `Interface { body }`, and in our case we use the `Suffix` interface to create a function body that returns an exclaimed string. Now we actually have a type for our function meaning that we can use that to restrict what another function will accept as a parameter. 

```kotlin
fun doStuff(fn: Suffix) = fn.exclaim("Hello")
doStuff(suffixFn)
```

One thing we can see from the example is that we need to invoke the function we defined in our interface, e.g `suffixFn.exlciam`. A neat trick to get around this is to use the [invoke operator](https://kotlinlang.org/docs/reference/operator-overloading.html#invoke). 

```kotlin
fun interface Prefix {
    operator fun invoke(s: String): String
}
val prefixFn: Prefix = Prefix {
    "~$it"
}
println(prefixFn("Hello")) // "~Hello"
```

Now we can simply call the `prefixFn` without an additional namespace. 

As with regular lambdas we can also return functions from functional interfaces. This might help us break down complex function signatures to more manageable types. 

```kotlin
fun interface Math {
    fun value(s: Int): (Int) -> Int
}
val timesX = Math { times ->
    { it * times }
}
val timesTwo = timesX.value(2)
println(timesTwo(5)) // 10
```

In simple cases using the type signature is good enough and we can get away without using typealiases or function interfaces. When our types get more complex we probably want to introduce something to help us with that, and functional interfaces is the way to go. They give us proper type safety that we won’t get with typealiases! 


