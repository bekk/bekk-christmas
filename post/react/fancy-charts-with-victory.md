---
calendar: react
post_year: 2019
post_day: 12
title: Fancy charts with Victory
image: >-
  https://images.unsplash.com/photo-1574281160075-6eb5f7bfe645?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80
ingress: >-
  Say you want to add a nice chart or other form of data visualization to your
  React app, but don't have the slightest idea of where to start. Do you write
  it from scratch, or do you utilize one of the many charting libraries out
  there? You might begin by researching d3 since it's one of the most popular
  data viz libraries for javascript, but you quickly get overwhelmed by the
  myriads of customization options and the steep learning curve. You probably
  don't even need all the bells and whistles that come included with it. My
  advice? Take a look at one of the slickest and most enjoyable charting
  libraries you're likely to come across this christmas - Victory.
---
## Getting started
Victory is super easy to get started with. Start by adding Victory to your list of dependencies: `npm i victory -S`, 
assuming you're using npm. Now say you have some stock trading volume data that looks like this:
```typescript jsx
const data = [
  {date: '2019-12-10', volume: 16197},
  {date: '2019-12-9', volume: 32010},
  {date: '2019-12-8', volume: 26518},
  {date: '2019-12-7', volume: 18606},
  {date: '2019-12-6', volume: 16795},
  {date: '2019-12-5', volume: 28607},
  {date: '2019-12-4', volume: 23621}
];
```
All you need to do to let Victory visualize this data for you is to pass it along to a Victory component with some props 
specifying which keys in the data objects to spread across which axes:
```typescript jsx
const Chart = () => {
    return (
        <VictoryBar data={data} x="date" y="volume" />
    );
};
```

![A simple chart](https://i.ibb.co/QP0sM34/1.png)

Great! Our chart is currently not displaying any numbers or labels, so lets fix that next. We can do this by wrapping our `VictoryBar` component in a `VictoryChart`, like so:
```typescript jsx
<VictoryChart domainPadding={20}>
  <VictoryBar data={data} x="date" y="volume" />
</VictoryChart>
```

![A slightly more useful chart](https://i.ibb.co/q7VQLv4/2.png)

Alright, we're getting somewhere. Note that we're passing a `domainPadding` prop to our `VictoryChart` to stop the leftmost bar from overlapping the y-axis. The labels for the x-axis are overlapping each other, but this is easily fixed by introducing `VictoryAxis` and a handy prop called `fixLabelOverlap`:
```typescript jsx
<VictoryChart domainPadding={20} padding={75}>
  <VictoryAxis fixLabelOverlap />
  <VictoryAxis dependentAxis />
  <VictoryBar data={data} x="date" y="volume" />
</VictoryChart>
```

![A chart with correctly spaced labels](https://i.ibb.co/7VGD7gY/3.png)

Not bad for only five lines of code, but there's still some room for improvement.

## Getting fancy
One of the really nice things about Victory is that it is highly customizable and stylable. One way to style your chart is to pass a `theme` prop to the `VictoryChart` component. You can make your own theme or use on of the pre-defined ones with `VictoryTheme`:
```typescript jsx
<VictoryChart theme={VictoryTheme.material} domainPadding={20} padding={75}>
  <VictoryAxis fixLabelOverlap style={{ tickLabels: { padding: 16, fontSize: 8 } }} />
  <VictoryAxis dependentAxis />
  <VictoryBar data={data} x="date" y="volume" />
</VictoryChart>
```

<iframe
     src="https://codesandbox.io/embed/runtime-dew-6wy13?fontsize=14&hidenavigation=1&moduleview=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="runtime-dew-6wy13"
     allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
     sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

Here we're using the pre-defined theme `VictoryTheme.material` which renders our chart in a nice, soothing teal tint. We're also overriding the styling for the x-axis labels to make sure that our labels are easily readable and that  there's some space between each. 

Stock volume data is probably not best represented by a simple bar chart, which is why it's usually presented as a line chart or something similar in appearance. Luckily for us Victory makes it dead simple to change our chart type. Simply replace `VictoryBar` with `VictoryLine` and you get this:

