---
calendar: functional
post_year: 2019
post_day: 19
title: On combining stuff
ingress: ''
description: ''
authors:
  - Per Øyvind Kanestrøm
---
In this post we will take a small peak into the general concept of combining
things with other things. We all know about and how to use the plus operator
from every day math to when we program our software. So why do I want to write an article about it? There is in fact a
generalization of the concept that is pretty neat that I hope you also
will find useful. It can also be a door opener for how to understand the behaviour you get from having different algebraic laws. First things first, what are we actually talking about? Let us take a look at a few different operations on text and
numbers.

## Law abiding citizens

|   | *Operation*         | *Result*            |
|---|---------------------|---------------------|
| 1 | `"ab" + "c"`        | `"abc"`             |
| 2 | `"" + "abc"`        | `"abc"`             |
| 3 | `("a" + "b") + "c"` | `"abc"`             |
| 4 | `"a" + ("b" + "c)"` | `"abc"`             |
| 5 | `2 + 4`             | `6`                 |
| 6 | `0 + 6`             | `6`                 |
| 7 | `(1 + 2) + 3`       | `6`                 |
| 8 | `1 + (2 + 3)`       | `6`                 |

Notice the similarity of these operations on the values. For rows 3, 4, 7, 8
the behaviour of associativity is shown to us. That means that these values can
be combined in any way that you like as long as the order is preserved.

In mathematical terms we have the following law for associativity:

``` math
for any 𝑚1, 𝑚2, 𝑚3 ∈ 𝑀 the following equality holds:
  (𝑚1 + 𝑚2) + 𝑚3 = 𝑚1 + (𝑚2 + 𝑚3)
```

Row 2 and 6 reveals the second and last law - the law of identity. There exists a value that
when combined with another value will still remain the same value. For numbers under addition this is zero.

In mathematical terms we have the following for identity:

``` math
There exists such 𝑒 ∈ 𝑀 that for any 𝑚 ∈ 𝑀 the following equalities hold:
  𝑒 + 𝑚 = 𝑚 + 𝑒 = 𝑚
```

That's it! If some types has something that respects these two laws then we have what the
mathematicians have named a Monoid 🎉

Why is this useful? When building software I often think about it as taking
building blocks and putting them together to create bigger blocks solving bigger
problems. Naming such abstract behavior is useful. If, for example, you
discover that what your are doing is described as a Monoid then you can test to verify that you respect the laws.
More advance tools can help you prove the properties, but the simpler take is to use property based testing where
random data is generated to verify the properties. This kind of testing is known as property based testing. Look it up if it sounds interesting.

To give som intuition on some real world usage of Monoid we can take a short look at a web server. For the http routes, one route endpoint
describes one potential response for a request. Combining these together will build up to
be your entire web server.

## A more down to earth example

For this article going more in depth on on the http server will be a bit contrived. What about a text corpus analyser? Find all unique words, total length of all words and how many occurrences of each word. The code is written in Scala. If this is new to you then you can squint hard and see Python, Kotlin or Java. The brackets is the same as generics in Java. But the details in the code are not important, only the possibilities. Therefore I will focus on explaining the reasoning behind each line, but if you already know Scala and the Cats library then you can probably gloss right over it.

To start things of we have got our text corpus to analyse and split it up into a list containing each word.

```scala
val message = List("Hello", "world!", "Have", "you", "learned", "anything", "new?", "Hello", "again")
```

For each of these words we need to have a function that take one word and splits it into the tuple that contains all the information we can get from that word. That is:

- `1` word
- Length of the word
- A hash map with the word as key pointing to the number of occurrences for that word

In Scala this function can look like the code snippet below.

```scala
def scan(word: String) = (1, word.length, Map(word -> 1))
```

Now, if we combine the information we get from using this function on all the words we will get:

- Total number of words
- Total length of all the words
- A hash map with the words as keys pointing to the number of occurrences for that word

Does this sound familiar? Each of these types of data should have some default Monoid implementation that defines this behaviour, and
thanks to the Cats library we have just that.

```scala
import cats.implicits._
```

With this we have imported the cats standard library for functional programming with category theory concepts. A variant of the following function will also be available:

```scala
def foldMap[F[_]: Foldable, A, B: Monoid](fa: F[A], f: A ⇒ B): B
```

If you are new to Scala and / or type classes then this will be lots to unfold so I will try to go through how to read code.

First things first, the `F[_]` is a type constructor that can contain a specific type. Examples of this is `List[_]` or `Option[_]`. The only caveat is that there exists some foldable implementation for the concrete type of `F[_]`. If folds are new to you then I suggest that you read [the article](https://functional.christmas/2019/7) from 7th December.

This function can be read as given some type `A` in `F[_]`, apply the function `f` that takes value of type `A` to `B` for every element `A` in `F[_]`. Then for every `B` in `F[_]`, combine them to one value of type `B` with Monoid combine.

In our case the `F[_]` will be our `message` that is defined as `List[String]`. Then the `A` will be of type `String` from the list.
For the function `f` we use `scan` and then `A => B` becomes `String => (Int, Int, Map[String, Int])`. Since the type for `B` has a Monoid we
this will work behind the scenes to be aligned up by the compiler.

```scala
val result = message.foldMap(scan)
// result: (Int, Int, Map[String, Int]) = (
//   9,
//   47,
//   Map(
//     "learned" -> 1,
//     "Have" -> 1,
//     "you" -> 1,
//     "Hello" -> 2,
//     "again" -> 1,
//     "world!" -> 1,
//     "anything" -> 1,
//     "new?" -> 1
//   )
// )
```

This example was taken from the talk [Monoids monoids monoids](https://www.youtube.com/watch?v=DJyhWAwmGqE) which I can recommend if you want a more in depth explanation.

## Changing the laws

There are many algebraic laws and I have listed two other relevant ones below. Note that this is not necessary to know or understand if you want
to utilize these concepts. Look up their definitions when you find them relevant.


| *Name*         | *Short definition*                     |
|---------------------|-----------------------------------|
| Commutativity       | Order of operands does not matter |
| Invertibility       | The concept of negation           |

For our text corpus example we have the laws of associativity and identity. What would happen if we did not have the law of identity? If
our text corpus was empty then we would still need to be able to produce a result that we got from the scan function. But with no values we cannot run
the function and therefore have no value to produce! Our function would have needed to be partial, that is to not be able to handle all cases of our input - the empty list. The result would have been an exception :sad-face: Thanks to having the law of identity we knew that we would always be able to produce some value that defines emptiness and so our problem is non existing.

But this does not mean that not having identity laws is not useful. In fact, having only associativity is named semigroup and is also an useful construct! Say your are creating some imaging software that uses bounding boxes. Naturally you can define a semigroup that represents the union between the boxes. But what should the representation of the empty element be?

For different combinations of these laws there are different names with different use cases.

## Summary

In this article we have gotten an introduction to the laws of Monoids. We have seen some simple but practical applications that
I hope will have helped give som intuition about how it can be used. Furthermore we have taken a peak into what the laws actually mean
for the application of Monoids and some other algebraic constructs. If these concepts were new to you I hope you have peaked some new interests.
