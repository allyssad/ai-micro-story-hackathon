import brain from 'brain.js';

// write a children's book using a recurrent NN

const trainingData = [
  'Jane saw Doug.',
  'Doug saw Jane.',
  'Spot saw Doug and Jane looking at each other.',
  'It was love at first sight, and Spot had a frontrow seat. It was a very special moment for all.',
];

// what type of NN would we use?
// use LSTM?

const net = new brain.recurrent.LSTM();

net.train(trainingData, {
  iterations: 1500,
  errorThresh: 0.011,
  // log: (stats) => {
  //   console.log(stats);
  // },
});
// iterations: 410, training error: 0.011001549372942707

console.log(net.run(net.run('Jane')));
// and Jane looking at each other.

console.log(net.run('It was'));
// love at first sight, and Spot had a frontrow seat. It was a very special moment for all.

// depending on how you set up your NN, you can get some interesting outputs

// bonus - experiment w/book writing
