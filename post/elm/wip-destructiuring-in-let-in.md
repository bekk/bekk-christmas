---
calendar: elm
post_year: 2020
post_day: 4
title: The power of let expressions
image: https://images.unsplash.com/photo-1601543541912-d8e7bd4006e5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3916&q=80
ingress: In the previous christmas articles we have seen how to destructure
  tuples, records, and single-value custom types in the function arguments.
  Today we take a look at how to destructure values in let expressions, along
  with some of the use-cases where I find this the most helpful.
links:
  - url: https://elm-lang.org/docs/syntax#let-expressions
    title: Let expressions @ elm-lang.org
authors:
  - Ragnhild Aalvik
---
When writing functions, we often need to define some values in a let expression to simplify the function body. Let's look at a small example: 
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

This is fine, but let expressions are more powerful than just defining single constants! 💪 They can be used to destructure compound values such as tuples, records, and custom types. To illustrate this, we look at examples from the three previous articles of this series and modify them by moving the destructuring into a let expression. If you haven't read the previous articles you should take a look at them now to get some context.

### Destructuring tuples (from [day 1](https://bekk.christmas/elm/2020/1))
In the first article of this series we saw how to destructure tuples in the function arguments. Now, we use the same example to do the same destructuring in a let expression:
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

In this example it would probably be just as simple to destructure the tuple directly in the function arguments, but now you know that this is possible, too!

### Destructuring records (from [day 2](https://bekk.christmas/elm/2020/2))
We can do the same thing with records, inspired by the example in the second article of this series: 
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
Also here one could ask _Why not just destructure the record directly in the arguments?_ One could just do that, but what technique to use and when is often based on personal preferences. In the case of records, I would personally prefer destructuring it in a let expression.

### Destructuring single-constructor custom types (from [day 3](https://bekk.christmas/elm/2020/3))
I guess you see the pattern now, and that you already see that the example from yesterday can also be destructured like this:
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

### My favourite use-cases
Having shown the power of let expressions, I want to share my favourite use-cases for them. I'm lucky to get to write Elm every day at work, and the following two examples are taken from an Elm app for doing journey searches.

First, let's take a look at the update function. The Model contains a passenger picker which handles everything related to adding passengers to a journey search. The passenger picker has its own Model and a typical update function returning a Model and a Cmd. When calling this update function from the outer update function, then let expressions come in very handy:

```elm
update msg model =
    case msg of
        PassengerPickerMsg subMsg ->
            let
                (updatedPassengerPicker, passengerPickerCmd) =
                    PassengerPicker.update subMsg model.passengerPicker
            in
            ( { model | passengerPicker = updatedPassengerPicker }
            , Cmd.map PassengerPickerMsg passengerPickerCmd
            )

        ...
```

Here the return value from calling `PassengerPicker.update` is destructured directly in the let expression. This way we can easily put the updated passenger picker into the Model while at the same time returning the passenger picker Cmd.

Next is an example where we decide what type of situation message to display on a journey suggestion:

```elm
viewSituationMessage : Severity -> Html msg
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

Here, we define three values which are all based on the state of `severity`. By using a tuple in the let expression, we can define all three values at the same time using only one case expression. In comparison, look how repetitive this code is, where the same check is done for all three values:

```elm
...
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
                Colors.Yellow80
in
...
```

Scenarios like this, where multiple values are based on the same condition, are where I use this kind of destructuring the most. Other than reducing duplicated code, one great thing about this pattern is that one can easily see what values are "connected" and that will change under the same conditions. Pretty neat, huh?

P.S. The dog has nothing to do with the article. It's just here for cuteness 🐶