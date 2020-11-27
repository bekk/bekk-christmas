---
calendar: elm
post_year: 2020
post_day: 18
title: The Builder Pattern
authors:
  - Aksel Wester
---
THe builder pattern is a useful way to structure some parts of your code in Elm.

Elm doesn't have a concept of required and optional arguments. Every function takes all the arguments they specify, no more, no less. But sometimes we want to be able specify only some values to a function, and use default values for the rest. The builder pattern is one solution to that challenge.