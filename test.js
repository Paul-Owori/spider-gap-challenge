const assert = require("assert");

// Deep clone
const deepClone = require("./deepClone");
const isNonIterableObject = require("./isNonIterableObject");
const deepCloneTestData = require("./dataToTest").deepCloneData;

// Partners Distance Filter
const partnersDistanceFilter = require("./partnersDistanceFilter");
const greatCircleDistance = require("./greatCircleDistance");
const sortArray = require("./sortArrByProperty");
const stringToNumCoords = require("./stringToNumCoords");

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

describe("partnersDistanceFilter", function () {
  describe("#partnersDistanceFilter Utility Function: sortArray", function () {
    it("should return a value of true if the output returned by this utility function is sorted in ascending order", function () {
      const initialOrderedArray = [
        { name: "Abbey" },
        { name: "Bob" },
        { name: "Candice" },
      ];
      const disorganisedArray = initialOrderedArray.sort(function () {
        return 0.5 - Math.random();
      });

      const reorganisedArray = disorganisedArray.sort(sortArray("name", 1));

      let allObjectsHaveIdenticalIndices = true;
      reorganisedArray.forEach((obj, index) => {
        allObjectsHaveIdenticalIndices =
          allObjectsHaveIdenticalIndices &&
          initialOrderedArray.indexOf(obj) === index;
      });

      assert.deepStrictEqual(allObjectsHaveIdenticalIndices, true);
    });
  });

  describe("#partnersDistanceFilter Utility Function: stringToNumCoords", function () {
    it("should return a value of true if the output returned by this utility function successfuly converts coordinates saved as string to their equivalent numerical values", function () {
      const centralLondon = [51.515419, -0.141099];

      const centralLondonString = `${centralLondon[0]}, ${centralLondon[1]}`;

      const centralLondonConverted = stringToNumCoords(centralLondonString);

      assert.deepStrictEqual(centralLondonConverted, centralLondon);
    });
  });

  describe("#partnersDistanceFilter Utility Function: greatCircleDistance", function () {
    it("should return a value of true if the output returned by this utility function falls within a 10% error margin of the same result obtained from http://edwilliams.org/gccalc.htm", function () {
      const location1 = [0.35168749817863315, 32.54727915324296];
      const location2 = [0.34670941080207696, 32.50693873368256];
      const distanceFromOnlineCalc = 4.524202661913314;

      const errorMarginIsAcceptable = (d1, d2) =>
        (Math.abs(d1 - d2) / d2) * 100 <= 10;

      const greatCircleDistanceResult = greatCircleDistance(
        location1,
        location2
      );

      assert.strictEqual(
        errorMarginIsAcceptable(
          distanceFromOnlineCalc,
          greatCircleDistanceResult
        ),
        true
      );
    });
  });

  describe("#partnersDistanceFilter output has only offices that are less than 100km from the centre of London", function () {
    it("should return a value of true if all the organizations returned have close by offices", function () {
      let officesAreClose = true;
      const centralLondon = [51.515419, -0.141099];
      const closeOrganisations = partnersDistanceFilter();

      closeOrganisations.forEach((org) => {
        org.offices.forEach((office) => {
          const distanceFromMain = greatCircleDistance(
            centralLondon,
            stringToNumCoords(office.coordinates)
          );
          const distanceIsWithinRange = distanceFromMain <= 100;
          officesAreClose = officesAreClose && distanceIsWithinRange;
        });
      });

      assert.strictEqual(officesAreClose, true);
    });
  });

  describe("#partnersDistanceFilter output is sorted (ascending) based on company name", function () {
    it("should return a value of true if the organizations are returned in an array sorted based on company name", function () {
      partnersDistanceFilter();
      const closeOrganisations = [];
      const closeOrgsSorted = closeOrganisations.sort(
        sortArray("organization", 1)
      );

      let allObjectsHaveIdenticalIndices = true;
      closeOrgsSorted.forEach((obj, index) => {
        allObjectsHaveIdenticalIndices =
          allObjectsHaveIdenticalIndices &&
          closeOrganisations.indexOf(obj) === index;
      });

      assert.deepStrictEqual(allObjectsHaveIdenticalIndices, true);
    });
  });
});
