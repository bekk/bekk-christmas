---
calendar: javascript
post_year: 2020
post_day: 11
title: Enhanced strings with tagged template literals
authors:
  - Ole Anders Stokker
---
## NOTE: Very early draft, uploaded to have _something to work from and to see how it looks_

Did you ever wish you could do more with strings in javascript?

The template literal is a much welcomed feature in the javascript family of string constructors.

Javascript has gotten a lot of new features in the last few years, many of whom it is hard to picture the language without today.
One of these much welcome features arrived with the rest of the bunch in 2015 with the landing of ECMAScript 2015, more commonly known as ES6.
The template literal is a handy feature that lets write write strings with inserted variables, and they even let you write multi-line strings!

## Spice them up with tagged templates

Tagged templates is like another level on top of regular template literals. They are written in just the same way, tag in front of the string.

```typescript
// Regular template literal
`Hello, ${name}!`;

// Tagged template literal
template`Hello, ${name}!`;
```

## Writing other languages _inside_ of javascript

One of the very useful features that can be created with tagged templates is paring of different languages inside javascript. Be it writing

```typescript
const name = "John";

const introduction = md`
# Hello, ${name}!

Welcome to our site.
`;
```

Using a markdown renderer the `md` tag could render our string directly to html of our required format without any extra hassle:

```html
<h1>Hello, John!</h1>
<p>Welcome to our site.</p>
```

## Creating tagged templates for yourself

Tagged template literals follow a pretty consistent formula.
It is a function where the first argument is all the strings in the template, split on the places where a variable is inserted. Then all the variables are passed as rest parameters.

The template `` tag`Hello, ${name}! `` will give us the string `["Hello, ", "!"]` and the parameter `name`;

```typescript
const template = (strings: TemplateStringsArray, name: string) => {
  return strings.join(name);
};
```

As

```typescript
const template = (strings: TemplateStringsArray, ...values: string[]) => {
  return strings.map((str, i) => str + (values[i] || ""));
};
```

```typescript
const name = sql`SELECT name FROM users where id=${100}`;

const sql = (strings: TemplateStringsArray, ...values: string[]) => {
  const sqlTemplate = strings.reduce(
    (accumulatedTemplate, i) => accumulatedTemplate + `$${i}`
  );
  // "SELECT name FROM users WHERE id = $1"
  const sanitizedValues = values.map(sanitizeSqlValues);
  // [100]
  return sqlConnection.query(sqlTemplate, sanitizedValues);
};
```

## Use cases in the wild

A few popular libraries have found their way to include tagged templates as a core of their functionality. Many of them even include plugins for your editor to syntax highlight the templates for the correct language!

Some notable ones include:

### [Apollos graphql-tag](https://github.com/apollographql/graphql-tag)

```javascript
const query = gql`
  {
    user(id: 5) {
      firstName
      lastName
    }
  }
`;
```

### [Styled Components](https://styled-components.com/)

```jsx
const Button = styled.a`
  width: 11rem;
  color: blue;
  border: 2px solid white;
  border-radius: 3px;
`;
```

### [lit-html and lit-element](https://lit-html.polymer-project.org/)
