/**
 * This function checks if the value provided is an object that cannot be iterated through
 * @param {object} val is the value to be checked
 * @returns {boolean} true if the value is an object that cannot be iterated through
 */

const isNonIterableObj = (val) => {
  const isMap = val instanceof Map;
  const isSet = val instanceof Set;
  const isDate = val instanceof Date && !isNaN(val.valueOf());
  const isNull = val === null;

  return isMap || isSet || isDate || isNull;
};

module.exports = isNonIterableObj;
