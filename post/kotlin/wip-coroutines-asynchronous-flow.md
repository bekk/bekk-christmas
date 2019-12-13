---
calendar: kotlin
post_year: 2019
post_day: 14
title: "Coroutines channels\U0001F525 and flow❄️"
links:
  - title: "A very good resource on Channels and asynchronous flow is Roman Elizarov's talk on KotlinConf this year in Copenhagen (I was there!\U0001F929)"
    url: 'https://youtu.be/E4F0YU8Jd5g?t=4897'
  - title: Kotlin docs on channels
    url: 'https://kotlinlang.org/docs/reference/coroutines/channels.html'
  - title: Kotlin docs on flows
    url: kotlinlang.org/docs/reference/coroutines/flow.html
authors:
  - Vetle Bu Solgård
---
If you missed the two previous articles on coroutines you can read the first [here](https://kotlin.christmas/2019/12)👈 and the second 👉[there](https://kotlin.christmas/2019/13)

Now that we have learned about basic coroutine properties and know some details on how to work with coroutines is there more to coroutines? Other than very efficient asynchronous operations and great readability, do kotlin coroutines solve other problems as well? Of course!

```kotlin
suspend fun getListOfImages(): List<Image> {
    val images = mutableListOf<Images>()
    val firstImage = api.getFirstImage()
    val secondImage = api.getSecondImage()
    val thirdImage = api.getThirdImage()
    images.add(firstImage)
    images.add(secondImage)
    images.add(thirdImage)
    return images
}

fun main() = runBlocking {
    val images = getListOfImages()
    for (image in images) {
        image.present()
    }
}

suspend fun Image.present() {
    // Shows image😎
}
```

In this code we first get a lot of images from the API, proceeds to put the result together and then returns the result to be presented somewhere in our application. It seems very suboptimal to first get all the images, construct some container for them, and then present them? That doesn't feel very nice😟

We don't really want to wait for the entire result to be retrieved, constructed, and then returned when the first image is available long before the other images. It would be ideal if we were able to process/present the images continuously as each image is retrieved from the API. A solution such as this would apply for any type of collection of responses.

One solution that the kotlin coroutine team came up with for solving these types of problems is the concept of Channels. A `Channel` can be thought of as a pipeline, one point send and the other receive.

```kotlin
suspend fun CoroutineScope.channelOfImages(): ReceiveChannel<Image> = produce {
    send(api.getFirstImage())
    send(api.getSecondImage())
    send(api.getThirdImage())
}

fun main() = runBlocking {
    val imagesChannel = channelOfImages()
    for (image in imagesChannel) {
        image.present()
    }
}
```

The difference between this code snippet and the above is that what was previously `images` is now imagesChannel. We have replaced a list of images with a channel of images. When we iterate over the channel these values will be presented the instance `send(image)` is called in the `channelOfImages()` function. What is happening is that the `channelOfImages()` starts a coroutine and works together with the coroutine in the `runBlocking` scope.

So the code stays about the same as it were before, only now we can process the data the moment it is available from the API. Pretty nice, but there is a problem with `Channels`. They are hot 🔥

A `Channel` is called hot because in practice it stays alive and runs as a coroutine the moment `channelOfImages()` is called. And why is this a problem you say🤔 This could be a problem when the coroutine that is receiving data from the `Channel` suddenly has an exception and are not able to receive anymore. In this case `Channel` will just live on doing nothing because it is unable to send its data to anyone and finish its work. When working with files or network connections this could prove to be a real problem as we will not be able to close either.

🌊Kotlin flow to the rescue! Flows were constructed by the kotlin coroutine team to make up for the error prone `Channel`, and was just stabilised a couple of months ago. If we change our previous code example from working with channels to working with flows it would look like the following code snippet.

```kotlin
suspend fun flowOfImages() = flow {
    emit(api.getFirstImage())
    emit(api.getSecondImage())
    emit(api.getThirdImage())
}

fun main() = runBlocking {
    val imagesFlow = flowOfImages()
    imagesFlow.collect { image ->
        image.present()
    }
}
```

The previous code example which returned a channel of images now returns a flow of images. It uses other words, but looks very similar to the previous example, so what is really the difference?🤔

A huge difference is that `imagesFlow` is just a reference to the `flow` it does not start the flow like the call to `channelOfImages()` further up does. The flow is not activated until `.collect {…}` is called. If we now get an exception in the code calling to collect the flow, or we for some other reason don't call `.collect {…}` our code will run fine.

Because of this, we can be certain that we do not have any open coroutines doing nothing as a result of the call to `flowOfImages()`. This is why we call Kotlin flow entities cold:snowflake:. Cold flows, hot channels.

Flow also have this builder called `flowOf()` where the input parameter is some collection. In the following example we compare the `Collection` approach to the `Flow` approach.

```kotlin
suspend fun listOfNumbers(): List<Int> {
    listOf(1, 2, 3).forEach { number ->
        doMath(number)
    }
}

fun flowOfNumbers(): Flow<Int> = flow {
    flowOf(1, 2, 3).forEach {
        doMath(number)
    }
}
```

Here we have a `suspend` function `listOfNumbers()` and a normal function `flowOfNumbers()`, and there is a significant difference in how these two functions work. When we call `listOfNumbers()` just like the `channelOfImages()` function in an example further up they're called and executed right away. On the other hand, the function `flowOfNumbers()` is not called right away, we just define the flow describing what will be produced. Using flow this way seems to give it a very nice declarative property, making it safer and more predictable.
