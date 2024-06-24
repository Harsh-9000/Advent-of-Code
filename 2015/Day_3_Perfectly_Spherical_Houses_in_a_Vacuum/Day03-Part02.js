const fs = require('fs');
const filePath = 'Day03.txt';

function countHouse(input) {
    let santaX = 0, santaY = 0, roboSantaX = 0, roboSantaY = 0;;
    const visitedHouses = new Set();
    visitedHouses.add(`${santaX},${santaY}`);

    for (let i = 0; i < input.length; i++) {
        if (i % 2 === 0) {
            if (input[i] === '^') {
                santaY += 1;
            } else if (input[i] === 'v') {
                santaY -= 1;
            } else if (input[i] === '>') {
                santaX += 1;
            } else if (input[i] === '<') {
                santaX -= 1;
            }

            visitedHouses.add(`${santaX},${santaY}`);
        } else if (i % 2 !== 0) {
            if (input[i] === '^') {
                roboSantaY += 1;
            } else if (input[i] === 'v') {
                roboSantaY -= 1;
            } else if (input[i] === '>') {
                roboSantaX += 1;
            } else if (input[i] === '<') {
                roboSantaX -= 1;
            }

            visitedHouses.add(`${roboSantaX},${roboSantaY}`);
        }
    }

    return visitedHouses.size;
}

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    console.log(countHouse(data));
});