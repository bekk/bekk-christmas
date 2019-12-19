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
Did you know that you can change the scope of functions? It’s pretty awesome. In Kotlin we can change the scope of our functions using receivers and the standard library uses it all the time. 

Let's take a look at the familiar `apply` function.


```
data class User(var username: String, val id: Int)
val user = User("Kris Kringle", 1234)
user.apply { 
    username = "Santa"
}
```

With `apply` we don't have to reference the object we are working with, and instead, we get a block where `this` refers to the object. In this example `username` implicitly refers to `user.username`. So how can we use this, and make the functions we write behave similar to `apply`?

Using lambdas with receivers we can do the same:

```
fun caps(user: User, text: User.() -> String): String = user.text().capitalize()

val user = User(username = "Santa", id = 1)
caps(user) {
    "$username!"
}

// result: SANTA!
```

If you're unfamiliar with how lambdas works in Kotlin, or you need a little refresher head over to the [post about lambdas](https://kotlin.christmas/2019/18). 

Ok, so let's take a closer look at whats happening in the example above. The `caps` function takes in a user and a lambda with some unusual syntax: `User.() -> String`. The weird syntax is the syntax for reducers, where the `User.` is the receiver type and `() -> String` is the function type. 

We have some nice syntactical sugar when working with receivers. Since `user` has the same type as the receiver we can call the lambda directly on it, instead of calling the lambda with the `user` as an argument. In this context `user.text()` is the same thing as `text(user)`. 

We can also expand on this and make a receiver function that takes arguments. If we want to make the caps function take in a suffix we could change it to:

```
fun caps(user: User, text: User.(String) -> String): String = user.text("!").capitalize()

caps(user) { suffix ->
    "$username$suffix"
}

// result: SANTA!
```

This looks very similar to the `with` standard function in Kotlin, which is not a keyword, but is in fact a function in the standard library.

Simplified `with` looks something like this:

```
fun <T, R> with(receiver: T, block: T.() -> R): R  = receiver.block()
```

We can also use receivers with extension functions. Let's change `caps` to be an extension function. 

```
fun User.caps(text: User.() -> String): String = text().capitalize()

val santa = User(username = "Santa", id = 1)
santa.caps {
    $username
}

// result: Santa!
```

When using extension functions this implicitly becomes the object we are extending, so we can call our lambda, `text`, without referencing the user object at all. Pretty sweet!

Now this is starting to looks very similar to `apply`. 

```
fun <T> T.apply(block: T.() -> Unit): T {
    block()
    return this
}
```


Receivers makes it possible us to create some pretty interesting things, but with great syntactical powers comes great responsibilities. 
