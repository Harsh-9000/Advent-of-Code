const fs = require('fs');

function findResponsibleBot(input) {
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
        let [low, high] = bots[bot].sort((a, b) => a - b);
        if (low === 17 && high === 61) {
            console.log(`Bot responsible for comparing 17 and 61: ${bot}`);
        }
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
}

const filePath = 'Day10.txt';
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    findResponsibleBot(data);
});
