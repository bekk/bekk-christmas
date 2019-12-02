---
calendar: javascript
post_year: 2019
post_day: 3
title: Removing duplicates from an array
image: >-
  https://images.unsplash.com/photo-1448932284983-0c7b152eba33?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1240&q=80
ingress: >-
  Knowing more than one way to solve a given problem can help you write more
  readable code. Let's look at three different ways to remove duplicates
  elements from an array.
authors:
  - Svein Petter Gjøby
---
Never underestimate the importance of code quality. As a developer it is key to clearly communicate the implementation of any solution you are working on through readable code. Knowing more than one way to solve a given problem can help you write more readable code. Let's look at three different ways to remove duplicates elements from an array.

```js
const array = [1, 1, 1, 3, 3, 2, 2];

// Method 1: Using a Set
const unique = [...new Set(array)];

// Method 2: Array.prototype.reduce
const unique = array.reduce((result, element) => {
  return result.includes(element) ? result : [...result, element];
}, []);

// Method 3: Array.prototype.filter
const unique = array.filter((element, index) => {
  return array.indexOf(element) === index;
});
```

## Set

A [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) is an object that lets you store unique values. Repeated calls of `Set.add(value)` with the same value don’t do anything.

```js
const uniqueNames = new Set();

uniqueNames.add("Dasher"); // {"Dasher"}
uniqueNames.add("Dasher"); // {"Dasher"}
```

By exploiting the fact that a Set cannot contain duplicate values, then use a [spread operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) to transform the Set back to an array we are able to remove duplicate elements from the array. 

```js
const array = [1, 1, 1, 3, 3, 2, 2];

const uniqueSet = new Set(array); // {1, 3, 2}

const uniqueArray = [...uniqueSet]; // [1, 3, 2]
```

## Reduce

The [reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce) method executes a reducer function (provided by you) on each element of the array, resulting in a single output value. The value returned from a reducer function is assigned to the accumulator, which is passed as the first argument of the subsequent execution of the reducer function and ultimately becomes the final resulting value.


To remove duplicate elements from an array, we can provide a function that checks if the accumulated array [includes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes) the current element. If not we add the current element to the array. 

```js
const array = [1, 1, 1, 3, 3, 2, 2];

const reducerFunction = (result, element) => {
  return result.includes(element) ? result : [...result, element];
}

const unique = array.reduce(reducerFunction);
```

## Filter

The key to understand this method is to understand how [indexOf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf) and [filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) works.

- `indexOf`returns the first index of a given element in an array. 
- `filter` creates a new array with all the elements that passes a test. You can provide the test as the first argument of `filter`.

If we combine these two methods, by providing a test that checks if each element is the first occurrence of the given element in the array, we can remove duplicate elements from arrays. 

```js 
const isFirst = (element, index) => {
  // Checks if a given element is the first occurrence of it.
  return array.indexOf(element) === index;
}

const unique = array.filter(isFirst);
```

## Which method should I choose?

We saw three different methods to remove duplicate elements from an array. It's easy to imagine a fourth method that would improve the readability. Namely, by [creating a proposal](https://javascript.christmas/2018/1) to add `Array.prototype.unique` to EcmaScript.

In terms of readability, I prefer the first method. By using a `Set` your code is both short and easy to understand. 



