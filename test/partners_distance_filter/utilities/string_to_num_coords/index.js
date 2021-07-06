/**
 * This function converts coordinates saved as string into into the number datatype
 * @param {string} val value to be converted
 * @returns {object} an array containing the coordinates as numbers
 */
const stringToNumCoords = (val) => {
  let result = [Number(val.split(",")[0]), Number(val.split(",")[1])];
  return result;
};

module.exports = stringToNumCoords;
