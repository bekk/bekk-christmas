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

![GIF showing TypeScript type inference and autocompletion](/assets/mtg-gif1-2.gif)

As we can see in this GIF from VS Code, we get full autocompletion without specifying a single type, and hovering over the `llanowarElves` variable shows us the entire type structure.
