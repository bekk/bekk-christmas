---
calendar: react
post_year: 2019
post_day: 21
title: 5 neat tricks for React with TypeScript
image: '![pineaple out of context](https://ibb.co/n74C32d)'
ingress: "\r\n\nI started working with React and TypeScriptabout six months ago. Since then I’ve learned a lot, and there are a few things I wish I knew back just started out that would have saved me from messy solutions and som frustrating moments. Here are a few things that are nice to know about when you are using react with typescript\r."
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



```
const [season, setSeason] = React.useState<Season | null>(null);
```

**Discriminated Unions**

In the same vein as the tip above, here’s another tip for typing which incorporates union types. If you make a union type of several types that have one common litteral type that you can use to tell the types apart you have what’s called a discriminated union type. Usefull if you want your components accept different sets of props. 



```
type NeatTrickProps =    | {          hasTheme: true;          season: 'christmas' | 'easter';      }    | {          hasTheme: false;      };export const NeatTrickBanner: FunctionComponent<NeatTrickProps> = props => {    if (props.hasTheme) {        return seasonBanner(props.season);    }    return (        <div>            <h1>No reason to celebrate</h1>        </div>    );};}
```



omit

when to use type inferrence type inference

Generic Components
