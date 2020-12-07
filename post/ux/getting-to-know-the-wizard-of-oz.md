---
calendar: ux
post_year: 2020
post_day: 8
title: "Getting to know The Wizard of Oz "
image: https://i.ibb.co/WP3Hsrd/woz.png
ingress: >+
  A story about us trying to use the Wizard of OZ method adding new
  functionality to our client’s product. 


authors:
  - Ola Claussen
---
## What is Wizard of OZ? 
Wizard of OZ is a method of prototyping and testing a product or functionality. You have to trick the user to believe that the product or service they are using is automated or fully functional when it in reality isn’t. Behind the curtain is actually someone that is manually faking everything or part of what’s happening. It is important that the user doesn’t know this, and use the product as if it was a real product, giving real feedback. 

A perfect example to explain this is voice interfaces (like Siri or Alexa).


Making a voice interface is not easy, and probably expensive. So before you decide that you want to have a voice interface in your product you should test it. Is it worth spending all that time and money on? 
The good news is that testing it might not be that hard! Instead of actually making a working code to understand and process language, you could just have someone listening with a microphone, writing or doing the commands from the user, pretending to be a machine. Then you would get insights into how “smart” this voice interface have to be, and if it’s actually working as you hoped.

ILLUSTRATION - AØEXA
<img class="light-theme-image" src="https://i.ibb.co/WP3Hsrd/woz.png" />
<img class="dark-theme-image" src="https://i.ibb.co/WP3Hsrd/woz.png" />

The Wizard of Oz method is perfect in the situation where functionality is expensive or very difficult to make, but faking it is easy. 

The name “Wizard of Oz”  is a reference to the book The Wonderful Wizard of Oz written by author L. Frank Baum in 1900 (and the iconic 1939 live-action film). Where a man hides behind a curtain pretending to be a mighty wizard by using different methods of changing his voice and projecting himself as a huge green head. 

## So lest try this method!
We got the task of making a notification system for a register we're responsible to maintain and develop. This register contains a lot of data collected from many different sources and the only way a user can find out if any of the data is changed is actually to search for it and look around. So our goal was to make the register more active in telling the user when something had changed. 

This was not easy, and we had a lot of questions. 
What would be interesting for the user to know? Notifications for everything would be overload? How do they want to get notified? When does it make sense to notify? How do they choose what to get notified about? etc...

So we did have something that we felt was a big task and take us a long time to make right. But we could fake it..ish with just a little research combined with a bit of guessing and good knowledge of how the registry worked. 


Being bold, we told the product owners that we wanted to test this and that we would have some sort of prototype/MVP finished within a month. Hoping this would be a quick way to get real feedback. 

When a month, and probably a half, had gone we launched! 

The product we launched was an office form where you could sign up to get notifications. The notifications were e-mails. One of our developers had to manually check all the responses from the form to see what notifications the user had signed up for. Then register their e-mail address into a very simple* code he had made for the purpose of the prototype. If they wanted to stop the notifications they had to answer the e-mail with “stop” so we could remove them from the code again. 

ILLUSTRATION
<img class="light-theme-image" src="https://i.ibb.co/WP3Hsrd/woz.png" />
<img class="dark-theme-image" src="https://i.ibb.co/WP3Hsrd/woz.png" />

Our plan was to run this for a month to collect feedback and data. Then use that feedback to actually begin making a “real” notification system. This did not happen. This Wizard of Oz prototype did run for almost a year. So what did go wrong? And what worked? 


Let’s start with the things that went wrong. The prototype seemed to work so well that our product owners wanted to prioritize other things. Thinking back at it, we probably, or obviously, did not explain this well enough before we started. This was, understandably, a completely different way of making IT from what they were used to.
When we wanted to shut it down because of some errors that were invisible to the users, making it dangerous if they started to trust the prototype too much. We still did not get a “go” for shutting it down. Because the money to finish this was already spent on other things, and it’s obviously better with something a little unstable than nothing. (Or is it?)  

But on the happy side, we did get a lot of feedback from users that we normally struggled to get in touch with. And the feedback we got was of better “quality” and more relevant than we probably would have gotten just by asking. We got to test a lot of functionality and the user experience of using something “real”. Some of what we learned was that getting notifications on e-mail actually worked really nice because the users are familiar with it and they get everything in “one place”. Someone actually discovered something that looked like fraud from one of the notifications. And some of our notification missed information that we did not know that they needed. 

Staring this project up again this coming year, we have much more knowledge and several users that already are invested. We have much more insights that I think we would have gotten out of a “normal” research phase. And we have not used that much money on doing it. Hopefully, we will also learn from our errors communicating projects like this in the future 😅


---

*Simple might be a very incorrect way of describing code by a designer that does not know a lot about code. (But it was written fast, and the developer hates it himself.)
