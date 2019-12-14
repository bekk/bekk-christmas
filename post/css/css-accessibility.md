---
calendar: css
post_year: 2019
post_day: 15
title: CSS Accessibility - keeping focus
image: ''
ingress: >-
  Did you know that you might be required by law to create accessible websites? 


  In many countries, government agencies has been required to create websites
  that comply with WCAG 2.0 for a long time, and in for instance Norway, this
  requirement also apply for private companies.


  For a general introduction to accessibility, I recommend reading the article
  from [day 6 in our UX Christmas calendar](https://ux.christmas/2019/6), and to
  see all the technical tidbits involved, I recommend going through the
  checklist found at https://www.wuhcag.com/wcag-checklist/.


  As this is a CSS Christmas calendar, let’s focus on the stuff we control using
  CSS, and today, it is all about keeping focus!
links:
  - title: Day 6 in our UX Christmas calendar
    url: 'https://ux.christmas/2019/6'
  - title: Technical WCAG Checklist
    url: 'https://www.wuhcag.com/wcag-checklist/'
  - title: Focusing on focus styles
    url: 'https://css-tricks.com/focusing-on-focus-styles/'
  - title: Pure CSS accessible checkboxes and radio buttons
    url: >-
      https://medium.com/claritydesignsystem/pure-css-accessible-checkboxes-and-radios-buttons-54063e759bb3
authors:
  - Hans-Christian Fjeldberg-Gustavson
---
## :focus

How many of you have done this before, I know I have:
```
:focus {
    outline: none;
}
```
Great, we just made our site useless for those who really need and rely on this feature, and at the same time made our site less usable for the rest of our users. And, if we do not offer an alternative way of showing if an element is in focus, a fine might be one its way, since we are not complying with [Success Criterion 2.4.7 Focus Visible](https://www.w3.org/WAI/WCAG21/Understanding/focus-visible.html)!

Ok, but I didn’t actually add that line of CSS you say, it is part of my CSS Reset you say. Ok, but then it might be time to update your css reset, as the most used CSS Reset from Eric Meyer removed this css in 2011…

## Controlling the focus

I highly recommend reading https://css-tricks.com/focusing-on-focus-styles/ for detailed information about everything focus. Different designs require different considerations when choosing how you are showing focus, but whatever you end up choosing, remember to take into account all the other WCAG Success Criterion to make sure you do not break compliance with more rules.

## Don’t forget to focus on your fancy designs

We love fancy design, or at least our users and designers love fancy design, and especially custom radio, checkboxes and dropdowns. As developers though, we especially hate styling these three form elements, due to the fact that they are not customisable out of the box. Cue hacks!

https://medium.com/claritydesignsystem/pure-css-accessible-checkboxes-and-radios-buttons-54063e759bb3 goes through all the steps necessary for creating a custom checkbox, and the same technique applies for radio buttons and dropdowns. 

Not all custom checkboxes are created equal though, and it is depressing how little care is given to accessibility when browsing for custom css forms. When searching for “custom checkbox” on codepen.io, almost all top examples did not have proper accessibility. 

To make sure you custom css forms are accessible:

1. Do not remove the initial input element from the DOM.

You might be tempted to apply

```
input[type="checkbox"] { display: none; }
```

to your checkbox. You just lost screen readers, and the possibility of controlling the focus state. The better way is to use \`opacity: 0;\` and move the original checkbox out of the way so that it does not take up any space.

2. Style your ::before or ::after based on the focus state

The work is almost done, it is just a matter of adding some focus style:

```
input[type="checkbox"]:focus + label::before {
    outline: #ff0a0e auto 5px;
}

```
