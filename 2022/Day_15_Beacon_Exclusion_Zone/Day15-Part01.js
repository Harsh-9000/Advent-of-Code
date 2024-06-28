const fs = require('fs');

function manhattanDistance(x1, y1, x2, y2) {
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

function beaconPositions(data) {
    const sensors = [];
    const beacons = new Set();

    const lines = data.trim().split('\n');
    for (const line of lines) {
        const [sensorPart, beaconPart] = line.split(':');
        const [sx, sy] = sensorPart.match(/x=(-?\d+), y=(-?\d+)/).slice(1, 3).map(Number);
        const [bx, by] = beaconPart.match(/x=(-?\d+), y=(-?\d+)/).slice(1, 3).map(Number);
        sensors.push({ sx, sy, bx, by, distance: manhattanDistance(sx, sy, bx, by) });
        beacons.add(`${bx},${by}`);
    }

    const row = 2000000;
    const forbiddenPositions = new Set();

    for (const { sx, sy, distance } of sensors) {
        const verticalDistance = Math.abs(sy - row);
        const remainingDistance = distance - verticalDistance;
        if (remainingDistance >= 0) {
            for (let x = sx - remainingDistance; x <= sx + remainingDistance; x++) {
                forbiddenPositions.add(`${x},${row}`);
            }
        }
    }

    // Remove the positions where there is actually a beacon in the forbidden positions
    for (const beacon of beacons) {
        const [bx, by] = beacon.split(',').map(Number);
        if (by === row) {
            forbiddenPositions.delete(`${bx},${by}`);
        }
    }

    console.log(`Number of positions where a beacon cannot be present in row ${row}: ${forbiddenPositions.size}`);
}

const filePath = 'Day15.txt';
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    beaconPositions(data);
});
