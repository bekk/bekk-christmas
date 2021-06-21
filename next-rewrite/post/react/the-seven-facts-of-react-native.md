---
calendar: react
post_year: 2020
post_day: 1
title: Seven Interesting Things About React Native
image: https://images.unsplash.com/photo-1510151490593-aa277bc49f37?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1934&q=80
ingress: React Native is a React framework developed by Facebook to write code
  for mobile applications. In this article I will share some things I found
  interesting over the years working with this technology.
links:
  - url: "https://reactnative.dev/docs/components-and-apis "
    title: Core Components and APIs
  - url: https://www.monterail.com/blog/react-native-development-pros-cons
    title: Pros And Cons of React Native Development in 2020
  - url: https://adtmag.com/articles/2018/07/10/abandon-react-native.aspx
    title: Airbnb, Udacity Abandon React Native
authors:
  - Caroline Odden
---
I have worked with React Native for some years now, and have encountered one or two things that got me thinking “*huh, so that’s how it is*”. At my current project, we are developing an application in React Native. Therefore I have chosen some things that I think are interesting (or a little bit frustrating) to present to you for this first article of react.christmas 2020.

## The origin of React Native

In 2012, [Mark Zuckerberg said](https://mashable.com/2012/09/11/html5-biggest-mistake/):

> The biggest mistake we made as a company was betting too much on HTML as opposed to native

This was because Facebook was eager to use HTML5 for iOS and Android. However, this was not optimal for the stability and speed. So they were interested in making applications more natively to get better user experiences. Then, a man named Jordan Walke had been working on how to [generate UI components natively from JavaScript](https://jobninja.com/blog/short-story-react-native/). Since it was a success, there was arranged an internal hackathon in Facebook based on this work, creating a prototype for React Native. As a result of this great work, they presented an introduction for [React Native at React Conf](https://www.youtube.com/watch?v=KVZ-P-ZI6W4) in 2015!

## Five years and still version 0.63

React Native was released five years ago, in 2015, as a stable release. Today it is widely used in production by lots of both small and big companies, like [](https://wiredelta.com/10-most-popular-react-native-apps-of-2020/)[Facebook, Discord and Tesla](https://reactnative.dev/showcase). With over almost 10,000 pull requests, and nearly 20,000 closed issues on [Github](https://github.com/facebook/react-native), it has still not reached a major version following the [semver](https://semver.org/) convention. Per December 1st 2020, React Native is on version 0.63.4.

There have been some questions about when they will start using major version numbers, and they said earlier that they may bump to [version 1.0.0 when a milestone](https://www.facebook.com/groups/reactnativeoss/permalink/1604716516491643/) is reached, but this has yet to be done. Maybe they will do like React, which went [from version 0.14 to 15.0](https://reactjs.org/blog/2016/04/07/react-v15.html), which is quite a leap! [](https://reactjs.org/blog/2016/04/07/react-v15.html)

## \<View/> and \<Text/> and other components

React Native has a syntax that are pretty much equal to React, but with some differences. Instead of HTML tags such as `<div>` and `<p>`, you have `<View>` and `<Text>` components. You need to import these components for each file you are writing layout specific code. Take a look at the example below:

```jsx
import { View, Text } from 'react-native'

const MyComponent = () => (
    <View>
        <Text>
            Hello Bekk Christmas!
        </Text>
    </View>
)

```

`View` is used to group your components, and structure them the way you like. In addition, React has made it mandatory to put all your strings inside a `Text` component. And we are not done yet! When creating an app with lots of information that goes outside the screen vertically, you need to wrap your components in a `ScrollView` to manage to scroll to the bottom. So a piece of advice from my experience: Always test your application with different screen sizes. I *may* have published an app perfect for iPhone X, where you were not able to see the bottom text for an iPhone 5...

Let’s continue! You have an out-of-the box `Button` component in the style of native iOS and Android, but you can always add styling to get the look you want. And if you want to create your own *pressable* areas, you can use `TouchableOpacity` which responds to touches on components you wrap it with.

I recommend having a look at the [common components documentation](https://reactnative.dev/docs/components-and-apis) for React Native if you want to know more!

## StyleSheet.create()

Let’s talk about styles. Many of you may have a love/hate relationship with CSS. Sometimes inheritance may be a bit of a struggle, sometimes it is nice to not write the same styling all over again, time after time.

In React Native, you lose the concept of inheritance, because the styling for a component is declared in a `StyleSheet` object, and need to be added to each view.[](https://reactnative.dev/docs/style) The stylesheet object is [an abstraction of CSS stylesheet](https://reactnative.dev/docs/style) and has a little bit different syntax. In React Native you use JavaScript to to style your components. For instance, instead of kebab-case you need to use camelCase to declare your styling. In addition, everything except numbers needs to be written as a string. Look at the example below!

```jsx
import { StyleSheet } from 'react-native'

const MyComponent = () => (
    {/* Adding your style to the View */}
    <View style={styles.container}>
       {/* Your content here */}
    </View>
)

const styles = StyleSheet.create({ // Creating the StyleSheet object
    container: {
        backgroundColor: 'blue',
        padding: 16,
        position: 'absolute',
    },
})
```

As mentioned in the section about the components, you need to import the Text component from React Native when adding text to your layout. I assume you want to have the same font for your whole application, not different based on what the developer has remembered to add when developing the component. So one tip regarding font styles is to create your own component, let's call it `ThemedText`, which uses the `Text` component and add the correct font here. This way you can rely on the font being correct throughout your application. Write it once, use it everywhere.

## Flexing the boxes

Flexbox came and swept us off our feet after being accepted by the [W3C in 2013](https://medium.com/@BennyOgidan/history-of-css-grid-and-css-flexbox-658ae6cfe6d2). By being able to easily arrange your elements where you want inside a container regardless of size was a nice addition to the CSS language.

To use Flexbox in CSS, you specify `display: flex;`. When you do that, a set of default settings is set as you can see in the [documentation](https://css-tricks.com/snippets/css/a-guide-to-flexbox/). When accessing the `flex` property, the default value for `flex-direction` is *row*. This means that every component in the container will be placed horizontally on your screen. However, when using [Flexbox in React Native](https://reactnative.dev/docs/0.61/flexbox), the default for `flexDirection` is *column*.

Why, you ask? Well, I would assume that for the web applications, often designed for larger screens, you have a lot more horizontal space you can use. For native applications there are somewhat limited how much you can put in a row, so defaulting to a vertical stacking order will be more useful. This is not a big deal, but I thought it was a little bit nifty!

## iOS and Android

The concept of React Native is to write code once to target several platforms. Even though this works in most cases, there are still some pain points when developing for both iOS and Android. Having developed an application in React Native over the past years, I have experienced the “but it's working differently for iOS” moment when debugging the Android app, countless times.

For instance, when making your application accessible, not everything is equal for both iOS and Android. React Native has added support for different [accessibility use cases](https://reactnative.dev/docs/accessibility), but not every one of them is supported for both platforms. There was one case, where I wanted the application to read the changes on the screen for the user, even though the user is not focusing on that given component. For instance when the time of departure for a bus changes, it is crucial to notify the user. This resulted in adding two ways to get the voiceover feature to read the changes. One way to notify the iPhone users, another to help the Android users.

Fortunately, React Native gives you the possibility to select which code you want to apply for iOS or Android by using [Platform](https://reactnative.dev/docs/platform-specific-code). By using it you can apply the part of code you want to execute for the given platform. Look at the Hello World example below!

```javascript
import { Platform } from 'react-native'

const myFunction = Platform.select({
    ios: () => console.log('Hello iOS'),
    android: () => console.log('Hello Android'),
    default: () => console.log('Hey everyone else'),
})
```

It is also nice to use to apply the correct styling for your code. For example, at the bottom of the screen on an iPhone X where the home button used to be, there is this swipe indicator you can use to close your app. When placing buttons at the bottom of your page, it will be good on Android but will overlap with the swipe indicator. This results in the need for adding different margins for the different platforms, look at the example:

```jsx
import { StyleSheet, Platform } from 'react-native'

/* Your component here */

const styles = StyleSheet.create({
    container: {
        ...Platform.select({
            ios: {
                marginBottom: 16,
            },
            android: {
                marginBottom: 8,
            },
        }),
    },
})
```

## Not used in the Messenger app

As mentioned in the introduction, React Native is developed by Facebook. Earlier this year, Facebook announced that they would release the Messenger app, [written as native iOS and Android apps](https://engineering.fb.com/data-infrastructure/messenger/). Further on, AirBnb and Udacity said in 2018 they will no longer [be developing their applications in React Native](https://adtmag.com/articles/2018/07/10/abandon-react-native.aspx). The main reasons for this decision was more or less the immaturity of React Native. 

There are several pros and cons with React Native. The easy setup and React-like syntax really gives it an advantage. But the differences between platforms (i.e. as I mentioned over with the accessibility) and the lack of some native components (i.e. push-notification and FaceId), it has a way to evolve. It will be interesting to follow this technology in the years to come!

## That was it!

This was a little list of the most interesting things in React Native I have experienced over the years.

Hope you liked it!