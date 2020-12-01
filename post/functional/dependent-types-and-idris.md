---
calendar: functional
post_year: 2020
post_day: 14
title: Dependent types and Idris
image: https://images.unsplash.com/photo-1482003297000-b7663a1673f1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1234&q=80
description: ""
links:
  - url: https://lexi-lambda.github.io/blog/2019/11/05/parse-don-t-validate/
    title: Parse, don't validate
  - url: https://fsharpforfunandprofit.com/posts/designing-with-types-making-illegal-states-unrepresentable/
    title: "Designing with types: Making illegal states unrepresentable"
  - url: " https://www.manning.com/books/type-driven-development-with-idris"
    title: Type-Driven Development with Idris
authors:
  - Isak Sunde Singh
---
Often when we write code we have a clear idea in our minds of how to write the code, but when we actually write it, the compiler steps in and points out a few things for us.
In strong, statically typed programming languages, we can get a lot of help from the compiler.
One especially nice feature is compile-time checked exhaustive pattern-matching.
As an example, let's look at some Elm code (if Elm is unfamiliar, go check out [elm.christmas](https://www.elm.christmas/) 😉):

```elm
type Color
    = Red
    | Green
    | Blue
    | RGB Float Float Float


colorToString : Color -> String
colorToString color =
    case color of
        Red ->
            "0xFF0000"

        Green ->
            "0x00FF00"

        Blue ->
            "0x0000FF"
```

If we try to compile this piece of code, we get this friendly response from the compiler:

```
This `case` does not have branches for all possibilities:

11|>    case color of
12|>        Red -> "0xFF0000"
13|>        Green -> "0x00FF00"
14|>        Blue -> "0x0000FF"

Missing possibilities include:

    RGB _ _ _

I would have to crash if I saw one of those. Add branches for them!
```

This is really nice as a lack of errors from the compiler means that we've handled all cases.
Let's quickly fix the error by adding another case:

```elm
colorToString : Color -> String
colorToString color =
    case color of
        Red ->
            "0xFF0000"

        Green ->
            "0x00FF00"

        Blue ->
            "0x0000FF"

        RGB r g b ->
            -- Elided for brevity
```

Now the compiler doesn't complain, so all our cases are covered!

A very nice result of exhaustive pattern-matching is that if we add another variant to the union type (or discriminated union, tagged union, sum type, or any of the many other names it goes by), and haven't covered the new variant, and thus all cases, the code won't compile.
For the most part, this is awesome.
It makes refactoring code so much simpler as you can just recompile and follow the trail of errors after changing, adding or removing variants of union types.
However, you often stumble upon situations where you as the programmer know that a situation can't happen, but the compiler insists that it could.
Let's see an example:

```elm
displayAges : List Int -> Html msg
displayAges ages =
    let
        first =
            List.head ages
    in
    div [] [ text <| String.fromInt first ]
```

Ignoring the nonsensical code above 😅, assume that we know that when `displayAges` is called, we know that `ages` is a list with at least one item in it.
This assumption doesn't help us, as Elm's `List.head` function returns a `Maybe Int` in our case, which will fail to type-check further down.
Let's see the compiler-error:

```
The 1st argument to `fromInt` is not what I expect:

11|     div [] [ text <| String.fromInt first ]
                                        ^^^^^
This `first` value is a:

    Maybe Int

But `fromInt` needs the 1st argument to be:

    Int

Hint: Use Maybe.withDefault to handle possible errors. Longer term, it is
usually better to write out the full `case` though!
```

As we can see, an `Int` is expected, but a `Maybe Int` is given.
The compiler even suggests using `Maybe.withDefault` to handle the `Nothing` case.
We could do that, or we could case-split the `first`-value, but we know that ages isn't empty, so there should be a better way, right?
This is where we (finally) introduce dependent types!

## Dependent types

Dependently-typed programming languages are languages which support types that are dependent on values of types.
Well... What does that mean, then? 🤔
An example of a dependent type is a list that is dependent on the value of a natural number, encoding the list's length into its own type.
This means we can specify a function that only accepts lists with at least one element. Unfortunately, Elm does not have support for dependent types, and relatively few languages do.
Common examples are [Agda](https://wiki.portal.chalmers.se/agda/pmwiki.php) and [Idris](https://www.idris-lang.org/).
Let's look at some Idris code, which has a similar syntax to Elm:

```idris
head : List a -> Maybe a
head [] = Nothing
head (x :: xs) = Just x
```

Above is a declaration of a `head`-function in Idris, with a function signature similar to Elm's.
Idris has function-level pattern matching, like Haskell, so the first line is the function signature, and the two succeeding lines are possible patterns of the input list.
Idris also has a dependent list-type called `Vect`, which takes two type arguments, a value of a natural number and the type of the elements in the list.
This means we can define a `head`-function that can guarantee a list has at least one element and can always return the head of the list.
Let's call it `head1`:

```idris
head1 : Vect (S n) a -> a
head1 (x :: xs) = x
```

Now, let's break down that code.
`head1` is the name of the function, then comes the input and output types.
`Vect (S n) a` is the type of the input value, a dependent list-type.
`S n` is the successor of `n`, where a successor of a number just means the next in-line.
`S n` and `n` is a natural number, or the type `Nat` as it is called in Idris.
The successor of 0 is 1, so even if `n` is 0 or something greater, `S n` will always be at least 1.

Let's take a look at the definition of `Nat` to see if we better understand how this all works (stolen directly from the [source](https://github.com/idris-lang/Idris-dev/blob/a59c371b5dfe1bbeebc0ecccbfd094a6ae27628f/libs/prelude/Prelude/Nat.idr#L15-L21)):

```idris
||| Natural numbers: unbounded, unsigned integers which can be pattern
||| matched.
data Nat =
  ||| Zero
  Z |
  ||| Successor
  S Nat
```

A quite simple recursive definition, with only two constructors.
A value of 0 is written as the constructor `Z`, with successive numbers written as `S n`, where `n` is a `Nat` (read more on [Peano numbers](https://en.wikipedia.org/wiki/Peano_axioms)).
Here are some values:

```idris
zero : Nat
zero = Z

one : Nat
one = S zero

two : Nat
two = S one

-- etc.
```

You'll hopefully understand more of how `Vect (S n) a` now is a vector of at least one in length.
But how does the vector implementation know the length?
Let's look at the definition (also harvested ripe from the [source](https://github.com/idris-lang/Idris-dev/blob/a59c371b5dfe1bbeebc0ecccbfd094a6ae27628f/libs/base/Data/Vect.idr#L11-L19)):

```idris
||| Vectors: Generic lists with explicit length in the type
||| @ len the length of the list
||| @ elem the type of elements
data Vect : (len : Nat) -> (elem : Type) -> Type where
  ||| Empty vector
  Nil  : Vect Z elem
  ||| A non-empty vector of length `S len`, consisting of a head element and
  ||| the rest of the list, of length `len`.
  (::) : (x : elem) -> (xs : Vect len elem) -> Vect (S len) elem
```

The top line describes that `Vect` is a type that first accepts the type-parameter `len` of type `Nat`, then the element's type `Type` (a [universe-type](http://docs.idris-lang.org/en/latest/faq/faq.html#does-idris-have-universe-polymorphism-what-is-the-type-of-type)), and finally returns a new type of type `Type` describing the actual vector with element's type.
As we see, it also has two constructors, `Nil` and `(::)`, the list append-constructor.
The `Nil`-case is simple, it has no input and returns a list that is dependent on `Z`, or 0, meaning an empty list is returned.
`(::)` accepts an element, then another `Vect` `xs` that already has `len` elements, and the constructor finally returns `Vect (S len) elem`, meaning a list that has _one_ more element than the input `xs`.
This means the compiler can follow the size of vectors as they are constructed:

```idris
one : Vect Z String
one = [ "One string" ]

two : Vect (S Z) String
two = "Two string" :: [ "One string" ]

three : Vect (S (S Z)) String
three = "Three String" :: [ "Two string", "One string" ]

-- and so on...
```

As the Idris compiler recognizes list sizes, it will disallow function calls such as `head1 []`.
Let's see what the compiler says when we try this:

```idris
val : String
val = head1 []
```

The output is:

```
When checking right hand side of val with expected type
        String

When checking an application of function Main.head1:
        Type mismatch between
                Vect 0 elem (Type of [])
        and
                Vect (S n) String (Expected type)

        Specifically:
                Type mismatch between
                        0
                and
                        S n
```

Quite a long output, but essentially it says it expected a `String`, but found a list, specifically a `Vect`, of length 0, but expected a list of length `S n`, or at least 1.
`val = head1 [ "A value" ]` works just fine, as it has at least one element.

Now, all of this might seem a little complicated, and it is, especially when we consider larger programs.
However, dependently-typed programs are capable of carrying their own proofs, meaning a successfully compiled program is equivalent of the program being proven correct (look up the [Curry-Howard correspondence](https://en.wikipedia.org/wiki/Curry%E2%80%93Howard_correspondence) for some nerdy Christmas-readings 🤓).
This does, however, come with a lot of asterisks attached \*\*😅
It requires sufficiently typing your program with strict, narrow and highly-defined types.

There are several other really cool possibilities that dependent types provide us, such as compile-time checked [correct usage of protocols](https://github.com/edwinb/Protocols), compile-time safety of [datastore-usage](https://www.idris-lang.org/drafts/sms.pdf), [numbers bounded within a range](https://www.idris-lang.org/docs/current/base_doc/docs/Data.Fin.html), and more.
It truly opens a world of possibilities, though it has a steep learning curve.
We've only looked at one of the most basic examples.

_Side-note_: by providing strict dependent types, the compiler is able to reason more clearly about your program.
Idris has an [Atom-plugin](https://atom.io/packages/language-idris) that enables a more interactive form of programming than other languages, and is even able to automatically **implement** functions for you if the types are descriptive enough.
Go and try it with the `head1 : Vect (S n) a -> a` signature and `Ctrl-Alt-G`, it's _so_ fun! 🤩

## What about other languages?

Is there no hope for these nice things if we use other languages, such as Elm, which doesn't support dependent types?
Well, of course there is!

In our example, we've only really created a non-empty list.
Some languages already provide support for this specific example, such as Haskell's [non-empty list](https://hackage.haskell.org/package/base-4.14.0.0/docs/Data-List-NonEmpty.html), and others provide other types that provide similar guarantees, such as Rust's [non-zero integers](https://doc.rust-lang.org/stable/std/?search=nonzero).

We could create our own non-zero list in practically any language, but might miss out on some of the ergonomics.
Let's see an Elm implementation:

```elm
type NonEmpty a
    = NonEmpty a (List a)
```

This single-case union ensures that we have at least one instanse of the type `a`, and is such a non-empty list!
A clean `head`-function could be written easily as:

```elm
head : NonEmpty a -> a
head (NonEmpty x xs) =
    x
```

This is becoming a long article, so I would recommend you to go on reading some fantastic reading-material such as [Parse, don't validate](parse-dont-validate) and [Designing with types: Making illegal states unrepresentable](illegal-states-unrepresentable).
For longer reads, the book [_Type-Driven Development with Idris_](https://www.manning.com/books/type-driven-development-with-idris) by Edwin Brady, the author of Idris, is a fantastically exciting read on dependent types and Idris that anyone fond of strong types would love to read for the Christmas holiday, at least I did last year 🎄🎁🎅