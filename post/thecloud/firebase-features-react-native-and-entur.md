---
calendar: thecloud
post_year: 2019
post_day: 17
title: 'Firebase features, React Native and Entur'
image: >-
  https://images.unsplash.com/photo-1504470695779-75300268aa0e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80
ingress: >-
  Entur operates the national registry for all public transport in Norway,
  collecting data from 60 public transportation operators. The registry contains
  data about 21,000 daily departures on 3,000 routes. This data is open and free
  to use for app and service developers. 


  Based on this registry Entur also provides Norway’s public transport route
  planner and ticketing app - Entur - with over 250 000 downloads. The app is
  developed using React Native, and it’s supplemented with a lot of Google
  Firebase features. In this post we’ll be highlighting how we use the Firebase
  Remote Config feature and the Cloud Functions.
links:
  - title: Firebase
    url: 'https://firebase.google.com/'
  - title: React Native Firebase
    url: 'https://rnfirebase.io/'
  - title: Cloud Run
    url: 'https://cloud.google.com/run/'
  - title: 'Entur - App Store '
    url: 'https://apps.apple.com/no/app/entur-reiseplanlegger/id1225135707?l=nb'
  - title: Entur - Google Play
    url: 'https://play.google.com/store/apps/details?id=no.entur&hl=en'
authors:
  - Carl Joachim Rørvik
---
## Firebase Remote Config

First of all, Firebase Remote config is a really great tool. It has helped us in many ways to handle a lot of the challenges we’ve experienced while doing app development. When we release a new app for the AppStore it could have been everything from a few hours to days since we sent the app to Apple for approval. And when the app is available in AppStore, it can take up to several days, weeks or months before the users updates their app. This means that there are a lot of users out there that uses different versions. Fortunately, a lot of users do an automatically update every night, so most of our users will normally use the latest version within a few days. 

So to be able to handle feature toggling or changes in all the different app versions, we’ve set up several remotely configurable parameters in the app. Let’s say that there are some general alert or notice information that we want all our users to know if they open their app. To handle this we’ve added a remote config parameter called _info_message,_ which shows up in the app if it contains any text. When the app launches, it will get the latest data from Remote Config and show this to the user. And with the _Conditions_ feature in Remote Config, we are able to schedule a config message based on time, date, app versions etc. to when the message will be showed in the app. This is very handy to set up during the day if there is any planned maintenance that we want to inform about during the night.

In December we have put a cute Santa hat on the profile icon in the app. The code for this feature has been included in all the latest versions of the app. During December we can toggle this feature on, and turn it back off again in January. No need for a timely app release, only a simple remote config change.

## Firebase Cloud Functions

When we first started developing the Entur app three years ago, all the communication to the API’s was done directly from the client. This worked well in the beginning, but as the number of active users increased, and we also needed several authenticated API calls, we started looking for something or someone that could be our BFF, or at least our Backend for Frontend. Since we already were in the Firebase domain, a natural choice was to try out Cloud Functions.

> Cloud Functions for Firebase let you automatically run backend code in response to events triggered by Firebase features and HTTPS requests. Your code is stored in Google's cloud and runs in a managed environment. There's no need to manage and scale your own servers.
>
> \
>
>
> __
>
> \
>
>
> _https://firebase.google.com/docs/functions_

Sounds great, right! But there was especially one thing we were curious about if we wore going to use Cloud Functions. And that was the _cold start_. Since these functions are serverless, the cloud server might shut down if there is no traffic, and then have to start up again it’s triggered. SInce there is no built-in way to keep the server running, our workaround was pinging some of our functions now and then to ensure that it was kept alive, so that the app user would get a fast response. 

With more active users calling our API’s through our BFF, this pinging might no longer be necessary any more, because most of our functions now is being kept alive by continuous traffic. 

In retrospective, we are very satisfied with what cloud functions have provided us. It was fast and easy to get up to run, it is stable and scales automatically. It is something we really would recommend if you want a simple backend to get started with. Nevertheless, we are now thinking about porting some of our functions to something like Google Cloud Run. This will give us some extra features that Firebase Functions can’t give us right now. This be processing concurrent requests on the same instance, as well as being able to reduce the latency even more than what we can get from Cloud Functions.

## More Firebase features

Firebase offers a lot of different features. Remote config and Cloud Functions are just two of them. For caching of data and backup of the public transport tickets we are using Cloud Firestore, a scalable NoSQL database. Fabric.io was previously used for app distribution, but this is now all integrated into Firebase App Distribution. And for testing of new app features, we are using Firebase A/B Testing to get some real world statistics of how successful or unsuccessful this new functionality might end up to be.

## Summary

Using Firebase for the last couple of years have for us been a very satisfying experience. To be able to have at least some control of the features in a distributed mobile application, Firebase have provided us with the functionality we been needed. Remote config have enabled us to turn features on and off, or add scheduled information messages directly into everyone's app. While Firebase Cloud Functions have made it possible for us to move a lot of business logic out of the app to a more controllable environment. 

We are looking forward to see what more to come from Firebase over the next years!
