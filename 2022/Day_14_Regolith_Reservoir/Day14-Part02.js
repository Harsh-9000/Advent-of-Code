const fs = require('fs');

// Function to parse the input data
function parseInput(data) {
    const lines = data.split('\n').filter(line => line.trim() !== '');
    const paths = lines.map(line => line.split(' -> ').map(point => point.split(',').map(Number)));
    return paths;
}

// Function to get the bounds of the cave and the floor level
function getBounds(paths) {
    let maxY = 0;
    for (const path of paths) {
        for (const [x, y] of path) {
            if (y > maxY) maxY = y;
        }
    }
    return maxY + 2;
}

// Function to simulate sand falling until the source is blocked
function sandUnits(data) {
    const paths = parseInput(data);
    const floorLevel = getBounds(paths);

    const cave = new Set();
    for (const path of paths) {
        for (let i = 0; i < path.length - 1; i++) {
            const [x1, y1] = path[i];
            const [x2, y2] = path[i + 1];
            if (x1 === x2) { // vertical line
                for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
                    cave.add(`${x1},${y}`);
                }
            } else { // horizontal line
                for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
                    cave.add(`${x},${y1}`);
                }
            }
        }
    }

    let sandCount = 0;
    let blocked = false;

    while (!blocked) {
        let x = 500;
        let y = 0;

        while (true) {
            if (y + 1 < floorLevel && !cave.has(`${x},${y + 1}`)) {
                y += 1; // fall down
            } else if (y + 1 < floorLevel && !cave.has(`${x - 1},${y + 1}`)) {
                x -= 1;
                y += 1; // fall down-left
            } else if (y + 1 < floorLevel && !cave.has(`${x + 1},${y + 1}`)) {
                x += 1;
                y += 1; // fall down-right
            } else {
                cave.add(`${x},${y}`);
                sandCount++;
                if (x === 500 && y === 0) {
                    blocked = true;
                }
                break;
            }
        }
    }

    console.log(sandCount);
}

const filePath = 'Day14.txt';
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    sandUnits(data);
});
