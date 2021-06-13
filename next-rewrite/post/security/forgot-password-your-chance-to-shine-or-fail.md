---
calendar: security
post_year: 2018
post_day: 5
title: 'Forgot password - your chance to shine, or fail'
image: >-
  https://images.unsplash.com/photo-1520366793288-b135592be271?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=128e8f55690aaf42416cd44a84a88cc3&auto=format&fit=crop&w=1950&q=80
ingress: >-
  Make an effort on User Experience and security awareness when implementing
  "Forgot password", and avoid exposing sensitive user information
links:
  - title: 'Data breach aside, your Ashley Madison affair was never a secret'
    url: 'http://fortune.com/2015/07/20/data-breach-ashley-madison-affair/'
  - title: Hackers have got all of online adultery site Ashley Madison's data
    url: >-
      http://fortune.com/2015/07/20/ashley-madison-hack-leak-adultery-online-impact-team/
  - title: >-
      Learn about how to keep your accounts secure while minimizing customer
      friction
    url: 'https://auth0.com/learn/password-reset/'
authors:
  - Henrik Walker Moe
---
We've all used the "Forgot password"-feature somewhere on the internet. Some were positive and quick with great user experience (UX), while others were... well, not so much. Maybe you received your password back in *plain text*, maybe the procedure required you to remember your *first pet's name* or the *street you grew up in*. Implementing an insecure "Forgot password"-feature might lead to the security vulnerability **Sensitive Data Exposure** which will harm you and your users.

So let's look at a few suggestions on how make a great and secure "Forgot password"-feature!

## The user forgets, and so should you

When a user forgets their password, they want you to help them with logging in. They don't want you to help them to remember what it was in the first place.

Present the user with a "Reset password"-feature that **resets** their password. Clicking on that link can send them an e-mail/SMS with a **unique** & **time-limited** link to a page where a new password can be typed in.

Don't **ever** *retrieve* or *recover* the user's password! By retrieving or recovering their original password, the user knows *you know* their password! Not good!

## Your Ashley Madison affair was never a secret

This is a great example of abusing a well-intended feature in order to get potentially sensitive information about a victim,e.g. if a person has an account with Ashley Madison or not.

Ashley Madison was [hacked as well](http://fortune.com/2015/07/20/ashley-madison-hack-leak-adultery-online-impact-team/) (and account information was leaked), but our example here is a security vulnerability that was already in place.

### How you tell if they were having an affair?

When an "attacker" wanted to know if your e-mail address was in use, the attacker could present the *user's e-mail* to the "Forgot password"-form. If the website didn't find an account by that e-mail, an error message was shown. If the user *had* an account on the other hand, the website sent the attacker to a receipt page with further instructions...

So by observing the two "Forgot password" behavior patterns, the attacker could infer that the presence of an error message meant that you *didn't have an account*, and getting to the receipt page meant that **you did**.

Troy Hunt, who [revealed this flaw in a blog post](https://www.troyhunt.com/your-affairs-were-never-discrete-ashley/), states that the lesson for the end-user is:

> *always* assume the presence of your account is discoverable

Which is sound advice for any web citizen.

While the lesson for any website owner is that the website **shouldn't respond differently based on user input** for these kinds of sensitive security features.

## Don't use company branded e-mail templates

Heavy use of HTML-templates with images, logos, formatted text etc. will increase the risk of the "Forgot password" e-mail (or any e-mail for that matter) landing in the user's **spam folder**, or being blocked by the e-mail server's spam filters. 

Since this is such a critical e-mail which the user must receive, cut and minimize content down to just **plain text** with a simple link to reset the password.

Anything more is distracting and not helping the users in their frustrated state.

## Outsource your Identity Management

Security and identity management is hard. By not outsourcing it you need to be making sizeable investments in security and UX in order to:

* have a competitive advantage
* have a great Customer Experience (CX)
* provide a safe service for your end-users.

By avoiding rolling your own Identity management and instead using a cloud provider, such as Google, Amazon, Azure or Auth0, you can trust the experts of their fields to do the right things for you and your users.

Some vendors, like **Auth0**, have invested a lot of resources into making these features as friction-free as possible for your end-users. Their ["Password Reset"](https://auth0.com/learn/password-reset/) feature is excellent and well thought-out, and proves that they understand how important such features are to CX.  

If you do roll your own Identity management, make sure to understand the security and UX-design decisions behind examples such as these. 

I'll leave you with a quote from **Auth0**:

> Password Reset Is Critical For A Good Customer Experience
