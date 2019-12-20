---
calendar: kotlin
post_year: 2019
post_day: 21
title: Receivers
links:
  - title: Kotlin Lambdas
    url: 'https://kotlinlang.org/docs/reference/lambdas.html'
authors:
  - Vegard Veiset
---
Did you know that you can change the scope of lambdas? It’s pretty awesome. In Kotlin you can change the scope of lambdas by using a concept called receivers, and the Kotlin standard library does it all the time. 

Let's take a closer look at the familiar `apply` function.

```kotlin
data class User(var username: String, val id: Int)
val user = User("Kris Kringle", 1234)
user.apply { 
    username = "Santa"
}
```

With `apply` you don't have to reference the object you are working with, and instead, you can use properties such as `username` directly. Cool! So how can we implement our own `apply`?

Lambdas with receiver types is the answer! 

*This post assumes basic knowledge about lambdas. Head over to [On wavelength with lambdas](https://kotlin.christmas/2019/18) for a short introduction.*

```kotlin
fun caps(user: User, text: User.() -> String): String = user.text().capitalize()

val user = User(username = "Santa", id = 1)
caps(user) {
    "$username!"
} // result: SANTA!
```

Ok, so let's take a closer look at whats happening in the example above. The `caps` function takes in a user and a lambda with some unusual syntax: `text: User.() -> String`. What's happening here? We have a lambda function type prefixed with a type! The prefix is a receiver type, and in our example that is a `User`.

But what does this mean? What is a receiver? Receivers assigns a scope, or a receiver type, to a lambda. This means that we can change what `this` is inside a lambda. Having a `User` as a receiver gives us the power to call everything on a `user` object without having to explicitly reference it.

```kotlin
fun caps(user: User, text: User.() -> String) =
       user.text().capitalize()
```

The second thing that might look slightly weird at first glimpse is the way the `text` lambda is invoked. It's called directly on the user object as if it were an extension function. When working with lambdas with receivers we have some nice syntactical sugar; since the parameter `user` has the same type as the receiver, we can call the lambda directly on it. This means that in the context of our lambda `user.text()` is the same thing as `text(user)`. 


Our `caps` function doesn't quite look like apply yet, but we are getting there. On the other hand `caps` looks very similar to the `with` function in Kotlin, which is not a keyword, but is in fact a function in the [standard library](https://github.com/JetBrains/kotlin/blob/master/libraries/stdlib/src/kotlin/util/Standard.kt). Let's compare them.

```kotlin
caps(user) {
    "$username!"
}

with(user) {
    "$username!"
}
```

Both `caps` and `with` changes the context of the code block allowing us to refer directly to properties. But our goal was to implement `apply`, not `with`. 

Extension functions to the rescue! Let's change our `caps` function to be an extension functions and see what happens. 

```kotlin
fun User.caps(text: User.() -> String): String = text().capitalize()
```

In extension functions `this` refers to the object it's invoked on and since we are extending `User`, `this` is actually a reference to a user. When using receivers types this allows us to call `text()` directly without supplying the `user` to it.

```kotlin
fun User.caps(text: User.() -> String): String = text().capitalize()

val user = User(username = "Santa", id = 1)
user.caps {
    $username
}
```

Now we're talking. With that change our `caps` function look and behave much more like `apply`. Using extension functions and lambdas with receiver types we can make a lot of cool code snippets, and even create amazing domain specific languages!

Receivers makes it possible us to create some pretty interesting things, but remember that with great syntactical powers comes great responsibilities.
