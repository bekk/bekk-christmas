---
calendar: elm
post_year: 2020
post_day: 11
title: UTKAST Lord of the pipes
image: https://source.unsplash.com/_R95VMWyn7A/2000x800
ingress: If the bulk of your programming experience comes from C-like languages,
  there’s a chance you find pipes, `|>`and `<|` some of the most distinct
  features of Elm. Fold up your heels and dig your sleeves in, it's time to
  master pipes.
---
If the bulk of your programming experience comes from C-like languages, there’s a chance you find pipes, `|>`and `<|` some of the most distinct features of Elm. You often find them in the middle of the most important parts of the code. This is often code that transform some data. Their shape partly reveals what they do; something goes to the right `|>` or to the left `<|`. Yet you quickly realize you need to really understand what they do to in turn understand Elm.



\|> is one of Elm’s operators. Like + it’s an infix operator which gets its two operands from either side. + adds the left and right operand together. You might have already guessed it, + and all other operators are functions in Elm. This is the type signature for +

(+) : number -> number -> number

\[The parens can be used when referring to the operator as a function, for example to pass as an argument  or to compose with another function that takes two numbers]

\|> has its own type signature:

(|>) : a -> (a -> b) -> b

This signature tells us that the left operand (first argument) is an \`a\` value, the second operand is something that changes an \`a\` value into a \`b\` value, and the result is a \`b\`. Studying these type signatures might seem like an unnecessarily academic activity, but reading and understanding type signatures will allow you to identify where and how you can use pipes in your own code.