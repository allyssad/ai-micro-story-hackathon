import brain from 'brain.js';
import rawData from './normalization.js';

// rawData = [{ open: number, high: number, low: number, close: number }]

function scaleDown(step) {
  // normalize
  return {
    open: step.open / 138,
    high: step.high / 138,
    low: step.low / 138,
    close: step.close / 138,
  };
}

function scaleUp(step) {
  // denormalize
  return {
    open: step.open * 138,
    high: step.high * 138,
    low: step.low * 138,
    close: step.close * 138,
  };
}

const scaledData = rawData.map(scaleDown);

// creates an array of all new normalized values

// instead of feeding NN the whole array (one long pattern)
// we want the NN to ingest smaller patterns to predict off of those

const trainingData = [
  scaledData.slice(0, 5),
  scaledData.slice(5, 10),
  scaledData.slice(10, 15),
  scaledData.slice(15, 20),
];

// console.log(trainingData);

// array of arrays *IMPORTANT CONCEPT*

// data chunked and normalized
// ready to go into NN
// scaled down data has 4 props that represents one moment in time

const net = new brain.recurrent.LSTMTimeStep({
  inputSize: 4,
  hiddenLayers: [8, 8],
  outputSize: 4,
});

// add a learning rate so it doesn't shoot past the values we're looking for
// add error threshold, we want it to be relatively good
net.train(trainingData, {
  learningRate: 0.005,
  errorThresh: 0.02,
  // log: (stats) => console.log(stats),
});

console.log(net.run(trainingData[0]));
/* 
{
  open: 1.0305708646774292,
  high: 1.0410406589508057,
  low: 1.022892713546753,
  close: 1.038591980934143
}
*/

// we need to scaleUp:

console.log(scaleUp(net.run(trainingData[0])));
/*
{
  open: 142.21877932548523,
  high: 143.66361093521118,
  low: 141.1591944694519,
  close: 143.32569336891174
}
*/

// currently, NN takes all of our existing steps and says hey this is the potential next step
// we want to look and see the next 2 or 3 steps may be

console.log(
  'next three steps:',
  net
    .forecast(
      [
        trainingData[0][0], // send in a couple steps of training data
        trainingData[0][1],
      ],
      3 // we want the next 3 steps
    )
    .map(scaleUp) // since we're getting an array, we can map to scale up
);
/* 
What the next has learned and it's predictions:
[
  {
    open: 141.44652557373047,
    high: 142.51780700683594,
    low: 140.3933072090149,
    close: 141.68409276008606
  },
  {
    open: 142.71704363822937,
    high: 144.29486417770386,
    low: 143.64100742340088,
    close: 144.69794368743896
  },
  {
    open: 143.88837933540344,
    high: 145.47264862060547,
    low: 143.4899718761444,
    close: 144.89106059074402
  }
]
*/
