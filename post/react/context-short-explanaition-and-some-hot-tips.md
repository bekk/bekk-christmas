---
calendar: react
post_year: 2019
post_day: 21
title: 5 neat tricks for React with TypeScript
image: '![pineaple out of context](https://ibb.co/n74C32d)'
ingress: ''
links:
  - title: React+TypeScript Cheatsheets
    url: 'https://github.com/typescript-cheatsheets/react-typescript-cheatsheet'
  - title: Official TypeScript docs
    url: 'https://www.typescriptlang.org/docs/home.html'
authors:
  - Bendik Ibenholt
---
**Union types**

When I started out with typescript and React I was mostly familiar with typed languages through Java so this was the first time I came across union types. If you haven’t come across it before it basically allows you to say that a variable can be one of several types. It’s useful if you want to avoid type inference but still want a variable to be able to have more than one type. For instance if you want to initialize a state with a null value

`const [season, setSeason] = React.useState<Season | null>(null);`



how to instantiate usesate with null

const \[season, setSeason] = React.useState<"christmas" | "easter" | null>(null);

Typing a Component that Accepts Different Props

omit

when to use type inferrence type inference

generiske componenter

Generic Components
