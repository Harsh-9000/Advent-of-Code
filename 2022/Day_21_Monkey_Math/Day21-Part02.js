const fs = require("fs");
const data = fs.readFileSync("Day21.txt", "utf-8");

const input = data.split("\r\n").map(s => s.split(": "));

const monkeys = new Map();

for (const [name, task] of input) {
    monkeys.set(name, task);
}

const [leftMonkey, , rightMonkey] = monkeys.get("root").split(" ");

if (isConnected(leftMonkey)) {
    console.log(humanNumber(leftMonkey, monkeyNumber(rightMonkey)));
} else {
    console.log(humanNumber(rightMonkey, monkeyNumber(leftMonkey)));
}

function isConnected(monkey) {
    const [m1, op, m2] = monkeys.get(monkey).split(" ");
    if (!op) return false;
    if (m1 === "humn" || m2 === "humn") return true;
    return isConnected(m1) || isConnected(m2);
}

function humanNumber(monkey, value) {
    let [left, op, right] = monkeys.get(monkey).split(" ");

    if (left === "humn" || right === "humn") {
        if (op === "+") return value - monkeyNumber(left === "humn" ? right : left);
        if (op === "*") return value / monkeyNumber(left === "humn" ? right : left);
        if (op === "-") return left === "humn" ? value + monkeyNumber(right) : monkeyNumber(left) - value;
        if (op === "/") return left === "humn" ? value * monkeyNumber(right) : monkeyNumber(left) / value;
    }

    const isLeftConnected = isConnected(left);
    if (!isLeftConnected) [left, right] = [right, left];

    if (op === "+") return humanNumber(left, value - monkeyNumber(right));
    if (op === "*") return humanNumber(left, value / monkeyNumber(right));
    if (op === "-") return humanNumber(left, isLeftConnected ? value + monkeyNumber(right) : monkeyNumber(right) - value);
    if (op === "/") return humanNumber(left, isLeftConnected ? value * monkeyNumber(right) : monkeyNumber(right) / value);
}

function monkeyNumber(monkey) {
    const [m1, op, m2] = monkeys.get(monkey).split(" ");
    if (!op) return Number(m1);
    const num1 = monkeyNumber(m1);
    const num2 = monkeyNumber(m2);
    switch (op) {
        case "+": return num1 + num2;
        case "-": return num1 - num2;
        case "*": return num1 * num2;
        case "/": return num1 / num2;
    }
}
