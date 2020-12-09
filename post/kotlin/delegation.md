---
calendar: kotlin
post_year: 2020
post_day: 18
title: Delegation
links:
  - url: https://kotlinlang.org/docs/reference/delegation.html
    title: Delegation
authors:
  - Matias Vinjevoll
---
Both object composition and inheritance are mechanisms that enable code reuse. While composition makes code
reusable by composing objects with smaller well-defined behaviours into larger and more complex objects, inheritance
makes code reusable by building class hierarchies where common behaviours are defined lower down in the hierarchy.

The delegation pattern is a design pattern based on object composition, where an object is delegating the work to
other objects it has reference to. This might make it look like inheritance from the outside. A disadvantage with the
delegation pattern is that it gives more boilerplate code in some languages. This is not the case for Kotlin,
having first class support for the delegation pattern, applied using the `by` keyword. Let's walk through an
example which demonstrates this.

We will use the example of an API to retrieve and submit wish lists, where we are going to implement a client to
consume this API:

```kotlin
interface HealthCheck {
    fun healthy(): Boolean
}

interface WishListClient : HealthCheck {
    fun submitWishList(wishList: List<String>): Unit
    fun retrieveWishList(): List<String>
}
```

First, we have an interface `HealthCheck`, to check if the API is responding. Second, we have an interface
`WishListClient`, defining the operations of the API, where we can submit and retrieve our wish list.

Below, we have an implementation of the `WishListClient` as an http client:

```kotlin
class WishListHttpClient(
    val url: String,
    val httpClient: HttpClient
) : WishListClient {

    override fun submitWishList(wishList: List<String>): Unit {
        httpClient
            .post(url = "$url/api/wishlist", body = wishList)
    }

    override fun retrieveWishList(): List<String> {
        return httpClient
            .get<List<String>>(url = "$url/api/wishlist").body
    }

    override fun healthy(): Boolean {
        return httpClient
            .get<Unit>(url = "$url/ping").status == 200
    }
}
```

For this example, the implementation is stripped down to save space and for readability, but it will hopefully be
realistic enough to make sense. The actual http calls are _delegated_ to some `HttpClient`, _composed_ as a constructor
parameter to `WishListHttpClient`. We do not delegate directly to the `HttpClient`, we provide information about the
url, and in a real world implementation, we might have some more logic to handle the request and the response.
Here is how the stripped down HttpClient interface looks like:

```kotlin
interface HttpClient {
    data class Resp<T>(val body: T, val status: Int)
    
    fun <T> get(url: String): Resp<T>
    fun <T> post(url: String, body: T): Unit
}
```

Now, the implementation looks quite ok, but the next time we are going to implement an http client, it is likely
that we would like to have a health check for that client as well. The only thing which will vary between the
implementation of `healthy` for different clients is the url, so let's split the health check to its own
implementation to work for arbitrary endpoints:

```kotlin
class HttpHealthCheck(
    val url: String,
    val httpClient: HttpClient
) : HealthCheck {
    
    override fun healthy(): Boolean {
        return httpClient
            .get<Unit>(url = url).status == 200
    }
}
```

We can now change the `WishListHttpClient` to provide the health check functionality by composition, and delegate
the functionality:

```kotlin
class WishListHttpClient(
    val url: String,
    val httpClient: HttpClient,
    val healthCheck: HealthCheck
) : WishListClient {

    override fun submitWishList(wishList: List<String>): Unit {
        httpClient
            .post(url = "$url/api/wishlist", body = wishList)
    }

    override fun retrieveWishList(): List<String> {
        return httpClient
            .get<List<String>>(url = "$url/api/wishlist").body
    }

    override fun healthy(): Boolean {
        return healthCheck.healthy()
    }
}
```

There is some boilerplate with the healthy function, which is only delegating to the `healthCheck` instance with no other
logic. That's where the delegation pattern in Kotlin comes in:

```kotlin
class WishListHttpClient(
    val url: String,
    val httpClient: HttpClient,
    val healthCheck: HealthCheck
) : WishListClient, HealthCheck by healthCheck {

    override fun submitWishList(wishList: List<String>): Unit {
        httpClient
            .post(url = "$url/api/wishlist", body = wishList)
    }

    override fun retrieveWishList(): List<String> {
        return httpClient
            .get<List<String>>(url = "$url/api/wishlist").body
    }
}
```

When using the `by` keyword in the implementation of `HealthCheck`, referring to the `healthCheck` instance, the
compiler will generate the method `healthy` in `WishListHttpClient` like in the previous version.

With the current implementation, it would be a bit complicated to create an instance of `WishListHttpClient`, which
would look something like this, given a `url` and an instance of `HttpClient`:

```kotlin
WishListHttpClient(url, httpClient, HttpHealthCheck("$url/ping", httpClient))
```

Instead of delegating an instance of `HealthCheck` given as a constructor argument, we can delegate a new
instance directly:

```kotlin
class WishListHttpClient(
    val url: String,
    val httpClient: HttpClient
) : WishListClient,
    HealthCheck by HttpHealthCheck("$url/ping", httpClient) {

    override fun submitWishList(wishList: List<String>): Unit {
        httpClient
            .post(url = "$url/api/wishlist", body = wishList)
    }

    override fun retrieveWishList(): List<String> {
        return httpClient
            .get<List<String>>(url = "$url/api/wishlist").body
    }
}
```


In this case, this gives better control of the url for `/ping` and `/api` since they are now defined in the same place,
and it will be easier to instantiate given a `url` and an instance of `HttpClient`:
```kotlin
WishListHttpClient(url, httpClient)
```

A probable scenario is that we would like to add a cache to the `retrieveWishList` function to lower the number
of requests to the API. We can do this with minimal effort, creating a new class that delegates to an instance of
`WishListClient`, only overriding the `retrieveWishList` function to add caching:

```kotlin
class WishListCachedHttpClient(
    val myClient: WishListClient
) : WishListClient by myClient {

    override fun retrieveWishList(): List<String> {
        // get from cache or...
        return myClient.retrieveWishList()
    }
}
```

This article has shown some ways to use the built in delegation feature in Kotlin, and hopefully it might have been helpful
in identifying cases where delegation can be useful. There are also other use cases for delegation i Kotlin, with
[delegated properties](https://kotlinlang.org/docs/reference/delegated-properties.html).