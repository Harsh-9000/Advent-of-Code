const fs = require('fs');

const input = fs.readFileSync('Day22.txt', 'utf8').trim().split('\r\n');

const nodes = input.slice(2).map(line => {
    const parts = line.match(/\/dev\/grid\/node-x(\d+)-y(\d+)\s+(\d+)T\s+(\d+)T\s+(\d+)T\s+(\d+)%/);
    console.log(parts);
    return {
        x: parseInt(parts[1], 10),
        y: parseInt(parts[2], 10),
        size: parseInt(parts[3], 10),
        used: parseInt(parts[4], 10),
        avail: parseInt(parts[5], 10),
        usePercent: parseInt(parts[6], 10)
    };
});

let viablePairs = 0;

for (let i = 0; i < nodes.length; i++) {
    const nodeA = nodes[i];
    if (nodeA.used === 0) continue;

    for (let j = 0; j < nodes.length; j++) {
        if (i === j) continue;

        const nodeB = nodes[j];
        if (nodeA.used <= nodeB.avail) {
            viablePairs++;
        }
    }
}

console.log(`Number of viable pairs: ${viablePairs}`);
