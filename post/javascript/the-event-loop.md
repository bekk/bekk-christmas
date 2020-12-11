---
calendar: javascript
post_year: 2020
post_day: 13
title: The delicious Event Loop
image: https://images.unsplash.com/photo-1505935428862-770b6f24f629?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1647&q=80
ingress: "**Have you ever wondered what the amazing Christmas dinner and the
  Event Loop in JavaScript have in common? Well, not much. But I will use the
  preparation of this delicious meal to make the event loop a bit more
  edible.**"
links: []
authors:
  - Henrietta Eide Bleness
---
## The Light Bearer
But before we continue, today st. Lucia Day! St. Lucia Day is a big deal here in Norway. On this day we walk around the corridors with lights on our heads and hand out St. Lucia Day Buns! Google how to make them, and enjoy. St. Lucia is the bearer of light, who makes the dark winter disappear and brings joy, light and a common ground. Just like JavaScript did for browsers. Ok, that was a cheap shot, I promise it’ll be the only one, please keep reading.

#### The dinner component 
The star of the Christmas dinner, for many Norwegian families, is the Christmas Ribbe (pork belly). But you can’t shine like a star if you’re not accompanied by other great participants. For example the sausage, or the potato. With this trio, you can’t go too wrong with the dinner, so we are going to keep them in this saga. Now we have all the elements to learn about the event loop.


## My plate is full

**First thing first,**  JavaScript is single-threaded. Which means it can only run one task at a time. Most of the time this is totally fine, but if the task takes more than a second, let's say one minute... then we have a problem, since JavaScript then waits for the response before it continues with the rest of the tasks. If you’re new to JavaScript you might not see the problem with this. However, as a consumer of the internet you’ve probably been frustrated by a frozen browser, that may have been caused by this problem. Because when JavaScript is frozen, then the UI is frozen, and we do not want that ❌. 

As a thought experience, let’s say we are single threaded as well. Therefore, when we read the recipe for the Christmas dinner, we read the recipe from top to bottom, executing tasks as we go. 

<p float="left">
<img src="https://i.ibb.co/r4c5FnT/The-recipe-part-1.png" alt="Showing how JS reads the recipe for Christmas dinner" style="width:400px;  display: flex"/><img src="https://i.ibb.co/3R8yD1Y/The-recipe-part-2.png" alt="Shows how JS execute the first function called" style="width:400px;"/>
</p>

On this Christmas dinner recipe, the preparation and cooking of the ribbe is first on the list. So we start there, with the first task, seasoning. This should be done 3 days beforehand, and then the ribbe shall cook for 3 hours on Christmas Eve. If we could only execute one task at the time then all the other cooking, sausages or potatoes, would have to wait until the ribbe is done. By that logic, good luck impressing your family with an elegant delicious dinner. And just imagine if ribbe was the last task on the recipe, then your family would eat ribbe 3 days after the rest of the dinner 😱 Luckily, we’re not single threaded, the same goes for JavaScript... in some way. The reason I can make such a bold statement is because the browser gives us some handy features we can use when executing our code, Web API. 

Before we dive into the Web API we have to establish that the JS engine uses a call stack for all tasks it has to execute. Since it’s a stack, it’s ``first in, last out``. Just like a stack of plates. Let's dive in. The Web API includes the DOM API, ``setTimeout``
and HTTP request, among others. The stack won't take the task out of the stack before it returns a value. This is where the setTimeout, for example, comes in handy. By wrapping the function in a ``setTimeout`` the call stack sends the function to the Web API. Then the Web API holds on to the callback until the timer is done, before returning the function. Hence, the JS engine doesn't freeze.   

## The oven event
So, now we know that JavaScript can handle multiple events by using the features provided by the Web API. For simplicity we will only focus on the cooking, and then we can think of the oven as the Web API. We’re prepping the ribbe, using all our capacity on the seasoning. When the seasoning is done we’ll put the ribbe in the oven letting it cook for 3 hours. This action ``cookRibbe`` will invoke the ``setTimeout`` function, illustrated by the oven letting us know the ribbe is done. 

<img src="https://i.ibb.co/sqMgx8v/Passing-function-to-Web-Api.png" alt="Showing how the call stack pushes the setTimout function onto the Web API" style="width:500px;"/>

When the ribbe is done, we can push the callback back on the call stack for execution. Although it sounds simple, this is where it gets a tad more complicated. The Web API is not allowed to push the callback straight back on the call stack. Why? Remember when we talked about JS being single threaded? Yeah... it’s still a thing. Therefore the Web API pushes the callback onto the queue. 

And this is where the event loop enters the saga. The event loop has one job, pushing callbacks from the queue onto the call stack. If the call stack is empty, the event loop pushes the callback straight onto the stack. There you go, pretty easy right? 


<table>
<tr>
<td><img src="https://i.ibb.co/sm9FwQJ/Passing-to-the-queue.png" alt="Showing how the Web API pushes the function onto the queue" style="width:400px;"/></td
<td><img src="https://i.ibb.co/pXnrMsR/Passing-from-the-queue-to-the-call-stack.png" alt="Shows how the Event loop pushes the function back onto the stack" style="width:400px;"/></td>
</tr>
</table>


## The plot twist

**Sadly, it’s always a twist.** Most likely you are busy mashing potatoes, and are not able to take the ribbe out of the oven right away when it’s done 😬. The ribbe will then sit in the oven until your hands are free and you can take it out. And if you already have the queue stacked up with stuffing sausage or setting the table, the callback will be pushed to the back of the queue. There it might wait, in this example, for hours. In the browser, for minutes. 

<img src="https://i.ibb.co/tC7k7Bw/Full-stack-and-queue.png" alt="Shows how function is pushed on to the last place in the queue" style="width:500px;"/>

When the stack is cleared and the queue is empty, then the task can be executed. Hopefully the ribbe did not have to wait for hours in the oven and you’ll be the family hero. But if the queue is full, the ribbe will be burned. Let’s just hope JustEat delivers on Christmas Eve. 

**That’s it.** This is why you as a developer may be a bit frustrated. Even though you set a timeout it might not be executed when you intended. And now you know why. 