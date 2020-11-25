---
calendar: elm
post_year: 2020
post_day: 1
title: Once, twice, three times a value!
---
With tuples we can join values together into a single value. They can be passed as an argument to a function or returned from a function. The latter lets you effectively return more than one value from a function. This can be cumbersome in languages without tuples. 

Here are som tuples:

```elm
("Arnie",23) : ( String, number )

(12,24,18) : ( number, number1, number2 )
```

\
Tuples get their type from the type of their members. A tuple of String and Int cannot pass as a tuple of Int, Int