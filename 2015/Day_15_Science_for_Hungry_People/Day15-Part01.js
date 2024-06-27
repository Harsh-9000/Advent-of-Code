const fs = require('fs');

class Ingredient {
    constructor(name, capacity, durability, flavor, texture, calories) {
        this.name = name;
        this.capacity = capacity;
        this.durability = durability;
        this.flavor = flavor;
        this.texture = texture;
        this.calories = calories;
    }
}

function parseInput(input) {
    const ingredients = [];
    const lines = input.trim().split('\n');
    lines.forEach(line => {
        const parts = line.split(' ');
        const name = parts[0].slice(0, -1);
        const capacity = parseInt(parts[2]);
        const durability = parseInt(parts[4]);
        const flavor = parseInt(parts[6]);
        const texture = parseInt(parts[8]);
        const calories = parseInt(parts[10]);
        ingredients.push(new Ingredient(name, capacity, durability, flavor, texture, calories));
    });
    
    return ingredients;
}

function calculateScore(ingredients, amounts) {
    let totalCapacity = 0;
    let totalDurability = 0;
    let totalFlavor = 0;
    let totalTexture = 0;

    for (let i = 0; i < ingredients.length; i++) {
        totalCapacity += ingredients[i].capacity * amounts[i];
        totalDurability += ingredients[i].durability * amounts[i];
        totalFlavor += ingredients[i].flavor * amounts[i];
        totalTexture += ingredients[i].texture * amounts[i];
    }

    totalCapacity = Math.max(totalCapacity, 0);
    totalDurability = Math.max(totalDurability, 0);
    totalFlavor = Math.max(totalFlavor, 0);
    totalTexture = Math.max(totalTexture, 0);

    return totalCapacity * totalDurability * totalFlavor * totalTexture;
}

function* generateCombinations(n, k) {
    if (k === 1) {
        yield [n];
    } else {
        for (let i = 0; i <= n; i++) {
            for (const combination of generateCombinations(n - i, k - 1)) {
                yield [i, ...combination];
            }
        }
    }
}

function findBestScore(ingredients) {
    const totalAmount = 100;
    let bestScore = 0;

    for (const amounts of generateCombinations(totalAmount, ingredients.length)) {
        const score = calculateScore(ingredients, amounts);
        if (score > bestScore) {
            bestScore = score;
        }
    }

    return bestScore;
}

const filePath = 'Day15.txt';
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    const ingredients = parseInput(data);
    const bestScore = findBestScore(ingredients);
    console.log('Best score:', bestScore);
});
