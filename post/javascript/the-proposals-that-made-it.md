---
calendar: javascript
post_year: 2018
post_day: 5
title: The proposals that made it
image: >-
  https://images.unsplash.com/photo-1505235687559-28b5f54645b7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2090&q=80
ingress: A few of the newest things in JavaScript
links:
  - title: Finished TC39 proposals (stage 4)
    url: 'https://github.com/tc39/proposals/blob/master/finished-proposals.md'
authors:
  - Paal Kristian Minne
---
In the first post of this calendar we learned about TC39 and how JavaScript is evolving. It has not always been like this. When the TC39 committee was working on the last huge update (ES6/ ECMAScript2015) to the javascript specification they decided that the process for updating it should be improved. This resulted in the current TC39 process. After the new process was adopted, updates to the language became smaller, incremental and released annually. 

This Monday (the 3rd) we had a look at the elvis operator which is currently working its way through the TC39 process. Today we’ll have a look at some proposals that already made it to the fourth stage and has become a part of the language.

## The 2016 update
2016 was the year everything happened. Brexit, the election of Trump, the death of David Bowie, the signing of the Paris Agreement, and the first annual update of the ECMA specification. In an effort to avoid overloading the world with change in one year, this update was kept small and only two new features were added to language.  

### Array.prototype.includes
This is a handy little function that lets you determine if an array includes an element.
```js
const christmasThings = ['santa', 'snow', 'christmas'];
christmasThings.includes('christmas') // => true
christmasThings.includes('grinch') // => false
```

This is cleaner than using the indexOf function, which is how it was done in the good old days.
```js
christmasThings.indexOf('christmas') > -1 // => true
```

### Exponent operator
Yep, javascript didn't have an exponent operator until the 2016 version of the spec. Now it has!
```js
2**4 // => 16
```

## The 2017 update
The 2017 update is bigger than the first one. It includes the functions covered below as well as some larger additions, like the async and await keywords.  These are important enough to get its own day in someones javascript christmas calendar.

### Object.values and Object.entries
These two functions were added in 2017 to complement the existing `Object.keys` function. `Object.keys` returns an array containing all keys of an object’s properties. `Object.values` returns all values of an object’s properties.
```js
const santa = {
  name: "Santa Claus",
  age: 77,
  hasRaindeers: true,
};

Object.keys(santa) // ["name", "age", "hasRaindeers"]
Object.values(santa) // ["Santa Claus", 77, true]
```

`Object.entries` returns an array with all entries of an object. An entry consist of the key and value of a property put together in an array. 

```js
Object.entries(santa) /* =>
 [ [ 'name', 'Santa Claus' ],
  [ 'age', 77 ],
  [ 'hasRaindeers', true ] ] */
```

One useful application of this function is that it makes it easy to create maps from objects.
```js
const map = new Map(Object.entries(santa));
```

### String padding
You might remember [left-pad gate](https://www.theregister.co.uk/2016/03/23/npm_left_pad_chaos/). This was that time in March 2016 when a few packages were unpublished from npm and all of a sudden nobody was able to build their code. The package which caused all the troubles is called left-pad and was soon republished to npm to fix the mess its removal created. 

Just months before left-pad gate, the TC39 committee was discussing when to advance a proposal containing two additions to the String prototype, doing the exact same thing as the left-pad package is doing. String.prototype.padStart lets you pad strings to the beginning of a string (the left-pad equivalent) and String.prototype.padEnd, which let you pad the string at the end of a string. This proposal was later moved to stage four and was included in the 2017 update.

```js
const christmas = 'xmas';
christmas.padStart(6, '!') // => '!!xmas'
christmas.padEnd(6, '!') // => 'xmas!!'
```

## The 2018 Update
The number of proposals which made it into stage 4 in 2018, was even larger than in 2017. We saw some updates to regular expressions, an addition to the Promise prototype and asyncronous iteration.

### Rest / spread object properties
In the 2018 update the rest and spread operator `...` for object properties were also added to the language. The spread property for objects is useful for making shallow copies of objects. In the example below we create a fakeSanta object with the same properties as santa. Then we override the `hasRaindeers` property and add one extra property.

```js
const santa = {
  name: "Santa Claus",
  age: 77,
  hasRaindeers: true
};

const fakeSanta = {
  ...santa,
  hasRaindeers: false,
  realName: "Olav"
};
```
A thing to watch out for is if `...santa` is at the after `hasRaindeers: false`, then `fakeSanta.hasRaindeers` will end up being `true` as it is the last thing that is assigned to a property that counts.
```js
const fakeSanta = {
  hasRaindeers: false,
  ...santa
  realName: "Olav"
};
```

The rest property is useful when using the destructuring pattern if there's an unknown number of properties in the object being destructured. With the object rest property we can do the following:

```js
let {name, age, ...otherProps} = fakeSanta; 
console.log(otherProps);
// => { hasRaindeers: false, realName: 'Olav' }
```

## Wrapping it up 🎁
We've now seen a few of the additions that have made it into language since the new process got adopted. Make sure to check out the full list of additions [here](https://github.com/tc39/proposals/blob/master/finished-proposals.md).
