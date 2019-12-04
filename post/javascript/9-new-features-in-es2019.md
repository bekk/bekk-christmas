---
calendar: javascript
post_year: 2019
post_day: 7
title: 9 new features in ES2019
image: >-
  https://images.unsplash.com/photo-1519241678948-28f18681ce14?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2134&q=80
ingress: >-
  This year the 10th version of the ECMAScript Language specification was
  released, often referred to simply as ES2019. Let’s take a closer look at what
  new features we got and how we can put them to use.
---
## String.trimStart() and String.trimEnd()

​
_String.trim()_ is probably known to most, and has been a part of the ECMAScript standard since ES5. The _String.trim()_ method removes whitespace from both the beginning and the end of a string.
​
With the new methods _trimStart()_ and _trimEnd()_ we can now choose which end of the string we want to trim.



```js
const string = ' ES2019! Yay! ';
string.trimStart();
// "ES2019! Yay! "
string.trimEnd();
// " ES2019! Yay!"
```



## Object.fromEntries()


_Object.fromEntries()_ simply converts a list of key-value pairs into a object.
​

```js
const entries = [ [‘foo’, ‘bar’] ];
const object = Object.fromEntries(entries);
// { foo: ‘bar’ }
```

​

## Array.flat() og Array.flatMap()

​
_Array.flat()_ lets us flatten nested lists down to a depth specified by the integer parameter in the function call. The parameter can also be omitted and the function will use a default value of 1. Equal to calling _flat(1)_.
​

```js
[1, 2, [3, 4]].flat();
// [ 1, 2, 3, 4 ]
[1, 2, [3, 4, [5, 6]]].flat(2);
// [ 1, 2, 3, 4, 5, 6 ]
```

​
_Array.flatMap()_ is also a new feature on the _Array_ prototype. In practice, flatMap is a combination of _Array.map()_ and _Array.flat()_. It first runs a mapping function over the list and then tries to flatten the result.
​
Unlike _Array.flat()_, where it is possible to specify a parameter for how deep in the nesting the lists should be flattened, _Array.flatMap()_ uses _Array.flat()_ under the hood and will therefore only flatten one level deep.
​

## Symbol.description

​
_Symbols_ is not something you see so often. _Symbols_ is a primitive data type introduced in ES6 and may be used as an identifier for object properties.
​
The _description_ property is read-only and can be used to get the description of _Symbol_ objects.
​

```js
const symbol = Symbol('description');
symbol;
//Symbol(description)
Symbol.description;
// description
```

​

## JSON ⊂ ECMAScript (JSON Superset)

​
Previously, ECMAScript strings could not contain the _line separator_(U+2028 ) or the _paragraph separator_(U+2029). These were handled as line terminators and therefore resulted in syntax errors.
​

```js
eval('"\u2028"');
// SyntaxError
```

​
While JSON strings can contain both U+2028 and U+2029 without producing errors.
​

```js
JSON.parse('"\u2028"');
// ''
```

​
In ES2019 it has been decided to remove this restriction. Something that will simplify the specification as you no longer need separate rules for strings and JSON-strings.
​

## Optional catch binding

​
The catch binding was mandatory in the `try ... catch` block regardless of whether it was used or not.
​

```js
const isValidJSON = json => {
  try {
    JSON.parse(json);
    return true;
  } catch (unusedError) {
    // Unused error parameter
    return false;
  }
};
```

​
As we see above, there are cases where the error parameter is redundant. With the new changes to the specification, we can omit the catch binding and its surrounding parentheses.
​

```js
const isValidJSON = json => {
  try {
    JSON.parse(json);
    return true;
  } catch {
    return false;
  }
};
```

​

## Well-formed JSON.stringify

​
If you like using emojis in your code you might have seen the following:
​

```js
'😎'.length;
// 2
```

​
The reason JavaScript interprets the emoji as two characters is because UTF-16 represents emojis (and other, unusual characters) as a combination of two surrogates. Our emoji is encoded with the characters '\uD83D' and '\uDE0E'. However, if you try to write such a character alone, such as '\uD83D', this is considered to be an invalid text string.
​
The news in ES2019 is how _JSON.stringify()_ handles such lonely surrogates. In earlier versions, these would be replaced with a special character:
​

```js
JSON.stringify('\uD83D');
// '"�"'
```

​
Now the function would rather insert an escape character before the character code so that the result is still readable and valid UTF-8/UTF-16 code:
​

```js
JSON.stringify('\uD83D');
// '"\\ud83d"'
```

​
Note that _JSON.parse(stringified)_ works just as before!
​

## Stable Array#sort

​
With ES2019 we are guaranteed stable list sorting. Previously, the specification allowed unstable sorting algorithms such as QuickSort. Now all major browsers use stable sorting algorithms. In practice, this means that if we have an array of objects and sort them on a given key, the elements in the list will retain their position relative to the other objects with the same key.
​
Check if your browser [uses a stable sorting algorithm!](https://mathiasbynens.be/demo/sort-stability)
​

## Revised Function#toString

​
As of ES2019 _Function.toString()_ will return actual text snippets from the source code from the function start to end. This means that comments, spaces, and syntax details will also be returned.
​
Let's say we have a function `foo`:
​

```js
function /* a comment */ foo() {}
```

​
Previously, _Function.toString()_ returned a text variant of the function without comments and spaces:
​

```js
foo.toString();
// 'function foo() {}'
```

​
But now the function is returned exactly as it is written!
​

```js
foo.toString();
// 'function /* a comment  */ foo () {}'
```

​
Phew!
