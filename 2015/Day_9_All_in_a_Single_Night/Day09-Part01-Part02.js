const fs = require('fs');

function parseInput(data) {
    const distances = {};
    const lines = data.trim().split('\n');

    lines.forEach(line => {
        const [_, loc1, loc2, dist] = line.match(/(\w+) to (\w+) = (\d+)/);
        if (!distances[loc1]) distances[loc1] = {};
        if (!distances[loc2]) distances[loc2] = {};
        distances[loc1][loc2] = parseInt(dist, 10);
        distances[loc2][loc1] = parseInt(dist, 10);
    });

    return distances;
}

function permute(permutation) {
    const length = permutation.length;
    const result = [permutation.slice()];
    const c = new Array(length).fill(0);
    let i = 1, k, p;

    while (i < length) {
        if (c[i] < i) {
            k = i % 2 && c[i];
            p = permutation[i];
            permutation[i] = permutation[k];
            permutation[k] = p;
            ++c[i];
            i = 1;
            result.push(permutation.slice());
        } else {
            c[i] = 0;
            ++i;
        }
    }

    return result;
}

function calculateRouteDistance(route, distances) {
    let totalDistance = 0;
    for (let i = 0; i < route.length - 1; i++) {
        totalDistance += distances[route[i]][route[i + 1]];
    }
    return totalDistance;
}

function findShortestRoute(distances) {
    const locations = Object.keys(distances);
    const permutations = permute(locations);
    let shortestDistance = Infinity;

    permutations.forEach(permutation => {
        const distance = calculateRouteDistance(permutation, distances);
        if (distance < shortestDistance) {
            shortestDistance = distance;
        }
    });

    return shortestDistance;
}

function findLongestRoute(distances) {
    const locations = Object.keys(distances);
    const permutations = permute(locations);
    let longestDistance = 0;

    permutations.forEach(permutation => {
        const distance = calculateRouteDistance(permutation, distances);
        if (distance > longestDistance) {
            longestDistance = distance;
        }
    });

    return longestDistance;
}

function path(data) {
    const distances = parseInput(data);
    const shortestRouteDistance = findShortestRoute(distances);
    const longestRouteDistance = findLongestRoute(distances);
    console.log('The shortest route distance is:', shortestRouteDistance);
    console.log('The longest route distance is:', longestRouteDistance);
}

const filePath = 'Day09.txt';
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    path(data);
});
