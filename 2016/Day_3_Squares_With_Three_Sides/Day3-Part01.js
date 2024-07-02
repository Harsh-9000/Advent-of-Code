const fs = require('fs');

function possibleTriangle(sides) {
    sides = sides.map(Number).sort((a, b) => a - b);
    let side1 = sides[0];
    let side2 = sides[1];
    let side3 = sides[2];

    return (side1 + side2) > side3;
}

function part1(input) {
    const triangles = input.split("\r\n");
    let possibleTriangleCount = 0;

    triangles.forEach(triangle => {
        const sides = triangle.replace(/\s+/g, ' ').trim().split(" ");
        if (possibleTriangle(sides)) {
            possibleTriangleCount++;
        }
    });

    return possibleTriangleCount;
}

const filePath = 'Day3.txt';
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    console.log(part1(data));
});
