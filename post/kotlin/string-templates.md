---
calendar: kotlin
post_year: 2020
post_day: 6
title: String templates
---
Consider the following snippet of code:

```kotlin
        val dollars = 100.00
        val s1 = String.format("All I want for Christmas is $ %s!", dollars)
        val s2 = "All I want for Christmas is $ " + dollars + "!"
        val s3 = "All I want for Christmas is \$ $dollars!"
        val s4 = """All I want for Christmas is ${'$'} $dollars!"""
```

The statements are four different ways of obtaining exactly the same string:

**All I want for Christmas is $ 100.0!**

The latter two are using the string template construct of Kotlin, in an *escaped string* and a *raw string*, respectively. The `$` symbol indicates the start of a template, and if you need a ‘$’ symbol in your text it needs to be handled separately, in an escaped string by escaping (what else) the character, or by doing some small trickery in the case of a raw string. 

In this case the string template is simple, with the `$` immediately followed by the variable. In more complex cases the expression needs to be put in curly brackets, for example:

```kotlin
val s5 = "All I want for Christmas is \$ ${dollars + 100_000}!"
val s6 = "All you get for Christmas is \$ ${if (hasBeenGood) dollars else 0.0}!"
val s7="${i++} ... ${i++} ... ${i++} - here’s Santa!"
```

The contents of the string template should be a Kotlin expression, or a block ending with an expression. An expression is any code construct that returns a single value. Statements and blocks can be used without compilation errors, but results in a Unit being returned, which isn’t very useful, normally.  

Performance-wise the first statement using `String.format` is by far the slowest, since it is a thin layer on top of Java’s `string.format`, which in turns parses the string for arguments on each invocation. Of curse, it offers advanced formatting options for things like numbers, currencies and dates. String templates do no such thing. In fact, the three other statements compiles to exactly the same Kotlin bytecode:

```
    NEW java/lang/StringBuilder
    DUP
    INVOKESPECIAL java/lang/StringBuilder.<init> ()V
    LDC "All I want for Christmas is $ "
    INVOKEVIRTUAL java/lang/StringBuilder.append (Ljava/lang/String;)Ljava/lang/StringBuilder;
    DLOAD 1
    INVOKEVIRTUAL java/lang/StringBuilder.append (D)Ljava/lang/StringBuilder;
    LDC "!"
    INVOKEVIRTUAL java/lang/StringBuilder.append (Ljava/lang/String;)Ljava/lang/StringBuilder;
    INVOKEVIRTUAL java/lang/StringBuilder.toString ()Ljava/lang/String;
    ASTORE 4
```

As we can see, under the hood Kotlin uses the Java `StringBuilder`. The main argument for using string templates over ‘+’ is that they read better. 

Notice that string templates are evaluated when the statement executes. In some cases you want the string building to happen as late as possible. An example is logging, where a typical log statement using string templates would look like something like.

```kotlin
log.debug(“The number of presents in Santa’s sleigh is ${presents.size}”)
```

If the log level is higher than debug, the expression would be evaluated and the string assembled even though the logger would not write anything to the appender. Most log frameworks has functions similar to String.format:

```kotlin
log.debug(“The number of presents in Santa’s sleigh is %d”, presents.size)
```

which ensures the string assembly happens only if the log level is DEBUG. However, like for String.format, it comes with a performance penalty when string building actually occurs.

In conclusion, string templates make embedding expressions in strings easier and more readable than other techniques. But it boils down to string building ye olde way, and in some cases, as for logging, it may be more efficient to delay the work till it is actually needed.