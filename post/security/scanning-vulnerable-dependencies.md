---
calendar: security
post_year: 2018
post_day: 22
title: Scanning Vulnerable Dependencies
ingress: >-
  When creating a web application, it is almost impossible to create it without
  relying on third party dependencies. But how do you know that the dependencies
  you use are secure?
links:
  - title: National Vulnerability Database
    url: 'https://nvd.nist.gov/vuln/search'
  - title: Github Security Alerts
    url: >-
      https://help.github.com/articles/about-security-alerts-for-vulnerable-dependencies/
  - title: OWASP TOP 10 2017 A9
    url: >-
      https://www.owasp.org/index.php/Top_10-2017_A9-Using_Components_with_Known_Vulnerabilities
authors:
  - Stian Fredrikstad
---
At the start of developing a new project, you may choose frameworks and other third party dependencies which are popular at the time.
If the dependencies are well maintained, they are hopefully free from known vulnerabilities and safe to use.
To make sure, you should consult a vulnerability database, like the [National Vulnerability Database](https://nvd.nist.gov/vuln/search).

Using dependencies you can trust, is very import to get a solid foundation for your application, but as soon as you deploy the application for the first time, a new vulnerability may already have been found.
You can never be sure that all vulnerabilities have been fixed in library, thus you need to periodically scan them.

### Scanning in the development process

While you are developing, and building your application, you should have a build step which scans your dependencies.
Depending on the language and build system you use, a lot of tools are available. 

Some of the tools you can use in your build pipeline are:

- [OWASP Dependency Check](https://www.owasp.org/index.php/OWASP_Dependency_Check) has support for Java, .Net and more.
- [NPM Audit](https://docs.npmjs.com/auditing-package-dependencies-for-security-vulnerabilities) checks packages in NPM for vulnerabilities by running `npm audit`.
- [Retire.Js](https://retirejs.github.io) checks JavaScript libraries in your application, can also be used with a browser plugin.
- [Brakeman](https://brakemanscanner.org/) will check your Ruby dependencies, and is created for Ruby on Rails. It will also do static analysis of your code.

Running one or more of these in your pipeline, and possibly failing the build, will stop you from deploying known vulnerabilities.

### Continuous dependency scanning

It is normal that an application can live many years after the development process is finished.
This means that many of the libraries will get old, and in many cases will have known vulnerabilities after time passes.

To make sure we get a notice of new vulnerabilities, we should do the same scan as we do during the development process every day.
If the code is hosted on GitHub, and the code is written in one of the [supported languages](https://help.github.com/articles/listing-the-packages-that-a-repository-depends-on/), continuous dependency scanning is very easy.
GitHub will run it automatically on public repositories, and it can be manually enabled for private repositories. 
Read more about GitHub vulnerability scanning [here](https://help.github.com/articles/about-security-alerts-for-vulnerable-dependencies).
 
### Scanning containers

With docker and other container systems, the system tools and other dependencies inside the containers are our responsibility.
They will not get automatically patched as in a normal OS.
This is why it is just as important to scan your containers, because the application is just as secure as the least secure component.

If you are using Docker Hub, they have created a scan you can add to your images, and you can read more about it [here](https://docs.docker.com/v17.12/docker-cloud/builds/image-scan/#view-docker-security-scanning-results).
Other alternatives are [Anchor](https://anchore.com/), and an open source alternative made by CoreOS which is named [Clair](https://github.com/coreos/clair).

Most of the tools suggested here overlap with each other, and you should test them and see which works for you.
The most important lesson from this post, is that you cannot know if your software or its dependencies are secure, and it is your responsibility to make it as secure as possible.
