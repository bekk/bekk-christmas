---
calendar: elm
post_year: 2020
post_day: 17
title: "WIP: Opaque types"
ingress: ""
authors:
  - Vetle Bu Solgård
---
Why are opaque types valuable?
- Does not expose implementation details
So they are valuable for libraries and packages avoiding breaking changes, but what else?
- Even inside your own codebase, code can become easier to maintain 
- This may mean more boilerplate code in the form of getter and setter functions, but it becomes very easy to work with

What are they used for?

Check out example



In all languages when we have some value, we expect that value to be in a certain format. Be it an age which we will at the very least expect to be above -1, or a name of a person which we will expect to have at least 2 names, one first name and a surname, the list goes on.

```elm
type alias Person =
    { name : String
    , age : Int
    }
```

In this record called `Person` we have two properties, one `name` and one `age`

This type, however the company using the program to hire the santa clauses has lately had some under-qualified people becoming santa clauses and they want to improve the hiring strategy.
How can we make it more secure to screen people who want to become santa clauses?


There is some problems with how the code is written now and what the santa claus-hiring company wants.
Let's point out where there is room for improvement:
- At the moment it seems anybody can become a `Santa Claus`, the details of both the `Person` and the `SantaClaus` constructor is exposed. This means that anywhere these classes is used the properties can be changed.
- In the function `hirePersonAsSantaClaus` the only thing ensuring that not everybody becomes a `SantaClaus` is a simple `if-else` statement. 
- What if we wanted to hire `Person`s to become `SantaClaus`es several places in our program? Copying this `if-else` statement would be a bad strategy to achieve this.

Introducing opaque types solves this first problem of exposing constructor details of `Person` and `SantaClaus`.
```elm
type alias Person =
    Person
        { name : String
        , hasBeard : Bool
        , weight : Int
        }
```
```elm
type alias SantaClaus =
    SantaClaus
        { name : String
        , weight : Int
        }
```

Now that they are opaque types instead of records, we can no longer see their constructor details from outside of the file they are defined in. This creates an opportunity to make

In a nutshell, opague types can be used to ensure that we use a module as intended. It will expose everything you need to know on how to interact with it, and also impact your code to become cleaner where the module is used. Unnecessary implementation details will be hidden away and for the cost of some boilerplate code in the module it will be very easy to work with and extend functionality.
