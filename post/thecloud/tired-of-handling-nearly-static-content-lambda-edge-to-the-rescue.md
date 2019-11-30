---
calendar: thecloud
post_year: 2019
post_day: 3
title: Need to handle NEARLY static content? Lambda@Edge to the rescue
image: >-
  https://images.pexels.com/photos/1296744/pexels-photo-1296744.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260
ingress: >-
  # The Problem


  You’ve got your [SPA](https://en.wikipedia.org/wiki/Single-page_application),
  consisting of static CSS, HTML and JS, and high-performing microservices to
  provide the dynamic behavior of your app. The only thing remaining is hosting
  the static content somewhere, point a DNS to it, and call it a day. 


  However, it turns out that your app needs a top menu, which is shared between
  all the apps in the organization, to provide a common look-and-feel and
  navigation. All of a sudden you’re pushed into the world of [content
  transclusion](https://en.wikipedia.org/wiki/Transclusion), now loosely
  referred to as [micro frontends](https://micro-frontends.org/)
links:
  - title: Micro frontends
    url: 'https://micro-frontends.org/'
  - title: Microservice websites
    url: 'https://gustafnk.github.io/microservice-websites/'
  - title: Immutable web apps
    url: 'https://immutablewebapps.org/'
authors:
  - Jørn Ola Birkeland
---
Logically, this is how your index.html should look:

```
<html>
	<head>
		<link href=“your_app_style.css” rel=“stylesheet”/>
		<!-- menu css and js references go here -—>
	</head>
	<body>
		<!-- menu html goes here -->
		<div class=“your_app_container/>
		<script src="your_app_behaviour.js"></script>
	</body>
</html>	
```

The menu content (html, css, and js) is provided as a service maintained by some other team, and editors are adjusting the content every now and then. In other words, it is almost static, but not quite. The menu editors want changes to propagate quickly across all apps, as and when it happens. So what to do?

# Applying Client or Server Side Includes

A few options are available to you as a developer, typically variations of server-side includes (SSI) and client-side includes (CSI) techniques:

* Treat the menu content as static and deploy a snapshot embedded within your app. A menu update requires a redeploy, which could be relatively easy if downloading and embedding the snapshot was a part of your [CD pipeline](https://semaphoreci.com/blog/cicd-pipeline). Ensuring a fairly updated menu could be achieved by automatically redeploying often enough, or - slightly more sophisticated - triggering a redeploy when the content of the menu service changes. In both cases the pipeline must handle an unavailable menu service, or other issues, increasing the complexity. And with lots of apps in production, there is a governance issue in ensuring working CD pipelines across all of them. 
* Treat the menu as dynamic, and have the client download and insert it into the html as part of page rendering. This is relatively straight-forward and only requires referring to the right piece of javascript, which could be shared between all apps. The downside is the risk of a javascript error (elsewhere in the app) could prevent the menu from being rendered altogether, or that the menu service is temporarily unavailable, also leaving the app without a menu. Also, the user experience could be affected by the performance of the menu service, potentially resulting in the menu appearing long after the app itself has been rendered, causing annoying reflow. Techniques like [Optimistic UI](https://medium.com/distant-horizons/using-optimistic-ui-to-delight-your-users-ac819a81d59a) and [Skeleton Screens](https://uxdesign.cc/what-you-should-know-about-skeleton-screens-a820c45a571a) can mitigate such problems to some extent. 
* Embed the menu server side, when the content is served to the client. Of course, this would require running a web server for the static content, adding the hooks to intercept the request for index.html, and calling the functionality to download the menu content and decorating the html on the way out. Again, performance and failures would be an issue, having the user wait for the inclusion of content from a service you don’t have control over. And running a webserver to serve static content really was what we were hoping to avoid in the first place. 

Each of these options has some downsides, and [ways to overcome them](https://gustafnk.github.io/microservice-websites/). [AWS Lambda@Edge](https://aws.amazon.com/lambda/edge/) offers a compelling alternative, which falls in the category of edge-side includes (ESI). 

# Edge-side Includes with AWS Lambda@Edge

AWS offers a CDN service called [CloudFront](https://aws.amazon.com/cloudfront/), which caches static content closer to the clients, whereby offloading the origin web server and improving response times. July 2017 it became possible to run a piece of code when CloudFront receives a request or returns a response. More precisely, CloudFront offers [four events](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/lambda-cloudfront-trigger-events.html) that can trigger your code:

* When receiving a request from a client, regardless of the requested content is cached or not
* Before forwarding the request to the origin web server, in case of a cache miss
* After receiving the response from the origin web server, but before it is cached
* Before returning the response to the client, after it has been cached

![Lambda@Edge triggers](https://docs.aws.amazon.com/lambda/latest/dg/images/cloudfront-events-that-trigger-lambda-functions.png)

The menu problem is a good use case for Lambda@Edge. At first glance, it seems it would be a good choice to latch on to the response from the origin web server, and decorate the html before it is cached and returned to the client. However, response triggers aren't able to access the response body or provide a generated body of any kind. The next best thing is to trigger your lambda function before the request is forwarded to the origin web server because of a cache miss. The steps you need to implement, are:

1. Check if the client requests “index.html” (or “/“). If not, just forward the request and return the response
2. Fetch index.html yourself, and get the content from the menu service
3. Replace specific tags in index.html with the appropriate menu-content
4. Set the cache headers to some fairly short expiry time (balancing the cost of regenerating index.html versus the risk of serving stale content)
5. Return the decorated response

Feel free to take a look at the [node.js](https://github.com/jorn-ola/xmas-serverless-micro-frontend/blob/master/index.js) code, and the corresponding [index.html](https://github.com/jorn-ola/xmas-serverless-micro-frontend/blob/master/index.html) and [menu content](https://github.com/jorn-ola/xmas-serverless-micro-frontend/blob/master/menu.html) examples (courtesy of the Norwegian Labour and Welfare Administration, [NAV](https://www.nav.no/))

The final piece in the puzzle is to configure CloudFront to access your static content and then trigger your code with the right event. Using the web console of AWS Lambda, it should look something like this:

![The lambda function](https://i.ibb.co/6b0Rf9H/Screenshot-2019-11-23-at-15-50-21.png)

and then click “+ Add trigger”, select “CloudFront”, and click “Deploy to Lambda@Edge”:

![The lambda function](https://i.ibb.co/BcwjrYw/Screenshot-2019-11-23-at-15-41-12.png)

You need to select your CloudFront distribution and event, before clicking “Deploy”.

# Summary

So what have we gained? First, our static content can be hosted as such, for example in an [AWS S3](https://aws.amazon.com/s3/) bucket (set up as a [static website](https://docs.aws.amazon.com/AmazonS3/latest/dev/WebsiteHosting.html)), and deployed by a simple directory synch operation. No complex CD pipelines or dedicated web servers are required. Second, in case of a failure during transclusion, CloudFront will continue to serve the previously cached index.html. So a temporarily unavailable menu service will not impact the end-user. Third, the performance penalty is only paid occasionally by a single user (within a CDN region), and a small lambda execution timeout value will cause a relatively quick failure, resulting in the cached index.html being returned. Fourth, the lambda function decorating the index.html can be shared by all apps (provided they are authorised to do so), maintained in one place, all the while scaling is handled for you. 

Finally, leveraging a CDN for static content is A Good Thing, and should reduce the cost of serving your files, while simultaneously improving the end-user experience. As an additional benefit, if you are building [immutable web apps](https://immutablewebapps.org/) (which you should) - and therefore getting new file names with each build - serving them through a CDN will keep the files of previous versions available for a while. The slim chance that a client with an old index.html will request unavailable files, is avoided. 

There are a couple of drawbacks, of course: Getting your lambda function to work correctly can be a bit of trial and error with somewhat [limited debugging possibilities](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/lambda-edge-testing-debugging.html). Also, index.html is cached for a certain time period (decided by you). A new deployment of your app will not be immediately available to new clients. A cache invalidation request to CloudFront may take a few minutes, so in the odd case you need to be able to rapidly make a new version of your index.html available, using a CDN in front of it may be the wrong thing to do. For everybody else, it is definitely a tool to have in your toolbox.

**Many thanks to** [**Morten Jansrud**](mailto:morten.jansrud@bekk.no)**,** [**Frikk Hald Andersen**](mailto:frikk.hald.andersen@gmail.com) **og** [**Eirik Årseth**](mailto:eirik.emil@gmail.com)**, who have done all the hard  work.**
