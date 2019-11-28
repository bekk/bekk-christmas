---
calendar: javascript
post_year: 2019
post_day: 2
title: How ... works in Javascript
ingress: >-
  The `...` operator that arrived to javascript with ES6 is really handy, and
  can be used in quite a lot of situations. Technically it is two different
  things; a `Rest parameter` and a `spread operator`. Let's take a look at how
  they work.
description: ''
links:
  - title: Rest parameters
    url: >-
      https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters
  - title: Spread syntax
    url: >-
      https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
authors:
  - Dag Stuan
---
## Rest parameter

Lets say you have an array such as this one:

```js
const myArray = ["Lisa", "Homer", "Bart"];
```

If you only want the first element of the array, while keeping the rest of the elements in a separate list, you can split the array like this

```js
const [firstName, ...restOfTheNames] = myArray;

console.log(firstName); // Lisa
console.log(restOfTheNames); // ["Homer", "Bart"]
```

As you can see, using `...restOfTheNames` puts the remaining elements of the list into a new list. This is called _destructuring_ and is handy in a number of ways. It can also be used for objects, like this:

```js
const person = {
  firstName: "Lisa",
  lastName: "Simpson",
  homeTown: "Springfield"
}

const { firstName, ...restPerson } = person;

console.log(firstName) // "Lisa"
console.log(restPerson) // { lastName: "Simpson", homeTown: "Springfield" }
```

As shown above, destructuring lets us extract the `firstName` property, while keeping the rest in a separate object.

Finally, the rest parameter is really useful when working with function arguments:

```js
function func(firstArgument, ...rest) {
  // implementation
  console.log(firstArgument);
  console.log(rest);
}

func("Lisa", "Simpson", "Springfield");
```

In the example above, `firstArgument` will contain `"Lisa"` while the `rest` argument will be a list containing the rest of the arguments. In this case `["Simpson", "Springfield"]`

## Spread operator

If the rest parameter was yin, the spread operator would be its yang. It looks exactly the same as the rest parameter, but works a little bit differently.

The spread operator lets us expand elements such as objects and arrays. Lets see how it works.

```js
const withoutMarge = ["Lisa", "Homer", "Bart"]

const wholeFamily = ["Marge", ...withoutMarge];
```

The operation above "spreads" the `withoutMarge`-array into the `wholeFamily` array. And the resulting array will contain all the names `["Marge", "Lisa", "Homer", "Bart"]`. Spreading can also be used to extend objects, like this:

```js
const person = {
  firstName: "Lisa",
  lastName: "Simpson",
  homeTown: "Springfield"
}

const extended = {
  ...person,
  brother: "Bart"
}

console.log(extended);
// {
//   firstName: "Lisa",
//   lastName: "Simpson",
//   homeTown: "Springfield"
//   brother: "Bart"
// }
```

This way of using the spread operator is also handy for overwriting properties in existing objects.

```js
const person = {
  firstName: "Lisa",
  lastName: "Simpson",
  homeTown: "Springfield"
}

const overwritten = {
  ...person,
  homeTown: "New York"
}

console.log(overwritten);
/*
{
  firstName: "Lisa",
  lastName: "Simpson",
  homeTown: "New York"
}
*/
```

Technically, using the spread operator to extend and overwrite parts of objects actually creates new objects, which means it can be used instead of the old and cumbersome `Object.assign()` API. If you want to copy an object, you can just do this:

```js
const obj = {
  // ..properties
};

const copyObj = { ...obj };
```

In summary, the `...` operator can be used either as a `rest parameter`, or a `spread operator`. The `rest parameter` lets us gather array elements, object values, or function arguments into a single variable, while the `spread operator` lets us expand them to multiple variables.

Hopefully this article showed you some useful examples, happy coding!
