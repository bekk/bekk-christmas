---
calendar: javascript
post_year: 2019
post_day: 17
title: Writing JavaScript With Only Six Characters
image: >-
  https://images.unsplash.com/photo-1572435555646-7ad9a149ad91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80
ingress: >-
  You've probably seen someone on the internet write funny-looking but runnable
  JavaScript code using only six different characters. But how does that
  actually work?
description: javascript
authors:
  - Erik Wendel
---

You can write basically any JavaScript program on the planet using just these characters:

```js
[]()!+
```

This is a well-known trick, but not that many developers know how it actually works. Today, we're gonna look at how it works under the hood. Let's create the string `"self"` using only our funny little subset of characters.

Our target string will be `"self"`, as an homage to the programming language Self for being one of the inspirations for JavaScript.

## How it works: the basics

What allows us to make all other characters superfluous is the fact that we can abuse JavaScript's type system and bizarre type conversion mechanisms.

We'll be using our six superhero characters this way: with `[]` we can create arrays, with the negation and addition operators `!` and `+` we can do operations on them and finally use `()` to group operations.


Let's start off with a simple array:

```js
[]
```

Negating an array with `!` will coerce the array into a boolean. Arrays are considered to be truthy. Therefore, negating it will produce `false`:

```js
![] === false
```

Values of different types cannot be added together unless converted to similar types. JavaScript follows a pre-defined ruleset when doing conversions:

In the expression `2 + true`, JavaScript will convert `true` to a number, resulting in the expression `2 + 1`.

In the expression `2 + "2"`, JavaScript will convert the number of a string, resulting in `2 + "2" === "22"`.

These conversion rules aren't _that_ bad, but it gets quite interesting quite quickly with other types.

## JavaScript Array Coercions

Adding arrays together will convert them both to strings and concatenate them. Empty arrays turns into empty strings, so adding two arrays together yields the empty string.

```js
[] + [] === "" + "" === ""
```

The same will happen when adding an array with something else, lets say, a boolean.

```js
![] + [] === "false" + "" === "false"
```

Aha! Now we're conjured a string containing the characters we need to produce our end goal, the string `"self"`.

If we could produce some numbers, we could extract the characters we need in the right sequence:


```js
"false"[3] === "s"

(![] + [])[3] === "s"
```

Let's go looking for numbers!

### Creating numbers

In the previous section, we _coerced_ an array to a boolean.
What happens if we coerce it to a number using `+`?

```js
+[] === ???
```

JavaScript will attempt to call `valueOf` on the array, which will fail and fall back to calling `toString()` on the array.

```js
+[] === +""
```

Converting a string to a number will produce the following results:

```js
+"42" === 42
+"esg" == NaN
+"" === 0
```

The empty string is a falsy value, like `null`, `undefined` and the number zero, so converting any of these to a number produces zero:

```js
+null === 0
+undefined === 0
+false === 0
+NaN === 0
+"" === 0
```
So converting an array to a number takes a detour converting to string first, finally producing zero:

```js
+[] === +"" === 0
```

Aha! We've managed to produce a number! Although, not a very useful one.
However, we can keep playing the coercion game:


```js
!0 === !false
!false === true

!0 === true
```

Negating zero will make the falsy value of zero into a truthy boolean.
A truthy boolean as a number becomes... one!

```js
+true === 1
```

Hooray! One one can become two ones... which is two. You get the point.

Using the substitutions we've learned to create numbers:

```js
1 === +true == +(!0) ==== +(!(+[])) === +!+[]

1 === +!+[]
2 === +!+[] +!+[]
3 === +!+[] +!+[] +!+[]
4 === +!+[] +!+[] +!+[] +!+[]
```

## Putting it all together

Let's put together all the things we've learned.

* Arrays are truthful values, so negating them will produce false: `![] // false`
* JavaScript coercing rules state that adding arrays together will toString them: `[] + [] // ""`
* Converting an array to a number becomes zero, when negated becomes true, when coerced to number becomes 1: `+(!(+[])) === 1`


```js
![] + [] === "false"
+!+[] === 1

(![] + [])[3] + (![] + [])[4] + (![] + [])[2] + (![] + [])[0]
^^^^^^^^^^      ^^^^^^^^^^      ^^^^^^^^^^      ^^^^^^^^^^      
  "false"         "false"         "false"         "false"       

^^^^^^^^^^^^^   ^^^^^^^^^^^^^   ^^^^^^^^^^^^^   ^^^^^^^^^^^^^    
      s               e               l               f         
```

Our final expression thus becomes:


```js
(![] + [])[+!+[]+!+[]+!+[]] + 
(![] + [])[+!+[]+!+[]+!+[]+!+[]] + 
(![] + [])[+!+[]+!+[]] +
(![] + [])[+[]]

```

Adapting our expression to this specific JavaScript dialect, where newlines and whitespaces are, of course, banned:

```js
(![]+[])[+!+[]+!+[]+!+[]]+(![]+[])[+!+[]+!+[]+!+[]+!+[]]+(![]+[])[+!+[]+!+[]]+(![]+[])[+[]]
```

Easy as pie!

Thank you, Brendan Eich ❤️















