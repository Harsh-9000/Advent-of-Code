const fs = require('fs');
const filePath = 'Day03.txt';

function countHouse(input) {
    let x = 0, y = 0;
    const visitedHouses = new Set();
    visitedHouses.add(`${x},${y}`);

    for (let move of input) {
        if (move === '^') {
            y += 1;
        } else if (move === 'v') {
            y -= 1;
        } else if (move === '>') {
            x += 1;
        } else if (move === '<') {
            x -= 1;
        }

        visitedHouses.add(`${x},${y}`);
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