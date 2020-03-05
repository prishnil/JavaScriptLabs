
const offsetMaker = function(offLen) {
    let space = "";
    offLen = offLen * 3;
    for (var x = offLen; x > 0; x --) {
        space = space + " ";
    }
    return space;
}

const triangleMaker = function triangleMake (offset, length) {

    let freeSpace = offsetMaker (offset --);
    let tri = "";
    for (var y = 0; y < length; y++) {
        let freeSpace = offsetMaker(offset --);
        tri = tri + freeSpace;
        for (var z = 0; z < ((y * 2) + 1); z++) {
            tri =  tri + " * ";
        }

        tri = tri + "\n";
    }

    return tri;
}

console.log (triangleMaker(20, 10));