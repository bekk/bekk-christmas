---
calendar: react
post_year: 2020
post_day: 20
title: 4 steps for the getting your React code ready for Christmas
image: <a href="https://ibb.co/s3djwQW"><img
  src="https://i.ibb.co/5cgT8vK/20-react-advent-candles.png"
  alt="20-react-advent-candles" border="0" /></a>
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
## The objective of cleaning is not just to clean, but to feel happiness living within that environment ##

Remember the feeling of a clean house or apartment, you know where everything is, and you feel at ease. I find it as mentally comforting to have the same feeling when looking at my react code. You can do this bit by bit, or take a larger bunch, but I find the key to do it regularly. There are great benefits to having clean code. It is easier to read, write and update your code, making it faster for you to do what really matters with your application. The goal when coding is not just to solve your current problem and make it work, but to do it the right way. You want to be proud of your code and feel happiness when further working with it. 



This years we are going to refactor this Advent Candles application:
 
![](/assets/20-react-advent-candles.png)


```javascript
const App = () => {
  const [firstLight, setFirstLight] = useState(false);
  const [secondLight, setSecondLight] = useState(false);
  const [thirdLight, setThirdLight] = useState(false);
  const [fourthLight, setFourthLight] = useState(false);

  return (
``