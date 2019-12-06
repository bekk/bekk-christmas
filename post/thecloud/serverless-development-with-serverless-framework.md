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
  serverless API. In this post we will have a look at an alternative you can use
  to develop serverless applications, namely [Serverless
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
Serverless Framework is a node CLI tool which can be installed via npm by running `npm install -g serverless`. As mentioned the framework can be used against many different cloud [providers](https://serverless.com/framework/docs/providers/). AWS, Azure and Google of course, but also more "exotic" providers like [Cloudflare Workers](https://workers.cloudflare.com/), [OpenWhisk](https://openwhisk.apache.org/) and [Alibaba Cloud](https://www.alibabacloud.com/). In this post we will focus on how to use Serverless Framework on AWS.

## Four main concepts

The framework has four main concepts which you should know before we look on some example code.

**Service**

You can think of this as an application or as a .. yeah, service. It typically  consists of multiple functions ([Lambda](https://docs.aws.amazon.com/lambda/) in our case) and different resources as a database, S3 buckets, API gateway and other managed services your service use.

**Functions**

On AWS this is equivalent to AWS Lambda. A single piece of code deployed to AWS which triggers based on different kinds of events in the cloud ecosystem. In your service you can define multiple functions, and you can deploy and invoke them via the Serverless Framework CLI.

**Events**

Anything that can trigger your functions you have defined in your service. On AWS this can be anything from a HTTP request from API Gateway, an image which is uploaded to a S3 bucket, a new entry in a DynamoDB database, a CloudWatch alert and [lots more](https://serverless.com/framework/docs/providers/aws/events/).

**Resources**

These are any resources which is needed by your service, and typically what your functions use. Typical resources may be a database like DynamoDB or a S3 bucket.


## In practice


So, how does this actually look in practice? Below is an example of a *service*, defined in i file called `serverless.yml`.

```yaml
service: wishlist 

provider:
  name: aws
  runtime: nodejs12.13.0

  region: eu-central-1

  iamRoleStatements:
    - Effect: "Allow"
      Action:
        - dynamodb:DescribeTable
        - dynamodb:Query
        - dynamodb:Scan
        - dynamodb:GetItem
        - dynamodb:PutItem
      Resource: "arn:aws:dynamodb:eu-central-1:*:*"

functions:
  wishlist:
    handler: wishlist.wishlist
    events:
      - http: GET wishes
  newWish:
    handler: newWish.newWish
    events:
      - http: POST wishes

resources:
  Resources:
    Wishlist:
      Type: AWS::DynamoDB::Table
      Properties:
        TableName: wishlist
        AttributeDefinitions:
          - AttributeName: id
            AttributeType: S
          - AttributeName: wish
            AttributeType: S
        KeySchema:
          - AttributeName: id
            KeyType: HASH
          - AttributeName: wish
            KeyType: RANGE
```

We start by defining the name for our service (wishlist). Then we define which provider we would like to use (aws), runtime for our functions (nodejs) and which region we would like our service to be deployed to (eu-central-1). Then we define our functions, the events which should trigger the function and any other resources we need,

In the `functions` block we declare two functions. The `wishlist` function is a function that returns all wishes from our database. And in the `events` block we define that this should trigger on a http GET request that mathces the path `/wishes`. The `newWish` function will, as the name applies, create a new wish in our DynamoDB table. It triggers on a http POST request that matches the path `/wishes`.

The last two blocks, `resources` and `iamRoleStatements` defines our DynamoDB table and we also define that our lambda functions are allowed to query and add items to our table.
``` 

## Deploy your service

So how do we actually deploy our service to the cloud to be able to use our API? 

When we run `sls deploy`, Serverless Framework will under the hood create a [CloudFormation]() template and upload that to AWS. This will again provision all of the necessary services and link them nicely together. When Serverless Framework sees that we wan't to our functions to react on a http request, it automatically provisions a API Gateway for us so that we get an API we can call. Quite cool!

## TODO

* Dashboard tjenesten (monitorering, vis screenshot)
* Nevne betalings tjenesten
* Pros and Cons
* Links: 
- https://serverless.com/examples/
- https://serverless.com/blog/category/guides-and-tutorials/
- https://serverless.com/

