const drawSquare = function (squareOffset, Length){

    const createOffset = function(offset) {

        let space = " ";
        for (var i = 1; i <= offset; i++) {
            space += " ";
        }
        return space;
    };

    let square = " ";
    let offset = createOffset (squareOffset);

    for (var i = 1; i <= Length; i++) {
        line = "\n" + offset;

        for (var j = 1; j <= Length; j++) {
            line += " * ";
        }
        square += line;
    }
    return square;
};

console.log(drawSquare(10,5));