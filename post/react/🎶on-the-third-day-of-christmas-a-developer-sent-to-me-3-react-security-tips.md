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

Another way to protect against XSS attacks is to be conscious of where the untrusted, meaning external, data are used in your application. Whether the data are placed inside two HTML-tags, in an attribute or an event handler of an HTML-tag or in other JavaScript-functions. All untrusted data should be encoded based on where this data are used in your code to ensure that the application only interprets this as data and never as actual application code. If malicious scripts are entered in your application you can make sure the scripts are rendered, but never executed. 

## Built-in defences

React is one of the modern frameworks that has built-in defences against XSS vulnerabilities. When a component is created, React is aware of the potential of malicious code injection. By default, React will escape all data embedded in JSX. Escaping basically means to remove or replace characters that can be interpreted as code. Thus, insuring that nothing can be executed unless explicitly written code in your application.

One example of an inserted script: 

```javascript
<script>alert('Merry Christmas from your attacker🎅')</script>
```

will with escaping output like this: 

```javascript
&lt;script&gt;alert('Merry Christmas from your attacker🎅')&lt;/script&gt;
```

Because of this escaping it is safe to place untrusted data in JSX like this:` return ( <p>{ cristmasCarolFromUntrustedSource }</p> );`  as everything is converted and rendered as string. Even if there is a script in `cristmasCarolFromUntrustedSource`, it will not be executed. 

The same also applies with the use of Reacts API and `React.createElement("p", { props }, cristmasCarolFromUntrustedSource)`. React will escape the props and children, meaning all the arguments in the `createElement` function.

React is great when it comes to security and handle a lot of vulnerabilities for us. But React can’t be responsible for it all. By using something secure incorrectly can be insecure fast. So which pitfalls should we be mindful of and what should we look for in our code?

So far React seems quite safe in regards to XSS vulnerabilities, which it is. But what happens when you find yourself outside the scope of React auto-escaping?

## DangerouslySetInnerHtml

According to Reacts own documentation `dangerouslySetInnerHtml` is Reacts replacement for `innerHtml`. One use case for this function is if a response from an external source is formatted with HTML and you want to render it as originally intended. 

```jsx
export default () => {
    const [inputText, setIputText] = useState('');

    return (
        <>
          <textarea
            onChange={ (e) => setIputText(e.target.value) }
            value={ inputText }
            placeholder="Write a christmas card in HTML to your loved ones!🎅"
          />
          <div
            dangerouslySetInnerHTML={ {"__html": inputText } }
          />
       </>
    )
}
```

As shown in the Built-in defences section, escaping converts characters like `<` and `>` into `&lt;` and `&gt;` and making the rendering of this as string instead of code to be interpreted. As the point of `dangerouslySetInnerHtml` is to render the HTML given, React cannot escape the input as usual, leaving your component vulnerable for attacks.

Although injecting HTML with dangerouslySetInnerHtml will not execute `<script>`-tags by default, there are other ways of triggering a script to run. One example is using an event handler on the` img`- or `svg`-tag like this:

```jsx
<img onerror=alert("Bad 🎅 was here!") src="error">
```

Because of the vulnerabilities attached to this function React has given it an ominous name and making sure developers see the documentation by enforcing the input to be given in a prop called `__html`. However, enforcing the input in a prop might make developers believe that this value is being escaped, like props normally are when passed through functions in the React API such as createElement.

In most cases, you should avoid using this function and gain the same result by using the react framework. In cases where you find no other options be sure to sanitize the input. Unlike escaping, a sanitizer does not convert or replace characters. What it does instead is look for the unsafe parts in HTML and remove them, leaving our example above like this: ` <img src="error">`


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