---
calendar: thecloud
post_year: 2019
post_day: 5
title: 'Resilience in a cloud architecture - Part 1: Timeout'
ingress: "A typical cloud architecture - from a cloud native solution to a public cloud solution - consist of multiple connected services. Some of these services are under your control, others are third-party services. Anyhow, these services communicate with each other, and depend on each other's availability.\r\n\r\nWhen your application integrates with another service - your application must handle erroneous behavior from the service. This includes that the service responds slower than expected, single requests are dropped, or the entire service is unavailable."
---
Even though you want to minimize the number of synchronize HTTP request within your application, it might sometimes be necessary to call another service to fetch some required data needed to respond to some request. If the other service is unavailable and does not respond, the request to your application will also not respond - at least not until the call to the other service time out. Being aware of the timeout set on the client contacting this service might be crucial for keeping your application fully operational.

If your application is popular, and many request take a long time to respond, request could begin to pile up and eventually make your application unavailable as well. A web application is hosted by one or more web servers, even when it run in a public cloud PAAS. Traditional web servers have a limited number of threads to handle concurrent HTTP requests. If this limit is reached, the web server will drop any new incoming requests.

Another aspect is that the response time of the requests to your application is often correlated to the perceived quality of your application. If users often experience your application to be responding slowly, the chances are that the users become annoyed and stop using your application.

## Default timeout

Setting the timeout in clients calling an external service is usually very easy, but based on my experience something we developers often forget. The resilience of the external service requests, including the timeout, is usually not addressed before one has experienced availability issues with the external service in production. A first step to handle this issue is to set a correct timeout towards the other service, and not just relying on the default timeout value in the client. Default timeouts, especially in generic HTTP clients, are usually set quite high. For example, `HttpClient` found in .NET has a default timeout of 100 seconds. When having synchronous calls like we have in out example, this is usually way to high, since the user initiating the request to your application also have to wait this long if the other service is not responding.

If your application integrates with a service provided by e.g. a public cloud provider, it is common to use a client library made specifically for the service. Resiliency is usually well addressed in these clients and a timeout is likely set with the best intensions for the service calls you are calling. Anyhow, it is still a good idea to get familiar with what timeout the client is using. The service provider does not know how you are using their service and in some cases the timeouts set in the client library does not fit the context and nature of your application.

Changing the timeout in clients is usually quite straight forward, but cases exist where this is not true. In cases where changing the timeout is not possible there exists resilience libraries (like `Polly` for .NET and `resilience4j` for the JVM) that can be used to encapsulate client calls providing a configurable timeout.

## Finding the correct timeout

Setting the correct timeout is not always easy. Obviously, the timeout should be set as low as possible, but not so low that the service call time out prematurely. Especially for synchronous calls a low timeout is crucial. If you end up needing to set a higher timeout than the maximum response time you want for your application requests, you should rather consider rewriting to perform the call asynchronously instead. When calls are asynchronous you can usually afford longer calls, but you should keep in mind that asynchronous calls also consume threads from the web servers thread pool.

Often a good approach to finding the correct timeout is to first set it by best effort and begin monitoring the network calls your application makes towards the external service. Learning how the external service behaves could make setting the timeout much easier.

Addressing the timeout of calls to external services is an important part of building resilient applications. But usually more can be done to increase the resilience even further, which we will see in later posts.
