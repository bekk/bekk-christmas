---
calendar: functional
post_year: 2019
post_day: 18
title: Schönfinkelisation and Partial Application
ingress: ''
---
As we discussed in a [previous article](link-til-simens-artikkel-her), one of the things we can do with a function is to call it with fewer arguments than it is expecting. This will result in a new function where the arguments we did provide are bound to values, and the remainding arguments are still expected as parameters. Since we apply the function to only _some_ of its arguments, we call this technique _partial application_.

Let's see how this works in Elm:

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

It might be surprising that we are able to call the function `add` with only one argument. But, in fact, it is possible to turn a function of any number of arguments into a function of only one by using a process called _currying_.

Say we have this little JavaScript function:

```javascript
function add(a, b) {
	return a + b
}
```

We can't just simply partially apply this function. In JavaScript you need to provide all the arguments when applying a function. However, we might define this function instead:

```javascript
function curriedAdd(a) {
	return function(b) {
		return a + b
	}
}
```

Now, we're free to do things like this again:

```javascript
incrementByFive = curriedAdd(5)
```

But why didn't we have to do this in Elm? That's because Elm, like many other functional programming languages, are _curried by default_. This means that all functions can be 

## Why is this useful?

TODO

## Schönfinkeli-what-now?

TODO
