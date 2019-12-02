---
calendar: kotlin
post_year: 2019
post_day: 13
title: 'WIP:Disecting the details of working with coroutines'
authors:
  - Vetle Bu Solgård
---
Coroutines are made up of more than the coroutine builder `launch {}`, this must be launched in a coroutine context, and might have to run on a specific dispatcher. What if we want to cancel coroutines? Can coroutines coexist with components with a lifecycle? Read on to get a brief explanation of the much needed details when working with coroutines.

So lets start with the most basic way we can start a coroutine.

```kotlin
fun main() {
    GlobalScope.launch {        
        // Do stuff async😎
    }
}
```

As we have already learned, the coroutine builder `launch {}` starts up a coroutine and executes everything inside the launch-block asynchronously from the main-thread. So what is `GlobalScope` and why do we need it? 🤔


## Scope 🔭

`GlobalScope` is a `CoroutineScope` which all coroutine builders (like `CoroutineScope.launch`) are an extension of. The scope of a coroutine is often bound to a `Job` which has a lifecycle, and is cancellable.

All `CoroutineScope`s should be implemented in components with a lifecycle, meaning that the lifetime of the `CoroutineScope` is limited. We don't want coroutines to run when they are not needed to.

Like you probably guessed `GlobalScope` is a type of `CoroutineScope`, but is global and is not bound to any job. This scope lives as long as your application does so you would want to avoid starting coroutines in this scope if you want your coroutines to have a more limited lifecycle.

An example of such a lifecycle aware component is an `Activity` in Android. An Activity can basicly just be a full screen window in your application. When we implement a `CoroutineScope` in an `Activity` we (most likely) don't want to have any coroutines running and doing work for that screen when we leave it.

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

You may also notice that we don't need to supply the scope when using the coroutine builder `launch {}` here. That is because launch is here an extension on the `Activity` because it implements a `CoroutineScope`.

Nice transition to Dispatchers.

## Dispatchers 🔧🔨⛏



