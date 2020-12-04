---
calendar: react
post_year: 2020
post_day: 5
title: "Module Federation: Micro-frontends with WebPack 5 "
image: https://images.unsplash.com/photo-1587654780291-39c9404d746b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80
ingress: In this article, we will take a look at one of WebPack's exciting new
  features, Module Federation. This feature will allow you to dynamically load
  code from another project at runtime. Using module federation will allow you
  to share or import code from other projects with only a little tweaking in
  your webpack config. It can make a website consisting of multiple frontend
  applications appear as one seamless SPA. Neat, huh?
links:
  - title: "Documentation "
    url: https://webpack.js.org/concepts/module-federation/
  - url: https://www.youtube.com/watch?v=D3XYAx30CNc&feature=youtu.be
    title: Introduction video
  - title: "Code examples "
    url: https://github.com/module-federation/module-federation-examples
authors:
  - Hege Haavaldsen
---
WebPack is a module builder, a powerful tool that maps every module your project needs and bundles your javascript files for usage in the browser. In WebPack 5 a new exciting feature was released; Module Federation. Module Federation is a javascript architecture allowing you to dynamically load code from a different webpack build. It supports dependency sharing, i.e., the application importing the code will attempt to use its own dependencies before downloading more payload. But it will download the required dependencies if they are not available.  

This way of sharing code between webpack applications opens up a sea of possibilities. You can reuse a component from a different project without having to go through the process of publishing it. It can be used to share util functions and constants across projects. Moreover, if your website consists of many applications, you can have a dedicated app to load and route between all projects. Another use case is to incorporate a design system at runtime. Since you are fetching the components from a different origin at runtime, you can get the latest version from your design system without rebuilding and deploying. 

# Example 

I am more of a learning by doing kind of gal, so let us have a look at an example to see how it is done. In the example, we will create a simple Christmas calendar using module federation. To keep it simple all days will be made from the same component. But the wonderful thing about module federation is that we can easily outsource the remaining days to fellow programmers and import their applications later on. 

We will create one application that will be the container for all the calendar cards and a separate application to host the content of a calendar card. Then we will use module federation to import the calendar cards into the container at runtime. 

![Figure of example architecture](/assets/example.svg)

The complete example can be found [here](https://github.com/hegehaav/christmas-calendar)! 

### App 1: The Container

`app1` is a simple react application that will run on `localhost:3001`. In the `App`-component we have a simple container with a header for the calendar. 

```javascript
// calendar-container/src/App

import React from 'react';

const App = () => {	
	return (
		<main>
			<h1>Christmas Calendar</h1>
			<p> Here we will put content from app 2 </p>		 
		</main>
	);
};

export default App;
```

### App 2: Calendar Window

Next, we will create the `CalendarCard`-component in an application we call `calendar-card`. Initially, you will only see the day of the month the window is hiding. If you click the card, it will tell you how many days there are until Christmas. This application will run on `localhost:3002`.

```javascript
// calendar-card/src/CalendarCard

import  React, { useState } from  'react';

const  CalendarCard = ({ dayOfDecember }) => {
	const [isClicked, setIsClicked] = useState(false);
	const  daysUntilChristmas = 24 - dayOfDecember;
	
	return (
		<div  onClick={() =>  setIsClicked(!isClicked)}>	
			{isClicked ? (
				<p>{daysUntilChristmas} days until Christmas 🎅</p>
			) : (
				<p>{dayOfDecember}</p>
			)}
		</div>
	);
};
export  default  CalendarCard;
```

### Module federation

Now that we have created the calendar container and the calendar card in separate applications, we are ready to set up the module federation to share code between the applications. This is done in each app's webpack.config.js utilizing webpack's ModuleFederation-plugin.

We need to expose the `CalendarCard`-component that we want to import into the `calendar-container`-application. This is done in `calendar-card`'s `webpack.config.js`. We need to add the ModuleFederationPlugin to the list of plugins. In the config, we need to give the app a filename, letting the module federation know to emit a remote entry. Then we must expose the component we want to use, in our case, the `CalendarCard`-component. Finally, we will add react and react-dom to the list of shared dependencies. That way, `calendar-container` will use its own react and react-dom dependencies if available. If one of the dependencies is not available, module federation will provide a fallback dependency from `calendar-card` anyway.

```javascript
// calendar-card/webpack.config.js 

const  HtmlWebpackPlugin  =  require('html-webpack-plugin');
const  ModuleFederationPlugin  =  require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
	// other webpack config 
	plugins: [
		new  HtmlWebpackPlugin({ template: "./public/index.html" }),
		new  ModuleFederationPlugin({
			name: "calendar-card",
			filename: "remoteEntry.js",
			exposes: {
				"./CalendarCard": "./src/CalendarCard" 
			},
			shared: [ "react", "react-dom" ]
		})
	]	
}
```

Now that the `CalendarCard` is exposed, we need to tell `calendar-container` where to find it. This is done in `calendar-container`'s `webpack.config.js`. The set up is similar to `calendar-card`, but we let webpack know that it is expecting a remote module called `calendar-card`. This is done in the `remotes`-field. Here, we also specify the location of the app, which is  `http://localhos:3002/remoteEntry.js`.  As no other project is importing code from `calendar-container` - yet - there is no need to expose anything in this application. We need to list the shared dependencies in `calendar-container`  as well, to let `calendar-card` know it will not need to provide them as fallback dependencies.

```javascript
// calendar-container/webpack.config.js  

const  HtmlWebpackPlugin  =  require('html-webpack-plugin');
const  ModuleFederationPlugin  =  require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
	// other webpack config 
	plugins: [
		new  HtmlWebpackPlugin({ template: "./public/index.html" }),
		new  ModuleFederationPlugin({
			name: "calendar-container",
			filename: "remoteEntry.js",
			remotes: { calendar-card: "calendar_card@http://localhost:3002/remoteEntry.js" },
			shared: [ "react", "react-dom" ]
		})
	]	
}
```

### Putting it all together

We need an async way to load the application, this can be done by moving all the code from `index.js` into a new file `bootstrap.js`. We do this in both applications:

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; 

ReactDOM.render(<App />, document.getElementById('calendar-container'));

```

Then we dynamically import the content in `index.js`:

```javascript
// app1/src/index.js
import('./bootstrap')
```

Now we are ready to import the CalendarCard-component from `calendar-card`:

```javascript
// calendar-container/src/App

import React from 'react';

const CalendarCard = React.lazy(() =>  import('calendar_card/CalendarCard'));

const App = () => {
	const  calendarCards = Array.from(Array(24).keys());
	return (
		<main>
			<h1>This is the calendar-container app</h1>
			<div>
				{calendarCards.map((day) => (
					<React.Suspense
						fallback={<p>Loading content from app 2...</p>}
						key={day}
					>
						<CalendarCard  dayOfDecember={day + 1}  />
					</React.Suspense>
				))}
			</div>
		</main>
	);
};
export default App;
```

And voilà! We have a Christmas calendar that imports code from a separate application at runtime!

In this article, we took a quick look at WebPack 5's new feature, Module Federation. A plugin that allows you to share code between applications at run time. This is an exciting new feature that can help build micro-frontends and sharing code across platforms. We have worked with calendars and cards, but in the real world, you can imagine those being shopping carts, users, etc. We only looked at sharing code in one direction, but module federation supports multidirectional sharing of code as well. The next step could be to share code in different directions, or perhaps create more applications and set up routing between them in the container app.