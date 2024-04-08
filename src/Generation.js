import Utils from "./utils.js";
import config from "../config.js";

export class Generation {
  constructor() {
    this.genomes = [];
  }

  /**
   *
   * @param score
   * @returns {number} index of genome`s (with @score) position
   */
  getGenomePosition(score) {
    for (let i = 0; i < this.genomes.length; i++) {
      if (score > this.genomes[i].score) {
        return i;
      }
    }
    return this.genomes.length;
  }

  /**
   * add genome to Generation
   *
   * @param genome
   */
  addGenome(genome) {
    let index = this.getGenomePosition(genome.score);
    this.genomes.splice(index, 0, genome);
  }

  /**
   * Genetic operation to data
   * create new species
   *
   * @param firstGenome - it changes data (destination)
   * @param secondGenome - source of data (during crossover)
   *
   *
   * @param number - how many species
   * @returns {Array}
   */
  static* createSpecies(firstGenome, secondGenome, number = 1) {
    number = Math.max(number, 1);
    for (let i = 0; i < number; i++) {

      const { network } = structuredClone(firstGenome);
      //Crossover
      for (let index = 0; index < secondGenome.network.weights.length; index++) {
        if (Math.random() <= config.crossoverRate) {
          network.weights[index] = secondGenome.network.weights[index];
        }
      }
      //Mutation
      for (let index = 0; index < network.weights.length; index++) {
        if (Math.random() <= config.mutationRate) {
          network.weights[index] += Math.random() * config.mutationRange * 2 - config.mutationRange;
        }
      }
      yield network;
    }
  }

  /**
   * create new generation network and returns
   *  creation process is based on fromPrevious,population, newRandom, numberOfChildren
   * @returns {Array}
   */
  * generateNextGeneration() {
    let population = config.population;

    // generate new species from previous generation
    const fromPrevious = Math.round(config.fromPrevious * config.population);

    for (let i = 0; i < fromPrevious; i++) {
      if (population--) {
        yield structuredClone(this.genomes[i].network)
      }
    }


    // generate new species with random weights
    const newRandom = Math.round(config.newRandom * config.population);

    for (let i = 0; i < newRandom; i++) {
      const newNetwork = structuredClone(this.genomes[0].network);
      newNetwork.weights = newNetwork.weights.map(Utils.randomValue);
      if (population--) {
        yield newNetwork;
      }
    }

    // generate new species with random parents
    while (population) {
      population -= config.numberOfChildren;
      const min = Math.floor(Math.random() * this.genomes.length);
      const max = Math.floor(Math.random() * this.genomes.length);
      yield* Generation.createSpecies(this.genomes[min], this.genomes[max], config.numberOfChildren);
    }
  };
}
