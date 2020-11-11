---
calendar: javascript
post_year: 2020
post_day: 1
title: Javascript Addition
image: https://images.unsplash.com/photo-1548175551-1edaea7bbf0d
ingress: >
  **JavaScript:** _Do you know addition?_


  **Me:** _Of course! I learned mathematics when I was seven, addition is fairly easy!_


  **JS:** _Do you really know addition? Please solve this equation_


  ```true + [] = ?```


  **Me:** _Eh?_


  **JS:** _Welcome to JavaScript addition!_
links:
  - url: https://tc39.es/ecma262/#sec-addition-operator-plus
    title: https://tc39.es/ecma262/
  - url: https://javascript.info/type-conversions
    title: Type conversions
---

If you have been working with JavaScript you have probably seen a lot of usage with the “+” operator and discovered that the output is not necessarily what you expected.

Since the language supports the “+” operator between (almost) all kinds of types - the results might be confusing. In JavaScript, there is no compiler to hold your hand on your “addition journey”.

***The addition operator either performs string concatenation or numeric addition. (1)***

With the rule above you should be able to understand all additions in JavaScript, but for some of us, we need to see some examples and explanations to fully understand the different scenarios.

As a side note, remember JavaScript performs the addition from left to right - evaluating parentheses first - this is as you have learned from middle-grade mathematics.

As the rule states - with two numeric elements the output is a numeric value

```1 + 1 = 2```

String concatenation is common between different programming languages and is reasonable

```"Santa" + " " + "Claus" = "Santa Claus"```


So far, so good!



The most important “rules” with addition in JavaScript is:

* Adding a non-numeric value to a numeric value will try to convert the non-numeric value if possible. If not, both are converted to strings.
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

```"1" + "1" + "2" => "112"```

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

Since boolean values can be converted to numeric values in JavaScript the result of the conversion is:

***true*** => ***1***

***false*** => ***0***

Combining a boolean and a string value converts true to “true” and false to “false”.

## Objects, arrays and functions

When one of the values in an addition is an object, array or function there will be a string concatenation based on the output from its toString-function.

```javascript
const me = { name: "Charlie", age: 34 }
me + 1 = "[object Object]1"
```

The default toString-value for an object is “\[object Object]” - not very useful for addition. Unfortunately, I have seen this many times during my time as a developer - it usually happens when I forget to specify the property of the object that should be part of the addition.

Sometimes, it might be handy to override the toString-function and make it return something useful.

```javascript
const me = { name: "Charlie", age: 34 }
me.toString = function () { return this.age }
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

new BekkEmployee("Charlie", 34) + 1 = "Charlie is 34 years old1"
```

The same rule applies for arrays which output its toString as its content joined with a comma. An empty array is the same as an empty string.

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
Set(1) + 1 // TypeError: Cannot convert a Symbol value to a number
```

## Numeric conversion

These values will be converted to numeric values when added with a numeric value:

| non-numeric value | numeric value   |
| ---       | --- |
| true      | 1   |
| false     | 0   |
| undefined | NaN |
| null      | 0   |
| NaN       | NaN |


References:

1: [https://tc39.es/ecma262/](https://tc39.es/ecma262/#sec-addition-operator-plus)[\#sec-addition-operator-plus](https://tc39.es/ecma262/#sec-addition-operator-plus)

2: <https://javascript.info/type-conversions>