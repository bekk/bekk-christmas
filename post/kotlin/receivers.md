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
Did you know that you can change the scope of functions? It’s pretty awesome. In Kotlin you can change the scope of functions by using a concept called receivers, and the standard library does it all the time. 

Let's take a closer look at the familiar `apply` function.

```kotlin
data class User(var username: String, val id: Int)
val user = User("Kris Kringle", 1234)
user.apply { 
    username = "Santa"
}
```

With `apply` you don't have to reference the object you are working with, and instead, you can use the properties ,such as `username`, directly. Cool! But how can we implement our own `apply`?

Lambdas with receiver types is the answer! 

*This post assumes knowledge about how lambdas. Head over to [On wavelength with lambdas](https://kotlin.christmas/2019/18) for a short introduction.*

```kotlin
fun caps(user: User, text: User.() -> String): String = user.text().capitalize()

val user = User(username = "Santa", id = 1)
caps(user) {
    "$username!"
}

// result: SANTA!
```

Ok, so let's take a closer look at whats happening in the example above. The `caps` function takes in a user and a lambda with some unusual syntax: `text: User.() -> String`. What's happening here? We have the lambda function type `() -> String` prefixed with a type! The prefixed type is the receiver, and in our example the receiver is a `User`.

But what does this mean? What is a receiver? Receivers assign a new scope, or a receiver type, to a function. Meaning that we can change what `this` inside a lambda refers to. Having a `User` as a receiver gives us the power to call everything on a `User` object without having to explicitly  reference it. In our example this means that `this` is set to `user`, and when accessing `username` we actually refer to `user.username`.

```kotlin
fun caps(user: User, text: User.() -> String) =
       user.text().capitalize()
```

The second thing that might look slightly weird at first glimpse is the way the `text` function is called. It's called directly on the user-object as if it were an extension function. When working with lambdas with receivers we have some nice syntactical sugar; since the parameter `user` has the same type as the receiver we can call the lambda directly on it. This means that in the context of our lambda `user.text()` is the same thing as `text(user)`. 


Our `caps` function doesn't quite look like apply, but we are getting there. On the other hand `caps` looks very similar to the `with` function in Kotlin, which is not a keyword, but is in fact a function in the standard library. Let's compare them.

```kotlin
caps(user) {
    "$username!"
}

with(user) {
    "$username!"
}
```

Both `caps` and `with` changes the context of the code-block allowing us to refer directly to properties without referencing the object we are working on.

But we wanted to implement `apply`, not `with`. Extension functions to the rescue! Let's change our function to be an extension functions and see what happens. 

```kotlin
fun User.caps(text: User.() -> String): String = text().capitalize()
```

In extension functions `this` refers to the object it's extending. And in our extension function the receiver type and the extended type is the same, meaning that we can call our lambda directly. Pretty sweet!

```kotlin
fun User.caps(text: User.() -> String): String = text().capitalize()

val user = User(username = "Santa", id = 1)
user.caps {
    $username
}
```

With that change we made our `caps` function look and behave more more like `apply` than `with`. 

Receivers makes it possible us to create some pretty interesting things, but with great syntactical powers comes great responsibilities. Lambdas with receivers is a specialized tool we can use to change the context of lambdas!
