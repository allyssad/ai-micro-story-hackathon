import brain from 'brain.js';
// count to 5

// inputs have width and height => length
// width * height = length
// width and heights are constants
// don't really change neural nets

// say you're at the movies, and you're at a cliffhanger scene and the screen goes black
// we were expecting something to happen next
// why were you expecting something to happen next?
// built up a memory of was was happening up until that point

// height + width = frame
// every frame of the movie was the same height and width
// frame being one part of the movie
// each frame has that constant size
// frames (duration, many frames) = depth
// depth = context (the depth, aka the frames/how long the movie is/what happens on those frames gives us context as to what's happening in the movie)

// same as with neural nets
// context will repeat or 'recur' ==> recurrent

// when we tell it 1 with no context, it doesn't know what to do with that
// once we give it context, it will start to decipher what to do next
// give context of 1, 2, 3, 4....
// expect a response of five

// recurrent adds them together and predict we want 5 next
// depth = time (happens over time)
// context is an observer and looks at each of these steps and can guess what happens next
// dynamic

// ability to take in those frames = recurrent neural net
// 'time-step'

// two outcomes: 1-5, 5-1

const trainingData = [
  [1, 2, 3, 4, 5],
  [5, 4, 3, 2, 1],
  [6, 7, 8, 9, 10],
  [10, 9, 8, 7, 6],
];

const net = new brain.recurrent.LSTMTimeStep();

net.train(trainingData);

console.log(net.run([1, 2, 3, 4]));
// 4.980099201202393

console.log(net.run([5, 4, 3, 2]));
// 1.0002012252807617

// bonus - add training array that counts from 5-10, 10-5
console.log(net.run([5, 6, 7, 8]));
// 9.493404388427734

console.log(net.run([10, 9, 8, 7]));
// 5.994796276092529
