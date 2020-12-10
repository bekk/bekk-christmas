---
calendar: react
post_year: 2020
post_day: 13
title: Hot Chocolate, React Leaflet and Typescript
ingress: "For the last decade I've called Oslo my home. And aside from the usual
  goals of getting an education, landing a job and living my life, I've had a
  side quest: Finding the best places for hot chocolate in town."
authors:
  - Hanne Olsen
---
Now before I go any further, I want to make it absolutely clear that this post is not sponsored by anyone. It's simply the culmination of my love for hot chocolate. And programming.

My criteria for good hot chocolate:

* Must have the right consistency and creaminess, not too watery
* Must not be too sweet
* Any toppings is simply a bonus, but will not make my list by itself. It's all about that base.
* I must like it

But before I present my top three list, let's make the React Leaflet map.

## Setup

This will be a React project written in Typescript, requiring Node version 10 or up and NPM version 5.2.0 or higher (since we’ll be using npx). I'll be using `create-react-app` to set up our barebones React app, and will add the flag `--template typescript` to make it Typescript-based:

`npx create-react-app hot-chocolate-map --template typescript`

We'll also need some NPM packages, so navigate into our newly created application folder and add them:

`cd hot-chocolate-map && npm install leaflet react-leaflet @types/leaflet --save`

My personal preference is to make some additional folders in our project structure. A `components` folder for our React components and a `domain` folder for any custom Typescript types. Did you know you can make multiple new folders by typing in multiple folder names to `mkdir`?

`mkdir src/components src/domain`

Run the application with `npm run start` and let's begin programming! The barebones React app should open a new browser window with the app running. 

## The map basics

We'll start by making our map component `FavoritesMap.tsx` inside the `components` folder. I'll add the basic setup for our React Leaflet map here, as well as the imports we’ll need later.

```tsx
import L, { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, TileLayer, Popup } from 'react-leaflet';
import React from "react";

export default function FavoritesMap() {
	// Default coordinates set to Oslo
	const position : LatLngExpression = [59.911491, 10.757933];
	const zoom : number = 15;

	return (
		<MapContainer center={position} zoom={zoom} scrollWheelZoom={false}>
			<TileLayer
			attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
			url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			{
				// Placeholder, we'll put our markers here
			}
		</MapContainer>
		)
}
```

Let's also simplify the `App.tsx,` our app's starting point, and include our `FavoritesMap` component:

```tsx
import React from 'react';
import './App.css';
import FavoritesMap from "./components/FavoritesMap";

function App() {
  return (
    <div className="App">
    <h1>Top 3 hot chocolate locations in Oslo</h1>
      <FavoritesMap />
    </div>
  );
}

export default App;
```

Now we get to the part that *always* trips me up. Always. Because in theory, this should be everything required to make a basic map, right? Wrong. The Leaflet map needs a set height in order to display correctly. So let's add that to `App.css`:

```css
.leaflet-container {
	height: 500px
}
```

Huzzah! We have a map! 

## The favorites list as markers

Now onto the markers. Let's have a look at my list of favorite hot chocolate places, how to make them into a Typescript type and add them as markers on our map. These are all product names in Norwegian, with an English translation in parentheses.

1. Varm belgisk sjokolade (Belgian Hot Chocolate) at Steam kaffebar
2. Varm sjokolade (Hot Chocolate) at Kaffebrenneriet
3. Sjokolade på pinne (Hot chocolate on a stick) at Espresso House

To make these into a custom Typescript type, we need to systemize the information. Per item we have a product name in Norwegian, a product name in English, a vendor, a location and (since we'll display it on a map) latitude and longitude. Let's also add a description and make it an optional field. Make a new file `domain.ts` inside our `domain` folder and add the following `HotChocolate` type definition:

```typescript
export interface HotChocolate{
    productName: string,
    englishProductName: string,
    vendor: string,
    location: string,
    lat: number,
    lon: number,
    description?: string
};
```

Import the type `HotChocolate` in our FavoritesMap component.

`import { HotChocolate } from "../domain/domain";`

Now we can add our hard coded list to FavoritesMap:

```tsx
const list : HotChocolate[] = [
	{
		productName: "Varm belgisk sjokolade",
		englishProductName: "Belgian hot chocolate",
		vendor: "Steam kaffebar",
		location: "Jernbanetorget 1, Østbanehallen",
		lat: 59.91088362120013, 
		lon: 10.752799203777597
	},
	{
		productName: "Varm sjokolade",
		englishProductName: "Hot chocolate",
		vendor: "Kaffebrenneriet",
		location: "Karl Johans gate 7, Arkaden",
		lat: 59.91181003626315, 
		lon: 10.747782602301388
	},
	{
		productName: "Sjokolade på pinne",
		englishProductName: "Hot chocolate on a stick",
		vendor: "Espresso House",
		location: "Jernbanetorget 1, Østbanehallen",
		lat: 59.91201090441835, 
		lon: 10.751298468298101,
		description: "Seasonally available"
	}
];
```

Loop through these HotChocolate items and make markers. Replace the marker placeholder in the MapContainer with the finished marker list:

```tsx
{list.map((item, index) => 
	<Marker icon={icon} key={index} position={[item.lat, item.lon]} title={`${item.englishProductName} at ${item.vendor}`}>
		<Popup>
			<strong>{item.englishProductName} ({item.productName})</strong> at {item.vendor}<br />
			<p>
				{item.location}
			</p>
			{item.description && 
				<p>{item.description}</p>
			}
		</Popup>
	</Marker>
)}
```

For extra holiday coziness, "koselig" as we say in Norwegian, I've added a custom marker icon to the markers we just made:

```tsx
const icon : L.DivIcon = L.divIcon({
	className: 'hot-chocolate-icon',
	iconSize: [30, 30],
	iconAnchor: [0, 0],
	popupAnchor: [15, 0]
});
```

And the CSS for the icon in `App.css`:

```css
.hot-chocolate-icon {
	background: white;
	border-radius: 50%;
	box-shadow: 0px 0px 10px black;
}

.hot-chocolate-icon:after {
	display: block;
	width: 30px;
	height: 30px;
	content: "☕";
	font-size: 20px;
}
```

And then we're done. 

## End notes

In the spirit of keeping it simple I’ve taken some shortcuts here. For instance, in a real world application one might need the favorites list for more than just displaying it on a map. Defining it in `App.tsx` would make more sense and passing it into components as needed with props.

Thank you for following along, I hope you enjoyed this seasonally appropriate map. ☕