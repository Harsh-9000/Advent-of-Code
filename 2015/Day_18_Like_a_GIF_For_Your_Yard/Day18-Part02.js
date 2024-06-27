const fs = require('fs');

// ^ means the light will turn on next state, but is off in current state.
// v means the light will turn off next state, but is on in current state.

function getNeighbors(grid, x, y) {
    let neighbors = [];
    let directions = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1], [0, 1],
        [1, -1], [1, 0], [1, 1]
    ];

    for (let [dx, dy] of directions) {
        let nx = x + dx;
        let ny = y + dy;
        if (nx >= 0 && nx < grid.length && ny >= 0 && ny < grid[0].length) {
            neighbors.push(grid[nx][ny]);
        }
    }

    return neighbors;
}

function countOccurrences(array, value) {
    return array.filter(element => element === value).length;
}

function updateLightState(grid, x, y) {
    let neighbors = getNeighbors(grid, x, y);
    let countOn = countOccurrences(neighbors, "#") + countOccurrences(neighbors, "v");
    if (grid[x][y] === "#" || grid[x][y] === "v") {
        if (countOn !== 2 && countOn !== 3) {
            grid[x][y] = "v";
        }
    } else if (grid[x][y] === "." || grid[x][y] === "^") {
        if (countOn === 3) {
            grid[x][y] = "^";
        }
    }
}

function lightsON(input) {
    let grid = input.trim().split("\r\n").map(line => line.split(''));
    let steps = 100;
    let gridSize = 100;

    while (steps--) {
        for (let x = 0; x < gridSize; x++) {
            for (let y = 0; y < gridSize; y++) {
                if ((x === 0 && y === 0) || (x === 0 && y === gridSize - 1) || (x === gridSize - 1 && y === 0) || (x === gridSize - 1 && y === gridSize - 1)) {
                    grid[x][y] = "#";
                } else {
                    updateLightState(grid, x, y);
                }
            }
        }

        for (let x = 0; x < gridSize; x++) {
            for (let y = 0; y < gridSize; y++) {
                if (grid[x][y] === "^") {
                    grid[x][y] = "#";
                } else if (grid[x][y] === "v") {
                    grid[x][y] = ".";
                }
            }
        }
    }

    let countOn = 0;
    for (let x = 0; x < gridSize; x++) {
        for (let y = 0; y < gridSize; y++) {
            if (grid[x][y] === "#") {
                countOn++;
            }
        }
    }

    // return grid.map(row => row.join('')).join('\r\n')
    return countOn;
}


const filePath = 'Day18.txt';
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    console.log(lightsON(data));
});
