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
  solution for building & operating serverless applications." Let's have a look
  on what this framework is all about.

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

## Serverless Framework concepts

Serverless Framework has four main concepts which you should know before we look on some example code.

**Service**

You can think of this as an application or as a .. yeah, service. It typically  consists of multiple functions ([Lambda](https://docs.aws.amazon.com/lambda/) in our case) and different resources as databases, [S3 buckets](https://aws.amazon.com/s3/), [API gateway](https://aws.amazon.com/api-gateway/) and other managed services your service use.

**Functions**

On AWS this is equivalent to AWS Lambda. A single piece of code deployed to AWS which triggers based on different kinds of events in the cloud ecosystem. In your service you can define multiple functions, and you can deploy and invoke them via the Serverless Framework CLI.

**Events**

Events are what trigger your functions you have defined in your service. On AWS this can be anything from a HTTP request from API Gateway, an image uploaded to a S3 bucket, a new entry in a [DynamoDB](https://aws.amazon.com/dynamodb) database, a [CloudWatch](https://aws.amazon.com/cloudwatch/) alert and [lots more](https://serverless.com/framework/docs/providers/aws/events/).

**Resources**

These are any resources which is needed by your service, and typically what your functions use. Typical resources may be a database like DynamoDB , S3 bucket or a [SNS](https://aws.amazon.com/sns/) topic.

## What does this look like in practice?

Below is an example of a *service* defined in a file called `serverless.yml`. The service is an API which you can use to create new christmas wishes, and return a list of all your wishes.

```yaml
service: wishlist

provider:
  name: aws
  runtime: nodejs12.x

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
    WishlistTable:
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
        ProvisionedThroughput:
          ReadCapacityUnits: 1
          WriteCapacityUnits: 1
```

We start by defining the name for our service, `wishlist`. Then we define which provider we would like to use, `aws`, runtime for our functions, `nodejs`, and which region we would like our service to be deployed to, `eu-central-1`. The `iamRoleStatements` declares that our functions are allowed to query and add items to our DynamoDB table. The last block, `resources`, defines our DynamoDB table.

The functions block could do with a more detailed explanation.

```yaml
functions:
  wishlist:
    handler: wishlist.wishlist
    events:
      - http: GET wishes
  newWish:
    handler: newWish.newWish
    events:
      - http: POST wishes
```

Here we declare two functions. The `wishlist` function is a function that returns all wishes from our database. In the `events` block we define that this should trigger on a http GET request with the path `/wishes`. The `newWish` function will, as the name applies, create a new wish in our DynamoDB table. It triggers on a http POST request with the path `/wishes`. The actual code for the two functions is listed below.

**list all wishes**
```js
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.wishlist = (event, context, callback) => {
  dynamoDb.scan({ TableName: 'wishlist' }, (err, res) => {
    return callback(null, {
      statusCode: err ? 500 : 200,
      body: err ? err.message : JSON.stringify(res),
      headers: {
        'Content-Type': 'application/json',
      }
    });
  })
};

```

**add new wish**
```js
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.newWish = (event, context, callback) => {
  dynamoDb.put({ TableName: 'wishlist', Item: JSON.parse(event.body) }, (err, res) => {
    return callback(null, {
      statusCode: err ? 500 : 200,
      body: err ? err.message : JSON.stringify(res),
      headers: {
        'Content-Type': 'application/json',
      }
    });
  })
};


```

## So, how do we actually deploy our service to the cloud? 

To deploy the API just run the command `sls deploy`. Serverless Framework will deploy all your functions and necessary infrastructure, and print the URL for your brand new serverless API at the bottom.

```bash
$ sls deploy

Serverless: Packaging service...
Serverless: Excluding development dependencies...
Serverless: Creating Stack...
Serverless: Checking Stack create progress...
........
Serverless: Stack create finished...
Serverless: Uploading CloudFormation file to S3...
Serverless: Uploading artifacts...
Serverless: Uploading service wishlist.zip file to S3 (1.21 KB)...
Serverless: Validating template...
Serverless: Updating Stack...
Serverless: Checking Stack update progress...
................................................
Serverless: Stack update finished...
Service Information
service: wishlist
stage: dev
region: eu-central-1
stack: wishlist-dev
resources: 17
api keys:
  None
endpoints:
  GET - https://ny8fxydfd5.execute-api.eu-central-1.amazonaws.com/dev/wishes
  POST - https://ny8fxydfd5.execute-api.eu-central-1.amazonaws.com/dev/wishes
functions:
  wishlist: wishlist-dev-wishlist
  newWish: wishlist-dev-newWish
layers:
  None
```

So what actually happend here? Under the hood, Serverless Framework creates a [CloudFormation](https://aws.amazon.com/cloudformation/) template and uploads that to AWS. CloudFormation will take this template and provision all of the necessary services, deploy the functions and link all the services nicely together. In our case the framework created a DynamoDB table, two functions and an API Gateway. 

With just a small yaml file and some commands, you suddenly have an API which autoscales automatically and you only pay when the API is in use. I think that's pretty cool!

# What's next?

This was only a simple example of what Serverless Framework is capable of, but this only scratches the surface on what the framework can do for you when developing server. It can for instance be used to test your functions locally or trigger them directly in the cloud, and you can use the framework for accessing logs and other metrics. It also comes with a [Dashboard](https://serverless.com/dashboard/) which gives you a "A unified view of your Serverless applications, featuring monitoring, alerting, deployments & much more". 

All in all, Serverless Framework is a nice alternative to use for developing serverless applications. It supports multiple cloud providers (although the support is limited on some of them) and comes with lots of [plugins](https://serverless.com/plugins/) to help you speed up your development. It of course has some limitations, and `yaml` can be frustrating to debug some times, but I will absolutely recommend you to try it out if you're interested in developing serverless applications!

