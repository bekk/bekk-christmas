---
calendar: react
post_year: 2020
post_day: 5
title: "Module Federation: Micro-frontends with webpack 5 "
links:
  - title: "Documentation "
    url: https://webpack.js.org/concepts/module-federation/
  - url: https://www.youtube.com/watch?v=D3XYAx30CNc&feature=youtu.be
    title: Introduction video
  - title: "Code examples "
    url: https://github.com/module-federation/module-federation-examples
---
In WebPack 5 a new feature was released; Module Federation. Module Federation is a javascript architecture allowing you to dynamically load code from a different webpack build. This way of sharing code between webpack applications leaves you with a sea of possibilities. You can reuse a component from a different project without having to go through the process of publishing it. It can be used to share util functions and constants across projects. Or if you are creating a website consisting of many applications, you can have a dedicated app to route between all projects. Perhaps relieving you of the need for a CMS system! Furthermore, it can allow you to incorporate a design system at runtime. Since you are fetching the components from a different origin at runtime, you can get the latest version from your design system without rebuilding and deploying. The applications can also be set up to share dependencies, to avoid duplicate code.

## Example

I am more of a learn-by-doing kind of gal, so let's have a look at an example. In the example we will create a simple Christmas calendar using module federation. To keep it simple all days will be made from the same component. But the wonderful thing about module federation is that I can easily outsource the remaining days to fellow programmers and import their applications later on. We will create one application that will be the container for all the calendar windows, and a seperate application to host the content of a calendar window.

### App 1: The Container

`app1` is a simple react application that will run on `localhost:3001`. In the `App`-component we have a simple container with a header for the calendar. 

```javascript
// app1/src/App
import React from 'react';

const App = () => {	
	return (
		<main >
			<h1>Christmas Calendar</h1>
			<p> Here we will put content from app 2 </p>		 
		</main>
	);
};

export default App;
```

### App 2: Calendar Window

In `app2` we will create the calendar content  in a component called `CalendarWindow`. Initially, you will only see the day of the month the window is hiding, but if you click the box it will tell you how many days there are until Christmas. 

```javascript
// app2/src/CalendarWindow

import React, { useState } from 'react';

const CalendarWindow = ({ day }) => {
	const [ isClicked, setIsClicked ] = useState(false)
	const daysUntilChristmas = 24 - day;
	return (
	<div onClick={setIsClicked(!isClicked)}>
		{ isClicked 
			?
				<>
					<p>Woho, only { daysUntilChristmas } days left to Christmas</p> 
				</>
			: 
				<p>{day}<p>
		}
		<div>
	);
};
export default CalendarWindow;
```

### Module federation

Now that we have two components in separate applications we are ready to set up the module federation. This is done in each app's `webpack.config.js` utilizing webpack's `ModuleFederation`-plugin. 

In the `webpack.config.js` in `app2` we need to expose the container that we want to use in `app1`. First, we need to add the `ModuleFederationPluging` to the list of plugins. In the config we need to give the app a filename, this will let the module federation know to emit a special remote entry for app2. Then we must expose the component we want to use, in our case, we will expose the `CalendarWindow`-component.  Finally, we will add `react` and `react-dom` to the list of shared dependencies. That way, `app1` will use its own  `react` and `react-dom` dependencies if available. If a shared dependency is not avaialble in the host app, module federation will provide a fallback dependency from `app2` anyway. 

You also need to make sure that your public path is set to the URL it comes from. Otherwise, `app1`  will try to fetch the code from its own path and it will not find the remote entry. There is an update coming so that you can set up this dynamically in the host app. 

```javascript
// app2/webpack.config.js 

const  HtmlWebpackPlugin  =  require('html-webpack-plugin');
const  ModuleFederationPlugin  =  require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
	// other webpack config 
	output: {
		publicPath: "http://localhost:3002"
	}
	plugins: [
		new  HtmlWebpackPlugin({ template: "./public/index.html" }),
		new  ModuleFederationPlugin({
			name: "app2",
			filename: "remoteEntry.js",
			exposes: {
				"./CalendarWindow": "./src/CalendarWindow" 
			}
			shared: [ "react", "react-dom" ]
		})
	]	
}
```

Now that the component is exposed, we need to tell `app1` where to find it. The set up is similar to `app2`, but we let webpack know that it is expecting a remote module called `app2`. We also list the shared dependencies in `app1`, to let `app2` know it will not need to provide them as fallback dependencies.

```javascript
// app1/webpack.config.js  
const  HtmlWebpackPlugin  =  require('html-webpack-plugin');
const  ModuleFederationPlugin  =  require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
	// other webpack config 
	output: {
		publicPath: "http://localhost:3001"
	}
	plugins: [
		new  HtmlWebpackPlugin({ template: "./public/index.html" }),
		new  ModuleFederationPlugin({
			name: "app1",
			filename: "remoteEntry.js",
			remotes: { app2: "app2" },
			shared: [ "react", "react-dom" ]
		})
	]	
}
```

### Putting it all together

First, we specify in `app1` that the `remoteEntry.js`-file is from a remote host. This is done by including a script in the `index.html`: 

```html
<!-- app1/src/index.html -->
<html>
	<head>
		<script  src="http://localhost:3002/remoteEntry.js"></script>
	</head>
	<body>
		<div  id="app1"></div>
		<script src="app1.js"></script>
	</body>
</html>
```

We also want an async way to load the application, which can be done by creating a `bootstrap.js`-file and move all the code from `index.js`. Then we dynamically import the content in `index.js`:  

```javascript
// app1/src/bootstrap.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; 

ReactDOM.render(<App />, document.getElementById('app1'));
```

```javascript
// app1/src/index.js
import('./bootstrap')
```

Now we are ready to import the `CalendarWindow`-component from `app2`:

```javascript
// app1/src/App

import React from 'react';

const CalendarWindow = React.lazy(() => import("app2/CalendarWindow")); 

const App = () => {
	const calendarWindows = Array.from(Array(24).keys());
	return (
		<main >
			<h1>Christmas Calendar</h1>
			{calendarWindows.map((day) => (
				<React.Suspense fallback={<p>Loading content from app2...</p>}>
					<CalendarWindow day={day}/>
				</React.Suspense> 
			))}
		</main>
	);
};

export default App;
```

And voilà! We have a Christmas calendar in `app1` that imports its calendar windows from a seperate application!