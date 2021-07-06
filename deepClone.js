const isNonIterableObj = require("./isNonIterableObject");

/**
 * This function creates a deep copy of an object
 * @param {object} obj is an object to be copied
 * @returns {object} An object identical to the one that was provided
 */
const deepClone = (obj) => {
  let result = {};

  /**
   * This function creates a deep copy of an array
   * @param {object} arr is an array to be copied
   * @returns {object} An array identical to the one that was provided
   */
  const deepCloneArray = (arr) => {
    let newArr = [];
    arr.forEach((val) => {
      if (Array.isArray(val)) {
        newArr.push(deepCloneArray(val));
      } else if (typeof val !== "object" || isNonIterableObj(arr)) {
        newArr.push(val);
      } else {
        newArr.push(deepClone(val));
      }
    });
    return newArr;
  };

  Object.keys(obj).forEach((key) => {
    const currentValue = obj[key];
    const currentKey = key;

    // Handle arrays
    if (Array.isArray(currentValue)) {
      let newArr = deepCloneArray(currentValue);
      result[currentKey] = newArr;
    }

    // If the value is a non iterable object, it will throw an error if run through a recursive deepClone
    else if (
      typeof currentValue !== "object" ||
      isNonIterableObj(currentValue)
    ) {
      result[currentKey] = currentValue;
    } else {
      // Run deepClone function recursively to deal with nested objects
      // However, if there are too many layers, a stack overflow will occur
      result[currentKey] = deepClone(currentValue);
    }
  });

  return result;
};

module.exports = deepClone;
