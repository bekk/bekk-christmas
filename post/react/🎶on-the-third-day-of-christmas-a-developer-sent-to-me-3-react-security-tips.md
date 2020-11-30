---
calendar: react
post_year: 2020
post_day: 3
title: 🎶On the third day of christmas a developer sent to me.. 3 React security tips!
image: https://unsplash.com/photos/0Yiy0XajJHQ?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink
ingress: As frontend developers, we tend to focus on the users experience with
  our application. We all might say that security on our minds, but we rely more
  often than not on somebody else to handle this. Luckily, modern web
  frameworks, like React, come with built-in security against one of the dangers
  of the web – Cross Site Scripting (XSS) attacks. But what does React defend us
  from and more importantly what does it not?
links:
  - title: "OWASP top ten: Cross site scripting"
    url: https://owasp.org/www-project-top-ten/2017/A7_2017-Cross-Site_Scripting_(XSS)
authors:
  - Julie Hill Roa
---
One of the most common security issues found in web applications is XSS vulnerabilities. XSS is an attack where an untrusted source places malicious data in your web application. The browser interprets this as code and a legitimate part of your application. Because of this the attacker gets full access to the application in the users’ browser. With this access the attacker can do unwanted actions on behalf of a user, get the users secrets like passwords or credit cards or call the applications API to get more information.

The most successful way to prevent this attack is to never let untrusted data be a part of your application. This is however not feasible in most cases. Web applications today is often based on user input like comments and status or fields for entering information needed to give the users the service they are looking to get from you.

**Built-in defences**

React is one of the modern frameworks that has built-in defences agains XSS vulnerabilities. When a component is created, React is aware of the possibilities of malicious code. By default, React will escape all data embedded in JSX insuring that nothing can be executed unless explicitly written code in your application. 

Escaping basically means to remove or replace characters that can be interpreted as code.\
An example of escaping: 

```javascript
<script>alert('Merry Christmas from your attacker🎅')</script>
```

Will end up like: 

```javascript
&lt;script&gt;alert('Merry Christmas from your attacker🎅')&lt;/script&gt;
```

With Reacts escaping it is safe to place untrusted data in JSX` return ( <p>{ christmasCarol }</p> );` Even if there is a script in the `christmasCarol`, it wil not be executed. 

The same with the use of Reacts API and the use of` React.createElement("p", {}, christmasCarols).` React will escape all children, meaning the third argument in the `createElement` function.

React is great when it comes to security and handle a lot of vulnerabilities for us. But React can’t be responsible for it all. And by using something secure incorrectly can be insecure fast. So which pitfalls should we be mindful of and what should we look for in our code?

**DangerouslySetInnerHtml**

According to Reacts own documentation dangerouslySetInnerHtml is Reacts replacement for innerHtml. This can be used if we must set HTML from an external source or programmatically.   

```
This is how it is used
```

DangerouslySetInnerHtml is something that should be used with caution. The name of the function is not there by accident and is a name to scare developers away from using it.  Directly placing code from either an external source like an API with formatted HTML in the response or letting a user build their own web page or whatever the case may be is a serious risk to take. Although the function does not run <script> tags out of the box, there are other ways of triggering the scripts. Some html-elements' eventhandlers can be used. Especially onerror event. One example is using 



```
Example here
```

Another reason why using dangerouslySetInnerHtml is risky is the fact that since we set the value on a prop value  `__html: value` it can indicate sanitized or escaped data. Which it is not as this is ignored by Reacts auto-escaping mechanisms.  

In most cases you should avoid using this function and gain the same result with using the react framework. In cases where you find no other options be sure to sanitize the input. The most popular sanitizer is DOMPurify which can be added using NPM.

```
Example on how to use it:
```

**Handling Urls**



**Keep your framework updated!**

In Whitehat security's annual application security report, which analyses around 17 million security scans, they found that in one year there has been a 50% increase in vulnerabilities due to unpatched libraries. We use third-party libraries more and more, but sometime it can be hard to be sure if the library has vulnerabilities or not. In fact was a finding that 1/3 of all application security risk is inherited than written itself. React is no exception. Although React focus on security and strive for keeping React secure errors can and will be done. So keep your framework updated as well as other third-party libraries you may use.