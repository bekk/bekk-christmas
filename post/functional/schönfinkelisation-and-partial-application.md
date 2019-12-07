---
calendar: functional
post_year: 2019
post_day: 9
title: Schönfinkelisation and Partial Application
image: >-
  https://images.unsplash.com/photo-1575582050795-c7c42bf57672?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80
ingress: ''
authors:
  - Kjetil Valle
---
As we discussed in a [previous article](https://functional.christmas/2019/2), one of the things we can do with a function is to call it with fewer arguments than it is expecting. This will result in a new function where the arguments we did provide are bound to values, and the reminding arguments are still expected as parameters. Since we apply the function to _only some_ of its arguments, we call this technique _partial application_.

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
incrementByFife =
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

By using currying, we can convert `add` into `curriedAdd`. And this process will work with functions of any number of arguments. And with this new function, we're free to do things like this again:

```javascript
incrementByFive = curriedAdd(5)
```

But why didn't we have to do this in Elm? That's because in Elm, like many other functional programming languages, functions are _curried by default_. This means that all functions can easily be partially applied! And that's also why the type signature we saw in the first example looks like this:

```elm
add : number -> number -> number
```

A different way to read this type is like this:

```elm
add : number -> (number -> number)
```

So, as you see, `add` is in fact a function which takes only one argument (a `number`) and returns a function (with the type `number -> number`).

## Why is this useful?

The `incrementByFive` example above is obviously quite contrived. But you'd be surprised how often partial application turns out to be useful when writing code in a functional language.

This often occurs when we're using functions like _map_ or _filter_. These functions expects an argument which is a function that can be applied to every element of a list, and which must thus take _exactly one_ argument. It is often convenient to create this function by using partial application.

Here are a couple of examples, again using Elm. 

```elm
-- Convert a list of `Maybe String` into something that 
-- can be displayed to the user, using "n/a" where we 
-- don't have a value.
displayNames = List.map (Maybe.withDefault "n/a") [ Just "NBN", Nothing, Just "Jinteki", Just "Wayland"]
-- Result: [ "NBN", "n/a", "Jinteki", "Wayland" ]

-- Filter a list of names to include only the people 
-- named "John".
johns = List.filter (String.startsWith "John") [ "John Snow", "John Rambo", "James Bond", "John McClane", "Jack Bauer"]
-- Result: [ "John Snow", "John Rambo", "John McClane" ]
```

Both [Maybe.withDefault](https://package.elm-lang.org/packages/elm/core/latest/Maybe#withDefault) and [String.startsWith](https://package.elm-lang.org/packages/elm/core/latest/String#startsWith) expect to get two arguments, but by only applying them partially we get exactly what we need.

As another example, say we have a function with the following type signature in our Elm application.

```elm
log : LogConfig -> Message -> Cmd msg
```

The function requires a configuration type and a message. Depending on the configuration, the message might be logged to a backend service or maybe to the browser console. To specify the configuration everywhere we need to log something would be rather cumbersome. Instead we can just partially apply `log` to the configuration once, and use the resulting function in the rest of the application!

The more used you get to functional programming, the more places you will find where a partially applied function is exactly what you need.

## Schönfinkeli-what-now?

The name _currying_ is a reference to the American logician Haskell Brooks Curry. (If the name sounds familiar, that's no coincidence: Mr. Curry is quite popular among computer scientists, and has in fact _three_ languages named after him: [Haskell](https://www.haskell.org/), [Brook](http://graphics.stanford.edu/projects/brookgpu/) and [Curry](https://www-ps.informatik.uni-kiel.de/currywiki/)…)

However, he was not the one to first discover the technique of _currying_. The Russian logician and mathematician Moses Ilyich Schönfinkel had already described the concept previously, and was in fact also attributed by Curry for doing it. So, maybe we should start to refer to it as _schönfinkelisation_ instead?
