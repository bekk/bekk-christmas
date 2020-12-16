---
calendar: javascript
post_year: 2020
post_day: 11
title: Enhanced strings with tagged template literals
image: https://images.unsplash.com/photo-1425913397330-cf8af2ff40a1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=3264&q=100
ingress: Have you ever wanted to add extra functionality to strings? With tagged
  template literals you can build useful templates, add logic, or write
  different languages inside strings. How can that be useful, and how does it
  even work? Dive into how tagged template literals let us build enhanced
  strings!
links:
  - url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
    title: Template literals (Template strings) - JavaScript | MDN
  - url: https://wesbos.com/tagged-template-literals
    title: Tagged Template Literals - Wes Bos
authors:
  - Ole Anders Stokker
---
The template literal is a nice and useful addition to the JavaScript language.
It lets you write multi-line strings, and insert variables where they are used in the string.

Let me tell you out the template literals bigger sibling, the _tagged_ template literal. They let you tap into the power of template literals by augmenting the inserted variables and strings the way you want!

## Spice them up with tagged templates

Tagged templates are like another level on top of regular template literals. They are written the same way, with the addition of a tag in front of the string.

```typescript
// Regular template literal
`Hello, ${name}!`;

// Tagged template literal
template`Hello, ${name}!`;
```

In this case, `template` is the name of a tag. Tags are functions that you can write for yourself, or download as part of a library or framework.

## Creating tagged templates for yourself

Tagged template literals follow a pretty consistent formula.
It is a function where the first argument is all the strings in the template, split on the places where a variable is inserted. Then all the variables are passed as rest parameters.

The template `` tag`Hello, ${name}! `` will give us the strings `["Hello, ", "!"]` and the parameter `name`.

```typescript
const template = (strings: TemplateStringsArray, name: string) => {
  return strings.join(name);
};
```

The example above might not be the most useful by itself, so let us go for a more generalized approach. To allow an arbitrary amount of variables in the template we can collect all the rest parameters to a list of variables.
This leaves us with the list `strings` and all the variables in `values`.

```typescript
const template = (strings: TemplateStringsArray, ...values: string[]) => {
  return strings.map((str, i) => str + (values[i] ?? ""));
};
```

The `template` above doesn't do anything special _yet_. It combines the strings and values to create the original string. To build further on this we can add the logic we want to enhance the strings or values!

## Writing other languages _inside_ of JavaScript

One of the very useful features that can be created with tagged templates is the paring of different languages inside JavaScript. Let us take an example of a tag that renders markdown. This can be quite useful for generating larger pieces of text in a front end in a more human-readable format.

```typescript
const name = "John";

const introduction = md`
# Hello, ${name}!

Welcome to our site.
`;
```

We can create the above `md` tag by using a markdown renderer to render our string to html of our required format, without any extra hassle. The template can return whatever you want, it doesn't even have to be a string!

```html
<h1>Hello, John!</h1>
<p>Welcome to our site.</p>
```

For a more in-depth example, we can try to construct our own tag which queries an SQL database. The template lets you write regular SQL queries as regular strings. Values can be inserted where they are used in the string. While the `sql` tag builds the query, sanitizes the values, and executes a query behind the scenes.

```JavaScript
const name = sql`SELECT name FROM users where id = ${100}`;

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

A few popular libraries have found their way to include tagged templates. Some even use them as part of their core functionality. Many of these libraries even include plugins for your editor. Many add support for syntax highlighting templates for the correct language!

Some notable ones include:

### [Apollos graphql-tag](https://github.com/apollographql/graphql-tag)

With the graphql-tag library, you can write queries in GraphQL directly in JavaScript. The queries can be syntax highlighted as GraphQL. The template returns the query as GraphQL AST (Abstract Syntax Tree) instead of a regular string.

```javascript
import gql from "graphql-tag";

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

Styled Components is a library that lets you create CSS styling inside of JavaScript files with tagged template literals.
Each html tag has a corresponding tag, and the template returns a React component with the CSS in the template as scoped styling for that component.
There are also a lot of similar libraries like Emotion that follow much of the same formula.

```jsx
import styled from "styled-components";

const Button = styled.button`
  width: 8rem;
  color: #0e0e0e;
  border: 2px solid #fefefe;
`;

const Component = () => {
  return (
    <div>
      <Button />
    </div>
  );
};
```

### [lit-html and lit-element](https://lit-html.polymer-project.org/)

Lit-html is a library for rendering html with tagged template literals. The templates are made to make updating the dom easy and efficient, and only the changes are rendered to the DOM.
You can combine lit-html with frameworks like lit-element to create web-components.

```javascript
import { html, render } from "lit-html";

const name = "World";

render(
  html`<html>
    <body>
      <h1>Hello ${name}</h1>
    </body>
  </html>`,
  document.body
);
```
