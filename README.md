# SPIDERGAP CHALLENGE

The SpiderGap Challenge consists of two coding challenges which have been addressed with the functions below

## DEEP CLONE

This function (./deepClone.js) creates a deep clone of any object passed as a parameter. This function takes in an object as a parameter. It returns a clone of the object received.

This function has a single utility function it needs to function correctly, ./isNonIterableObject

## PARTNERS DISTANCE FILTER

This function (./deepClone.js) searches the json file provided [here](https://success.spidergap.com/partners.json) to find the names and addresses of any partners whose offices are closer than 100km to Central London (coordinates 51.515419, -0.141099). 
This function does not take in any parameters. It returns an array containing the partner organisations that fulfill the above criteria, sorted in ascending order


This function is dependant on several resources:
- ./partners.json which contains the data that is passed into the function
- ./greatCircleDistance which calculates the shortest distance between ant two points on a sphere (earth)
- ./stringToNumCoords which converts the coordinates saved in ./partners.json from string to their numerical equivalent
- ./sortArrByProperty which sorts an array either in descending or ascending order


No third party packages other than Mocha were used anywhere in the project.
The test command for all the above is "test"