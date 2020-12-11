---
calendar: elm
post_year: 2020
post_day: 11
title: Lord of the pipes
image: https://images.unsplash.com/photo-1551103782-8ab07afd45c1?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&w=2000&h=800&fit=crop
ingress: If the bulk of your programming experience comes from C-like languages,
  there’s a chance you find pipes, `|>`and `<|` some of the most distinct
  features of Elm. Roll up your sleeves, it's time to master the art of piping.
authors:
  - Jørgen Tu Sveli
---
Their shape partly reveals what they do; something goes to the right `|>` or to the left `<|`. Yet you quickly realize you need to really understand what they do to in turn understand Elm. They have the role of operators in Elm and they control function application. 

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

The improvement might not be apparent. Now, at least the steps are shown in order. Let's assume we instead wanted the sum of the squares of the first n numbers: `( 1² + 2² + 3² + .. n² = ? ).`

```elm
square: Int -> Int
square x = 
  x * x

-- No pipes
nFirstSquaresSum: Int -> Int
nFirstSquaresSum n =
  List.sum (List.map square (List.range 1 n))
    
-- With pipes
nFirstSquaresSum: Int -> Int
nFirstSquaresSum n =
  List.range 1 n
    |> List.map square
    |> List.sum 
```

The former requires us to parse the parens, to spot the order of the statements. In this case the order is right to left. The latter variant instantly reveals the different steps in perfect order of execution. It forms a *pipeline.* 

The backwards pipe, `<|` *could* be used to express the same sequence of calls as its brother `|>`, but in the opposite order. The example above, with the same formatting, would put `List.sum` first and on a line of its own. This is confusing since in reality it is the last function called. It is better expressed on one line:

```elm
nFirstSquaresSum: Int -> Int
nFirstSquaresSum n =   
    List.sum <| List.map square <| List.range 1 n
```

This is closer to how one would write in a language that uses parens for function calls. However, long sequences of `<|` quickly produce long lines. It is almost always possible to express the same sequence using `|>` . My personal rules of thumb are:

1. Try to express things vertically with |>
2. Dont mix |> and <| in the same expression
3. Use a single <| in an expression to avoid parens

Of these, number 3 deserves additional examples. Recall [day 1](https://www.elm.christmas/2020/1), when we noticed that we can pair two values with both syntax `(1, "one")` and the function `Tuple.pair`. One way this function is useful is with pipes. In the code below, we pair an argument to the function tup with the result of some other expression. With a pipe and Tuple.pair it looks cleaner than if we would use normal tuple syntax.

```elm
tup : Int -> (Int, String)
tup number =
    Tuple.pair number 
        <| case number of
            1 -> "one"
            2 -> "two"
            3 -> "three"
            _ -> "something else"
```

## Going deep

\|> is one of Elm’s operators. Like + it’s an infix operator which gets its two *operands* from either side. + adds the left and right operand together. As you will learn more about in coming days, + and all other operators are functions in Elm. This is the type signature for +

`(+) : number -> number -> number`

`|>` has its own type signature:

`(|>) : a -> (a -> b) -> b`

This signature tells us that the left operand (first argument) is an `a` value, the second operand is something that changes an `a` value into a `b` value, and the result is a `b`. Studying these type signatures might seem like an unnecessarily academic activity, but reading and understanding type signatures will enable you to identify where and how you can use pipes in your own code. I also find that the compiler became far more helpful when I started to understand the type signatures of the functions I tried to pipe things into.