# neural-network-js

This is a simple neural network implementation in JavaScript. 


## Configuration

The neural network can be configured by changing the values in the `config.js` file. The configuration options are:

- `networkSetup.input`: The number of input nodes in the neural network.
- `networkSetup.hidden`: The number of hidden nodes in the neural network.
- `networkSetup.output`: The number of output nodes in the neural network.

- `population`: The number of neural networks in the population.
- `mutationRange`: The range of the mutation in the neural network.
- `numberOfChildren`: The number of children to be created from the best neural networks.

- `fromPrevious`: Percentage of neural networks to be created from the previous generation.
- `newRandom`: Percentage of neural networks to be created randomly.
- `mutationRate`: Percentage of neural networks to be created by mutation.
- `crossoverRate`: Percentage of neural networks to be created by crossover.

Note that the sum of `fromPrevious`, `newRandom`, `mutationRate` and `crossoverRate` should be equal to 1.


## Usage

```javascript

// Create a new neural network
import Run from '../Run.js';

const setup = new Run({
  ...config // Override the default configuration
});

// initialize the neural network with previous generation data or empty data []

setup.initialGeneration(data);

// We can set previously trained neural networks to the population

setup.setTrained(data);

// or start from scratch

const generation = setup.nextGeneration(); // Create entire generation array (size of population)

// Save actual score for each neural network in the population
setup.networkScore(generation[i], score); 


// Compute result for each neural network in the population
const result = setup.computeScore(generation[i], inputs);

// based on result you can create different scoring logic. Result is array of output nodes values


```
