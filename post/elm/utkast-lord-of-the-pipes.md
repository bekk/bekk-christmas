---
calendar: elm
post_year: 2020
post_day: 11
title: Lord of the pipes
image: https://source.unsplash.com/_R95VMWyn7A/2000x800
ingress: If the bulk of your programming experience comes from C-like languages,
  there’s a chance you find pipes, `|>`and `<|` some of the most distinct
  features of Elm. Fold up your heels and dig your sleeves in, it's time to
  master the art of piping.
---
If C-like languages form the bulk of your programming experience, there’s a chance you find pipes, `|>`and `<|` to be some of the most distinct features of Elm. Their shape partly reveals what they do; something goes to the right `|>` or to the left `<|`. Yet you quickly realize you need to really understand what they do to in turn understand Elm. They have the role of operators in Elm and they control function application. 

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

While the former requires careful parsing of parens, the latter variant instantly reveals the different steps. It forms a *pipeline.* 

The backwards pipe, `<|` *can* be used to express the same sequence of calls as its brother `|>`. Rewriting the example above with the same formatting, would put `List.sum` first and on a line of its own. This is confusing since in reality it is the last function called. Reformatted, this would become:

```elm
nFirstSquaresSum: Int -> Int
nFirstSquaresSum n =   
    List.sum <| List.map square <| List.range 1 n
```

This is closer to how one would write in a language that uses parens for function calls. However, it leads to long lines or confusion if broken up onto separate lines. My personal rules of thumb are:

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

This signature tells us that the left operand (first argument) is an \`a\` value, the second operand is something that changes an \`a\` value into a \`b\` value, and the result is a \`b\`. Studying these type signatures might seem like an unnecessarily academic activity, but reading and understanding type signatures will enable you to identify where and how you can use pipes in your own code. I also find that the compiler became far more helpful when I started to understand the type signatures of the functions I tried to pipe things into.