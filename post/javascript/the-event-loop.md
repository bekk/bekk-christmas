---
calendar: javascript
post_year: 2020
post_day: 13
title: Let's cook up some events
image: https://unsplash.com/photos/uQs1802D0CQ
ingress: Today is St Lucia Day🕯. The bearer of light, which takes away the dark
  winter up north and brings joy, light and a common ground. Just like
  JavaScript did for browsers. Ok, that was a cheap shot, I promise it will be
  the only one, please keep reading. On this day we walk around the corridors
  with lights on our head, and make St Lucia Saffron Bun, google it and enjoy.
  And while we are on the topic of food, I am going to make the event loop in
  JavaScript more edible 🍔. You have probably heard about the event loop, but
  if it has not given you any headaches you might not have given it a lot of
  though.
links: []
authors:
  - Henrietta Eide Bleness
---
## Event loop or cooking 🤔 ? 

First thing first, JavaScript is single-threaded. Which means it can only run one task at a time. Most of the time this is totally fine, but if the task takes more than a second, let's say one minute... then we have a problem. Since JavaScript then waits for the response before it continues with the rest of the tasks. And, as you might well know, JavaScript is used in the browser, that closely equals the interface with the user. So if JS is stuck, then the UI is stuck, and we don’t want that ❌. 


I promised you to make this article more edible, and therefore I will illustrate the event loop using the preparation of our Christmas dinner. We start our cooking by reading the recipe for Christmas Ribbe (pork belly). An amazing Norwegian tradition. We read the recipe top to bottom before executing the first task on the list, much like how JavaScript reads functions. 

Furthermore, let's pretend we are single threaded as well. Therefore, we read the recipe and start the first task, which is preparing the ribbe.


## Could you pass me the callback?

In the preparation, we have to start with the seasoning. This should be done 3 days beforehand, and then it shall cook for 3 hours. If we could only execute one task at the time then all the other cooking, sausages, potatoes etc, would have to wait until the ribbe is done. With this logic, good luck impressing your family with an elegant delicious dinner. And hopefully ribbe is the first on the list and not the last 😱 Luckily, we’re not single threaded, and the same goes for JavaScript, in some way. The reason I can make such a bold statement is because the browser gives us some handy features we can use when executing our code, Web API. 


The Web API includes the DOM API, setTimeout, HTTP request among others. Before we dive into the Web API we have to establish that the JS engine uses a call stack for all tasks it has to execute. Since it’s a stack, it’s first in first out. And when the function returns a value it is taken out of the stack. This is where the setTimeout, for example, comes in handy. By wrapping the arrow function in a setTimeout the call stack sends the arrow function to the Web API. Then the Web API holds on to the callback until the timer is done. The Web API runs the timer set in the function and then adds it, not back onto the call stack, but to the queue.


So, now we know that JavaScript can handle multiple events by using the features provided by the Web API. For simplicity we will only focus on the cooking, and then we can think of the oven as the Web API. We’re prepping the ribbe, using all our capacity on the seasoning. When the seasoning is done we’ll put the ribbe in the oven letting it cook for 3 hours. This action ``cookTheRibbe``` will invoke the setTimeout function, illustrating the oven letting us know the ribbe is done. 


When the ribbe is done, we can push the callback back on the call stack for execution. Although it sounds simple, this is where it gets a tad more complicated. The Web API is not allowed to push the callback straight back on the call stack. Why? Remember when we talked about JS being single threaded? Yeah... it’s still a thing. Therefore the Web API pushes the callback onto the queue. 

And this is where the event loop enters the saga. The event loop has one job, pushing callbacks from the queue to the call stack. If the call stack is empty, the event loop pushes the callback straight onto the stack. There you go, pretty easy right? 

## The end... no, too easy!

Oh, I wish the article would end here, but sadly no. Because most likely you are busy mashing potatoes, and don’t have the capacity to take the ribbe out of the oven 😬. The ribbe will have to sit in the oven until your hands are free and you can take it out. And if you already have the queue stacked up with stuffing sausage or setting the table, the callback will be pushed to the queue. But it will be at the end. Maybe for hours. Until you are free to check in. 

That’s it. If you’re not busy mashing potatoes or stuffing sausage you’ll save the ribbe from the oven, and christmas dinner will be the most delicious meal you’ll have all year. But if your hands are full, it will be stuck in the queue and wait in the oven until your call stack is cleared.

Luckily we are not single threaded and are able to save the dinner and be a family hero. However, this is why you as a developer may be a bit frustrated. Even though you set a timeout it might not be executed when you intended. And now you know why.