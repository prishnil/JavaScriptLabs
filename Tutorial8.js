//***************
//Task 1
//***************

class Shape {
    constructor(newA, newB) {
        //a and b are private members of shape class
        let a;
        let b;
        //setter method for a
        this.setA = function(a) {
            //avoid negative number assignment to a coordinate
            this.a = (a > 0) ? a : 0;
        };
        //getter method for a
        this.getA = function() {
            return this.a;
        };
        //setter method for b
        this.setB = function(b) {
            this.b = (b > 0) ? b : 0;
        };
        //getter method for b
        this.getB = function () {
            return this.b;
        };
        //pass a and b to private members using the setter methods
        this.setA(newA);
        this.setB(newB);
    }
    showPoint() {
        console.log(this.getA() + ", " + this.getB());
    }
    //method to create horizontal offset
    createHorizontalOff_set(off_set) {
        //if undefined
        if (off_set === 'undefined') {
            off_set = this.getA();
        }
        let off_setString = "";
        //for loop to create off set
        for(let i = 1; i <= off_set; i++) {
            off_setString += " ";
        }
        return off_setString;
    }
    //the draw method
    draw () {
        let drawString = "";
        //for loop that creates vertical off_set
        for (let i = 1; i <= this.getB(); i++) {
            drawString += "\n";
        }
        return drawString;
    }
    //method that is used to display the info of the shape
    displayInfo() {
        return "Shape with main points: " + this.getA() + ", " + this.getB();
    }
}

//subclass called Square
class Square extends Shape {
    //constructor method that also calls the constructor for the shape class using keyword super
    constructor(a1, b1, length) {
        super(a1, b1);
        this.setLength = function (length) {
            //condition for length to be greater than 0
            // if not --- assign a value of 1
            this.length = (length > 0) ? length : 1;
        };
        //getter method for square class
        this.getLength = function () {
            return this.length;
        };
        //setter method for square class
        this.setLength(length);
    }
    //override the draw method from the shape class
    draw () {
        let square_shape = super.draw();
        //for loop that draws the square
        // uses the horizontal offset method from the super class
        for (let i = 1; i <= this.getLength(); i++) {
            square_shape += "\n";
            square_shape += super.createHorizontalOff_set(this.getA());
            for (let j = 1; j <= this.length; j++) {
                square_shape += "* ";
            }
        }
        console.log(square_shape);
    }
    //override the displayInfo method for square subclass
    displayInfo() {
        return "Square " + super.displayInfo();
    }
}

//csubclass called triangle
class Triangle extends Shape {
    //constructor method that also calls the constructor for the shape class using super keyword
    constructor(a2, b2, height) {
        super(a2, b2);
        this.setHeight = function (height) {
            //condition for height to be greater than 0
            // if not --- assign a value of 1
            this.height = (height > 0) ? height : 1;
        };
        //getter method for triangle class
        this.getHeight = function () {
            return this.height;
        };
        //setter method for triangle class
        this.setHeight(height);
    }
    //override the draw method from the shape class
    draw () {
        let triangle_shape = super.draw();
        //for loop that draws the triangle
        // uses the horizontal offset method from the super class
        for (let i = 1; i <= this.getHeight(); i++) {
            triangle_shape += "\n";
            triangle_shape += super.createHorizontalOff_set(this.getA() + this.getHeight() - i);
            for (let j = 1; j <= (i * 2) - 1; j++) {
                triangle_shape += "*";
            }
        }
        console.log(triangle_shape);
    }
    //override the displayInfo method for triangle subclass
    displayInfo() {
        return "Triangle " + super.displayInfo();
    }
}


//***************
//Task 2
//***************

//create an array called plainObjects
let plain_Objects = [
    {a:5,b:6},
    {type:'Square', a:7, b:10, length:10},
    {a:8, b:9, type:'Triangle', height:50},
];

//create a function called plainObjectsToShapes
// it will create a new shape based on the properties from plainObjects and is then activated in the switch statement,
//finally, it is pushed into the array called arrayOfShapes
let plain_Objects_To_Shapes = function(data) {
    let array_Of_Shapes = [];
    let s;
    for(let d of data) {
        switch(d.type) {
            case undefined:
                s = new Shape(d.a, d.b);
                break;
            case "Square":
                s = new Square(d.a, d.b, d.length);
                break;
            case "Triangle":
                s = new Triangle(d.a, d.b, d.height);
        }
        array_Of_Shapes.push(s);
    }
    //after each iteration, the shape "s" will be pushed into the list arrayOfShapes
    return array_Of_Shapes;
};

//create result list of shapes, by passing the array plainObjects into the function plainObjectsToShapes
let result = plain_Objects_To_Shapes(plain_Objects);

//display the info in the result array using the displayInfo method
for(let r of result) {
    console.log(r.displayInfo());
}


//***************
//Task 3
//***************

//create result list of shapes using map method instead of plainObjectsToShapes function
result = plain_Objects.map(object => (object.type === undefined) ? new Shape(object.a, object.b):
    (object.type === 'Square') ? new Square(object.a, object.y, object.length): new Triangle(object.a, object.b, object.height));

//display the info in the result array using the displayInfo method
for(let r of result) {
    console.log(r.displayInfo());
}

//create shape object and draw it using draw method
let final_Shape = new Shape(5,10);
final_Shape.draw();

//create square object and draw it using draw method
let final_Square = new Square(10, 20, 30);
final_Square.draw();

//create triangle object and draw it using draw method
let final_Triangle = new Triangle(20,30,20);
final_Triangle.draw();