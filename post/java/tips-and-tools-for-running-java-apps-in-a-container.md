---
calendar: java
post_year: 2019
post_day: 6
title: Tips and tools for running Java apps in a container
image: >-
  https://images.unsplash.com/photo-1494961104209-3c223057bd26?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1984&q=80
ingress: >-
  These days everything can run in a container.  It may be databases, continuous
  integration systems, esoteric hobby projects and even Windows. In this article
  I’ll shine a light on various tips and tools that might be helpful when
  packaging Java based applications for running in containers.
links:
  - title: Possible JVM flags for container workloads
    url: 'https://dzone.com/articles/jvm-advent-calendar-docker-and-the-jvm'
  - title: 'Docker documentation: build cache'
    url: >-
      https://docs.docker.com/develop/develop-images/dockerfile_best-practices/#leverage-build-cache
  - title: 'Matthew Gilliard: Java in a World of Containers (JavaZone 2018)'
    url: 'https://2018.javazone.no/program/f732c34b-8293-4b36-b66f-4ff894ee3407'
  - title: >-
      CodeFX: Improve Launch Times On Java 13 With Application Class-Data
      Sharing
    url: 'https://blog.codefx.org/java/application-class-data-sharing/'
authors:
  - Even Holthe
---
## Tips

### Runtime options

Depending on what version (and patch level) you are running, there are different JVM flags you’ll need to take into account. Support for reading memory limits from cgroups was introduced in Java 8u131, so that’s the minimum requirement. Check out this overview for possible flags you’ll need to set.

### Layering

One common pattern is to have a base image (runtime environment, which can container one or more layers itself), one layer for your dependencies and one layer for your application. By splitting and reusing layers, container images will be more effective in terms of disk space usage and bandwidth used.

### Use a stable base image

This trick depends on your appetite for risk and stability but in general it’s safe to say that the more specific tag of a base image you use, the better.

Say that `some-corp/java:latest` is used, then you don’t know exactly what you’re gonna get, at least not in a month. Is it a JDK or a JRE? Which major version or patch level is in use? Which OS is in use? Sometimes, this is considered a feature to always be on the bleeding edge. A more conservative (and safer) alternative would be to pin the Java version and OS version if possible, e.g. `some-corp/java-jre:12.0.2_10-jre-hotspot-bionic`.

### Use the cache

The Docker build cache helps – a lot. Having the base image already is present is the first step, but subsequent layers should be as idempotent as possible in order to speed up the build in general. This will also help CI systems that support build caching.

### Application Class Data Sharing (AppCDS)

For reducing your application’s startup time, consider looking into AppCDS. This feature involves reading your application’s classes once and build up the internal data structure that the JVM will do every time it starts up your application. By doing this operation only once, you’ll save some startup time the next time your application starts.

## Tools

### Jib

In July of 2018 Google introduced a simpler way to build container images for Java based apps. The [Jib project](https://github.com/GoogleContainerTools/jib) enables developers to produce container images with a minimum of effort, knowledge of best practices and overhead. Jib doesn’t have a dependency on the Docker daemon, so that also helps with improved security and a reduced set of complexity.

Images produced with Jib is based on their [distroless](https://github.com/GoogleContainerTools/distroless) base images and is automatically splitted up into multiple layers. With layer splitting, dependencies are contained in a separate layer and the application itself is contained in another. Applying this technique reduces the diffs between various versions of a container image and will greatly reduce the “weight” of the image in terms of file size and network transfer speeds.

Jib is exposed as an API but more importantly as Maven and Gradle plugins. Checkout their [examples](https://github.com/GoogleContainerTools/jib/tree/master/examples) for getting started. Recommended if you don’t have any special needs.

### Dockerfile Maven plugin

Spotify has been running containerized workloads for many years. Their first tooling effort for Maven was the [docker-maven-plugin](https://github.com/spotify/docker-maven-plugin) with the first release in June of 2014. This lead Spotify to gather much experience building container images and is now deprecated in favor of [dockerfile-maven](https://github.com/spotify/dockerfile-maven), which in turn is marked as mature.

This plugin is however quite powerful and hooks into the existing Maven build lifecycle. It lets you use a regular Dockerfile to build a container image as part of an existing Maven build. Recommended if you are dependant on a Dockerfile or explicitly want to use one.
