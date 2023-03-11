import brain from 'brain.js';

const net = new brain.NeuralNetwork({ hiddenLayers: [3] });

// input 0 0, output 0
// input 0 1, output 1
// input 1 0, output 1
// input 1 1, output 0

const trainingData = [
  { input: [0, 0], output: [0] },
  { input: [0, 1], output: [1] },
  { input: [1, 0], output: [1] },
  { input: [1, 1], output: [0] },
];

// net.train(trainingData, {
//   // this allows us to see the error (how far off the net was):
//   log: (error) => console.log(error),
//   logPeriod: 100,
// });

// for a time, error may go down or may go up
// eventually the net catches on and starts to accelerate it's ability to learn
// until the error rate starts to drop to a ridiculously low num, not zero though
// until training is complete
// once training is complete, we no longer need to back propagate

// net will have understood what our inputs and outputs are
const output1 = net.run([0, 0]);

console.log(`[0, 0]: ${output1}`);
// Prob: 0.056919295340776443

// reason this isn't 0 is because we're using a neural net,
// very hard for them to speak specifically 0 and 1,
// can speak close to that (which is what we have, a num close to 0)

const output2 = net.run([0, 1]);
console.log('[0, 1]:', `${output2}`); // 0.9343994855880737

const output3 = net.run([1, 0]);
console.log('[1, 0]:', `${output3}`); // 0.9336008429527283

const output4 = net.run([1, 1]);
console.log('[1, 1]:', `${output4}`); // 0.09363768994808197

// NEURAL NET NOT LEARNING
const network = new brain.NeuralNetwork({ hiddenLayers: [1] });
// one hidden layer with one neuron

const trainingData2 = [
  { input: [0, 0], output: [0] },
  { input: [0, 1], output: [1] },
  { input: [1, 0], output: [1] },
  { input: [1, 1], output: [0] },
];

// network.train(trainingData2, {
//   log: (error) => console.log(error),
// });

// iterations: 20000, training error: 0.16941228433950378
// hit 20,000 iterations without understanding the problem or learning how to solve it

const network2 = new brain.NeuralNetwork({ hiddenLayers: [3] });
// one hidden layer with one neuron

// network2.train(trainingData2, {
//   log: (error) => console.log(error),
// });

// iterations: 4320, training error: 0.005031979642962998
// learn in relatively short period of time
// took 4,320 iterations

// can have MORE than 1 hidden layer

const network3 = new brain.NeuralNetwork({ hiddenLayers: [2, 2] });
// 2 hidden layers w/ 2 neurons
// the more hidden layers, the longer it takes the neural network to train

network3.train(trainingData2, {
  log: (error) => console.log(error),
});

// iterations: 20000, training error: 0.25450283011807695
// hit 20,000 iterations w/o fully training

// can use the hidden layers as a funnel
// if you hve 20 inputs, you can have a hidden layer with 15 layers, then another with 10 layers, then 2 output layers

//
