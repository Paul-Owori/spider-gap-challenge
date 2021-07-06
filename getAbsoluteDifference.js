/**
 * This function gets the absolute difference between any two values a and b
 * @param a {number} a numerical value
 * @param b {number} a numerical value
 * @returns {number} the absolute difference between any two numbers provided
 */
const absoluteDifference = (a, b) => {
  let diff = a - b;
  if (diff < 0) {
    diff = diff * -1;
  }
  return diff;
};

module.exports = absoluteDifference;
