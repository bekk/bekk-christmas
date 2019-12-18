---
calendar: javascript
post_year: 2019
post_day: 20
title: A symbolic gift
ingress: >-
  Years ago, the JavaScript language was gifted with the `Symbol` primitive.
  Unlike many other language features in ES6, it was not simply a shorter syntax
  for doing something otherwise previously possible. It is not obvious what the
  point of these symbols are, and they are not commonly used. If you try to read
  up on them, you will find that many articles focus on details that are not
  important to the purpose of symbols. This article will explain what they are,
  what the point is, and give some real life use cases.
links:
  - title: Short documentation of Symbol
    url: 'https://developer.mozilla.org/en-US/docs/Glossary/symbol'
  - title: More about Symbol use cases
    url: >-
      https://www.freecodecamp.org/news/how-did-i-miss-javascript-symbols-c1f1c0e1874a/
  - title: More about customizing with well-known symbols
    url: 'https://2ality.com/2015/09/well-known-symbols-es6.html'
authors:
  - Holger Ludvigsen
---
## What is it?

Symbols are a type of value in JavaScript, like numbers and strings. It is a core primitive, not a high level class deriving from `Object`. Let's create some symbols to see how they work:

    // Symbols are created with the Symbol function:
    const a = Symbol();
    const b = Symbol();
    
    // Each symbol value is different, even though they look the same:
    a == b; // false
    
    // You can pass a string with a description, but this is only meant for debugging purposes:
    const colorRed = Symbol("The color red");

## Yes, but what is the point?

Given the previous description, symbols seem like weird strings that you cannot see. But their main purpose is that _they can be used as property keys on objects_. 

Property keys in JavaScript have before this been confined to strings:

    const ola = {"name": "Ola", "age": 30};

But now, these keys can be symbols:
    
    const name = Symbol();
    const age = Symbol();
    const kari = {[name]: "Kari", [age]: 32};

And these symbol keys are treated separately from the old fashioned string keys:

    Object.keys(kari).includes(name); // false
    
    for (let key in kari) {
        // will never be name or age
    }
    
    Object.getOwnPropertySymbols(kari).includes(name); // true

## I still don't see the point!

Yes, of course you don't. Why write 3 lines of code when 1 would suffice? Their purpose come to light when you consider that all symbols are unique and will never have a name clash. 

    // Let's say you want to extend a third party object with your own property "graphics":
    const element = document.getElementById("title");
    
    // The messy way:
    element.graphics = makeGraphics();
    // What happens if a future DOM standard adds a property with the same name?
    // What happens if third party code iterates all properties of the element?
    
    // The Symbol way:
    const graphics = Symbol();
    element[graphics] = makeGraphics();

## I am so random

Symbols are the elegant solution when you otherwise would make up some random value to separate things. A typical example is handling the arrow keys on the keyboard:

    // The non-symbolic way:
    const arrowkeys = {up: 1, down: 2, left: 3, right: 4};
    
    function handleKey(key) {
        if (key === arrowkeys.up) {
            // do something
        }
    }

Now consider what happens if we pass the wrong value to this function:

    const someOtherValue = "X".length();
    
    handleKey(someOtherValue); // interpreted as up!

The messy solution to this might be to make up some very random values for `arrowkeys`. But the elegant solution is to use symbols instead:

    const arrowkeys = {up: Symbol("Arrow up"), down: Symbol("Arrow down"), left: Symbol("Arrow left"), right: Symbol("Arrow right")};
    
    if (key === arrowKeys.up) {
        // Can ONLY be true for arrowKey.up
    }
    
    // Debugging is also clearer:
    console.log(key); // Symbol(Arrow up)

## What if JavaScript itself wants to extend _you?_

The non-invasiveness of symbol keys is used by the JavaScript runtime itself to make it possible for us to override standard features like conversion to primitive values:

    // If you have an object you like:
    const myPlace = {"name": "Oslo", "population": 680000};
    
    // You can override one of the predefined symbols like Symbol.toPrimitive:
    myPlace[Symbol.toPrimitive] = function() {
        return this.name.substring(0, 2);
    }
    
    myPlace + "love" === "Oslove"; // so true

Imagine if, instead of symbols, there were reserved function names on `Object` to override for these kind of extensions. That would make name collisions much more frequent.

Even `for ... of` loops can have their behaviour defined:

    // Let us redefine Symbol.iterator!
    myPlace[Symbol.iterator] = function() {
        let step = 0, name = this.name;
        return {
            next() {
                return {
                    value: name[step] ? name[step].toUpperCase() + " to the " : name + "!", 
                    done: step++ > name.length
                };
            }
        };
    }
    
    // And now we got a custom for-of-loop:
    for (const x of myPlace) {
        console.log(x);
    }
    
    /* Output:
     O to the 
     S to the 
     L to the 
     O to the 
     Oslo!
    */

## Conclusion

Although a small feature in JavaScript, symbols bring something to the table that no other mechanism can. Use them to avoid polluting the namespace, and when you need unique values without being creative. Use it wisely, and happy coding!
