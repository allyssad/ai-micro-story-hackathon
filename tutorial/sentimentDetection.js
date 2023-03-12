import brain from 'brain.js';

// detect sentiment from text directly

// array of objects whose props are strings (instead of nums)
const trainingData = [
  { input: 'I am super happy!', output: 'happy' },
  { input: 'What a pill!', output: 'sarcastic' },
  { input: 'I am super unhappy!', output: 'sad' },
  { input: 'Are we there yet?', output: 'excited' },
  // bonus
  { input: 'I hate it!', output: 'angry' },
  { input: 'I am afraid!', output: 'scared' },
  { input: 'Whatever', output: 'bored' },
  { input: 'Can we leave yet?', output: 'impatient' },
  { input: 'Yuck!', output: 'disgusted' },
];

const net = new brain.recurrent.LSTM();

net.train(trainingData, {
  iterations: 500,
  errorThresh: 0.011,
  // log: (stats) => console.log(stats),
});
// iterations: 90, training error: 0.011349851933454303

// console.log(net.run('I am happy!'));
// happy
// console.log(net.run('I am unhappy!'));
// sad

// bonus: add five new examples in the training data, and then log out five examples that aren't in the training data
console.log(net.run('I am scared!')); // scared
console.log(net.run('Can I go?')); // impatient
console.log(net.run('Oh well')); // bored
console.log(net.run('Ew!')); // disgusted
console.log(net.run('Go away!')); // angry
/*
scared
impatient
bored

sad
*/

// each value in input may corresponds to characters in training data
const trainingData2 = [{ input: '1', output: '2' }];

const net2 = new brain.recurrent.LSTM();

// unseen character that tells the NN to transition between an input and an output (new idea)
const inputMap = ['1', 'NEW IDEA', '2'];

// 3 neurons

// input character 1 activated
// [1, 0, 0];
// new idea is activated
// [0, 1, 0];
// output activated
// [0, 0, 1]

// bonus: training data look like, if we start with input of '2', and end with output of '1'
// { input: '2', output: '1'}

// internally looks like this to brain.js:
// [0, 0, 1]
// [0, 1, 0]
// [1, 0, 0]
