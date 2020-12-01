---
calendar: react
post_year: 2020
post_day: 3
title: 🎶On the third day of christmas a developer sent to me.. 3 React security tips!
image: https://images.unsplash.com/photo-1549927455-67cc16cc490c?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80
ingress: As frontend developers, our focus is on the users experience in our
  application. How fast and efficient the application is and how smooth the
  functionality can be. We all might say security on our minds, but we often
  rely on somebody else to handle this. Luckily, modern web frameworks, like
  React, come with built-in security against one of the dangers of the web –
  Cross Site Scripting (XSS) attacks. This means that the components in our
  application is secure, right? No. What does React defend us from and more
  importantly what does it not?
links:
  - title: "OWASP top ten: Cross site scripting"
    url: https://owasp.org/www-project-top-ten/2017/A7_2017-Cross-Site_Scripting_(XSS)
authors:
  - Julie Hill Roa
---
## The danger

One of the most common security issues found in web applications is XSS vulnerabilities. XSS is a type of vulnerability that enables an untrusted source to place malicious data or scripts into a web application viewed by other users.  Because the browser interprets these scripts as a legitimate part of the code, the attacker gets full access of the current application running in the users’ browser. With this access the attacker can bypass access controls, steal the users’ secrets like passwords or credit cards or do unwanted action on behalf of another user.

The most successful way to prevent this attack is to never let untrusted data be a part of your application. This is however not feasible in most cases. Web applications today is often based on user input like comments and status or fields for entering information needed to give the users the services they are requesting. 

Another way to protect against XXS attacks is to be conscious of where the untrusted, meaning external, data are used in your application. Whether the data are placed inside two HTML-tags, in an attribute or an event handler of an HTML-tag or in other JavaScript-functions. All untrusted data should be encoded based on where this data are used in your code to ensure that the application only interprets this as data and never as actual application code. If malicious scripts are entered in your application you can make sure the scripts are rendered, but never executed. 

## Built-in defences

React is one of the modern frameworks that has built-in defences against XSS vulnerabilities. When a component is created, React is aware of the potential of malicious code injection. By default, React will escape all data embedded in JSX. Escaping basically means to remove or replace characters that can be interpreted as code.

Thus, insuring that nothing can be executed unless explicitly written code in your application.

One example of an inserted script: 

```javascript
<script>alert('Merry Christmas from your attacker🎅')</script>
```

will with escaping output like this: 

```javascript
&lt;script&gt;alert('Merry Christmas from your attacker🎅')&lt;/script&gt;
```

With Reacts escaping it is safe to place untrusted data in JSX like this:` return ( <p>{ cristmasCarolFromUntrustedSource }</p> );`  as everything is converted and rendered as string. Even if there is a script in `cristmasCarolFromUntrustedSource`, it will not be executed. 

The same also applies with the use of Reacts API and `React.createElement("p", {}, cristmasCarolFromUntrustedSource)`. React will escape all children, meaning the third argument in the `createElement` function.

React is great when it comes to security and handle a lot of vulnerabilities for us. But React can’t be responsible for it all. By using something secure incorrectly can be insecure fast. So which pitfalls should we be mindful of and what should we look for in our code?

## DangerouslySetInnerHtml

According to Reacts own documentation dangerouslySetInnerHtml is Reacts replacement for innerHtml. This can be used if we must set HTML from an external source or programmatically.   

```
This is how it is used
```

DangerouslySetInnerHtml is something that should be used with caution. The name of the function is not there by accident and is a name to scare developers away from using it.  Directly placing code from either an external source like an API with formatted HTML in the response or letting a user build their own web page or whatever the case may be is a serious risk to take. Although the function does not run`<script>` tags out of the box, there are other ways of triggering the scripts. Some html-elements' eventhandlers can be used. Especially onerror event. One example is using 

```
Example here
```

Another reason why using dangerouslySetInnerHtml is risky is the fact that since we set the value on a prop value  `__html: value` it can indicate sanitized or escaped data. Which it is not as this is ignored by Reacts auto-escaping mechanisms.  

In most cases you should avoid using this function and gain the same result with using the react framework. In cases where you find no other options be sure to sanitize the input. The most popular sanitizer is DOMPurify which can be added using NPM.

```
Example on how to use it:
```

## Handling Urls

Urls is one of the nutorious pitfalls for any front-end developer. In many cases getting data from other sources or navigating to a different domain is possible in web applications. As far as navigation goes you will probably use an a-tag like this `<a href=”some link” /a>`. This is all good, but the risk enters when you have untrusted data in your link.

Even though React escapes the props in your a-tag there are still valid ways of triggering malicious code which is not handled by Reacts escaping. The javascript: 

So as mentioned earlier escaping remove potentially harmful characters with something else. But what then when the danger is regular characters in the alphabet? 

If you let users build or add their own URLs the chances are you will be exploited. 

Here is an example:

```jsx
<a href={ “javascript: alert(‘not good’)”} />
```

It is not just a React problem, but It is important to mention to show that React can’t handle every scenario end every threat. It is neither just an a-tag problem. The same problem occurs in src attributes like on images or iframes. Trying to fix this by looking for the word javascript and remove it will not suffice. The same can b done by using data: like this: 

```jsx
<iframe src="data:text/html,<script>alert(1)</script>"></iframe>
```

If you need to let the users add the urls try adding as much as it yourself. For instance if they are adding a link to their favourite .christmas article, let them only ad the calendar, year and day instead of the whole url. If this does not suffice use a sanitizer or check that the URL starts with what you except. Like http or https as an example.

## Keep your framework updated!

In Whitehat security's annual application security report, which analyses around 17 million security scans, they found that in one year there has been a 50% increase in vulnerabilities due to unpatched libraries. We use third-party libraries more and more, but sometime it can be hard to be sure if the library has vulnerabilities or not. In fact was a finding that 1/3 of all application security risk is inherited than written itself. React is no exception. Although React focus on security and strive for keeping React secure errors can and will be done. So keep your framework updated as well as other third-party libraries you may use.