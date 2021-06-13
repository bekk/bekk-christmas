---
calendar: javascript
post_year: 2018
post_day: 11
title: Destructuring and named parameters
ingress: Destructuring your structures
links:
  - title: MDN docs - Destructuring assignment
    url: >-
      https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
authors:
  - Jan Amundsen
---


In the magic year of 2015 I started my career in Bekk and we were introduced to destructuring in Javascript through ES6.
Before this we had to assign values from objects and arrays the hard way.
```
position = {
  latitude: 59.911491,
  longitude: 10.757933,
}
let longitude = position.longitude;
let latitude = position.latitude;
console.log(`lat: ${latitude}, long: ${longitude}`); // lat: 59.911491, long: 10.757933
```
This can be really cumbersome for larger structures. Destructuring allow us to assign these values in a simpler way:
```
position = {
  latitude: 59.911491,
  longitude: 10.757933,
}
let { latitude, longitude } = position;
console.log(`lat: ${latitude}, long: ${longitude}`); // lat: 59.911491, long: 10.757933
```
### Custom variable names
If we wanted to name our variables `lat` and `long` instead we could destructure like this:
```
position = {
  latitude: 59.911491,
  longitude: 10.757933,
}
let { longitude: long, latitude: lat } = position;
console.log(`lat: ${lat}, long: ${long}`); // lat: 59.911491, long: 10.757933
```
While not as straightforward, it provide powerful flexibility to our destructuring.

### Nested destructuring
Destructuring nested objects is just as simple really. The difference is that we have to account for the structure when we assign the variables.
```
let city = {
  name: 'Oslo, Norway',
  position: {
    latitude: 59.911491,
    longitude: 10.757933,
  }
}
let { name, position: { longitude, latitude } } = city;
console.log(`${name} - lat: ${latitude}, long: ${longitude}`); // Oslo, Norway - lat: 59.911491, long: 10.757933
```

### Default values
To save ourself a lot of lines checking for undefined values if the property we try to assign from does not exist, we can set default values when we destructure.
```
let city = {
  name: 'Oslo, Norway',
}
let { name, position: { longitude = 0.0, latitude = 0.0 } = {} } = city;
console.log(`${name} - lat: ${latitude}, long: ${longitude}`); // Oslo, Norway - lat: 0.0, long: 0.0
```
As you can see in this example, we have to provide a default value to `position` as well as `latitude` and `longitude` for the default values in a nested object to work.

## Named parameters
When programming Javascript I use destructuring a lot as named parameters in functions. 
```
const doSomthing = ({ a, b, c }) => {
  console.log(a,b,c);
}
doSomthing({a: 'test', b: 1, c: true}); // test 1 true
```
This allow us to use all the destructuring functionality above on the parameters to a function. Does providing default values to function parameters sound appealing? You bet. A long with other obvious advantages such as ignoring parameter ordering when using the function.
```
const doSomthing = ({ a = 'info', b, c = false }) => {
  console.log(a,b,c);
}
logValues({ b: 1, c: true}); // info 1 true
```
