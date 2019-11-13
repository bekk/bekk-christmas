---
calendar: ml
post_year: 2019
post_day: 11
title: Style Transfer
image: 'https://i.ibb.co/zQrVDCH/p4dxt4p43qv11.jpg'
ingress: >-
  Usually we let neural networks adapt their parameters to data, for instance
  images. Ever wondered what happens if we instead adapt the images so they
  match the network? Style transfer applies the style of one image onto another,
  and it's a crowd-pleaser.
links:
  - title: A Neural Algorithm of Artistic Style
    url: 'https://arxiv.org/abs/1508.06576'
authors:
  - Torkil Aamodt
---
To grasp [style transfer](https://arxiv.org/abs/1508.06576), we must first understand what neurons inside the network represent. Let's focus on networks trained on images; those are easier to appreciate visually. Efforts have been made to understand what different neurons “looks for” in the input image. In other words; what patterns or objects must be present in the image for a given neuron to activate?

As it turns out, neurons close to the input look for lines, contrasts and gradients. The next layer of neurons will then look for patterns across these simple lines and contrasts. This makes the patterns increasingly complex as we get deeper into the network. [Zeiler, Matthew D., and Rob Fergus. “Visualizing and understanding convolutional networks”](https://link.springer.com/chapter/10.1007/978-3-319-10590-1_53) illustrates what the different layers might look for, shown below.

![Each square illustrates the kind of pattern a certain neuron will recognize in an image. The nine patterns seen here are simple shapes like lines and contrasts, implying this is an early layer in the network.](https://i.ibb.co/dM827Z5/bitmap.png)
Each square illustrates the kind of pattern a certain neuron will recognize in an image. The nine patterns seen here are simple shapes like lines and contrasts, implying this is an early layer in the network.

![Deeper in the network neurons are triggered by the presence of complex features like human or animal faces.](https://i.ibb.co/RHRL64b/bitmap.png)
Deeper in the network neurons are triggered by the presence of complex features like human or animal faces.

Another way to think about difference in layers, is that deep layer patterns make up the content of an image; objects that make up the scene. Shallow features on the other hand resemble texture, but they seldom contain enough information to reveal what object they are part of. The concept of texture vs. content is explored in style transfer, where the goal is to apply the style of one image onto another.

Transferring style is done in two steps. Start by feeding the image containing the wanted style, for instance “The Starry Night”, to the network. This will cause some of the neurons to activate, depending on what patterns are found in the image. Next we feed the network our destination image, for instance a regular photograph. Now a different set of neurons will light up. In order to transfer the style, we simply make small, iterative changes to the photograph such that neurons fire more similarly to the first stylized image. After doing this for a while, the photograph will start to adapt features from the initial image! We can further tune this by adapting more to neurons representing texture than content. This way we preserve the content in the photograph, but replace textures.

![The style of Vincent van Gogh’s “The Starry Night” is transferred to a photograph.](https://i.ibb.co/8Xccpfm/source.png)
![The style of Vincent van Gogh’s “The Starry Night” is transferred to a photograph.](https://i.ibb.co/Fx3MXH6/combined.png)
The style of Vincent van Gogh’s “The Starry Night” is transferred to a photograph. Taken from [Leon A. Gatys and
               Alexander S. Ecker and
               Matthias Bethge. "A Neural Algorithm of Artistic Style"](https://arxiv.org/abs/1508.06576)

[Google's gaming service Stadia aside](https://stadia.dev/blog/behind-the-scenes-with-stadias-style-transfer-ml/), neural style transfer is somewhat limited in terms of practical applications. As a tool for researchers and hobbyists to broaden their understanding of neural networks however, it's certainly a topic worth looking into.
