---
calendar: javascript
post_year: 2018
post_day: 6
title: Coercion and equality checks
image: >-
  https://images.unsplash.com/photo-1509869175650-a1d97972541a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80
ingress: Have you ever wondered what the real difference is between == and === ?
links:
  - title: Math with dates in Javascript
    url: 'https://medium.com/@selbekk/math-with-dates-in-javascript-2b0ddcee63f'
  - title: Coercion in You Don't Know JS
    url: >-
      https://github.com/getify/You-Dont-Know-JS/blob/master/types%20%26%20grammar/ch4.md#chapter-4-coercion
  - title: Equality in You Don't Know JS
    url: >-
      https://github.com/getify/You-Dont-Know-JS/blob/master/types%20%26%20grammar/ch4.md#loose-equals-vs-strict-equals
authors:
  - Nicolai August Hagen
---
## Coercion
Typecasting. Converting. Coercion. We tend to have many names for the things we love. Coercion in JavaScript is really just about converting one value to another. For example, `5 + ''` will _convert_ the number 5 to a string. If we assign this expression to a variable (or wrap the expression in parentheses), we will suddenly have available methods from the string prototype. For example, we can retrieve the field `.length`.

This is an example of _implicit_ type coercion - we do not explicitly write out that we want to convert to a string. All lines below are examples of _explicit_ type coercion to numbers:

```javascript
Number(false) // 0
Number('')    // 0
Number([])    // 0
Number(null)  // 0
```

However, JavaScript also has more subtle ways of coercion:

```javascript
+new Date() // 15397079399379
```

Here, the plus sign indicates trying to retrieve the number value representation of the `Date` object. Read more about this fun and a tad confusing unary operator in [*Kristofer's article*](https://medium.com/@selbekk/math-with-dates-in-javascript-2b0ddcee63f) from earlier this fall.

My favourite way of do explicit coercion in JavaScript is with `!`:

```javascript
if(!person.age)
```

The `!` is actually coercing the statement to a boolean and turning the sign in the same operation. Hence, we may use the operator to check the truthyness or falsiness of _all_ values in JS: `!!foo`. Tada, double negation has never been more fun! 🎉

Or, you can go for the exam way of understanding truthyness/falsiness by memorizing the following list of _all falsy values in JS_ (the rest are truthy):

```javascript
undefined
null
false
0  
-0
NaN
''
```

## Equality checks

Equality checks have for many been an annoying affair to understand well. But fear not, the difference between `==` and `===` is best explained by JS evangelist [*Kyle Simpson*](https://twitter.com/getify):

> The correct description is: "== allows coercion in the equality comparison and === disallows coercion."

With this rule of thumb in mind, the following results should be expected:

```javascript
var a = 5;
var b = "5";

a === b; // false
a == b; // true
```
