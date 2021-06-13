---
calendar: javascript
post_year: 2018
post_day: 8
title: The Nullish Coalescing Operator
image: 'https://images.unsplash.com/photo-1508138221679-760a23a2285b'
ingress: ''
links:
  - title: Babel plugin
    url: >-
      https://www.npmjs.com/package/@babel/plugin-proposal-nullish-coalescing-operator
  - title: The proposal at TC39
    url: 'https://github.com/tc39/proposal-nullish-coalescing'
authors:
  - Erik Wendel
---
Another surprisingly handy new feature proposal
```js
myFunction(somePossiblyNullVariable || 'my-default-value')
```

Does this look familiar?

Providing a default value for when input values are undefined is a very common scenario. Many developers tend to rely on the boolean `OR`-operator for this.

### The problem 
This doesn't work when one of the possible values in the left-hand side expression is a so-called falsy value:

```js
'' // an empty string
0 // the number zero
false
```

```js
setAllowedRespawns(config.respawns || '3')
```

If `parameters.respawns` is zero, the statement would resolve to the default value, '3'. 
In fact, you would need a more complex construction to make zero a possible value of `config.respawn`:

```js
setAllowedRespawns(config.respawns != null ? config.respawns : '3')
```

This doesn't read very well and is difficult to remember and type.

### The solution

A new JavaScript operator called the ["Nullish Coalescing Operator"](https://github.com/tc39/proposal-nullish-coalescing) proposes a new syntax for this:

```js
setAllowedRespawns(parameters.respawns ?? '3')
```

If the left-hand side of the expression evaluates to `undefined` or `null`, the right-hand side of the expression is returned.

The big advantage over `||` is therefore that so-called "falsy" values are passed through as legal values from the left-hand side.

### Woah! Can I use it?

This feature is currently in *stage 1*, but is of course available as a [babel plugin](https://www.npmjs.com/package/@babel/plugin-proposal-nullish-coalescing-operator).

Enjoy!
