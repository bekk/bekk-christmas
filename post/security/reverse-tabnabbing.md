---
calendar: security
post_year: 2019
post_day: 12
title: Reverse tabnabbing
ingress: >-
  In a phishing attack the attacker will try to steal user data, e.g. login
  credentials. Reverse tabnabbing is a phishing method, and here we will try to
  explain what it is and how it can be prevented.
links:
  - title: Reverse tabnabbing
    url: 'https://www.owasp.org/index.php/Reverse_Tabnabbing'
  - title: HTML5 Security Cheat Sheet
    url: >-
      https://cheatsheetseries.owasp.org/cheatsheets/HTML5_Security_Cheat_Sheet.html#tabnabbing
authors:
  - Robert Larsen
---
Websites often refer to pages on other websites. Such links are some times opened in a new tab. If we add the `target="_blank"` to an `a`-element in HTML, the link will open in a new tab. We can also achieve the same by using Javascript. The page we link to might be either safe or unsafe. We cannot know since we have no control of it. 

A linked page opened with `target="_blank"` or by `window.open()` in Javascript, the linked page will have access to the same `window.opener`-property as the linking page. Thus, the linked page can set the property  `window.opener.location` to anything it wants. That opens a set of possibilities, and we can imagine the following attack scenario:

1. The attacker creates a page with whatever content and share it with someone on a social network, which opens the link to the attacker's page with `target="_blank"`.
2. In addition, the attacker creates a login page looking identical to the social network login page.
3. On the page shared on the social network, the attacker puts `window.opener.location = <url to fake login page>`. 
4. The fake login page appears, and ask the user to re-enter credentials. Being prompted for login credentials happens from time to time, so the user does not think too much about it.
5. Voilà. The attacker has got the user's login credentials. 

## Solutions

There are two quite easy fixes to prevent this kind of attack.

1. Add `rel="noopener noreferrer" `to every `a`-element that has `target` set to `"_blank"`. `noopener` ensures that the linked page does not have access to `window.opener` from the linking page. `noreferrer` make sure that the request referrer header is not being sent. Thus, the destination site will not see the URL the user came from. According to caniuse.com, the support for [noreferrer](https://caniuse.com/#search=noreferrer) and [noopener](https://caniuse.com/#search=noopener) is good in recent versions of major browsers. Be aware that Internet Explorer is the usual exception. 
2. If you are using Javascript you can achieve the same by setting the opener-property to null.\
   `var myNewWindow = window.open(url, name, 'noopener,noreferrer')`\
   `myNewWindow.opener = null`

If you are showing user-generated content on your page you must sanitize the input and apply "noopener noreferrer" to every link. 

We hope that you have this in mind when you develop your websites. Please refer to the links below if you want to know more.
