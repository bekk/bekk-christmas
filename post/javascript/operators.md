---
calendar: javascript
post_year: 2020
post_day: 12
title: Smooth Operators
image: https://images.unsplash.com/photo-1573486433811-a9eb5b1688a1?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1836&q=80
ingress: Provided I didn't miscount (I am not the [Count von
  Count](https://www.youtube.com/watch?v=2AoxCkySv34&ab_channel=SesameStreet),
  so it's quite possible), there are 46 operators in JavaScript which are
  available in all modern webbrowsers. Many of them are inevitable (e.g.
  arithmetical and logical operators), while others are more uncommon. But the
  list does not end there and the family of operators is still growing. Let's
  have a brief look at the latest additions, and new operators which are just
  around the corner!
links:
  - url: https://v8.dev/features/optional-chaining
    title: Optional chaning
  - title: Nullish coalescing
    url: https://v8.dev/features/nullish-coalescing
  - url: https://v8.dev/features/logical-assignment
    title: Logical assignment
  - url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Pipeline_operator
    title: Pipeline operator
  - url: https://joshwcomeau.com/operator-lookup/
    title: Operator Lookup
authors:
  - Markus Rauhut
---
### Optional Chaining Operator

Having been around for quite some time as a Babel plugin, the optional chaining operator was finally included in this year's ECMAScript specification, ES2020. Consider the following example:

```javascript
const child = {
  name: 'Jane Appleseed',
  naughty: false,
};

const childAddress = child.address.street;
console.log(childAddress);
```

What happens when we run this code? Since the `address` property isn't defined in the `child` object, we get an error saying that we can't read the property `street` from `undefined`.

We often prefer that `childAddress` is `undefined` rather than causing an error. One possible approach to this problem is to check whether `child.address` is *nullish* (`null` or `undefined`). We can use a simple ternary operator to achieve this:

```javascript
const childAddress = child.address ? child.address.street : undefined;
```

Alternatively, we could use the more elegant *logical AND operator*:

```javascript
const childAddress = child.address && child.address.street;
```

The downside of this is that those checks can get quite long if we chain many properties. That's where the optional chaining operator (?.) comes into play:

The downside of this is that these conditional expressions can become quite long and repetitive if we chain many properties together. This is where the *optional chaining operator* (`?..`) comes into play:

```javascript
const childAddress = child.address?.street;
```

Instead of causing an error when a property is `null` or `undefined`, the expression returns `undefined`. Yay, code that is both shorter and easier to read - we like that!

### Nullish Coalescing Operator 

Just like optional chaining, the *nullish coalescing operator* was one of the features introduced with ES2020. Again, let's look at an example:

```javascript
const child = {
  name: 'Jane Appleseed',
  naughty: undefined,
};
```

This time, the `naughty` property is `undefined`. How can we make it default to `false` in this case? Obviously, we can't just assume that the child was naughty this year! Well, we can use the *logical OR operator* (`||`):

```javascript 
const isNaughty = child.naughty || 'false';
```

This works in the above case, but we must take a certain characteristic into account: the logical OR operator returns the right operand if the left operand is *falsy* (this includes `undefined` and `null`, but also `0` and `''`). Let's add another property to the `child` object, `age`. Since also newborns should get their presents, we have to allow the falsy value '0'. This is where the nullish coalescing operator (??) comes to the rescue:

```javascript
const age = child.age ?? -1;
```

This operator only returns the right operand if the left operand is nullish, and returns the left operand otherwise. Therefore, children with an age of zero don't default to `-1` in the above example.


## What's Yet to Come

Those of you who have been following this Christmas calendar since December 1st have already read about the *logical assignment operator* a couple of days ago. You haven't? Then have a look at the [article about this and otnerh new features in ES2021](LINK TO ARTICLE)!

This is however not the final operator that will be added. We were writing about the [*pipeline operator*](https://javascript.christmas/2018/12) exactly two years ago while it was still a stage 1 proposal. And guess what, it still is. Things take time in the JavaScript world, but one day it will make your life as a JavaScript developer a little bit easier!

But this is not the last operator to be added. Exactly two years ago we wrote about the "pipeline operator" when it was a stage 1 proposal. Well, it still is. 

If you want to learn more about all the other 44 operators in JavaScript, you should have a look at this amazing [Operator Lookup](https://joshwcomeau.com/operator-lookup/). 