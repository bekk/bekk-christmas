---
calendar: elm
post_year: 2020
post_day: 1
title: Once, twice, three times a value
image: https://source.unsplash.com/S0j-5wSN3YQ/2000x800
links:
  - title: core/Tuple
    url: https://package.elm-lang.org/packages/elm/core/latest/Tuple
authors:
  - Jørgen Tu Sveli
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

The pattern of types of its values make up the tuple's type as a whole. Hence, a tuple of String and Int cannot serve as a tuple of Int and String.

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

## A look at core/Tuple

After establishing a basic understanding of a concept, I find it rewarding to look at API source code related to that concept. We saw how we could use `Tuple.first` to extract the first value from a tuple. Here is its [source code](https://github.com/elm/core/blob/master/src/Tuple.elm).

```elm
first : (a, b) -> a
first (x,_) =
  x
```

Reading these type signatures can feel daunting at first. But let's apply what we know about tuples and how `first` works. Regarding the type annotation, `(a, b)` merely states that `first` takes a tuple of two values that might not be the same type. The return type is `a`, referring to the type of the first element of the incoming tuple. The type declaration is telling us: "I take a tuple of two values and return whatever type the tuple's first value had".

In line 2, we see that `first` makes use of pattern matching, albeit with a twist. `first` only needs the first value. The second value need not be named, but must be matched using the placeholder `_`.