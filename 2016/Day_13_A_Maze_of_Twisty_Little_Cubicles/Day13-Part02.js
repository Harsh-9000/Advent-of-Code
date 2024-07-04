function isOpenSpace(x, y, favoriteNumber) {
    const value = x * x + 3 * x + 2 * x * y + y + y * y + favoriteNumber;
    const binaryRepresentation = value.toString(2);
    const numberOfOnes = binaryRepresentation.split('1').length - 1;
    return numberOfOnes % 2 === 0;
}

function bfsLocationsWithinSteps(start, stepLimit, favoriteNumber) {
    const queue = [[...start, 0]]; // [x, y, steps]
    const visited = new Set();
    visited.add(start.toString());

    while (queue.length > 0) {
        const [x, y, steps] = queue.shift();

        if (steps >= stepLimit) {
            continue;
        }

        const neighbors = [
            [x + 1, y],
            [x - 1, y],
            [x, y + 1],
            [x, y - 1]
        ];

        for (const [nx, ny] of neighbors) {
            if (nx >= 0 && ny >= 0 && isOpenSpace(nx, ny, favoriteNumber) && !visited.has([nx, ny].toString())) {
                queue.push([nx, ny, steps + 1]);
                visited.add([nx, ny].toString());
            }
        }
    }

    return visited.size;
}

const favoriteNumber = 1350;
const start = [1, 1];
const stepLimit = 50;

console.log(bfsLocationsWithinSteps(start, stepLimit, favoriteNumber));
