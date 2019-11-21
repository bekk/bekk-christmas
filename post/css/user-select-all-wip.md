---
calendar: css
post_year: 2019
post_day: 1
title: 'user-select:all; - WIP'
ingress: >-
  NB! endringer i dette dokumentet vil bli overskrevet da jeg må rydde opp i
  kode og ikke får merga endringene i koden her og lokalt
authors:
  - Dag Frode Solberg
---
When creating a creating a website, you are trying to solve some real world problem. People don't come to your website to look at the website. There might be interesting content or importaint information they need. Often the information they need is copied into some other application.

The following table containts some cells that are easy to copy and some that is a bit harder to copy.

<iframe height="300" style="width: 100%;" scrolling="no" title="css/user-select/1" src="https://codepen.io/dagfs/embed/abbXmyG?height=300&theme-id=default&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/dagfs/pen/abbXmyG'>css/user-select/1</a> by Dag
  (<a href='https://codepen.io/dagfs'>@dagfs</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## User select:all;

By adding some css to the table, we can make all the text in the cells selectable by a sing click. This currently works for firefox and Chrome.

The css we have added to the table is:

```css
table {
  user-select: all;
}
```

<iframe height="300" style="width: 100%;" scrolling="no" title="css/user-select/2" src="https://codepen.io/dagfs/embed/gOOqwGY?height=300&theme-id=default&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/dagfs/pen/gOOqwGY'>css/user-select/2</a> by Dag
  (<a href='https://codepen.io/dagfs'>@dagfs</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## Cursor

Add a cursor to make it easier to understand you can copy that show you can select

```css
table td {
  user-select: all;
  cursor: copy;
}
```

<iframe height="300" style="width: 100%;" scrolling="no" title="css/user-select/3" src="https://codepen.io/dagfs/embed/mddvrBZ?height=300&theme-id=default&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/dagfs/pen/mddvrBZ'>css/user-select/3</a> by Dag
  (<a href='https://codepen.io/dagfs'>@dagfs</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## Polyfill-ich

We now have a solution that lets chrome and firefox users understand that they can select the content in a cell. But we want to support the rest of the interent too.

First we add a class to the elements we want to be possible to select by only clicking on the element.

```html
<td class="user-select-all"></td>
```

Then we add the following polyfill to be loaded at the end of our document.

```js
// TODO

bare kjør polyfill om det er en nettleser som ikke støtter stylinga

  // based on https://stackoverflow.com/a/20079910
  //Supports IE9+
   function userSelectAll(event) {
    window.getSelection()
      .selectAllChildren(
        event.target
      );
  }
  var elementsToSelectOnClick = document.querySelectorAll(".user-select-all");
  for(var i = 0; i < elementsToSelectOnClick.length; i++){
    elementsToSelectOnClick[i].onclick = userSelectAll;
  }

```

<iframe height="300" style="width: 100%;" scrolling="no" title="css/user-select/4" src="https://codepen.io/dagfs/embed/NWWoRzR?height=300&theme-id=default&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/dagfs/pen/NWWoRzR'>css/user-select/4</a> by Dag
  (<a href='https://codepen.io/dagfs'>@dagfs</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>



## TODO

- i table head bytt ut td med th
- style tabellene
- bare kjør polyfill om det er en nettleser som ikke støtter stylinga
