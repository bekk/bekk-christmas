---
calendar: elm
post_year: 2020
post_day: 20
title: Remote Data
authors:
  - Aksel Wester
---
Most web apps fetch data from a server. Fetching data from a server means that we don't have any data to put in our model when we initialize our app. In this article we will examine different strategies of modelling our app state when working with data from the server.

## Dummy values

We will start with an example to illustrate the problem. Let's say we are building an app that will fetch a list of articles from a server as soon as the app starts up. Our first approach might be to make a model like this:

```elm
type alias Model =
    { articles : List Article
    }
```