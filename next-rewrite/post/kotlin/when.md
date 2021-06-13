---
calendar: kotlin
post_year: 2019
post_day: 3
title: 'If Not Now, When?'
ingress: >-
  This article will give you a brief introduction to the Kotlin `when`
  expression and how to use it.
description: kotlin when
authors:
  - Øyvind Midtbø
---
If you're used to Java, you’re probably used to the `switch` statement:
```
switch (number) {
    case 0:
        System.out.println("zero");
        break;
    case 1:
        System.out.println("one");
        break;
    case 2:
        System.out.println("two");
        break;
     default:
        System.out.println("something else");
        break;
}
```

In Kotlin we have the `when` statement – which can be described as `switch` on steroids. `when` can be used both as an expression and as a statement.

The first example is a basic `when` statement:
```
when (number) {
    0 -> println("zero")
    1 -> println("one")
    2 -> println("two")
    else -> println("something else")
}
```

You can already see that it’s cleaner than the `switch` statement.

It's possible to specify ranges as well:
```
when (number) {
    0 -> println("zero")
    1, 2 -> println("one or two")
    in 3..10 -> println("between three and ten")
    !in 11..20 -> println("not between eleven and twenty")
    else -> println("something else")
}
```

You can also check the type of the parameter with the `is` expression. Here you’ll also benefit from the _smart cast_ in Kotlin, which means that the `is` keyword implicitly casts `value` to the given type.
```
when (value) {
    is String -> println(value.replaceFirst("a", "b"))
    is Int -> println(value * 2)
    is Boolean -> println(!value)
}
```

In these examples we've seen the use of `when` as a statement. As mentioned earlier, `when` can also be used as an expression, as we can see in this example:
```
val numberAsString = when (number) {
    1 -> "one"
    2 -> "two"
    else -> "something else"
}
println("The number is $numberAsString")
```

If the compiler can guarantee that `when` always returns a value there is no need for `else`:
```
fun example(trueOrFalse: Boolean) {
    when (trueOrFalse) {
        true -> println("true")
        false -> println("false")
    }
}
```

You can even use `when` without an argument. When used without an argument it acts more like an if-else chain:
```
when {
    carType == "Porsche" -> println("fast car")
    carType == "Jeep" -> println("beach car")
    numberOfCars > 5 -> println("many cars, but not Porsche or Jeep")
}
```

As you can see, the Kotlin `when` statement can be used in many different ways. Happy coding!
