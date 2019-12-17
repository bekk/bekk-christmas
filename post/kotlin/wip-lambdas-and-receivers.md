---
calendar: kotlin
post_year: 2019
post_day: 18
title: On wavelength with lambdas
authors:
  - Vegard Veiset
---
There are a lot of ways to define a function in Kotlin and lambdas are a central part of that. Lets take a look at some ways we can define a function in Kotlin.

The first thing we'll take a look at is the familiar function with typed arguments,  a function body and a return type. In Kotlin we can define them as follows:

## Function

```kotlin
fun plus(a: Int, b: Int): Int {
    return a + b
}
```

This is fine, but for many functions, we can do better and improve the readability by making it a single expression function.


## Single Expression Function

```kotlin
fun plus(a: Int, b: Int): Int = a + b
```

This approach often leads to more concise and readable code, but be careful of trying to make everything into single expression functions; it can get messy! 

One of the great things about Kotlin is that you can assign functions to variables. This has some cool implications. Functions are first-class citizens, meaning we can pass them as we would with any variable. Let's take a look at how we assign a function to a variable.

## Lambdas

```kotlin
val plus: (Int, Int) -> Int = { a, b -> a + b } 
```

To create a function variable we've introduced some new syntax. We have a function type `(Int, Int) -> Int` and a lambda expression `{ a, b -> a + b }`. The function type is really just an interface for a function. We can't use that interface elsewhere, but it's still an interface describing what a function takes as arguments, in our case `(Int, Int)`, and what it returns (`Int`). The second part is the lambda expression. A lambda expression is an anonymous functions with some (or zero) parameters (`a, b`) and a body (`a + b`). 

In Kotlin you will often see lambda expressions. Let's take a quick look at one of the functions in the standard library. 

```kotlin
listOf(1, 2, 3).sumBy { it + 1 }
```

A lambda! `{ it + 1 }`. This might look a little weird the first time you encounter it. There are no parenthesis around the argument! What is happening here? So this is some cool syntactic sugar Kotlin supplies us with. If the last argument of a function is a lambda, we can omit the parenthesis, meaning that `sumBy { it + 1 }` is the same as `sumBy({ it + 1})`. 

There is one more thing here, the `it` parameter, some more syntax sugar. If a lambda has a single argument we can simply refer to it by the `it` keyword: `{ myArgument -> myArgument + 1 }` is the same thing as `{ it + 1 }`.

The `sumBy` function takes a function as an argument. How can we do that in our code? Let's take a closer look at source code of `sumBy`.

```kotlin
public inline fun <T> Iterable<T>.sumBy(selector: (T) -> Int): Int {
    var sum: Int = 0
    for (element in this) {
        sum += selector(element)
    }
    return sum
}
```

To take a function as a parameter we use a function type, and in `sumBy` it's defined as `selector: (T) -> Int`. A generic argument that results in a number, and for `sumBy` that makes a lot of sense. We can supply whatever we want as long as the result is a number. 

And there we have it! A function that can take functions as arguments. There are two ways we can invoke it. We can pass a function variable or simply writing a lambda:

```kotlin
val words = listOf("Kotlin", "Christmas", "Lambdas")

val plus: (String) -> Int = { it.length }
words.sumBy(plus)

words.sumBy { it.length }
```

## sumBy(article)

In Kotlin, we have a few choices on how to define our functions. We can use functions with bodies, single expression functions or lambdas. They all have their place and their usage so don't be afraid to experiment and find what gives your code the best readability. Don't be afraid to dive in to the source code of the standard library. It's good, often easy to understand and can give you some inspiration on how to structure your own code!

