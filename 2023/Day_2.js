const fs = require('fs');

const filePath = "Day_2.txt";

const bagInput = {
    red: 12,
    green: 13,
    blue: 14
}

const ansMap = new Map();

let ans = 0;

try {
    const data = fs.readFileSync(filePath, 'utf-8');
    const lines = data.split('\n');

    lines.forEach(line => {
        const gameID = line.split(':')[0].split(' ')[1];
        const objects = line.split(':')[1].split('; ');

        objects.forEach(object => {
            sets = object.split(', ');
            const resultObject = {};

            sets.forEach(set => {
                const trimSet = set.trim();
                const [quantity, color] = trimSet.split(' ');
                resultObject[color] = parseInt(quantity, 10);
            })

            if (resultObject.red > bagInput.red || resultObject.green > bagInput.green || resultObject.blue > bagInput.blue) {
                addToMap(parseInt(gameID, 10), false);
            } else {
                addToMap(parseInt(gameID, 10), true);
            }
        })
    })

    ansMap.forEach((values, key) => {
        if (!values.includes(false)) {
            ans += key;
        }
    });

    console.log(ans);
} catch (error) {
    console.log(error);
}

function addToMap(key, value) {
    if (!ansMap.has(key)) {
        ansMap.set(key, [value])
    } else {
        ansMap.get(key).push(value);
    }
}