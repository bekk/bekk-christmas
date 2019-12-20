---
calendar: react
post_year: 2019
post_day: 21
title: Some neat things to know when working with React and TypeScript
image: 'https://i.ibb.co/VgbmHyn/pineapple-supply-co-6y3rpppgtd-I-unsplash.jpg'
ingress: >-
  I started working with React and TypeScriptabout six months ago. Since then
  I’ve learned a lot, and there are a few things I wish I knew when I started
  out that would have saved me from messy solutions and som frustrating moments.
  Here are a few things that are nice to know about when you are using react
  with typescript
links:
  - title: React+TypeScript Cheatsheets
    url: 'https://github.com/typescript-cheatsheets/react-typescript-cheatsheet'
  - title: Official TypeScript docs
    url: 'https://www.typescriptlang.org/docs/home.html'
authors:
  - Bendik Ibenholt
---
**Type inference** 

You don’t have to explicitly type _everything_, TypeScript will use the type of the initial value of a variable. It  works for more complex types too.

```
const [season, setSeason] = React.useState({name:"Christmas", color:"red"});//in order to set the state you can do this:setSeason({name:"Easter", color: "yellow"});
```

If you realise you need the type in retrospect, you can can go back and declare the type, _or_ you can use _typeof_ to declare the type based on the inference.

```
type Season = typeof season;
```



**Union types**

When I started out with typescript and React I was mostly familiar with typed languages through Java so this was the first time I came across union types. If you haven’t come across it before it basically allows you to say that a variable can be one of several types. It’s useful if you want to avoid type inference but still want a variable to be able to have more than one type. For instance if you want to initialize a state with a null value

```
const [season, setSeason] = React.useState<Season | null>(null);
```

**Discriminated Unions**

In the same vein as the tip above, here’s another tip for typing which incorporates union types. If you make a union type of several types that have one common literal type that you can use to tell the types apart you have what’s called a discriminated union type. Useful if you want your components accept different sets of props. 



```
type NeatTrickProps =    | {          hasTheme: true;          season: 'christmas' | 'easter';      }    | {          hasTheme: false;      };export const NeatTrickBanner: FunctionComponent<NeatTrickProps> = props => {    if (props.hasTheme) {        return seasonBanner(props.season);    }    return (        <div>            <h1>No reason to celebrate</h1>        </div>    );};}
```



So that’s a few features I really wish I was familiar with when I started out using react and Typescript. If you want to read more I highly recommend these [cheatsheets](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet) and the [official typescript docs](https://www.typescriptlang.org/docs/home.html)

Happy holidays :-)
