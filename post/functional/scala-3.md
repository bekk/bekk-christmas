---
calendar: functional
post_year: 2020
post_day: 9
title: Scala 3
authors:
  - Per Øyvind Kanstrøm
---

<!-- intro - total omskriving dot calculus -> Dotty -> Scala 3 -->

<!-- TODO -->
<!-- <sup>[^otp]</sup> -->
<!-- [^otp]: Noe å si her -->

A new year is closing up and so is a new release of Scala. Release candidate 1
is expected to be found some time this December!

Version two of the language was released in 2006 and so far it has seen a
total of thirteen minor releases, and many smaller. Throughout these changes the
language has evolved to places not foreseen. Implicits that were first introduces
for implicit conversions gave rise to type classes, built upon to create
implicit classes for extension methods, and macros that to this day is still locked behind
experimental flags; though still considered a key part of the language. A big
part of going to version 3 is to formalize these patterns, make the syntax more obvious, and be more
opinionated. But under the hood there are lots more going on!

A vision of the language has been on unifying Object Oriented Programming and
Functional Programming. In doing this it was found that the theoretical
foundation was not sound. Combining subtyping with dependent types was not a easy challenge
[2]! In 2016 the DOT Calculus (Dependent Object Types) was presented as a new
theoretical foundation. With that came Dotty, a reference implementation
translating a Scala like language to DOT calculus. Dotty was later
revealed to be the next iteration of the language. Scala 3 is not just a new
major release, but a complete rewrite with a new foundation.

If migration issues is a worrying factor then it should please you to know that
most code bases seems to be easy to port. To ease the process a lot of the
bigger user facing changes are delayed to 3.1. Most of the difficulties will be
on the ecosystem migrating base libraries, but that is well on it's way! The
community builds[4] has been a huge success for Scala 2 and the one for Scala 3
is soon up to 40 community projects [3]! Not bad for a unreleased language. To
start migrating now take a look at [5].

## New Features

```scala
@main
def hello = println("world")
```


Now, with the formalities gone we can take a dive into some of the new features.
Like stated above, simplicity is one of the bigger design goals. In the example
above we have started a small program in two lines of code! Try it out yourself
in Scastie[7]. I can recommend you to try out the examples outlined below in
there. But lines of code is far from everything regarding simplicity! Ehe error
messages are improved and the type system will do a much better jobbing
assisting you while keeping the code sound. 
One example of that is that the compiler will give suggestions of what to import
when implicits are missing from the scope. In the example error below we can see
a detailed error message of a missing execution context. As before, the message
contains a hint of what to import, but below it we can see the message again.
This is what the compiler found itself! 



```
[error] -- Error: /Main.scala:185:52
[error] 185 |  someFuture.flatMap(current => Future(current + 1))
[error]     |                                                    ^
[error]     |Cannot find an implicit ExecutionContext. You might pass
[error]     |an (implicit ec: ExecutionContext) parameter to your method.
[error]     |
[error]     |The ExecutionContext is used to configure how and on which
[error]     |thread pools Futures will run, so the specific ExecutionContext
[error]     |that is selected is important.
[error]     |
[error]     |If your application does not define an ExecutionContext elsewhere,
[error]     |consider using Scala's global ExecutionContext by defining
[error]     |the following:
[error]     |
[error]     |implicit val ec: scala.concurrent.ExecutionContext = scala.concurrent.ExecutionContext.global
[error]     |
[error]     |The following import might fix the problem:
[error]     |
[error]     |  import concurrent.ExecutionContext.Implicits.global
[error]     |
```

Note that these examples is a somewhat random subset of all the changes. Not a 
prioritized order. An up to date list of changes to the language can be found here [6].

### Enums

In previous versions the de facto standard of enums have been to
create a Java file with a enum, or create a `sealed trait`, or use some
macro based library. The downside of using `sealed trait`s that are meant to
model ADTs is that they, among others, have no inherent concept of ordinality.

```scala
enum Color(val rgb: Int) {
  case Red   extends Color(0xFF0000)
  case Green extends Color(0x00FF00)
  case Blue  extends Color(0x0000FF)
}

Color.fromOrdinal(1) == Color.valueOf("Red")
```

<!-- TODO fromOrdinal(1)? -->
<!-- TODO continue with ADTs and mention GADTs? -->

### The new implicits: using/given and extension methods

One of the bigger sources of confusion have been `implicits` and all the
contexts it's usable in. Need implicit conversion? Check. Type classes? Check.
Extension methods? check. Sending some contextual information? check.


#### Extension Methods

Extension methods can shortly be explained as extending methods on types after
they have been defined. This can be usable for extending the functionality of
third party libraries or for creating DSLs.

Let's say one want to count the occurances of a word in a list, say

```scala

val myList = "My cat knows how to not disturgbdds mejkljljlsdjflkds"

myList.countWord("cat")
```

The function `countWords` does not exist. Previously  with the following in
scope the code would have compile.

```scala
implicit class CountOps(sentence: String) {
  def countWord(word: String): Int = sentence.split(" ").count(_.toLowerCase == word.toLowerCase)
}
```

While this works perfectly fine, it is not easy for someone new to the language
to understand what is going on. So now we can instead use the keyword
`extension`, thus making the intention a lot clearer and easier to Google!

```scala
extension (sentence: String) def countWord(word: String): Int =
  sentence.split(" ").count(_.toLowerCase == word.toLowerCase)
```

#### Type classes

Type classes are in short a way to do ad hoc polymorphism. One way to understand
what that is, is to understand the `Show` type class. In Java every class
extends from `Object` and on `Object` we find a `toString` method. Being
available everywhere is practical, but does it make sense for _everything_?
I'am not going to jump into that debate, but what if we could define something
that gave us a `def show: String` method on every type that we find necessary,
and if not defined then give us a compile error? To have such a class of
functionality defined ad hoc for a type is a type class.

In Scala 2 this could look like the following (if you are new to the language,
do not ponder on this example for too long!):

<!-- // TODO bytt til Monoids og link til den gamle artikklen?? -->


```scala
// Our type class that is a function to run `show` on some unknown generic A
trait Show[A] {
  def show(value: A) : String
}

// Our instance for the String type
implicit val showString: Show[String] = new Show[String] {
   def show(in: String): String = in
}

// Our instance for the Int type
implicit val showInt: Show[Int] = new Show[Int] {
   def show(in: Int): String = in.toString
}

// To create extensions method capability
implicit class ShowOps[A](in: A)(implicit showImpl: Show[A]) {
  def show: String = showImpl.show(in)
}

val result: String = 1.show

@main
def run = println(result)
```

Yet again this works fine, but there is a lot of concepts to grasp here, and
what should I Google to get a better understanding? Help..

```scala
trait Show[A] {
  extension (value: A) def show: String
}

given Show[String] {
  extension (value: String) def show: String =
    value
}

given Show[Int] {
  extension (value: Int) def show: String =
    value.toString
}

val result: String = 1.show

@main
def run = println(result)
```

One of the many small but important differences here is that one does not need
to define a named reference to the `given` instance of a `type` like `showInt`
and `showString` above.

The keyword `given` is now used to define that something is implicitly available. To get a
`given` value for some type then `using` is the new keyword:

```scala
import math.Numeric.Implicits._

def myGenericFunction[A : Show](in: A)(using numeric: Numeric[A]) = {
  val result = in * numeric.fromInt(2)

  println(in.show)

  result
}

val result = myGenericFunction(2.2) // Type is Double

val result1 = myGenericFunction(2) // Type in Int

@main
def run = println(result)
```

<!-- TODO inform on Show and adding SHow[Double] -->

For `myGenericFunction` we have defined a function where we operate on one type `A`
that has an implementation of `Show` that is unnamed and defined numeric operations
through the `Numeric` type class. The power of this is that within the function we
have a well defined set of possible things to do. And if this is from separate
library then we can just implement

<!-- - TODO explain Numeric -->

<!-- - TODO! new scope rules -->

`Show` might not be the biggest of examples but the use case for type classes
are none the last a fantastic tool for many contexts. Such examples can be to
define specific functionality for types in generic code like `myGenericFunction`
or to defined behaviour for another libraries datatypes. 

<!-- TODO MONOIDS EXAMPLE. -->


### Built in type class derivation

TODO

### Union types

To represent a coproduct of types.

```scala
type MyCoproduct = Int | String
```


Some of the possibilities this opens up is to create type safe error handling simpler!

```scala
case class OhNoYouDidNot(error: String)
object EvilState

type MyErrors = OhNoYouDidNot | EvilState.type

def doTheThing(received: Int): Either[MyErrors, String] =
  Either.cond(
    received >= 1337,
    right = "It's working!",
    left = OhNoYouDidNot(s"$received is not sufficient stuff")
  )

val message = doTheThing(9000) match {
  case Right(result) =>
    result
  case Left(OhNoYouDidNot(thisThing)) =>
    s"You tried do that thing! $thisThing"
  case Left(EvilState) =>
    "I do not like this."
}

@main
def run = println(message)
```

<!-- Missing branches would incur not exhaustiveness warnings from the compiler. -->
Previously this could be done by
stacking `Either`s or by making a `sealed trait` hierarchy. The downside of sealed traits is that the entire hierarchy must
be defined in the same file upfront. Now, error types can be combined and built up anywhere!

### Opaque types

Another mechanism to help build safety in our applications is `opaque types`. They
are type definitions where the enclosing type is only knowable within the same scope.

```scala
object MyLib {
  opaque type Percent = Double

  object Percent {
    def apply(in: Double): Percent = {
      assert(in >= 0 && in <= 100)
      in
    }

    extension (x: Percent) def * (y: Percent): Percent =
      ((x / 100) * (y / 100)) * 100
  }
}

import MyLib._

val result = Percent(10) * Percent(40)

@main
def run = println(result)

// If we try do something we are not allowed to:

//Percent(10) * 40 // type error
//[error] 76 |    Percent(10) * 40 // type error
//[error]    |                  ^^
//[error]    |                  Found:    (40 : Int)
//[error]    |                  Required: Main.TestNumeric.MyLib.Percent

```

### Export clauses

TODO

### inlining

TODO

### macros

TODO


<!-- DO not mention? 
- intersection types

Some upcoming changes
- Explicit nulls
-->

There is a lot more waiting to be explored including working GADT's, macros,
explicit null handling, etc. Eager to try it out [7]?
