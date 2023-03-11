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

net.train(trainingData, {
  // this allows us to see the error (how far off the net was):
  log: (error) => console.log(error),
  logPeriod: 100,
});

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
