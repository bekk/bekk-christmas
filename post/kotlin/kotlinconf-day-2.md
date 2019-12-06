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
  - Yrjan Fraschetti
  - Vetle Bu Solgård
  - Thomas Oddsund
---
Forslag til ting å skrive om:

* Nytt produkt
* common first talk - Yrjan
* talks
* exhibition
* puzzlers
* closing panel

**See you in <fyll inn eneste års lokasjon>!**

# Space
Just before the party kicked of on day one of KotlinConf, Maxim Shafirov CEO of JetBrains announced the company's newest product: [Space](https://www.jetbrains.com/space/).

Space is an integrated team environment, with which JetBrains takes on Atlassian, Micrsoft and Slack all at once. It promises to become a fully featured EAP with team management, chat, IDE intregation, issue tracking, VCS and much more. And it's all built with Kotlin! It potentially substitutes literally all inter-communication tools of a company 🤯
The demo looked very promising, so we're really looking forward to see what becomes of it.

# Day 2

## Talks
The second day of KotlinConf began with a story about risk management in the NASA Space Shuttle program, held by Stephen Carver. He talked about how an organisational culture can become so bad that communication between departments becomes non existent, and how this ended with astronauts loosing their lifes. Not just once, but twice.


### Failure is not an option - Error handling strategues for Kotlin programs
![](/assets/failure.jpg "Failure is not an option")
This talk by Nat Pryce and Duncan McGregor revolves around error handling in Kotlin. As we know, Kotlin has largely inherited Java's exception mechanisms but, as the two brits put it: "exceptions and functional programming are uneasy bedfellows, leading to most projects adopting a wing-and-a-prayer as their error handlign strategy". So, how should we do it in Kotlin? Well, it depend.

In a pinch, they have fund that for their case they use null for simple parse errors, "fuzz" tests to make sure they do not propagate unexpected exceptions, prefer immutable data and push code that can fail on the outer layers. They also propse the use of Result4k in specific situations. Your milage might vary, though.


### Android jetpack ❤️

In 2017 Android announced first-class support for Kotlin, from 2017 both the platform and the language has evolved a lot. That is why this year Google announced that Android will become kotlin-first. In this talk Wojtek Kaliciński talked about the current state of Android Jetpack which is a suite of libraries for app development on Android. Part of the talk was also to present how the future will look like for the API development on Android.

Included in Android Jetpack is **Android KTX** which is a set of kotlin extensions which builds upon the already existing java API. It utilises Kotlin language features such as **extension functions**, **lambdas**, **coroutines**, and more. By using Kotlin language features to build upon the existing API you get a much more concise approach to using some parts of the API.

Wojtek Kaliciński presented a very nice example of how utilising kotlin to improve Android jetpack improved the overall experience of using the library.
`SharedPreferences` is an interface to access and modify preference data on an Android device.

With the old approach you have to first create an `Editor`, the put in the desired values with the associated keys, and then asynchronously write to disk. By using extension functions and lambas we're able to do all this in one call where we supply a lambda with the desired change in preferences.

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
