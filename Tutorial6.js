//***************
//Task 1
//***************

class Shape {
    constructor(newX, newY) {
        //x and y are the private members of the shape class
        let x;
        let y;
        this.setX = function(x) {
            //to avoid assignment x coordinate to a negative number
            this.x = (x > 0) ? x : 0;
        };
        this.getX = function() {
            return this.x;
        };
        this.setY = function(y) {
            this.y = (y > 0) ? y : 0;
        };
        this.getY = function () {
            return this.y;
        };
        // pass the x and y coordinates to the private members using the methods
        this.setX(newX);
        this.setY(newY);
    }
    showPoint() {
        console.log(this.getX() + ", " + this.getY());
    }
    //the offset for the shapes
    createHorizontalOffset(offset) {
        if (offset === 'undefined') {
            offset = this.getX();
        }
        let offsetString = "";
        for(let i = 1; i <= offset; i++) {
            offsetString += " ";
        }
        return offsetString;
    }
    //the draw method for shapes
    draw () {
        let drawS = "";
        for (let i = 1; i <= this.getY(); i++) {
            drawS += "\n";
        }
        return drawS;
    }
}

//test the shape class
let s = new Shape(3, 6);
s.showPoint();

//if we want to change the values of x and y
s.setX(-5);
s.setY(8);

//test the values of x and y
console.log("The new x value is: " + s.getX() + ", and the new y value is: " + s.getY());

//check if we can access the private members
console.log(s.x);
console.log(s.y);

//***************
//Task 2
//***************

//subclass square that extends from shape
class Square extends Shape {
    constructor(squareX, squareY, length) {
        super(squareX, squareY);
        this.setLength = function (length) {
            this.length = (length > 0) ? length : 1; //avoid negative number
        };
        this.getLength = function () {
            return this.length;
        };
        this.setLength(length);
    }

    //draw method for the square
    draw() {
        let squ = super.draw();
        for (let a = 1; a <= this.getLength(); a++) {
            squ += "\n";
            squ += super.createHorizontalOffset(this.getX());
            for (let b = 1; b <= this.length; b++) {
                squ += "* ";
            }
        }
        console.log(squ);
    }
}

//subclass triangle that extends from shape
class Triangle extends Shape {
    constructor(triangleX, triangleY, height) {
        super(triangleX, triangleY);
        this.setHeight = function (height) {
            this.height = (height > 0) ? height : 1; // avoid negative number
        };
        this.getHeight = function () {
            return this.height;
        };
        this.setHeight(height);
    }

    //draw method for the triangle
    draw () {
        let tri = super.draw();
        for (let a = 1; a <= this.getHeight(); a++) {
            tri += "\n";
            tri += super.createHorizontalOffset(this.getX() + this.getHeight() - a);
            for (let b = 1; b <= (a * 2) - 1; b++) {
                tri += "*";
            }
        }
        console.log(tri);
    }
}

//***************
//Task 3
//***************

//create a square object and draw it
let theSquare = new Square(2,2,4);
theSquare.draw();

//create a triangle object and draw it
let theTriangle = new Triangle(4,4,8);
theTriangle.draw();