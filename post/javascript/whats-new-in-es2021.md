---
calendar: javascript
post_year: 2020
post_day: 7
title: Whats new in ES2021?
ingress: The new version of ECMAScript, ES2021 is expected to be released in
  June 2021. What new features can we expect from the new release? This article
  covers some of the features in the upcoming release, and how we can put them
  to use.
links:
  - url: https://github.com/tc39/proposals
    title: JavaScript Proposals
---
## String replaceAll()
This feature is perhaps the feature I am most excited about. With the old approach, in order to replace all occurrences of a substring, the method replace() combined with a global egular expression has been the way to go.
However, with the new method replaceAll(), we can easily return a new string that replaces all instances of a pattern without the use of complicated regex.

```javascript
const myString =
  "I love Cats. Cats are supercute, especially when they are doing Catstuff";

let newString = myString.replaceAll("Cat", "Dog");

console.log(newString);

//I love Dogs. Dogs are supercute, especially when they are doing Dogstuff
```

This method also comes with a performance improvement as it uses string comparisons instead of regular expressions matching.

## Logical Assignment Operator
The Logical Assignment Operator combines Logical Operators(&&, ||, or ??) with Assignment Expressions (=). The code example below shows this feature in use.

```javascript
//Old approach, only assigns if a is Truthy
if(a){ a = b } 
//Or
a && (a = b)

//Logical assignment operator
a &&=b
```

This approach can be used on OR (||) and the Nullish Coalescing Operator (??) as well.

##Numeric Separators
Large numbers may be challenging to read with a first glance, especially when there are repeating digits. The Numeric Separator is a useful tool that separates digits with an underscore (_) in numeric literals, thus making numeric literals more readable. The separator can be used in different positions., with as many separators as you want, in groups of any size.

 ```javascript
const oneMillion = 1000000;
const oneMillion = 1_000_000;
const oneMillionAndALittleMore = 1_000_000.123_456;
 ```

As we can see, the code becomes a lot more readable. Numeric separators also work for octal integer literals

## Promise.any()
In short, this method is the opposite of Promise.all(). Promise.any() takes an iterable of promise objects, and resolves if any of the supplied objects resolves. It returns a single promise, the first one to resolve, with the value from that promise.

Consider the example below, we create three promises which we feed into Promise.any().

 ```javascript
const promise1 = new Promise((resolve) => setTimeout(resolve, 100, 'first'));
const promise2 = new Promise((resolve) => setTimeout(resolve, 300, 'second'));
const promise3 = new Promise((resolve) => setTimeout(resolve, 500, 'third'));

const promises = [promise1, promise2, promise3];

Promise.any(promises).then((value) => console.log(value));

// Expected output: "first"
 ```

If none of the promises resolve, then a new type of exception, the AggregateError exception is thrown. AggregateError groups together individual errors into a single error in the form of an array of objects.


## WeakRef
In JavaScript. references to objects are strongly held. This means that as long as a reference to the object exists, the object won´t be garbage-collected but keeps the object in memory. In scnarios where we do not want to keep objects in memory indefinitely, the WeakRef (Weak Reference) can be used to implement caches or mappings to large objects. When not in use, the memory can be garbage collected and generate a fresh cache when needed again.

 ```javascript
var a, b;
a = b = document.querySelector('.someClass')
a = undefined
// ... GarbageCollecting...
// b is still references to the DOM-object .someClass
 ```

A WeakRef is created using new WeakRef, and the reference is read with .deref().

 ```javascript
const x = new WeakRef(document.querySelector('.someClass'));
const element = x.deref();
 ```

JavaScript is continuously integrating new features, and today we have looked into some of the features coming in JavaScript ES2021. For more information on proposals, and what´s coming next, take closer look [here](https://github.com/tc39/proposals)


