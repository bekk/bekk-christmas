---
calendar: functional
post_year: 2019
post_day: 15
title: Map and bind - A hidden functional concept in C#
ingress: >-
  In this post, I'll show that C\# implements the functional concepts
  `map` and `bind`. I'll further show that these are useful for other
  contexts than just collections with an example implementation for
  `Task<T>`. We'll then clean up a process by using `map` and `bind` to
  compose a new process of several smaller processes. Hopefully this will
  show that functional concepts both exists and are useful even in
  non-functional languages.

authors:
  - Simen Endsjø
---

The function `map` will transform some value in a context, potentially
changing the type, but stay in the same context. Most languages doesn't
have a way to talk about "some context", and will implement the function
for each context, and the only similarity between them will be the name
`map` as the language isn't able to express this function.

C\# is such a language, but even if we're unable to create a generic
interface that states "this context implements map", we can still
implement a method with the same name which operates the same way.

In C\#, we have `IEnumerable<T>` which is an interface that supports
enumerating over the elements in a collection. The mapping function for
this interface is implemented as an extension method, and is named
`Select` rather than `map`.

``` csharp
IEnumerable<TResult> Select<TSource,TResult>(
    this IEnumerable<TSource> source,
    Func<TSource,TResult> selector);
```

This could have been called `Map` instead, but Microsoft implemented
this as a part of the Language Integrated Query feature (iirc), and
modeled it after SQL where it's called `select` and `where` rather than
`map` and `filter`. I'll use the functional name and C\#s name
interchangeably, so if you wonder what I'm talking about, refer to this
table

| X            | also X |
| ------------ | ------ |
| Select       | map    |
| SelectMany   | bind   |
| ContinueWith | bind   |
| andThen      | bind   |
| Where        | filter |
| flatten      | join   |
| unwrap       | get    |

If C\# supported the "some context" feature, the above code could look
more like the following pseudo-C\#

``` csharp
TMappable<TResult> Select<TMappable<TSource>,TMappable<TResult>>(
    this TMappable<TSource> source,
    Func<TSource,TResult> selector);
```

So we're unable to express this, but let's revisit what `map` actually
does; it lets you transform something in some context, but stay in the
same context. This is a feature we should be able to implement for
various different contexts, and languages which supports this actually
does so (it's called `Functor` in other languages).

One useful context I've implemented `map` for is `Task`. A `Task` is an
asynchronous operation that you can start in the background and wait for
the result when you need it. Often you'll also want to post-process the
result before continuing as is the case when fetching data from a
database or a web API. C\# doesn't implement `map` on `Task`, but they
have implemented a more powerful function called `ContinueWith` we can
use to build our `map`.

This is our implementation of `map`. It will transform the value within
the `Task` in the same way the operation with the same name does on a
collection.

``` csharp
Task<TB> Select<TA, TB>(this Task<TA> x, Func<TA, TB> f) =>
  x.ContinueWith(t => {
    // We can't map values which doesn't exist
    if (t.IsFaulted) {
      ExceptionDispatchInfo.Capture(t.Exception.InnerException).Throw();
      return default; // We never get here as we throw above
    } else if (t.IsCanceled) {
      throw new OperationCanceledException();
    } else {
      // We have a result, and we can map it
      return f(t.Result);
    }}, TaskContinuationOptions.RunContinuationsAsynchronously);
```

Well, this was a bit of an anti-climax :/ But fear not as we'll use our
"new" functionality in order to implement another very useful operation
called `bind`\!

Let's look at another feature of `IEnumerable` called `SelectMany`. Much
like `Select`, it will transform each value in the enumerable, but
instead of returning a simple value, it returns the value wrapped in
another enumerable. It will then flatten (also called `join`) the result
so we don't have `IEnumerable<IEnumerable<TResult>>`.

``` csharp
IEnumerable<TResult> SelectMany<TSource,TResult>(
  this IEnumerable<TSource> source,
  Func<TSource, IEnumerable<TResult>> selector);
```

But in the same way we wanted to generalize `Select` for `TSomeContext`,
`SelectMany` could also have been generalized.

``` csharp
TSomeContext<TResult> SelectMany<TSomeContext<TSource>,TSomeContext<TResult>>(
  this TSomeContext<TSource> source,
  Func<TSource, TSomeContext<TResult> selector);
```

Let's look at an example where we usually could get a
`TSomeContext<TSomeContext<T>>`.

``` csharp
Task<Json> fetch = FetchSomeWebStuff();
// possibly more work
Json nextUrl = FetchNextUrl(fetch.Result); // Blocks here
Task<Url> next = FetchFromNextPage(nextUrl);
// possibly even more work
Result result = next.Result; // Blocks
```

We could wrap the specific things inside a new `Task` so we get all code
specific to this process in one place and not interleaved with unrelated
code.

``` csharp
var myProcess = Task.Run(() => {
  Task<Json> fetch = FetchSomeWebStuff();
  Json nextUrl = FetchNextUrl(fetch.Result);
  Task<Url> next = FetchFromNextPage(nextUrl);
  Result result = next.Result;
  return result;
});
// possibly more work
Result result = myProcess.Result; // Blocks
```

But if we squint a little, we see that we transform the output from the
first, and then use this to create a new Task. This sounds a bit like
`map` followed by `join`. And the combination of these two is called
`bind` (or `SelectMany`).

We start by creating a function to extract the value from the task. This
already exists as `Result`, so we just wrap it for kicks.

``` csharp
// Remember that T can be anything, even something complex as Task<Task<string>>
T Unwrap<T>(this Task<T> task) {
  try {
    return task.Result;
  } catch (AggregateException ex) {
    if (ex.InnerExceptions.Count == 1) {
      ExceptionDispatchInfo.Capture(ex.InnerException).Throw();
      throw; // We never get here as we throw above
    }
    throw;
  }
}
```

`join` / `flatten` will just remove one layer of the context.

``` csharp
Task<T> Join<T>(this Task<Task<T>> x) =>
  x.Unwrap();
```

And we can implement `SelectMany` in terms of these

``` csharp
Task<TB> SelectMany<TA, TB>(this Task<TA> x, Func<TA, Task<TB>> f) =>
  x.Select(f).Join();
```

Our example thus becomes

``` csharp
var myProcess =
    FetchSomeWebStuff() // Task<Json>
      .Select(FetchNextUrl) // Task<Url>
      .SelectMany(FetchFromNextPage); // Task<Result>
// possibly more work
var result = myProcess.Result; // Blocks
```

Tada\! We have shown that `Select` is the same as `map` and `SelectMany`
is the same as `bind`, and we've implemented these for `Task` to allow
composing operations the same way as we usually do for `IEnumerable`.

Now try to implement `Select` and `SelectMany` for `Nullable<T>`\!

PS: Notice that we implemented `map` (`Select`) in terms of `bind`
(`ContinueWith`). It is possible to implement `map` in terms of `bind`
for anything which implements `bind`.

PPS: `Task.FromResult` (often called `pure` or `return`, which would be
confusing in C\#) will put something in a task which would be returned
when `Result` is called. This way you can mix in other processes in code
that operates on `Task`. This method, together with `bind`
(`ContinueWith`) pretty much makes `Task` into a `Monad` without looking
like scary category theory.
