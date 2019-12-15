---
calendar: kotlin
post_year: 2019
post_day: 16
title: Overhead from calling? Not with inline!
ingress: >-
  On the JVM, calling a function or instantiating a class will always incure an
  overhead, unless the JVM runtime performs some magic. At least, that's how it
  used to be before Kotlin introduced the inline keyword. This article will give
  you a quick introduction to this fantastic keyword, and how it can help you!
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
Now, say we have some hyper-optimization to do(yes, on the JVM. No, the JVM will not inline for us at runtime for.. reasons 🤷‍♀️ ), so we simply cannot accept the overhead of the function call!
Enter, `inline`.

```kotlin
public inline fun List<String>.findStringOfLength(targetLength: Int): Boolean
```

By adding the `inline` keyword to the function signature, the call to `findStringOfLength` will be inlined at the call site by the compiler.
In essence, it copies the code of the `findStringOfLength` function, and replaces any `findStringOfLength` call with the code in the function body. Neat!
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

- The `any` function would be called as a static function
- Any Lambdas passed as arguments would be compiled into a generic function object at *each* call site

So, if we're only passing regular functions to `any`, there isn't that much overhead.
But we pass Lambdas, don't we?

This reveales another effect of the `inline` modifier - Lambdas which are passed as arguments are also inlined! 🤯
So by passing Lambdas to an inline function, we avoid both the runtime costs of the static version of the inline function, as well as the generic function object of the Lambda!
This is one of the many reasons that Kotlin can maintain performance on par with Java, while extending the Java library with modern concepts.

#### noinline

While inlining of lambdas is great in most circumstances, there are times where that's not desired. 
In that case, just annotate the function argument with `noinline`.
```kotlin
public inline fun <T> Iterable<T>.any(noinline predicate: (T) -> Boolean): Boolean
```

#### Non-local returns

Lambdas are allowed to use the return keyword with a label, e.g. `return@forEach`.
When the lambda is used as an argument to an inline function however, the return keyword will act as if it was a return used in the function body of the enclosing function.
This is a small but neat trick that makes an ordinary extension function seem as if it's part of the language!

```kotlin
fun foo() {
    listOf(1, 2).forEach {
        if(it % 2 == 0) return //Acts the same as the return in the for loop below
    }
    for (i in listOf(1, 2)) {
        if(i % 2 == 0) return
    }
    println("No even number found!")
}
```

#### crossinline

Non-local returns can be great, and makes the Lambdas feel like a natural part of the language.
However, there might be times when this kind of functionality is not desired, such as when passing the lambda to another function.
To deny this behavior, just add the crossinline keyword to the argument.

```kotlin
public inline fun <T> Iterable<T>.any(crossinline predicate: (T) -> Boolean): Boolean
```

### Generic functions

Another usecase is generic functions where you need access to the actual type of the generic parameter.
Normally, generic functions does not have access to the actual type of a generic parameter, as the generic type is erased at runtime.
With an inlined function however, the function will be executed in place where it still has access to the type.
Just add the keyword `reified` to the generic type!

```kotlin
public inline fun <reified T> Iterable<T>.any(predicate: (T) -> Boolean): Boolean
```

For more information, see [day 15](https://kotlin.christmas/2019/15) of the Kotlin Christmas calendar.

## Inline class ⚠️

An experimental feature of Kotlin is inline classes.

```kotlin
inline class Salary(val salary: Int)
inline class Age(val age: Int)
```

These classes can only have one actual property(as declared in the constructor), and no init block.
While this sounds like a somewhat amputated class, the power comes when the code is compiled.
The compilator will prefer to erase the inline class, so source code which deals with the Name class, will (mostly) see the String class after compilation.
This has some key benefits;

- The overhead incured when using the inline class is comparable to other primitive wrappers such as Integer and Boolean, so minimal
- The optimizations related to primitives(e.g. Long or Floats) are used
- The ability to have stronger type safety on properties

As an example, see the following two data classes;

```kotlin
data class Employee(val name: String, val salary: Int, val age: Int)

data class EmployeeWithInlineClass(val name: Name, val salary: Salary, val age: Age)
```

When you use the Employee class, it's easy to accidently swap the salary and age arguments.
With EmployeeWithInlineClass however, you have to instantiate the arguments with the correct type, forcing you to send in the right value to the right argument.
This is of course nothing new, as one could use a regular old class before, but that would guarantee an overhead!
When an inline class is compiled on the other hand, the compiler will prefer to erase the inline class as much as possible and stick to the primitive wrapped.
This will yield better performance when compared to using the tradition class, while providing the same type safety, which again can lead to fewer bugs. For more on inline classes, see [this post](https://kotlinexpertise.com/kotlin-inline-classes/) on the Kotlin Expertise Blog.
