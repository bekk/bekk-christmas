---
calendar: functional
post_year: 2019
post_day: 18
title: Schönfinkelisation and Partial Application
ingress: ''
authors:
  - Kjetil Valle
---
As we discussed in a [previous article](link-til-simens-artikkel-her), one of the things we can do with a function is to call it with fewer arguments than it is expecting. This will result in a new function where the arguments we did provide are bound to values, and the remainding arguments are still expected as parameters. Since we apply the function to _only some_ of its arguments, we call this technique _partial application_.

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

It might surprise you that we are able to call the function `add` with only one argument. But, in fact, it is possible to turn a function of any number of arguments into a function of only one by using a process called _currying_.

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

But why didn't we have to do this in Elm? That's because Elm, like many other functional programming languages, are _curried by default_. This means that all functions can easily be partially applied! And that's also why the type signature we saw in the first example looks like this:

```elm
add : number -> number -> number
```

A different way to read this type is like this:

```elm
add : number -> (number -> number)
```

So, as you see, `add` is in fact a function which takes only one argument (a `number`) and returns a new function (with the type `number -> number`).

## Why is this useful?

The `incrementByFive` example above is obviously quite contrived. But you'd be surprised how often partial application turns out to be useful when writing code in a functional language.

This often occurs when we're using functions like _map_ or _filter_. These functions expects an argument which is a function that can be applied to every element of a list, and which must thus take _exactly one_ argument. It is often convenient to create this function by using partial application.

Here are a couple of examples, again using Elm. 

```elm
> -- foo bar  
> List.map (Maybe.withDefault "n/a") [ Just "NBN", Nothing, Just "Jinteki"]
```

TODO

## Schönfinkeli-what-now?

The name _currying_ is a reference to the American logician Haskell Brooks Curry. (If that first name sounds familiar, that's no coincidence. Curry is quite popular among computer scientists, and has in fact _three_ languages named after him: [Haskell](https://www.haskell.org/), [Brook](http://graphics.stanford.edu/projects/brookgpu/) and [Curry](https://www-ps.informatik.uni-kiel.de/currywiki/)…)

However, he was not the one to discover the technique of _currying_. The Russian logician and mathematician Moses Ilyich Schönfinkel had already described the concept previously, and was in fact attributed by Curry. So, maybe we should start to refer to it as _schönfinkelisation_ instead?
