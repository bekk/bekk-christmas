---
calendar: functional
post_year: 2019
post_day: 6
title: The Lens Pattern in TypeScript
authors:
  - Simen Vie
---
If you have read all blog post until now, you might have come to the realization that immutability is a core concept in functional programming. In this blog post, we will take a look at a pattern that can help us update and extract data from large immutable data structures. As mentioned in a previous blog post, updating immutable data is done by creating an entirely new copy of the data structure with some part of the data with new values. For shallow structures, this is not really an issue, at least for languages that has a syntax for copying values. Take the following record as an example, written in typescript:
```typescript
interface User {
    name: string
    birthDate: Date
}
const user = {
    name: "Simon",
    birthDate: new Date('1993-12-19')
};
```

After creating this object, I notice I made a typo in the name, which is actually Simen. We fix this with a simple spread on the previous user object:

```typescript
const updatedUser = {...user, name: 'Simen'}
```
Now, what if the user was a part of the current login context in the application, which again is a part of the application model?

```typescript
interface LoginContext {
    user: User,
    ...
}
interface Model {
    loginContext: LoginContext
    ...
}
```
Easy! We just have to spread the model, spread the login context, and spread the user with the updated name value.

```typescript
const updatedModel = {
    ...model,
    loginContext: {
        ...model.loginContext,
        user: {
            ...model.loginContext.user,
            name: 'Simen'
        }
    }
}
```
Cumbersome, right? Imagine having to do this every time we need to update a value.

## Lenses
Lenses is part of a group of patterns used to abstract away the action of updating and looking through large immutable data structures. A lens – or a functional reference – is essentially a focus into a data structure, abstracting away how deep a structure is by pointing right at the requested field. Let us look at the signature of a lens:

```typescript
interface Lens<A, B> {
    get: (a: A) => B
    set: (a: A, b: B) => A
}
```

It is a pair of two functions, a getter and a setter. The getter is a way to extract a subpart B from a larger structure A. The setter defines a way to replace the subpart B in the larger structure A.

A lens made to focus on the name field from the perspective of the model, could look something like this:

```typescript
const nameLens: Lens<Model, string> = {
    get: model => model.loginContext.user.name,
    set: (model, name) => ({
        ...model,
        loginContext: {
            ...model.loginContext,
            user: {
                ...model.loginContext.user,
                name
            }
        }
    })
}
```

Taking the example from earlier, updating our entire model just got a whole lot simpler

```typescript
const updatedModel = nameLens.set(
    model,
    'Simen'
)
```

We still do the exact same thing as before, only we have centralized the knowledge of how the model is constructed into the lens. This abstraction itself is nice, but is it not just a setter? Well, yes. What if we want to make setters for all the values of `User`, would we not have to duplicate much of the setters again and again? This is where the true value of lenses come to light. Lenses have the ability to compose with each other. This essentially means that two lenses `A => B` and `B => C` together can make up the lens `A => C`.

Instead of creating a lens focusing us from the model straight to the name of the user, we create a set of lenses:

```typescript
const loginContextLens: Lens<Model, LoginContext> = {
    get: model => model.loginContext,
    set: (model, loginContect) => ({ ...model, loginContect })
}
const userLens: Lens<LoginContext, User> = {
    get: loginContext => loginContext.user,
    set: (loginContext, user) => ({ ...loginContext, user })
}
const nameLens: Lens<User, string> = {
    get: user => user.name,
    set: (user, name) => ({ ...user, name })
}
```

For reference, we include the compose function. It is a function that takes two chaining lenses as parameters, merging them together. A key point to notice here is that the resulting set of functions are also a lens, enabling composed lenses to continue creating new lenses.

```typescript
function composeLens<A, B, C>(ab: Lens<A, B>, bc: Lens<B, C>): Lens<A, C> {
    return {
        get: (a) => bc.get(ab.get(a)),
        set: (a, c) => ab.set(a, bc.set(ab.get(a), c))
    };
}
```
We now have lenses that together can make up to the following focus: `(Model => LoginContext)`, `(LoginContext => User)` and `(User => Name)` Composing these together, we get `(Model => LoginContext => User => Name)`. Since lenses compose, we can therefore create a lens `Model => Name` from those smaller lenses.

```typescript
const modelToUserLens: Lens<Model, User> = composeLens(loginContextLens, userLens);

const modelToNameLens: Lens<Model, string> = composeLens(modelToUserLens, nameLens);

// we can now also create a birthdate lens, using the same lens to focus onto the user, composed with a User => BirthDate lens
const birthDateLens: Lens<User, Date> = {
    get: user => user.birthDate,
    set: (user, birthDate) => ({ ...user, birthDate })
}
const modelToBirthDateLens: Lens<Model, Date> = composeLens(modelToUserLens, birthDateLens);
```

```typescript
const updatedUser = userNameLens.set(model, 'Simen')
```

## Why use lenses?
Lenses abstract away the operation of updating and extracting values from deep immutable data structures. This means that – in theory – consumers that solely use lenses to work on some data structure, has to know very little about how the model is actually structured. The impact of such an abstraction is greatest when returning to refactor some part of the model, where – in a dream world – only the lenses has to be changed. Without composition in such a pattern, you would find yourself duplicating the same selectors and setters again and again from different perspectives. Such qualities are often present in functional patterns, but are not exclusive to functional programming languages. Take TypeScript for example, it is not a functional programming language, but the lens pattern can be used quite effectively. There are in general many concepts that can be learned from functional to be adopted to other paradigms, which alone should inspire everyone to learn functional programming!
