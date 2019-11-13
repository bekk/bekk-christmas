---
calendar: ml
post_year: 2019
post_day: 11
title: Neural Style Transfer
authors:
  - Torkil Aamodt
---
Like most machine learning methods, neural networks are general problem solvers with no ties to specific domains. However, there are certain ways to arrange a network to help it understand certain data, like images, with less effort. In order to grasp how these networks function internally, efforts have been made to visualize what different neurons “looks for” in the input image. In other words; what features must be present in the image for a given neuron to fire?

As it turns out, neurons close to the input look for lines, contrasts and gradients. The next layer of neurons will then look for patterns in these simple lines and contrasts. This makes the patterns increasingly complex as we get deeper into the network. [Zeiler, Matthew D., and Rob Fergus. “Visualizing and understanding convolutional networks”](https://link.springer.com/chapter/10.1007/978-3-319-10590-1_53) illustrates what the different layers might look for.

![An early layer  of a neural network looks for simple shapes like lines and contrasts.](https://i.ibb.co/dM827Z5/bitmap.png)
An early layer  of a neural network looks for simple shapes like lines and contrasts.

![Deeper in the network neurons are triggered by the presence of complex features like human or animal faces.](https://i.ibb.co/J25M3jS/Screenshot-2019-11-05-at-18-00-43.png)
Deeper in the network neurons are triggered by the presence of complex features like human or animal faces.

Another way to think about difference in layers, is that deep layer patterns make up the content of an image; objects that make up the scene. Shallow features on the other hand resemble texture, but they don’t contain enough information to reveal much more. The concept of texture vs. content is explored in style transfer, where the goal is to apply the style of one image onto another.

Transferring style is done in two steps. Start by feeding the image containing the wanted style, for instance “The Starry Night”, to the network. This will cause some of the neurons to activate, depending on what patterns are found in the image. Next we feed the network our destination image, for instance a regular photograph. Now a different s et of neurons will light up. In order to transfer the style, we simply make small, iterative changes to the photograph such that neurons fire more similarly to the first stylized image. After doing this for a while, the photograph will start to adapt features from the initial image! We can further tune this by adapting more to neurons representing texture than content. This way we preserve the content in the photograph, but replace textures.

![The style of Vincent van Gogh’s “The Starry Night” is transferred to a photograph.](https://i.ibb.co/8Xccpfm/source.png)
The style of Vincent van Gogh’s “The Starry Night” is transferred to a photograph.

![The style of Vincent van Gogh’s “The Starry Night” is transferred to a photograph.](https://i.ibb.co/Fx3MXH6/combined.png)
The style of Vincent van Gogh’s “The Starry Night” is transferred to a photograph.

Although neural style transfer has seen limited practical applications, it helps researchers broaden their understanding of how neural networks function and what they can do. Google recently announced [style transfer as a realtime feature](https://stadia.dev/blog/behind-the-scenes-with-stadias-style-transfer-ml/) for its streaming based gaming platform Stadia.
