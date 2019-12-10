---
calendar: css
post_year: 2019
post_day: 13
title: But can you use this?
authors:
  - Dag Frode Solberg
---
During standup the following day, Dag was asked to share his progress on the team Christmas card. He agreed to share it on their main communication channel without slacking too much.

He shared his work and waited for feedback. It did not take long before he was asked if he had an abstract period. “Why do you ask?” he wrote in confusion. Their team lead, Selbekk answered with a screenshoot and the comment “did you test it in Safari?”.  He had not...

https://i.ibb.co/wcJDkXY/Screenshot-2019-12-10-at-17-08-26.png

“You know. You could use [Can I use](https://caniuse.com) to look up browser compatibility.“ Selbekk suggested. Dag did as suggested and found:

https://i.ibb.co/Y8WZTR3/Screenshot-2019-12-10-at-17-19-37.png
https://caniuse.com/#feat=css-clip-path

“Ok, no support for IE or Edge. That might be okay, most of the receivers of the card are using Mac or are developers so they probably use another web browser. But let's see if we can get Safari working!”

“Hmm… Partial support with prefix `-webkit-`. Let´s see if that solves it!”

```css

#three{
  position:absolute;
  left:50px;
  top:100px;
  width:400px;
  height:700px;
  background-image: linear-gradient(5deg, #1a9900 25%, #00ab17 25%, #00ab17 50%, #1a9900 50%, #1a9900 75%, #00ab17 75%, #00ab17 100%);
background-size: 49.44px 68.05px;
  clip-path: polygon(50% 0%, 80% 30%, 70% 30%, 90% 50%, 80% 50%, 100% 70%, 60% 70%, 60% 80%, 40% 80%, 40% 70%, 0% 70%, 20% 50%, 10% 50%, 30% 30%, 20% 30%);
  -webkit-clip-path: polygon(50% 0%, 80% 30%, 70% 30%, 90% 50%, 80% 50%, 100% 70%, 60% 70%, 60% 80%, 40% 80%, 40% 70%, 0% 70%, 20% 50%, 10% 50%, 30% 30%, 20% 30%);
}



```

Dag updated the code and tried to run the card again in Safari. The card worked as expected this time.

<iframe height="905" style="width: 100%;" scrolling="no" title="three with decorations with stripes with safari support" src="https://codepen.io/dagfs/embed/YzPqqmz?height=905&theme-id=default&default-tab=css,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/dagfs/pen/YzPqqmz'>three with decorations with stripes with safari support</a> by Dag Frode
  (<a href='https://codepen.io/dagfs'>@dagfs</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

“Its been some time sice i've looked into browser combatability” Dag though. “Eighter Ive forgotten to test, or it seems like the build have just fixed the prefixes by itself.”
