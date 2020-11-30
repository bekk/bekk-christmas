---
calendar: javascript
post_year: 2020
post_day: 14
title: Higher-order functions in JavaScript
ingress: >-
  If you are well-versed in the JavasScript-universe, you probably know that
  functions are also objects in JavaScript. Everything you can do with regular
  objects and values, you can do with functions as well. You can pass them as
  parameters to other functions, declare them as variables or pass them around
  as you’d like. Since functions can be passed as parameters or returned as an
  output from another function, this has enabled *higher-order functions* to be
  built into the language.


  In this article I will demonstrate how higher-order functions have allowed me to write readable, maintainable and versatile code with fewer bugs, and how it coincidentally completely removed the need to write for-loops in my code!
description: JavaScript, higher-order functions, array, map, filter, reduce
authors:
  - Sander Sandøy
---
But, what on earth is a higher-order function? Higher-order functions stem from the functional programming paradigm, and it is defined as *a function that receives a function as an argument, or returns the function as an output.* Higher-order functions are in contrast to first-order functions, which don’t take functions as arguments or return a function as an output.\
\
During the release of ES5, a number of higher-order functions were exposed as methods on the [Array-prototype](https://developer.mozilla.org/tr/docs/Web/JavaScript/Reference/Global_Objects/Array/prototype), meaning that these functions became available to every array in the JavaScript-ecosystem. The introduction of these methods massively changed the way I work with data in JavaScript, and I will now provide examples from a simple application where I display both the power and simplicity of these higher-order functions.

## The Duckburg Lottery

Duckburg is about to hold a city lottery, and there are several hopeful contestants wanting to join Scrooge McDuck in the money bin. In this given lottery, a Duckburg-resident chooses a total of three numbers ranging from 1 to 99, and in order to win the grand prize, the lottery-contestants need guess all three numbers correctly. Accomplishing so grants you a total prize of a whopping $1,000,000!

First of all, the organizers want to know which of the residents are participating in the lottery, and they have tasked us with displaying it. The list of contestants is given on the following form:

```javascript
const contestants = [
   {
       name: "Gladstone Gander",
       lotteryNumbers: [1,2,3]
   },
   {
       name: "Donald Duck",
       lotteryNumbers: [4,5,6]
   },
   {
       name: "Fethry Duck",
       lotteryNumbers: [7,8,9]
   },
   {
       name: "Grandma Duck",
       lotteryNumbers: [10,11,12]
   }
]
```

\
In this given example, a simple for-loop could do the trick for us. We could loop through the contestants and append their names to a newly created array and log out the result. It could look something like this:

```javascript
let names = [];
for (let i = 0; i < contestants.length; i++) {
    names.push(contestants[i].name)
}
console.log(names)
```

Even though this solution does the trick, wouldn’t it be better if JavaScript could abstract some of this logic away for us? It seems bothersome to have to create a new array manually each time we want to access properties from an existing array.

## Introducing the Map-method

As I mentioned earlier, a number of higher-order functions is available to the Array-prototype, and the *[Array.prototype.map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)*-method might do wonders for us in this example. *map()* is a non-destructive transformation method which takes an existing array as input and produces an output array, based on a callback function which controls how the new array should be transformed. The callback function is called on each item in the existing array and the return value of this function is added to a newly created array. The map-method returns the transformed array while leaving the original array unchanged!

In our task of displaying the names of the contestants in the lottery, we can now specify a callback function to be run on each item in the contestant-array, and all it has to do is return the name-property of a given contestant:

```javascript
const names = contestants.map(contestant => contestant.name);
console.log(names)
```

Instead of initiating a new array, writing a for-loop and pushing items to a new array, we now changed it to be a one-liner which returns a new array containing the names of the contestants! Also note that the original array is intact, and that the map-method returns a completely new array, making it a pure function with no dangerous side effect.\
\
However, just displaying the lottery contestants is not enough. We have now been tasked with determining which contestant has won the lottery and can join Scrooge McDuck in the money bin!

Extracting the winners of the lottery could be solved using plain for-loops and manual iteration:

```javascript
const winningNumbers = [1,2,3];
let winners = [];
for (let i = 0; i < contestants.length; i++) {
   let hasContestantWon = true;
   const lotteryNumbers = contestants[i].lotteryNumbers;
   for (let j = 0; j < lotteryNumbers.length; j++) {
       if (!winningNumbers.includes(lotteryNumbers[j])) {
           hasContestantWon = false;
       }
   }
   if (hasContestantWon) {
       winners.push(contestants[i])
   }
}
console.log(winners)
```

Now, this is quite a mess. Double for-loops are rarely a pleasant sight to behold, and in this example we need multiple loops, one for contestants, and one for each contestant’s lottery-numbers. By iterating through the numbers and asserting that each number is included in the winningNumbers-array, we can determine that Gladstone Gander was lucky enough to win the lottery (who would’ve thought, right?).But, surely there must be a simpler way to accomplish this rather than double for-loops? Could there possibly exist some higher-order functions in JavaScript which can do the trick us?

## Filter to the rescue!

*[The Array.prototype.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)*-method works similarly to *map()*, being a non-destructive function which iterates through each item in an existing array. The key difference between filter and map is that filter accepts a *function predicate* as the callback function, which is a function that returns a boolean value. The result of this predicate function determines whether the element should be included in the array. In short, it filters out values that do not pass the function predicate-test.\
\
Another method available to us on the Array-prototype is the Array.prototype.every(). This method returns a boolean value, and it tests whether every element in the array passes the test implemented by the provided function. If every element passes the test, it returns the value true.\
\
Now, let’s try to apply these higher-order functions to our lottery application to determine the winner(s) of the lottery.

```javascript
const winningNumbers = [1,2,3];
const winners = contestants.filter(contestant => 
    contestant.lotteryNumbers.every(number => 
        winningNumbers.includes(number)
    )
);
console.log(winners)
```

While the previous example consisted of double for-loops and manual iteration of the two arrays, this solution actually accomplishes the same feature as the previous example in just one line, by using two of the built-in higher-order functions in JavaScript! Since the *filter()* can transform our contestants-array the way we want, we can apply the every-method as the function predicate to our filter function. This method  returns true if all lottery-numbers are included in the winning-numbers-array, and thus only the winners of the lottery are added to our winners-array.



## Computing with reduce

Now, after the lottery result is official, the organizers of the Duckburg-lottery have given us with final task. They want to know how much prize money they have to pay out to the winners of the lottery. As mentioned earlier, the winners of the lottery got a whopping prize of $1,000,000.\
\
Now, we need to compute a single value based on data from our array. We need to apply the same logic as when determining the winners of the lottery, but we need to accumulate a single value based on the data instead of creating a new array with winners. The higher-order-function that represents this pattern for the Array-prototype is called *[reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)*. Reduce builds a value by repeatedly taking a single element from the array and combining it with the current value. The parameters to the reduce-method is a combiner-function as well as a start value. The combiner-function takes two parameters, the accumulated value based on the iteration up until now and the next item in the array.\
\
In order to determine the prize money to be paid out for the lottery we can utilize the reduce-method like this:

```javascript
const LOTTERY_PRIZE = 1000000;
const prizeMoney = contestants.reduce((accumulatedPriceMoney, contestant) => {
        if (hasWonLottery(contestant)) {
           return accumulatedPriceMoney + LOTTERY_PRIZE;
        } 
        return accumulatedPriceMoney;
   }
, 0);

console.log(prizeMoney)
```

\
The ability to pass functions as values to other functions is a very useful aspect of JavaScript, and higher-order functions allow for abstraction of iteration, filtering and value accumulation, and allows for developers to instead focus on clean and readable code.\
The fact that higher-order functions are data-type agnostic when operating on data is also a nice feature, meaning that the filter-method works just as well filtering on strings as it does on numbers or any other data type you might specify in your function argument.\
\
Another key feature that the higher-order functions enforce is loose immutability, since you never have to worry about mutating the existing array and having weird side effects, instead you create new values which you either can chain with another higher-order function or you can consume them later in your program.

Higher-order functions have certainly made my daily life as a JavaScript-developer much easier, and as a nice little bonus, I have stopped writing manual for-loops!