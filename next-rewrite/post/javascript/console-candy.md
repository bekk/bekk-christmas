---
calendar: javascript
post_year: 2018
post_day: 15
title: Console Candy
image: >-
  https://images.unsplash.com/photo-1485965089147-0f655dcf01b0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3934&q=80
ingress: Why is Console.log everybody's favourite?
links:
  - title: Console
    url: 'https://developer.mozilla.org/en-US/docs/Web/API/Console'
  - title: Styling console output with CSS
    url: >-
      https://developers.google.com/web/tools/chrome-devtools/console/console-write#styling_console_output_with_css
authors:
  - Mikael Bjerga
---

Do you remember that time when you wrote that piece of flawless code, which just ran perfectly and had no weird behaviour? 
Me neither. The truth is: stuff breaks. All the time.
So it would be incredibly helpful if we could have some way of outputting stuff as it runs.
Wait … we have? Sweet!

## What does the console say?

You probably already know about our trusty little helper `console` and his friend `log`. 
Want to print something to the console? 
Throw a `console.log` in there! 
Easy peasy.

```js
console.log("Parapapapa, I'm loggin' it");
```

But did you know that `console` is a really popular guy and has lots of other friends? 
They're tired of `log` getting all the attention, so let's get to know them too!

### Warnings and errors

`warn` and `error` are `log`'s cousins. 
They're both similar to `log`, but have their own personalities and a bit more flare. 
`warn` is fond of yellow and also puts a warning icon next to what you want to output. 
Pretty neat if you want something to stand out, like a warning! 

```js
console.warn('DANGER ZONE!');
```

`error` is even more dramatic, preferring to output messages like errors, in classic oh-no-red and with a handy stack trace from where it was called.
Jam it inside an if-clause to make sure those naughty variables aren't `undefined`, or contain any values they shouldn't. 

```js
function ohNo() {
  console.error('Get to the choppa!');  
}
```

### Assertions

If you like that scary red color, you could also ask `assert` to help. 
`assert` is rogue vigilante who roots out falsehoods wherever it finds them. 
If you give it a boolean expression, it'll let you know straight away if it evaluates to false, by kicking it in the shins and outputting the supersecret message you agreed on.

```js
const batmanScore = 98;
const supermanScore = 37;

const message = 'Not the log we deserve, but the one we need right now';
console.assert(supermanScore > batmanScore, message, [supermanScore, batmanScore]);
```

### Counting

Another quirky comrade is `count`. 
`count` is like an obsessive version of `log`. 
It'll output what you give it, but it always keeps track of how many times that particular output has been printed. 
Also, because it's kind of a show off, it will tell you what that number is. 
Every. 
Darn. 
Time.

```js
reasonsToBeSad = ['Up', "I can't grow a beard", "The popularity of the song 'Despacito'"];

for (const reason of reasonsToBeSad) {
  console.count('This is so sad. Alexa, play Despacito.');  
}
```

### Tables

Do you like magic? 
Of course you do. 
Who doesn't? 
`table` is a bit of a magician. 
You give it some data and it'll transmogrify that data straight into a table, all McGonagall style. 
It doesn't even care if the data is an array or an object – it does both! 
This bad boy can fit so much data in it.

```js
const statistics = [
  {'expected': 'The Aquaman movie was good', 'pollData': '12%'},
  {'expected': 'Monday', 'pollData': '36%'},
  {'expected': 'The Spanish Inquisition', 'pollData': '0%'},
];

console.table(statistics);
```

### Groups

With all these console possibilities, it might get a bit hard to follow, right? 
Wrong! 
The grouping gang has your back. 
Just put anything in between `group` and `groupEnd`, and they'll make sure any console output in there gets grouped together. 
Are you a bit of a minimalist? 
Use `groupCollapsed` instead of `group` and you won't believe what happens next: the group output is collapsed by default! 

```js
console.group('open');
console.log('now');
console.log('you');
console.log('see');
console.log('me');
console.groupEnd();

console.groupCollapsed('closed');
console.log('now');
console.log('you');
console.log("don't");
console.groupEnd();
```

### Timing

The last of `console`'s buddies we'll meet today is `time` and `timeEnd`. 
They're a couple of speed freaks and love to check how fast your code is. 
Put `time` in front, to bellow “START”, and `timeEnd` at the end, to yell “STOP”. 
Then they'll work out how good you did, and present your time in tiny milliseconds. 
What a **time** to be alive.

```js
console.time('Adventure time!');

for (let i = 0; i < 10000; i++) {
  console.log('What time is it?', i);      
}

console.timeEnd('Adventure time!');
```

### … and those who must not be named 

Now you know the gang! 
… Well, not all of them. 
Some are a bit shy, but if you head over to their [home](https://developer.mozilla.org/en-US/docs/Web/API/Console) I'm sure they'll introduce themselves. 

### Bonus round!

Do you want your console to look a bit extra?
Hit a string up with a `%c` and pass some CSS to make your output look all kinds of fancy!

```js
const css = 'font-size: xx-large; color: white; background-color: blue;';
console.log("%cI'm blue, da ba dee da ba bye", css);
```

Merry middle of December y'all!
