---
calendar: elm
post_year: 2020
post_day: 11
title: UTKAST Lord of the pipes
image: https://source.unsplash.com/_R95VMWyn7A/2000x800
ingress: If the bulk of your programming experience comes from C-like languages,
  there’s a chance you find pipes, `|>`and `<|` some of the most distinct
  features of Elm. Fold up your heels and dig your sleeves in, it's time to
  master the art of piping.
---
If C-like languages form the bulk of your programming experience, there’s a chance you find pipes, `|>`and `<|` to be some of the most distinct features of Elm. You often find them in the most important parts of the code. This is often code that transform some data. Their shape partly reveals what they do; something goes to the right `|>` or to the left `<|`. Yet you quickly realize you need to really understand what they do to in turn understand Elm.

Below is one way of calculating the sum of the n first natural numbers `( 1 + 2 + 3 + .. n = ? )`

```elm
nFirstSum: Int -> Int
nFirstSum n =
    List.sum (List.range 1 n)
```

We make a list of numbers with 1 as the first and n as the last element. Then we pass that list to `List.sum`.  We need parens around the call to `List.range`. Without them, `List.sum` would assume the function `List.range` itself was its argument. This is because function calls are left-associative in Elm. 

We can use a pipe to get rid of the parens.

```elm
nFirstSum: Int -> Int
nFirstSum n =
  List.range 1 n
    |> List.sum
```

The improvement might not be apparent, but now, the steps are shown in order. Let's assume we instead wanted the sum of the squares of the first n numbers: `( 1^^2 + 2^2 + 3^2 + .. n^2 = ? ).`

```elm
square: Int -> Int
square x = 
  x * x

-- No pipes
nFirstSum: Int -> Int
nFirstSum n =
  List.sum (List.map square (List.range 1 n))
    
-- With pipes
nFirstSum: Int -> Int
nFirstSum n =
  List.range 1 n
    |> List.map square
    |> List.sum 
```

While the former requires careful parsing of parens, the latter variant instantly reveals the different steps. It forms a *pipeline.*







\|> is one of Elm’s operators. Like + it’s an infix operator which gets its two operands from either side. + adds the left and right operand together. You might have already guessed it, + and all other operators are functions in Elm. This is the type signature for +

(+) : number -> number -> number

\[The parens can be used when referring to the operator as a function, for example to pass as an argument  or to compose with another function that takes two numbers]

\|> has its own type signature:

(|>) : a -> (a -> b) -> b

This signature tells us that the left operand (first argument) is an \`a\` value, the second operand is something that changes an \`a\` value into a \`b\` value, and the result is a \`b\`. Studying these type signatures might seem like an unnecessarily academic activity, but reading and understanding type signatures will allow you to identify where and how you can use pipes in your own code.