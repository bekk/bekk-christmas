---
calendar: react
post_year: 2019
post_day: 9
title: Managing content with Sanity
image: ''
ingress: ''
links:
  - title: Sanity
    url: 'https://www.sanity.io/'
authors:
  - Henning Håkonsen
---
So you have an idea of an application and just started with you project. You need some static data, and because you think a CMS(Content Management System) is overkill, you want to keep it simple and create some configuration with data which is imported into your app. The data is used to present some functionality in your app, for example display restaurants, bloggpost or whatever. In the beginning this approach is awesome! The application is up and running in no time, so you go on to the next feature and keep adding data to your setup. The amount of content increases and before you know it you are stuck in management hell. 

Sanity may be the tool and the backend you need to rescue your project. It is a headless CMS which means it only cares about storing and managing your content while you can focus on the implementation of the view of your application. Sanity has very good documentation and has implemented their own query language to help grabbing the correct content for your feature.

## Getting started

Sanity is configured in a matter of minutes. First register your account [here](https://manage.sanity.io/) and proceed with the following command:

> npm i -g @sanity/cli && sanity init

Run through the simple guide, once completed your «backend» is configured and the output should be somewhat similar to this:

<img 
    src="/assets/sanity-init.png"
    style="width: 600px; height: 600px">

The directory created contains configuration for your data and the complete configuration is a set of schemas defining your data fields. The basic schema contains the following properties:

```
// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',

  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    \* Your types here! \*/
  ])
})
```

The types you define will create a schema and definition of your data modell. If we were to proceed with the restaurant case we would probably start of with a type something like this:

```
{
   name: "restaurant",
   type: "document",
   title: "Restaurant",
   fields: [
     {
       name: "restaurant_name",
       type: "string",
       title: "Restaurant name",
       validation: Rule => Rule.required()
     },
     {
       name: "restaurant_adress",
       type: "string",
       title: "Restaurant adress",
       validation: Rule => Rule.required(),
     },
     {
       name: "restaurant_type",
       type: "string",
       title: "Restaurant type",
       validation: Rule => Rule.required(),
       options: {
         list: [
           { title: "Norwegian", value: "norwegian" },
           { title: "Barbeque", value: "barbeque" },
           { title: "Sushi", value: "sushi" }
         ]
       }
     }
   ]
}
```

This document contains three fields - the name, address and type of restaurant. This is not so interesting so we want to add menu items to the document. Sanity comes with many predefined [schema types](https://www.sanity.io/docs/schema-types), but a menu type is not present. However we are able to create our own types, so we go ahead defining our menu type:

```
{
   name: "menu",
   type: "document",
   title: "Menu",
   fields: [
     {
       name: "restaurant_name",
       type: "string",
       title: "Restaurant name",
       validation: Rule => Rule.required()
     },
     {
       name: "restaurant_adress",
       type: "string",
       title: "Restaurant adress",
       validation: Rule => Rule.required(),
     },
     {
       name: "restaurant_type",
       type: "string",
       title: "Restaurant type",
       validation: Rule => Rule.required(),
       options: {
          list: [
            { title: "Norwegian", value: "norwegian" },
            { title: "Barbeque", value: "barbeque" },
            { title: "Sushi", value: "sushi" }
         ]
       }
     },
     {
       name: "restaurant_menu",
       type: "menu",
       title: "Restaurant meny",
     }
   ]
}
```

We have now defined a complex schema type of Sanity’s predefined types and we can go on using our own definition in our restaurant definition. This becomes very powerful when we want to form the «world» we are describing.
