//Task 1

(function () {
    //array of grades
    let arrayOfGrades = [22,34,55,98,30,44];
    //function that calculates the average grade
    function average() {
        let n = 0, average;
        for (let i = 0; i < arrayOfGrades.length; i++) {
            n += arrayOfGrades[i];
        }
        average = n / arrayOfGrades.length;
        return average;
    }
    //function that finds the maximum grade
    function maximum() {
        let temp = arrayOfGrades[0], maximum;
        for (let i = 0; i < arrayOfGrades.length - 1; i++) {
            temp = (temp > arrayOfGrades[i +1]) ? temp : temp = arrayOfGrades[i + 1];
        }
        maximum = temp;
        return maximum;
    }
    //using console.log statements of both functions that will print when the IIFE is called
    console.log(average());
    console.log(maximum());
})();




//Task 2

//create a new object, gradeObject and assign what returns from the IIFE to it
let gradeObject = (function () {
    //an array of grades
    let arrayOfGrades = [22,34,55,98,30,44];
    //function that calculates the average grade
    function average() {
        let n = 0;
        let average;
        for (let i = 0; i < arrayOfGrades.length; i++) {
            n += arrayOfGrades[i];
        }
        average = n / arrayOfGrades.length;
        return average;
    }
    //function that finds the maximum grade
    function maximum() {
        let temp = arrayOfGrades[0];
        let maximum;
        for (let i = 0; i < arrayOfGrades.length - 1; i++) {
            temp = (temp > arrayOfGrades[i +1]) ? temp : temp = arrayOfGrades[i + 1];
        }
        maximum = temp;
        return maximum;
    }
    //create an object that will have grade properties
    let properties;
    properties = {
        //function referring to the average function
        average: average(),
        //function referring to the maximum function
        maximum: maximum(),
    };
    //return the object, properties whenever the IIFE is called
    return properties;
})();
//calling the maximum and average functions from outside the IIFE, and printing the output using console.log to see the results
console.log(gradeObject.average);
console.log(gradeObject.maximum);




//Task 3

//create another object, gradeObjWithMutators and assign what returns from the IIFE to it
let gradeObjWithMutators = (function () {
    //an array of grades
    let arrayOfGrades = [22,34,55,98,30,44];
    //function that calculates the average grade
    function average() {
        let n = 0;
        let average;
        for (let i = 0; i < arrayOfGrades.length; i++) {
            n += arrayOfGrades[i];
        }
        average = n / arrayOfGrades.length;
        return average;
    }
    //function that finds the maximum grade
    function maximum() {
        let temp = arrayOfGrades[0];
        let maximum;
        for (let i = 0; i < arrayOfGrades.length - 1; i++) {
            temp = (temp > arrayOfGrades[i +1]) ? temp : temp = arrayOfGrades[i + 1];
        }
        maximum = temp;
        return maximum;
    }
    //create an object that will have grade properties
    let properties;
    properties = {
        //function property that refers to the average function
        average: average(),
        //function property that refers to the maximum function
        maximum: maximum(),
        //getter method that returns the arrayOfGrades array
        getArrayOfGrades: () => {
            return arrayOfGrades
        },
        //setter method that can set the arrayOfGrades array
        setArrayOfGrades: (gA) => {
            arrayOfGrades = gA;
        }
    };
    //return the object, properties whenever the IIFE is called
    return properties;
})();

//calling the getter method and printing the return using console.log
console.log(gradeObjWithMutators.getArrayOfGrades());
//calling the setter method and sending it a new array of numbers
gradeObjWithMutators.setArrayOfGrades([45,56,72,84,66,99]);
//calling the getter method again to see the effect of calling the setter
