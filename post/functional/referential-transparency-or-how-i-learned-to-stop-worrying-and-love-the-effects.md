---
calendar: functional
post_year: 2019
post_day: 16
title: >-
  Referential transparency - Or how I learned to stop worrying and love the
  effects
ingress: ''
---
In functional programming we are often concerned with mathematical or pure
functions - functions that do not perform side effects. Side effects are
modifications of state outside of the local environment. Examples of this can be
to store values in the database, fetch data from another server or alter a
variable outside your functions local scope. In other words it is the very
concept of things actually happening.

![Cats and referential transparency](https://user-images.githubusercontent.com/1859417/67931064-09982c00-fbb9-11e9-8c7a-b863410135f8.png)
*Image by [@impurepics](https://twitter.com/impurepics)*

When writing software in the functional paradigm are we then simply not
interested in making software that solves things? Well, of course we are, but we
like to know where we are impure! And we are still stuck with the broad
definition of what a side effect actually is. Given advanced enough spy
technology hackers can figure out your encryption keys based on the mere sound
of the [CPU](https://phys.org/news/2013-12-trio-rsa-encryption-keys-noise.html)
😱 Is then each and every CPU cycle an observable side effect we should have
control over?

What a rabbit hole we got into. You probably agree that the line must be drawn
somewhere. If we take a few steps back to the pure functions, then
what are the properties that they have and we as programmers want?

Let us talk about the function f which takes a number x and add a two in a pseudo
programming language.

```
f(x) = x + 2
```

We can use this function to define the following expressions:

```
A = f(2)
B = A + A
```

The value of `B` will become 8. Do we even need the temporary expression with the
value of 4? No, we can refactor it into:

```
B1 = f(2) + f(2)
```

This computation will have the property that `B1` is equal to 8. We could
substitute each usage of `A` with the computation that defined it. Having this
property is what we call referential transparency.

Here is the same example given in the programming language Scala:

``` scala
def f(in: Int): Int = in + 2

val a = f(2)
val b = a + a
```

The same properties hold for this code and we can yet again substitute the usage
of `a` with `f(2)` without being afraid that anything else will change. Now, what happens if
our business requirements change? We need to tell our users what values get in:

``` scala
def f1(in: Int): Int = {
  println(in)
  in + 2
}
```

Running the same statements again with the new function `f1`:

``` scala
val a = f1(2)
// > 4
val b = a + a
```

Between the two statements we have out commented code that shows the console
output if we had run the program in a terminal. What happens if we perform the
same refactoring as in the pseudo programming language?

``` scala
val b = f1(2) + f1(2)
// > 4
// > 4
```

Did you see what just happened? The computational result in `b` is still the
same but we printed out the input to the console twice! This tells us that the
`println` function broke the referential transparency property of our `f1`
function. Now we also know that `println` performs side effects in a way that
alters how we can reason about other functions that use it.

Now we have seen the kind of side effects that we should care about. They alter
the meaning of what our software does based on how they are used. Refactoring
code where we have this property is simple because we can use local reasoning to
know what changes that are safe to perform.

If you are unsure if a particular side effect is something that you should care
about then do the simple exercise of substituting it in a way similar to what we
just did above.

In this simple example this is no problem. What if this was a destructive action
against the database or an expensive call to another system? It's an easy
mistake to do. One effective tip is to use this tool to separate the pure
business domain of our code against the parts that actually does something. Or
if you have to do mutations then hide it in a function so that the users cannot
observe the side effects.

But can we permanently defend ourselves against such issues? Ensure that all code
is referentially transparent and perform side effects in a controlled way? Yes
we can! But that's a treat for another day. Happy holidays!
