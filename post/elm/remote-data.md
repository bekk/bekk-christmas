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

This looks good, But we have to initialize the model somehow, and since we don't have the articles when starting off, because we havent made the request yet, we would have to initialize the model like this:

```elm
initialModel : Model
initialModel =
    { articles = []
    }
```

This looks fine, but this strategy does pose some problems. One problem is that there is no way to know whether we are still waiting for the server to respond, or whether there actually are no articles. You could imagine a user being a little scared if we display a message saying "There are no articles" for a second, before actually get the articles and display them. The user might think that all their articles have been deleted, before realising that the server was just a little slow to respond.

## A Loading Field

One way to distinguish between a request that's still loading, and a request that return an empty list is to add a loading field to our model, like this:

```elm
type alias Model =
    { articles : List Article
    , loading: Bool
    }
```

We can then initalize the `loading` field to be `True`, and when the request is finished, we set the `loading` field to be `False`. That way we can show nothing, or maybe a loading spinner, until the request is done.

But "loading" and "not loading" is not the only two states our app can be in: what if the request fails? In that case we would have to set the `loading` field to be `False`, since we are no longer loading, but then the user would _definitely_ think that all their articles were gone. Even if the problem was only that they lost their internet connection for a second.

## An Error Field

