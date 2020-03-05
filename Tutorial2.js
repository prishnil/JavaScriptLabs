//Task 1: Reassigning Functions to Different Binding Names

let printHello = function(name) {
    let hello = "Hello ";
    return (hello + name);
};
console.log(printHello("Prishni"));

let printGreeting = printHello;
console.log(printGreeting("Prishni"));

//Task 2: Passing Functions as Arguments to Other Functions

let printVertical = function(word) {
    for (let i = 0; i < word.length; i++) {
    console.log (word[i]);
 };
};
printVertical('Prishni');

let printWithSpaces = function(word) {
   let finalWord = "";
   for (let i = 0; i < word.length; i++) {
       finalWord += (word[i] + " ");
   };
    console.log(finalWord);
};
printWithSpaces("Prishni");

let printInReverse = function (word) {
    let finalWord = "";
    for (let i = word.length - 1; i >= 0 ; i--) {
       finalWord += (word[i]);
    };
        console.log (finalWord);
};
printInReverse("Prishni");

let genericPrinter = function (number,word) {
    switch (number) {
        case 1: printVertical(word);
        break;
        case 2: printWithSpaces(word);
        break;
        case 3: printInReverse(word);
        break;
        default:
            break;
    }
};
genericPrinter(1, "Prishni");
genericPrinter(2, "Prishni");
genericPrinter(3, "Prishni");

//Task 3: Returning Functions From Other Function;

let calendarName = function (letter) {
    let monthName = function (monthNum) {
        let monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let nameOfTheMonth = monthArray[monthNum];
        return nameOfTheMonth;
    };

    let dayName = function (dayNum) {
        let dayArray = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        let nameOfTheDay = dayArray[dayNum];
        return nameOfTheDay;
    };

    if (letter === "m") {
        return monthName;
    };
    if (letter === "d") {
       return  dayName;
    };
    };

let findNameOfTheDay = calendarName ('d');
console.log (findNameOfTheDay (2));
let findNameOfTheMonth = calendarName ('m');
console.log (findNameOfTheMonth(8));

//Task 4: Closures
let powerOf = function(power) {
    let raiseToPower = function (base) {
        let result = 1;
        for (let i = 1; i <= power; i++) {
            result *= base;
        };
        return result;
    };
    return raiseToPower;
};

let powerOfTwo = powerOf (2);
console.log(powerOfTwo(5));
let powerOfThree = powerOf (3);
console.log(powerOfThree(5));
let powerOfFour = powerOf(4);
console.log(powerOfFour(5));

