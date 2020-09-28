---
calendar: javascript
post_year: 2020
post_day: 13
title: JavaScript Quiz - Strict equality
image: https://images.unsplash.com/photo-1587851932297-b66f1f61f7b6
ingress: Sunday is our day off, it's a day to relax and unwind. It's a perfect
  day to wonder about the oddities of JavaScript. Every sunday until Christmas
  we'll post a quiz question. Can you figure it out?
description: Sunday is our day off, it's a day to relax and unwind. It's a
  perfect day to wonder about the oddities of JavaScript. Every sunday until
  Christmas we'll post a quiz question. Can you figure it out?
authors: []
---
Equality in JavaScript can be frustrating. When is it OK to use `==`, and when should you use `===`? 

What's the output of the codes nippet below?

```javascript
if ("123" === 123) {
    if ("ABC" == "abc") {
        console.log("ABCabc");
    } else {
        console.log("123123");
    }      
} else if ("123" == 123) {
    if (NaN == NaN) {
        console.log("NaN");
    } else if ({a: 1} == {a: 1}) {
        console.log("a1");
    } else if (Infinity === Infinity) {
        console.log("Infinity");
    } else {
        console.log("Truthy");
    }   
} else {
    console.log("Falsy");
}   
```

Hopefully you'll figure it out. Check tomorrow's article for the correct answer and an explaination of how it works. 