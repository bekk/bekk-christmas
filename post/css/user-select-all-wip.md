---
calendar: css
post_year: 2019
post_day: 5
title: Gotta Select’em all
image: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31'
ingress: ''
authors:
  - Dag Frode Solberg
---
When creating a website, you are trying to solve some real-world problems. People don't come to your site to look at the website. There might be exciting content or important information they need. Often the information they need is copied into some other application.

The following table contains some cells that are easy to copy, and some that are a bit harder to copy.

<iframe height="320" style="width: 100%;" scrolling="no" title="css/user-select/1" src="https://codepen.io/dagfs/embed/abbXmyG?height=320&theme-id=default&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/dagfs/pen/abbXmyG'>css/user-select/1</a> by Dag
  (<a href='https://codepen.io/dagfs'>@dagfs</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

For the next few minutes, we shall explore how we can make all the cells with data easy to copy for most of the browsers in use today!

## User select:all;

By adding some CSS to the table, we can make all the text in the cells are selectable by a sinlge click. This solution currently works for firefox and Chrome. 

The CSS we have added to the table is:

```css
table {
  user-select: all;
}
```

When you click on some content in an element with the style `user-select: all;`, the browser knows it shall treat all the content as one atom. This styling lets the user click anywhere in the element and get all of the text selected.

Let us see how this works in practice: 


<iframe height="320" style="width: 100%;" scrolling="no" title="css/user-select/2" src="https://codepen.io/dagfs/embed/gOOqwGY?height=320&theme-id=default&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/dagfs/pen/gOOqwGY'>css/user-select/2</a> by Dag
  (<a href='https://codepen.io/dagfs'>@dagfs</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## Cursor

When you click on any of the content in cells, all of the cells are selected. But we do not communicate this to the users at this point. We need some way to let the user know in advance what is going to happen when they click on the text. By adding the style `cursor: cell;` to the cell, we let the user know the content of the cell can be selected.

```css
table td {
  user-select: all;
  cursor: cell;
}
```

<iframe height="320" style="width: 100%;" scrolling="no" title="css/user-select/3" src="https://codepen.io/dagfs/embed/mddvrBZ?height=320&theme-id=default&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/dagfs/pen/mddvrBZ'>css/user-select/3</a> by Dag
  (<a href='https://codepen.io/dagfs'>@dagfs</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## Polyfill-ich

We now have a solution that lets chrome and firefox users understand that they can select the content of a cell, but we want to support the rest of the internet too.

First, we add a class to the elements we want to be possible to select by only clicking on the element.

```html
<td class="user-select-all"></td>
```

Then we add the following polyfill to be loaded at the end of our document.

```js
// based on https://stackoverflow.com/a/20079910
//Supports IE9+
function userSelectAll(event) {
    window.getSelection()
      .selectAllChildren(
        event.target
      );
}

// Use CSS.suports to only run polyfill for browsers not supporting the property
if(!CSS || CSS.suports || !CSS.supports("user-select", "all")){
  var elementsToSelectOnClick = document.querySelectorAll(".user-select-all");
  for(var i = 0; i < elementsToSelectOnClick.length; i++){
    elementsToSelectOnClick[i].onclick = userSelectAll;
  }
}

```

The final result should work for most browsers. 

<iframe height="320" style="width: 100%;" scrolling="no" title="css/user-select/4" src="https://codepen.io/dagfs/embed/NWWoRzR?height=320&theme-id=default&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/dagfs/pen/NWWoRzR'>css/user-select/4</a> by Dag
  (<a href='https://codepen.io/dagfs'>@dagfs</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

It is nice to know we can manage without adding any libraries for the smaller stuff like this :D Some CSS and a bit of JavaScript goes a long way. It is also lovely to see that a simple solution can bring a lot of value for your users, but you have to make sure they are communicated clearly!
