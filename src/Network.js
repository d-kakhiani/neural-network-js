import Utils from "./utils.js";
import { Layer } from "./Layer.js";
import { Neuron } from "./Neuron.js";

export class Network {
  constructor(data = null, basicType = false) {
    this.layers = [];
    if (data === null) return;
    if (basicType) {
      this.indexWeights = data.indexWeights;
      this.layers = data.layers.map(({ id, neurons }) => new Layer(id, neurons.map(neuron => new Neuron(neuron))));
      return;
    }
    let previousLayerNeurons = 0, index = 0;
    this.indexWeights = 0;

    for (let item of data.neurons) {
      this.addLayers(index++, item, previousLayerNeurons, data.weights);
      previousLayerNeurons = item;
    }
  }

  /**
   * Create initial network based on configuration
   *
   * @param numberOfInput - Number of input neurons
   * @param hidden - [] Array of hidden layers, where each item is number of neurons in this hidden layer
   * @param numberOfOutput - Number of output neurons
   */
  perceptronGeneration(numberOfInput = 1, hidden = [], numberOfOutput = 1) {
    let previousLayerNeurons = 0, index = 0;

    this.addLayers(index++, numberOfInput, previousLayerNeurons);
    previousLayerNeurons = numberOfInput;

    for (const numberOfNeurons of hidden) {
      this.addLayers(index++, numberOfNeurons, previousLayerNeurons);
      previousLayerNeurons = numberOfNeurons;
    }
    this.addLayers(index, numberOfOutput, previousLayerNeurons);
  }

  /**
   * Move from one layer to another.
   *
   * @param index - what is current layer index
   * @param numberOfNeurons - how many neurons are there in current layer
   * @param previousNumberOfNeurons - how many neurons were in previous layer
   * @param weights - weights for initial value of neurons
   */
  addLayers(index, numberOfNeurons, previousNumberOfNeurons, weights = []) {
    const layer = new Layer(index).populate(numberOfNeurons, previousNumberOfNeurons);
    if (weights.length) {
      for (let j in layer.neurons) {
        for (let k in layer.neurons[j].weights) {
          layer.neurons[j].weights[k] = weights[this.indexWeights];
          this.indexWeights++;
        }
      }
    }
    this.layers.push(layer);
  }

  get lastLayer() {
    return this.layers[this.layers.length - 1];
  }

  /**
   * get hard copy of this network.
   * @returns {{neurons: Array, weights: Array}}  Number of Neurons each layer, and flat weights
   */
  get data() {
    const networkData = {
      neurons: [],
      weights: []
    };
    for (let layer of this.layers) {
      networkData.neurons.push(layer.neurons.length);
      for (let neuron of layer.neurons) {
        networkData.weights.push(...neuron.weights);
      }
    }
    return networkData;
  }

  /**
   * Calculate outputs and return output layer neurons values
   * @param inputs
   * @returns {Number[]}
   */
  compute(inputs) {
    let neuronIndex = 0;
    for (let value of inputs) {
      if (this.layers?.[0]?.neurons[neuronIndex]) {
        this.layers[0].neurons[neuronIndex].value = value;
      }
      neuronIndex++;
    }
    let prevLayer = this.layers[0];

    for (let layer of this.layers.filter((value, index) => index > 0)) {
      for (let neuron of layer.neurons) {
        let sum = 0;
        for (let index in prevLayer.neurons) {
          sum += prevLayer.neurons[index].value * neuron.weights[index];
        }
        neuron.value = Utils.activation(sum);
      }
      prevLayer = layer;
    }

    return this.lastLayer.neurons.map((item) => item.value);
  }
}
