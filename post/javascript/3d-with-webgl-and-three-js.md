---
calendar: javascript
post_year: 2020
post_day: 9
title: "3D with WebGL and three.js "
ingress: As a developer, you have surely wondered if the web can do full 3D
  beyond tweaking the `z-index` and fiddling with CSS 3D transforms. WebGL is
  the API for making such fully customizable visualizations in all dimensions.
  We can use this together with de facto standard framework `three.js` to unlock
  this mysterious domain.
authors:
  - Holger Ludvigsen
---

Let us make a red christmas cube that reacts to our interaction. All the actual running code can be found in [our repository](https://github.com/bekk/webgl-christmas). But don't worry, I will show what it looks like here.

## Boil up some boilerplate

The best reason to use `three.js` is to avoid the obscene amount of boiler plate needed to get something on the screen with WebGL. But, some setup code is still needed.

We start with a renderer that will make the image on the screen:

```javascript
const renderer = new THREE.WebGLRenderer();
```

The screen is of course a web site, and the image will actually be a `canvas`-element. So we append this to the DOM:

```javascript
document.getElementById("ourContainerDiv").appendChild(renderer.domElement);
```

Then we need to make a camera that will represent the view angle and perspective of what we are looking at. Doing that, we need to specify the height-to-width `aspect` of the screen:

```javascript
const context = renderer.getContext();
const aspect = context.drawingBufferWidth / context.drawingBufferHeight;
const fov = 60;

const camera = new THREE.PerspectiveCamera(fov, aspect);
```

The `fov` is the field-of-view in degrees. All you gamers out there know that it can be very important!

Then we make a scene, which is going to hold all the stuff to be shown on the screen; like red christmas cubes and other things:

```javascript
const scene = new THREE.Scene();
```

Now we render our empty scene and get a look at the nothingness there:

```javascript
renderer.render(scene, camera);
```

## Making something from nothing

As developers, our joy is to make something from nothing. We are going to add a cube to our scene, and then make it pop. In 3D, things consist of the geometry defining their shape (like polygons!) and the material defining their looks (like textures!).

We make a boxy geometry, sized 1 by 1 by 1 units:

```javascript
const geometry = new THREE.BoxGeometry(1, 1, 1);
```

Then we make a red material to slap on it:

```javascript
const material = new THREE.MeshStandardMaterial({ color: 0xd11d1d });
```

These two ingredients are then mixed to make the actual box. It is called a `Mesh` in `three.js`:

```javascript
const mesh = new THREE.Mesh(geometry, material);
```

I promised you that the scene was going to hold all the stuff. And I intend to keep that promise, so we add our fresh box to the scene:

```javascript
scene.add(mesh);
```

Does it work? Can we see it now? 

No! 

Why? Because there is no light. The last piece of the boiler plate puzzle. `three.js` use these as representations of the light sources, and for our example it is absolutely necessary. Let us make a white light that points down slightly slanted on our box:

```javascript
const strength = 3.0;
const light = new THREE.DirectionalLight(0xffffff, strength);
light.position.set(3, 5, 2)
scene.add(light);
```

It is beautiful! Look at those tight corners:

![screenshot-part1](https://raw.githubusercontent.com/bekk/webgl-christmas/master/misc/screenshot-part1.png)

## Shake it baby

Now that we have full frontal 3D on the web, we are of course going to animate it, right?

Animations are simply many, many renders in a row. Like a stop motion movie. We wrap our render call in a function that requests to be run again and again as fast as the browser can manage:

```javascript
function animate() {
    requestAnimationFrame(animate);

    //updateTime();
    //moveStuffAround();

    renderer.render(scene, camera);
}

animate();
```

We are going to make the cube shake when we click on it. There are many ways to do animation. But a solid tip from me to you is to define a value `animationTime` that is supposed to go from `0.0` (start of animation) to `1.0` (end of animation):

```javascript
let animationTime = 1;

function updateTime() {
    const timeDelta = 1/60; // 60 fps or bust!

    if (animationTime < 1.0) {
        const animationSpeed = 0.8;
        animationTime += timeDelta * animationSpeed;
    }
}

document.addEventListener("click", () => { animationTime = 0 }); 
```

Now we can use `animationTime` to calculate the cube shake (brand new sentence!). To rotate something, we simply change the values of the field `.rotation`. It is a 3 part vector with the object's rotation around the X, Y and Z axis:

```javascript
mesh.rotation.set(x, y, z);
```

We are going to model our shaking on the mathematical sine wave. Because all beautiful things are sine waves, that is an undisputed fact. Sine waves have frequency and amplitude:

```javascript
const rotation = Math.sin(animationTime * shakeFrequency) * shakeAmplitude;

mesh.rotation.set(0, rotation, rotation);
```

And if we use `animationTime` cleverly, we can start with strong shaking, and then cool down to a chill:

```javascript
function moveStuffAround() {
    const maxFrequency = 60.0;
    const maxAmplitude = 0.3;
    const shakeFrequency = (1 - animationTime) * maxFrequency;
    const shakeAmplitude = (1 - animationTime) * maxAmplitude;

    const rotation = Math.sin(animationTime * shakeFrequency) * shakeAmplitude;

    mesh.rotation.set(0, rotation, rotation);
}
```

Check out those moves:

![gif-part1](https://raw.githubusercontent.com/bekk/webgl-christmas/master/misc/gif-part1.gif)

## Sandbox and final code

You find all the working code in [our repository](https://github.com/bekk/webgl-christmas). You can also play around in the sandbox below:

<iframe src="https://codesandbox.io/embed/cool-bartik-4v7xx?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="cool-bartik-4v7xx"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>