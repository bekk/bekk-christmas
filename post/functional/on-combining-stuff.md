---
calendar: functional
post_year: 2019
post_day: 19
title: On combining stuff
ingress: >-
  In this article we will take a small peak into the general concept of
  combining

  things with other things. We all know about and how to use the plus operator
  from every day math and

  programming. So why do I want to write it? There is in fact a

  generalization of the concept that is pretty neat that I hope you also

  will find useful.
description: ''
authors:
  - Per Øyvind Kanestrøm
---
# On combining stuff

In this article we will take a small peak into the general concept of combining
things with other things. We all know about and how to use the plus operator from every day math and
programming. So why do I want to write it? There is in fact a
generalization of the concept that is pretty neat that I hope you also
will find useful. It can be a door opener for understanding the behaviour you get from algebraic laws. First things first, what are we actually talking about? Let us take a look at a few different operations on text and
numbers.

## Law abiding citizens

In the table below each row compares the operation and result on shape similar strings and ints for addition.

|   | **String operation**| **String result**   | **Int operation**| **Int result**|
|---|---------------------|:-------------------:|------------------|:-------------:|
| 1 | `"ab" + "c"`        | `"abc"`             |`2 + 4`           | 6             |
| 2 | `("a" + "b") + "c"` | `"abc"`             |`(1 + 2) + 3`     | 6             |
| 3 | `"a" + ("b" + "c)"` | `"abc"`             |`1 + (2 + 3)`     | 6             |
| 4 | `"" + "abc"`        | `"abc"`             |`0 + 6`           | 6             |

Notice the similarity between the operations on ints and strings. Rows 2 and 3 show associativity,
which means *the order of evaluation doesn't change
the result as long as the order of the values are the same*.

In mathematical terms we have the following law for associativity:

``` math
for any 𝑚1, 𝑚2, 𝑚3 ∈ 𝑀 the following equality holds:
  (𝑚1 + 𝑚2) + 𝑚3 = 𝑚1 + (𝑚2 + 𝑚3)
```

Row 4 reveals the second and last law - the law of identity. *There exists a value such that combining with any other value, will return the other value unchanged*. For numbers under addition this is zero.

In mathematical terms we have the following for identity:

``` math
There exists such 𝑒 ∈ 𝑀 that for any 𝑚 ∈ 𝑀 the following equalities hold:
  𝑒 + 𝑚 = 𝑚 + 𝑒 = 𝑚
```

That's it! If some types have something that respects these two laws, then we have what the
mathematicians have named a monoid 🎉

Why is this useful? When building software, I often think about it as taking
building blocks and putting them together to create bigger blocks solving bigger
problems. Naming such abstract behaviour is useful. If, for example, you
discover that what you are doing is described as a Monoid then you can test to verify that you respect the laws.
More advance tools can help you prove the properties, but the simpler take is to use property-based testing where
random data is generated to verify the properties. Look it up if it sounds interesting.

## An example

Let us take a look at a text corpus analyzer. The task is to find all unique words, total length of all words and how many occurrences there is of each word.

To solve this we will write code in [Scala](https://www.scala-lang.org/), a object-oriented and functional programming language for the JVM and Javascript. If this is new to you then you can squint hard and see Python, Kotlin or Java. The brackets are the same as generics in Java. But the details in the code are not important, only the possibilities. Therefore, I will explain the reasoning behind each line. If you already know Scala and the [Cats](https://typelevel.org/cats/) library then you can probably gloss right over it.

To start things of we have got our text corpus to analyze and split it up into a list containing each word.

```scala mdoc:silent
val message = List("Hello", "world!", "Have", "you",
                   "learned", "anything", "new?", "Hello", "again")
```

For each of these words we need to have a function that take one word and splits it into the tuple that contains all the information we can get from that word. That is:

- `1` word
- Length of the word
- A hash map with the word as key pointing to the number of occurrences for that word

In Scala this function can look like the code snippet below.

```scala mdoc:silent
def wordDetails(word: String) = (1, word.length, Map(word -> 1))
```

Now, if we combine the information we get from using this function on all the words we will get:

- Total number of words
- Total length of all the words
- A hash map with the words as keys pointing to the number of occurrences for that word

Does this sound familiar? Each of these types of data should have some default monoid implementation that defines this behavior, and
thanks to the Cats library in Scala we have just that.

```scala mdoc:silent
import cats._, cats.implicits._
```

With this we have imported the cats library for functional programming with category theory concepts. The next step is to see if the compiler can give us an `Monoid` for the result type of the wordDetails function.

```scala mdoc:silent
type WordDetailsResult = (Int, Int, Map[String, Int])

val monoidImpl = Monoid[WordDetailsResult]
```

An implementation of monoid for our return type from the wordDetails function is now stored
in the `monoidImpl` value. Had our wordDetails result given us something that does not have a defined monoid implementation then this would not have compiled.

Using the monoid implementation we can now transform our input data and then aggregate it to one result. From the previous article on [iterations](https://functional.christmas/2019/7) we learned about folds which needs empty state and a function for modification of the state. In Scala the signature for that function of a given `List[T]` is:

```scala
def foldLeft[A](z: A)(op: (A, T) => A): A
```

Putting these pieces together we can get our result by doing the following:

```scala mdoc
message
  .map(wordDetails)
  .foldLeft(monoidImpl.empty)(monoidImpl.combine)
```

Combining the map operation with a monoidal fold like we just did is quite handy! It is therefore also possible to skip the ceremony. That would look like the following:

```scala mdoc:silent
message.foldMap(wordDetails)
```

## Changing the laws

For our text corpus example we have the laws of associativity and identity. What would happen if we did not have the law of identity? If
our text corpus was empty then we would still need to be able to produce a result that we got from the wordDetails function. But with no values we cannot run
the function and therefore have no value to produce! Our function would have needed to be partial, that is to not be able to handle all cases of our input - the empty list. The result would have been an exception 😢 Thanks to having the law of identity we knew that we would always be able to produce some value that defines emptiness and so our problem is non existing.

But this does not mean that leaving out the identity laws is useless. In fact, having only associativity is named semigroup and is also a useful construct! Say you are creating some imaging software that uses bounding boxes. Naturally you can define a combine operator that represents the union between the boxes. But what should the representation of the empty element be? Being forced to make this construct will properly lead to messy code, so just avoid the issue and define a semigroup instead.

## Summary

That concludes our introduction to the Monoid laws. We have seen some simple, yet practical application, that I hope have helped to give some intuition on how it can be used. Furthermore, we have taken a peak into what the laws actually mean
for the application of Monoids and how that relates to another algebraic constructs. Note that there are more useful laws and algebraic constructs that one can look into. For a more in-depth explanation of these I can recommend the talk [Monoids monoids monoids](https://www.youtube.com/watch?v=DJyhWAwmGqE).

In real-world code there are many other hidden usages, including among others web routes in web servers. Now go out and try to find some! If these concepts were new to you then I hope this have peaked some interest.
