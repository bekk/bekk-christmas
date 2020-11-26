---
calendar: elm
post_year: 2020
post_day: 4
title: "WIP: Destructiuring in let-in"
image: https://images.unsplash.com/photo-1601543541912-d8e7bd4006e5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3916&q=80
ingress: Until now we have seen how to destructure tuples, records and
  single-value custom types in functions. Today we take a look at how to
  destructure values defined in let expressions.
links:
  - url: https://elm-lang.org/docs/syntax#let-expressions
    title: Let expressions @ elm-lang.org
authors:
  - Ragnhild Aalvik
---
When writing functions, we often have the need to define some values in a let expression to make the function body more readable. Let's look at a simple example: 
```elm
getName : String 
getName = 
    let
        firstName =
            "Ragnhild"

        lastName =
            "Aalvik"
    in
    firstName ++ " " ++ lastName
```

But let expressions are more powerful than just defining single constants! They can also be used to destructure compound values such as tuples, records, and custom types. To illustrate this, we look at examples from the three previous articles and modify them to do the destructuring in a let expression instead of in the function definition.

### Example from day 1 – Destructuring tuples
In the first article of this series, we saw how tuples can be destructured in the function definition. Here we use the same example to destructure the tuple in a let expression:
```elm
canDrive: (Bool, Bool) -> String
canDrive ageAndLicenceStatus =
    let
        (oldEnough, hasLicence) =
            ageAndLicenceStatus
    in
    if oldEnough && hasLicense then
        "Allowed to drive"
    
    else
        "Not allowed to drive"
```

### Example from day 2 – Destructuring records
We can do the same thing with records, inspired by the example in the second article: 
```elm
type alias CartItem = 
    { unitPrice: Int
    , amount: Int
    , description : String
    }

calculateTotal : CartItem -> Int
calculateTotal wholeItem =    
    let
        { unitPrice, amount } =
            wholeItem
    in
    unitPrice * amount
```

### Example from day 3 – Destructuring single-constructor custom types
I guess you see the pattern now, and already see that the example from yesterday can also be destructured like this:
```elm
type Weight
    = Weight Float

type Height
    = Height Float

bodyMassIndex : Weight -> Height -> Float
bodyMassIndex height weight =
    let
        (Weight weightFloat) =
            weight

        (Height heightFloat) =
            height
    in
    weight / (height * height)
```

### Real-life example from work
Having shown what possibilities lie in let expressions, I want to give a real-life example of where I find this power the most useful. I am so lucky that I get to write Elm every day at work, and the following is an example from our code base: 
```elm
let 
    ( icon, backgroundColor, focusColor ) =
        case severity of
            Info ->
                ( Icon.Info, Colors.Blue40, Colors.Blue80 )

            Warn ->
                ( Icon.Warn, Colors.Yellow40, Colors.Yellow80 )
in
...
```

Here, we define three values which are all based on the state of `severity`. By using a tuple we can define all three values at the same time, using only one case expression. In comparison, look how repetitive this code is:

```elm
let 
    icon =
        case severity of
            Info ->
                Icon.Info

            Warn ->
                Icon.Warn

    backgroundColor =
        case severity of
            Info ->
                Colors.Blue40

            Warn ->
                Colors.Yellow40

    focusColor =
        case severity of
            Info ->
                Colors.Blue80

            Warn ->
                Colors.Yellow80 )
in
...
```

