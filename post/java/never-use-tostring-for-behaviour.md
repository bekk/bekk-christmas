---
calendar: java
post_year: 2019
post_day: 6
title: Never use toString() for behaviour
image: 'https://picsum.photos/id/964/800/300?blur=5'
ingress: >-
  Every object in Java has a `toString()` method which can be called to get a
  String-representation of any object at hand. If left unoverridden, it only
  yields a description of it’s class and location in memory, and not really
  useful for much.
authors:
  - Rune Flobakk
---
You probably have many classes representing something that needs to be encoded as a String, say for persisting, for API requests, transfering state to other non-related classes, or else. Examples coming to mind are national identity numbers, telephone numbers, countries, cities, anything. It may be tempting to override the toString() method of your Country class to simply yield the name of the country. It seems like the method is already in place for just this kind of use. This conveniently enables instances of Country to be give meaningful information in concatenating log strings, and for any parts of our application requiring the name of the country as a plain String we can just call toString().

Using the output from toString() for anything behaviour related comes with a risk of silently breaking the behaviour, since all objects in Java has this method. If you call toString() anywhere to get the name of a country, there is nothing in the type system enforcing that it is in fact a country you are getting the name of.

One of the most obvious culprits is to change the signature of a method previously set to return a `Country` to instead return an `Optional<Country>`, and then change any code which now fails to compile to properly treat the returned instance as optional. But the code which converts the Country to a String will still work. If you used the returned Country to construct an API request including the name of the country, this will now produce strange countries named as  “Optional[“Norway”]” or even “Optional.empty”, and the compiler happily accepts this. What should have been used was an appropriately named method, specific for the Country type, e.g. `getName()`, or anything more semantically useful if required.

The only appropriate use for `toString()` is really for human readable descriptions, and primarily technical personel responsible for the operations of the application. The obvious use case is logging, or any other text where the content is not meant to be parsed or handled in an automated fashion.

Never produce a String used for anything behavioral or business relevant data by overriding and then calling `toString()` or implicitly by concatenating any non-String value with a String.
