const assert = require("assert");

// Deep clone
const deepClone = require("./deepClone");
const isNonIterableObject = require("./isNonIterableObject");
const deepCloneTestData = require("./dataToTest").deepCloneData;

describe("deepClone", function () {
  describe("#deepClone Utility Function:  isNonIterableObject", function () {
    it("should return a value of true if a non-iterable object type is provided as a parameter to the function", function () {
      assert.strictEqual(isNonIterableObject(null), true);
    });

    it("should return a value of false if an iterable object type is provided as a parameter to the function", function () {
      const original = deepCloneTestData.complex;

      assert.strictEqual(isNonIterableObject([1, 2, 3]), false);
    });
  });

  describe("#deepClone clones are equal", function () {
    it("should return a value of true if the cloned object is equal in both value and type to the original test object", function () {
      const original = deepCloneTestData.simple;
      const clone = deepClone(original);
      assert.deepStrictEqual(clone, original);
    });

    it("should return a value of true if the cloned object is equal in both value and type to a more complex test object with various data types", function () {
      const original = deepCloneTestData.complex;
      const clone = deepClone(original);
      assert.deepStrictEqual(clone, original);
    });
  });

  describe("#deepClone clone is actually deep copy", function () {
    it("should return a value of true if the cloned object is not a shallow copy using the original test object", function () {
      let original = deepCloneTestData.simple;
      let clone = deepClone(original);

      // Change the value of one property in the original to see if the clone remains unchanged
      original[Object.keys(original)[0]] = 21;
      assert.notDeepStrictEqual(clone, original);
    });

    it("should return a value of true if the cloned object is not a shallow copy using a more complex test object", function () {
      let original = deepCloneTestData.complex;
      let clone = deepClone(original);

      // Change the value of one property in the original to see if the clone remains unchanged
      original[Object.keys(original)[0]] = 21;
      assert.notDeepStrictEqual(clone, original);
    });
  });
});
