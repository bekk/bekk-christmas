---
calendar: security
post_year: 2018
post_day: 19
title: Insecure Direct Object Reference
ingress: >-
  When creating a web application, or a web site with more than one page, you
  will need to reference different resources. If you create a blog, you need to
  create unique paths to all the blog posts, like we are doing in this Christmas
  calendar. You see that the url is https://security.christmas/2018/20, where
  2018 is a reference to the year, and 20 to the day of December. It is a fairly
  simple system, and you may have tried to skip ahead, but been met by a page
  saying you have to wait a bit longer?
links:
  - title: OWASP Insecure Direct Object Reference
    url: >-
      https://www.owasp.org/index.php/Insecure_Direct_Object_Reference_Prevention_Cheat_Sheet
authors:
  - Stian Fredrikstad
---
A *Direct Object Reference*, is a key which reference to some kind of resource, where the user can change the key to something else, and get another resource.
An *Insecure Direct Object Reference*, is a *Direct Object Reference* where the developers failed to implement access control to the resource.

In the calendar, we use the year and the day of December together as a *Direct Object Reference*.
This points to a file with the day as the filename, in a folder named with the year. 
If we had not secured this with access control on the current date, this would have been an *Insecure Direct Object Reference*. 
We could have secured only the calendar page, where you see the days are blurred until the current time has passed midnight on each day, but this would only leave us with false security.

Although we clearly see that securing only the listing of the hatches are not enough, these kind of vulnerabilities are quite often seen in applications. 
It seems to be difficult to get this correct, at least if the resources are used in more complex implementations. 
In our calendar, all the users have the same access control, they all need to wait until the hatch is open, but in an applications where the users have access to different resources, we have to do access control in the context of the user. 

As an example, you can access your bank accounts through your bank's web site, and other users should not be able to see your bank accounts, or worse use them to pay bills. 
If you choose to pay a bill, the bank website will show your accounts, and you are able to choose which of your bank accounts to transfer the money from. 
But what if an attacker chooses to tamper with the request sent to the server, and changes the account paying the bill, to an account belonging to someone else? 
If this succeeds and such an vulnerability exists, this would classify as *Insecure Direct Object Reference* and [Broken Access Control](https://www.owasp.org/index.php/Broken_Access_Control).

### How to do it right?

The obvious answer would of course be to check if the user has access every time a resource is referenced, but in some cases this can be difficult and in a large application it can be forgotten at some point.

There are many solutions that can be implemented, depending on the usage, and whether you are developing a new application or trying to secure an old legacy application.
An easy solution can be to run a filter which does the authorization on each request. With a filter, it is easy to review if the access control is done, but it can be difficult to make it general enough due to the usage in different contexts.

To make sure we do not have *Insecure Direct Object References*, we need to remove the *Direct Object Reference*, hence it cannot be insecure.
We can transform the resources to a list specific to the user. 
In the example where you pay your bill, you should transform the accounts to a list which only makes sense to the user.
Instead of sending the whole account number when paying the bill, you can send the index in the list, which make it impossible for an attacker to reference your account as the paying account.

It is fairly easy to test for this vulnerability, just increment that id you normally see in your url. 
If you get some resource you should not have seen, you have an *Insecure Direct Object Reference*. 
