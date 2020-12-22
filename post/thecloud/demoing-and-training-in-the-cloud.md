---
calendar: thecloud
post_year: 2020
post_day: 23
title: Demoing and training in the cloud
image: https://unsplash.com/photos/6O853OGeq-c
ingress: ""
authors:
  - Torstein Gjengedal
---
The rise of cloud platforms has provided a number of application hosting platforms, like Heroku and Firebase, to name a few. Being old news in themselves, they provide a fast and effortless way of setting up an application. Combined with some creativity, platforms like these may provide great value for your team, even if they’re not part of your main platform infrastructure.

Have you ever had the need of a clickable prototype of your application for demoing purposes or to go a step beyond mere illustrations? Do you wish that your users could play around with your product to be familiar with its capabilities or to learn to know it without messing with real data? Does your organisation have customer support or other internal staff that need to know the look, feel and functions for end users, or need a playground for training? All of these are cases where using a (more or less) fake instance of your application may come in handy, and cloud platforms are great for setting up stuff like this in a flexible way.

Couldn’t we just use the good old test / QA environment for taking care of these needs? Sure we could, at least for some of them. But they usually come with a number of limitations. In particular:

* They are often tightly integrated with other systems, and require some real test data set up in other systems
* They often require some kind of user login, either like the production system or some test logins/users that need to be set up in other internal systems
* They may run in environments that are hard to reach. For random external users in particular, but not rarely also for various groups of internal users

These limitations may relatively easy be overcome by the combination of:

* Decoupling your application, or parts of it, from it’s run-time dependencies and integrations
* Tailor your application to fit your needs. 
* Running it in a publicly available environment with easy set-up and deployment. This is where application hosting platforms come in, if your regular infrastructure have shortcomings

**Decoupling your application:** Most applications depend on one or more other systems or features. Some are in the hands of the core developer team, while others are maintained by other internal teams or even external vendors. A common web application architecture at least consists of a frontend application (e.g. a javascript / react app) communicating with a backend through an API for looking up or updating data. The backend, in turn may have further dependencies, e.g. to a database or to one or more other systems. Removing (or faking) these dependencies will make it easier to run your application stand-alone. The most light-weight approach could be faking your backend API, making the frontend the only unit to deploy. A more heavy-weight approach is deploying your backend and fake the deeper dependencies. The database could be a real stand-alone database, a simple replacement (like an in-mem db), or mock data provided in code.

**Tailoring your application** could be things like letting the users choose their own login and user group (i.e. internal, external or admin user), providing different behaviour or data for various users (e.g. user names starting with “xyz” always get a certain data or behaviour), or have some way of switching on and off new beta features.

**Running it in a publicly available environment.** It might well be that your regular infrastructure is already a public cloud, providing a simple setup of new, stand-alone environments. If so, use this platform for deploying your demo app. If not, Heroku, Firebase or similar platforms come in handy.

Let’s finish with a few examples: My current team is working with digitizing and improving NAV’s (Norwegian Labour and Welfare Administration) services for corporations. Some of the services are deployed as stand-alone mock versions for demo and training purposes. 

Companies that need to lay off employees are required to report this to Nav. The arrival of Covid-19 brought a need for rapidly digitizing this process. A mock version of the service is set up at Heroku: <https://permittering-skjema.herokuapp.com/permittering/>

Another service from NAV is to partly cover the salary for an employee, or to let an unemployed act as a trainee to test their work ability in a company. This service is supported by a three-way digital contract, shared by NAV, the company and the employee. The contract has a nifty online demo, letting the users “log in” as either NAV, a corporation representative or the employee. It is backed by an in-memory database for short-lived persistency, and is recently moved from Heroku to NAV’s “labs” domain: <https://arbeidsgiver.labs.nais.io/tiltaksgjennomforing/>

Finally, the open source feature toggle system [Unleash](https://github.com/unleash/unleash) provide a great demo of their admin system. Anyone may log in password-less and try out creation of feature toggles and activation strategies. Beware that everyone sees everything :) The demo is hosted at Heroku: <https://unleash.herokuapp.com/#/features>

Happy demo-ing in the cloud!