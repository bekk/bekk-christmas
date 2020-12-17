---
calendar: react
post_year: 2020
post_day: 18
title: Rebuild static pages on-demand with incremental static regeneration
image: https://images.unsplash.com/photo-1572061971784-5609ce807082?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=3450&q=100
ingress: Building static pages with React is a great way to improve the
  experience of a website. But how do they work, and how can you still get the
  static pages to change when your data changes?
links:
  - title: Data fetching in Next | Next Docs
    url: https://nextjs.org/docs/basic-features/pages
  - title: Example application built for this article
    url: https://next-examples-one.vercel.app/
  - title: What is a static site generator? | Gatsby Docs
    url: https://www.gatsbyjs.com/docs/glossary/static-site-generator/#what-is-a-static-site-generator
authors:
  - Ole Anders Stokker
---
## Why would I want static pages, isn't React all about dynamic client-side rendered content?

When you load a regular React app in a browser there are a lot of things happening in the background before you can see any content on the page. The browser has to load a lot of HTML, CSS, and JavaScript before any content can be displayed to the user.

First, after the JavaScript has been downloaded and parsed we can begin fetching data from an API. This can lead to waiting times, spinners, and an overall slower experience of the website.

With static pages we can make sure the users sees the content as soon as possible, by including the content in the initial HTML from the server. This means we will not have to wait for JavaScript to load before displaying meaningful content, and the users will not have to wait for potentially slow API-calls to finish before dynamic content is visible.

## The difference in load times

Let us take an example of an article page. Below is the exact same component loaded in two different ways. The client-side approach fetches the article in a `useEffect` hook, while the static site approach fetches the article at build time and bundles it as part of the initial HTML.

<!--
| Client-side rendering                                                     | Static site generation                                                     |
| ------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| ![Client-side rendering](https://next-examples-one.vercel.app/next-1.gif) | ![Static site generation](https://next-examples-one.vercel.app/next-2.gif) |
-->

What you are seeing in the two gifs is what a page looks like when it is reloaded using the two different approaches. This also applies to navigating from one page to another inside the same app, but the greatest difference you will see is when loading the page for the first time.

## Loading data in static pages

Static pages are rendered at build-time, which means you have to know which data to fetch at build-time as well. It also means that the data is constant for that build of the app, and you have to build the app all over again to update the content.

### Enter the solution: incremental static regeneration (ISR)

With ISR we can re-build pages on demand when changes occur, or at certain intervals when users load pages.

## Getting started with static pages in React

There are currently two major players in the market for building static pages with React, **Next** and **Gatsby**. There are of course other solutions, such as the upcoming Remix, and the possibility of building it yourself!

_As of 2020 this site is built with Gatsby and uses static rendering for all articles._

This article uses Next as its building block for using static site generation. Next is a framework built around React. It offers a lot of functionality, such as static pages, routing, automatic bundle splitting, i18n, and much more. It can be used in much the same way as Create React App and is just as easy to set up.

### Rendering only on the client

When rendering React on a client you'll start of with a very basic html template just to get the app started. Create React App builds something like this:

```html
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="style.css" />
    <title>Client-Side React App</title>
  </head>
  <body>
    <noscript> You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    <script src="script.js"></script>
  </body>
</html>
```

When the HTML has been parsed by the client the client will start loading CSS and JavaScript files. Once the JavaScript files have been loaded and parsed the react app will render in the `root` div.

### Rendering on both the server and the client

Static site generation works in much the same way as client-side rendering. The initial HTML for a page will contain all the content since the app is rendered on the server. And it will be visible to the user before the JavaScript is parsed, or even downloaded!

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Server-Side React App</title>
  </head>
  <body>
    <div id="root">
      <header>Christmas articles</header>
      <main>
        <h1>Christmas Trees</h1>
        <p>An article about christmas trees</p>
      </main>
      <footer>Made by me</footer>
    </div>
  </body>
</html>
```

When the JavaScript has finally loaded the client-side _rehydrates_ the existing HTML instead of overwriting it. It takes over the HTML that was delivered by the server and renders it again on the client. It will now behave like any other React app. Operations such as navigating from one page in the app to another will render that page on the client, instead of waiting for the server to respond.

## Static Site Generation with Next

Next uses a file-system based router, which means each route in the app has a corresponding file. This file exports the `Component` that will be rendered on that route, and can also export a set of functions for data fetching if needed.

### Data fetching with static site generation

For static sites, we have to fetch data at build-time.
With Next we can do this with the combination of `getStaticProps` and `getStaticPaths`. These functions are exported from the page file, which corresponds with a given route in our application.
In this case, we will use the path `/articles/[articleId]`, where `articleId` is a parameter in the URL.

With `getStaticPaths` you have to get all the URL parameters required for a static page. Since the URL we are using has a parameter we have to return a list of all the articles we want to be rendered as static pages.

```typescript
export const getStaticPaths: GetStaticPaths<QueryParams> = async () => {
  const articles = await getArticles();
  const paths = articles.map((article) => ({
    params: { articleId: String(article.id) },
  }));
  return {
    paths,
  };
};
```

Any `articleId` not present in the paths will direct to a 404 page by default. If we have too many articles to render at build time we can allow them to be rendered in runtime on the client with the `fallback` option.

```typescript
return {
  paths,
  fallback: true, // can also be <false> or <'blocking'>
};
```

`getStaticProps` is where we actually get the article we want to render. It gets called once for each path returned by `getStaticPaths`. The props returned by this function will be passed to the top-level component of our page.

```typescript
export const getStaticProps: GetStaticProps<StaticProps, QueryParams> = async (
  ctx
) => {
  const articleId = Number(ctx.params?.articleId);
  const article = await getArticleById(articleId);
  return {
    props: {
      article,
    },
  };
};
```

## Incremental Static Regeneration (ISR)

Since pages are rendered at build time we reach a problem when the data in our page changes. With static site generation, we would have to build our application all over again to update any of the pages.

With incremental static regeneration, we can re-render pages at defined intervals. Such as when a user requests the page to update. By using the `revalidate` option in `getStaticProps` we can define how long we should wait until the given page is re-rendered.

```typescript
return {
  props: {
    article,
  },
  revalidate: 60 * 60, // 1 hour
};
```
