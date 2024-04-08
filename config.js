export default {
  networkSetup: {
    input: 3,
    hidden: [4],
    output: 1
  },
  population: 50, // How many networks should be in a generation

  fromPrevious: 0.2, // What percentage of the population should be from the previous generation
  newRandom: 0.2, // What percentage of the population should be random
  mutationRate: 0.1,  // How likely a mutation is to occur
  crossoverRate: 0.5,  // How likely a crossover is to occur


  mutationRange: 0.5, // How much a mutation can change a weight
  numberOfChildren: 1, // How many children each species should have
};
