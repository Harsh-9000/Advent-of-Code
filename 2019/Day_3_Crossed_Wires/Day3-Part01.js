const fs = require('fs');

const input = fs.readFileSync('Day3.txt', 'utf8').trim().split('\r\n');

const wire1Path = input[0].split(',');
const wire2Path = input[1].split(',');

function traceWirePath(wirePath) {
    const points = new Set();
    let x = 0, y = 0;

    wirePath.forEach(segment => {
        const direction = segment[0];
        const length = parseInt(segment.slice(1));

        for (let i = 0; i < length; i++) {
            switch (direction) {
                case 'R': x++; break;
                case 'L': x--; break;
                case 'U': y++; break;
                case 'D': y--; break;
            }
            points.add(`${x},${y}`);
        }
    });

    return points;
}

const wire1Points = traceWirePath(wire1Path);
const wire2Points = traceWirePath(wire2Path);

const intersections = [...wire1Points].filter(point => wire2Points.has(point));

function calculateManhattanDistance(point) {
    const [x, y] = point.split(',').map(Number);
    return Math.abs(x) + Math.abs(y);
}

const closestDistance = Math.min(...intersections.map(calculateManhattanDistance));

console.log(closestDistance);
