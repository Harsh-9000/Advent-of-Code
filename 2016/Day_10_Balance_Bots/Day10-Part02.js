const fs = require('fs');

function findProductOfOutputs(input) {
    let bots = {};
    let outputs = {};
    let instructions = input.trim().split('\n');

    let valueInstructions = instructions.filter(inst => inst.startsWith('value'));
    let botInstructions = instructions.filter(inst => inst.startsWith('bot'));

    for (let inst of valueInstructions) {
        let [, value, bot] = inst.match(/value (\d+) goes to bot (\d+)/);
        value = parseInt(value);
        bot = parseInt(bot);
        if (!bots[bot]) bots[bot] = [];
        bots[bot].push(value);
    }

    let processBot = (bot) => {
        if (bots[bot].length < 2) return;

        let [low, high] = bots[bot].sort((a, b) => a - b);
        for (let inst of botInstructions) {
            let [giverBot, lowType, lowDest, highType, highDest] = inst.match(/bot (\d+) gives low to (bot|output) (\d+) and high to (bot|output) (\d+)/).slice(1);
            giverBot = parseInt(giverBot);
            lowDest = parseInt(lowDest);
            highDest = parseInt(highDest);
            if (giverBot === bot) {
                if (lowType === 'bot') {
                    if (!bots[lowDest]) bots[lowDest] = [];
                    bots[lowDest].push(low);
                    if (bots[lowDest].length === 2) processBot(lowDest);
                } else {
                    if (!outputs[lowDest]) outputs[lowDest] = [];
                    outputs[lowDest].push(low);
                }
                if (highType === 'bot') {
                    if (!bots[highDest]) bots[highDest] = [];
                    bots[highDest].push(high);
                    if (bots[highDest].length === 2) processBot(highDest);
                } else {
                    if (!outputs[highDest]) outputs[highDest] = [];
                    outputs[highDest].push(high);
                }
                break;
            }
        }
    };

    for (let bot in bots) {
        if (bots[bot].length === 2) processBot(parseInt(bot));
    }

    const value0 = outputs[0] ? outputs[0][0] : 0;
    const value1 = outputs[1] ? outputs[1][0] : 0;
    const value2 = outputs[2] ? outputs[2][0] : 0;

    const product = value0 * value1 * value2;
    console.log(`Product of values in outputs 0, 1, and 2: ${product}`);
}

const filePath = 'Day10.txt';
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    findProductOfOutputs(data);
});
