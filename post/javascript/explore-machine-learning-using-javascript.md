---
calendar: javascript
post_year: 2020
post_day: 5
title: Machine learning with JavaScript
ingress: If you have been following our JavaScript Christmas calendar, chances
  are you have some interest, and perhaps even proficiency, in the JavaScript
  programming language. For this blog entry in particular, I hope you also have
  at least some interest in data science and machine learning. I will
  demonstrate how you can use your JavaScript skills to develop entry-level data
  science and machine learning applications, and provide you with lots of
  external resources to further expand your knowledge of this subject.
authors:
  - Herman Wika Horn
---
For those unaware, machine learning is a field focusing on the development of algorithms which are trained rather than explicitly programmed. Interest in machine learning has skyrocketed the last couple of decades, much thanks to the increased processing capabilities of modern computers. Machine learning algorithms can be used to solve problems like [classification](https://en.wikipedia.org/wiki/Statistical_classification), [regression](https://en.wikipedia.org/wiki/Regression_analysis), [sequence mining](https://en.wikipedia.org/wiki/Sequential_pattern_mining), [computer vision](https://en.wikipedia.org/wiki/Computer_vision), [speech recognition](https://en.wikipedia.org/wiki/Speech_recognition) and more. Tools like [PyTorch](https://pytorch.org/) and [TensorFlow](https://www.tensorflow.org/) have made machine learning accessible for the masses, by enabling users with consumer grade GPUs or even CPUs to experiment with state-of-the-art machine learning methods. Some popular libraries are [ConvNet.js](https://cs.stanford.edu/people/karpathy/convnetjs/) for deep learning, [Brain.js](https://brain.js.org/#/) for neural networks, and [TensorFlow.js](https://www.tensorflow.org/js) for machine learning in general.

Considering that JavaScript is widely and primarily used to develop interactive web pages, one might ask why you should use JavaScript for machine learning? After all, there are more popular options readily available, like Python or R. Firstly, the interactivity of JavaScript is very sought-after and useful when using educational or entry-level applications. When doing machine learning in JavaScript, you can combine this with all the other useful features of web development that you are perhaps already familiar with, such as graphs, tables, tabs, user interactivity and much more. Additionally, if JavaScript is your primary programming language, the entry barrier for starting with machine learning using a library like TensorFlow.js is almost non-existent, given you are willing to do some theoretical research first.

_A small disclaimer before I move on_: If you are a JavaScript developer, familiar with React in particular, and you are not in the mood for theoretical explanations, I propose you skim this article very briefly, and instead have a look on the React project I prepared as an example of using TensorFlow.js. The repository on GitHub can be found [here](https://github.com/hermanwh/tfjs-example). Perhaps you will want to come back to the article after checking it out!

In general, machine learning consists of gathering a set of data from a domain of interest, performing actions and transformations on this data for it to meet certain desirable properties, train some machine learning model, and interpret the results to draw some form of conclusion. In pseudocode, this may look something like this:

```javascript
var machineLearningParameters = loadMachineLearningParameters();
var training_data = loadDataFromSource();

data = preprocess(data);

var model = defineMachineLearningModel();
model.compile(machineLearningParameters)
model.train(data)

calculateAndPresentResults(data, model);
```

To keep this blog somewhat short and concise, I will explain and demonstrate an entry-level example of neural networks for regression analysis. This is a good starting point for any beginner in the machine learning domain. Unfortunately (or perhaps fortunately, if you are not a fan of maths or theory), I cannot go into too great detail, however some theoretical knowledge is required to understand what is going on.

Data preprocessing means preparing your data to be used with your defined machine learning method. Firstly and most importantly, null-values or empty data entries have to be removed. Additionally, you may want your data to meet certain statistical properties which can help your machine learning model train better. This is called [feature scaling](https://en.wikipedia.org/wiki/Feature_scaling). Another commonly used technique is data transformation, for which data is transformed using some desirable function. 

In regression analysis, the goal is to find some function which maps a set of input variables to some dependent output variables as accurately as possible. This approximation may be found through the training of a neural network. A neural network takes as input a set of parameters, passes those parameters through a series of connected layers, and finds a corresponding set of output parameters by performing mathematical calculations. Training of the neural network means tuning the variables used in these mathematical calculates, called weights, so that the difference between calculated and expected output decreases.

<img src="https://i.imgur.com/kLk3Cm1.png" alt="drawing" width="400"/>

The above figure is taken from the book "Neural Networks and Learning Machines" by Simon Haykin, and shows an example of a neural network consisting of an input layer of 10 variables, one hidden layer (meaning it is neither an input or output layer) of four units, and an output layer of two variables. In general, there can be any number of inputs, units and outputs, as well as any number of hidden layers. Each unit is connected to every unit in the following layer. For each of these connections, the model stores a weight which the incoming value is multiplied with. Additionally, some (potentially nonlinear) transformation may be applied to the sum of all incoming connections at each individual unit. Without going into detail, this means the network is able to calculate an output as a nonlinear transformation of the input values.

Some required parameters when defining a machine learning are as follows (NB: do not be frightened and think you need to know about all these things! Typically, elementary default values can be used to great success):

- **Network structur**e: the number of neural network layers, and the number of units in each layer
- **Epochs**: the number of iterations for which your machine learning model should train
- **Batch size**: the number of training samples your model should use for each time weights are updated
- **Error/loss metric**: the way which the performance of your model should be measured
- **Optimizer**: the algorithm explaining how your model should perform weight updates
- **Callbacks**: specific actions which your model should perform while it is training, such as reporting back its current loss

The last thing you need to know is that data is usually split into three categories. Training data is used for model training. Validation data is used during training to validate the model on data not used for training. Testing data is used to evaluate the performance of the trained model, by measuring the difference between the calculated output by the model and the expected output in the testing data. Crucially, each of these partitions must have the same statistical properties. A usual strategy is to shuffle the data, before using perhaps 60% for training, 20% for validation and 20% for testing. 

Hopefully you have made it this far, alive and well! Finally, you are ready to see some code examples using TensorFlow.js. Note that the syntax and arguments are very similar to anything you would see in e.g. Python or R.

First, you must load your data into your program. Using JavaScript, loading and parsing your data to the desired format may be the most challenging task of programming and entry-level application, at least in my experience. No, I'm not joking! In Python, you can simply use [Pandas](https://pandas.pydata.org/) and type:

```python
import pandas as pd
csvDataset = pd.read_csv(path_to_local_file).values
```

In JavaScript, it is not as simple (at least not from what I have found). TensorFlow.js offers a similar method, but it uses [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) under the hood, and thus requires 1) that your data is stored at some URL, and 2) that despite using this method, the data has to be flattened in a particular way. Feel free to try it out for yourself using [the TensorFlow documentation](https://js.tensorflow.org/api/0.14.1/#data.csv). If you instead want to rely on your own JavaScript parsing skills, I wrote a small guide how to do this (e.g. with [react-csv-reader](https://www.npmjs.com/package/react-csv-reader)) [here](https://github.com/hermanwh/tfjs-example).

Assuming you made it past the hurdle of loading your data using the guide above, you should now be left with four JavaScript arrays: _x_train_, _x_test_, _y_train_, and _y_test_. Arrays prefixed with _x_ are inputs, while _y_ are outputs. We will use the training data to fit our machine learning model, and keep the testing data for later in order to evaluate the model performance. Propose all loading and preprocessing was done using an imaginary _loadAndPreprocessData_ method:

```javascript
const [x_train, x_test, y_train, y_test] = loadAndPreprocessData(...)
```

First, we transform our arrays to [tensors](https://www.tensorflow.org/guide/tensor), which are the data structure TensorFlow uses:

```javascript
const tensors = {};
tensors.trainFeatures = tf.tensor2d(x_train);
tensors.trainTargets = tf.tensor2d(y_train);
tensors.testFeatures = tf.tensor2d(x_test);
tensors.testTargets = tf.tensor2d(y_test);
```

Next, we define our neural network model with a desirable structure, in this case a single hidden layer of 128 units, and input and output layers according to the size of our training data:

```javascript
let model = tf.sequential();

model.add(
   tf.layers.dense({
       units: 128,
       activation: "relu",
       inputShape: [xTrain.shape[1]]
   })
);

model.add(
    tf.layers.dense({
        units: yTrain.shape[1],
        activation: "linear"
    })
);
```
We compile our model using the desired optimizer (how the model will update weights) and loss (the metric which will be used to measure model performance):
```javascript
model.compile({
    optimizer: modelParams.optimizer,
    loss: modelParams.loss
});
```
Then, we define some callbacks which will continuously update a graph bound to a div with id "lossCanvas" on our frontend with loss and validation loss values as our model trains through its epochs and batches:
```javascript
const lossContainer = document.getElementById("lossCanvas");
const callbacks = tfvis.show.fitCallbacks(
    lossContainer,
    ["loss", "val_loss"],
    {
        callbacks: ["onEpochEnd", "onBatchEnd"]
    }
);
```
Finally, the model can be fitted:
```javascript
model.fit(xTrain, yTrain, {
    batchSize: 128,
    epochs: 10,
    validationSplit: 0.25,
    callbacks: callbacks
});
```
When the model is done training, it can be used to make predictions for previously unseen data samples, such as the training data we defined previously:

```javascript
const predictions = model.predict(tensors.testFeatures)
```

We may now evaluate how well the function defined by the neural network approximates the relation between input and output variables, for instance by calculating the [coefficient of determination](https://en.wikipedia.org/wiki/Coefficient_of_determination).

Reaching the conclusion of this blog post, I have come to realize that perhaps it was too ambitious to present and demonstrate regression analysis and neural networks with JavaScript in a single blog post. Unfortunately, we barely scratched the surface of a small domain of machine learning. Even so, if you made it this far, I hope you are left with increased interest in machine learning, and encourage you to seek out additional literature!