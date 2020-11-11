---
calendar: kotlin
post_year: 2020
post_day: 14
title: 'WIP: Some fancy title with the word "reified" in it'
ingress: >-
  _Reification_. It's one of those terms that you may have heard a colleague
  mention, or you might have picked up on when roaming the interwebs, but you
  never really got around to actually look into the meaning and application of
  it. Like many other concepts, it can be applied in a number of different ways
  and it might carry slightly different meanings depending on the context. For
  example, most of the types we use explicitly in Java, be it primitive types or
  classes, are available to us indeed because they are defined as [reifiable
  types](https://docs.oracle.com/javase/specs/jls/se7/html/jls-4.html#jls-4.7).
  Additionally, in Kotlin we actually have a modifier keyword built into the
  language, namely _reified_.


  In this article we'll look at how type erasure and reification are connected, and more specifically how we can combine _inline functions_ and _reified_ generic type parameters in Kotlin to achieve things in generic functions that we normally would not be able to.
---
## A brief introduction to type erasure

In order to get a good picture of how and when reification can help us, a little background is needed. As with Java, Kotlin applies [type erasure](https://kotlinlang.org/docs/reference/generics.html#type-erasure) to generic type parameters when our code is compiled. In other words, information about our generic type parameters are _by default_ not available to us at runtime. We can illustrate this by looking at some examples. Let's say we have the following trivial generic functions which simply takes an argument of a generic type `G` and returns it:

```kotlin
fun <G> simpleGenericFunctionWithoutBound(thing: G) = thing

fun <G : ExtendableClass> simpleGenericFunctionWithBound(thing: G) = thing
```

To see what actually happens "under the hood" we can look at the decompiled bytecode (\*). The functions we declared above will be decompiled to the following Java code (note that some annotations and other generated artifacts have been removed in order to make the example more terse):

```java
public static final Object simpleGenericFunctionWithoutBounds(Object thing) {
    return thing;
}

public static final ExtendableClass simpleGenericFunctionWithBound(ExtendableClass thing) {
    return thing;
}
```

Here we're observing how type erasure and [bounded/unbounded type substitution](https://docs.oracle.com/javase/tutorial/java/generics/erasure.html) have been applied by the compiler. Our `simpleGenericFunctionWithoutBound`-function has had its generic type parameter replaced by `Object`. Similarly in `simpleGenericFunctionWithBound` it has been replaced by `ExtendableClass`, which we defined as the upper limit for our generic type parameter.

As a result of this substitution, there is no way for us to derive any information at runtime about the concrete type of the supplied argument when these functions are being invoked. Put in another way, generic function type parameters are defined as _non-reifiable_.

\* _The IntelliJ IDE comes with a handy tool for inspecting kotlin bytecode and its decompiled Java counterpart. This can be found under "Tools > Kotlin > Show Kotlin Bytecode"._

## The _reified_ modifier keyword

So how can we reify our type parameters in the generic functions we defined above?
Unfortunately there's no escaping the type erasure that the compiler applies. Instead, Kotlin can help us yet again with some of its language specific magic. We can modify the generic functions we defined earlier like so, and invoke it:

```kotlin
inline fun <reified G : Any> simpleGenericFunctionWithoutBounds(thing: G): G {
    print(G::class)
    return thing
}

fun main() {
    simpleGenericFunctionWithoutBounds(ExtendableClass())
}
```

The _inline_ modifier keyword tells the Kotlin compiler that we want to perform [inline expansion](https://en.wikipedia.org/wiki/Inline_expansion) of the function at the callsite. We will not go into the details of inlining (\*), but it has some interesting implications which Kotlin can take advantage of to get around type erasure. Essentially what happens is that the content of the declared function body is duplicated and included wherever we're invoking the function.

Since we have information about the generic type parameter at time of invokation, maybe there is some way to carry over this information to runtime? This is what the _reified_ modifier keyword instructs the compiler to do. Let's invoke our updated function and take another look at the decompiled byte code (again, some annotations and other generated artifacts have been removed for terseness):

```kotlin
    // Function declaration
    public static final Object simpleGenericFunctionWithoutBounds(Object thing) {
        ...
        Intrinsics.reifiedOperationMarker(4, "G");
        KClass var2 = Reflection.getOrCreateKotlinClass(Object.class);
        boolean var3 = false;
        System.out.print(var2);
        return thing;
    }

    // Invokation
    public static final void main() {
        new ExtendableClass();
        ...
        KClass var2 = Reflection.getOrCreateKotlinClass(ExtendableClass.class);
        ...
        System.out.print(var2);
    }
```

Here we see how Kotlin has gotten around the erasure of parameterized types, and provided us with runtime information about the actual type of the argument we invoked the function with! We can take advantage of this to do things we otherwise would not be able to, like using the Reflection API as we did in the example above, using it for [type checks and type casts](https://github.com/JetBrains/kotlin/blob/master/spec-docs/reified-type-parameters.md), and so forth .

\* _You can read more about the inline modifier keyword in the [Kotlin docs](https://kotlinlang.org/docs/reference/inline-functions.html)._
