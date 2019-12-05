---
calendar: thecloud
post_year: 2019
post_day: 9
title: Serverless development with Serverless Framework
image: >-
  https://images.unsplash.com/24/5895672523_2e8ce56485_o.jpg?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1800&q=80
ingress: >+
  If you've read [yesterdays](http://github.com/henriwi) post about ZEIT Now,
  you've already seen one of many approaches to develop and deploy a serverless
  API. In this post we will have a look at another alternative you can use to
  develop serverless applications. Today we will look at [Serverless
  Framework](https://serverless.com/), a framework which you can use to develop,
  deploy and test your serverless applications targeted towards different cloud
  providers, or as they describe themselves: "The complete solution for building
  & operating serverless applications." Let's have look on what this framework
  is all about.

authors:
  - Henrik Wingerei
---
Serverless Framework is a node CLI tool which can be installed via npm by running `npm install -g serverless`. As mentioned the framework can be used against many different cloud providers. AWS, Azure and Google of course, but also more "exotic" providers like [Cloudflare Workers](https://workers.cloudflare.com/), [OpenWhisk](https://openwhisk.apache.org/) and [Alibaba Cloud](https://www.alibabacloud.com/). In this post we will focus on now to use Serverless Framework on AWS.

The framework has four main concepts which you should know about before we see some code examples.

**Service**

You can think of this as an application or as a .. yeah, service. It typically would consist of multiple functions (Lambda in our case) and different resources as a database, API gateway and other managed services you need in your service.

**Functions**

On AWS this is equivalent to AWS Lambda. A single piece of code deployed to AWS which triggers based on different kinds of events in the cloud ecosystem. In your service you can define multiple functions, and you can deploy and invoke them via the Serverless Framework CLI.

**Events**

Anything that can trigger your functions you have defined in your service. On AWS this can be a HTTP request from API Gateway which triggers a Lambda function. It could that an image is uploaded to a S3 bucket, a new entry in a DynamoDB database,  a CloudWatch alert and lot's of more...

**Resources**

These are any resources which is needed by your service, and typically what your functions use. Typical resources may be a database or a S3 bucket.

So, how does this actually look in practice? Below is an example of a *service*, defined in i file called `serverless.yml`

```yaml
service: my-service

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
        - dynamodb:UpdateItem
        - dynamodb:DeleteItem
      Resource: "arn:aws:dynamodb:eu-central-1:*:*"

functions:
  handler:
    handler: handler.api
    events:
      - http: ANY todos


resources:
  Resources:
    Tabell:
      Type: AWS::DynamoDB::Table
      Properties:
        TableName: todos
        AttributeDefinitions:
          - AttributeName: key
            AttributeType: S
          - AttributeName: text
            AttributeType: S
        KeySchema:
          - AttributeName: key
            KeyType: HASH
          - AttributeName: text
            KeyType: RANGE
        ProvisionedThroughput:
          ReadCapacityUnits: 1
          WriteCapacityUnits: 1
```

## TODO

* Eksempler med å lage et enkelt API
* Dashboard tjenesten
* Nevne betalings tjenesten
* Pros and Cons
* Link to Serverless Framework
