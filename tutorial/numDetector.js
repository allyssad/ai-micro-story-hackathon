import brain from 'brain.js';

// read nums from an image
// rawData = ' # ';
// don't want NN to see spaces

const toArray = (str) => {
  // normalize
  if (str.length !== 7 * 7) throw new Error('string in wrong size');
  return str.split('').map(toNum);
};

const toNum = (char) => {
  return char === '#' ? 1 : 0; // ignore anything that's not a hash
};

const zero = toArray(
  '#######' +
    '#     #' +
    '#     #' +
    '#     #' +
    '#     #' +
    '#     #' +
    '#######'
);
const one = toArray(
  '   #   ' +
    '   #   ' +
    '   #   ' +
    '   #   ' +
    '   #   ' +
    '   #   ' +
    '   #   '
);
const two = toArray(
  '#######' +
    '#     #' +
    '      #' +
    '     # ' +
    '   #   ' +
    ' #     ' +
    '#######'
);
const three = toArray(
  '#######' +
    '      #' +
    '      #' +
    ' ######' +
    '      #' +
    '      #' +
    '#######'
);
const four = toArray(
  '#     #' +
    '#     #' +
    '#     #' +
    '#######' +
    '      #' +
    '      #' +
    '      #'
);
const five = toArray(
  '#######' +
    '#      ' +
    '#      ' +
    '#######' +
    '      #' +
    '      #' +
    '#######'
);
const six = toArray(
  '      #' +
    '    #  ' +
    '  #    ' +
    ' ######' +
    '#     #' +
    '#     #' +
    '#######'
);
const seven = toArray(
  '#######' +
    '     # ' +
    '    #  ' +
    '   #   ' +
    '  #    ' +
    ' #     ' +
    '#      '
);
const eight = toArray(
  '#######' +
    '#     #' +
    '#     #' +
    '#######' +
    '#     #' +
    '#     #' +
    '#######'
);
const nine = toArray(
  '#######' +
    '#     #' +
    '#     #' +
    '###### ' +
    '    #  ' +
    '   #   ' +
    ' #     '
);

console.log(nine);
// outputs what the NN will speak (1s & 0s)
/*
[
  1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0,
  0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1,
  1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1,
  0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1,
  0, 0, 0, 0, 0
]
*/

const net = new brain.NeuralNetwork();
// don't have to worry about size bc it's a feed-forward NN

const trainingData = [
  { input: zero, output: { zero: 1 } },
  // output = prop that we're classifying towards w/ value of one
  { input: one, output: { one: 1 } },
  { input: two, output: { two: 1 } },
  { input: three, output: { three: 1 } },
  { input: four, output: { four: 1 } },
  { input: five, output: { five: 1 } },
  { input: six, output: { six: 1 } },
  { input: seven, output: { seven: 1 } },
  { input: eight, output: { eight: 1 } },
  { input: nine, output: { nine: 1 } },
];

net.train(trainingData, {
  // log: (stats) => {
  // console.log(stats);
  // },
});

// 190 iterations w/ very low error rate:
// iterations: 190, training error: 0.005500932907592269

const result = net.run(
  toArray(
    '#######' +
      '#     #' +
      '#     #' +
      '#######' +
      '#     #' +
      '#     #' +
      '#######'
  )
);

console.log(result);
// output is all props we used in TD
// one that's most likely has the highest value (8)
/*
{
  zero: 0.11365333199501038,
  one: 0.0027544733602553606,
  two: 0.0048357523046433926,
  three: 0.07371432334184647,
  four: 0.06479360163211823,
  five: 0.10740792751312256,
  six: 0.052824120968580246,
  seven: 0.012165521271526814,
  eight: 0.7610383629798889, // most likely
  nine: 0.046504464000463486
}
*/

// can use "likely" utility built into brain

const likelyResult = brain.likely(
  toArray(
    '#######' +
      '#     #' +
      '#     #' +
      '#######' +
      '#     #' +
      '#     #' +
      '#######'
  ),
  net
);

console.log(likelyResult);
// eight

// this method will likely be fragile in the RW w/o convolutions

// how resilient is a NN?
// why wouldn't we just use a bunch of if statements/loops to build an 8

// if we remove something the NN sees (e.g. a #), would it think it's a 6 or something else? or still an 8?

const testResult = brain.likely(
  toArray(
    '#######' +
      '#     #' +
      '#     #' +
      '##  ###' +
      '#     #' +
      '#     #' +
      '#######'
  ),
  net
);

console.log(testResult);
// eight

// NN are dynamic and resilient!

// bonus - write 3 examples that still match 8 but are not like training data

const bonus1 = brain.likely(
  toArray(
    '#######' +
      '#     #' +
      '#     #' +
      '#######' +
      '#     #' +
      '#     #' +
      '&&&&&&&'
  ),
  net
);

console.log('bonus1:', bonus1);

const bonus2 = brain.likely(
  toArray(
    '#sdfsdf' +
      '#     #' +
      '#     #' +
      '##  ###' +
      '#     #' +
      '#     #' +
      '#######'
  ),
  net
);

console.log('bonus2:', bonus2);

const bonus3 = brain.likely(
  toArray(
    'df000##' +
      '#     #' +
      '#     #' +
      '## d ##' +
      '#    4 ' +
      '#     #' +
      '###--##'
  ),
  net
);

console.log('bonus3:', bonus3);
