//***********
//Task 1:
//**********

//create an object called complexNumberPrototype
let complexNumberPrototype = {
    //initialize realValue property
    realValue: 0,
    //initialize imaginaryValue property
    imaginaryValue: 0,
    // create a print method to print the real and imaginary numbers using a this keyword
    printComplexNumber() {
        //outputs to the console the value of the real number + the imaginary number with an i attached to it
        return console.log(this.realValue + " + " + this.imaginaryValue + "i ");
    }
};

// a function that will create the complex number using the parameters of real and imaginary numbers called through the function call
function createComplexNumber (real, imaginary) {
//create a complexNumberPrototype object
    let complexObj = Object.create(complexNumberPrototype);
    //send the real number parameter to the realValue property in the complexNumberPrototype
    complexObj.realValue = real;
    //send the imaginary number parameter to the imaginaryValue property in the complexNumberPrototype
    complexObj.imaginaryValue = imaginary;
    //return the object with the given values based on the complexNumberPrototype
    return complexObj;
}

//create complexObject and set to createComplexNumber with a value of 4 for the real number component and a value of 6 for the imaginary number component
let complexObject = createComplexNumber (4, 6);
complexObject.printComplexNumber();

//Simple Constructor Function

function Constructor (r,i) {
    this.realValue = r;
    this.imaginaryValue = i;
    this.printComplexNumber = function() {
        console.log(this.realValue + " + " + this.imaginaryValue + "i ");
    };

    //***********
    //Task 2:
    //**********

    //addition method to add two complex numbers
    this.add = function(addedObject) {
        //add real and imaginary components
        return new Constructor(this.real + addedObject.real, this.imaginary + addedObject.imaginary);
    };
    //subtraction method to subtract two complex numbers
    this.subtract = function(subtractedObject) {
        //subtract real and imaginary components
        return new Constructor(this.real - subtractedObject.real, this.imaginary - subtractedObject.imaginary);
    };
    //multiplication method to multiply two numbers
    this.multiply = function(multipliedObject) {
        //use complex multiplication rules to multiply two complex numbers
        return new Constructor((this.real * multipliedObject.real) - (this.imaginary * multipliedObject.imaginary), (this.real * multipliedObject.imaginary) + (this.imaginary * multipliedObject.real));
    };
    //division method to divide two numbers
    this.divide = function(dividedObject) {
        //computing the denominator
        let den = (dividedObject.imaginary * dividedObject.imaginary) + (dividedObject.real * dividedObject.real);
        //computing real component
        let realComponent = ((this.real * dividedObject.real) + (this.imaginary * dividedObject.imaginary)) / den;
        //computing imaginary component
        let imaginaryComponent = ((dividedObject.real * this.imaginary) - (this.real * dividedObject.imaginary)) / den;
        return new Constructor(realComponent, imaginaryComponent);
    };
}

//new keyword to create another complex object and print it
let newComplexObject = new Constructor(4,6);
newComplexObject.printComplexNumber();

//calling the addition method using another object
let complexAddition = new Constructor (4,6);
let addOperator = newComplexObject.add(complexAddition);
addOperator.printComplexNumber();

//calling the subtraction method using another object
let complexSubtraction = new Constructor (4,6);
let subtractOperator = newComplexObject.subtract(complexSubtraction);
subtractOperator.printComplexNumber();

//calling the multiplication method using another object
let complexMultiplication = new Constructor (4,6);
let multiplyOperator = newComplexObject.multiply(complexMultiplication);
multiplyOperator.printComplexNumber();

//calling the division method using another object
let complexDivision = new Constructor (4,6);
let divideOperator = newComplexObject.divide(complexDivision);
divideOperator.printComplexNumber();