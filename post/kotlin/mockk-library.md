---
calendar: kotlin
post_year: 2020
post_day: 12
title: MockK Library
ingress: MockK is a mocking library for Kotlin, written in Kotlin. Because of
  this, it has extensive support for Kotlin language features such as extension
  functions and companion objects.
description: ""
links:
  - url: https://mockk.io/
    title: MockK Homepage
  - title: MockK Guidebook
    url: https://notwoods.github.io/mockk-guidebook/
  - title: MockK Github
    url: https://github.com/mockk/mockk
authors:
  - Kristoffer Olsen
---
## What is mocking?
Mocking is a technique that is primarily used in unit tests, or tests that validates the functionality of parts of the code in isolation. When running unit tests on classes, they are often *dependent* on other classes to function properly. 

As an example, imagine a `Car` class, which is dependent on another very complex `Engine` class in order to work. How do we isolate the testing of the car (the unit under test) from the engine (a dependency of the unit)?

A solution to this problem is to create fake versions of the dependencies. Instead of providing an actual engine for the car, we can instead provide a *mock object* which mimics the behavior of the dependency without all the underlying details, thus isolating the unit under test from its dependencies.

Mock objects can be configured in many different ways to suit the needs of different unit tests, and allows the test writer full control of the behavior of dependencies for any given test. 

For reference, a mock object of the unit in focus in a unit test is often referred to as *System Under Test* (SUT), and the mocked dependencies of the SUT are often called *Dependent-On Components* (DOC).
## How to mock in MockK

### `mockk` and `every`
The bread and butter of MockK are the two functions `mockk` and `every`. You declare mock objects by using `mockk`, and you *mock* away dependencies by using `every`. This use of `every` is also called *stubbing behavior* to generate *canned responses*.

Let us consider a simple class for example demonstration purposes:
```kotlin
// Example class
class Santa(val title: String, val name: String): SantaI {
  fun getTitleAndName(): String = 
    "$title $name"
  
  fun laugh(n: Int): String =
    "${"ho ".repeat(n).trim().capitalize()}!"
}

// You can also make a mock object directly from an interface
interface SantaI(val title: String, val name: String) {
  fun getTitleAndName(): String
  fun laugh(n: Int): String
}
```

Below are two simple examples of how `mockk` can be used to declare mock objects of the class `Santa`, and how `every` can be used to stub behavior.

```kotlin
// Example 1
val santaMock = mockk<Santa>()
every { santaMock.title } returns "Saint"
every { santaMock.name } returns "Nicholas"
every { santaMock.getTitleAndName() } returns "Sinterklaas"
every { santaMock.laugh(any()) } returns "Ho ho ho!"
```
```kotlin
// Example 2
val santaMock: Santa = mockk {
  every { title } returns "Saint"
  every { name } returns "Nicholas"
  every { getTitleAndName() } returns "Sinterklaas"
  every { laugh(any())} returns "Ho ho ho!"
}
```
The keyword `returns` specifies what the return value (or the canned response) for the call to that DOC should be. 

The function call `any()` passed as parameter to `laugh` is a way of allowing every call with any parameter value to return a canned response with exactly three `Ho ho ho!`'s.


### Argument matching
In addition to `any`, you can implement more sophisticated argument matching with the use of `more`, `less`, `eq` and `or`:
```kotlin
val santaMock: Santa = mockk {
  every { laugh(more(10)) } returns "Many ho's"
  every { laugh(less(1)) } returns "No ho's"
  every { laugh(eq(1)) } returns "Exactly one ho" 
  every { laugh(or(1, 2)) } returns "One or two ho's"
}
```
### Expected answers
In addition to `returns`, there are other keywords that control the behavior, or the *expected answer*, of a DOC. 

The keywords `returnsMany` and `andThen` can be used to generate a sequence of canned responses from similar function calls. 

```kotlin
val santaMock: Santa = mockk {
  // These following two lines do the same thing.
  every { laugh(any()) } returnsMany listOf("First ho", "Second Ho")
  every { laugh(any()) } returns "First ho" andThen "Second ho"
}
```

If the return type of a call to a DOC is `Unit`, `just Runs` can be used:
```kotlin
val santaMock: Santa = mockk {
  every { functionReturningUnit) } just Runs
}
```
You can also throw exceptions by using the keyword `throws`:
```kotlin
val santaMock: Santa = mockk {
  every { laugh(more(9000)) } throws LaughTooHardException("Ridiculous, no one laughs for this long.")
}
```

You can create more sophisticated answers in the form of lambda function return values by using the `answers` keyword in tandem with answer scope functions like `firstArg`:
```kotlin
val santaMock: Santa = mockk {
  every { laugh(any()) } answers { "Ho".repeat(firstArg<Int>()) }
}
```

### Verifying behavior
While assertions and verification can typically be handled by your testing framework of choice (like Spek which was featured in [yesterday's post](https://preview.bekk.christmas/kotlin/2020/11)), MockK does feature quite a bit of functionality to help the test writer verify behavior.

Behavior verification refers to checking if the mocked DOC's were called correctly from the SUT. Usually you want to put verification at the end of a test. You start a verification block by using any of the keywords `verify`, `verifyAll`, `verifySequence` and `verifyOrder`, and unlike `every`, you can specify multiple calls inside a single verification block.

To check if certain calls happened at least once, use a simple `verify`:

```kotlin
verify { 
  santaMock.name
  santaMock.getTitleAndName()
  santaMock.laugh(2)
}
```

`verifyAll` does a similar check to `verify`, except it also checks if the calls specified are the *only* calls made on that mock. The following block checks if `laugh` was the *only* DOC called from the SUT:

```kotlin
verifyAll {
  santaMock.laugh(any())
}
```

`verifySequence` checks if an excact sequence of calls happened, with no other calls in between:

```kotlin
verifySequence { 
  santaMock.laugh(1)
  santaMock.laugh(2)
  santaMock.laugh(3)
}
```

`verifyOrder` is similar to `verifySequence`, but it only checks the order of the calls specified, while allowing for other calls to be possibly woven in between:
```kotlin
verifyOrder {
  santaMock.laugh(1)
  santaMock.laugh(2)
  santaMock.laugh(3)
}
```

`verify` also accepts arguments. You can check if a call to `laugh` happened in an interval of 2 to 4 times by supplying arguments to the parameters `atLeast` and `atMost`:

```kotlin
verify(atLeast = 2, atMost = 4) { 
  santaMock.laugh(any())
}
```

The parameter `exactly` specifies an exact number of calls to check for, and is the same as setting `atLeast` and `atMost` to the same value:

```kotlin
verify(exact = 1) { 
  santaMock.laugh(any())
}
```

To check if a call did not happen, you can either set `exactly = 0`, or you can use the special construct `wasNot Called`:

```kotlin
// These two blocks do the same thing
verify(exactly = 0) { 
  santaMock.laugh(any())
}

verify { 
  santaMock.laugh(any()) wasNot Called
}
```

Sometimes you want to execute calls to the real dependencies of an SUT. For this purpose, MockK also features `Spies`. A `Spy` can be seen as a hybrid between a mocked object and a "real" object. Any verification you can apply to mocked objects, you can also apply to spies. You can create a spy with the function `spyk`, and add some optional mocked behavior like so:

```kotlin
val spySanta = spyk(Santa("Saint", "Nicholas"))
every { spySanta.name } returns "Nick"
```

----------------------

That covers the basics of using MockK! If you're still interested in learning more, check out the relevant links. Consider giving it a try in your tests.