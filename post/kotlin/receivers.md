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
Did you know that you can change the scope of functions? It’s pretty awesome. In Kotlin we can change the scope of functions using receivers and the standard library does it all the time. 

Let's take a closer look at the familiar `apply` function.

```kotlin
data class User(var username: String, val id: Int)
val user = User("Kris Kringle", 1234)
user.apply { 
    username = "Santa"
}
```

With `apply` we don't have to reference the object we are working with, and instead, we get a block where `this` refers to the object. This means that we can access properties like `username` implicitly without referring to `user.username`. Cool! But how can we make our own `apply` function?

Lambdas with receiver types is the answer! 

```kotlin
fun caps(user: User, text: User.() -> String): String = user.text().capitalize()

val user = User(username = "Santa", id = 1)
caps(user) {
    "$username!"
}

// result: SANTA!
```

*If you need a refresher on how lambdas work in Kotlin you can read about them in the [post about lambdas](https://kotlin.christmas/2019/18).*

Ok, so let's take a closer look at whats happening in the example above. The `caps` function takes in a user and a lambda with some unusual syntax: `text: User.() -> String`. What's happening here? We have the standard lambda function type `() -> String` prefixed with a type! The prefixed type is the receiver, and in our example the receiver is a `User`.

But what does this mean? So what we do is that we assign a new scope, or a receiver type, to our function. The context of `this` changes inside the lambda and we can now call everything on a `User` object without having to reference it.

```kotlin
fun caps(user: User, text: User.() -> String) =
       user.text().capitalize()
```

The second thing that might look slightly weird at first glimpse is the way the `text` function is called. It's called directly on the user-object as if it were an extension function. When working with lambdas with receivers we have some nice syntactical sugar. Since the parameter `user` has the same type as the receiver we can call the lambda directly on it, meaning that `user.text()` is the same thing as `text(user)`. 


The `caps` function looks very similar to the `with` standard function in Kotlin, which is not a keyword, but is in fact a function in the standard library. Let's compare them.

```
caps(user) {
    "$username!"
}

with(user) {
    "$username!"
}
```

Both `caps` and `with` changes the context of the code-block allowing us to refer directly to properties without referencing the object we are working on.

We can also use receivers with extension functions. Let's change `caps` to be an extension function. 

```
fun User.caps(text: User.() -> String): String = text().capitalize()
```

Since `this` in extension functions refer to the object it's extending we can call `text` directly, as our receiver type matches the type we are extending.  Pretty sweet!

```
fun User.caps(text: User.() -> String): String = text().capitalize()

val user = User(username = "Santa", id = 1)
user.caps {
    $username
}
```

With that simple change we made our `caps` function looks and behave more more like `apply` than `with`.

Receivers makes it possible us to create some pretty interesting things, but with great syntactical powers comes great responsibilities. Lambdas with receivers is a specialized tool we can use to change the context of lambdas!
