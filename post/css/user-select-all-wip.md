---
calendar: css
post_year: 2019
post_day: 1
title: '# user-select:all; - WIP'
ingress: >-
  NB! endringer i dette dokumentet vil bli overskrevet da jeg må rydde opp i
  kode og ikke får merga endringene i koden her og lokalt
authors:
  - Dag Frode Solberg
---


When creating a creating a website, you are trying to solve some real world problem. People don't come to your website to look at the website. There might be interesting content or importaint information they need. Often the information they need is copied into some other application.

The following table containts some cells that are easy to copy and some that is a bit harder to copy.

<table>
  <thead>
    <tr>
      <td>Name</td>
      <td>Some hard to select id</td>
      <td>Long text</td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        Dag
      </td>
      <td>
        sdfshdf$s6sdf%766d#6d7dg
      </td>
      <td>
        Danish chupa chups gummies pie. Cake pudding bear claw sugar plum bear
        claw chocolate cupcake I love. Caramels marzipan caramels cake
        liquorice.
      </td>
    </tr>
    <tr>
      <td>
        Cupcake
      </td>
      <td>
        3ff3&s6ddfd#dg%dfdf
      </td>
      <td>
        Danish chupa chups gummies pie. Cake pudding bear claw sugar plum bear
        claw chocolate cupcake I love. Caramels marzipan caramels cake
        liquorice.
      </td>
    </tr>
  </tbody>
</table>

## User select:all;

By adding some css to the table, we can make all the text in the cells selectable by a sing click. This currently works for firefox and Chrome.

The css we have added to the table is:

```css
table {
  user-select: all;
}
```

<table id="table-select-all">
  <thead>
    <tr>
      <td>Name</td>
      <td>Some hard to select id</td>
      <td>Long text</td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        Dag
      </td>
      <td>
        sdfshdf$s6sdf%766d#6d7dg
      </td>
      <td>
        Danish chupa chups gummies pie. Cake pudding bear claw sugar plum bear
        claw chocolate cupcake I love. Caramels marzipan caramels cake
        liquorice.
      </td>
    </tr>
    <tr>
      <td>
        Cupcake
      </td>
      <td>
        3ff3&s6ddfd#dg%dfdf
      </td>
      <td>
        Danish chupa chups gummies pie. Cake pudding bear claw sugar plum bear
        claw chocolate cupcake I love. Caramels marzipan caramels cake
        liquorice.
      </td>
    </tr>
  </tbody>
</table>

## Cursor

Add a cursor to make it easier to understand you can copy ## before add a before
that show you can select

```css
table td {
  user-select: all;
  cursor: copy;
}
```

<table id="table-select-all-cursor">
  <thead>
    <tr>
      <td>Name</td>
      <td>Some hard to select id</td>
      <td>Long text</td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        Dag
      </td>
      <td>
        sdfshdf$s6sdf%766d#6d7dg
      </td>
      <td>
        Danish chupa chups gummies pie. Cake pudding bear claw sugar plum bear
        claw chocolate cupcake I love. Caramels marzipan caramels cake
        liquorice.
      </td>
    </tr>
    <tr>
      <td>
        Cupcake
      </td>
      <td>
        3ff3&s6ddfd#dg%dfdf
      </td>
      <td>
        Danish chupa chups gummies pie. Cake pudding bear claw sugar plum bear
        claw chocolate cupcake I love. Caramels marzipan caramels cake
        liquorice.
      </td>
    </tr>
  </tbody>
</table>

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

<table>
  <thead>
    <tr>
      <td>Name</td>
      <td>Some hard to select id</td>
      <td>Long text</td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="user-select-all">
        Dag
      </td>
      <td class="user-select-all">
        sdfshdf$s6sdf%766d#6d7dg
      </td>
      <td class="user-select-all">
        Danish chupa chups gummies pie. Cake pudding bear claw sugar plum bear
        claw chocolate cupcake I love. Caramels marzipan caramels cake
        liquorice.
      </td>
    </tr>
    <tr>
      <td class="user-select-all">
        Cupcake
      </td>
      <td class="user-select-all">
        3ff3&s6ddfd#dg%dfdf
      </td>
      <td class="user-select-all">
        Danish chupa chups gummies pie. Cake pudding bear claw sugar plum bear
        claw chocolate cupcake I love. Caramels marzipan caramels cake
        liquorice.
      </td>
    </tr>
  </tbody>
</table>

<script>
  // from https://stackoverflow.com/questions/3922139/add-css-to-head-with-javascript
   function addcss(css){
      var head = document.getElementsByTagName('head')[0];
      var s = document.createElement('style');
      s.setAttribute('type', 'text/css');
      if (s.styleSheet) {   // IE
          s.styleSheet.cssText = css;
      } else {                // the world
          s.appendChild(document.createTextNode(css));
      }
      head.appendChild(s);
   }

   addcss(`
   .test{
   background:red;
   }



 
   #table-select-all td{
     user-select:all;
   }

   #table-select-all-cursor td{
     user-select:all;
  cursor: copy; 
   }

      .user-select-all{
  user-select:all;
  cursor: copy; 
   }

   `)


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
</script>

## TODO

- i table head bytt ut td med th
- style tabellene
- finn ut hvordan legge til styling of js til julekalenderen
- bare kjør polyfill om det er en nettleser som ikke støtter stylinga
