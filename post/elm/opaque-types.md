---
calendar: elm
post_year: 2020
post_day: 17
title: Cleanup your records with opaque types!
ingress: Do you encounter properties within your records in elm that is not on
  the format that they are supposed to be in? Do you want to be absolutely
  certain that a value represents some property in the correct way? Opaque types
  to the rescue!
authors:
  - Vetle Bu Solgård
---
In all languages when we have some value, we expect that value to be in a certain format. Be it a year which we will at the very least expect to have four digits, or the full name of a person which we will expect to have at least 2 names, one first name and a surname, the list goes on.

```elm
type alias Person =
    { name : String
    , birthYear : String
    }
```

In this record called `Person` we have two properties, one `name` and one `birthYear`. At the moment, we are perfectly capable of representing that person with a correct name and a birth year, both with the type `String`. We can not however, be completely certain that these properties will contain that information. A `String` is as valid with "Santa Claus is coming to town" as "Kris Kringle" as value, just as the `String` value "133337" is just as valid as "2020".
The point of this is that we want to be certain that the properties of this record represents the desired values the correct way.

Let's imagine that to create a `Person` the user needs to fill a form where he/she types in the mentioned properties. Instead of validating that these values are formatted the correct way only in the form, we create types to represent them.
To achieve the certainty that the property `birthYear` is in fact a year, we use **opaque types**.

```elm
type Year =
    Year { yearValue : String }

fromString : String -> Maybe Year
fromString yearValue =
    let
        isYear : String -> Bool
        isYear year =
            (year |> String.filter isDigit |> String.length) == 4 
    in
    if isYear yearValue then
        Year { yearValue = yearValue }
    else
        Nothing
```

`Year` is now a type and the property `yearValue` is unaccessible from other modules. We only expose the `fromString` function so that we control entirely how the `Year` type is created. From the definition of the `fromString` function we can see that we only return the `Year` type if the `String` input is indeed a year. 

Now we also have a way of validating the "year" input part of the form where the user creates a `Person`. The property `birthYear` is now guaranteed to be a year by the type system.

```elm
type alias Person =
    { name : String
    , birthYear : Year
    }
```

The opaque types version do produce some boilerplate code, but will oftentimes be much cleaner to work with as the interaction with the type is clearly defined through getter and setter functions. In a nutshell, opaque types can be used to ensure that we use a module as intended. It will expose everything you need to know on how to interact with it, and also impact your code to become cleaner where the module is used. Unnecessary implementation details will be hidden away and for the cost of some boilerplate code in the module it will be very easy to work with and extend functionality.