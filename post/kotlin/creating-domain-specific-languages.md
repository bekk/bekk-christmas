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
First things first, lets talk about what we mean by domain specific language (DSL). In alot of ways we can think of it as a mini-language, or an API specifically designed to solve a very specific problem. Looking around the internet you'll find example of DSLs being used to [instantiate complex datastructures](https://github.com/kotlin/kotlinx.html/wiki/DOM-trees), configuring the [build-system](https://docs.gradle.org/current/userguide/kotlin_dsl.html), configuring [webserver](https://ktor.io/docs/routing.html#extensibility), building [layouts for android app](https://github.com/Kotlin/anko/wiki/Anko-Layouts#basics), and a whole lot more.

In this article however we're taking a crack at retrofitting a DSL to kotlinpoet. Those of you who have read "[Kotlin metaprogramming with kotlinpoet
](https://preview.bekk.christmas/kotlin/2020/12)" have gotten a small introduction. But to recap, **kotlinpoet** is Java/Kotlin API for generating .kt source files. And as we'll see it comes with a "java-ish" API, but maybe we can make it feel a bit more like kotlin-happiness. The article ended with an example of generating a simple class containing a single property and a single function. 
```kotlin
val packageName = "com.christmas.kotlin"
val className = "Code"

val cls = TypeSpec.classBuilder(className)
        .addProperty(PropertySpec
                .builder("statements", MUTABLE_LIST.parameterizedBy(STRING))
                .initializer("mutableListOf()")
                .build()
        )
        .addFunction(FunSpec
                .builder("addState")
                .returns(ClassName(packageName, className))
                .addParameter("statement", STRING)
                .addStatement("this.statements += statement")
                .addStatement("return this")
                .build()
        )

val file = FileSpec.get(packageName, cls.build())

println(file.toString())
```

Whichs prints;
```kotlin
package com.christmas.kotlin

import kotlin.String
import kotlin.collections.MutableList

public class Code {
  public val statements: MutableList<String> = mutableListOf()

  public fun addState(statement: String): Code {
    this.statements += statement
    return this
  }
}
```


