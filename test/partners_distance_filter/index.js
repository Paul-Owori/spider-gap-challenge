const partners = require("./resources/partners.json");
const greatCircleDistance = require("./utilities/great_circle_distance");
const stringToNumCoords = require("./utilities/string_to_num_coords");
const sortArray = require("./utilities/sort_array");

/**
 * This function filters for all partners of SpiderGap within a 100km radius of central london from the partners.json object provided
 * @returns {object} an array of the company names and addresses of matching partners (with offices within 100km) sorted by company name (ascending)
 */
const findClosestPartners = () => {
  const centralLondon = [51.515419, -0.141099];

  let unsortedCloseOffices = [];
  partners.forEach((partner) => {
    let distancesObj = {
      ...partner,
      offices: [],
    };

    partner.offices.forEach((office) => {
      const distanceFromCentralLondon = greatCircleDistance(
        centralLondon,
        stringToNumCoords(office.coordinates)
      );
      const officeIsCloseEnough = distanceFromCentralLondon <= 100;
      if (officeIsCloseEnough) {
        distancesObj.offices.push(office);
      }
    });

    if (distancesObj.offices.length) {
      unsortedCloseOffices.push(distancesObj);
    }
  });

  const sortedCloseOffices = unsortedCloseOffices.sort(
    sortArray("organization", 1)
  );
  return sortedCloseOffices;
};

module.exports = findClosestPartners;
