---
calendar: functional
post_year: 2019
post_day: 21
title: Functional Data Validation
authors:
  - Kristoffer Severinsen
---
As web developers, we are often validating if the data coming from the frontend is valid per our domain logic.

To create a smooth experience for users, we want to respond to a request with either a success, or a failure, with a list of all the validation rules that didn't pass. This way the user does not have to post the request multiple times,  getting a new error each time.

We want our validation functions to take any input, and give out either a valid result type, or an error describing which of our constraints was broken.

By modelling the result from our validation function in a type that can represent both the valid and invalid data, we say the function is total. This will let us reason about the validation rule by just reading the signature of the function, i.e. a function from a String to either a Username, or an error message.

## Define a domain

At my project, we are using Scala and Elm in our web stack. While frontend validation is nice, we must use backend validation to enforce our domain rules. Let's say we want to create a user registration page, where a user has a name, age and a phone number:

```scala
  case class User(name: Name, age: Age, tlf: Telephone)

  case class Name(name: String)
  case class Age(age: Int)
  case class Telephone(nr: String)
```

### Validation functions

Then we create the `Validated` type to represent either the valid instance of type `A`, or a list of error messages that we can display on our registration page. We create a type alias for the Either type which is generic regarding the success type, but locks the error type to a list of strings:

```scala
  type Validated[A] = Either[List[String], A]
```

We could also represent errors as their own type, but let's stick to strings for this example.

Then let us write our validation functions. The `Either` type is a sum type that can either be a `Right` for the success case, or a `Left` to hold the error case. Here I have first created a generic helper function `cond` that just wraps the input in `Right` if a predicate pass, else the error is wrapped in a `Left`:

```scala
def cond[E, A](pred: Boolean, ifOk: A, ifFail: E): Either[E, A] =
    if (pred) Right(ifOk) else Left(ifFail)
```

We then create some simple validation functions for all the types needed to create a valid `User`. Let's say names cannot be longer than 3 characters, the minimum age is 18, and phone numbers must be exactly 8 characters long:

```scala
def validateName(str: String): Validated[Name] =
    cond(str.length <= 3, Name(str), List("your name is too lo.."))

def validateAge(i: Int): Validated[Age] =
    cond(i >= 18, Age(i), List("bring your parents!"))

def validateTlf(str: String): Validated[Telephone] =
    cond(str.length == 8, Telephone(str), List("No answer!"))
```

#### Validation using Monad

Because Either is a [Monad](https://functional.christmas/2019/5) in Scala we can implement our validation function using the `map` and `flatMap` properties provided by the Monad type class:

```scala
  def validateUser(name: String, age: Int, tel: String): Validated[User] =
    validateName(name).flatMap(
      n =>
        validateAge(age).flatMap(
          a =>
            validateTlf(tel)
              .map(t => User(n, a, t))
        )
    )
```

Using for-comprehensions, which are just syntax sugar for `flatMap` and `map` we get very nice syntax for defining a sequence of monadic operations:

```scala
def validateUser(name: String, age: Int, tel: String): Validated[User] =
    for {
      n <- validateName(name)
      a <- validateAge(age)
      t <- validateTlf(tel)
    } yield User(n, a, t)
```

The problem with using monadic properties for validation is that they model sequential computation, and if one of the validation functions fails, the resulting Left value will be passed on, and subsequent calls to `map` or `flatMap` will do nothing but pass along the Left value. The result is that even if all validation rules was broken, we only get one error message.

#### Validation using Applicative Functor

We need some way of composing the validation functions in parallel. Let us introduce another type class, the Applicative Functor. The Functor type class gives us the ability to apply functions to a value inside some context using `map`. The Applicative Functor type class extends on this ability with two properties. `pure` is the ability to create a context with the given value. For the Either type we are using as our context, this would simply be constructing a Right value:

```scala
trait Applicative[F[_]] extends Functor[F] {
    def pure[A](a: A): F[A]
    def map2[A, B, C](fa: F[A], fb: F[B])(f: (A, B) => C): F[C]
}
```

The other property required by the Applicative [Functor](https://functional.christmas/2019/20) is the ability to provide some way to combine two the values inside multiple context together. `map2` lets us supply a function that can combine the types inside the contexts, and the related function, `product` lets us put both values from two contexts into the same context.

By implementing this type class interface for our context, in our case the Either type, we can derive other useful functions, like `map`, and `product`. `map` is simply a map2 where we don't care about the second parameter, and `product` is just a `map2` supplied with the identity function:

```scala
    def map[A, B](f: A => B)(fa: F[A]): F[B] =
      map2(fa, pure(()))((a, _) => f(a))

    def product[A, B](fa: F[A], fb: F[B]): F[(A, B)] =
      map2(fa, fb)((a, b) => (a, b))
```

Let us give the Either type these properties. Scala uses `implicit` parameters to implement type classes, and the syntax for defining a type class for the Either type would look like this:

```scala
implicit def eitherInstance[E: Monoid]: Applicative[Either[E, *]] =
    new Applicative[Either[E, *]] {
      def pure[A](a: => A): Either[E, A] = Right(a)

      def map2[A, B, C](fa: Either[E, A], fb: Either[E, B])(
          f: (A, B) => C
      ): Either[E, C] =
        (fa, fb) match {
          case (Right(a), Right(b))     => Right(f(a, b))
          case (Left(errA), Left(errB)) => Left(errA combine errB)
          case (Left(errA), Right(_))   => Left(errA)
          case (Right(_), Left(errB))   => Left(errB)
        }
    }
```

There is a bit of syntax to decode here, and some of it is because of how Scala uses implicit parameters to implement type classes. The important parts are on the second line, where we create an Applicative instance for the type Either of the error type `E` and any value type.

We can see from the implementation of `map2` that the result from our validation functions will both be evaluated in an exhaustive pattern match. In the first case of the match statement we have our happy case, where we can apply our function.

The second case, where both values have failed is the most interesting one. We want to somehow concatenate the errors from both, and because we want to use a list of strings, we could have implemented this type class for our Validated type, and then we could simply use the built-in functions on lists to add them together.

However, because we have already written about [Monoid](https://functional.christmas/2019/19), we know that this type class gives us the ability to combine two objects of the same type. By constraining the error type `E` in to Monoid, we can later change the error type in our Validated type without changing any code!

We can now implement our validation function. We use `product` to combine all our results into the same Validated context, and then map the nested tuples of the success case to a validated instance of User:

```scala
def validateUser(name: String, age: Int, tel: String)(
      implicit A: Applicative[Validated]
  ): Validated[User] = {
    val prod =
      A.product(
        A.product(validateName(name), validateAge(age)),
        validateTlf(tel)
      )
    prod.map { case ((n, a), t) => User(n, a, t) }
  }
```

We can here see the use of the implicit parameter. The compiler searches for an instance of Applicative the type Validated, which we remember is the same as `Either[List[String], A]`. If the compiler finds the Applicative instance for Validated, and the Monoid instance for List, the code will compile.

We can now run our validation, and it will create a list all the validation rules that failed.

```scala
validateUser("Young Bob", 3, "12345"),
//res0: Left(List(your name is too lo.., bring your parents!, No answer!))

validateUser("Bob", 30, "12345678")
//res2: Right(User(Username(Bob),Age(30),Telephone(12345678)))
```

However, the code looks a bit messy. Luckily this pattern can be generalized and added to the applicative type class as `map3`.

```scala
def validateUser(name: String, age: Int, tel: String)(
      implicit A: Applicative[Validated]
  ): Validated[User] = {
    A.map3(
      validateName(name),
      validateAge(age),
      validateTlf(tel)
    )(User)
}
```

#### Then we are all done?

This does look a lot cleaner, but there is still one problem, what if we want to add another field to the User type? We would then need to implement `map4`, and so on.

In our real-world projects, we use a library for Scala called [Cats](https://typelevel.org/cats/), which comes with all batteries included. This library provides a large collection of type classes, like Monoid, Functor, Applicative and Monad, and instances for the built-in types in Scala.

To implement my validation function using Cats, I would only need to import the implicit type class instances from Cats, write the three validation functions, and apply them using `parMapN`.

```scala
import cats.implicits._

(validateName(name),
 validateAge(age),
 validateTlf(tel))
  .parMapN(User)

```

I hope I could convince you how using patterns from functional programming can help us solve some common problems in a terse and readable way.
