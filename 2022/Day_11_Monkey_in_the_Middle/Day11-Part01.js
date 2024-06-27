class Monkey {
    constructor(startingItems, operation, testDivisor, trueTarget, falseTarget) {
        this.items = startingItems;
        this.operation = operation;
        this.testDivisor = testDivisor;
        this.trueTarget = trueTarget;
        this.falseTarget = falseTarget;
        this.inspections = 0;
    }

    inspectAndThrow(monkeys) {
        const newItems = [];
        this.items.forEach(item => {
            this.inspections++;
            let newItem = this.operation(item);
            newItem = Math.floor(newItem / 3);
            if (newItem % this.testDivisor === 0) {
                monkeys[this.trueTarget].items.push(newItem);
            } else {
                monkeys[this.falseTarget].items.push(newItem);
            }
        });
        this.items = newItems;
    }
}

function simulateRounds(monkeys, rounds) {
    for (let round = 0; round < rounds; round++) {
        monkeys.forEach(monkey => {
            monkey.inspectAndThrow(monkeys);
        });
    }
}

function getLevelOfMonkeyBusiness(monkeys) {
    const inspections = monkeys.map(monkey => monkey.inspections);
    inspections.sort((a, b) => b - a);
    return inspections[0] * inspections[1];
}

const monkeys = [
    new Monkey([98, 70, 75, 80, 84, 89, 55, 98], old => old * 2, 11, 1, 4),
    new Monkey([59], old => old * old, 19, 7, 3),
    new Monkey([77, 95, 54, 65, 89], old => old + 6, 7, 0, 5),
    new Monkey([71, 64, 75], old => old + 2, 17, 6, 2),
    new Monkey([74, 55, 87, 98], old => old * 11, 3, 1, 7),
    new Monkey([90, 98, 85, 52, 91, 60], old => old + 7, 5, 0, 4),
    new Monkey([99, 51], old => old + 1, 13, 5, 2),
    new Monkey([98, 94, 59, 76, 51, 65, 75], old => old + 5, 2, 3, 6)
];

simulateRounds(monkeys, 20);
const result = getLevelOfMonkeyBusiness(monkeys);
console.log('Level of monkey business:', result);
