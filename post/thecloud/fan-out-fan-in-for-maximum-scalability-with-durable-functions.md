---
calendar: thecloud
post_year: 2019
post_day: 23
title: Fan-out/fan-in for maximum scalability with Durable Functions
authors:
  - Eivind Sorteberg
---
## Fan-out/fan-in

```
      /-x-\
     /--x--\
    /---x---\
---x----x----x---
    \---x---/
     \--x--/
      \-x-/
```

## Function types

### Activities

```csharp
public class MyActivity
{
    [FunctionName(nameof(MyActivity))]
    public async Task<byte> Run([ActivityTrigger] int input) // input is not used in this particular function
    {
        return await GetNumberFromSomeService();
    }
}
```

### Sub-orchestrators

```csharp
public class MySubOrchestrator
{
    [FunctionName(nameof(MySubOrchestrator))]
    public async Task<(string, byte[])> Run([OrchestrationTrigger] DurableOrchestrationContext context)
    {
        var name = context.GetInput<string>();

        var retryOptions = new RetryOptions(
            firstRetryInterval: TimeSpan.FromSeconds(5),
            maxNumberOfAttempts: 10
        );

        var numbersTasks = Enumerable.Range(0, 8).Select(i => context.CallActivityWithRetryAsync<byte>(nameof(MyActivity), retryOptions, i));

        var numbers = await Task.WhenAll(numbersTasks);

        return (name, numbers);
    }
}
```

### Orchestrators

```csharp
public class MyOrchestrator
{
    [FunctionName(nameof(MyOrchestrator))]
    public async Task Run([OrchestrationTrigger] DurableOrchestrationContext context)
    {
        var people = context.GetInput<IEnumerable<string>>();

        var tasks = people.Select(p => context.CallSubOrchestratorWithRetryAsync<(string, byte[])>(nameof(MySubOrchestrator), retryOptions, p));

        var tickets = await Task.WhenAll(tasks);

        // TODO: Store the tickets someplace safe
    }
}
```

### Triggers

```csharp
public class MyTrigger
{
    private ILogger<MyTrigger> _logger;

    public MyTrigger(ILogger<MyTrigger> logger)
    {
        _logger = logger;
    }

    [FunctionName(nameof(MyTrigger))]
    public async Task Run(OrchestratorInput input)
    {

    }
}
```

## Error handling

So, now we have a functioning function, able to scale indefinitely. But what happens when an error occurs, as we all know will happen? After all, computers do have a mind of their own, especially in the cloud. There are a couple of different ways to handle this. But first, we need to discern what kind of errors we can expect.

#### Transient errors

These are errors that typically occur as a consequence of communication between services. Examples of these are database connectivity issues, unresponsive web services, or other unavailable resources. Typically, these kinds of errors can be handled by trying again later.

#### Application errors

These are errors that occur because of an error in the application code. For example, the input can be invalid, or cause an invalid state in the function. Retrying the function a thousand times will cause the same error every time.

### Retries

Durable functions provides out-of-the box support for retrying failed functions and orchestrators. You simply pass a `RetryOptions` object when invoking the function, specifying the number of retries and the amount of time to wait before retrying. You may also specify the backoff coefficient for exponential backoff.

```csharp
var retryOptions = new RetryOptions(
    firstRetryInterval: TimeSpan.FromSeconds(5),
    maxNumberOfAttempts: 10
);
await context.CallActivityWithRetryAsync(nameof(MyActivity), retryOptions, activityInput);
```

However, when using retries, you should be aware of the error types specified above. If an activity throws an application error every time it is invoked, and the suborchestrator retries 10 times, you have 10 retries which will fail every time. Furthermore, if the orchestrator also retries the suborchestrator 10 times, you suddenly have 100 retries which fail every time. And if the suborchestrator calls other activities, those activities will be retried as well.

### Exception handling

So, if the error is an application error, you may be better off using good old exceptions:

```csharp
try {
    var retryOptions = new RetryOptions(
        firstRetryInterval: TimeSpan.FromSeconds(5),
        maxNumberOfAttempts: 10
    );
    await context.CallActivityWithRetryAsync(nameof(MyActivity), retryOptions, activityInput);
}
catch (MyException e)
{
    _logger.LogError(e, "An error occurred: '{message}'", e.Message);
    // Handle the exception some way
}
```

This way, the suborchestrator will not fail even if one of its activities fails, while still using retries for transient errors. And you are able to control how to handle the application error. Of course, you may still pass information about the failed activity to the orchestrator using exceptions or status objects.

## Full example

```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Azure.Functions.Extensions.DependencyInjection;
using Microsoft.Azure.WebJobs;
using Microsoft.Extensions.Logging;
using MyNamespace;

[assembly: FunctionsStartup(typeof(Startup))]
namespace MyNamespace
{
    public class Startup : FunctionsStartup
    {
        public override void Configure(IFunctionsHostBuilder builder)
        {
            // Just use default configration
        }
    }

    public class MyTrigger
    {
        private readonly ILogger<MyTrigger> _logger;

        public MyTrigger(ILogger<MyTrigger> logger)
        {
            _logger = logger;
        }

        [FunctionName(nameof(MyTrigger))]
        public async Task<string> Run(
            [HttpTrigger] HttpRequest req,
            [OrchestrationClient] DurableOrchestrationClient orchestrationClient
        )
        {
            var people = new[]
            {
                "Santa",
                "Claus"
            };

            return await orchestrationClient.StartNewAsync(nameof(MyOrchestrator), people);
        }
    }

    public class MyOrchestrator
    {
        private readonly ILogger<MyOrchestrator> _logger;

        public MyOrchestrator(ILogger<MyOrchestrator> logger)
        {
            _logger = logger;
        }

        [FunctionName(nameof(MyOrchestrator))]
        public async Task Run([OrchestrationTrigger] DurableOrchestrationContext context)
        {
            var people = context.GetInput<IEnumerable<string>>();

            var retryOptions = new RetryOptions(
                firstRetryInterval: TimeSpan.FromSeconds(5),
                maxNumberOfAttempts: 5
            );

            var tasks = people.Select(p => context.CallSubOrchestratorWithRetryAsync<(string, byte[])>(nameof(MySubOrchestrator), retryOptions, p));

            var tickets = await Task.WhenAll(tasks);

            foreach (var (name, numbers) in tickets)
            {
                _logger.LogInformation("[{functionName}] {name}: [{numbers}]", nameof(MyOrchestrator), name, numbers.OrderBy(n => n));
            }

            // TODO: Store the tickets someplace safe
        }
    }

    public class MySubOrchestrator
    {
        private readonly ILogger<MySubOrchestrator> _logger;

        public MySubOrchestrator(ILogger<MySubOrchestrator> logger)
        {
            _logger = logger;
        }

        [FunctionName(nameof(MySubOrchestrator))]
        public async Task<(string, byte[])> Run([OrchestrationTrigger] DurableOrchestrationContext context)
        {
            var name = context.GetInput<string>();

            var retryOptions = new RetryOptions(
                firstRetryInterval: TimeSpan.FromSeconds(5),
                maxNumberOfAttempts: 10
            );

            var numbersTasks = Enumerable.Range(0, 8).Select(i => context.CallActivityWithRetryAsync<byte>(nameof(MyActivity), retryOptions, i));

            var numbers = await Task.WhenAll(numbersTasks);

            _logger.LogDebug("[{functionName}] Ticket was successfully generated for '{name}'.", nameof(MySubOrchestrator), name);

            return (name, numbers);
        }
    }

    public class MyActivity
    {
        private readonly ILogger<MyActivity> _logger;
        private readonly Random _random;

        public MyActivity(ILogger<MyActivity> logger)
        {
            _logger = logger;
            _random = new Random();
        }

        [FunctionName(nameof(MyActivity))]
        public async Task<byte> Run([ActivityTrigger] int input) // input is not used in this particular function
        {
            // Randomly wait for 0-5 seconds
            await Task.Delay(_random.Next(5000));

            var number = await GetNumberFromSomeService();

            _logger.LogDebug("[{functionName}] Number '{number}' was successfully generated.", nameof(MyActivity), number);

            // Return a random value between 1 and 48
            return number;
        }

        private Task<byte> GetNumberFromSomeService()
        {
            var shouldTimeout = _random.Next(0, 10) == 0;
            var shouldFail = false;

            if (shouldTimeout)
            {
                throw new TimeoutException();
            }
            if (shouldFail)
            {
                throw new ApplicationException();
            }

            return Task.FromResult((byte)(_random.Next(47) + 1));
        }
    }
}
```
