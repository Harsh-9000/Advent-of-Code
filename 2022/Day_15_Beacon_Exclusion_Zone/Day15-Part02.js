const fs = require('fs');

function findDistressBeacon(input) {
    const lines = input.split('\n').filter(line => line.trim() !== '').map(line => {
        const matches = [...line.matchAll(/-?\d+/g)].map(match => Number(match[0]));
        return {
            x: matches[0],
            y: matches[1],
            bx: matches[2],
            by: matches[3]
        };
    });

    const results = lines.map(({ x, y, bx, by }) => {
        const sum = x + y;
        const diff = x - y;
        const distance = Math.abs(x - bx) + Math.abs(y - by) + 1;
        return [sum, diff, distance];
    });

    const xs = new Set(results.map(([x, , d]) => x + d));
    const ys = new Set(results.map(([, y, d]) => y + d));
    const xc = new Set(results.map(([x, , d]) => x - d).filter(x => xs.has(x)));
    const yc = new Set(results.map(([, y, d]) => y - d).filter(y => ys.has(y)));

    for (const x of xc) {
        for (const y of yc) {
            if (!results.some(([x2, y2, d]) => x > x2 - d && x < x2 + d && y > y2 - d && y < y2 + d)) {
                console.log((x + y) / 2 * 4e6 + (x - y) / 2);
                return;
            }
        }
    }
}

const filePath = 'Day15.txt';
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    findDistressBeacon(data);
});
