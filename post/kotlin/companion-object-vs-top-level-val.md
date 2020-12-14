---
calendar: kotlin
post_year: 2020
post_day: 15
title: Companion object vs top level val
ingress: Ever wondered where to declare your constants, or static methods in
  Kotlin? Even though Kotlin has no explicit notion of statics, there are
  multiple ways of mimicking the same behavior.
---
A static is a field or function that is independent of class instances and can be accessed directly, e.g. a global constant. Coming from a Java background, one often defaults to using companion objects - At least I do 🤷‍♂️ This will typically result in something like this: 

```
class Foo {
    companion object Bar {
        const val baz = "foobar"
    }
    ...
}
```
 the constant is then is accessed from ```Foo.baz```

Seeing that Kotlin allows for defining top level constants and functions, that is, constants and functions defined outside of any class, one can usually make do with something like this:

```
const val baz = "foobar"

class foo { ... }
```

Both of these approaches are acceptable for some usages, but unless you *really* want to tightly couple a field with some class, top level definitions is the way to go. For most uses, companion objects are simply expensive and overkill.

Here's why:
When creating a companion object and placing constants inside of it, the Kotlin compiler decorates🎄 its outer class with an object, namely the companion object, in addition to the structure needed for instantiating and accessing it.

By using IntelliJ's Kotlin decompiler, which transforms Kotlin into Java bytecode, and then decompiles that bytecode into equivalent Java code, we can have a closer look at the companion object approach:

```
class Northpole {
    companion object {
        const val rudolf = "the reindeer"
    }
}
```
will yield bytecode equivalent to this Java code:

```
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
which contains a lot of superflous fuzz 🤯

The top level const declaration however

```const val santa = "claus"```

results in a much less bloated Java block:
```
public final class Northpole {
   @NotNull
   public static final String santa = "claus";
}
```

In addition to providing more efficient bytecode, the syntax of top level declarations is simply cleaner. So, unless you really need companion object specific behavior, stick to top level declarations 👌 