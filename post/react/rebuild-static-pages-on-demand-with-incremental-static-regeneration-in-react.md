---
calendar: react
post_year: 2020
post_day: 18
title: Rebuild static pages on demand with incremental static regeneration
ingress: Building static pages with React is a great way to improve the
  experience of a website. But how can you still get the static pages to change
  when your data changes?
links:
  - title: Nextjs Docs
    url: https://nextjs.org/docs/basic-features/pages
authors:
  - Ole Anders Stokker
---
## Why would I want static pages, isn't React all about dynamic client side rendered content?

When you load a regular React app in a browser there are a lot of things happening in the background before you can see any content on the page. The browser has to load a lot of HTML, CSS and JavaScript before any content can be displayed to the user.

First after the JavaScript has been downloaded and parsed we can begin fetching data from an API. This can lead to waiting times, spinners, and and overall slower experience of the website.

With static pages we can make sure the users sees the content as soon as possible, by including the content in the initial HTML from the server. This means we don't have to wait for JavaScript to load before displaying meaningful content, and the users wont have to wait for potentially slow API-calls to finish before dynamic content is visible.

Lets take an example of an article page. Bolow is the exact same component loaded in two different ways. The client side approach fetches the article in a `useEffect` hook, while the static site approach fetches the article at build time and and bundles it as part of the initial HTML.

| Client side rendering                                               | Static site generation                                              |
| ------------------------------------------------------------------- | ------------------------------------------------------------------- |
| ![Getting Started](https://next-examples-one.vercel.app/next-1.gif) | ![Getting Started](https://next-examples-one.vercel.app/next-2.gif) |

## Rendering React on a server as well as on the client

Concepts:

- Client Side Rendering (CSR)
- Server Side Rendering (SSR)
- Static Site Generation (SSG)
- Incremental Static Regeneration (ISR)

### Rendering only on the client

When rendering React on a client you'll start of with a very basic html template just to get the app started. Create React App builds something like this:

```html
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="style.css" />
    <title>Client Side React App</title>
  </head>
  <body>
    <noscript> You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    <script src="script.js"></script>
  </body>
</html>
```

When the HTML has been parsed by the client the client will start loading CSS and JavaScript files. Once the JavaScript files have been loaded and parsed the react app will render inn the `root` div.

### Rendering on both the server and the client

Static site generation has a lot in common with server side rendering (SSR), and works in much the same way as client side rendering. Since the React app is rendered on the server the initial HTML will contain all the content on the page, _before_ the javascript is parsed or even downloaded!

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Server Side React App</title>
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

When the JavaScript has finally loaded the client side _rehydrates_ the existing HTML instead of overwriting it. It _takes over_ the HTML that was delivered by the server, and renders it again og the client. It will now behave just like any other React app.

## Static Site Generation (SSG)

With static site generation the initial HTML for each page you can visit in an application will be rendered at _build time_.

### Data fetching with static site generation

WHen pages are created at build time that means all that relevant data has to be avaiable at build time as well. A solution to this is doing data fetching at build time!

With Nextjs each page has the option of adding a data fetching method where you can fetch all relevant data at build time and pass it as props to the page.

In Next we can do this with the combination of `getStaticProps` and `getStaticPaths`.

With `getStaticPaths` you have to get all the url parameters required for a static page. In this case we are creating a page which renders articles, and all articles should be rendered at build time. The `articleId` parameter describes which article to url represents, and we have to return a list of all the articles we want rendered as static pages

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
  fallback: true,
};
```

`getStaticProps` is where we actually get the article we want to render. It gets called once for each path returned by `getStaticPaths`. The props returned by this function will we passed to the top level component of our page.

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

Since pages are rendered at build time we reach a problem when the data in our page changes. With static site generation we would have to build our application all over again to update any of the pages.

With incremental static regeneration we can re-render pages at defined intervals when a users requests the page to update the content instead. By using the `revalidate` option in `getStaticProps` we can define how long we should wait until we can re-render the given page.

```typescript
return {
  props: {
    article,
  },
  revalidate: 60 * 60, // 1 hour
};
```
