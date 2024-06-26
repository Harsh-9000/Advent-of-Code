const fs = require('fs');

function parseInput(data) {
    const happinessMap = {};
    const lines = data.trim().split('\n');
    lines.forEach(line => {
        const [person1, _, change, amount, __, ___, ____, _____, _______, ________, person2] = line.trim().split(' ');
        const happiness = (change === 'gain' ? 1 : -1) * parseInt(amount);
        const name1 = person1;
        const name2 = person2.slice(0, -1);

        if (!happinessMap[name1]) {
            happinessMap[name1] = {};
        }
        happinessMap[name1][name2] = happiness;
    });
    return happinessMap;
}

function getPermutations(arr) {
    if (arr.length === 0) return [[]];
    const firstElem = arr[0];
    const rest = arr.slice(1);
    const permsWithoutFirst = getPermutations(rest);
    const allPermutations = [];
    permsWithoutFirst.forEach(perm => {
        for (let i = 0; i <= perm.length; i++) {
            const permWithFirst = [...perm.slice(0, i), firstElem, ...perm.slice(i)];
            allPermutations.push(permWithFirst);
        }
    });
    return allPermutations;
}

function calculateHappiness(arrangement, happinessMap) {
    let totalHappiness = 0;
    for (let i = 0; i < arrangement.length; i++) {
        const person1 = arrangement[i];
        const person2 = arrangement[(i + 1) % arrangement.length];
        totalHappiness += (happinessMap[person1][person2] || 0) + (happinessMap[person2][person1] || 0);
    }
    return totalHappiness;
}

function findOptimalHappiness(happinessMap) {
    const guests = Object.keys(happinessMap);
    const permutations = getPermutations(guests);
    let maxHappiness = -Infinity;
    permutations.forEach(arrangement => {
        const happiness = calculateHappiness(arrangement, happinessMap);
        if (happiness > maxHappiness) {
            maxHappiness = happiness;
        }
    });
    return maxHappiness;
}

const filePath = 'Day13.txt';
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    const happinessMap = parseInput(data);
    const optimalHappiness = findOptimalHappiness(happinessMap);
    console.log('Optimal Happiness:', optimalHappiness);
});
