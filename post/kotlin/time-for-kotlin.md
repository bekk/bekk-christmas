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

which will print `177687us.`  Another nice feature is the ability to decompose a *Duration* into convenient parts using `toComponents`

```
    val elapsedTime = 3.days + 68.hours + 112.minutes

     elapsedTime.toComponents { hours, minutes, seconds, nanoseconds ->
        println("Hours:        $hours")
        println("Minutes:      $minutes")
    }

```

However, the library is perhaps most useful if you want to measure the duration of some block of code when executed. `measureTime` to the rescue

```
val elapsed: Duration = measureTime {
    Thread.sleep(100)
    println("Measuring time via measureTime")
}
println(elapsed)

```

Or, if you need to return a result from your measured block of code, `measureTimedValue` is an alternative

```
val (elapsedTime, returnValue) = measureTimedValue {
    Thread.sleep(100)
    println("Measuring time via measureTime")
    "The returned value"
}
println(elapsedTime)
```

Under the hood `measureTime` and `measureTimedValue` uses the corresponding functions on the underlying `TimeSource`. By default `Monotonic` is used, which is a `TimeSource` Implementation on top of `System.nanoTime()`, which is the monotonic (strictly increasing) clock in Java, and therefore the most robust way of measuring elapsed time. There is also a `TestTimeSource` implementation that can be used if you need to control the elapsed time for testing purposes. 

`TimeSource` has a single function, `markNow()`, which returns a `TimeMark`. The `TimeMark` provides methods for checking how much time (as `Duration`) has passed since the mark, creating offsets from the mark, and checking if a marks has occurred or not.

```
    val mark = Monotonic.markNow()
    val inThreeSeconds = mark + 3.seconds

    Thread.sleep(3000)

    println(inThreeSeconds.hasPassedNow())
```

`kotlin.time` is nice, little library which simplifies measuring and manipulating elapsed time compactly and robustly. It is still experimental, and its features can change (and has in the past). But if you are about to sprinkle your Kotlin code with large amounts of `java.time.Duration`, consider using this little native gem instead.