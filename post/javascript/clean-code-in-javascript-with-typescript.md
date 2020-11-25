---
calendar: javascript
post_year: 2020
post_day: 6
title: Clean Code™ in JavaScript with TypeScript and Automatic Type Generation
ingress: Even today, many people shy away from JavaScript because it is seen as
  unreliable or unpredictable. Without strong typing and compiling, unexpected
  problems can arise at runtime that nobody will see until it gets uncovered as
  an error in a production environment.
description: javascript typescript clean code nswag type safe
links:
  - url: https://www.typescriptlang.org/docs/
    title: Official TypeScript docs
  - title: NSwag on GitHub
    url: https://github.com/RicoSuter/NSwag
authors:
  - Fred Heggenes
---
### A transitional language

When I started a career in web development in 2011, JavaScript was in its comeback phase. There were still people who disabled JS in their browsers. When we wanted to do dynamic frontend work we relied upon frameworks like Razor as much as we could and did the lion's share of processing serverside. After all, people's home computers are slow and we should use our servers' processing power where possible, right?

A few years down the line, JavaScript started getting more traction. We had seen that you could do some neat things with it, and when you used jQuery it didn't seem so complicated. Whole frontend frameworks like Knockout, Backbone and Angular were becoming popular, but was shifting to processing in the front end a good idea? After all, JavaScript is still the wild west. Anything goes. A variable can be a bool one second, a string the next, then an integer (or, just a number, we don't even discriminate).

### What can be done?

A cowboy language such as this surely cannot be used by an enterprise that prides itself on writing Clean Code™. After all, allowing something like this to run: 
```javascript
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.substring(1);
}
capitalize(42);
```

is crazy.

But what if we made JavaScript type-safe, and had a real compiler that would check? 

It already exists: 

***TypeScript*** (typed JavaScript, get it?)

To revisit our absurd code sample from above, TypeScript would see it written something like this:

```typescript
function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.substring(1);
}
```

As you can see, now we can specify not only the type of our parameter, but also of our return value. Subsequently, calling our function like this:

```typescript
capitalize(42)
```

will not work, and our compiler complains. In a decent IDE, you'd know this call won't work before you even try to run a compiler. It might even offer constructive criticism.

In addition to primitive types, Typescript also supports custom types and interfaces, enums, arrays and tuples.

### Automatic Type Generation

>But I have large chunks of json coming from API endpoints that I have written in C#, do I have to create typed interfaces for these objects on my frontend now? That seems like a huge waste of time.


Nope. Because we have ***NSwag***. 


In really short strokes, NSwag is a tool that runs when you compile your backend API code. It does two things: it creates an API documentation page for your API (like OpenAPI/Swagger) *and* it does all your automatic client generation (like AutoRest). In practice, what this means is that when you've written an API endpoint and the corresponding *RequestModel and *ResponseModel, NSwag produces interfaces and client code for you. Your OrganisationController is used to make an OrganisationClient, and your TypeScript frontend is all ready to consume the endpoint with no code written.

>What if I change my endpoint, or add or remove properties to my models serverside?

NSwag does the corresponding changes on your frontend. And should any of the code you've already written now be wrong, the TS compiler will let you know. This has the potential to save ***a lot*** of time.

This article is *really* broad strokes, but hopefully it might make a type-purist give JavaScript another look.