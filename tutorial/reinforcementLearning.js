import brain from 'brain.js';

const trainingData = [
  { input: [0, 0], output: [0] },
  { input: [0, 1], output: [1] },
  // { input: [1, 0], output: [1] },
  // { input: [1, 1], output: [0] }
];

const net = new brain.NeuralNetwork({ hiddenLayers: [3] });

net.train(trainingData);

console.log('before reinforcement:');
console.log(Array.from(net.run([0, 0])));
// [ 0.0726168304681778 ]
console.log(Array.from(net.run([1, 0])));
// [ 0.08604275435209274 ]
// NN hasn't been trained on this yet

trainingData.push({ input: [1, 0], output: [1] });

net.train(trainingData);

console.log('after reinforcement:');

console.log(Array.from(net.run([0, 0])));
// [ 0.089031882584095 ]
console.log(Array.from(net.run([1, 0])));
// [ 0.9215449094772339 ]
