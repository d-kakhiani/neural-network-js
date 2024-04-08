import Utils from "./utils.js";

export class Neuron {
  constructor({ value = 0, weights = [] } = {}) {
    this.value = value;
    this.weights = weights;
  }

  /**
   * Populate neuron with random weights
   * @param length
   * @returns {Neuron}
   */
  populate(length) {
    this.weights = Array.from({ length }, Utils.randomValue);
    return this;
  }
}
