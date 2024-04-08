import { Generation } from "./Generation.js";
import { Network } from "./Network.js";
import config from "../config.js";

export class Evolution {
  constructor(generations = []) {
    this.generations = generations;
  }

  /**
   * Generate first generation
   * @returns {IterableIterator<*>} networks
   */
  static* initialGeneration() {
    for (let i = 0; i < config.population; i++) {
      let newNetwork = new Network();
      newNetwork.perceptronGeneration(config.networkSetup.input, config.networkSetup.hidden, config.networkSetup.output);
      yield newNetwork.data;
    }
  };

  get lastGeneration() {
    return this.generations[this.generations.length - 1];
  }

  /**
   * Generate next generation if first exists
   * @returns {IterableIterator<*>} networks
   */
  * nextGeneration() {
    if (this.generations.length === 0) {
      yield* Evolution.initialGeneration();
    } else {
      yield* this.lastGeneration.generateNextGeneration()
    }
    this.generations.push(new Generation());
  };

  /**
   * add genome to last generation
   * @param genome
   * @returns {boolean}
   */
  addGenome(genome) {
    if (this.generations.length === 0) return false;
    this.lastGeneration.addGenome(genome);
  };

  /**
   * Compute score for network layer, based on inputs.
   * It will return score for network layer, it would be array of score for each neuron in output layer.
   * @param network
   * @param inputs
   * @returns {Number[]}
   */
  static computeScore(network, inputs) {
    return network.compute(inputs);
  }

}
