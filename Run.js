import config from './config.js';
import { Evolution } from "./src/Evolution.js";
import { Network } from "./src/Network.js";
import { Genome } from "./src/Genome.js";

export default class Run {
  constructor(props = {}) {
    let customProps = Object.keys(props);
    for (let prop of customProps) {
      if (config[prop]) {
        config[prop] = props[prop];
      }
    }
    this.population = config.population;
    this.evolution = new Evolution();
  }

  /**
   * Initial data for model, it could be previously trained data or start from scratch.
   * It will create network and return entire generation based on data provided.
   * @param data
   * @returns {*[]}
   */
  initialGeneration(data) {
    let generation = [];
    let training = this.trainData || true;
    if (typeof data === 'string') {
      data = JSON.parse(data)
    }
    for (let network of data) {
      generation.push(new Network(network, training));
    }
    return generation;
  }

  /**
   * Set trained data for network.
   * @param data
   */
  setTrained(data) {
    this.trainData = data;
  }

  /**
   * Next generation based on current generation.
   * This would be called after scoring each network in generation. Once all networks are scored, this method will be called to get next generation.
   * @returns {Network[]}
   */
  nextGeneration() {
    let newGeneration = [...this.evolution.nextGeneration()].map(network => new Network(network));

    // TODO need memory clean

    if (this.evolution.generations.length > 3) {
      this.evolution.generations = this.evolution.generations.slice(0, this.evolution.generations.length - 2)
    }

    return newGeneration;
  }

  /**
   * Train data for network. It will be used to train network, save each network score; and based on score, it will create next generation.
   * @param network
   * @param score
   */
  networkScore(network, score) {
    this.evolution.addGenome(new Genome(score, network.data));
  }

  /**
   * Compute score for network based on inputs.
   * @param network
   * @param inputs
   * @returns {*}
   */
  computeScore(network, inputs) {
    return this.evolution.constructor.computeScore(network, inputs);
  }
}
