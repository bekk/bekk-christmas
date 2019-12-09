---
calendar: javascript
post_year: 2019
post_day: 18
title: The Magic of TypeScript
ingress: >-
  I like TypeScript. I also like Magic the Gathering. What if we combine them;
  can the magical domain of planeswalkers and spells help us understand the
  awesome but advanced type system of TypeScript?
links:
  - title: Awesome TypeScript GitHub repo
    url: 'https://github.com/dzharii/awesome-typescript'
authors:
  - Geir Sagberg
---
Let's give it a shot! Starting with the basics, we will gradually introduce the various features of the TS type system, using Magic cards as examples.

The complete rules for MtG are out of scope for this article, but if you're interested you can check out [MtG Arena](https://magic.wizards.com/en/mtgarena), a free online game for PC where you can learn the game and play against other people.

## Type Inference

Out of the box, TS will try to understand the types of objects you create, even without specifying a signature. Let's define an old classic, **Llanowar Elves**:

<img src="/assets/mtg-llanowar-elves.jpg" alt="Llanowar Elves" style="width: auto; max-width: 100%;" />

Now, these guys have a **mana cost** of **1 green mana**, shown by a **tree icon in the top right corner**. They also have **Power** and **Toughness** scores of **1**, shown by the **1/1 in the bottom right corner**. Finally, they have an **activated ability**: They can be **tapped** for **1 green mana**.

If all of this makes no sense to you, don't worry, we will simply use the attributes as examples for our TypeScript objects.

<img src="/assets/mtg-gif1-3.gif" alt="GIF showing TypeScript type inference and autocompletion" style="width: auto; max-width: 100%;" />

As we can see in this GIF from VS Code, we get full autocompletion without specifying a single type, and hovering over the `llanowarElves` variable shows us the entire type structure.

## Types and interfaces

Great! But what if we want to do something strongly typed with it? We could extract the type using the `typeof` operator, something like this:

<img src="/assets/mtg-code1.png" alt="Illustration of the typeof operator" style="width: auto; max-width: 100%;" />

Then we could make functions that take an input parameter of type `LlanowarElves`. But we probably want to make our functions more generic, for example a function that works only on **Creatures**, or on something that can be **tapped**. This is where `interface` comes in handy:

<img src="/assets/mtg-code2.png" alt="Three example interfaces, and how to implement them" style="width: auto; max-width: 100%;" />

Here we have added the interfaces `Spell` to require a `manaCost`, `Creature` with `power` and `toughness`, and `Tappable` as something with a `tap` ability. We have also declared that `llanowarElves` is all of these things, using `&`, the [intersection type operator](https://www.typescriptlang.org/docs/handbook/advanced-types.html#intersection-types).

Now, in newer versions of TypeScript, types and interfaces are pretty much interchangeable. So what are the real differences between types and interfaces, and when do you want to use one over the other?

### Declaration merging

<img src="/assets/mtg-code4.png" alt="Example of declaration merging" style="width: auto; max-width: 100%;" />

1. Interfaces support [declaration merging](https://www.typescriptlang.org/docs/handbook/declaration-merging.html), types do not. Here we can see we declare `Creature` twice, with no errors, because the declarations do not conflict.

### `typeof` and `keyof`

<img src="/assets/mtg-code5.png" alt="Example of keyof operator" style="width: auto; max-width: 100%;" />

2. Results of the `typeof` and `keyof` operators can only be stored as types, not interfaces. Here we see using `keyof Creature`, which gives us a new type that is the [discriminated union](https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions) of [string literals](https://www.typescriptlang.org/docs/handbook/advanced-types.html#string-literal-types) for the properties `power`, `toughness` and `manaCost`; i.e. variables of the `CreatureProperties` type can only be either one of those strings.

### Syntax

<img src="/assets/mtg-code3.png" alt="Types vs interfaces" style="width: auto; max-width: 100%;" />

3. Types have generally shorter syntax.

### Rules of thumb

There might be other edge case differences as well, but these are the ones you'll most likely notice. So which one do we use when? I use the following rules of thumb:

* Use `interface` when creating a reusable library. This makes it easier for consumers to merge declarations in case they need to expand the interface without inheriting it.
* Use `type` when combining other types. I find the syntax is both shorter and more readable, and in some cases like `typeof` and `keyof`, only types can be used.
* Otherwise, use whatever feels right. I usually use interfaces, but types are okay too :)

## Union types and Generics

Now, there are several other card types in Magic than Creature. Here are a few:

<img src="/assets/mtg-forest.jpg" alt="Forest MtG card" style="width: auto; max-width: 100%;" />

This **Forest** is a **Land** card. This means you don't need **Mana** to play it, but you can only play one **Land** each turn. Also, lands can be **tapped** for **Mana**, similar to **Llanowar Elves**.

<img src="/assets/mtg-murder.jpg" alt="Murder MtG card" style="width: auto; max-width: 100%;" />

**Murder** is an **Instant**, which means it can be played at any time, as long as you have the **Mana** to pay for it. This specific card can be used to destroy any card that is a **Creature**.

So, how would we go about modelling different types of cards? Let's start by using `|`, the [union type operator](https://www.typescriptlang.org/docs/handbook/advanced-types.html#union-types), to define all possible types of a card:

<img src="/assets/mtg-code6.png" alt="Example of union types" style="width: auto; max-width: 100%;" />

As we can see, `Land` is `Tappable` and also has a `color`, while `Instant` is a `Spell` and has a `applyToTarget` function. And the `Card` type can be either one of these, so if a function takes in a `Card`, you have to use [type guards](https://www.typescriptlang.org/docs/handbook/advanced-types.html#type-guards-and-differentiating-types) to differentiate between the type of cards.

One issue with the `Instant` type is that the `target` could be anything. But in the case of **Murder**, only **creatures** are valid targets. We can use [generics](https://www.typescriptlang.org/docs/handbook/generics.html) to enforce this, let's modify our `Instant` interface declaration:

<img src="/assets/mtg-code7.png" alt="Generic implementation of Instant" style="width: auto; max-width: 100%;" />

Now `Instant` takes in a generic parameter. This can be any type, as long as it is a `Card`. The default value is `Card`.

Now we can define `murder` as an `Instant<Creature>` card, which means that its `applyToTarget` function will interpret the `target` as a `Creature`.

## Mapped types and conditional types

Sometimes we have types that are very similar, but not quite the same. For example, in MtG, a **Creature Token** is a card that is exactly like a **Creature**, except it does not have a **mana cost** and can only exist on the battlefield, not in your hand.

<img src="/assets/mtg-centaur.jpg" alt="Centaur creature token" style="width: auto; max-width: 100%;" />

To model a **Creature Token** in TS, we will use a built-in [mapped type](https://www.typescriptlang.org/docs/handbook/advanced-types.html#mapped-types) `Omit`, with the implementation included here for reference (from [lib.es5.d.ts](https://github.com/microsoft/TypeScript/blob/master/lib/lib.es5.d.ts)):

<img src="/assets/mtg-code8.png" alt="Implementation of Omit type" style="width: auto; max-width: 100%;" />

`Pick` is a [mapped type](https://www.typescriptlang.org/docs/handbook/advanced-types.html#mapped-types) that allows specifying a type and a number of properties, and gives a new type containing only those properties.

`Exclude` is a [conditional type](https://www.typescriptlang.org/docs/handbook/advanced-types.html#conditional-types) that in this case removes the properties we want to omit, so `Omit` becomes a form of "reverse" `Pick`.

Now we can define our `CreatureToken` type:

<img src="/assets/mtg-code9.png" alt="CreatureToken using Omit" style="width: auto; max-width: 100%;" />

As we can see, we no longer need to (or may) include `manaCost` for our `centaur`.

Mapped types and conditional types are really powerful, but can be quite hard to grasp. For a more in-depth look, I recommend the articles [Mapped Types in TypeScript](https://mariusschulz.com/blog/mapped-types-in-typescript) and [Conditional Types in TypeScript](https://mariusschulz.com/blog/conditional-types-in-typescript) by Marius Schulz, as well as the official TypeScript docs linked to above.

## Conclusion

We have explored the wonderful world of TypeScript types, covering type inference, the difference between types and interfaces, union types and intersection types, generics, mapped types and conditional types.

If you are interested in learning more, I would recommend checking out the [Awesome TypeScript GitHub repo](https://github.com/dzharii/awesome-typescript) for lots of curated resources to get you started!
