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
  science and machine learning applications, argue why you may want to do so,
  and provide you with lots of external resources to further expand your
  knowledge of this subject.
authors:
  - Herman Wika Horn
---
### What is machine learning?
For those unaware, machine learning is a field focusing on the development of algorithms which are trained rather than explicitly programmed. Interest in machine learning has skyrocketed the last decades, much thanks to the increased processing capabilities of modern computers. Machine learning algorithms can be used to solve problems like [classification](https://en.wikipedia.org/wiki/Statistical_classification), [regression](https://en.wikipedia.org/wiki/Regression_analysis), [sequence mining](https://en.wikipedia.org/wiki/Sequential_pattern_mining), [computer vision](https://en.wikipedia.org/wiki/Computer_vision), [speech recognition](https://en.wikipedia.org/wiki/Speech_recognition) and more. Tools like [PyTorch](https://pytorch.org/) and [TensorFlow](https://www.tensorflow.org/) have made machine learning accessible for the masses, by enabling users with consumer grade GPUs or even CPUs to experiment with state-of-the-art machine learning methods. Some popular libraries for machine learning in JavaScript are [ConvNet.js](https://cs.stanford.edu/people/karpathy/convnetjs/) for deep learning, [Brain.js](https://brain.js.org/#/) for neural networks, and [TensorFlow.js](https://www.tensorflow.org/js) for machine learning in general.

In general, machine learning consists of gathering a set of data from a domain of interest, performing actions and transformations on this data for it to meet certain desirable properties, train or fit some machine learning model, and interpret the results to draw some form of conclusion. In pseudocode, this may look something like this:

```javascript
let modelParameters = { ... }

let data = loadDataFromSource()
data = preprocess(data)

let model = defineMachineLearningModel()
model.compile(modelParameters)
model.train(data, modelParameters)

evaluatePerformace(model, data)
```

### Why JavaScript?
Considering that JavaScript is widely and primarily used to develop interactive web pages, one might ask why you should use JavaScript for machine learning? After all, there are more popular options available, like Python or R. Firstly, the interactivity of JavaScript is very sought-after and useful when making educational or entry-level applications. Furthermore, numerous helpful packages are available through package managers like npm or yarn. Lastly, if JavaScript is your primary programming language, the entry barrier for starting with machine learning using a library like TensorFlow.js is almost non-existent, given you are willing to do some theoretical research first.

Tools and packages readily available in JavaScript, together with some HTML and CSS knowledge, can be used to enhance the user experience at each step of the previously presented pseudocode. For instance:
- Model parameters can be chosen from a selection of available options through an interface
- Data before and after preprocessing can be visualized
- The structure of the machine learning model can be visualized
- Model training can be monitored using graphs and callbacks
- Model evaluation can be performed interactively
- ... and much more!

### A brief introduction
To keep this blog somewhat short and concise, I will explain and demonstrate an entry-level example of neural networks for regression analysis. This is a good starting point for any beginner in the machine learning domain. Unfortunately (or perhaps fortunately, if you are not a fan of maths or theory), I cannot go into too great detail. Even so, some theoretical knowledge is required to understand what is going on.

Data preprocessing means preparing your data to be used with your defined machine learning method. Firstly and most importantly, null-values or empty data entries have to be removed. Additionally, you may want your data to meet certain statistical properties which can help your machine learning model train better. This is called [feature scaling](https://en.wikipedia.org/wiki/Feature_scaling).

In regression analysis, the goal is to find some function which maps a set of input variables to some dependent output variables as accurately as possible. This approximation may be found through the training of a neural network. A neural network takes as input a set of parameters, passes those parameters through a series of connected layers, and finds a corresponding set of output parameters by performing mathematical calculations. Training a neural network means tuning the variables used in these mathematical calculates, called weights, so that the difference between calculated and expected output decreases.

<img src="https://i.imgur.com/kLk3Cm1.png" alt="drawing" width="400"/>

The above figure is taken from the book "Neural Networks and Learning Machines" by Simon Haykin, and shows an example of a neural network consisting of an input layer of 10 variables, one hidden layer (meaning it is neither an input or output layer) of four units, and an output layer of two variables. In general, there can be any number of inputs, units and outputs, as well as any number of hidden layers. Each unit is connected to every unit in the following layer. For each of these connections, the model stores a weight which the incoming value is multiplied with. Additionally, some (potentially nonlinear) transformation may be applied to the sum of all incoming connections at each individual unit. Without going into detail, this means the network is able to calculate an output as a nonlinear transformation of the input values.

Some required parameters when defining a machine learning are as follows (NB: do not be frightened and think you need to know about all these things! Typically, elementary default values can be used to great success):

- **Network structure**: the number of neural network layers, and the number of units in each layer
- **Epochs**: the number of iterations for which your machine learning model should train
- **Batch size**: the number of training samples your model should use for each time weights are updated
- **Error/loss metric**: the way which the performance of your model should be measured
- **Optimizer**: the algorithm explaining how your model should perform weight updates
- **Callbacks**: specific actions which your model should perform while it is training, such as reporting back its current loss

The last thing you need to know is that data is usually split into three categories. Training data is used for model training. Validation data is used during training to validate the model on data not used for training. Testing data is used to evaluate the performance of the trained model, by measuring the difference between the calculated output by the model and the expected output in the testing data. Crucially, each of these partitions must have the same statistical properties. A usual strategy is to shuffle the data, before using perhaps 60% for training, 20% for validation and 20% for testing. 

### A practical example
Finally, you are ready to see some code examples using TensorFlow.js. Note that the syntax and arguments are very similar to anything you would see in e.g. Python or R.

#### Loading, parsing and transforming data
First, you must load your data into your program. Using JavaScript, loading and parsing your data to the desired format may be the most challenging task of programming an entry-level application, at least in my experience. TensorFlow.js offers some functionality for this purpose, however it is not trivial to use when loading data uploaded through the frontend. Feel free to try it out for yourself using [the TensorFlow documentation](https://js.tensorflow.org/api/0.14.1/#data.csv). If you instead want to rely on your own JavaScript parsing skills, I wrote a small guide how to do this with [react-csv-reader](https://www.npmjs.com/package/react-csv-reader), available in [this GitHub readme file.](https://github.com/hermanwh/tfjs-example).

Assuming you made it past the hurdle of loading your data using the above guidelines and have managed to split it based on your input and output parameters, you should be left with four JavaScript arrays: _x_train_, _x_test_, _y_train_, and _y_test_. Arrays prefixed with _x_ are inputs, while _y_ are outputs. We will use the training data to fit our machine learning model, and keep the testing data for later in order to evaluate the model performance. Suppose all loading and preprocessing was done using an imaginary _loadAndPreprocessData_ method:

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

#### Defining a neural network model
Next, we define our neural network model with a desirable structure, in this case a single hidden layer of 128 units, and input and output layers according to the size of our training data:

```javascript
let model = tf.sequential();

model.add(
   tf.layers.dense({
       units: 128,
       activation: "relu",
       inputShape: [x_train.shape[1]]
   })
);

model.add(
    tf.layers.dense({
        units: y_train.shape[1],
        activation: "linear"
    })
);
```
Note that we do not have to explicitly define the input layer. "Relu" is a [rectifier](https://en.wikipedia.org/wiki/Rectifier_(neural_networks)) used as activation function in the hidden layers. Meanwhile, a linear activation function is required in the output layer.

We compile our model using the desired optimizer (how the model will update weights) and loss (the metric which will be used to measure model performance). We use the [Adam optimizer](https://arxiv.org/abs/1412.6980) with an initial [learning rate](https://en.wikipedia.org/wiki/Learning_rate) of 0.01 and [mean absolute error](https://en.wikipedia.org/wiki/Mean_absolute_error) loss metric:
```javascript
model.compile({
    optimizer: tf.train.adam(0.01),
    loss: "meanAbsoluteError"
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

#### Model training and evaluation
Finally, the model can be fitted:
```javascript
model.fit(tensors.trainFeatures, tensors.trainTargets, {
    batchSize: 128,
    epochs: 10,
    validationSplit: 0.25,
    callbacks: callbacks
});
```
The "validationSplit" parameter of 0.25 ensured 25% of the training data is used for model validation instead of training. When the model is done training, it can be used to make predictions for previously unseen data samples, such as the training data we defined previously:

```javascript
const predictions = model.predict(tensors.testFeatures)
```

We may now evaluate how well the function defined by the neural network approximates the relation between input and output variables, for instance by calculating the [coefficient of determination](https://en.wikipedia.org/wiki/Coefficient_of_determination).

### Final thoughts
Of course there are several reasons why most machine learning practitioners use programming languages other than JavaScript for their daily work. Model training directly in the browser is usually very slow, and consumer grade hardware often have memory or processing limitations in general. Even so, there are numerous interesting areas for which frameworks like TensorFlow.js can be applied, perhaps most successful if combined with appropriate backend frameworks for model training.

Supplementary to this blog post, I have written a small machine learning application using React and TensorFlow.js which I encourage you to check out. You can try the application [here](https://hermanwh.github.io/tfjs-example/), and see the code [here](https://github.com/hermanwh/tfjs-example). It implements a simple GUI, and allows user to upload a .csv file (given it has appropriate formatting), select some desired input and output parameters, train a predefined neural network regression model, and evaluate its performance.