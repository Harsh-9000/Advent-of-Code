const fs = require('fs');

function parseInput(data) {
    const paths = data.split('\n').filter(line => line.length > 0).map(line =>
        line.split(' -> ').map(point => point.split(',').map(Number))
    );
    return paths;
}

function initializeCave(paths) {
    const maxX = Math.max(...paths.flat().map(([x, y]) => x)) + 1;
    const maxY = Math.max(...paths.flat().map(([x, y]) => y)) + 1;
    const cave = Array.from({ length: maxY }, () => Array(maxX).fill('.'));

    for (const path of paths) {
        for (let i = 0; i < path.length - 1; i++) {
            const [x1, y1] = path[i];
            const [x2, y2] = path[i + 1];
            if (x1 === x2) {
                for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
                    cave[y][x1] = '#';
                }
            } else if (y1 === y2) {
                for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
                    cave[y1][x] = '#';
                }
            }
        }
    }

    return cave;
}

function simulateSand(cave) {
    const sourceX = 500;
    const sourceY = 0;
    let sandCount = 0;
    const maxY = cave.length;

    while (true) {
        let x = sourceX;
        let y = sourceY;

        while (true) {
            if (y + 1 >= maxY || cave[y + 1][x] === '.') {
                y++;
            } else if (x > 0 && cave[y + 1][x - 1] === '.') {
                y++;
                x--;
            } else if (x + 1 < cave[0].length && cave[y + 1][x + 1] === '.') {
                y++;
                x++;
            } else {
                cave[y][x] = 'o';
                sandCount++;
                break;
            }

            if (y >= maxY) {
                return sandCount;
            }
        }
    }
}

function sandUnits(data) {
    const paths = parseInput(data);
    const cave = initializeCave(paths);
    const sandCount = simulateSand(cave);
    console.log('Units of sand that come to rest:', sandCount);
}

const filePath = 'Day14.txt';
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    sandUnits(data);
});
