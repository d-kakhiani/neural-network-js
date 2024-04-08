export default {
  /**
   * Generate random value between -1 and 1. It will be used to generate random weights for neurons in network.
   * @returns {number}
   */
  randomValue() {
    return Math.random() * 2 - 1;
  },

  /**
   * Activation function, which used to calculate neuron output. Sum of all inputs multiplied by weights will be passed to this function.
   * @param a
   * @returns {number}
   */
  activation(a) {
    return (1 / (1 + Math.exp(-1 * a)))
  }
}
