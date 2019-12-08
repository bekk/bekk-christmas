---
calendar: javascript
post_year: 2019
post_day: 18
title: The Magic of TypeScript
ingress: >-
  I like TypeScript. I also like Magic the Gathering. What if we combine them;
  can the magical domain of planeswalkers and spells help us understand the
  awesome but advanced type system of TypeScript?
---
Let's give it a shot! Starting with the basics, we will gradually introduce the various features of the TS type system, using Magic cards as examples.

The rules for MtG are out of scope for this article, but if you're interested you can check out [MtG Arena](https://magic.wizards.com/en/mtgarena), a free online game for PC where you can learn the game and play against other people.

## Type Inference

Out of the box, TS will try to understand the types of objects you create, even without specifying a signature. Let's define an old classic, **Llanowar Elves**:

![Llanowar Elves](/assets/mtg-llanowar-elves.jpg)

Now, these guys have a **mana cost** of **1 green mana**, shown by a **tree icon in the top right corner**. They also have **Power** and **Toughness** scores of **1**, shown by the **1/1 in the bottom right corner**. Finally, they have an **activated ability**: They can be **tapped** for **1 green mana**.

If all of this makes no sense to you, don't worry, we will simply use the attributes as examples for our TypeScript objects.

![GIF showing TypeScript type inference and autocompletion](/assets/mtg-gif1-3.gif)

As we can see in this GIF from VS Code, we get full autocompletion without specifying a single type, and hovering over the `llanowarElves` variable shows us the entire type structure.

## Types and interfaces

Great! But what if we want to do something strongly typed with it? We could extract the type using the `typeof` operator, something like this:

![Illustration of the typeof operator](/assets/mtg-code1.png)

Then we could make functions that take an input parameter of type `LlanowarElves`. But we probably want to make our functions more generic, for example a function that works only on **Creatures**, or on something that can be **tapped**. This is where `interface` comes in handy:

![Three example interfaces, and how to implement them](/assets/mtg-code2.png)

Here we have added the interfaces `Spell` to require a `manaCost`, `Creature` with `power` and `toughness`, and `Tappable` as something with a `tap` ability. We have also declared that `llanowarElves` is all of these things, using `&`, the [intersection type operator](https://www.typescriptlang.org/docs/handbook/advanced-types.html#intersection-types).

Now, in newer versions of TypeScript, types and interfaces are pretty much interchangeable. So what are the real differences between types and interfaces, and when do you want to use one over the other?

![Example of declaration merging](/assets/mtg-code4.png)

1. Interfaces support [declaration merging](https://www.typescriptlang.org/docs/handbook/declaration-merging.html), types do not. Here we can see we declare `Creature` twice, with no errors, because the declarations do not conflict.

![Example of keyof operator](/assets/mtg-code5.png)

2. Results of the `typeof` and `keyof` operators can only be stored as types, not interfaces. Here we see using `keyof Creature`, which gives us a new type that is the [discriminated union](https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions) of [string literals](https://www.typescriptlang.org/docs/handbook/advanced-types.html#string-literal-types) for the properties `power`, `toughness` and `manaCost`; i.e. variables of the `CreatureProperties` type can only be either one of those strings.

![Types vs interfaces](/assets/mtg-code3.png)

3. Types have generally shorter syntax.

There might be other edge case differences as well, but these are the ones you'll most likely notice. So which one do we use when? I use the following rules of thumb:

* Use `interface` when creating a reusable library. This makes it easier for consumers to merge declarations in case they need to expand the interface without inheriting it.
* Use `type` when combining other types. I find the syntax is both shorter and more readable.
* Otherwise, use whatever feels nice :)

## Generics

Now, there are several other card types in Magic than Creature. Here are a few:

![Forest MtG card](/assets/mtg-forest.jpg)

This
