---
calendar: functional
post_year: 2020
post_day: 11
title: Functional TypeScript With fp-ts
ingress: |
  I have a confession to make.

  I actually enjoy JavaScript.
description: ""
authors:
  - Bendik Solheim
---
I know, I know, I’m not really supposed to feel this way. It’s supposed to be this weird language full of flaws that never follows established rules and conventions, and we’re all supposed to not like it. But that’s just not the case for me – despite all the quirks and unusual behavior I still enjoy it.

There are, of course, still sides of it I enjoy less. The two things I dislike the most are lack of strong, static typing, and a well-built standard library. The standard library is still growing, and the newer parts of it are not too bad. The older parts, though, are all over the place: they mutate, and lack consistency.

To keep this blog post short, I will assume you know both JavaScript and TypeScript. You will probably still understand most of it even if you are not fluid in any of them, but consider yourself warned.

## fp-ts

[fp-ts](https://github.com/gcanti/fp-ts) introduces _many_ functional concepts. If you come from Java or Kotlin, you can compare it to [Vavr](https://www.vavr.io) or [Arrow](https://arrow-kt.io), respectively. It provides several well known data types, type classes, a consistent library of functions, and several other functional abstractions.

Wading through every feature of fp-ts would be an enourmous task, and one way too overkill for this blog. Instead, I will take you through some of the simpler concepts that anyone can benefit from. My goal is to show you exactly how to use some of these concepts, so you can take use of them right after.

Let’s get going!

### The Data Types

An `Option` type represents an optional value. Something you either have, or don’t have. This is useful when lacking a value is valid in your domain, or when a function may or may not return a value. Let’s see some code.

```ts
import { Option, some, none, map } from "fp-ts/Option"

type User = {
  id: number,
  username: string,
  expiration: Date
}

function getUserById(id: number): Option<User> { .. }

const userOne = getUserById(1) // -> some({ id: 1, name: "user-name", expiration: "2099-01-01T00:00:00Z" })
const userTwo = getUserById(2) // -> none

const getUserName = (u: User): string => u.username

const usernameOne = map(getUserName)(userOne) // -> some("user-name")
const usernameTwo = map(getUserName)(userTwo) // -> none
```

The `Option` wraps a value, and enables operations through functions such as `map`, `filter`, `fold` and others. These operations are _safe_. This example demonstrates a really nice property of the `Optional`: your business code can describe the "happy path" – error handling is abstracted into the `Option` itself. `map` runs the provided function on an `Option` only if it is a `some`, and not a `none`. The same is true for other functions on the `Option`.

But what if you wanted to display, or use, the username? You can’t just extract the value from inside an `Option`, as you don’t know whether it is a `some` or a `none`. To get the actual value from the `Option`, you need to specify what to do both when it is a `none`, and a `some`. Let’s take a look at two safe ways of extracting your value from the `Option`.

```ts
import { fold, getOrElse } from "fp-ts/Option"

// Let’s calculate the length of the username
const usernameLength = fold(
    () => 0
    (username) => username.length
);

const usernameValue: number = usernameLength(usernameOne) // -> 9
const emptyUsername: number = usernameLength(usernameTwo) // -> 0

const getOrEmpty = getOrElse(() => "")

const reversedStringValue: string = getOrEmpty(usernameOne) // -> "user-name"
const stillEmptyValue: string = getOrEmpty(usernameTwo) // -> ""
```

In both cases, the type system forces us to handle both the missing and the non-missing state. You now have a safe way of handling missing values, and even a safe way of getting them out as well!

Let’s modify the function `getUserById` a bit. Instead of just returning a `none`, we would like to know _why_ it was not returned. An `Option` can’t help you with this. Instead, you need something like the `Either` (you might know it by the name `Result`). Where an `Option` is either a `none` or a `some`, the `Either` is either a `left` or a `right`. It holds a value in both cases. The `Either` is often used to model situations where an operation can either fail or succeed. By convetion, the `left` case represents the failure, and the `right` case represents success. If you find such conventions hard to remember, try to think "right is not wrong". Cheesy, I know, but it helps me!

Anyway, as stated, let’s change our `getUserById` function to also tell us _why_ it was unsuccessful.

```ts
import { Either, right, left, map } from "fp-ts/Either"

type UserError = "UserNotFound" | "UserExpired"

function getUserById(id: number): Either<UserError, User>

// Pretending that a user with ID 1 exists, but not with 2
function userOne = getUserById(1) // -> right({id: 1, name: "user-name", expiration: "2099-01-01TT00:00:00Z'})
function userTwo = getUserById(2) // -> left("UserNotFound")

const usernameOne = map(getUserName)(userOne) // -> right("user-name")
const usernameTwo = map(getUserName)(userTwo) // -> left("UserNotFound")
```

This is not too far from the first example with the `Option`, with the added value that we now also know why it failed. This does‘t mean that `Either` is more preferable than `Option` in all cases. It all depends on how the operation might fail, and what you would like to do when it fails. It also boils down to semantics – is the lack of a value valid in your domain, or is it an error?

### Pipes and flows

Function composition is right in the heart of functional programming. It is the act of combining simple function to build more complicated ones. Smaller and simpler functions are simpler to reason about and test, but can’t perform complex operations by themselves.

You could of course just call your simple functions in succession in a larger function. Either by saving the result each step, or wrapping your functions inside each other. Both of these gets more and more tedious the more functions you need to call. Let’s take a look at two functions called `pipe` and `flow`, which both make composition better. They are quite alike, but have different use cases.

```ts
const square = (x) => x * x;
const timesTen = (x) => x * 10;

const result = pipe(3, square, timesTen); // -> 90

const squareAndMultiply = flow(square, timesTen);

const result2 = squareAndMultiply(3); // -> 90
```

`result` and `result2` have the same value, but are computed differently. `pipe` gives us the ability to pipe a value through a list of functions, and produce an output. This is nice for those one-off situations where you need to compose a few functions. `flow` is more suited for those situations where you want to compose functions and create a new function permanently. In both cases, everything needs to typecheck – the input to one function needs to be of the same type as the output from the previous, all the way through.

### Extended built-ins

JavaScripts standard library is in a bit of a weird position. If we take `Array` as an example, there is a distinction between functions that mutates in place, and functions that instead returns a new value. Things are moving to a better place, but we still have these old, mutating, functions that we have to live with. `fp-ts` fixes this by providing a consistent library even for JavaScript built-ins such as `Array`, `Map`, and `Set`. It’s not only consistent on the different types themselves, but also across the types thanks to extensive use of type classes. Every class that adheres to the `Functor` type class supports the `map` function, and every class that adheres to the `Filterable` type class can be filtered and partitioned. If this is greek to you, just ignore the lingo and appreciate the fact that you can use `map`, `filter`, `reduce` and a bunch of other functions on loads of different types. You can even implement them on types you create yourself as well!

### ... and so much more

We have only really scratched the surface here. These concepts should give you enough to get you started, and hopefully see the value in this library. When you’re ready, there are tons of other concepts to dive into, which can make your code even more readable and safe. I haven’t had the time to wade through it all myself, so I still keep finding small gems which makes my day just a bit easier.

If you want to know more, the [learning resources section](https://gcanti.github.io/fp-ts/learning-resources/) of the [documentation](https://gcanti.github.io/fp-ts/) is actually quite good. As the author states, fp-ts does not really aim to teach functional programming from the ground up, but the resources are still good and manages to convince at least me quite well.

I also recommend reading the source code. It is surprisingly readable, even to me – a person who is neither fluent in advanced typescript or an FP zealot.
