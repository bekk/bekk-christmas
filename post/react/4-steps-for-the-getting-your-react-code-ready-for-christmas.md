---
calendar: react
post_year: 2020
post_day: 20
title: 4 steps for the getting your React code ready for Christmas
image: ""
ingress: >
  🎶 It's beginning to look at lot like Christmas...🎶 You have put up your
  favorite decorations, candle lights are the sparkling in the windows and some
  Christmas cookies are baking in the oven making a nostalgic scent. You can
  almost feel the Christmas spirit. But, wait a minute, what is that ruining
  this perfect Christmas feeling? Is that dirty react code?! There are “this”, a
  looong render method and even “classes” all over the place. With only 4 days
  left it is probably time to do some proper refactoring of your react code.
  Here are 4 steps which I have recognized to help me get going. It's time to
  roll up your sleeves.
links:
  - url: https://codesandbox.io/s/julekalender-3-deucm?file=/src/App.js
    title: Advent Candles
authors:
  - Nora Futsæter
---
## The objective of cleaning is not just to clean, but to feel happiness living within that environment

Remember the feeling of a clean house or apartment, you know where everything is, and you feel at ease. I find it as mentally comforting to have the same feeling when looking at my react code. You can do this bit by bit, or take a larger bunch, but I find the key to do it regularly. There are great benefits to having clean code. It is easier to read, write and update your code, making it faster for you to do what really matters with your application. The goal when coding is not just to solve your current problem and make it work, but to do it the right way. You want to be proud of your code and feel happiness when further working with it. 

This year we are going to refactor [this](https://codesandbox.io/s/advent-candles-1-fd99s) Advent Candles application:

![](/assets/20-react.advent-candles.png "Advent Candles application")

Looking at the code we can spot the use of classes `class App extends React.Component`, there are `states` for each of the candles, and what looks like separate functions for controlling each state. 

Does this code make you feel happy?

```javascript
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked1: false,
      clicked2: false,
      clicked3: false,
      clicked4: false
    };
  }
  //This sets the state to the opposite
  handleClick1 = () => {
    this.setState({
      clicked1: !this.state.clicked1
    });
  };

  handleClick2 = () => {
    this.setState({
      clicked2: !this.state.clicked2
    });
  };
```

Well, me neither, so let's work through this refactoring.

## Does this spark joy?

Where to start? Looking at this code you might already spot some issues that you would change, but where to start? In this application I would probably start with refactoring from the use of class to a functional component. Writing classes require more code, you need to extend from [React.Component](https://reactjs.org/docs/react-component.html) and have a render function, while writing a functional component is a plain JavaScript function. After React came with the [16.8 update](https://github.com/facebook/react/blob/master/CHANGELOG.md#1680-february-6-2019) you can also have stateful components, so it's now an easy choice. A corresponding easy first step for your refactoring might be replacing the class with a functional component. 

In the Advent Candles the `class` is replaced by a functional component and the states now use the [`React.useState()`](https://reactjs.org/docs/hooks-state.html)``

Resulting in a component that can look something like this after this first initial refactoring: 

```javascript
export const App = () => {
  const [firstLight, setFirstLight] = useState(false);
  const [secondLight, setSecondLight] = useState(false);
  const [thirdLight, setThirdLight] = useState(false);
  const [fourthLight, setFourthLight] = useState(false);

  return (
```

How we used the old states:

```javascript
<button onClick={this.handleClick1} className="candlebutton">
  {this.state.clicked1 ? (
```

Refactored code using the new states:

```javascript
<button
  onClick={() => setFirstLight(!firstLight)}
  className="candlebutton"
>
  {firstLight ? (
```

From 32 lines to 5 for the part we have refactored, I call that a good beginning!

\
[Here](https://codesandbox.io/s/advent-candles-2-uyqkz) is the code after the first refactoring.

## Let it DRY, let it DRY, let it DRY ❄️

There are four candle lights and corresponding states for them all. Is there a pattern that  repeats itself? I would say yes, and we can refactor this. It is finally time to DRY the code. DRY, or “Do not Repeat Yourself” is a principle to reduce repetition and avoid redundancy. In our application we have four candles all rendered in one large return. There are several elements that are similar, making this a perfect candidate for DRYing and make new smaller and reusable components. So, from a single large implementation we can create a small reusable component called Candle. 

Let’s split this large component into smaller reusable components.

In the return() there are four candles that have the same functionality, a state that keeps track if the light is on or off and number for which candle it is. We can create another component, Candle, that will do the same, and pass it the property of the candle number. It can look like [this](https://codesandbox.io/s/advent-candles-3-deucm): 

```javascript
const Candle = ({ description }) => {
  const [light, setLight] = useState(false);
  const toggleLight = () => setLight(!light);
  return (
    <div className="candle">
      <button onClick={toggleLight} className="candlebutton">
        {light ? (
          <span role="img" aria-label="fireemoji">
            🔥{" "}
          </span>
        ) : (
          <div className="candletop"> ⎮ </div>
        )}
        <div className="candlestick"> {description} </div>
      </button>
    </div>
  );
};
```

Now, if we want to make changes to the Candle we can do it one time at one place affecting all the candles. In the App we can now just include as many Candle components as we want and pass them the desired props. Sounds scalable?

```javascript
export const App = () => {
  return (
    <div className="App">
      <h1>✨ Advent Candles ✨</h1>
      <div className="candleContainer">
        <Candle description={"1"} />
        <Candle description={"2"} />
        <Candle description={"3"} />
        <Candle description={"4"} />
      </div>
      <h2>Click on the candles to light the fire</h2>
    </div>
  );
};
```

Every time you repeat yourself, and start copy paste, it should ring a bell. This will help you from ending up with large and bulky components that you have a hard time remembering what to do when scrolling through the component. Just, “Let it DRY, let it DRY, let it DRY”. 



## Highlight the important and get rid of the unnecessary 

Some refactoring changes are easier than others, but still important. Here is a bullet list i find useful to go through every once in a while: 

* Get rid of comments, unused imports and unused code. 
* Go through the names, will someone else understand what they mean a year from now? 
* Improve readability with destructuring your props. Instead of (props) and props.description you can destructure and pass down the props like this ({description}) and description. 

Our Advent Candles are getting cleaner and cleaner, just look at [them](https://codesandbox.io/s/advent-candles-3-deucm).

## **Make it sparkle!**

Let's sprinkle some magic on our application that will also be a gift to ourselves in the year to come. With adding tests to your application, your future you will thank you. Using [](https://testing-library.com/docs/react-testing-library/intro/)[react-testing-library](https://testing-library.com/docs/react-testing-library/intro/) you can test your react components how a user would use them. React-testing-library is focused on the way the components are used, and not so much the implementation details of the components. Rather than having access to props and state, the tests are related to how the user interacts with the components. If you want to read further about react-testing-library, I can recommend [this]([https://react.Christmas/2020/6](https://react.christmas/2020/6)) article. 

So, let's connect the dots, how does this relate to our refactoring? Tests can actually indicate if further refactoring is needed. If you have to write long tests in order to test your component, it is probably time to split the component. The Advent Candles application first had one single large implementation of the User Interface. However, when refactoring the code, we split the code into two functional components; App and Candle and we now have an application that is easier to test. So, in order to increase testability it is a good practice to split components into smaller independent components. 

\
[Here](https://codesandbox.io/s/advent-candles-4-up11x?file=/src/__tests__/App.js) is how our Advent Candles application looks like with some tests.

Writing the tests based on the components behavior also has some advantages for future refactoring. What the component wants to accomplish. When refactoring the Advent Candle application, we did not change what the components did, only how they did this. This is a key element to be a support for refactoring instead of a redraw. When we a year from now want to refactor the application, we can do this without using a lot of time trying to understand how the tests worked, and what will make them pass. So, with behavior-based tests we can in the future do further refactoring and know that the tests will tell us only if we do changes that change the behavior. They can give you confidence knowing that you don't break anything, and you can work faster and write new functionality. We can now test the components individually, and when in the future we change the code we have a better understanding for where in the code the break is happening is something break. Neat huh? 

## It's beginning to look a lot like Christmas

Now it is actually beginning to look a lot like Christmas. We have refactored our Advent Candles Christmas decoration - thrown away the old class component, made a small reusable Candle component, removed the dust and refactored the application to something that sparks joy. 

![](/assets/20-react.advent-candles.png)

The Advent Candles still look the same and have the same functionality, but you know that underneath the code is more scalable, testable and easier to further implement new functionality. So, with no longer dirty code to get annoyed by, just code ready for future functionality and refactoring supported by our magic tests it's finally beginning to look a lot like Christmas.