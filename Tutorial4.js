//************************************************************************
//Task 1: Applying filter, map, and reduce function on arrays of numbers
//************************************************************************

//1 - declaring the array
let distance = [134, 6, 7, 83, 9, 1, 0, 9, 6, 17, 54, 16];

//2a - creating the long filter function for filtering elements of distance
//Create a function for checking the range between 5 and 10
let checkFunctionLong = function(distance) {
    //setting the criteria to be the range between 5 and 10
    return distance > 5 && distance < 10;
};
//set checkRangeLong to be the filtered distance array
let checkRangeLong = distance.filter(checkFunctionLong);
//print to console
console.log(checkRangeLong);

//2b - creating the short filter function for filtering elements of distance
//Create a function for checking the range between 5 and 10 and setting the criteria to be the range between 5 and 10
let checkFunctionShort = (distance) => { return distance > 5 && distance < 10;};
//set checkRangeShort to be the filtered distance array
let checkRangeShort = distance.filter(checkFunctionShort);
//print to console
console.log(checkRangeShort);


//3a - creating the long map function to change the meters into inches
//Create a function to change all the elements of the array to inches from meters
let transformFunctionLong = function(distance) {
    //setting the transformation required to convert to inches
    return distance * 39.37;
};
//set transformLong to be the filtered array in inches
let transformLong = checkRangeLong.map(transformFunctionLong);
//print to console
console.log(transformLong);


//3b - creating the short map function to change the meters into inches
//Create a function to change all the elements of the array to inches from meters
let transformFunctionShort = (distance) => { return distance * 39.37};
//set transformShort to be the filtered array in inches
let transformShort = checkRangeShort.map(transformFunctionShort);
//printing the new array
console.log(transformShort);


//4a - creating the long reduce function to find the minimum distance
//Create a function to find the minimum element
let combineFunctionLong = function (acc, val) {
    //checking if acc smaller than val
    if (acc < val) {
        //return acc
        return acc;
    }
    //what to do if acc is greater than val
    else {
        //return val
        return val;
    }};
//set combineLong to be the minimum value of the array in inches that is in range 5-20
let combineLong = transformLong.reduce(combineFunctionLong);
//printing the minimum distance
console.log(combineLong);


//4b - creating the short reduce function to find the minimum distance
//Create a function to find the minimum element
let combineFunctionShort = (acc,val) => {
    //checking if acc smaller than val
    if (acc < val) {
        //return accs
        return acc;
    }
    //what to do if acc is not greater than val
    else {
        //return val
        return val;
    }};
//set combineShort to be the minimum value of the array in inches that is in range 5-20
let combineShort = transformShort.reduce(combineFunctionShort);
//printing the minimum distance in inches
console.log(combineShort);


//5 - Solving the problem in one line
console.log(distance.filter(checkFunctionLong).map(transformFunctionLong).reduce(combineFunctionLong));


//************************************************************************
//Task 2: Applying filter, map, and reduce function on arrays of objects
//************************************************************************

//declaring the coordinates
let coordinates = [{x:5, y:6}, {x:3, y:7}, {x:8, y:0}, {x:9, y:10}, {x:15, y:4}, {x:0, y:15}];

//create a function to remove the points that lie on the axes
let newCoordinates = function(coordinates) {
  //set the condition and return it
    return coordinates.x !== 0 && coordinates.y !== 0;
};
//print out the array with no points on the axes
console.log(coordinates.filter(newCoordinates));


//create a function to compute the distance of each point to the origin
let coordinateDistances = function(newCoordinates) {
    //computing the math to find the distances
    return Math.sqrt((Math.pow(newCoordinates.x, 2)) + Math.pow(newCoordinates.y, 2));
};
//print the distances between each point and the origin to the console
console.log(coordinates.filter(newCoordinates).map(coordinateDistances));


//create a function to find the maximum distance between the origin and the point
let maximumDistance = function (acc, val) {
    //checking if acc greater than val
    if (acc > val) {
        //return acc
        return acc;
    }
    //what to do if acc is not greater than val
    else {
        //return val
        return val;
    }};

//print the final result of the maximum distance using a chain of filter, map and reduce
//this uses the filter method to remove the coordinates on the axes
//it then uses the map method to compute all the distance
//finally it uses the reduce method to find the maximum distance
console.log("The maximum distance using the function method is " + coordinates.filter(newCoordinates).map(coordinateDistances).reduce(maximumDistance));


//Using arrow method
////create a function to remove the points that lie on the axes using arrow method
let newCoordinatesArrow = (coordinates) => {
    //set the condition and return it
    return coordinates.x !== 0 && coordinates.y !== 0;
};


//create a function to compute the distance of each point to the origin using arrow method
let coordinateDistancesArrow = (newCoordinates) => {
    //computing the math to find the distances
    return Math.sqrt((Math.pow(newCoordinates.x, 2)) + Math.pow(newCoordinates.y, 2));
};


//create a function to find the maximum distance between the origin and the point using arrow method
let maximumDistanceArrow = (acc, val) => {
    //checking if acc greater than val
    if (acc > val) {
        //return acc
        return acc;
    }
    //what to do if acc is not greater than val
    else {
        //return val
        return val;
    }};

//print the final result of the maximum distance using a chain of filter, map and reduce with the arrow functions
//this uses the filter method using arrow method to remove the coordinates on the axes
//it then uses the map method using arrow method to compute all the distance
//finally it uses the reduce method using arrow method to find the maximum distance
console.log("The maximum distance using the arrow method is " + coordinates.filter(newCoordinatesArrow).map(coordinateDistancesArrow).reduce(maximumDistanceArrow));