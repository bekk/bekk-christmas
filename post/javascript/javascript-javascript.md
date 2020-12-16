---
calendar: javascript
post_year: 2020
post_day: 22
title: '"JavaScript" != "Javascript"'
image: https://images.unsplash.com/photo-1534368786749-b63e05c90863
ingress: >-
  When I studied computer science for five years there was a lot of mathematics.
  Equality was probably the simplest part. After ten years of working, I’ve done
  a lot of JavaScript. Equality is not the simplest part…

  Why? 


  ```javascript

  false == 0 // true

  ['1', '2', '3'] == '1,2,3' // true

  undefined == null // true

  "wtf" == "WTF" // false

  ```
description: javascript equality equal double equal abstract equality comparison
links:
  - url: https://exploringjs.com/impatient-js/downloads/impatient-js-preview-book.pdf
    title: JavaScript for impatient programmers
  - url: https://www.ecma-international.org/ecma-262/#sec-abstract-equality-comparison
    title: Abstract equality comparison
  - title: Object-to-primitive conversions
    url: http://www.adequatelygood.com/Object-to-Primitive-Conversions-in-JavaScript.html
authors:
  - Charlie Midtlyng
---
First of all, JavaScript has two operators for equality: `==` and `===`. In order to understand equality, we have to understand the difference between these two options. As we know equality from other programming languages and mathematics, `===` behaves the way we are used to.

So, if you’re able to keep `==` away from the JavaScript-codebase you’ll probably save yourself from unnecessary heart disease. Unfortunately, sooner or later we have to make changes in a codebase where `==` is commonly used - then it’s important to understand the consequences of making changes!


## x == y
There are a lot of rules to be aware of when using `==`. Let’s take a walkthrough of these rules and try to understand them by some examples. 

#### 1 If `x` and `y` is the same data type the behavior of `==` is the same as `===`
```javascript
1==1 => 1===1
"abc" == "ABC => "abc" === "ABC"
[1,2,3] == [1,2,3] => [1,2,3] === [1,2,3]
```
This is a rule that can make refactoring `==` to `===` a bit easier. If you expect both values to be the same data type - add another equal sign and breathe! 


#### 2 Truthy if `x` and `y` is `undefined` and `null` 

```javascript
null == undefined // true
undefined == null // true
null === undefined // false
```

`null` and `undefined` are special cases and we have to accept that they are equal when using double-quotes. But I’m not sure if I like it...

#### 3 If `x` and `y` are the data types number and string - try to convert the string into number and perform `==`

```javascript
'2' == 2 => Number('2') == 2 // true
'2.5' == 2.5 => Number('2.5') == 2.5 // true
'' == 0 => Number('') == 0 // true
'evil' == 666 => Number('evil') == 666 // false
BigInt(2) == "2" -> BigInt(2) == BigInt("2") // true
```

If one value is a string type and the other is numeric, JavaScript compares the numeric value of the string. Remember, converting an empty string results in 0. 

#### 4 If `x` or `y` is a boolean type - convert it to a number and perform `==`

```javascript
false == 0  => 0 == 0 // true
false == '0' => 0 == '0' => 0 == 0  // true
true == 1 => 1 == 1 // true
false == '' => 0 == '' => 0 == 0 // true
```

Boolean values converted to a number type results in 0 (`false`) or 1 (`true`). Be aware of the second line, after converting `false` to 0 the comparison is now a numeric and string data type. Fortunately, you have just learned how this works!

#### 5 If `x` and `y` is respectively an Object and either String, Number, Bigint or Symbol - convert the Object to primitive and perform `==`

```javascript
['1', '2', '3'] == '1,2,3' => ['1', '2', '3'].toString() === '1,2,3' // true
[1,2,3] == '1,2,3' => true
 
const me = {
  toString() {
    return "lazy";
  },
  valueOf() {
    return "1337"
  }
}
    
const you = {
  toString() {
    return "lazy";
  },
  valueOf() {
    return { 
      key: "1337" 
    }
  }
}
    
me == "lazy" // false
me == "1337" // true
me == [1,3,3,7] // false
you == "lazy" // true
you == {key: "1337"} // false
me == BigInt(1337) // true
me == 1337 // true    
```

Converting the data type object into primitive is usually done by returning the value of  `valueOf()`-function. If this is not implemented or does not return a primitive value, then it returns the value of `toString()`-function. 

#### 6 If `x` and `y` is BigInt and Number then return `true` if the mathematical value is the same
```javascript
123 == BigInt(123) // true
999 == BigInt(123) // false
```

#### 7 If none of the above applies, return `false`!
```javascript
[1,2,3] == {valueOf() { return "1,2,3" }} // false
0 == null // false
0 == NaN // false
0 == undefined // false
null == false // false
NaN == false // false
undefined == false // false
```

As mentioned above, avoid using `==` in your JavaScript code. Unless all of the rules above fits in your, and your teammates, head - please use `===`! 