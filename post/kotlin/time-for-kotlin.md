---
calendar: kotlin
post_year: 2020
post_day: 20
title: Time for Kotlin
image: https://source.unsplash.com/FlHdnPO6dlw/1600x900
---
`kotlin.time` is a small, experimental library introduced with Kotlin 1.3. Its main purpose is to simplify measuring and manipulating elapsed time. 

A central class is `Duration` which is similar to `java.time.Duration`, but offers more syntactic sugar to simplify operations on elapsed time. In combination with extension properties and operator overloading, you can write things like

```
val elapsedTime = 28_343_564.nanoseconds + 60.5.milliseconds
val doubleElapsedTime = elapsedTime * 2
println(doubleElapsedTime.toString(DurationUnit.MICROSECONDS))
```

which will return `177687us.`  Another nice feature is the ability to decompose a *Duration* into convenient parts using `toComponents`

```
    val elapsedTime = 3.days + 68.hours + 112.minutes

     elapsedTime.toComponents { hours, minutes, seconds, nanoseconds ->
        println("Hours:        $hours")
        println("Minutes:      $minutes")
    }

```