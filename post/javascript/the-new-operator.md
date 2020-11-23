---
calendar: javascript
post_year: 2020
post_day: 21
title: The new Operator
image: https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd
ingress: You probably came here to read about something cutting edge in
  JavaScript, but today we’re going to do a deep dive into one of the
  fundamental operators of JavaScript, `new`.
links:
  - title: Function - MDN
    url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function
  - title: Prototype Chain - MDN
    url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain
  - url: https://eloquentjavascript.net/06_object.html
    title: Objects - Eloquent JavaScript
  - title: YDKJS
    url: https://github.com/getify/You-Dont-Know-JS
  - title: new - MDN
    url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new
authors:
  - Eirik Vigeland
---
Way back when, in my first encounters with JavaScript I really did not see the point in the `new`-operator. Coming from object-oriented languages such as Java, it might be strange to be able to use objects before they are somehow instantiated (with `new`). Objects made more sense for my part when classes were introduced in ES5. Classes are really just syntactic sugar for creating objects in JavaScript, but unlike objects, classes will throw a `TypeError` if you attempt to use them without calling `new`.

## Objects
Objects in JavaScript are just key/value pairs, which make up the properties of the objects. Values can be primitive, array, functions or any other object. Functions are called methods when they are used in objects. The easiest, and most common way to create an object in JavaScript is by using the literal notation known as "object initializer".

```js
const person = {
  firstName: ‘John’,
  lastName: ‘Doe’,
  age: 23,
};

console.log(person.firstName); // John
```

Under the hood, the equivalent of using the literal notation is creating a new object and setting properties on that object. So even though you’ve never really explicitly created objects with `new`, it’s been done for you.

```js
const person = new Object();
person.firstName = ‘Jane’;
person.lastName = ‘Doe’;
person.age = 26;

console.log(person.firstName); // Jane
```

## Functions
So what about functions? What happens when you don’t use the `new` operator on functions? Functions in JavaScript are also objects, they are instances of the `Function` object.

```js
function myFunction () {};
console.log(myFunction.constructor === Function); // true
```

Unlike the constructor of `Object` (`new Object`), calling the constructor of `Function` (`new Function`), is not the same as using function declarations (`function () {}`). You can read more to get a deeper understanding of the differences at [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function).

A function is defined in MDN as “a set of statements that performs a task or calculates a value”, a procedure. Furthermore to qualify as a function, the procedure should return an output which has some relationship to the input of the function.

Unless a function has an explicit return, a default value is returned from the function. And here is where the `new` operator comes into play. The default return value of a function is undefined if the function is not a constructor function. A function is a constructor if it is called with the `new` operator. For a constructor function the default value is this. So for functions that are not called with the `new` operator. The statements of the function are executed and the explicit return value or undefined is returned. By using the `new` operator the function will return a newly created object which is bound to this.

```js
function Person(firstName, lastName, age) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.age = age;
}

const john = new Person(‘John’, ‘Doe’, 23);
console.log(john.firstName); // John

const jane = new Person(‘Jane’, ‘Doe’, 26);
console.log(jane.firstName); // Jane
```

## Prototypes
The last thing we need to discuss are prototypes. JavaScript inheritance works by prototype chaining. I’m not going to reiterate all the properties of how proptypes and prototype chaining works. You can read more about it over at [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain).

In broad strokes an objects in JavaScript (almost) always inherits from the `Object.prototype`. 
Objects created with "object initializer" or `new Object` is no exception. Neither are objects created using constructor functions. But unlike "object initializer" and `new Object`, the constructor functions links the prototype of the returned object to the constructor as it’s parent prototype. The created object still inherits from the `Object.prototype`, but not as it’s parent prototype.

```
function Person(firstName, lastName, age) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.age = age;
}
```

Back to our example of the `Person` constructor function, objects created with this function will first inherit from `Person.prototype`, then `Object.prototype` (and lastly `null`). When invoking a property on the object, JavaScript will walk this path to find the property. If it was not defined on the `Person` object, it would look at `Object`, and so on. This makes it easier for us to extend `Person` objects with new methods, which will apply to all instances of `Person`.

```js
function Person(firstName, lastName, age) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.age = age;
}

Person.prototype.fullName = function () {
  return `${this.firstName} ${this.lastName}`;
}

const jane = new Person(‘Jane’, ‘Doe’, 26);
console.log(jane.fullName()); // Jane Doe
```

## Summary
I hope this gives you a better understanding of how the `new` operator works, in a nutshell. We have only scratched the surface of "the secret life of Objects" in JavaScript. And if you want to know more, I recommend you dive deeper into the documentation on MDN, read [Eloquent JavaScript](https://eloquentjavascript.net/06_object.html), or [YDKJS](https://github.com/getify/You-Dont-Know-JS) series. To summarize, as documented on [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new), the new-operator:

> Creates a blank, plain JavaScript object;
> * Links (sets the constructor of) the newly created object to another object by setting the other object as its parent prototype;
> * Passes the newly created object from Step 1 as the this context;
> * Returns this if the function doesn't return an object.

