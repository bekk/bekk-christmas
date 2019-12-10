---
calendar: react
post_year: 2019
post_day: 16
title: Document your stuff with Docz
image: >-
  https://images.unsplash.com/photo-1457694587812-e8bf29a43845?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1800&q=80
ingress: >-
  Having great documentation is what differentiates a great library from an ok
  one. I've spent the last couple of months creating a design system and its
  documentation site in Docz, and I'd like to share some experiences.
links:
  - title: Docz website
    url: 'https://www.docz.site/'
  - title: 'Our design system site, built with Docz'
    url: 'https://design.entur.org'
authors:
  - Kristofer Giltvedt Selbekk
---
## What's a docz?

Docz is an all-in-one solution for your next documentation site. It's basically Gatsby with a lot of plugins that makes it super easy to document React components or apps.

## How to get started

To get started, create a new project, and install `docz` via your favorite package manager:

```
yarn init -y
yarn add docz react react-dom prop-types --dev
```

Now, you can start your app by running `yarn docz dev`. Voila - you have a running example app!

Next, create some components. Let's create a `src/Button.jsx`, because everybody makes buttons in these example articles 😄

```js
import React from 'react';
import { string, bool, oneOf } from 'prop-types';

export const Button = ({ isLoading, children, variant, ...rest }) => {
  return (
    <button className={'my-button my-button--' + variant} {...rest}>
      {isLoading ? '🌀' : children}
    </button>
  );
};
Button.propTypes = {
  children: string.isRequired,
  isLoading: bool,
  variant: oneOf(['primary', 'secondary']).isRequired
};
```

It's a pretty simple component that shows a spinner if the `isLoading` prop is true, otherwise the children prop. And it comes in primary and secondary variants.

Next, let's create a MDX file that documents this button! You can place it wherever you want, but perhaps right next to the component would be a good spot?

If you're not familiar with MDX, it's basically Markdown with JSX support. You can render React-components directly inside of your Markdown, which triggers some really cool possibilities. You can read more about MDX at [its website](https://mdxjs.com/) if you're interested.

Each MDX file starts with some YAML-configuration fields called frontmatter. We specify the name of the page, and the route it should be mounted to.

```markdown
---
name: Button
route: /button
---

import { Playground, Props } from 'docz'
import { Button } from './'

# Button

<Props of={Button} />

## Basic usage

<Playground>
  <Button variant="primary">Primary action</Button>
  <Button variant="secondary">You can click me, too!</Button>
</Playground>

## How to use

Use the primary button as the main action of your interface. Otherwise, use the secondary button.
```

The `<Props />` component accepts an `of` prop, where you pass in the component you want documented. This creates a UI where the prop types of your component are parsed and shown in all their glory.

The `<Playground />` component lets you create live demos of your component, which the user can interact with. 

If you want, you can create stateful components directly inline!

```js
<Playground>
  {() => {
    const [isLoading, setLoading] = React.useState(false);
    return (
      <Button 
        variant="primary" 
        isLoading={isLoading} 
        onClick={() => setLoading(prev => !prev)}
      >
        Click to load
      </Button>
    );
  }}
</Playground>
```

This is incredibly powerful, and since it's just React, you can create really complex examples that shows real-world usage in a simple and straight-forward way.

## Typescript? One line.

Docz is written in Typescript, and has built in support for parsing Typescript type signatures. All you need to do is to create a `.doczrc.js` file with the following content:

```js
export default {
  typescript: true
}
```

That's it! Now we just need to rename our `Button` component to `Button.tsx` and change the prop types into a type signature!

```ts
import React from 'react';

type ButtonProps = {
  children: string;
  isLoading?: boolean;
  variant: 'primary' | 'secondary';
};

export const Button: React.FC<ButtonProps> = ({ 
  isLoading, 
  children, 
  variant, 
  ...rest 
}) => {
  return (
    <button className={'my-button my-button--' + variant} {...rest}>
      {isLoading ? '🌀' : children}
    </button>
  );
};
```

We can reload our app, and everything should work just as expected. That's pretty slick!

## Document your components with jsdoc

Even though you're probably following all best practices when it comes to naming, some props just need a bit more explanation. That's where JSDoc comes in. JSDoc is a way to write comments in a standardized way that we can parse with other tools. [Here's their website, if you want to have a look](https://devdocs.io/jsdoc/about-getting-started). 

Let's add some explanations to our types!

```tsx
type ButtonProps = {
  /** The button text. Only strings allowed - no icons! */
  children: string;
  /** Renders a spinner if set to true. Use to indicate that the button is busy */
  isLoading?: boolean;
  /** The design of the button, see guidelines for when to use which */
  variant: 'primary' | 'secondary';
};
```

When you refresh the page, you'll get even more details out of your `<Props />` component. 

## Make it your own

These "all in one docs site" projects are nice and all, but they're not much use unless you can customize them to fit your usecase. We're creating a design system, and the site should probably be created with those components instead of the built in ones.

Luckily, Docz is built with Gatsby, and includes Gatsby's number one power feature, [component shadowing](https://www.docz.site/docs/component-shadowing). 

If you want to create your very own design, for example, create a new file `src/gatsby-theme-docz/index.tsx` and build your own! If you just want to change the logo - shadow the `src/gatsby-theme-docz/components/Logo/index.tsx` file.

For most open source projects, however, you can get away with just tweaking the original design. You even have light and dark theme support by default, and you can [tweak the colors to fit your brand](https://www.docz.site/docs/creating-your-themes).

## Real world usage - how has it been?

We started using Docz in an early v2 release candidate, but it's been a pleasure to work with as it has matured. We've rarely been stuck, and we've created some pretty advanced customizations so far.

To be honest, the only issues we've run into so far has been related to the `react-docgen` engine that parses the jsdoc and Typescript types to feed the Props component with prop data.

You can check out our [design system site](https://design.entur.org) if you want - just note that it's in Norwegian 😱 We're really happy with the result, and we're looking forward to continuing using Docz in the future.
