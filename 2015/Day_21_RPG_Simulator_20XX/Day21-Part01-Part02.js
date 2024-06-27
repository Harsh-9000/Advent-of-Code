const items = {
    weapons: [
        { name: "Dagger", cost: 8, damage: 4, armor: 0 },
        { name: "Shortsword", cost: 10, damage: 5, armor: 0 },
        { name: "Warhammer", cost: 25, damage: 6, armor: 0 },
        { name: "Longsword", cost: 40, damage: 7, armor: 0 },
        { name: "Greataxe", cost: 74, damage: 8, armor: 0 }
    ],
    armor: [
        { name: "None", cost: 0, damage: 0, armor: 0 },
        { name: "Leather", cost: 13, damage: 0, armor: 1 },
        { name: "Chainmail", cost: 31, damage: 0, armor: 2 },
        { name: "Splintmail", cost: 53, damage: 0, armor: 3 },
        { name: "Bandedmail", cost: 75, damage: 0, armor: 4 },
        { name: "Platemail", cost: 102, damage: 0, armor: 5 }
    ],
    rings: [
        { name: "None", cost: 0, damage: 0, armor: 0 },
        { name: "Damage +1", cost: 25, damage: 1, armor: 0 },
        { name: "Damage +2", cost: 50, damage: 2, armor: 0 },
        { name: "Damage +3", cost: 100, damage: 3, armor: 0 },
        { name: "Defense +1", cost: 20, damage: 0, armor: 1 },
        { name: "Defense +2", cost: 40, damage: 0, armor: 2 },
        { name: "Defense +3", cost: 80, damage: 0, armor: 3 }
    ]
};

const bossStats = {
    hitPoints: 100,
    damage: 8,
    armor: 2
};

const playerBaseStats = {
    hitPoints: 100,
    damage: 0,
    armor: 0
};

function simulateFight(player, boss) {
    const playerDamage = Math.max(1, player.damage - boss.armor);
    const bossDamage = Math.max(1, boss.damage - player.armor);

    const playerTurnsToKill = Math.ceil(boss.hitPoints / playerDamage);
    const bossTurnsToKill = Math.ceil(player.hitPoints / bossDamage);

    return playerTurnsToKill <= bossTurnsToKill;
}

function getAllCombinations(items) {
    const combinations = [];

    for (const weapon of items.weapons) {
        for (const armor of items.armor) {
            for (let i = 0; i < items.rings.length; i++) {
                for (let j = i; j < items.rings.length; j++) {
                    const ring1 = items.rings[i];
                    const ring2 = items.rings[j];
                    if (i === j) {
                        combinations.push([weapon, armor, ring1]);
                    } else {
                        combinations.push([weapon, armor, ring1, ring2]);
                    }
                }
            }
        }
    }

    return combinations;
}

function getMinimumGoldToWin(playerBaseStats, bossStats, items) {
    const combinations = getAllCombinations(items);
    let minimumGold = Infinity;

    for (const combination of combinations) {
        const player = { ...playerBaseStats };

        let totalCost = 0;
        for (const item of combination) {
            player.damage += item.damage;
            player.armor += item.armor;
            totalCost += item.cost;
        }

        if (simulateFight(player, bossStats)) {
            minimumGold = Math.min(minimumGold, totalCost);
        }
    }

    return minimumGold;
}

function getMaximumGoldToLose(playerBaseStats, bossStats, items) {
    const combinations = getAllCombinations(items);
    let maximumGold = 0;

    for (const combination of combinations) {
        const player = { ...playerBaseStats };

        let totalCost = 0;
        for (const item of combination) {
            player.damage += item.damage;
            player.armor += item.armor;
            totalCost += item.cost;
        }

        if (!simulateFight(player, bossStats)) {
            maximumGold = Math.max(maximumGold, totalCost);
        }
    }

    return maximumGold;
}

const minimumGold = getMinimumGoldToWin(playerBaseStats, bossStats, items);
console.log("The least amount of gold you can spend and still win the fight is:", minimumGold);

const maximumGold = getMaximumGoldToLose(playerBaseStats, bossStats, items);
console.log("The most amount of gold you can spend and still lose the fight is:", maximumGold);
