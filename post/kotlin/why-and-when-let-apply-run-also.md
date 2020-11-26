---
calendar: kotlin
post_year: 2020
post_day: 2
title: "Why and When: let, apply, run, also"
ingress: The Kotlin standard library has a lot of amazing stuff and today we
  will take a closer look at what let, run, also and apply is and when to use
  them.
links:
  - url: https://kotlin.christmas/2019/21
    title: Kotlin Receivers
authors:
  - Vegard Veiset
---
<!--StartFragment-->

The two things they all have in common is that they create a new scope where we can do stuff and that we can use them on all the types. If we look at the signature of the different methods some of them are more similar than others. 


```kotlin
Generic      method    f input            f output  return
----------------------------------------------------------
<T, R>       T.let     (block: (T)   ->   R):       R
<T, R>       T.run     (block: T.()  ->   R):       R
<T>          T.also    (block: (T)   ->   Unit):    T
<T>          T.apply   (block: T.()  ->   Unit):    T
```


Let's start with a brief introduction on how to read the signatures above. The first part is the generic types the function uses, the letter doesn't matter, but what matters is how many letters there are. Each letter corresponds to a generic type, which can be whatever. The second part is the function and the parameters it takes in, in this case they all take functions as parameters. Lastly we have the return type which matches one of the generic types. 

So if we take a closer look at what the definition of let is we can see it uses two generics. First we have the generic T which is the type we can run `.let` on, which means we can run it on anything that is a type (e.g. a data class, a boolean or a list). The second type is R which is both the return type and the return type of the function we pass as a parameter. This means we pass in a function to let that return whatever and that type will be the final result of calling `.let` on something. If we have an expression like `"hello".let { it.length }` we can see that the function we pass returns an `Int` and because of that we also know that the return type of the whole expression will be an `Int`. 


Let's take a look on what this means in practise: 


```kotlin
data class User(val name: String, val age: Int)
val user = User(“Santa”, 1749)

user.let { it -> it.name } // “Santa”
user.run { name }          // “Santa”
user.apply { name }        // User(“Santa”, 1749)
user.also { it.name }      // User(“Santa”, 1749)
```

Here we see that both `apply` and `also` returns the object we invoked them on, while `let` and `run` returns something new. If we look back at the signatures we can see that this matches the generics and the return types.

Side note: If you're wondering about the `T.()` syntax that is used by run and apply to access properties like name directly check out last year's article about [Receiviers](https://kotlin.christmas/2019/21])

## Why and When

So the big question is when and what should you use? After working with Kotlin full time for almost 5 years I’ve found myself leaning more and more towards using `let` and `also` and very seldom using `apply` and `run`. Let's explore why that is! The main reason for that is that both let and also use an explicit parameter, and when having any nested code at all, makes it much more clear what is happening.


### Apply
The example often used to highlight the power of `apply` is changing properties on a class, which assumes that we are working with mutable data. If we are talking about a Kotlin project with minimal Java code in the code base then that might be a code smell, but apply is useful when interfacing with the Java builder pattern modifying properties that typically are mutable.

```kotlin
SoapRequestBuilder().apply {
        fieldA = "hello"
        fieldB = "world"
        user = UserBuilder().apply {
                firstName = "Alice"
                country = "New Zealand"
        }.build()
}.build()
```

In this example Apply is perfectly fine. But when working with immutable data we typically wont use apply. Let's look at an alternative to apply.


### Also
Also works very similar to apply, except that instead of having implicit access to the properties of the thing we are invoking it on we get the reference passed to our lambda. 

A good example for when to use also is when you want to log some information while doing a chain of operations. 

```kotlin
val averageAge = userService.getUsers()
        .also { log("Got ${it.size} users") }
        .map { it.age }
        .average()
    
val users = userService.getUsers()
log("Got ${users.size} users")
val averageAge = users
        .map { it.age }
        .average()
```

Here we see the beauty of the standard library. By using .also we avoid assigning an intermediate result just to log it and I personally think the code reads a lot better when using also.

But back to .apply, why shouldn’t we use apply in this context?

```kotlin
val averageAge = userService.getUsers()
        .apply { log("Got $size users") }
```

For this simple example using apply is totally fine, but once we start nesting expressions this will get pretty messy pretty fast.

```kotlin
getConfig().apply {
    getUsers().apply { 
        log("Got $size, with $maxSize") 
    }
}

getConfig().also { config ->
    getUsers().also { users -> 
        log("Got ${user.size}, with ${config.maxSize}")  
    }
}
```

In a real application you will most likely have more code surrounding the places where you use apply/also and then using .also over .apply even in the simple example makes it much more clear where the properties come from. Prefer clarity over concise. 

### Let
Let is very useful and can be used for a range of things. You can use it for null checking, creating a new scope and it can be used to make your code more readable. 

Normally you would use the elvis operator for null checks, but if your code needs to do something more than just returning a default value it might not be feasible to use the elvis operator. 

```kotlin
val name = user.name ?: "Unknown"
val name = user.name?.let {
     ... omitted code
        when {
            user.age > 200 -> "Cyborg"
            user.age > 100 -> "Old"
            else -> "Unknown"
        }
}
```

Here .let allows us to nest code and do more than what you would normally be able to do when using just the elvis operator. Let is also great for when we want to chain operations.

```kotlin
val ordersForBob = getUsers()
    .first { it.name == “Bob” }
    .let { user -> getOrders(user) }
```

One thing to be weary of when using let is that creating new scopes aren’t always the way to go. Moving some logic to a function, instead of having everything in a single expression, may make the code easier to follow.

```kotlin
user.name?.let { 
    ....
    when (...) { ... }
}
```
vs 

```kotlin
user.name ?: handleNullName(user)
```


### Run
Run is kind of weird. It’s a mix of both .apply and .let, it has the behaviour of let and the implicit nature of .apply. What this means is that we can use properties without explicitly referring to the object and the last line of the code block will be returned.

```kotlin
val config = defaultConfig().apply {
   name = “bob”
}
val server = Server(config)

val server = defaultConfig().run {
  name = “bob”
  Server(this)
}
```

At first glance it looks pretty useful when the object you are working with both has some mutable variables you want to change and you also want to create something based on what you changed. Let's take a closer at another example:

```kotlin
Server().run {
   port = 3000
   createServer()
}
```

Here we create an instance of Server, mutate the port variable and call the function createServer on Server. Confused? Me too. Even in this small example I would argue that using either let or apply would give us more clarity on what is happening here. Is the createServer function part of the Server class or is it a function somewhere else? The problem though is that you very fast lose clarity of what you are doing when using run. I would argue using apply or let is almost always better than using run. Let us rewrite the example with using let and apply and see if it makes our intention clearer.

**Better**

```kotlin
val serverConfig = Server().apply { port = 3000 }
serverConfig.createServer()
```

**Best**

```kotlin
Server().let {
    it.port = 3000
    it.createServer()
}
```

I would not recommend using run if you aren’t sure what you are doing, it might offer more concise code, but in my experience using run often results in confusion when coming back to the code at a later point. 

## Summary


So what have we learned? They all have their place, but being explicit is often a good idea. If you’re unsure what to use, stick with let and also and try to keep your code as clear as possible!


<!--EndFragment-->