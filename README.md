# Bekk Christmas

Welcome to the Bekk Christmas codebase. :santa:

Please visit us at [bekk.christmas](https://bekk.christmas)!

If you want to add content, please get in touch with @selbekk.

## Structure

This repository has two main parts - the `studio` and the `web` folder.

### The Studio

Bekk Christmas is built around [Sanity](https://sanity.io), and has its own custom studio. You can access it at [bekk-christmas.sanity.studio](https://bekk-christmas.sanity.studio) (only available for Bekk employees).

The `studio` folder contains all the schemas and custom setup for our Sanity studio. If you want to change (or add) a type of content, this is where you want to look.

### The Web

The frontend of Bekk Christmas is based on [Next.js](https://nextjs.org).

The `web` folder contains all frontend code, as well as any API endpoints.

## Development

To develop, you need a set of secrets for Sanity and Auth0.
Reach out to @selbekk for the proper access tokens.

### The Studio

```bash
$ cd studio # Go to the studio folder
$ npm install # Install dependencies
$ npm run dev # Start a dev server at localhost:3333
```

### The Web

```bash
$ cd web # Go to the studio folder
$ npm install # Install dependencies
$ npm run dev # Start a dev server at localhost:3000
```
