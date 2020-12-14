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

```
export const App = () => {
  const [firstLight, setFirstLight] = useState(false);
  const [secondLight, setSecondLight] = useState(false);
  const [thirdLight, setThirdLight] = useState(false);
  const [fourthLight, setFourthLight] = useState(false);

  return (
```

How we used the old states:

```
<button onClick={this.handleClick1} className="candlebutton">
  {this.state.clicked1 ? (
```

Refactored code using the new states:

```
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



https://codesandbox.io/s/advent-candles-3-deucm?fontsize=14&hidenavigation=1&theme=dark 

```
<iframe src="https://codesandbox.io/embed/advent-candles-3-deucm?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="Advent Candles 3"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>
```