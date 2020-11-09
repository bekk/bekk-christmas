---
calendar: react
post_year: 2020
post_day: 1
title: The Seven Facts of React Native
image: https://images.unsplash.com/photo-1510151490593-aa277bc49f37?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1934&q=80
ingress: React Native is a React framework developed by Facebook to write code
  for mobile applications. In this article I will present some facts that I have
  experienced over the years working with this technology.
links:
  - url: "https://reactnative.dev/docs/components-and-apis "
    title: Core Components and APIs
authors:
  - Caroline Odden
---
I have worked with React Native for some years now, and have encountered one or two things that got me thinking “*huh, so that’s how it is*”. We have developed an application which is in production, that is 100% (more or less) developed in React Native. So I have chosen some facts, or quirks if you want, that I think are funny (or and a little bit frustrating) to present to you guys!

# Five years and still version 0.63

React Native was released in 2015 with the stable release. Today it is widely used in production by several small and big companies like [Facebook (the creators), Instagram, and Skype](https://wiredelta.com/10-most-popular-react-native-apps-of-2020/). With over almost 10.000 pull requests, and nearly 20.000 closed issues on [Github](https://github.com/facebook/react-native), it has still not reached a major version with the semver convention. Per 1st of December 2020, React Native is on version 0.63.3.

According to the [Semantic Versioning](https://semver.org/), you should bump the major version when *“when you make incompatible API changes”*. And trust me, it has been some breaking changes…

There have been some questions about when they will version to properly semver versions, and they said earlier that they may bump to [version 1.0.0 as a milestone](https://www.facebook.com/groups/reactnativeoss/permalink/1604716516491643/), but has not been done yet. Maybe they will do like React, which went [from version 0.14 to 15.0](https://reactjs.org/blog/2016/04/07/react-v15.html). That is quite a leap! [](https://reactjs.org/blog/2016/04/07/react-v15.html)

# \<View/> and \<Text/> and other components

React Native has a syntax that are pretty much equal to React, but with some differences. Instead of tags such as `<div>` and `<p>`, you have `<View>` and `<Text>`. You need to import these components for each file you are writing layout specific code. Take a look at the example below:

```
import { View, Text } from 'react-native'

<View>
    <Text>
        Hello Bekk Christmas!
    </Text>
</View>
```

View is used to group your components, and structure them the way you like it. In addition, they have made it mandatory to put all your text inside a `Text` Component. And we are not done yet! Creating an app with lots of information that goes outside the screen vertically, you need to wrap your components in a `ScrollView` to manage to scroll to the bottom. So pro tip from my experience: Always test your application with different screen sizes… I *may* have published an app perfect for iPhone X, where you were not able to see the bottom text for an iPhone 5...

Let’s continue! You have out-of-the box `Button` component, which look natively of iOS and android, but you can always add styling to get the right layout. And if you want to create your own *pressable* areas, you can use `TouchableOpacity` which responds to touches on components you wrap it with.

I will recommend you to check out the [common components documentation](https://reactnative.dev/docs/components-and-apis) for React Native if you want to know more!

# StyleSheet.create()

Let’s talk more about the styles. Many of you may have a love/hate relationship for CSS. Sometimes inheritance may be a bit of a struggle, sometimes it is nice to not write the same styling all over again, time after time.

In React Native, you lose the concept of inheritance, because the styling for a component is declared in a `StyleSheet` component, and added to your views.[](https://reactnative.dev/docs/style) The stylesheet object is [an abstraction of CSS stylesheet](https://reactnative.dev/docs/style) and have some differences with the syntax. For instance, instead of kebab-case you need to use camel-case to declare your styling. In addition, everything except numbers needs to be written as a string. Look at the example below!

```
import { StyleSheet } from 'react-native'

<View style={styles.container}>
   {/* Your content here */}
</View>

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'blue',
        padding: 16,
    }
})
```

As mentioned in the section about components, you need to import the Text component from React Native when adding text to your layout. I assume you want to have the same font for your whole application, not different based on what the developer has remembered to add. So one pro tip regarding font styles is to create your own component, let's call it `MyText`, which uses the Text component and add the correct font here. This way you can rely on the font being correct through your application. Write it once, use it everywhere.

# Flexing the boxes

Flexbox came and swept us off our feet after being accepted by the [W3C in 2013](https://medium.com/@BennyOgidan/history-of-css-grid-and-css-flexbox-658ae6cfe6d2). By being able to easily place your elements where you want inside container regardless og size, was a nice addition to the CSS.

When accessing Flexbox in css, you enable it by writing `display: flex`. When you do that, a set of default settings is set, as you can see in the [documentation](https://css-tricks.com/snippets/css/a-guide-to-flexbox/). When accessing the flex property, the default value for flexDirection is row. This means that every component in the container will be placed horizontally on your screen. However, when using [Flexbox in React Native](https://reactnative.dev/docs/0.61/flexbox), the default for flexDirection is column.

Why, you ask? Well, I would assume that for the web applications, you have a lot more horizontal space you can use. For native applications there are somewhat limited how much you can put on a row, so defaulting to columns to put the elements under each other will be more common. This is not a big deal, but I thought it was a little bit nifty!

# iOS and Android

The concept of React Native is to have one code for several platforms. Even though this works in most cases, there are still some pain points when developing for both iOS and Android. Having developed an application in React Native over the past years, I have encountered “but is not looking/working like that for iOS” debugging the android app.

For instance, when adding accessibility to your application, not everything is equal for both platforms. React Native have support for different [accessibility use cases](https://reactnative.dev/docs/accessibility), but not every one of them were supported for both platforms. There was one scenario, where I wanted the application to read the changes on the screen for the user, even though the user is not focusing on that given component. For instance when the departure time changes, it is crucial to notify the user. This resulted in adding two ways to get the voiceover to read the changes.

Fortunately, React Native gives you the possibility to select which code you want to apply whether iOS or Android by using [Platform](https://reactnative.dev/docs/platform-specific-code). By using this you can apply the part of code you want to execute for the different platforms.

```
import { Platform } from 'react-native'

const myFunction = () => {
    Platform.select({
        ios: console.log('Hello iOS')
        android: console.log('Hello Android')
        default: console.log('Hey everyone else')
    })
}
```

It is also nice to use to apply the correct styling for your code. For example, at the bottom of the screen on an iPhone X where the home button used to be, there is this swipe indicator you can use to close your app. When placing buttons at the bottom of your page, will be good on Android but will crash with the swipe indicator. This results in adding different margins for the different platforms, look at the example:

```
import { StyleSheet, Platform } from 'react-native'

/* Your component here */

const styles = StyleSheet.create({
    container: {
        ...Platform.select({
            ios: {
                marginBottom: 16,
            }
            android: {
                marginBottom: 8,
            }
        })
    }
})
```

However, in a perfect world, you wouldn't need Platform.select!

# The origin of React Native

In 2012, [Mark Zuckerberg said](https://mashable.com/2012/09/11/html5-biggest-mistake/)

> The biggest mistake we made as a company was betting too much on HTML as opposed to native

This was because Facebook was eager to use HTML5, also on iOS and android. However, this was not optimal for stability and/or speed.

React Native was born after an internal hackathon in Facebook in 2013, where Jordan Walke had found a way to generate [UI layouts natively from Javascript](https://jobninja.com/blog/short-story-react-native/). This resulted in that in 2015, they presented an introduction for[ React Native at React Conf](https://www.youtube.com/watch?v=KVZ-P-ZI6W4).

# Will Facebook continue to use it?

React Native is used in many applications in production, but few of them can say that the complete App is based on React Native.

As mentioned in the introduction, React Native is developed by Facebook, and earlier this year, Facebook announced that they would release the Messenger app, [written in native](https://engineering.fb.com/data-infrastructure/messenger/) where they would save lots of lots of memory.

# That was it!

This was a little list of the most interesting facts in React Native I have experienced over the years.

Hope you liked it!