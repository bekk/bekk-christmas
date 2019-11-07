---
calendar: javascript
post_year: 2018
post_day: 3
title: Elvis Operator
image: 'https://images.unsplash.com/photo-1534764945014-02d68e5680d8?q=80&w=1680'
ingress: How to rock and roll with Optional Chaining
links:
  - title: TC39 proposal
    body: TC39 GitHub repository for the Optional Chaining proposal
    url: 'https://github.com/tc39/proposal-optional-chaining'
  - title: Babel plugin
    body: Optional Chaining Babel plugin at NPM
    url: 'https://www.npmjs.com/package/@babel/plugin-proposal-optional-chaining'
authors:
  - Henrik Hermansen
---
# Elvis ~~Presley~~ Operator

Are you being a responsible developer and _rocking_ your undefined-checks to prevent [TypeError](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError) like this?
```js
const street = customer && customer.address && customer.address.street
```
That's nice, but you may have noticed it doesn't _roll_ very well. While it's great to protect yourself from type errors, it can get tedious and cumbersome, and it doesn't feel very [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself).

I hope this won't leave you all shook up. Instead, you should read on - it's now or never!

## Rock _and_ roll 🕺
As you learned on [Day 1](https://javascript.christmas/2018/1) JavaScript is always open for suggested features and additions. One of these suggestions is called "[Optional Chaining](https://github.com/tc39/proposal-optional-chaining)", and is about the operator best known as the [Elvis operator](https://en.wikipedia.org/wiki/Elvis_operator).

The suggested operator looks like this `?.`, and you can use it to _chain_ undefined-checks:
```js
const street = customer?.address?.street
```
This will check if both `customer` and `address` is present, and give you the value of `street`.
However, if `customer` does not have the property `address`, or if `customer.address` does not have the property `street`, your variable will receive the value `undefined`, and no type errors are thrown.

You can even use this to safely (kinda) run functions or access items in an array:
```js
customers?.[2]
api?.getCustomer?.()
```
This will make sure both `api` and `api.getCustomer` is present, before trying to run `getCustomer`. Beware though, that this will still throw a type error if `getCustomer` is [not a function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Not_a_function).

### Could I go wrong with this?
Yes, there are some limitations and gotchas to this feature.

The biggest pitfall might be that each operator will only check the current link in the chain:
```js
customer?.address.street // will throw an error if address is undefined
customer.address?.street // will throw an error if customer is undefined
```
For more details I suggest you have a closer look at ~~[The Proposal](https://www.imdb.com/title/tt1041829/)~~ [the proposal](https://github.com/tc39/proposal-optional-chaining).

### Awesome! When can I use it?
Now! While the feature is currently in _stage 1_, it is of course available as a [babel plugin](https://www.npmjs.com/package/@babel/plugin-proposal-optional-chaining)

I don't know about you, but I just can't help falling in love.
