---
calendar: thecloud
post_year: 2019
post_day: 16
title: Managing Apps on GKE Using Helm
links:
  - title: Code Example
    url: 'https://github.com/espenmeidell/christmas-19'
  - title: Helm Homepage
    url: 'https://helm.sh'
authors:
  - Espen Meidell
---


To complete the steps in this article you need the following tools installed on your computer:

* A google cloud project with where you are the owner
* The [gcloud](https://cloud.google.com/sdk/docs/quickstarts) command line tools
* [Kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/) command line tools
* [Helm 3](https://github.com/helm/helm) installed
* NodeJS (optional) if you want to run the application locally

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
Dockerfile
```
FROM node:12.7.0-alpine

WORKDIR '/app'

COPY . .

RUN npm install
EXPOSE 8000

CMD ["node", "index.js"]
```
To test the app locally run `npm install` and `node index.js`. You should now see  the app running by visiting [http://localhost:8000/](http://localhost:8000/) in your browser. 

The next step is to build the docker image and push it to a container registry. We'll tag the first version of our app with `1`:

```
docker build . -t eu.gcr.io/[GCP-PROJECT-NAME]/app:1
docker push eu.gcr.io/[GCP-PROJECT-NAME]/app:1
```

Once these commands have finished you should be able to visit [the container registry](https://console.cloud.google.com/gcr/) and see the image there.  


## The Kubernetes Cluster

Now that we have published the image to the registry, we need a place to run our application. To achieve this, we will create a Kubernetes cluster on Google Kubernetes Engine. 
``
gcloud container clusters create santas-workshop 
``

It will take a few minutes before the cluster is ready, so go grab some eggnog while the servers are spinning up.


Now that the cluster is ready, and we have pushed our deployable app to the container registry, we need to describe our deployment. This is where Helm comes in. 

## Creating the Helm Chart

To create a new chart run the following command (christmas-app is the name of the chart we want to deploy):
``
helm create christmas-app
``

This will create a new folder with the name `christmas-app` containing some files:

* Chart.yaml: Metadata about our application
* values.yaml: Variables for our application
* templates/deployment.yaml: Kubernetes deployment file
* templates/service.yaml: Kubernetes service file

It will also create some other files, but for this article we will stick to a simple deployment with one service. Values are added to the files using the [Helm Templating Language](https://helm.sh/docs/topics/chart_template_guide/). A Helm chart can have multiple value files. This makes it simple to manage different configurations for different environments.

We need to edit some of the files before we can deploy our app. We will start by setting `appVersion` and `version` in `Chart.yaml` to `1`. 

The next step is to update the `values.yaml` file. Set `image.repository` to `eu.gcr.io/[GCP-PROJECT-NAME]/app`. The `appVersion` from [`Chart.yaml`](https://github.com/espenmeidell/christmas-19/blob/de47b44354e22ef9f412fbcb8dab5ae0901c6eb2/christmas-app/templates/deployment.yaml#L28) will be used as the docker image tag.

Our docker image exposes port 8000, so we need to update the container health checks in `deployment.yaml` accordingly:

```yaml
...
      containers:
        - name: {{ .Chart.Name }}
          securityContext:
            {{- toYaml .Values.securityContext | nindent 12 }}
          image: "{{ .Values.image.repository }}:{{ .Chart.AppVersion }}"
          imagePullPolicy: {{ .Values.image.pullPolicy }}
          ports:
            - name: http
              containerPort: 8000
              protocol: TCP
...
```

Now that we’ve specified what docker image to use for our deployment, let’s package it up and try to deploy it. First we’ll run the linter:
```
helm lint christmas-app
```

If there are no errors we can package our deployment. This will create a compressed and versioned archive that represents our entire deployment. Neat!
```
helm package christmas-app
```

To list the configurable values and their current value you can run:
```
helm show values christmas-app-1.tgz
```

Now we install our application on the cluster. `christmasapp` is the name of the release of our app.
``` 
helm install christmasapp christmas-app-1.tgz
```
We can use the kubectl tool to check the status of how the deployment is going:
```
kubectl get pods
```
Once the pod is in the running state, let’s check the logs: 
```
kubectl logs <pod name>
```

You should see the log messages created by our web server. Great! But it is a web server, so we want to be able to connect to it. The astute reader may have noticed that we didn’t create a service with a public IP address. This can be confirmed by running:
```
kubectl get svc
```

Helm is nice enough to give us the command to enable port forwarding from our local machine: 
```
export POD_NAME=$(kubectl get pods --namespace default -l "app.kubernetes.io/name=christmas-app,app.kubernetes.io/instance=christmasapp" -o jsonpath="{.items[0].metadata.name}")
kubectl --namespace default port-forward $POD_NAME 8080:8000
```
Now we can visit http://localhost:8080/ and see that our app is running. Obviously we don’t want to use port forwarding to access our app, so we will need to update our chart. 


## Adding a Load Balancer

## Updating the Application

## Release History and Rollback
