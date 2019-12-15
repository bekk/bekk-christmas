---
calendar: kotlin
post_year: 2019
post_day: 16
title: Inline your things before you call your things!
ingress: Some ingress
authors:
  - Thomas Oddsund
---
## Inline function

Say we have an extension function for finding one element in a list of strings which has some specific length.

```kotlin
public fun List<String>.findStringOfLength(targetLength: Int): Boolean {
    if (isEmpty()) return false
    for (element in this) if (element.length == targetLength) return true
    return false
}

val result = listOf("Cake", "Pie", "Pasta").findStringOfLength(4)
```

Yes, this is a simple and contrived function for this use case, but it illustrates the point.

The function will be compiled into a static function as part of a final class, which will then be called at the call site.
Now, say we have some hyper-optimization to do(yes, on the JVM. No, the JVM will not inline for us at runtime for reasons), so we simply cannot accept this function call!
Enter, `inline`.

```kotlin
public inline fun List<String>.findStringOfLength(targetLength: Int): Boolean
```

By adding the `inline` keyword to the function signature, the call to `findStringOfLength` will be inlined at the call site by the compiler!
In essence, it copies the code of the `findStringOfLength` function, and replaces any `findStringOfLength` call with the code in the function body. Neat! 🥳
However, if you copy this simple sample code, you'll get this reminder from the compiler;

> Expected performance impact of inlining '*function definition*' is insignificant. Inlining works best for functions with parameters of functional types

So when might this be usefull? 🤔

### Higher-order functions

In the Kotlin standard library, there is a cornucopia of extension functions which make our lifes easier.
One example of such a function is the `any` function, a higher-order function which is callable on anything `Iterable`.
By the help of Intellij, here's a definition and sample call.

```kotlin
public inline fun <T> Iterable<T>.any(predicate: (T) -> Boolean): Boolean {
    if (this is Collection && isEmpty()) return false
    for (element in this) if (predicate(element)) return true
    return false
}

listOf("Cake", "Pie", "Pasta").any { it.length == 4 }
```

`any` acceptes a function argument called `predicate` and calls it on each element in the list.
If the predicate returns true for any element, the `any` function will also return true.
Now, if `any` didn't have the `inline` modifier, this would mainly have two consequences;

- The `any` function would be compiled into a static function
- Any Lambdas passed as arguments would be compiled into a generic function object at *each* call site

So, if we're only passing regular functions to `any`, there isn't much overhead any the inline modifier isn't needed.
But we pass Lambdas, don't we?

This reveales another effect of the `inline` modifier - Lambdas which are passed as arguments are also inlined!
So by passing Lambdas to an inline function, we avoid both the runtime costs of the static version of the inline function, as well as the generic function object of the Lambda!
This is one of the many reasons that Kotlin can maintain performance on par with Java, while extending the Java library with modern concepts.

#### noinline

While inlining of lambdas is great in most circumstances, there are times where that's not desired. 
In that case, just annotate the function argument with `noinline`.
```kotlin
public inline fun <T> Iterable<T>.any(noinline predicate: (T) -> Boolean): Boolean {
```

#### crossinline

### Generic functions

### reified

## Inline class

