import brain from 'brain.js';

// can provide values other than numbers
// light switch off
// if you ask a child to turn it on, they would
// but maybe they'll get excited, do some cartwheels over to the light switch, turn it on, do a cheer, and cartwheel away

// ability to understand off and on has HUGE implications
// since computers speak binary, we can use the same practice:
// On = 1
// Off = 0

// when a neuron fires, we assign it's value as 1 (on)
// when it's not firing, it's value is 0 (off)

// can suggest about any value into a neuron net
// so long as that value is represented by a neuron

// object w/property names of restaurants
// has values that are day of week where they offer eat free w/kids
// objective is to find way to get string values represented as 1s and 0s in neural net
// give neural net a day of hte week and it's going to tell us where to go to each free with kids

const restaurants = {
  'Brilliant Yellow Corral': 'Monday',
  'Penny’s': 'Tuesday',
  'Right Coast Wings': 'Wednesday',
  'The Delusion Last Railway Car': 'Thursday',
  'Fun Day Inn': 'Friday',
  JHOP: 'Saturday',
  Owls: 'Sunday',
};

// if restaurants[key] === day of week, it's value is 1 (being run)
// all others are 0 (not running)

// input: { Monday, Tuesday, Wednesday, ...}
// out: { Restaurant1, Restaurant2, ... }

// build up training data:

const trainingData = [];

for (let restaurantName in restaurants) {
  const dayOfWeek = restaurants[restaurantName];
  trainingData.push({
    input: { [dayOfWeek]: 1 },
    // giving input to neural net assigned by it's value of 1
    // all other days of week will be 0 (by default since we DIDN'T INCLUDE THEM)
    output: { [restaurantName]: 1 },
  });
}

const net = new brain.NeuralNetwork({ hiddenLayers: [3] });

const stats = net.train(trainingData);

console.log(stats);
// { error: 0.004999099892494174, iterations: 1412 }
// in under 1500 iterations, neural net had deciphered what day of week to eat free with kids

// let's look at what comes out of the neural net

// see what we get when we run with the Monday neuron on:
console.log(net.run({ Monday: 1 }));

// get an object with all restaurants and their likelihood
/*
{
  'Brilliant Yellow Corral': 0.8258895874023438,
  'Penny’s': 0.0754634439945221,
  'Right Coast Wings': 0.00013030499394517392,
  'The Delusion Last Railway Car': 0.09731686860322952,
  'Fun Day Inn': 0.06747379153966904,
  JHOP: 0.00010784715414047241,
  Owls: 0.044866908341646194
}
*/

// we want to put a string in and get a string out of neural net

// if likelihood > 0.7, return the key?

const restaurantForDay = (day) => {
  const result = net.run({ [day]: 1 });
  // get an object w/likelihood of we should eat there
  // restaurant with highest likelihood will be correct prediction for given day

  let highestValue = 0;
  let highestRestaurantName = '';

  for (let restaurantName in result) {
    if (result[restaurantName] > highestValue) {
      highestValue = result[restaurantName];
      highestRestaurantName = restaurantName;
    }
  }

  return highestRestaurantName;
};

console.log(restaurantForDay('Monday'));
// Brilliant Yellow Corral
console.log(restaurantForDay('Tuesday'));
// Penny's
console.log(restaurantForDay('Wednesday'));
// Right Coast Wings
console.log(restaurantForDay('Thursday'));
// The Delusion Last Railway Car
console.log(restaurantForDay('Friday'));
// Fun Day Inn
console.log(restaurantForDay('Saturday'));
// JHOP
console.log(restaurantForDay('Sunday'));
// Owls

// STRING IN and STRING OUT

// bonus, flip problem
// input restaurant name and get out day of week

const invertedTrainingData = [];

for (let restaurantName in restaurants) {
  const dayOfWeek = restaurants[restaurantName];
  invertedTrainingData.push({
    input: { [restaurantName]: 1 },
    // giving input to neural net assigned by it's value of 1
    // all other days of week will be 0 (by default since we DIDN'T INCLUDE THEM)
    output: { [dayOfWeek]: 1 },
  });
}

const invertedNet = new brain.NeuralNetwork({ hiddenLayers: [3] });

const invertedStats = invertedNet.train(invertedTrainingData);

console.log(invertedStats);

console.log(invertedNet.run({ 'Penny’s': 1 }));

const dayForRestaurant = (restaurant) => {
  const result = invertedNet.run({ [restaurant]: 1 });

  let highestValue = 0;
  let highestDay = '';

  for (let dayOfWeek in result) {
    if (result[dayOfWeek] > highestValue) {
      highestValue = result[dayOfWeek];
      highestDay = dayOfWeek;
    }
  }

  return highestDay;
};

console.log(dayForRestaurant('Penny’s'));
// Tuesday
