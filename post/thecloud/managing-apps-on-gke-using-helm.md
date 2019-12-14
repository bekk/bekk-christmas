---
calendar: thecloud
post_year: 2019
post_day: 16
title: Managing Apps on GKE Using Helm
links:
  - title: Code Example
    url: 'https://github.com/espenmeidell/christmas-19'
authors:
  - Espen Meidell
---


To complete the steps in this article you need the following tools installed on your computer:

* A google cloud project with where you are the owner
* The [gcloud](https://cloud.google.com/sdk/docs/quickstarts) command line tools
* [Kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/) command line tools
* [Helm 3](https://github.com/helm/helm) installed

You also need to enable the Kubernetes engine and Container Registry apis in GCP. The code used in this article can be found on [GitHub](https://github.com/espenmeidell/christmas-19). 

## What is Helm?

## The Sample Application

To keep things as simple as possible we will deploy a simple web server that listens for requests and replies with a christmasy message. The app is written in NodeJS and creates an Express web server. 

package.json:
```json
{
  "name": "hello-christmas",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.17.1",
    "morgan": "^1.9.1"
  }
}
```
index.js:
```javascript
const express = require("express");
const morgan = require("morgan");

const app = express();
const port = process.env.PORT || 8000;

app.use(morgan("combined"));

app.get("/", (req, res) => {
  res.send("Christmas is coming 🎅");
});

app.listen(port, () => console.log(`Christmas is comping on ${port}!`));

```
Dockerfile:
```
FROM node:12.7.0-alpine

WORKDIR '/app'

COPY . .

RUN npm install
EXPOSE 8000

CMD ["node", "index.js"]
```




## The Kubernetes Cluster

## Creating the Helm Chart

## Adding a Load Balancer

## Updating the Application

## Release History and Rollback
