import brain from 'brain.js';

// color preference
const trainingData = [
  { input: { blue: 1 }, output: [1] },
  { input: { red: 1 }, output: [1] },
  { input: { black: 1 }, output: [0] },
  { input: { green: 1 }, output: [0] },
  { input: { brown: 1 }, output: [0] },
];

const net = new brain.NeuralNetwork();

net.train(trainingData, {
  // log: (stats) => console.log(stats),
});
// iterations: 380, training error: 0.0051927407450553355

console.log('before pref changed:');
console.log(Array.from(net.run({ blue: 1 })));
// [0.916243851184845] - user has preference for BLUE
console.log(Array.from(net.run({ brown: 1 })));
// [0.059734832495450974] - user doesn't have pref for BROWN

// say user's color pref has changed, and they like brown now?
trainingData.push({ input: { brown: 1 }, output: [1] });

// how do we get net to understand what this new training data means?

net.train(trainingData, {
  //  log: (stats) => console.log(stats)
});
//iterations: 20000, training error: 0.0882680733809168

console.log('after pref changed:');
console.log(Array.from(net.run({ blue: 1 })));
// [ 0.9922910928726196 ] - user has preference for BLUE
console.log(Array.from(net.run({ brown: 1 })));
// [ 0.5124588012695312 ] - mediocre 5 because our trainingData still has ref to when their pref was towards 0

trainingData.pop();
trainingData.pop();
trainingData.push({ input: { brown: 1 }, output: [1] });

net.train(trainingData);
console.log('after preference change w/old pref removed:');
console.log(Array.from(net.run({ blue: 1 })));
// [ 0.99889075756073 ]
console.log(Array.from(net.run({ brown: 1 })));
// [ 0.8544756174087524 ]
