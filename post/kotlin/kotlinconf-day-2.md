---
calendar: kotlin
post_year: 2019
post_day: 7
title: On the second day of KotlinConf
image: >-
  https://upload.wikimedia.org/wikipedia/commons/6/61/Tivoli_Copenhagen_night.jpg
ingress: >-
  KotlinConf 2019 is over. Two fantastic days of talks, announcements,
  conversations and more. Here are some of the highlights from the product
  announcement on day 1 and the whole of day 2.
links:
  - title: 'Day 2 talks '
    url: 'https://kotlinconf.com/talks/6-dec'
authors:
  - Thomas Oddsund
  - Vetle Bu Solgård
  - Yrjan Fraschetti
---
# Space
Just before the party kicked of on day one of KotlinConf, Maxim Shafirov, CEO of JetBrains, announced the company's newest product: [Space](https://www.jetbrains.com/space/).

Space is an integrated team environment, with which JetBrains takes on Atlassian, Micrsoft and Slack all at once. It promises features like team management, chat, IDE integration, issue tracking, VCS and much more. And it's all built with Kotlin! It potentially substitutes literally all inter-communication tools of a company 🤯
The demo looked very promising, so we're really looking forward to see what becomes of it.

# Day 2

## Talks
The second day of KotlinConf began with a story about risk management in the NASA Space Shuttle program, held by Stephen Carver. He talked about how an organisational culture can become so bad that communication between departments becomes non existent, and how this ended with astronauts loosing their lifes. Not just once, but twice.

### Failure is not an option - Error handling strategues for Kotlin programs
![](/assets/failure.jpg "Failure is not an option")
This talk by Nat Pryce and Duncan McGregor revolves around error handling in Kotlin. As we know, Kotlin has largely inherited Java's exception mechanisms but, as the two brits put it: "exceptions and functional programming are uneasy bedfellows, leading to most projects adopting a wing-and-a-prayer as their error handlign strategy". So, how should we do it in Kotlin? Well, it depend.

For simple cases such as parsing an int from a string, they have found that null can work as an error. However, our world is rarely simple, so they outlined two other solutions; the familiar exceptions and the "Result" type. When throwing exceptions, they recommended "fuzzy" tests to ensure that there weren't any unexpected exceptions. When using the "Result" type, they suggested to prefer immutable data and delegate handling of failures as high up the stack as possible by propgating the failure Result. To provide the Result type and utilities, they proposed the use of Result4k in specific situations. Your milage may vary, though.

### Android Jetpack ❤️

In 2017 Android announced first-class support for Kotlin, and since 2017 both the platform and the language has evolved a lot. That is why this year Google announced that Android will become Kotlin-first. In this talk Wojtek Kaliciński talked about the current state of Android Jetpack, which is a suite of libraries for app development on Android. Part of the talk was also to present how the future will look like for the API development on Android.

Included in Android Jetpack is **Android KTX** which is a set of Kotlin extensions that build upon the already existing Java API. It utilises Kotlin language features such as **extension functions**, **lambdas**, **coroutines** and more. By using Kotlin language features to build upon the existing API you get a much more concise approach to using some parts of the API.

Wojtek Kaliciński presented a very nice example of how utilising Kotlin to improve Android Jetpack improved the overall experience of using the library. He did so using `SharedPreferences`, which is an interface to access and modify preference data on an Android device.

With the old approach you have to first create an `Editor`, put in the desired values with the associated keys, and then asynchronously write to disk. By using extension functions and lambdas, we're able to do all this in one call where we supply a lambda with the desired change.

```kotlin
sharedPreferences
        .edit()
        .putBoolean("key", value)
        .apply()
```
And look how much better this is with the **Android KTX** extension 🤩
```kotlin
sharedPreferences.edit { putBoolean("key", value) }
```

The future of both the Kotlin language and the Android platform is looking bright! ☀️
