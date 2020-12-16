---
calendar: react
post_year: 2020
post_day: 16
title: Maintainable React components with Typescript
image: https://images.unsplash.com/photo-1484603738253-e5b73679e8cb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2000&q=80
ingress: I often find myself coming into code bases that I haven't worked with
  before to fix a bug or add some new feature. This is honestly more often that
  not quite challenging.
links:
  - url: https://www.typescriptlang.org/
    title: TypeScript Documentation
authors:
  - Joakim Gyllenskepp
---
Recently, santa needed my help to improve the gift generator that the North pole uses to find the perfect christmas gifts. Santa suggested that I should tweak the parameters that are sent into the generator to make it more precise.

What I always do when working with a new code base is that I read it through top-down. I start with the `<App />`-component that wraps the application, and navigate myself down to the component that I'm going to work with. When I finally find the relevant component, I might be met by something like this:

```TSX
function SantasGiftGenerator(props) {
    // some less important code
    ...

    // This code generates the perfect gift
    return (
        <>
            <h1>The perfect gift:<h1>
            <ThePerfectGift
                wishlist={props.wishlist}
                name={props.child.name}
                naughtyOrNice={() => props.naughtyOrNice(props.child.name)}
            >
        </>
    )
}
```

Sure, that doesn't look so bad. But a problem with this component is that it's quite hard to figure out what `props` actually contains. In my eyes `props` simply hides some of the most important information that determines how a component works, the input.

In this case, it's clear that `props` contains the input `props.wishlist`, `props.child.name` and a function `props.naughtyOrNice`. So what is `props.wishlist`? Maybe it's a list? But if that's the case, what does the list contain? Is it a list of strings or a list of objects containing more information? Also, does `props.child` contain any other information than `name`? It certaintly seems like it, since it would be weird to have an object with only one value in it...

My point is, if we know what information is available to our components, it is a lot easier to figure out what the component does and how to change it without breaking the application somehow.

## So how can Typescript help?

After consulting with Santa, I converted the component to Typescript and added types to make it easier to work with. It ended up like this:

```TSX
type Child = {
    name: string;
    age: number;
    favouriteColor: string;
}

type GeneratorProps= {
    wishlist: string[];
    child: Child
    naughtyOrNice: (name: string) => "Nice" | "Naughty"
}

function SantasGiftGenerator(props : GeneratorProps) {
    // some less important code
    ...

    // This code generates the perfect gift
    return (
        <>
            <h1>The perfect gift:<h1>
            <ThePerfectGift
                wishlist={props.wishlist}
                name={props.child.name}
                naughtyOrNice={() => props.naughtyOrNice(props.child.name)}
            >
        </>
    )
}
```

With these type definitions added to the component, it's not necessary to go on a treasure hunt to find input used by the component. In the case of `SantasGiftGenerator`, Typescript makes it easier to answer previously unanswered questions:

1. `wishlist` is a list of strings.
2. `child` is actually an object which contains information about `age` and `favouriteColor` in addition to `name`.
3. The function `naughtyOrNice()` takes the string `name` as input, and either returns the string `Naugthy` or `Nice`.

Even though you need to write some extra lines of code to add type definitions to your components, I'd say it's worth it a hundred times over! Well, maybe that's a bit exaggerated, but type definitions will most likely save a lot of time for the next person working with the code, and maybe even your future self.



## Other neat advantages

Of course, there's a heap of other advantages that comes with typed languages.

Since Typescript gives more informations about functions and components, most popular IDEs uses this information to improve auto-completion. And to be honest, coding without auto-completion is just a pain.

The Typescript compiler also makes you a lot more confident when changing your code. When you add, remove, or change the input of a component, the compiler will output useful error messages that helps you understand how much impact such a change has.

Anyway, that's my two cents when it comes to adding static typing to Javascript, either through Typescript or with some other tool such as Flow.

Stay typed!


