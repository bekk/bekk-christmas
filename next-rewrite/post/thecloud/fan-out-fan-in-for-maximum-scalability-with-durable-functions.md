---
calendar: thecloud
post_year: 2019
post_day: 23
title: Fan-out/fan-in for high scalability with Durable Functions
image: >-
  https://i.ibb.co/hWpRNLz/Max-Pixel-net-Hand-Spread-Japanese-Fan-Chinese-166502.jpg
ingress: >-
  Serverless computing has been with us for some years now, and has been
  "production ready" for quite a while. Services like AWS Lambda, Google Cloud
  Functions, and Azure Functions allow us to create highly scalable services
  with minimal overhead where you only pay for what you actually need.


  Azure Durable Functions is an extension of the Azure Functions family that
  lets you create stateful functions. This is useful for a lot of different
  scenarios, including the *fan-out/fan-in* pattern, which we will look into in
  this blog post.
description: ''
links:
  - title: Azure Durable Functions
    url: >-
      https://docs.microsoft.com/en-us/azure/azure-functions/durable/durable-functions-overview?tabs=csharp
  - title: 'Create your first durable function in C#'
    url: >-
      https://docs.microsoft.com/en-us/azure/azure-functions/durable/durable-functions-create-first-csharp
authors:
  - Eivind Sorteberg
---
## Fan-out/fan-in

```
            /---c1---\  
       /---b1---c2---b1---\
      /     \---c3---/     \
     /                      \
    /       /---c4---\       \
---a-------b2---c5---b2-------a---
    \       \---c6---/       /
     \                      /
      \     /---c7---\     /
       \---b3---c8---b3---/
            \---c9---/
```

The fan-out/fan-in pattern is useful in scenarios where you have a root process with multiple child processes that can run in parallel. Each of these child processes may also have more child processes. This is the "fan out" part of fan-out/fan-in, and can easily be implemented using regular functions and some kind of queue. 

However, if you want to have control of your system, you probably want to keep track of when all processes have completed as well as the result of each child process, in other words fanning back in. Azure Durable Functions lets you do this using `Orchestrators`, `SubOrchestrators`, and `Activities`. In addition, you need some kind of `Trigger` function to get the fun started.

In the following sections, I will show an example of creating a Lotto ticket generator using Azure Durable Functions. A Lotto ticket consists of 6 numbers.  This Lotto ticket generator takes a list of people who should get a Lotto ticket, and stores the Lotto tickets someplace safe. Our (somewhat contrived) example also pretends to use an external number generator service to simulate  real world challenges.

The example uses `C#`, `Azure Functions 3`, and `Durable Functions 2`.

### Activities

The activity function is where the actual work happens when using Durable Functions. An activity works the same way as a regular Azure Function, except that it is kicked off using an `[ActivityTrigger]` which can be any kind of object. Note that the activity function only may take one argument, so if you want to pass multiple arguments, you either need to create a complex type, or use [tuples](https://docs.microsoft.com/en-us/dotnet/csharp/tuples). The return type must be a `Task` containing the return value.

```csharp
public class CreateNumberActivity
{
    [FunctionName(nameof(CreateNumberActivity))]
    public async Task<int> Run([ActivityTrigger] int i) // i is not used
    {
        return await GetNumberFromSomeService();
    }
}
```

So there it is. This activity takes an `int` input, calls an external number generator function, and returns the result.

When creating activity functions, it is important to be aware that they should be extremely simple and fast. There are different [hosting plans](https://docs.microsoft.com/en-us/azure/azure-functions/functions-scale) that you may use for your functions, but unless you are using a consumption plan, you aren't really running serverless, and you are missing out on the good parts. This means that your activity duration should never, ever, exceed 5 minutes. (It is possible to increase the maximum duration to 10 minutes, but if you need to do that, you are probably doing too much work in the function.)

### Sub-orchestrators

The sub-orchestrator is responsible for kicking off child processes and returning the results to its parent. Sub-orchestrators may be chained to create multiple levels of fan out, but in our example, we'll only use one sub-orchestrator.

The sub-orchestrator has to take an `[OrchestrationTrigger]`, which must be of  the type `IDurableOrchestrationContext`. To get the input to the function, you call `context.GetInput<T>()`, where `T` can be any type. The return type, like activities, needs to be a `Task` containing the result.

```csharp
public class CreateTicketSubOrchestrator
{
    [FunctionName(nameof(CreateTicketSubOrchestrator))]
    public async Task<(string, int[])> Run(
        [OrchestrationTrigger] IDurableOrchestrationContext context
    )
    {
        var name = context.GetInput<string>();

        var numbersTasks = Enumerable.Range(1, 6)
            .Select(i => context.CallActivityAsync<int>(
                    nameof(CreateNumberActivity),
                    i
            )
        );

        var numbers = await Task.WhenAll(numbersTasks);

        return (name, numbers);
    }
}
```

In this example, the sub-orchestrator takes a name as input and generates 6 numbers by invoking 6 instances of the `CreateNumberActivity` function. These numbers are then returned along with with the name of the ticket's owner.

### Orchestrators

The orchestrator is the manager of the entire process, and is responsible for starting the child processes, and knowing when they all have completed. In practice, orchestrators are implemented the same way as sub-orchestrators (sub-orchestrators _are_ orchestrators).

```csharp
public class CreateTicketsOrchestrator
{
    [FunctionName(nameof(CreateTicketsOrchestrator))]
    public async Task Run(
        [OrchestrationTrigger] IDurableOrchestrationContext context
    )
    {
        var people = context.GetInput<IEnumerable<string>>();

        var tasks = people
            .Select(p => context.CallSubOrchestratorAsync<(string, int[])>(
                nameof(CreateTicketSubOrchestrator), 
                p
            ));

        var tickets = await Task.WhenAll(tasks);
        
        // TODO: Store the tickets someplace safe
    }
}
```

In this orchestrator, a list of ticket owners is provided, and the ticket generator sub-orchestrator is kicked off for each owner. When all tickets have been created, the orchestrator stores the tickets (probably using an activity), and the function completes.

When running orchestrators (and sub-orchestrators), the process is paused when you have kicked off activities or other sub-orchestrators, so you don't need to worry about the 5 minute execution time limit. However, each time a child process returns, the entire function is re-executed from the start to rebuild the local state. The state of child activities and sub-orchestrators are stored so that they are not invoked multiple times. But you need to make sure that the internals of the orchestrator are deterministic. In other words, calls to methods like `DateTime.Now` or `Guid.NewGuid()` must be avoided.

### Triggers

The final part of the puzzle is some way to start everything. Azure Functions contain a lot of different Triggers, which respond to different types of events. In this example, we will use the `[HttpTrigger]`, which simply creates an HTTP endpoint, and responds to requests to that endpoint.

To start a Durable Function, the activity needs to take a `[DurableClient]` parameter of type `IDurableOrchestrationClient`. This client is then used to start the Orchestrator function. 

```csharp
public class CreateTicketsTrigger
{
    [FunctionName(nameof(CreateTicketsTrigger))]
    public async Task<string> Run(
        [HttpTrigger] HttpRequest req,
        [DurableClient] IDurableOrchestrationClient orchestrationClient
    )
    {
        var people = new[]
        {
            "Dasher",
            "Dancer",
            "Prancer",
            "Vixen",
            "Comet",
            "Cupid",
            "Donder",
            "Blitzen"
        };

        return await orchestrationClient.StartNewAsync(
            nameof(CreateTicketsOrchestrator), 
            people
        );
    }
}
```


## Error handling

So, now we have a functioning function, able to scale indefinitely. But what happens when an error occurs, as we all know will happen? After all, computers do have a mind of their own, especially in the cloud. There are a couple of different ways to handle this, as explained in a [previous post](https://thecloud.christmas/2019/5). But first, we need to discern what kind of errors we can expect.

### Transient errors

These are errors that typically occur as a consequence of communication between services. Examples of these are database connectivity issues, unresponsive web services, or other unavailable resources. Typically, these kinds of errors can be handled by trying again later.

### Application errors

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

However, when using retries, you should be aware of the error types specified above. If an activity throws an application error every time it is invoked, and the sub-orchestrator retries 10 times, you have 10 retries which will fail every time. Furthermore, if an orchestrator also retries the sub-orchestrator 10 times, you suddenly have 100 retries which fail every time. And if the sub-orchestrator calls other activities, those activities will be retried as well.

### Exception handling

So, if the error is an application error, you need a way to tell the function to simply accept it as a fact of life. `RetryOptions` also contains a callback for determining whether exceptions should cause a retry or not. This, combined with a good old `try-catch`, give you fine-grained control over how different types of errors in your functions should be handled.

```csharp
var retryOptions = new RetryOptions(
    firstRetryInterval: TimeSpan.FromSeconds(5),
    maxNumberOfAttempts: 10
)
{
    Handle = e => !(e.InnerException is MyException)
};

try
{
    await context.CallActivityWithRetryAsync<int>(nameof(MyActivity), retryOptions, activityInput);
}
catch (Exception e)
{
    // Handle the exception some way
}
```

This way, the (sub-)orchestrator will not fail even if one of its activities fails, while still using retries for transient errors. And you are able to control how to handle the application error. Of course, you may still pass information about the failed activity to the orchestrator using exceptions or status objects.

## Full example

```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Azure.Functions.Extensions.DependencyInjection;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.DurableTask;
using Microsoft.Extensions.Logging;
using TicketGenerator;

[assembly: FunctionsStartup(typeof(Startup))]
namespace TicketGenerator
{
    public class Startup : FunctionsStartup
    {
        public override void Configure(IFunctionsHostBuilder builder)
        {
            // Just use default configuration
        }
    }

    public class CreateTicketsTrigger
    {
        private readonly ILogger<CreateTicketsTrigger> _logger;

        public CreateTicketsTrigger(ILogger<CreateTicketsTrigger> logger)
        {
            _logger = logger;
        }

        [FunctionName(nameof(CreateTicketsTrigger))]
        public async Task<string> Run(
            [HttpTrigger] HttpRequest req,
            [DurableClient] IDurableOrchestrationClient orchestrationClient
        )
        {
            var people = new[]
            {
                "Dasher",
                "Dancer",
                "Prancer",
                "Vixen",
                "Comet",
                "Cupid",
                "Donder",
                "Blitzen"
            };

            return await orchestrationClient.StartNewAsync(nameof(CreateTicketsOrchestrator), people);
        }
    }

    public class CreateTicketsOrchestrator
    {
        private readonly ILogger<CreateTicketsOrchestrator> _logger;

        public CreateTicketsOrchestrator(ILogger<CreateTicketsOrchestrator> logger)
        {
            _logger = logger;
        }

        [FunctionName(nameof(CreateTicketsOrchestrator))]
        public async Task Run([OrchestrationTrigger] IDurableOrchestrationContext context)
        {
            var people = context.GetInput<IEnumerable<string>>();

            var tasks = people.Select(p => context.CallSubOrchestratorAsync<(string, int[])>(nameof(CreateTicketSubOrchestrator), p));

            var tickets = await Task.WhenAll(tasks);

            foreach (var (name, numbers) in tickets)
            {
                _logger.LogInformation("[{functionName}] {name}: [{numbers}]", nameof(CreateTicketsOrchestrator), name, numbers.OrderBy(n => n));
            }

            // TODO: Store the tickets someplace safe
        }
    }

    public class CreateTicketSubOrchestrator
    {
        private readonly ILogger<CreateTicketSubOrchestrator> _logger;

        public CreateTicketSubOrchestrator(ILogger<CreateTicketSubOrchestrator> logger)
        {
            _logger = logger;
        }

        [FunctionName(nameof(CreateTicketSubOrchestrator))]
        public async Task<(string, int[])> Run([OrchestrationTrigger] IDurableOrchestrationContext context)
        {
            var name = context.GetInput<string>();

            var retryOptions = new RetryOptions(
                firstRetryInterval: TimeSpan.FromSeconds(5),
                maxNumberOfAttempts: 10
            )
            {
                Handle = e =>
                {
                    if (e.InnerException is ArgumentException)
                    {
                        _logger.LogError(e, "[{functionName}] An application error occured: {message}. Don't retry.", nameof(CreateTicketSubOrchestrator), e.Message);
                        return false;
                    }
                    else
                    {
                        _logger.LogWarning(e, "[{functionName}] A transient error occured: {message}. Do retry.", nameof(CreateTicketSubOrchestrator), e.Message);
                        return true;
                    }
                }
            };

            var numbersTasks = Enumerable.Range(1, 7).Select(async i =>
            {
                try
                {
                    return await context.CallActivityWithRetryAsync<int>(
                        nameof(CreateNumberActivity),
                        retryOptions,
                        i
                    );
                }
                catch (Exception)
                {
                    return -1;
                }
            });

            var numbers = await Task.WhenAll(numbersTasks);

            _logger.LogDebug("[{functionName}] Ticket was successfully generated for '{name}'.", nameof(CreateTicketSubOrchestrator), name);

            return (name, numbers);
        }
    }

    public class CreateNumberActivity
    {
        private readonly ILogger<CreateNumberActivity> _logger;
        private readonly Random _random;

        public CreateNumberActivity(ILogger<CreateNumberActivity> logger)
        {
            _logger = logger;
            _random = new Random();
        }

        [FunctionName(nameof(CreateNumberActivity))]
        public async Task<int> Run([ActivityTrigger] int index) // input is not used in this function
        {
            var number = await GetNumberFromSomeService(index);

            _logger.LogDebug(
                "[{functionName}] Number '{number}' was successfully generated.",
                nameof(CreateNumberActivity), number
            );

            // Return a random value between 1 and 48
            return number;
        }

        private Task<int> GetNumberFromSomeService(int index)
        {
            var shouldTimeout = _random.Next(0, 10) == 0;
            var shouldFail = index > 6;

            if (shouldTimeout)
            {
                throw new TimeoutException();
            }
            if (shouldFail)
            {
                throw new ArgumentException("A ticket should only contain 6 numbers.");
            }

            return Task.FromResult(_random.Next(47) + 1);
        }
    }
}
```

