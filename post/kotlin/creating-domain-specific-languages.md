---
calendar: kotlin
post_year: 2020
post_day: 15
title: Creating domain-specific languages
ingress: Kotlin introduces a lot of new language features for us developers.
  Those features allows us to create code that is type-safe, easy to write and
  easy to reason about. A good example of this are the type-safe builders a.k.a
  DSLs, and in this article we're taking a look at how we can create our own
  DSLs.
description: kotlin dsl type-safe builder pattern
links:
  - title: Type-Safe Builders
    url: https://kotlinlang.org/docs/reference/type-safe-builders.html
  - title: Gradle Kotlin DSL Primer
    url: https://docs.gradle.org/current/userguide/kotlin_dsl.html
  - title: Ktor - Extensibility
    url: https://ktor.io/docs/routing.html#extensibility
authors:
  - Nicklas Utgaard
---
Kotlin DSLs are widely used within the kotlin ecosystem, and you'll find them anywhere from your [build-config](https://docs.gradle.org/current/userguide/kotlin_dsl.html) (e.g `.build.gradle.kts`) to how you configure your webserver (e.g [ktor](https://ktor.io/docs/routing.html#extensibility)). But in this article we're going to use them to create our own access control DSL.

