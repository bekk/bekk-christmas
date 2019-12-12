---
calendar: kotlin
post_year: 2019
post_day: 13
title: Disecting the very important details of coroutines
ingress: ''
description: ''
authors:
  - Vetle Bu Solgård
---
If you missed the introduction to coroutines you can head over to the first part of the blogpost [here](https://kotlin.christmas/2019/12) 👈

Coroutines are made up of more than the coroutine builder `launch {…}`, a coroutine builder must be called in a **coroutine context**, and might have to be run by a specific **dispatcher**. What if we want to cancel coroutines? Can coroutines coexist with components with a lifecycle? Read on to get a brief explanation of the much needed details when working with coroutines.

So lets start with the most basic way we can start a coroutine.

```kotlin
fun main() {
    GlobalScope.launch {        
        // Do stuff async😎
    }
}
```

As we have already learned, the coroutine builder `launch {…}` starts up a coroutine and executes everything inside the launch-block asynchronously from the main-thread. So what is `GlobalScope` and why do we need it? 🤔


## CoroutineScope 🔭

`GlobalScope` is a `CoroutineScope` which all coroutine builders (like `CoroutineScope.launch`) are an extension of. The scope of a coroutine is often bound to a `Job` which has a lifecycle, and is cancellable.

All `CoroutineScope`s should be implemented in components with a lifecycle, meaning that the lifetime of the `CoroutineScope` is limited. We don't want coroutines to run when they don't need to.

Like you probably guessed `GlobalScope` is not bound to any local component with a lifecycle, but is global and is not bound to any job. This scope lives as long as your application does, meaning that if you start a coroutine from this scope it can potentially run as long as your application. You would often want to avoid starting coroutines in this scope if you want your coroutines to have a more limited lifecycle. It seems apparent that the more concise the lifetime of a coroutine is, the easier it becomes to understand it's purpose and debug it. 

An example of such a lifecycle aware component is an `Activity` in Android. If you're unfamiliar with the basic building blocks in Android an Activity can basically just be a full screen window in your application. When we implement a `CoroutineScope` in an `Activity` we (most likely) don't want to have any coroutines running and doing work for that screen when it is not in the foreground of the application.

To avoid running work on a screen that the user has left, the `CoroutineScope` is attached to the `Activity`'s lifecycle. So when the user leaves the screen and the `Activity` finish, all coroutines in the scope attached to the `Activity` are cancelled. In activities, the function `onDestroy()` is called when the `Activity` finishes.

```kotlin
class MyActivity : Activity(), CoroutineScope {

    private val coroutineContext = Dispatchers.Default + SupervisorJob()

    private fun showUIStuff() = launch {
        // Shows UI stuff on this screen
    }

    override fun onDestroy() {
        cancel() // Extension on CoroutineScope
    }
}
```

All coroutines are started from the `CoroutineScope` and when we cancel the `CoroutineScope`, all coroutines started within this scope is cancelled. So when the user exits the screen in the application and the activity finishes, all coroutines affiliated with this component will cancel.

You may also notice that we don't need to supply the scope when using the coroutine builder `launch {}` in the code snippet above. That is because launch is an extension on the `Activity` because it implements the interface `CoroutineScope`. If we were to run the code above we would crash the instance the `Activity` is told to show UI stuff (`fun showUIStuff()`). Why?🤨 

Since all interference with the UI needs to run on the Main thread this will not run and this is because it is on the wrong `Dispatcher`. To make the code above runnable there is one small, but very important change we need to make. We need to tell the coroutine we're running to run it on the `Main` `Dispatcher`, like so:

```kotlin
fun showUIStuff() = launch{…} 
// ->
fun showUIStuff() = launch(Dispatchers.Main) {…}
```


## Dispatchers 🔧🔨⛏

So what is a `CoroutineDispatcher` and why do they exist?  Very simply explained, the `CoroutineDispatcher` tells the coroutine which type of threads to use for the execution of the coroutine block. Depending on what operation we wish to execute in our coroutine we need a specific thread dispatcher.

As we've previously learned coroutines have the ability to suspend. All coroutines are run by a dispatcher and it is the dispatcher that has the responsibility to resume them. The various `Dispatchers` are thread dispatchers that are specialised to do the various kinds of operations that they're created for.

In kotlin we have three main types of `Dispatchers`, these are the `Main`, the `IO`, and the `Default` dispatcher. They all have respective types of operations for which they are responsible and are specialised to execute.

### Main dispatcher
The `Dispathers.Main` have the responsibility of handling operations that needs to run on the main thread. Such as the mentioned function of showing UI, or manipulating the UI in an application. If we do not use the `Main` dispatcher for operations such as this we will actually crash runtime, so these are operations that are very important to be run by the correct dispatcher.

### IO dispatcher
This dispatcher is optimized for and should handle all events that deals with input/output and network operations. These include calls to an API like fetching data, reading/writing to/from disk, and operations that include communication with a database.

### Default dispatcher
The `Default` dispatcher is the dispatcher that is selected when no dispatcher is specified when running a coroutine. It is the dispatcher we would want to assign when doing CPU intensive work such as sorting lists, pasing JSON and other such operations.

Now that we have gathered some knowledge about the three main dispatchers in the coroutine library, let's remake the above `Activity` to make it run. Furthermore, let's also define some functions to add some functionality for fetching data, and displaying this to the UI. To define the dispatcher for a specific function we use the keyword `withContext() {…}`.

```kotlin
class MyActivity : Activity() {

    fun initialise() = lifecycleScope.launch { 
        //The default dispatcher is selected when no other is specified
        val images = fetchImages()
        showImages(images)
    }

    // Switches to IO dispatcher for network operation
    private suspend fun fetchImages() = withContext(IO) {
        api.getImages()
    }
    
    // Switches to Main dispatcher for operation on the Main thread
    private suspend fun showImages(images: Images) = withContext(Main) {
        show(images)
    }
}
```
Best practice when working with dispatchers is to specify a desired dispatcher on the smallest scope possible. This ensures that all coroutine calls is run by the desired and correct dispatcher. Because of this and readability, make suspend functions that uses `withContext()` to switch context to the desired dispatcher that you want to do your work on.

Another thing we have changed here that is different from the `MyActivity` above is that the `MyActivity` no longer extends `CoroutineScope`. This is because we no longer need to specify and create the `CoroutineScope` for all components with lifecycle in Android. Since android added the lifecycle part of the androidx library (`androidx.lifecycle:lifecycle-*`) they now handle how to connect the `CoroutineScope` with the lifecycle of the component. All we have to do is reference the current coroutine scope (`lifeCycleScope`) and use the coroutine builder `launch {…}` and the coroutine will live and die with the `Activity` automatically.
