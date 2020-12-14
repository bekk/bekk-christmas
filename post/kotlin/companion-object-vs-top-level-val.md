---
calendar: kotlin
post_year: 2020
post_day: 15
title: Companion object vs top level val
ingress: Ever wondered where to declare your constants, or static methods in
  Kotlin? Even though Kotlin has no explicit notion of statics, there are
  multiple ways of mimicking the same behavior.
authors:
  - Eirik Årseth
---
A static is a field or function that is independent of class instances and can be accessed directly, e.g. a global constant. Coming from a Java background, one often defaults to using companion objects - at least I do 🤷‍♂️ This will typically result in something like this: 

```kotlin
class Foo {
    companion object Bar {
        const val baz = "foobar"
    }
    ...
}
```

 the constant is then accessed from `Foo.baz`

Seeing that Kotlin allows for defining top level constants and functions, that is, constants and functions defined outside of any class, one can usually make do with something like this:

```kotlin
const val baz = "foobar"

class Foo { ... }
```

Both of these approaches are acceptable for some usages, but unless you *really* want to tightly couple a field with some class, top level definitions is the way to go. For most uses, companion objects are simply expensive and overkill. Here's why: When creating a companion object and placing constants inside of it, the Kotlin compiler decorates🎄 its outer class with an object, namely the companion object, in addition to the structure needed for instantiating and accessing it.

By using [IntelliJ’s Bytecode Viewer and Java Decompiler tools](https://kotlin.christmas/2020/5), we can compare our Kotlin source code to its equivalent Java counterpart. Let's have a closer look at the companion object approach:

```kotlin
class Northpole {
    companion object {
        const val rudolf = "the reindeer"
    }
}
```

This concise Kotlin implementation will yield bytecode equivalent to the following Java code:

```java
public final class Northpole {
   @NotNull
   public static final String rudolf = "the reindeer";
   public static final Northpole.Companion Companion = new Northpole.Companion((DefaultConstructorMarker)null);

   public static final class Companion {
      private Companion() {
      }

      public Companion(DefaultConstructorMarker $constructor_marker) {
         this();
      }
   }
}
```

That's a lot of fuzz for a simple static variable 🤯

A top level const, like `const val santa = "claus"` results in a much less bloated Java block:

```java
public final class Northpole {
   @NotNull
   public static final String santa = "claus";
}
```

In addition to providing more efficient bytecode, the syntax of top level declarations is simply cleaner. So, unless you really need companion object specific behavior, stick with top level declarations 👌

If you want to group multiple constants within a single block, the [object constructor](https://kotlinlang.org/docs/reference/object-declarations.html#object-declarations) is useful. It creates a [singleton](https://en.wikipedia.org/wiki/Singleton_pattern) object that can encapsulate your constant, in a readable and efficient manner:



```kotlin
object Northpole {
    const val alabaster = "Snowball"
    const val bushy  = "Evergreen"
    const val pepper = "Minstix"
}
```

The three elves defined inside the Northpole object are all static members within a single class in the equvalent Java code:

```java
public final class Northpole {
   @NotNull
   public static final String alabaster = "Snowball";
   @NotNull
   public static final String bushy = "Evergreen";
   @NotNull
   public static final String pepper = "Minstix";
   public static final Northpole INSTANCE;

   private Northpole() {
   }

   static {
      Northpole var0 = new Northpole();
      INSTANCE = var0;
   }
}
```

### Conclusion

There are multiple ways of mimicking statics in Kotlin. Companion objects gives you a "static" block within a class, but with a tiny bit of overhead compared to its Java counterpart. Instead you could make use of top level constants and functions, declared outside of any class. And if you have multiple related constants (or functions), consider wrapping them inside an object declaration.