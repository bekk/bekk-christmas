---
calendar: elm
post_year: 2020
post_day: 1
title: Once, twice, three times a value
image: https://source.unsplash.com/S0j-5wSN3YQ/2000x800
---
Tuples allow us to join values together into a single value. Elm, as of version 0.19, allows tuples of no more than 3 values. A function can receive a tuple as an argument or it can return one. The latter enables returning more than one value from a function. This requires more work in languages without tuples. 

Here are som tuples:

```elm
person = ("Arnie", 23) : ( String, number ) -- A 2-Tuple

(12, 24, 18) : ( number, number1, number2 ) -- A 3-Tuple or Triple(t)
```

Given a tuple, `Tuple.first` and `Tuple.second` extract the respective values. 

```elm
Tuple.first person   -- 23
```

The pattern of types of its member values constitute the tuple's type as a whole. Hence, a tuple of String and Int cannot serve as a tuple of Int and String.

## Pattern matching tuples

In a function that takes a tuple, there are two main ways of "receiving" the argument. Receiving the tuple as a single value is the straightforward approach.

```elm
canDrive: (Bool, Bool) -> String
canDrive ageAndLicenseStatus =
  let 
    oldEnough = Tuple.first ageAndLicenseStatus
    hasLicense = Tuple.second ageAndLicenseStatus
  in
  if oldEnough && hasLicense then
    "Allowed to drive"
    
  else
    "Not allowed to drive"
```

Using pattern matching in the function declaration improves the wordiness of the above code.

```elm
canDrive: (Bool, Bool) -> String
canDrive (oldEnough, hasLicense) =
  if oldEnough && hasLicense then
    "Allowed to drive"
    
  else
    "Not allowed to drive"
```

Pattern matching still works if you introduce a type alias for your tuple.

```elm
type alias DrivingRequirements = (Bool, Bool)

canDrive: DrivingRequirements -> String
canDrive (oldEnough, hasLicense) =
  -- ...
```

After establishing a basic understanding of a concept, it may be rewarding to look at API source code related to that concept.