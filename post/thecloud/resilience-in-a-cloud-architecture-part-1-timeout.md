---
calendar: thecloud
post_year: 2019
post_day: 5
title: 'Resilience in a cloud architecture - Part 1: Timeout'
ingress: "A typical cloud architecture - from a cloud native solution to a public cloud solution - consist of multiple connected services. Some of these services are under your control, others are third-party services. Anyhow, these services communicate with each other, and depend on each others availability.\r\n\n\rWhen your application integrates with another service - your application must handle erronous behaviour from the service. This includes that the service respond slower than expected, single requests are dropped, or the entire service is unavailable."
---
Even though you want to minimize the number of synchronize HTTP request within your application, it might sometimes be neccassary to call another service to fetch some required data needed to respond to some request. If the other service is unavailable and does not respond, the request to your application will also not respond - at least not until the call to the other service time out. Being aware of the timeout set on the client contacting this service might be crusial for you keeping your application fully operational.
