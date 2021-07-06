const convertDegToRadians = require("./convertDegToRadians");
const getAbsoluteDifference = require("./getAbsoluteDifference");

/**
 * This function gets the distance between any two coordinates
 * @param coord1[0] {number} a latitude value
 * @param coord1[1] {number} a longitude value
 * @param coord2[0] {number} a latitude value
 * @param coord2[1] {number} a longitude value
 * @returns {number} the absolute difference between any two numbers provided
 */
const greatCircleDistance = (coord1, coord2) => {
  const earthRadius = 6378.137; // kilometres

  let coord1Radians = [
    convertDegToRadians(coord1[0]),
    convertDegToRadians(coord1[1]),
  ];
  let coord2Radians = [
    convertDegToRadians(coord2[0]),
    convertDegToRadians(coord2[1]),
  ];

  const absoluteDiffBtnCoords = [
    getAbsoluteDifference(coord1Radians[0], coord2Radians[0]),
    getAbsoluteDifference(coord1Radians[1], coord2Radians[1]),
  ];

  const centralAngle = Math.acos(
    Math.sin(coord1Radians[1]) * Math.sin(coord2Radians[1]) +
      Math.cos(coord1Radians[1]) *
        Math.cos(coord2Radians[1]) *
        Math.cos(absoluteDiffBtnCoords[0])
  );

  const result = earthRadius * centralAngle;
  return result;
};

module.exports = greatCircleDistance;
