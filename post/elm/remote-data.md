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

This looks good, But we have to initialize the model somehow, and since we don't have any articles when starting off (because we haven't made the request yet) we would have to initialize the model like this:

```elm
initialModel : Model
initialModel =
    { articles = []
    }
```

This looks fine, but this strategy does pose some problems. One problem is that there is no way to know whether we are still waiting for the server to respond, or whether there actually are no articles. You could imagine a user being a little scared if we display a message saying "There are no articles" for a second, before we actually get the articles and display them. The user might think that all their articles have been deleted, before realising that the server was just a little slow to respond.

## A Loading Field

One way to distinguish between a request that's still loading, and a request that return an empty list is to add a loading field to our model, like this:

```elm
type alias Model =
    { articles : List Article
    , loading : Bool
    }
```

We can then initalize the `loading` field to be `True`, and when the request is finished, we set the `loading` field to be `False`. That way we can show nothing, or maybe a loading spinner, until the request is done.

But "loading" and "not loading" is not the only two states our app can be in: what if the request fails? In that case we would have to set the `loading` field to be `False`, since we are no longer loading, but then the user would _definitely_ think that all their articles were gone. Even if the problem was only that they lost their internet connection for a second.

## An Error Field

To solve this issue, we could add _another_ field to our model, called `error`. This field could also be a `Bool`, and be set to `False` unless the request failed. But maybe we want to keep the actual error in our model, to display different error messages, depending on what kind of error we got? In that case we could make the `error` field a `Maybe Http.Error`, and if the `error` field was `Nothing` then the request succeeded (or is still loading), and if the `error` field is a `Just Http.Error`, then the request failed:

```elm
type alias Model =
    { articles : List Article
    , loading : Bool
    , error : Maybe Http.Error
    }
```

This solves our problems, but is kind of unruly to manage. Imagine for instance that we needed to make 3 network requests in our app, then we would have to have _9_ fields to manage all this state, which would make the model a little bloated and hard to deal with. Also, there is another problem that this approach causes.

## Impossible States

In Richard Feldman's [brilliant talk from 2016](https://youtu.be/IcgmSRJHu_8), he explains the concept of making impossible states impossible. Or said in another way: to make sure that only valid states are representable. Our approach thus far does not achieve to do that. Take for instance the following model:

```elm
    { articles = [ article1, article2 ]
    , loading = False
    , error = Just Error
    }
```

What does this mean? We have a list of articles, but we also have an error. Did the request succeed or fail? Your guess is as good as mine. And what about this one:

```elm
    { articles = []
    , loading = True
    , error = Just Error
    }
```

We are still loading, but we have an error? How did we manage to do that? I don't know, but there is probably a bug that makes this happen.

How our app responds to this model is anyone's guess, but it's a recipe for disaster. And while we _could_ just be extra diligent, and double check that we never end up in this state, wouldn't it be better if it was _impossible_ to end up in this state?

## Making Impossible States Impossible

In Richard Feldman's [brilliant talk from 2016](https://youtu.be/IcgmSRJHu_8), he explains the concept of making impossible states impossible. Or said in another way: to make sure that only valid states are representable. Our approach thus far does not achieve to do that.

The problem is that we have three fields that can be changed independently, but that are actually not independent of one another. To solve this, we can replace all three fields with just a single field `articles`, of type `RemoteArticles`, which we define like this:

```elm
type RemoteArticles
    = Loading
    | Failure Http.Error
    | Success (List Article)
```

This one custom type allows for all the states that we want to be able to represent, and does not allow for any of the states that we want to be unrepresentable. The article request is either still loading, _or_ it has failed with an error, _or_ it has succeeded, in which case we have a list of articles.

To use our articles, for instance in the view, we just have to pattern match on the field:

```elm
viewRemoteArticles : RemoteArticles -> Html a
viewRemoteArticles remoteArticles =
    case remoteArticles of
        Loading ->
            viewLoadingSpinner

        Failure error ->
            viewFailure error

        Success articles ->
            viewArticles articles
```

