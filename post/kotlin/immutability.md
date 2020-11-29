---
calendar: kotlin
post_year: 2020
post_day: 1
title: Immutability
image: ""
ingress: Welcome to the second year of the Bekk’s Kotlin advent calendar. If you
  followed us last year welcome back, and if you’re new this year you’re in for
  a treat. Each day leading up to Christmas Eve there will be a new post about
  Kotlin features, tooling, the Kotlin ecosystem and more!
links:
  - title: Advent of Code
    url: https://adventofcode.com/
  - title: kotlin.christmas 2019
    url: https://kotlin.christmas/2019
authors:
  - Vegard Veiset
---
This year sure has been different than most of us would have predicted back in 2019. 2020 has been a year filled with uncertainty and chaos, our lives have changed a lot and the new norm has become staying indoors and keeping social interaction to a minimum. Some things don't change though, so for today's post let's take a closer look at: Immutability.

## Never Change

Kotlin has an easy way for us to differentiate the intent of a variable being changeable or not with the respective keywords `var` and `val`. For variables that we want to change we use `var` and for the ones we don’t we use `val`.

```kotlin
var mutableString = "hello"
val immutableString = "hello"
```

By denoting the variable with `val` we have an immutable variable. Awesome, right? If it had been that simple, there are always exceptions to the rule. 

Consider the following example:

```kotlin
val deliveryCrew = mutableListOf("Santa", "Rudolph") 
deliveryCrew.add("Comet") 
```

Even though `deliveryCrew` is defined as a `val` we can still change the data if the assigned object is mutable. It's important to know that `val` only makes the object reference immutable, not the data itself. 

Another crazy thing you can do to get around the immutability of using val, I'm not sure why you would do this, is to override the getter of the `val` to make it return something random.

```kotlin
class PleaseDontDoThis {
    val mutableVal: String
        get() = listOf("Prancer", "Dancer", "Comet").random()
}    
val myClass = PleaseDontDoThis()
println(myClass.mutableVal)      // Dancer
println(myClass.mutableVal)      // Prancer
```

Even though the `val`-keyword doesn't ensure immutability in Kotlin, using it we’ll come a long way to make sure our data is immutable and not an ever changing chaos. 


Immutability is generally a really good idea. It makes your code easy to follow and you're sure that the data you're working on isn't being changed by passing it to some function. 

Nothing is a silver bullet though. So what are the drawbacks of immutability? One of the drawbacks can be a loss of performance, though in almost all day to day cases that cost is worth it. Check out Romans great post about the cost of immutability in kotlin: [Immutability we can afford](https://elizarov.medium.com/immutability-we-can-afford-10c0dcb8351d). 

Data classes in Kotlin come with a `copy` function to make a copy of an object with some changes to it, like changing the age of a user: `user.copy(age = user.age + 1)`. This works great for simple objects. But what about trying to change deeply nested data structures? This can lead to some ugly code for sure. My first thought when encountering this is "can I change this to be less nested and less messy?", usually the answer is yes, but if the answer to that question is no, then a concept from functional programming called [Optics](https://medium.com/@gcanti/introduction-to-optics-lenses-and-prisms-3230e73bfcfe) might be of help. 

To sum it up: Immutability is generally a good idea and immutable data makes your code a lot easier to reason about. Kotlin might not be as immutable as you think, and even though using `val` doesn't guarantee immutability it goes a very long way of making the intention of your code clear and your data unchangeable. Immutability, never change! 

## The Advent Spirit

Want more Kotlin? Check out our last year's [Kotlin advent calendar](https://kotlin.christmas/2019) or have fun solving the daily programming puzzles over at [Advent of Code](https://adventofcode.com/). I'm for sure going to solve some of them!
