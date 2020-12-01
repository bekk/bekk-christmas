---
calendar: elm
post_year: 2020
post_day: 7
title: Simplify your code with ad hoc tuples
image: https://images.unsplash.com/photo-1577911997399-ec915ff52ee9?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80
ingress: With Elm's strong types, we must be precise when writing our business
  code. Precision is a good thing, but it often has the drawback of being
  verbose. Ad hoc tuples can save the day with clear and precise syntax!
links:
  - url: https://dev.to/skinney/language-idea-limit-custom-types-to-three-arguments-27p1
    title: "Language Idea: Limit custom types to three arguments"
authors:
  - Holger Ludvigsen
---
A typical case is when you need to check multiple values. Let's say the user has chosen a size and optional color name for their product:

```elm
type Size
    = Small
    | Large 

size : Size
color : Maybe String
```

And we want to put a suitable text in their confirmation dialogue:

```elm
case size of
    Small ->
        case color of
            Just colorName ->
                "A modest " ++ colorName
            Nothing ->
                "Don't worry! We will find a color for you"

    Large ->
        case color of
            Just colorName ->
                "A big great " ++ colorName
            Nothing ->
                "Don't worry! We will find a color for you" -- Oh no, duplication!
```

Instead of indenting away into these nested case-expressions, a common trick is to use an _ad hoc tuple_ combining the two values into `( size, color )`. Notice how clear this make the outcomes of each case:

```elm
case ( size, color ) of
    ( Small, Just colorName ) ->
        "A modest " ++ colorName

    ( Large, Just colorName ) ->
        "A big great " ++ colorName

    ( _ , Nothing ) ->
        "Don't worry! We will find a color for you"
```

Or consider if this if-else-expression for the email adress of a fictional company:

```elm
email = 
    if (userDepartment == Technology && reportTitle == "Incident") then
        "brent@phoenix.com"
    else if (userDepartment == Operations) then
        "office@phoenix.com"
    else if (userDepartment == Sales && reportTitle == "Big sales lead") then
        "yuppie@phoenix.com"
    else
        "mail@phoenix.com"
```

This can be more consisely expressed with `case .. of` on a tuple:

```elm
email = 
    case (userDepartment, reportTitle) of
        (Technology, "Critical incident") ->
            "brent@phoenix.com"
        (Operations, _) ->
            "office@phoenix.com"
        (Sales, "Big sales lead") ->
            "yuppie@phoenix.com"
        _ ->
            "mail@phoenix.com"
```

## Don't topple the tuple

Before we run off with our newly acquired hammer and see a world of nails, beware that tuples in Elm are intentionally restricted to _maximum three members_. 

The reasoning is that if you combine more values than this, you are probably better off with a proper data structure like a record where the fields are named, or a list where the members have order. This is a strong restriction, but all the good kids will get the gift of easily read code.