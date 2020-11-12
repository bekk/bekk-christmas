---
calendar: javascript
post_year: 2020
post_day: 1
title: Javascript Addition
image: https://images.unsplash.com/photo-1548175551-1edaea7bbf0d
ingress: >-
  **JavaScript:** *Do you know addition?*


  **Me:** *Of course! I learned mathematics when I was seven, addition is fairly easy!*


  **JavaScript:** *Do you really know addition? Please solve this equation*


  ```javascript

  true + \[] = ?

  ```


  **Me:** *Eh?*


  **JavaScript:** *Welcome to JavaScript addition!*
links:
  - url: https://tc39.es/ecma262/#sec-addition-operator-plus
    title: https://tc39.es/ecma262/
  - url: https://javascript.info/type-conversions
    title: Type conversions
authors:
  - Charlie Midtlyng
---
If you have been working with JavaScript you have probably seen a lot of usage with the `+` operator and discovered that the output is not necessarily what you expected.

The language supports using the `+` operator between (almost) all kinds of types - the results might therefore be confusing. In JavaScript, there is no compiler to hold your hand on your “addition journey”.

> The addition operator either performs string concatenation or numeric addition. 

With the rule above you should be able to understand all additions in JavaScript, but some of us need to see examples and explanations to fully understand the different scenarios.

First of all, remember that JavaScript performs the addition from left to right - evaluating parentheses first. This should be familiar with what you have learned in middle-grade mathematics.

```javascript
Step-by-step example
1 + 2 + (3 + 4)
1 + 2 + 7
3 + 7
10
```

----

As the rule states - with two numeric elements the output is a numeric value

```1 + 1 = 2```

String concatenation is common between different programming languages and is reasonable

`"Santa" + " " + "Claus" = "Santa Claus"`

So far, so good!

The most important “rules” with addition in JavaScript is:

* Adding a non-numeric value to a numeric value will try to convert the non-numeric value to a numeric value, if possible. If not, both are converted to strings.
* Adding a non-numeric value to some value will convert both values to strings before adding them

So, what happens when you combine these?

```javascript
1 + "2" = "12"
1 + 1 + "2" = "22"
1 + "1" + "2" = "112"
```

Confused? At least I am…

First line - a numeric value and non-numeric value is added - both are converted to strings before they are added

```"1" + "2" = "12"```

Second line - there are both numeric addition and string concatenation

```javascript
1 + 1 = 2
2 + "2" = "2" + "2" = "22"
```

Third line only contains string concatenation

`"1" + "1" + "2" => "112"`

Unfortunately, it doesn’t end here. Some other types in JavaScript behave in a rather non-typical way when used for addition.

## Boolean

What happens when you add something with a boolean value?

```javascript
1 + true = 2
1 + false = 1
true + true = 2
false + false = 0
"1" + true = "1true"
"1" + false = "1false"
```

Boolean values can be converted to numeric values in JavaScript and the result of the conversion is:

***true*** => ***1***

***false*** => ***0***

Combining a boolean and a string value converts true to “true” and false to “false”.

## Objects, arrays and functions

When one of the values in an addition is an object, array or function it will try to convert it to a primitive value.
1) Execute the `valueOf()`-function and use that value if it is a primitive
2) Execute the  `toString()`-function

```javascript
const me = { name: "Charlie", age: 34 }
me + 1 = "[object Object]1"
```

The default `valueOf()`-implementation is an empty object `{}` - which is not a primitive and it will try to convert it using `toString()`. The default toString-value for an object is “\[object Object]” - not very useful for addition. Unfortunately, I have seen this many times during my time as a developer - it usually happens when I forget to specify the property of the object that should be part of the addition.

Sometimes, it might be handy to override the valueOf-function and make it return something useful.

```javascript
const me = { name: "Charlie", age: 34 }
me.valueOf = function () { return this.age }
me + 1 = 35
```

The return type is now a numeric value and it will add 34 with 1 - which is 35.

The same can be done for a function or a class.

```javascript
function BekkEmployee(name, age) {
  this.name = name;
  this.age = age;
  this.toString = function () {
    return `${this.name} is ${this.age} years old`;
  }
}

new BekkEmployee("Charlie", 34) + 100 = "Charlie is 34 years old100"
```

For arrays `valueOf` returns the array which is not a primitive. The output of its `toString()` is the content joined with a comma. An empty array is the same as an empty string.

```javascript
[] + 1 = "1"
[1, 2, 3] + [4, 5, 6] = "1,2,3" + "3,4,5" = "1,2,34,5,6"
```

Since you have been reading all along - here is a quiz for you:

PS: try to solve it before you check the console in the browser

```javascript
const me = { name: "Charlie", age: 34 }
me.toString = function () { return this.age }

true + me + 65 + [2] + false + me + "merry christmas"
```

## Weirdos

Now that you know the important rules of addition, there are some types you also should be aware of:

```javascript
undefined + 1 = NaN // undefined is converted to numeric => NaN
undefined + "1" = "undefined1"
null + 1 = 1 // null is converted to numeric => 0
null + "1" = "null1"
NaN + 1 = NaN
NaN + "1" = "NaN1"
Symbol(1) + 1 // TypeError: Cannot convert a Symbol value to a number
BigInt(1) + 1 // TypeError: Cannot mix BigInt and other types, use explicit conversions
```

## Numeric conversion

These values will be converted to numeric values when added with a numeric value:

| non-numeric value | numeric value |
| ----------------- | ------------- |
| true              | 1             |
| false             | 0             |
| undefined         | NaN           |
| null              | 0             |
| NaN               | NaN           |


Wrapping up, addition is not as easy as we know from mathematics. However, if you remember some of the most important conversion you will save yourself from some headaches from time to time!