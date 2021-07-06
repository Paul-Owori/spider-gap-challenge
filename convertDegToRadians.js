/**
 * This function converts a value assumed to be a degree into a radian
 * @param {string} deg is the value to be converted
 * @returns {string} the equivalent value in radians
 */
const convertDegToRadians = (deg) => {
  const pi = Math.PI;
  return deg * (pi / 180);
};

module.exports = convertDegToRadians;
