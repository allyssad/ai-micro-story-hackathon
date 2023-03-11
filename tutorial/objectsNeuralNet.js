import brain from 'brain.js';

// input: { red, green, blue }
// output: { light, neural, dark }

// in brain.js you don't have to define all the properties
// if they're missing, it uses a 0

// using an object to define a neural net
// do so with it's properties defined as number

const colors = [
  { green: 0.2, blue: 0.4 }, // red is missing, so it will be 0
  { green: 0.4, blue: 0.6 },
  { red: 0.2, green: 0.8, blue: 0.8 },
  { green: 1, blue: 1 },
  { red: 0.8, green: 1, blue: 1 },
  { red: 1, green: 1, blue: 1 },
  { red: 1, green: 0.8, blue: 0.8 },
  { red: 1, green: 0.6, blue: 0.6 },
  { red: 1, green: 0.4, blue: 0.4 },
  { red: 1, green: 0.31, blue: 0.31 },
  { red: 0.8 },
  { red: 0.6, green: 0.2, blue: 0.2 },
];

const brightnesses = [
  { dark: 0.8 },
  { neutral: 0.8 },
  { light: 0.7 },
  { light: 0.8 },
  { light: 0.9 },
  { light: 1 },
  { light: 0.8 },
  { neutral: 0.7, light: 0.5 },
  { dark: 0.5, neutral: 0.5 },
  { dark: 0.6, neutral: 0.3 },
  { dark: 0.85 },
  { dark: 0.9 },
];

// create training data

const trainingData = [];

for (let i = 0; i < colors.length; i++) {
  trainingData.push({
    input: colors[i],
    output: brightnesses[i],
  });
}

// train neural net

const net = new brain.NeuralNetwork({ hiddenLayers: [3] });

// log out what happens at very end (vs what happens at each )
const stats = net.train(trainingData);

console.log(stats);
// { error: 0.004997083827757059, iterations: 1428 }
// learned it pretty fast

// see what neural net outputs:

console.log(
  net.run({
    red: 0.9,
  })
);

/*
{
  dark: 0.9445916414260864,
  neutral: 0.028699304908514023,
  light: 0.0013907894026488066
} 
*/

// gives us that red is dark (when at 0.9)

// bonus
// what if we want to revert the problem?
// asking the neural net for colors rather than classifying their brightness
// change input and outputs?
// inputs: { light, neutral, dark }
// output: { red, green, blue }

const invertedTrainingData = [];

for (let i = 0; i < colors.length; i++) {
  invertedTrainingData.push({
    input: brightnesses[i],
    output: colors[i],
  });
}

const invertedNet = new brain.NeuralNetwork({ hiddenLayers: [3] });

const invertedStats = invertedNet.train(invertedTrainingData);

console.log(invertedStats);
// { error: 0.025163172557859204, iterations: 20000 }
// didn't do a great job at learning the problem
// when you flip a neural net, you're kind of generating values that can be useful in predictions
