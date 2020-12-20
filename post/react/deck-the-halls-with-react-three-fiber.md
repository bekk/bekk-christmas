---
calendar: react
post_year: 2020
post_day: 23
title: Deck the Halls With React Three Fiber
image: https://images.unsplash.com/photo-1545735089-fe9e1e4f4569
ingress: "Earlier this year I tried using [three.js](https://threejs.org/)
  within a React app. It wasn't straightforward, and I ran into quite a few
  problems. Since then, I've been eager to try out this library a co-worker told
  me about: [react-three-fiber](https://github.com/pmndrs/react-three-fiber).
  Apparently, it could solve all my problems (ok, maybe only a few) and make it
  super easy to create cool animations with few lines of code. Say no more!"
links:
  - url: https://github.com/pmndrs/react-three-fiber
    title: react-three-fiber repo with demos
  - url: https://github.com/pmndrs/react-three-fiber/blob/master/markdown/api.md
    title: react-three-fiber API
  - url: https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene
    title: three.js docs
  - url: https://threejs.org/examples/
    title: three.js examples for inspiration
authors:
  - Ida Marie Vestgøte Bosch
---
I am far from an expert in three.js, but I want to share my experience and give you a quick introduction to react-three-fiber. If you've caught yourself staring longingly at amazing animations, thinking "oh, I wish I could make that!", but not quite found the courage to start, then this might be something for you. Since it's component based, it's mainly plug-and-play! 🥳

## Getting Started

react-three-fiber is a React renderer for three.js, which in turn is built on the [WebGL API](https://www.khronos.org/webgl/). The ninth article in our JavaScript calendar was about animation in three.js, written by my colleague Holger. We are going to recreate his example in the article using react-three-fiber. If you haven't read it already, [hop over and do so](https://javascript.christmas/2020/9) before you continue reading this article.

There are a couple of things to know before you get started. To display the animations, three.js renders a HTML `<canvas>` element with your content in a loop inside it. We need to prepare this canvas before we can "paint" on it (or animate, if you will). For this, three.js requires a _scene, camera and renderer_. In basic three.js, you would need to define and configure these yourself (as you probably saw in Holger's article). Luckily, react-three-fiber does this for us, which means even less boilerplate code! We can use the Canvas-component directly:

```javascript
export const Component = () => {
    return (
        <Canvas>
            // Insert cool animations
        </Canvas>
    );
};
```

react-three-fiber provides us with some neat default values, which makes the setup easy. For example, the camera will _look at_ position `[0,0,0]` (the center of the canvas), but a little bit zoomed out (z-position = 5). It gives us a good bird's eye view of the scene. That way, when our content is placed in the center by default, we are able to see it in the canvas (because we aren't "standing" in the middle of the content). Of course, there are a great deal of properties available in the Canvas-component if you want to customise things later.

## Comparable Cubes

To illustrate how easy react-three-fiber is to use, compared to the good old three.js way, we are going to create the same red, shaking cube as in the article mentioned above.

First, we'll need to change the position of the camera in the canvas to reflect the example we are reproducing. To achieve this, we simply set the camera property in the Canvas component, using x, y and z coordinates: `camera={{ position: [2, 2, 2] }}`. Now, we are looking at the scene a little sideways.

Then, we can add objects to our scene inside the canvas. An object is created using a _mesh_, which is given a _geometry_ (a cube) and a _material_ (the appearance of the cube; red 🟥), which we render in the scene. In react-three-fiber, we just need to put it inside the canvas element, along with some light to actually see it:

<iframe src="https://codesandbox.io/embed/react-three-fiber-simple-box-yzh0k?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="react-three-fiber-simple-box"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

Now we've got a red box in our canvas! But it doesn't do much. You can try and change some of the numerical values and see what happens. Maybe even try to remove the light?

## Shake It Up

Next, we're going to make the box shake when we click on it. We need to use the `rotation` property of the mesh to make it move.

We start by separating the cube into its own component, in order to use a react-three-fiber hook called `useFrame()`. It must be called from inside the `Canvas`, so we can't define it directly inside our `Component`. The hook will execute the code inside the callback just before every frame render (60 times per second). If we use the callback to change the rotation of the box, we can make it look like it's shaking.

```javascript
const Box = () => {
  const [rotation, setRotation] = useState([0, 0, 0]);

  useFrame(() => {
    // Shake it
  });

  return (
    <mesh
      rotation={rotation}
    >
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={0xd11d1d} />
    </mesh>
  );
};
```

We have a box, and we have an initial rotation (which is zero). Our hook doesn't do much yet. In his [article](https://javascript.christmas/2020/9), Holger explained the details of the shaking animation he made. Let's borrow that nice code from Holger to shake it, baby!

```javascript
const Box = () => {
  const [rotation, setRotation] = useState([0, 0, 0]);

  const maxFrequency = 60.0;
  const maxAmplitude = 0.3;
  const animationSpeed = 0.8;

  useFrame(() => {
    if (animationTime < 1.0) {
      animationTime += timeDelta * animationSpeed;
      const newTime = (new Date().getTime() - timeStart) / 1000;
      timeDelta = newTime - time;
      time = newTime;

      const shakeFrequency = (1 - animationTime) * maxFrequency;
      const shakeAmplitude = (1 - animationTime) * maxAmplitude;
      const position =
        Math.sin(animationTime * shakeFrequency) * shakeAmplitude;

      setRotation([0, position, position]);
    }
  });

  const resetAnimationTime = () => (animationTime = 0);

  return (
    <mesh
      onClick={resetAnimationTime}
      onPointerDown={resetAnimationTime}
      rotation={rotation}
    >
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={0xd11d1d} />
    </mesh>
  );
};
```

And there it is! With a few lines of code we made something pretty cool, right?
Take a look at the final result in the sandbox below:

<iframe src="https://codesandbox.io/embed/react-three-fiber-box-kyt9s?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="react-three-fiber-box"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

To compare the code to the version made using only `three.js`, you can find Holger's sandbox [here](https://codesandbox.io/s/cool-bartik-4v7xx?from-embed=&file=/src/index.js:2342-2359).

If you want to play with animations in `react-three-fiber`, the holidays might be the perfect opportunity for a new hobby project. I'll be linking some useful resources below to get started. And while you're at it, why not try out the brand new [Create React App 4](https://github.com/facebook/create-react-app)? That's a combination I can vouch for :raised_hands:

Happy Holidays, and happy coding! :christmas_tree: :hugs: