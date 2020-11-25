---
calendar: elm
post_year: 2020
post_day: 1
title: Once, twice, three times a value!
---
Tuples allow us to join values together into a single value. A function can receive a tuple as an argument or it can return one. The latter enables returning more than one value from a function. This requires more work in languages without tuples. 

Here are som tuples:

```elm
person = ("Arnie", 23) : ( String, number ) -- A 2-Tuple

(12, 24, 18) : ( number, number1, number2 ) -- A 3-Tuple or Triple(t)


```

Given a tuple, `Tuple.first`, `Tuple.second` or `Tuple.third` extracts the respective values from the tuple

```elm
Tuple.first person   -- 23
```

Tuples get their type from the type of their members. A tuple of String and Int cannot serve as a tuple of Int and Int.

## Pattern matching tuples

In a function that takes a tuple there are two main ways of "receiving" the argument. Receiving the tuple as a single value is the straightforward approach.

```elm
canDrive: (Bool, Bool) -> String
canDrive ageAndLicenseStatus =
  if (Tuple.first ageAndLicenseStatus) && (Tuple.second ageAndLicenseStatus) then
    "Allowed to drive"
    
  else
    "Not allowed to drive"
```