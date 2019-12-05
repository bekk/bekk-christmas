---
calendar: thecloud
post_year: 2019
post_day: 9
title: Serverless development with Serverless Framework
image: >-
  https://images.unsplash.com/24/5895672523_2e8ce56485_o.jpg?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1800&q=80
ingress: >+
  If you've read [yesterdays](https://thecloud.christmas/2019/8) post about ZEIT
  Now, you've already seen one of many approaches to develop and deploy a
  serverless API. In this post we will have a look at another alternative you
  can use to develop serverless applications, namely [Serverless
  Framework](https://serverless.com/). Serverless Framework can be used to
  develop, deploy and test your serverless applications targeted towards
  different cloud providers, or as they describe themselves: "The complete
  solution for building & operating serverless applications." Let's have look on
  what this framework is all about.

links:
  - title: Serverless Framework
    url: 'https://serverless.com/'
  - title: Code and architecture examples
    url: 'https://serverless.com/examples/'
  - title: Serverless Framework's blog
    url: 'https://serverless.com/blog/'
authors:
  - Henrik Wingerei
---
Serverless Framework is a node CLI tool which can be installed via npm by running `npm install -g serverless`. As mentioned the framework can be used against many different cloud providers. AWS, Azure and Google of course, but also more "exotic" providers like [Cloudflare Workers](https://workers.cloudflare.com/), [OpenWhisk](https://openwhisk.apache.org/) and [Alibaba Cloud](https://www.alibabacloud.com/). In this post we will focus on how to use Serverless Framework on AWS.

The framework has four main concepts which you should know before we look on some example code.

**Service**

You can think of this as an application or as a .. yeah, service. It typically  consists of multiple functions ([Lambda](https://docs.aws.amazon.com/lambda/) in our case) and different resources as a database, API gateway and other managed services you need in your service.

**Functions**

On AWS this is equivalent to AWS Lambda. A single piece of code deployed to AWS which triggers based on different kinds of events in the cloud ecosystem. In your service you can define multiple functions, and you can deploy and invoke them via the Serverless Framework CLI.

**Events**

Anything that can trigger your functions you have defined in your service. On AWS this can be anything from a HTTP request from API Gateway, an image which is uploaded to a S3 bucket, a new entry in a DynamoDB database, a CloudWatch alert and lots [more](https://serverless.com/framework/docs/providers/aws/events/).

**Resources**

These are any resources which is needed by your service, and typically what your functions use. Typical resources may be a database like DynamoDB or a S3 bucket.

So, how does this actually look in practice? Below is an example of a *service*, defined in i file called `serverless.yml`.

```yaml
service: christmas 

provider:
  name: aws
  runtime: nodejs12.13.0

  region: eu-central-1

functions:
  christmas:
    handler: handler.christmas
    events:
      - http: GET christmas
```

We start by defining the name for our service (christmas). Then we define which provider we would like to use (aws), runtime for our functions (nodejs) and which region we would like our service to be deployed to. Then we define our functions and the events which should trigger the function. 

The setup in the events section say that whenever there is an incoming GET request on the path `/christmas`, the function `christmas` should be invoked. When we run `sls deploy` the Serverless Framework will create the necessary API Gateway for us and integrate it with our lambda function and we suddenly have a auto scaling API with 5 lines of "code". Quite cool!

```yaml
functions:
  christmas:
    handler: handler.christmas
    events:
      - http: GET christmas
``` 

## TODO

* Dashboard tjenesten (monitorering, vis screenshot)
* Nevne betalings tjenesten
* Pros and Cons
* Links: 
- https://serverless.com/examples/
- https://serverless.com/blog/category/guides-and-tutorials/
- https://serverless.com/

