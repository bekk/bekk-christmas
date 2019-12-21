---
calendar: functional
post_year: 2019
post_day: 23
title: Making a small Haskell application
---

[Haskell](https://www.haskell.org/) is a programming language that a lot of people use to learn functional programming and solve
programming exercises. But not as many take the leap to use Haskell for practical projects.
To try to help to bridge this gap, I will walk through how to create a "practical" Haskell application. 
This is if course not the only way to do it and there are alternatives to everyapproach I am using, but
this is what I find most suitable for a small easy-to-understand project.

The application we are going to make is pretty simple, it should just output the current Bitcoin rate. 
Even though it is not a complex project, it will hopefully give an overview of how to use Haskell in other contexts than programming exercises.

To do this, we will take a look at the following aspects

* How to create and build a Stack project with added dependencies
* How to make a simple HTTP request in Haskell
* How to use lenses to extract values inside a nested JSON object


First we need to create and set up our project.

## Stack

We will be using [Stack](https://docs.haskellstack.org/en/stable/README/), a cross-platform program for developing Haskell projects. 

[Installation instructions](https://docs.haskellstack.org/en/stable/README/#how-to-install) are available if you don't have stack installed and want to follow along.

### New stack project

`stack new bitcoin simple-hpack`
creates a new project for us, named bitcoin, based on a template which uses [hpack](https://github.com/sol/hpack#readme).

This will create a bare bones project for us.
```shell
> ls
LICENSE         Setup.hs        bitcoin.cabal     stack.yaml
README.md       package.yaml    src             stack.yaml.lock
```
We can ignore most of these files for now.
The source code of our project resides inside `src`
```shell
> ls src
Main.hs
```

If we look at our main file `src/Main.hs`, it is a simple "hello world" application where `main` just prints the string "hello world". 

```haskell
module Main where

main :: IO ()
main = do
  putStrLn "hello world"
```

To build our project we run `stack build`.
If you haven't used stack before, this will download an appropriate GHC version.
After this is done, we can execute the project by `stack exec bitcoin`

```
> stack build

> stack exec bitcoin
hello world
```
As expected, the output is "hello world".

Now, lets add some dependencies.

### Dependencies

`package.yaml` is the configuration file of our project, like `package.json` is in npm projects.

```yaml
name:                bitcoin
version:             0.1.0.0
#synopsis:
#description:
homepage:            https://github.com/githubuser/bitcoin#readme
license:             BSD3
author:              Author name here
maintainer:          example@example.com
copyright:           2019 Author name here
category:            Web
extra-source-files:
- README.md

dependencies:
  - base >= 4.7 && < 5

executables:
  bitcoin:
    source-dirs:      src
    main:             Main.hs
```

We see here that our only dependency is `base`, the Haskell standard library.
To fetch data using HTTP and work with JSON data, we need to add the following packages to our
dependencies list:

* [lens](http://hackage.haskell.org/package/lens) and [lens-aeson](http://hackage.haskell.org/package/lens-aeson) :
    To easily work with JSON data using lenses

* [bytestring](http://hackage.haskell.org/package/bytestring) and [text](http://hackage.haskell.org/package/text):
    Different string representations. Needed to work with http requests and JSON

* [http-conduit](http://hackage.haskell.org/package/http-conduit) : HTTP client


```yaml
dependencies:
  - base >= 4.7 && < 5
  - lens
  - lens-aeson
  - bytestring
  - text
  - http-conduit
```


After we have added these dependencies to `package.yaml`, run `stack build` to install all the dependencies.

## Rapid development
One of my favorite Haskell tools is [ghcid](https://github.com/ndmitchell/ghcid).
It provides an easy and fast way to compile and run Haskell projects when you save any changes, which helps speed up development time.
To install ghcid : run `stack install ghcid`.

For our project we can use the command `ghcid -r` , which will compile the project and run the main function when you save any changes.

A decent alternative if you don't want to install `ghcid`, albeit not as fast, is 
```
stack build --exec bitcoin --file-watch --fast
```


Now we are ready to start developing our application.
Let's start by making an HTTP request!

## Making an HTTP request

The purpose of our application is to output the current Bitcoin rate.
The API endpoint with the data we want is https://api.coindesk.com/v1/bpi/currentprice.json, and is provided by [Coindesk](https://www.coindesk.com/).

It responds with JSON on this form:
```js
{
    time: {
        updated: "Dec 6, 2019 11:45:00 UTC",
        updatedISO: "2019-12-06T11:45:00+00:00",
        updateduk: "Dec 6, 2019 at 11:45 GMT"
    },
    disclaimer: "This data was produced from the CoinDesk Bitcoin Price Index (USD). Non-USD currency data converted using hourly conversion rate from openexchangerates.org",
    chartName: "Bitcoin",
    bpi: {
        USD: {
            code: "USD",
            symbol: "&#36;",
            rate: "7,367.4400",
            description: "United States Dollar",
            rate_float: 7367.44
        },
        GBP: {
            code: "GBP",
            symbol: "&pound;",
            rate: "5,611.1381",
            description: "British Pound Sterling",
            rate_float: 5611.1381
        },
        EUR: {
            code: "EUR",
            symbol: "&euro;",
            rate: "6,640.9441",
            description: "Euro",
            rate_float: 6640.9441
        }
    }
}
```

Lets start by fetching JSON from this endpoint in our Haskell program.

```haskell
{-# LANGUAGE OverloadedStrings #-}

module Main where

import           Network.HTTP.Simple            ( httpBS, getResponseBody )               
import qualified Data.ByteString.Char8         as BS


fetchJSON :: IO BS.ByteString
fetchJSON = do
  res <- httpBS "https://api.coindesk.com/v1/bpi/currentprice.json"
  return (getResponseBody res)


main :: IO ()
main = do
  json <- fetchJSON
  BS.putStrLn json
```

Lets walk through over code :

* The language extension `OverloadedStrings` makes literal strings more flexible. In our case it makes so that our URL is automaticly parsed into a `Request`, which simplifies our HTTP request.
* Then we have some imports that allows us to make HTTP requests and work with bytestrings.
* `fetchJSON` fetches the JSON from the URL by making an HTTP request and then returns the response body
* in `main`, we use `fetchJSON` to get our JSON as a ByteString, and then we print it
  

This will output : 

```json
{"time":{"updated":"Dec 4, 2019 14:31:00 UTC","updatedISO":"2019-12-04T14:31:00+00:00","updateduk":"Dec 4, 2019 at 14:31 GMT"},"disclaimer":"This data was produced from the CoinDesk Bitcoin Price Index (USD). Non-USD currency data converted using hourly conversion rate from openexchangerates.org","chartName":"Bitcoin","bpi":{"USD":{"code":"USD","symbol":"&#36;","rate":"7,512.2717","description":"United States Dollar","rate_float":7512.2717},"GBP":{"code":"GBP","symbol":"&pound;","rate":"5,736.1077","description":"British Pound Sterling","rate_float":5736.1077},"EUR":{"code":"EUR","symbol":"&euro;","rate":"6,763.3583","description":"Euro","rate_float":6763.3583}}}
```

We have managed to fetch and print JSON.
Great!

Now we need to extract the correct values.

## Working with JSON

We want to get the Bitcoin rate in USD.
In Javascript this would be something like `json.bpi.USD.rate`.

To do that in Haskell, we will use [lenses](http://hackage.haskell.org/package/lens-4.18.1).

### Extracting data from our JSON object using Lenses

[Data.Lens.Aeson](http://hackage.haskell.org/package/lens-aeson-1.1/docs/Data-Aeson-Lens.html) lets us work with JSON data[1], by providing lenses[2] for a Haskell
representation of JSON objects.


Data.Lens.Aeson provides `key`, which focuses on a property value. So we start by focusing on `bpi`, by using `key "bpi"`.
[preview](http://hackage.haskell.org/package/lens-4.18.1/docs/Control-Lens-Fold.html#v:preview) allows us to "get" a value that is possibly missing.

Lenses are a complex subject, and the details of lenses are outside the scope of this short blog post. The basic idea however can be seen as `functional getters and setters`, and
an intro to this was posted earlier in this series, [The Lens Pattern in TypeScript](https://functional.christmas/2019/6).
Even though it uses TypeScript, and not Haskell, it can help to understand the motivations behind lenses.

Our use of lenses will probably become clearer with some actual code.
So lets try to work our way into the value we want:
```haskell
> preview (key "bpi") json
Just (Object (fromList [("USD",Object (fromList [("rate_float",Number 7364.12),("symbol",String "&#36;"),("rate",String "7,364.1200"),("code",String "USD"),("description",String "United States Dollar")])),("EUR",Object (fromList [("rate_float",Number 6637.9515),("symbol",String "&euro;"),("rate",String "6,637.9515"),("code",String "EUR"),("description",String "Euro")])),("GBP",Object (fromList [("rate_float",Number 5608.6095),("symbol",String "&pound;"),("rate",String "5,608.6095"),("code",String "GBP"),("description",String "British Pound Sterling")]))]))
```

The `json` bytestring is now converted to a Haskell representation of JSON, but if we look really hard, we can see
that we have the value for the `bpi` property.

We now want to go into the `USD` property value. To do that, we compose `key "bpi"` with `key "USD"`[3]:
```haskell
> preview (key "bpi" . key "USD")
Just (Object (fromList [("rate_float",Number 7364.12),("symbol",String "&#36;"),("rate",String "7,364.1200"),("code",String "USD"),("description",String "United States Dollar")]))
```

Then into the `rate` property value:
```haskell
> preview (key "bpi" . key "USD" . key "rate")
Just (String "7,364.1200")
```

We see here that we get `String "7,364.1200"`, but we want `"7,364.1200"`.
We can then use `_String`.

```haskell
> preview (key "bpi" . key "USD" . key "rate" . _String)
Just "7,364.1200"
```
We made it!
Now we have successfully extracted the bitcoin rate in USD from the json bytestring.
We put this functionality into a function `getRate` and then the whole program is now:

```haskell
{-# LANGUAGE OverloadedStrings #-}

module Main where

import           Network.HTTP.Simple            ( httpBS, getResponseBody )
import           Control.Lens                   ( preview )
import           Data.Aeson.Lens                ( key, _String )
import qualified Data.ByteString.Char8         as BS
import           Data.Text                      ( Text )


fetchJSON :: IO BS.ByteString
fetchJSON = do
  res <- httpBS "https://api.coindesk.com/v1/bpi/currentprice.json"
  return (getResponseBody res)

getRate :: BS.ByteString -> Maybe Text
getRate = preview (key "bpi" . key "USD" . key "rate" . _String)


main :: IO ()
main = do
  json <- fetchJSON
  print (getRate json)
```

which outputs 

```json
Just "7,364.1200"
```

## Finishing up the application and error handling

To account for the possibility of the rate not being present, we do a pattern match using a case expression.
If we get `Nothing`, which means that we could not find the Bitcoin rate, we print an error message.
If we succesfully get `Just rate`, we print a string along with the rate.

```haskell
{-# LANGUAGE OverloadedStrings #-}

module Main where

import           Network.HTTP.Simple            ( httpBS, getResponseBody )
import           Control.Lens                   ( preview )
import           Data.Aeson.Lens                ( key, _String )
import qualified Data.ByteString.Char8         as BS
import           Data.Text                      ( Text )
import qualified Data.Text.IO                  as TIO



fetchJSON :: IO BS.ByteString
fetchJSON = do
  res <- httpBS "https://api.coindesk.com/v1/bpi/currentprice.json"
  return (getResponseBody res)

getRate :: BS.ByteString -> Maybe Text
getRate = preview (key "bpi" . key "USD" . key "rate" . _String)


main :: IO ()
main = do
  json <- fetchJSON

  case getRate json of
    Nothing   -> TIO.putStrLn "Could not find the Bitcoin rate :("
    Just rate -> TIO.putStrLn $ "The current Bitcoin rate is " <> rate <> " $"
```

* We need to use `putStrLn` from [Data.Text.IO](http://hackage.haskell.org/package/text-1.2.4.0/docs/Data-Text-IO.html#v:putStrLn) because `rate` is of type `Text` and `putStrLn` from [Prelude](https://hackage.haskell.org/package/base-4.12.0.0/docs/Prelude.html#v:putStrLn) only works with `String`.

* `<>` is used to append the three `Text` values together.

We can now execute our final program.
```
> stack build 
> stack exec bitcoin
The current Bitcoin rate is 7,082.7683 $
```

It works as expected :)

Which means that we are done.

## Conclusion


I hope this walk through gave you some insight into how to you can use Haskell in a somewhat practical context.
And perhaps inspire you to create a personal project using Haskell.


### Github

The project source code is available at [Github](https://github.com/morteako/bitcoin).


### Footnotes
[1] : For more robust JSON decoding, a better alternative is [aeson](https://hackage.haskell.org/package/aeson-1.4.6.0/docs/Data-Aeson.html)


[2] : The optics used in this article are not actually lenses, but [traversals](https://hackage.haskell.org/package/lens-4.18/docs/Control-Lens-Traversal.html#t:Traversal) and [prisms](http://hackage.haskell.org/package/lens-4.18.1/docs/Control-Lens-Prism.html)

