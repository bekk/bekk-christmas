---
calendar: kotlin
post_year: 2019
post_day: 12
title: Coroutines intro
links: []
authors:
  - Vetle Bu Solgård
---
Conceptually, coroutines works about the same way as threads do, as both are asynchronous creatures. Just like threads, if you start a coroutine from the main thread, the main thread will keep going while the coroutine will happen asynchronously.

Coroutines are also often used for the same operations as threads; I/O operations, like fetching of data from an API, heavy CPU operation like sorting big lists, and rendering of the graphical user interface in an application.


## Soo what are coroutines🤨

These two things sounds very similar to each other, so what is really the difference? Coroutines use threads, but are not threads. A thread is assigned to a coroutine to execute the content of the coroutine block. When the thread has finished executing the coroutine block, the thread is freed up, and can be assigned to some other coroutine.

The example below show how you in the simplest way possible can make a coroutine. 
```
fun main() {
    GlobalScope.launch {
        // This is launched asynchronouosly 
        delay(1000L)
        print("coroutine world!")
    }
    // Main thread continues
    print("Hello ")
}
```
The above example first starts a coroutine by calling `GlobalScope.launch {}`, the coroutine lives inside the `launch {}` block. While the main thread continues, the coroutine pauses for one second and the resulting print is "Hello coroutine world!".

Some of the benefits of using coroutines over threads is the effectiveness and how manageable coroutines are.


## Soo why is coroutines more effective than threads🧐

Coroutines have the ability to **suspend**, which means putting the coroutine on "hold". By supplying a function with the modifier `suspend` it can effectively be paused when for example waiting for the response of an API call.

```
suspend fun getStuffAsync(): Stuff {
    //Getting stuff
    val stuff = api.getStuff()
    return stuff
}
```

What makes coroutines so much more effective is that while this coroutine suspends, the thread that is assigned to the coroutine is freed and returned to a common pool of vacant threads. So when the call to the API returns with a reponse, a vacant thread is again assigned to the coroutine and can then handle this response.

This way threads never uses space in memory when idle, but is utilized elsewhere while the coroutine waits to continue. Coroutines are therefore very cheap to run memorywise.


## Soo coroutines is easy to work with?🤔

Traditionally a callback has often been used to receive a call returning from an API, like the first function in the example underneath.
```
fun loadInfo() {
    api.fetchInfo() { info ->
        show(info)
    }
}
```
vs.
```
suspend fun loadInfo() {
    val info = api.fetchInfo()
    show(info)
}
```
When using suspend functions everything is written sequencially and becomes very easy to read and especially easy to understand what is happening in the code.

Because coroutines are written sequencially like normal code, and suspend functions are utilized instead of a potensially large chains of callbacks, coroutine code become very readable. 
