---
calendar: kotlin
post_year: 2019
post_day: 17
title: Sealed classes
image: >-
  https://images.unsplash.com/photo-1533084417605-e538a510d50a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1502&q=80
ingress: ''
links:
  - title: Sealed classes
    url: 'https://kotlinlang.org/docs/reference/sealed-classes.html'
authors:
  - Henrik Gundersen
---
Sealed classes in Kotlin are a concept close to enums that we are used to from other programming languages. They are used for representing restricted class hierarchies, which means that each type have to be within a restricted set. Unlike enums, each value can exists as different instances. This gives us the possibility to make more expressive data models.

## How to declare a sealed class
To declare a sealed class — put the `sealed` modifier in front of the class name. Note that a sealed class can have subclasses, but all of them must be declared in the same file as the sealed class itself.

To illustrate this, let's look into a simple example. In this example we are doing a payment with different payment methods:

```kotlin
sealed class PaymentMethod() {
  data class CreditCard(val token: String, val expireDate: String) : PaymentMethod()
  data class DirectPayment(val phonenumber: String) : PaymentMethod()
}
```

Each of these payment methods have different requirements for data. When handling a `CreditCard` payment we need a `token` and an value for `expireDate`. Handling a `DirectPayment` only requires a `phonenumber`.

As we can see here, each of the classes have to extend the sealed class `PaymentMethod`. Every class defined inside `PaymentMethod`, might have their own state, extend state from `PaymentMethod` or even just be an `object` with no state at all. 

## Utilizing the `when` expression
The real power of sealed classes can be seen using the `when` expression. As described earlier, there is a restricted set of possible types when defining sealed classes. This restriction makes it possible for the compiler to warn you if you are not handling all possible outcomes in the `when` expression.

In the following example we are trying to process a payment:

```kotlin
// Does not compile :(
fun processPayment(payment: Payment) =
  when (payment.paymentMethod) {
    is PaymentMethod.CreditCard -> processCreditCardPayment(paymentMethod.token, paymentMethod.expireDated)
}
```

This code will not compile. Can you see what's missing in the `processPayment` function?🤔

As you probably could see, we didn't handle all possible outcomes of `PaymentMethod`. Let's add the missing `DirectPayment` to the `processPayment` method:

```kotlin
// Compiles :)
fun processPayment(payment: Payment) =
  when (payment.paymentMethod) {
    is PaymentMethod.CreditCard -> processCreditCardPayment(paymentMethod.token, paymentMethod.expireDated)
    is PaymentMethod.DirectPayment -> processDirectPayment(paymentMethod.phonenumber)
}
```

This will now compile since all possible values of `PaymentMethod` is handled inside the `when` expression. 

Another important benefit we get by using `when` expressions, is `smartcast`. When the `paymentMethod` matches one of the `is` statements - we can use the object directly without the need for explicit casting.

## Summary
Sealed classes gives us a new tool for creating cleaner and better data models. By by utilizing sealed classes with the `when` expression, the compiler will also help us to handle all possible values. Even though this sometimes might feel cumbersome, it will definitely make the code more solid and more maintainable.
