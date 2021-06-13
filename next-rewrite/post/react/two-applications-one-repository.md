---
calendar: react
post_year: 2019
post_day: 23
title: 'Two Applications, One Repository'
image: >-
  https://images.unsplash.com/photo-1485841890310-6a055c88698a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80
ingress: >-
  When you’re developing similar apps for the web and native platforms, it's
  hard to find a project structure that works well. Let's take a look at how our
  team is approaching this challenge for maintaining different view layers,
  while sharing most of the business logic.
description: >-
  An article about how you structure a project with both web and native
  implementations in React and React Native.
links:
  - title: 'Firebase features, React Native and Entur'
    url: 'https://thecloud.christmas/2019/17'
  - title: Patching your node_modules
    url: 'https://opensource.christmas/2019/4'
authors:
  - Caroline Odden
  - Kent Andersen
---
## The Web and the Native

We are working on the web and native applications for [Entur](https://www.entur.org/about-entur/), which provides a journey planner for public transportation in Norway. These applications let the user plan their journey, buy tickets, create a profile, add payment options, and much more. To be able to create all of these features, we're using React for web and React Native for iOS and Android.

We have the (dis)advantage that the web and native applications mostly (but not completely) contain the same functionality. And as you may have guessed, this creates two very similar, yet different, code bases. We wanted to have the same business logic for both applications, but didn't want it to introduce unnecessary complexity to our view layer. We wanted to separate the views from the business logic, but at the same time minimize the duplication of the code. In addition, we wanted to be able to implement features for both platforms at the same time. Therefore, we ended up with a _monorepo_.

## The Monorepo

A monorepo is just a repository containing several projects, and how you structure it will affect the developer experience. 

When developing Feature X for the web application, where 95 % of the code will be identical to the native one, where does it make the most sense to put your components? There's no easy answer here, and it's totally independent of the developer. Just check out [Mathilde's article from yesterday](https://react.christmas/2019/22)! However, we decided to divide our code into subfolders that contains the code for both web and native, called **domain packages**.

### The Domain Packages

We create subfolders that contains all the files for web and native and we separate them by the domain _we feel_ they belong to. For instance, we have created a subfolder for everything regarding the profile page, and another folder for things that applies to the travel suggestions (called journey). By doing it this way we're able to easier compare the components and share the business logic across web and native without too much overhead.

In addition to the domain packages we have a `client-app` and `client-web` folder which are the entry points for the different applications. Here is a rough snippet of our structure:

```
packages
    |_ client-app
        |_ index.js
    |_ client-web
        |_ index.js
    ...
    |_ journey
        |_ index.native.js
        |_ index.web.js
    |_ profile
        |_ index.native.js
        |_ index.web.js
    ...
```

Actions, reducers, sagas and helper files are typically files we use to share between the applications. They are put in separate files and folders in the current domain packages, and since both the web and app components are in short distance of each other, locating it is a breeze.

```
|_ profile
    |_ index.native.js
    |_ index.web.js
    |_ helper.js
    |_ reducers
    |_ actions
    ...
```

There are both positive and negative sides to working with a monorepo. So far, we like the domain package structure we are going for. At first look it seems a little bit chaotic, but when you get used to the domain of our application it's pretty easy to follow! Of course, it's not easy to know when to create a new package, and when to not, or even when to delete them. For example, in our case the product we are creating is a journey planner, and it is super hard not to put everything in the `journey` domain package! 😅 And of course, we have that one folder, the `utils`-folder, where all the stuff we don't know where to put is placed!

When you are done developing a feature for one of the platforms, it's often relatively straight forward to develop it for the other. Since all the logic, design and architecture is taken care of already, most of the work left is to "port" the views from native to web or vice versa. 

Of course it isn't always as easy to convert one view from native to web, because there are some corner cases in the business logic, device capabilities, and the styling when it comes to vertical vs. horizontal design, but all in all, it's a pretty pleasurable experience.

## The Setup

So, a monorepo helps us with shipping features this way, but how do you configure this?

If deciding on a project structure is not difficult itself, getting the tooling and supported frameworks to work is another uphill battle. 

First, importing internal and external modules. Needless to say, we do not want to worry about whether a module is part of the monorepo or from an external repository, like NPM. Luckily, **Yarn** has a feature tailored towards monorepos called _workspaces_. It solves the issues of symlinking modules together, de-duplicating dependencies across packages, and keeping it all in a single yarn.lock file. As a result dependency resolution works just as you would expect. Need to access an exported module from another package? Just add `import { something } from "@entur/profile"`. Need to add a dependency to one of your packages, just run `yarn add date-fns`. The only difference from a traditional JavaScript repository is that you have one `package.json` for every package, in addition to the root `package.json`.  

### Bundling

Secondly, bundle everything. Building these applications requires two different build systems. For web we use **Webpack** and for React Native - **Metro**. Both systems implement the same concept, one main entry file with references (directly or indirectly) to the entire application, which is then traced and bundled into a single file. When separate implementations are required for the different applications, a `.web.js` or `.native.js` file extension can be added to expose the file to only one of the build systems. Metro has built in support for `.native.js`, and Webpack can be configured to also accept `.web.js`.

### Third Parties

Thanks to Yarn workspace module resolution works out of the box. However, library developers sometimes requires files to exist in a certain location. When there is no way to override the config, or get a pull-request accepted, the last resort is to patch source files. If you’re new to patching, check out [Mats Byrkjeland’s post about patching your node_modules](https://opensource.christmas/2019/4). The advantage of patching is that you can make the change as specific as you need. The disadvantage is now you have to support the patch for every library update. Luckily not all files changes with every release, and for us patching is rare.

## Other Possibilities

A monorepo is not the only solution when developing for native and web. When these applications was created, we had absolutely all the business logic on the client side, which affected the choice of having one repository. Over the years we have moved more of our logic over to cloud functions (see the article written by Carl Joachim about [Firebase features in Entur](https://thecloud.christmas/2019/17)), that could have influenced the decision of a monorepo vs. several repositories today. 

Another possibility when developing for native and web, is the `react-native-web`. It provides much of the logic and code of [React Native for the web](https://github.com/necolas/react-native-web). We tried to use this as a part of our project, but decided to remove it due to the lack of semantics. The div-o-rama that goes along with the native code bleeds over to the web applications. Another example is the repetitive styling you need for React Native components, which is separate styling for each view due to the lack of inheritance. In addition we had rarely a 100 % one-to-one connection between native and web, which in most cases would create separate views. 

So, all-in-all, it is hard to give a correct answer of what you should use when developing for web and native applications. However, even with the complexity of the setup we have been through, we are satisfied with our structure and would recommend it to others struggling with the decision of the setup of your projects!
