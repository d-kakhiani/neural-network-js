import { Neuron } from './Neuron.js';

export class Layer {
  constructor(index = 0, neurons = []) {
    this.id = index;
    this.neurons = neurons;
  }

  /**
   * Create each layer based on number of Neurons, and inputs
   *
   * @param numberOfNeurons - Number of neurons in current layer
   * @param numberOfInputs - Number of neurons from previous layer
   */
  populate(numberOfNeurons, numberOfInputs) {
    this.neurons = Array.from({ length: numberOfNeurons }, () => new Neuron().populate(numberOfInputs));
    return this;
  };
}
