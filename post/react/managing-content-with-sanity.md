---
calendar: react
post_year: 2019
post_day: 10
title: Managing content with Sanity
image: 'https://www.sanity.io/static/images/opengraph/social.png'
ingress: "Content management done the right way \U0001F937‍♂️"
links:
  - title: Sanity
    url: 'https://www.sanity.io/'
authors:
  - Henning Håkonsen
---
So you have an idea of an application and just started with you project. You need some content, and because you think a CMS(Content Management System) is overkill, you want to keep it simple and create some configuration with content which is imported into your app. The data is used to present some functionality in your app, for example display restaurants, bloggpost or whatever. In the beginning this approach is awesome! The application is up and running in no time, so you go on to the next feature and keep adding data to your setup. The amount of content increases and before you know it you are stuck in management hell. 

Sanity may be the tool and the backend you need to rescue your project. It is a headless CMS which means it only cares about storing and managing your content while you can focus on the implementation of the view of your application. Sanity has very good documentation and has implemented their own query language to help grabbing the correct content for your feature.

## Define your datamodell

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
export default createSchema({
  // We name our schema
  name: "default",
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    {
      name: "restaurant",
      type: "document",
      title: "Restaurant",
      fields: [
        {
          name: "name",
          type: "string",
          title: "Restaurant name",
          validation: Rule => Rule.required()
        },
        {
          name: "adress",
          type: "string",
          title: "Restaurant adress",
          validation: Rule => Rule.required()
        },
        {
          name: "type",
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
          name: "menu_categories",
          type: "array",
          title: "Restaurant menu",
          of: [{ type: "reference", to: [{ type: "category" }] }]
        }
      ]
    },
    {
      name: "category",
      type: "document",
      title: "Menu category",
      fields: [
        {
          name: "name",
          type: "string",
          title: "Category name",
          validation: Rule => Rule.required()
        },
        {
          name: "dishes",
          type: "array",
          title: "Dishes",
          of: [{ type: "reference", to: [{ type: "dish" }] }]
        }
      ]
    },
    {
      name: "dish",
      type: "document",
      title: "Dish",
      fields: [
        {
          name: "name",
          type: "string",
          title: "Name of dish",
          validation: Rule => Rule.required()
        },
        {
          name: "short_description",
          type: "string",
          title: "Short description",
          validation: Rule => Rule.max(200)
        }
      ]
    }
  ])
});
```

We have now defined a complex schema type with Sanity’s predefined types and this becomes very powerful when we want to modell the «world» we are describing.

## Use your datamodell

Sanity has implemented a very nice [client library](https://www.npmjs.com/package/@sanity/client) that we can utilize in frontend apps. It is a promise based fetch library which enables you to grab content with their query language [groq](https://www.sanity.io/docs/groq). Let's use Sanity's examples with our restaurant modell in mind. 

```
// Define our client
const sanityClient = require('@sanity/client')
const client = sanityClient({
  projectId: 'your-project-id',
  dataset: 'bikeshop',
  token: 'sanity-auth-token', // or leave blank to be anonymous user
  useCdn: true // `false` if you want to ensure fresh data
})

const query = '*[_type == "restaurant"] [0...10] | order(_createdAt asc) {_createdAt, _id, name, "menu_categories": *[_type == 'category']}'
 
client.fetch(query).then(restaurants => {
  restaurants.forEach(restaurant => {
    console.log(`${restaurant.name}: ${restaurant.menu_categories.length} menu categories `)
  })
})
```

This query fetches the last 10 restaurants created with the time of creation, an id, the name and all menu categories with their content. We have to specify what data we want from the inner data modell, hence `"menu_categories": *[_type == 'category']}` which means, give me all fields within `menu_categories` with type `category`.

## Key takeaways
1. Minimal setup, fast and easy to use.
2. The way schema is implemented lets the consumer define the level of complexity require for the use-case and offers many predefined types.
3. Non-technical people can easily manage content with Sanity's [studio](https://www.sanity.io/docs/sanity-studio).
