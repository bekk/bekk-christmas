---
calendar: javascript
post_year: 2020
post_day: 11
title: Enhanced strings with tagged template literals
authors:
  - Ole Anders Stokker
---
The template literal is a nice and useful addition to the javascript language.
It lets you write multi line strings, and insert variables directly where they are used in the string.

Let me tell you out the template literals bigger sibling, the tagged template literal. They let you tap into the power of the template literal by augmenting the inserted variables and strings however you want!

## Spice them up with tagged templates

Tagged templates is like another level on top of regular template literals. They are written in just the same way, tag in front of the string.

```typescript
// Regular template literal
`Hello, ${name}!`;

// Tagged template literal
template`Hello, ${name}!`;
```

In this case `template` is the name of a tag. Tags are just functions that you can write for yourself, or download as part of a library or framework.

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

## Writing other languages _inside_ of javascript

One of the very useful features that can be created with tagged templates is paring of different languages inside javascript. Be it writing

```typescript
const name = "John";

const introduction = md`
# Hello, ${name}!

Welcome to our site.
`;
```

Using a markdown renderer the `md` tag could render our string directly to html of our required format without any extra hassle. The template can return whatever you want, it doesn't even have to be a string!

```html
<h1>Hello, John!</h1>
<p>Welcome to our site.</p>
```

For a more in depth example we can try to construct our own tag which queries an SQL database. The template lets you write regular SQL queries, and insert values directly where they are used, while the `sql` tag builds the query, sanitizes the values and executes a query behind the scenes.

```javascript
const name = sql`SELECT name FROM users where id=${100}`;

const sql = (strings, ...values) => {
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
    article(id: 11) {
      title
      ingress
      body
    }
  }
`;
```

### [Styled Components](https://styled-components.com/)

```jsx
const Button = styled.button`
  width: 8rem;
  color: #0e0e0e;
  border: 2px solid #fefefe;
`;
```

### [lit-html and lit-element](https://lit-html.polymer-project.org/)
