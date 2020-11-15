---
calendar: kotlin
post_year: 2020
post_day: 12
title: Kotlin metaprogramming with kotlinpoet
ingress: Wouldn't it be sweet if you could automate writing code. Well, that's
  what we're taking a look at today. Metaprogramming, code generation, or in
  short; writing kotlin code that generates even more kotlin code :mind_blown:.
description: kotlin metaprogramming meta kotlinpoet
links:
  - url: https://square.github.io/kotlinpoet/
    title: Kotlinpoet documentation
authors:
  - Nicklas Utgaard
---
_Disclaimer_: This article focuses on source code generation, and does not make any comparison to byte buddy, asm, javaassist or [others](https://stackoverflow.com/questions/2261947/are-there-alternatives-to-cglib/9823788#9823788). 

Today we're going to take a look at kotlinpoet and some of the possibilities code generation offers. 

In it's most simple form codegeneration can simply be any program, that when executed spits out valid sourcecode. As an example, a simple function which returns a print statement;
```kotlin
fun createHello(who: String) = "println(\"Hello, $who\")"

createHello("world") // return println("Hello, world")
```

There is nothing spectacular going on here. When it is executed it prints out some valid code, that we potentially could use later. 
But, lets make it more complex and at the same time introduce todays star **kotlinpoet**;
```kotlin
val packageName = "com.christmas.kotlin"
val className = "Code"

val cls = TypeSpec
  .classBuilder(className)

val file = FileSpec.get(packageName, cls.build())

println(file)

// ---- Returns ----

package com.christmas.kotlin

public class Code
```

Kotlinpoet doesn't do much in the example above, but as we'll see it will help us more further down the line. `FileSpec` and `TypeSpec` are kotlinpoet's representations of files and classes, and once we got a `TypeSpec` we can add in more stuff like properties, constructors and other functions.

To add a simple property to our `Code` class we use define a `PropertySpec` and add it to our already existing `TypeSpec`;
```kotlin
val cls = TypeSpec
  .classBuilder(className)
  .addProperty(PropertySpec
    // MUTABLE_LIST and STRING are predefined TypeName's included in kotlinpoet
    .builder("statements", MUTABLE_LIST.parameterizedBy(STRING))
    .initializer("mutableListOf()")
    .build()
  )

// ---- Returns ----
package com.christmas.kotlin

import kotlin.String
import kotlin.collections.MutableList

public class Code {
  public val statements: MutableList<String> = mutableListOf()
}
```

All of a sudden our class has a property and some import statements. Kotlinpoet keeps track of which import statements are needed to make our code work without us programming it explicitly. The complexity at this point is somewhat limited, but even now we get some help from the library.

Adding a function to our class continues in a similar vein;
```kotlin
val cls = TypeSpec.classBuilder(className)
  // .addProperty(...)
  .addFunction(FunSpec
    .builder("addStatement")
    .returns(ClassName(packageName, className))
    .addParameter("statement", STRING)
    .addStatement("this.statements += statement")
    .addStatement("return this")
    .build()
  )

// ---- Returns ----
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

**Kotlinpoet** correctly identified that the `Code` class is visible within our class, and thus didn't add an import or use the fully qualified name for the class. However, if we change the return type of our function to `LONG` it would include it as an import. Consequently it would also generate code that wouldn't compile as our function has `return this` which isn't a `Long` , whoopsi. Fortunately, we are generating kotlin source code, and the kotlin compiler would probably tell us that something was wrong. 

This might seems like quite alot of work to get a small class. And while that might be true, it also opens up the possibility to automate some really cool stuff. Looking through the usage of **kotlinpoet** on [mvnrepository](https://mvnrepository.com/artifact/com.squareup/kotlinpoet/usages) we can see it being used by [Arrow (Arrow-Meta)](https://arrow-kt.io/docs/0.10/apidocs/arrow-meta/arrow.meta.encoder/-meta-api/index.html), [Microsoft Thrifty compiler plugin](https://github.com/microsoft/thrifty/tree/master/thrifty-compiler-plugins), the [apollo-compiler](https://github.com/apollographql/apollo-android/tree/main/apollo-compiler) and [ExpediaGroup's graphql-kotlin](https://github.com/ExpediaGroup/graphql-kotlin).

