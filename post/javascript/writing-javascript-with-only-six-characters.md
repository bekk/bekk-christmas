---
calendar: javascript
post_year: 2018
post_day: 14
title: Writing JavaScript With Only Six Characters
image: >-
  https://images.unsplash.com/photo-1478105069489-aca3e3fedcf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&dpr=1&auto=format&fit=crop&w=1000&q=80&cs=tinysrgb
ingress: >-
  You've probably seen someone on the internet write funny-looking but runnable
  JavaScript code using only six different characters. But how does that
  actually work?
links:
  - title: jsfuck.com
    url: 'http://www.jsfuck.com/'
  - title: Coercion rules
    url: 'https://www.oreilly.com/library/view/you-dont-know/9781491905159/ch04.html'
authors:
  - Erik Wendel
---

You can write basically any JavaScript program on the planet without using any more than these characters:

```js
[]()!+
```

You've probably seen or heard about this already (it's been quite Twitter-friendly).

In today's JavaScript article, we're gonna look at how this works under the hood. Let's task ourselves with creating a string using only our funny little subset of characters.

Our target string will be `"self"`.


*(Because the language *Self* was one of the inspirations Brendan Eich had in mind when he created JavaScript).*

## Let's go!

What allows us to make all other characters superfluous is the fact that we can abuse JavaScript's weak type system and bizarre type conversion mechanisms.

We'll be using our six superhero characters this way: with `[]` we can create arrays, with the negation and addition operators `!` and `+` we can do operations on them and finally use `()` to group operations.

Let's start off with a simple array:

```js
[]
```

Negating an array with `!` will coerce the array into a boolean. Arrays are considered to be truthy, so negating it produces `false`:

```js
![] === false
```

When adding values of different types together, JavaScript follows a pre-defined set of rules for what the values should be converted to, in order to actually add them together.

In the expression `2 + true`, JavaScript will convert `true` to a number, resulting in the expression `2 + 1`.

In the expression `2 + "2"`, JavaScript will convert the number of a string, resulting in `2 + "2" === "22"`.

These conversion rules aren't _that_ bad, but it gets quite interesting quite quickly with other types.

## Fun with arrays

Adding arrays together will convert them both to strings and concatenate them.

```js
[] + [] === "" + "" === ""
```

The same will happen when adding an array with something else, lets say, a boolean.

```js
![] + [] === "false" + "" === "false"
```

Aha! Now we're conjured a string containing the characters we need to produce our end goal, the string `"self"`.

If we only had a number or four, we could extract the characters we need in the right sequence..


```js
"false"[3] === "s"

(![] + [])[3] === "s"
```

Let's go looking for numbers!

### Fun with arrays part II

In the previous section, we _coerced_ an array to a boolean.
What happens if we coerce it to a number using `+`?

```js
+[] === ???
```

JavaScript will attempt to call `valueOf` on the array, which will fail and fall back to a simple `toString()`;

```js
+[] === +"" == 0
```

Coercing a string to a number will produce the following results:

```js
+"42" === 42
+"esg" == NaN
+"" === 0
```

Thus:

```js
+[] === +"" === 0
```

Aha! Now we have a number, albeit not a very useful one.
However, we can keep playing the coercion game:


```js
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

+!+[] +!+[] === 2
```

## Putting it all together

Let's put together all the things we've learned.

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
