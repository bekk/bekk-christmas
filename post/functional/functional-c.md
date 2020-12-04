---
calendar: functional
post_year: 2020
post_day: 5
title: Functional ... C#?
ingress: ""
description: C# 9 introduces records, finally making immutable classes first
  class citizens of the language.
authors:
  - Runar Ovesen Hjerpbakk
---
I really love C#. It's by far [my favorite programming language](https://hjerpbakk.com/tag/csharp/). And who wouldn't agree? I mean with a piffy, roll of the tounge [Wikipedia description](https://en.wikipedia.org/wiki/C_Sharp_(programming_language)) like this, what is not to love?

> C# is a general-purpose, multi-paradigm programming language encompassing static typing, strong typing, lexically scoped, imperative, declarative, functional, generic, object-oriented (class-based), and component-oriented programming disciplines.

"Yeah, yeah", I hear you say dear reader. "I know C# is great to use if you want to write better Java apps, even so, this is the Bekk Functional advent calendar. What are you rambling about?"

I know you love your pure, scalable functions in [Haskell](https://wiki.haskell.org/Functional_programming#Purity) and your fancy web pages written in [Elm](https://www.elm.christmas/2020), but did you spot the magic word in the description above? It said:

> ... **functional** ...

Yes! As the late Sean Connery [said so excitedly](https://youtu.be/hKJZ9pzDMCk):

![The day is mine!](https://hjerpbakk.com/img/christmas/the-day-is-mine.jpeg)

C# is not only useful on the [backend](https://docs.microsoft.com/en-us/aspnet/core/introduction-to-aspnet-core?view=aspnetcore-5.0), while writing [iOS and Android apps](https://docs.microsoft.com/en-us/xamarin/), [replacing JS in the browser](https://docs.microsoft.com/en-us/aspnet/core/blazor/?view=aspnetcore-5.0) or as a [scripting language](https://github.com/filipw/dotnet-script), it also becomes more and more functional-friendly with every new language version!

However, what does it mean to be a *functional-friendly* programming language?

## Functional advantages

Enrico Buonanno argues in his book [Functional Programming in C#: How to write better C# code](https://www.amazon.com/Functional-Programming-write-better-code/dp/1617293954/) that we should care about functional programming because it gives us the following:

- **Power:** We can get more done with less code. Functional programming raises the level of abstraction, allowing us to write high-level code while freeing us from low-level technicalities that add complexity but no value.
- **Safety:** A program written in the imperative style may work well in a single-threaded implementation but due to the mutable state that is in its nature, cause all sorts of bugs when concurrency comes in. Code in the functional style might offer better guarantees in concurrent scenarios.
- **Clarity:** We spend more time maintaining and consuming existing code than writing new code, so it’s important that our code be clear and intention-revealing. As we learn to think functionally, achieving this clarity will become more natural.

C# supports a lot of [functional building blocks](https://functionalprogrammingcsharp.com/functional-features-of-c-sharp), such as *function delegates*, *higher order functions*, *expressions instead of statements*, *method chaining*, *extension methods*, *yield*, *LINQ*, *tuples* and *local functions*. Despite all that, the core functional tenet of *immutability of data* has always been a C# pain point. Until now.

## Immutability in C# #

C# second greatest error<sup>[^error]</sup> was to one-up Java and introduce the concept of properties as a first class language feature with the poorest defaults of all time: the default property syntax made it all too easy to create classes with mutable properties. The deed is as simple as:

```csharp
public class Person
{
    public uint Age { get; set; }
}
```

![Listen to the wolf](https://hjerpbakk.com/img/christmas/the-wolf.png)

Alas, premature aging can take its toll and we should've listened the dog, hound, wolf or whatever, and make the `age` property immutable. It came with a cost however, amounting to a lot more work and boilerplate code. I mean, I got bored by just writing out this small example from the past:

```csharp
public class Person
{
    private readonly uint age;

    public Person(uint age)
    {
        this.age = age;
    }

    public uint Age { return age; }
}
```

[C# 6](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/properties#expression-body-definitions) made the pit of success a bit deeper by introducing read-only properties using only a `get` accessor:

```csharp
public class Person
{
    public Person(uint age)
    {
        Age = age;
    }

    public uint Age { get; }
}
```

[C# 7.2](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/struct#readonly-struct) made declaring our intent more explicit by allowing a `struct` to be marked as `readonly`:

```csharp
public readonly struct Person
{
    public Person(uint age)
    {
        Age = age;
    }

    public uint Age { get; }
}
```

This is all well and good, yet consider when our class or struct has multiple readonly properties and we need to construct a new copy with an updated value in one or more of them. My head hurts just by thinking about it. The boilerplate has tested my Christmas spirit, why must we endure this error prone, manual waste? A better way must exist!

## Records in C# 9

And finally this year, at the end of the [worst year ever](https://www.youtube.com/watch?v=zu3k2PJumfI), it does! Microsoft bestowed [.Net 5 and C# 9](https://docs.microsoft.com/en-us/dotnet/csharp/whats-new/csharp-9) upon us, giving us my most requested feature: *language support for immutable data types*, [Record types](https://docs.microsoft.com/en-us/dotnet/csharp/whats-new/csharp-9#record-types)!

```csharp
public record Person(uint Age);
// No, really, this the complete example!
```

A `record` is immutable in that none of the properties can be modified once it's been created. When we define a record type, the compiler provides several useful methods for us:

- Methods for value-based equality comparisons
- Override for `GetHashCode()`
- Copy and Clone members
- `PrintMembers` and `ToString()`

Seems like we're finally winning the war against boilerplate, and if we need to create a copy with an updated value, we can now easily use the `with` keyword:

```csharp
var me = new Person(37);
Person meAYearOlder = me with { Age = 38 };
```

With such quality functional features in C# like *immutable records*, not even time's inevitable flowing towards my 40th birthday and usage of 24(!) year old memes can break this aging developer's Christmas spirit!

[^error]: C#'s greatest error was to introduce the concept of null and not fixing it until [C# 8](https://docs.microsoft.com/en-us/dotnet/csharp/nullable-references).
