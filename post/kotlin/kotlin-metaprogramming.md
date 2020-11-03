---
calendar: kotlin
post_year: 2020
post_day: 12
title: Kotlin metaprogramming with kotlinpoet
ingress: Wouldn't it be sweet if you could write code that generated code. Well,
  that's what we're taking a look at today. Metaprogramming, code generation, or
  in short; writing kotlin code that generates even more kotlin code
  :mind_blown:.
description: kotlin metaprogramming meta kotlinpoet
links:
  - url: https://square.github.io/kotlinpoet/
    title: Kotlinpoet documentation
authors:
  - Nicklas Utgaard
---
_Disclaimer_: This article focuses on source code generation, and does not make any comparison to byte buddy, asm, javaassist or [others](https://stackoverflow.com/questions/2261947/are-there-alternatives-to-cglib/9823788#9823788). 

Today we're going to take a look at kotlinpoet and some of the possibilities code generation offers. 

In it's most simple form codegeneration can simply be any program, that when executed spits out valid sourcecode. In our first code example we see a simple function, that when executed returns `println("Hello, World")`
```kotlin
fun createHello(who: String) = "println(\"Hello, $who\")"

createHello("world") // return println("Hello, world")
```

Nothing spectacular going on here. But, make it more complex and at the same time introduce todays star **kotlinpoet**. Lets start by creating a simple class;
```kotlin
val packageName = "com.christmas.kotlin"
val className = "Code"

val cls = TypeSpec
  .classBuilder(className)

val file = FileSpec.get(packageName, cls.build())

println(file)

---- Returns ----

package com.christmas.kotlin

public class Code
```

Well, that's not very exciting. Lets try adding a property to our `Code` class;
```kotlin
val cls = TypeSpec
  .classBuilder(className)
  .addProperty(PropertySpec
    // Using predefined TypeName which are included in kotlinpoet
    .builder("statements", MUTABLE_LIST.parameterizedBy(STRING))
    .initializer("mutableListOf()")
    .build()
  )

---- Returns ----
package com.christmas.kotlin

import kotlin.String
import kotlin.collections.MutableList

public class Code {
  public val statements: MutableList<String> = mutableListOf()
}
```

Suddenly, our class has a property. But more interesting is the fact that it also added the correct imports. Adding a function to our class continues in a similar vein;
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

---- Returns ----
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

Kotlinpoet correctly identified that the `Code` class is visible, and thus didn't add an import or use the fully qualified name for the class. However, if we change the return type of our function to `LONG` it would include it as an import. Consequently it would also generate code that wouldn't compile as our function has `return this` which isn't a `Long`.


