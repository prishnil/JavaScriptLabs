//Task 1: Convert a number from decimal representation to binary representation

const binaryConversion = function(num) {
    //declaring variables
    let newNumber = num;
    let result = [0,0,0,0,0];
    let print = "";

    // a for loop to generate the binary representation of a decimal number
    for (let i = 0; i < result.length; i++) {
        //take the mod 2 of a number to ret 1 or 0
        result[i] = newNumber % 2;
        //subtract the result and divide by 2 to get a whole number instead of decimal
        newNumber = (newNumber - result[i]) / 2;
    }
    //reverse the array, because the binary values are backwards without doing so
    result = result.reverse();
// for loop to print the result as a string instead of an array
    for (let i = 0; i < result.length; i++) {
        print += result[i];
    }
    return print;
};

// solving the problem using recursion
const binaryConversion2 = function(number2) {
    //testing the condition of the number being 0, and if so it ill return a space
    if (number2 === 0) {
        return "";
    }
    else {
        //the calculation to generate the binary value, by calling back the function
        //the trunc function will drop the decimal values and make it an integer
        //diving the num2 by 2 will give the new number that goes in as the parameter to the function
        //the num2 % 2 will store either 1 or 0 to a string to get the binary value
        return binaryConversion2(Math.trunc(number2 / 2)) + (number2 % 2).toString();
    }
};
//for loop to iterate through the values of 1 - 20 in binary, using both the looping output and the recursion
for (let i = 1; i <= 20; i++) {
    console.log("Binary of " + i + ": Looping output: " + binaryConversion(i) + " Recursion Output: " + binaryConversion2(i));
}



//Task 2: Simple Parser
let parsedObject = function(jsonString) {
//set result object to be an array
    let objectResult = [];
//the if statement checks if there is a { at the start OR a } at the end
    if(jsonString.charAt(0) !== "{" || jsonString.charAt(jsonString.length - 1) !== "}") {
        console.log("Object is not well formatted");
        return null;
    }

    //jsonString = {x: 5, y: 6, z: 7}
    //allProperty = ["x: 5, y: 6, z: 7"]
    let allProperty = jsonString.slice(1, jsonString.length - 1);
    //testing what is inside allProperties
    console.log(allProperty);

    //splittedProperties = ["x:5", "y:6", "z:7"]
    let splittedProperty = allProperty.split(",");
    console.log(splittedProperty);
    //testing what is inside splittedProperty
    for(let property of splittedProperty) {
        console.log(property);
    }

    //iterate through splittedProperty and split by propertyName and propertyValue

    for(let property of splittedProperty) {
        //x: 5
        //indexOf return the index of the first : it comes across
        let splittedIndex = property.indexOf(":");
        //we passed {x: 5, y: 6, etc
        let propertyName = (property.slice(0, splittedIndex)).trim();
        //trim method is used to remove the white space
        let propertyValue = (property.slice(splittedIndex + 1, property.length)).trim();

        objectResult[propertyName] = propertyValue;

        console.log("property name is: " + propertyName + "-- property value is: " + propertyValue);

        if(propertyName in objectResult) {
            console.log("property name from inside the result object is: " + propertyName + ". The property value from the inside result object is: " + propertyValue);
        }
    }

    return objectResult;
};

let stringA = parsedObject("{x: 5,y: 6,z: 7}");

//we can use the string object to print whatever it contains
console.log("property x of string1 is: " + stringA.x);
console.log("property y of string1 is: " + stringA.y);
console.log("property z of string1 is: " + stringA.z);


//Task 3: Simple Parser
let findList = function(threshold,...lists) {
    //the threshold is a number value
    //...lists is an array of arrays

    //Need 2 loops
    //1st loop is to go through the lists and arrays in the outer array
    //2nd loop is to go through the elements of each array
    for (let list of lists) {
        //list is an array from lists (1st, 2nd, 3rd array and so on)
        let pass = false;
        //this will tell the loop to jump to the next array
        for (let element of list) {
            //element is each value in the list

            if(element < threshold) {
                //if the array doesn't meet the criteria - elements of the array are less than the thresholds
                pass = true;
                //Will tell the loop to jump to the next array
                break;
            }

        }
        if(!pass) {
            return list;
        }
    }
};

let listA = [2, 4, 6, 7];
let listB = [15, 20, 25, 30];
let listC = [34, 50, 65];

let foundList = findList(10, listA, listB, listC);
console.log(foundList);
//this will return the array with brackets
console.log(...foundList);
//this will just return the values in the array