const fs = require('fs');

function possibleTriangle(sides) {
    sides = sides.map(Number).sort((a, b) => a - b);
    let side1 = sides[0];
    let side2 = sides[1];
    let side3 = sides[2];

    return (side1 + side2) > side3;
}

function part2(input) {
    const rows = input.trim().split("\r\n").map(row => row.trim().split(/\s+/).map(Number));
    let possibleTriangleCount = 0;

    for (let i = 0; i < rows.length; i += 3) {
        for (let j = 0; j < 3; j++) {
            const triangle = [
                rows[i][j],
                rows[i + 1][j],
                rows[i + 2][j]
            ];
            if (possibleTriangle(triangle)) {
                possibleTriangleCount++;
            }
        }
    }

    return possibleTriangleCount;
}

const filePath = 'Day3.txt';
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    console.log(part2(data));
});
