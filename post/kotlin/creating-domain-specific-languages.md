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
                .builder("addStatement")
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

  public fun addStatement(statement: String): Code {
    this.statements += statement
    return this
  }
}
```

At this point we know the output we want, and we pretty much know how to achieve it using **kotlintpoet**'s API. The thing we need to figure out is how our custom kotlin-kotlinpoet-dsl is going to work. And this, to me, shows off one of the best features of the kotlin language; its flexibility. Prettymuch regardless of how we want our DSL to work, look and feel, it would be possible to create it. So lets start with the dream scenario;

```kotlin
file("com.christmas.kotlin", "Code.kt") {
  class("Code") {
    property("statements" as MUTABLE_LIST.parameterizedBy(STRING)) {
      initializer("mutableListOf()")
    }
    function("addStatement", "statement" as STRING, returns = class("Code")) {
      body {
        "this.stements += statement"
        "return this"
      }
    }
  }
}
```

Our idealized code does however have some major flaws. Most notably using the keywords `class` and `as` in a way that the compiler really disapproves of. Renaming `class -> clazz` and `as -> withType`, we do however reach a point at which it is actually possible to implement a working example.

We'll start by implementing the major function `file`, `class`, `property` and `function`, as these are pretty similar to each other.

```kotlin
fun file(packageName: String, fileName: String, block: FileSpec.Builder.() -> Unit = {}): FileSpec {
    val builder = FileSpec.builder(packageName, fileName)
    builder.apply(block)
    return builder.build()
}

fun FileSpec.Builder.clazz(className: String, block: TypeSpec.Builder.() -> Unit) {
    val builder = TypeSpec.classBuilder(className)
    builder.apply(block)
    this.addType(builder.build())
}

fun TypeSpec.Builder.property(prop: Pair<String, TypeName>, block: PropertySpec.Builder.() -> Unit) {
    val builder = PropertySpec.builder(prop.first, prop.second)
    builder.apply(block)
    this.addProperty(builder.build())
}

fun TypeSpec.Builder.function(name: String, vararg parameters: Pair<String, TypeName>, returns: TypeName, block: FunSpec.Builder.() -> Unit) {
    val builder = FunSpec.builder(name)
    parameters.forEach { (name, type) -> builder.addParameter(name, type) }
    builder.returns(returns)
    builder.apply(block)
    this.addFunction(builder.build())
}
```

These four function work in a very similar way, by the fact that they all first create a `Builder`, applies our "DSL-function block", and lastly either returns the built type or adds it to the parent context. Whenever we want to add the type to a parent context we need access to that context, and that is why `clazz`, `property` and `function` are implemented as extention functinon on their respective parent context.


Infix function, specialization of `A.to(that: B)` just added to make things more readable
```kotlin
infix fun String.withType(that: TypeName) = Pair(this, that)
```

BodySpec isnt a thing in **kotlinpoet**, so added to make the creation of function-bodies a bit easier on the eyes.

Used the `operator unaryPlus`-overloading, as we need a way of capturing the strings within the `body` context.
```kotlin
class BodySpecBuilder(val funSpec: FunSpec.Builder) {
    operator fun String.unaryPlus() {
        funSpec.addStatement(this)
    }
}
fun FunSpec.Builder.body(block: BodySpecBuilder.() -> Unit) {
    val builder = BodySpecBuilder(this)
    builder.apply(block)
}
```

Second `clazz` overload, scoped to `TypeSpec.Builder` insteadof `FileSpec.Builder` to limit where it can be used. But is needed for the `returns = class("Code")` syntax
```kotlin
fun TypeSpec.Builder.clazz(name: String): TypeName {
    return ClassName("", name)
}
```


Final code;
```kotlin
file("com.christmas.kotlin", "Code.kt") {
    clazz("Code") {
        property("statements" withType MUTABLE_LIST.parameterizedBy(STRING)) {
            initializer("mutableListOf()")
        }
        function("addStatement", "statement" withType STRING, returns = clazz("Code")) {
            body {
                +"this.stements += statement"
                +"return this"
            }
        }
    }
}
```
