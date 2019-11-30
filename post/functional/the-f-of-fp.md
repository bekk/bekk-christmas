---
calendar: functional
post_year: 2019
post_day: 2
title: The F of FP
ingress: >-
  Architecture in Functional Programming (FP) and Object Oriented
  Programming (OOP) is very different. While the class is the main
  abstraction in OOP, the function is the abstraction in FP. Looking over
  the fence, it seems impossible to solve problems using the other
  paradigm. In order to learn how to design program with functions, we
  must first learn how they work in FP as a function is not the same as a
  method.

authors:
  - Simen Endsjø
---

This is not intended to be an in-depth introduction to functions, but
rather show how a few features works together that allows us to build
larger functionality based on smaller building blocks.

I'll use F\# to show the concepts here. Not all languages works the same
way, but a lot should easily transfer to your functional language of
choice. F\# is a functional-first, multi-paradigm, programming language
for the .NET platform.

The syntax highlighted blocks in this post might be immediately followed
by a block with non-highlighted evaluation of the preceding example.
This is the same result you would get if you typed the block in the
read-eval-print-loop (repl) manually. You can follow there examples by
using `fsi.exe` on Windows or `fsharpi` on \*nix operating systems.

A block of source code like the following:

``` fsharp
let i = 1
```

Might be immediately followed by a block like the following, which shows
the result of evaluating the code block.

``` example
val i : int = 1
```

Let's dive in with a small example. We'll implement the following
pseudo-C\# function in F\#:

``` csharp
public static int Add(int x, int y) { return x + y; }
Add(2, 3);
```

``` fsharp
let add x y = x + y
add 2 3
```

``` example
val add : x:int -> y:int -> int
val it : int = 5
```

`let` will bind a symbol to a value or function. Here we bind the name
`add` to a function taking two parameters. The syntax for functions is a
lot terser than C\#. Parameters and arguments are separated by space
rather than comma, and we don't wrap them in parenthesis. The types are
also inferred in many cases so you don't have to specify them when it
doesn't improve the program. The last expression is also returned from
the function automatically.

The type of the function is `int -> int -> int`, which means it takes
two ints and returns an int. A function taking int and string, returning
float, would be `int -> string -> float`.

You might have seen lambdas (nameless functions) in various other
languages, and in F\#, it's called `fun`

``` fsharp
(fun x y -> x + y) 2 3
```

``` example
val it : int = 5
```

We can also bind anonymous functions, thus giving it a name.

A function has **parameters**. The value we "pass in" for a parameter is
called an **argument**. We say that we **apply** a function to
arguments. For the above example, `x` and `y` are parameters. `2` and
`3` are arguments. We apply the anonymous function to these arguments,
thus binding the parameters `x` to `2` and `y` to `3`. When the last
parameter is bound, the function is evaluated.

``` fsharp
let add = fun x y -> x + y
add 2 3
```

``` example
val add : x:int -> y:int -> int
val it : int = 5
```

Notice that this is exactly the same as our first version of add\! `let
add x y = x + y` is just a shorthand for `let add = fun x y -> x + y`.

But I've been lying about this function; It isn't a function taking two
parameters at all\! It's a function taking a single argument, returning
a function that takes a single argument\!

``` fsharp
let add =
    fun x ->
        fun y ->
            x + y
add 2 3
```

``` example
val add : x:int -> y:int -> int
val it : int = 5
```

This also means that `->` is right associative. The type `int -> int ->
int` should read `(int -> (int -> int))`; takes a single int, returns a
function which takes an int and returns an int.

Notice that the innermost lambda `fun y` refers to the variable `x`
which defined as a parameter or in the body of the lambda. This means
`x` is a free variable, which must be evaluated from the surrounding
environment.

But.. If `add` takes a single parameter, what happens if we call it with
a single argument?

``` fsharp
let add =
  fun x ->
    fun y ->
      x + y

let add2 = add 2

// alsoAdd2 has bound x to 2, thus becoming
let alsoAdd2 =
  fun y ->
    2 + y

add2 3
```

``` example
val add : x:int -> y:int -> int
val add2 : (int -> int)
val alsoAdd2 : y:int -> int
val it : int = 5
```

This is called Partial Function Application. We're applying the function
`add` to `2`, thus binding `x` to `2` in the environment of `fun y`. In
the `fun y` lambda, `x` is no longer free, and it's the same as
`alsoAdd2` . We say that a function with free variables such as `fun y`
is a closure (closes over its environment).

The process of translating a function from many parameters to nested
functions taking only a single parameter is called currying. In
languages such as F\# and Haskell, this is automatic; all functions
takes just a single parameter, and functions taking multiple parameters
are just syntactic sugar.

Currying and closures are the main features we need to start creating
more complex functions by combining more primitive functions.

Closures can also be used to hide implementation details or state. The
following example creates a counter. You can never modify the variable
directly.

``` fsharp
let mkCounter () =
  let mutable x = 0
  let get () = x
  let inc () = x <- x + 1
  (get, inc)

let (getX, incX) = mkCounter ()
let (getY, incY) = mkCounter ()

incX ()
incX ()
incX ()

incY ()

(getX (), getY ())
```

``` example
val mkCounter : unit -> (unit -> int) * (unit -> unit)
val incX : (unit -> unit)
val getX : (unit -> int)
val incY : (unit -> unit)
val getY : (unit -> int)
val it : int * int = (3, 1)
```

A common pattern in programming is to process some data in a pipeline
without caring much about the intermediate steps.

``` csharp
X x = FetchSomething();
Y y = SomeProcessing(x);
DoSomething(y);

// And sometimes it's inlined to avoid temporary variables
DoSomething(SomeProcessing(FetchSomething()));

// Or a helper function is created
void LotsOfStuff() {
  X x = FetchSomething();
  Y y = SomeProcessing(x);
  DoSomething(y);
}

// Or even a class can be created to support method chaining
class C {
  X x;
  Y y;

  C FetchSomething() {
    this.x = ActualFetchSomething();
    return this;
  }

  C SomeProcessing() {
    this.y = ActualSomeProcessing(x);
    return this;
  }

  C DoSomething() {
    ActualDoSomething(y);
    return this;
  }
}

var c = new C();
c.FetchSomething().SomeProcessing().DoSomething();
```

In functional programming, we can build bigger functions by composing
smaller functions.

``` fsharp
let compose f g x = g (f x)
```

``` example
val compose : f:('a -> 'b) -> g:('b -> 'c) -> x:'a -> 'c
```

The strange `'a` types are generic arguments, and they will be inferred
from the functions you pass into `compose`. If we don't omit redundant
parenthesis, it becomes clearer `(a -> b) -> (b -> c) -> (a -> c)`.
"Given a function from a to b and a function from b to c, create a new
function from a to c".

`compose` will first run the first function, and then use the result of
the first as an argument to the second function. And this can be nested
so we can create arbitrary complex functions `compose (compose first
next) last`.

``` fsharp
let fetchSomething () = 1
let someProcessing x = x + 1
let doSomething y = ()

// Compose them in multiple operations
let fetchThenProcess = compose fetchSomething someProcessing
let fetchThenProcessThenDoSomething = compose fetchThenProcess doSomething

// Or all in one
let lotsOfStuff = compose (compose fetchSomething someProcessing) doSomething 
```

``` example
val fetchSomething : unit -> int
val someProcessing : x:int -> int
val doSomething : y:'a -> unit
val fetchThenProcess : (unit -> int)
val fetchThenProcessThenDoSomething : (unit -> unit)
val lotsOfStuff : (unit -> unit)
```

While this works fine, there's a bit noise in the form of parenthesis
and function names. Luckily, F\# contains an infix alias for compose.

``` fsharp
(>>)
```

``` example
val it : (('a -> 'b) -> ('b -> 'c) -> 'a -> 'c)
```

Composing a set of operations would now be `op1 >> op2 >> op3 >> .. >>
opN`

``` fsharp
let lotsOfStuff = fetchSomething >> someProcessing >> doSomething
```

``` example
val lotsOfStuff : (unit -> unit)
```

Another useful function is `apply`. It's the kind of functions that
looks utterly useless, but makes "pipelines" a lot easier to read.

``` fsharp
let apply x f = f x
```

``` example
val apply : x:'a -> f:('a -> 'b) -> 'b
```

Soooo… Instead of writing `f 1` we can write `apply 1 f`\! Profit\! But
when we consider partial application, `apply 1` will create a function
that will pass `1` as an argument to any function. This can be used to
supply common parameters to functions. `apply connection transaction
config` creates a function that will send those arguments to the
functions you apply. `apply` also has a useful infix version, `|>`,
which shows a common use-case for `apply`.

``` fsharp
let f x = x+1
let g x = x.ToString()
let h (x : string) = x.ToLower()

1
|> f
|> g
|> h
```

``` example
val f : x:int -> int
val g : x:'a -> string
val h : x:string -> string
val it : string = "2"
```

This could also be written as

``` fsharp
(f >> g >> h) 1
```

``` example
val it : string = "2"
```

Or even

``` fsharp
1 |> (f >> g >> h)
```

``` example
val it : string = "2"
```

This concludes our little introduction. We've talked a bit about
currying, partial function application, arguments, parameters, closures,
compose and apply. There's a lot more to be said about each of these
topics, and a whole lot more about functions in general. But this is
enough to start exploring how to use functions for abstractions rather
than classes.
