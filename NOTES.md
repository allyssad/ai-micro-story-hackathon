# BRAIN.JS INTRO

# Neural Net LEARN VIA 2 Stages (TRAIN, RUN)

# TRAIN (net.train())

## Forward Propagation

- Problem: ball, goal

**Prediction** - where we want the ball to land, how much power to put behind it

## Back Propagation

1. **measure** - from the prediction, we can see how far we're off from the actual goal

- referred to as _error_

2. **learn** - make a determination as to what we're going to do next

# RUN (net.run())

- we no longer have to measure how far we are from the goal, we already know
- no need to back propagate

# UNDERSTAND STRUCTURE OF PROGRAMMATIC NEURAL

## inputs & outputs

- receive inputs as an arg and produce outputs
- (inputs) => outputs;

## random values

- neural net beings with a bunch of random values
- everything that affects the outputs is just random at first
- mathematically proven an effective way to start of with knowledge
- knowledge is very random at first,
- not 0 and not 1 - somewhere in-between
- over time, we can shape that random data so over time, it becomes a place where we store what's going on inside hte neural net
- each neuron = math.random()

## activation "relu"

- popular and effective activation function = 'relu'

```
function relu(value) {
  return value < 0 ? 0 : value;
}
```

- in a feed-forward neural net, the math between neurons are represented by:

```
O->O->O->O
 \/ \/ \/
O->O->O->O
```

```
activate((inputWeights * inputs) + biases)
```

- activation funcs are measured in back propagation using their derivative

## bonus materials

- https://en.wikipedia.org/wiki/Activation_function
- https://github.com/BrainJS/brain.js/blob/9595fe1d0069939ba271b25c1e7db785edd11936/src/neural-network.js#L227
- https://github.com/BrainJS/brain.js/blob/9595fe1d0069939ba271b25c1e7db785edd11936/src/neural-network.js#L527
- activation func: https://github.com/BrainJS/brain.js/blob/9595fe1d0069939ba271b25c1e7db785edd11936/src/neural-network.js#L233
  // additional options: https://github.com/BrainJS/brain.js#options

# LAYERS

- in brain, input/output layers are configured for you automatically
- hidden layers can be configured by us

- the neural net in brainjs-tutorial was composed of:
- 2 input neurons,
- 1 hidden layer that had 3 neurons,
- 1 output layer with 1 output

- Hidden layers = where majority of storage is (where ideas are in the human brain)
- may run into a scenario where your neural net ISN'T LEARNING

# ARRAYS AND OBJECTS

- arrays are useful in neural nets
- [0.3, 0.1, 0.8, 0.2]
- can reference the values by index: [0] = 0.3
- generally represent a collection fot he same type of values
- can look up those values by index

- Each neuron associates meaning with each of the array's indexes

## WHAT IF DATA IS IN FORM OF OBJECTS?
