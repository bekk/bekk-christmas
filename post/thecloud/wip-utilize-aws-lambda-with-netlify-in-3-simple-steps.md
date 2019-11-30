---
calendar: thecloud
post_year: 2019
post_day: 1
title: Take your functions to the cloud with 3 simple steps
image: >-
  https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3306&q=80
ingress: >-
  Have you ever deployed a static site, but found yourself in need of an API
  endpoint? Perhaps you needed somewhere to post form data, but the thought of
  setting up your own server, manage the endpoint and write the logic seemed
  like too much work. Not anymore
description: >-
  Learn how to utilize AWS Lambda functions in the cloud using Netlify in three
  simple steps.
links:
  - title: Netlify.com
    url: 'https://www.netlify.com/'
  - title: Netlify-cli documentation
    url: 'https://docs.netlify.com/cli/get-started/#installation'
  - title: Netlify functions overview
    url: >-
      https://docs.netlify.com/functions/overview/#manage-your-serverless-functions
authors:
  - Sindre Moldeklev
---
I recently created a static webpage and needed an API endpoint. The page was a simple landing page, with a contact form where potential clients could reach out.The choice of hosting for the site fell on [Netlify](https://www.netlify.com/), and they just happen to have a super simple way of utilizing AWS Lambda Functions.

In this post, I will show you how to setup an API endpoint for whatever your heart desires in three simple steps.

###### Prerequisites

For the three steps, there are some prerequisites that needs to be met:

- Sign up to [Netlify](https://www.netlify.com/).
- Install `netlify-cli` with `npm install -g netlify-cli`.
- Create a repository on Github, or connect an existing repository to your site. The repository cannot be empty when connecting to Netlify.
- Create a new site in Netlify with the following command: `netlify init` and follow the prompt in the terminal.
  - When prompted if you want the cli to create a netlify.toml-file, select Y (Yes).

#### 1. Create the function

With `netlify-cli` installed, go ahead and make a new function with the following command

`netlify functions:create <name_of_your_function>`

This will trigger a prompt with a few different function templates provided by Netlify. For this demonstration I chose `hello-world`.

#### 2. Write the logic

Open your function in your editor of choice. You may use the template and just skip ahead to step 3 if you want to, or you can switch
out the template content with your own logic. I will add the following code which fetches a random quote by Donald Trump on every request. Pay attention to the fact that if you use the Donald Trump example you will have to run `npm init` and install axios with `npm install axios --save` to have a working example.

```javascript
const axios = require("axios");

async function getRandomQuote(cb) {
  const response = await axios.get("https://api.tronalddump.io/random/quote");
  cb(response.data);
}

exports.handler = function(event, context, callback) {
  getRandomQuote(data => {
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(data)
    });
  });
};
```

Using the `netlify` command, you can easily test your function locally. Just run `netlify dev` and follow the instructions in your terminal.

#### 3. Deploy your function

The last step we should do is make our endpoint available on the internet. This is as simple as running `git push` with your committed changes. Netlify will deploy your site and after a few seconds you will have an available API endpoint. To get to the admin panel of your site, run `netlify open` in your terminal. Your endpoint will be available at `https://<yoursitename>.netlify.com/.netlify/function/<your_function_name>`.

### Summary

In this short post, we have seen how easy it is to get started with Netlify functions. With just a few commands using the `netlify-cli` we have created an api endpoint where you can implement your own logic easily.

Now go ahead and make something awesome!
