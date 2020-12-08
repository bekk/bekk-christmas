---
calendar: thecloud
post_year: 2020
post_day: 18
title: From code to cloud using .net 5, Docker, Github Actions and Azure App Services
ingress: With the release of .Net 5 comes the work required to update the stack
  to the “latest and greatest”. In the early days, getting a full CI/CD pipeline
  could be a huge pain. The simple solutions often required the usage of
  proprietary technology. Nowadays, there are many solutions to the same
  problem, which makes finding "the right" solution difficult.
authors:
  - Anders Refsdal Olsen
---
This article will look at one solution that utilizes several popular technologies to create a simple CI/CD pipeline for a simple dotnet web app. The finished pipeline is not perfect, but I think it can serve as a good starting point for your application. 

## Pre-requisites
To do what this article describes, you will need the following:
* [.Net 5 SDK](https://dotnet.microsoft.com/download/dotnet/5.0)
* [Docker Desktop (regular Docker if on Linux)](https://docs.docker.com/get-docker/)

I will stick to the command line to keep the article's steps working for all operating systems. 

The full solution is available at these locations:
* [Github](https://github.com/andersro93/dotnet5-docker-demo)
* [Docker Hub](https://hub.docker.com/repository/docker/andersro93/dotnet5-docker-demo)
* [Deployed App](https://dotnet5-docker-demo.azurewebsites.net)


## 1. Create a sample application
To keep this as simple as possible, I suggest using one of the default applications that the dotnet cli gives us. The following command creates a new mvc solution in a folder called DockerSample.

```sh
dotnet new mvc -n DockerSample
```

We can test the application by navigating into the folder and run the following command.

```sh
dotnet run
```

Now we should be able to open our browser and see the following on localhost port 5001.


## 2. Adding Docker support to your application
Now that we have a working application, we can make sure the application builds and runs in a Docker container from a Docker image. To create our Docker image, we need to create a Dockerfile. Since Docker is supported by Microsoft, we can use the images they serve as a baseline for our image. We see that Microsoft has several images available that serves our purpose. Namely, SDK and AspNet Runtime. 

We will use the SDK image to build our solution and the AspNet Runtime to run our solution. We are using both instead of just the SDK because the Runtime image is smaller. We want our image to be as small as possible. 

The recipe for creating our image is to understand how the build progress of a typical .Net application work. Typically, we want to the following in the following:
1. Download our dependencies (restore)
2. Build our solution (build)
3. Create an artifact of our application (publish)
4. Run the application

Let’s start defining our image. We first need to tell Docker which image we want to use as a baseline. We can set the working directory at the same time. We can do that by adding the following to our Dockerfile.

```dockerfile
FROM mcr.microsoft.com/dotnet/sdk:5.0 AS restore
WORKDIR /app
```

As you may have seen, I have named our image restore (i will come back to why later in this section).

To download/restore our dependencies, we add the following.

```dockerfile
COPY DockerSample.csproj .
RUN ["dotnet", "restore"]
```

We are only caring about the project's dependencies; thus, we are only copying the .csproj file to `/app` inside our container. After that, we run the dotnet restore command using the CLI we have available from our base image. 

Next, we need to copy the rest of our source files and build our solution. 

```dockerfile
FROM restore AS build
COPY . /app
RUN ["dotnet", "build", "--no-restore", "--configuration", "Release"]
```

In these steps, we create a new container named "build". This container derives from our previous image, namely "restore". After that, we copy the contents from our current directory (which includes our source code) from our local computer to the folder "/app" inside the container. Finally, we run the build command with some common flags for building a release. 

Moving on, we need to publish our build as an artifact. We do that with the following instructions.

```dockerfile
FROM build AS publish
RUN ["dotnet", "publish", "--no-restore", "--no-build", "--configuration", "Release", "--output", "artifacts"]
```

Again, we are creating a new container, but this time it's called "publish" and it derives from the container called "build". We then run the dotnet publish command to create an artifact and place it in a folder called artifacts.

Lastly, we need to run our artifact. That is where our runtime container comes in. In this step, we’ll take our artifact, copy it over to a new runtime container, and then set the entrypoint (which command to run when we start the container). 

```dockerfile
FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS runtime
WORKDIR /app
COPY --from=publish /app/artifacts /app
ENTRYPOINT ["dotnet", "DockerSample.dll"]
```

With that, we have a fully working Dockerfile that takes our application, builds it, places the runtime in a small container, and runs it. Our final Dockerfile should look something like this.

```yaml
FROM mcr.microsoft.com/dotnet/sdk:5.0 AS restore
WORKDIR /app
COPY DockerSample.csproj .
RUN ["dotnet", "restore"]

FROM restore AS build
COPY . /app
RUN ["dotnet", "build", "--no-restore", "--configuration", "Release"]

FROM build AS publish
RUN ["dotnet", "publish", "--no-restore", "--no-build", "--configuration", "Release", "--output", "artifacts"]

FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS runtime
WORKDIR /app
COPY --from=publish /app/artifacts /app
ENTRYPOINT ["dotnet", "DockerSample.dll"]
```

To build our docker image, we run `docker build . --tag dockersample:latest` in our terminal. The build output should look something like this.

[IMAGE]

Now, to run this image, we run the following command: `docker run -p 8080:80 dockersample:latest .` Notice the `-p 8080:80`, meaning that we will forward our local port 8080 to port 80 in our container. Consequently, we can view our application in our browser at localhost:8080. 


## 3. Github Actions and pipeline
In the last step, we created a Dockerfile for our project. Moving on, we are going to take some shortcuts. If you want a short introduction to how Github Actions work, you may read [my introduction article](https://andersro93.medium.com/using-github-actions-with-docker-9ba1cc481ae1) that explains the concept in greater detail than here. 

Before we move on, we need to know where we are going to store our 

Now, let's move on. We will add a file called main.yml into a new folder in `.github/workflows.` In short, this where we store our Github Actions. 

```yaml
name: Build and push

on:
  push:
    branches: [ main ]

env:
  REGISTRY_URL: ${{ secrets.REGISTRY_URL }}
  REGISTRY_IMAGE: ${{ secrets.REGISTRY_IMAGE }}
  REGISTRY_USERNAME: ${{ secrets.REGISTRY_USERNAME }}
  REGISTRY_TOKEN: ${{ secrets.REGISTRY_TOKEN }}

jobs:
  build:
    name: "Checkout and build"
    runs-on: ubuntu-latest
    steps:
      - name: "Checkout code"
        uses: actions/checkout@v2

      - name: "Build image"
        run: docker build . --tag ${{ env.REGISTRY_URL }}/${{ env.REGISTRY_IMAGE }}:latest

      - name: "Login to Registry"
        uses: docker/login-action@v1.6.0
        with:
          registry: ${{ env.REGISTRY_URL }}
          username: ${{ env.REGISTRY_USERNAME }}
          password: ${{ env.REGISTRY_TOKEN }}

      - name: "Publish image"
        run: docker push ${{ env.REGISTRY_URL }}/${{ env.REGISTRY_IMAGE }}:latest
```

As you can see in `main.yml` file, we are creating a workflow with one job that consists of four steps. Remember, this is as simple as possible. 

Let's dive into the steps in our job. First of all, we checkout our code (fancy word for cloning our git repo). Next, we build and tag the docker image that we configured in the previous section. After that, we log in to our Docker registry before we push our final image in the last step. 


## 4. Creating and configuring our Azure App Service
Now, let's provision our AppService. I assume you are familiar with Azure App Service and its capabilities. We are going to create a Web App that runs on Linux (in a Docker container). If you are using the portal, you should see the following when you create the Web App. 

![](https://i.imgur.com/xOIE1Kf.png)

Onward to the Docker tab. We need to configure what Docker image we should use and how we are going to retrieve it. This step can be complicated in many instances. So I will not cover how we deal with private registries. We are, therefore, going to use the same public image we created in the previous section. 

![](https://i.imgur.com/OCGJKwy.png)

We may configure to use that by selecting DockerHub, and then our image name. Hit "Review + create" and Voila! 