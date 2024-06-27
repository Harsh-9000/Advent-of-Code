const fs = require('fs');

// Function to calculate the quantum entanglement of a group
function quantumEntanglement(group) {
    return group.reduce((product, weight) => product * weight, 1);
}

// Function to find all combinations of array elements that sum to target
function findCombinations(arr, target) {
    const results = [];

    function findCombination(start, combo, sum) {
        if (sum === target) {
            results.push([...combo]);
            return;
        }
        if (sum > target) return;

        for (let i = start; i < arr.length; i++) {
            combo.push(arr[i]);
            findCombination(i + 1, combo, sum + arr[i]);
            combo.pop();
        }
    }

    findCombination(0, [], 0);
    return results;
}

// Main function to find the ideal configuration
function findIdealConfiguration(weights) {
    const totalWeight = weights.reduce((a, b) => a + b, 0);
    const numOfGrps = 4 // 3 for Part 1
    const targetWeight = totalWeight / numOfGrps;

    if (totalWeight % numOfGrps !== 0) {
        throw new Error(`The total weight is not divisible by ${numOfGrps}.`);
    }

    const combinations = findCombinations(weights, targetWeight);

    // Sort combinations first by length and then by quantum entanglement
    combinations.sort((a, b) => {
        if (a.length === b.length) {
            return quantumEntanglement(a) - quantumEntanglement(b);
        }
        return a.length - b.length;
    });

    for (let i = 0; i < combinations.length; i++) {
        const firstGroup = combinations[i];
        const remainingWeights = weights.filter(weight => !firstGroup.includes(weight));

        const remainingCombinations = findCombinations(remainingWeights, targetWeight);
        if (remainingCombinations.length > 0) {
            return quantumEntanglement(firstGroup);
        }
    }

    throw new Error("No valid configuration found.");
}

// Read input file and process data
const filePath = 'Day24.txt';
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    const weights = data.trim().split('\n').map(Number);
    try {
        const result = findIdealConfiguration(weights);
        console.log('Quantum entanglement of the ideal configuration:', result);
    } catch (error) {
        console.error(error.message);
    }
});
