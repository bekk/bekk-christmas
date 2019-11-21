---
calendar: functional
post_year: 2019
post_day: 18
title: Schönfinkelisation and Partial Application
ingress: ''
---
As we discussed in a [previous article](link-til-simens-artikkel-her), one of the things we can do with a function is to call it with fewer arguments than it is expecting. This will result in a new function where the arguments we did provide are bound to values, and the remainding arguments are still expected as parameters. Since we apply the function to only _some_ of its arguments, we call this technique _partial application_.


```elm
-- A simple function, adding together two arguments.
-- If you find the type signature confusing, don't worry
-- about that for now.
add : number -> number -> number
add a b = 
	a + b

-- A relatively useless function, used to illustrate 
-- partial application…
incrementByFive : number -> number
incrementByFife n =
	-- Here we partially apply the `add` function. By
	-- only providing the first argument, we get a new
	-- function in return, which will accept another
	-- number, which it will always add 5 to!
	add 5

-- Yes, this would return 42
incrementByFive 37
```

## Currying

TODO

## Why is this useful?

TODO

## Schönfinkeli-what-now?

TODO
