import brain from 'brain.js';

// take a recurrent NN and learn math
// do it character by character

// there are no nums (they're strings) in our NN
// will feed these directly into NN
const trainingData = [
  '0+0=0',
  '0+1=1',
  '0+2=2',
  '0+3=3',
  '0+4=4',
  '0+5=5',

  '1+0=1',
  '1+1=2',
  '1+2=3',
  '1+3=4',
  '1+4=5',
  '1+5=6',

  '2+0=2',
  '2+1=3',
  '2+2=4',
  '2+3=5',
  '2+4=6',
  '2+5=7',

  '3+0=3',
  '3+1=4',
  '3+2=5',
  '3+3=6',
  '3+4=7',
  '3+5=8',

  '4+0=4',
  '4+1=5',
  '4+2=6',
  '4+3=7',
  '4+4=8',
  '4+5=9',

  '5+0=5',
  '5+1=6',
  '5+2=7',
  '5+3=8',
  '5+4=9',
  '5+5=10',
];

// RNN has an inputMap that maps a value coming into the NN to a neuron by index:

const inputMap = ['0', '+', '=', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
// goes character by character adding unique characters to build an input map
// input map lines up with neurons
// more or less the same size as our input size
// inputMap.length === inputSize (calculated internally by brain.js)

// each character get it's own neuron
// we feed in a brand new array with that one value activated:

const inputInternally = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

// ['0+0=0'] looks like:

// [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] 0 activated
// [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] + activated
// [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] 0 activated
// [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0] = activated
// [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] 0 activated

const net = new brain.recurrent.LSTM({ hiddenLayers: [20] });

// if you crank down your error thres (0.05), NN can learn it but since it's in the browser can take a long time
// LSTM is complex under the hood
net.train(trainingData, {
  errorThresh: 0.025,
  // log: (stats) => console.log(stats),
});

console.log(net.run('0+1=')); // 1
console.log(net.run('4+1=')); // 5
console.log(net.run('2+1=')); // 3

// bonus - light it up with some math problems!
