const fs = require('fs');

const input = fs.readFileSync('Day23.txt', 'utf8').trimEnd();

const neighbors = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
];

const map = input.split('\r\n').map(line =>
    line.split('')
        .map(char => Number(char === '#'))
);

const request = (turn, x, y, candidates) => {
    if (turn === 0) {
        if (!map[y - 1]?.[x] && !map[y - 1]?.[x - 1] && !map[y - 1]?.[x + 1]) {
            return candidates.push([[x, y].join(), [x, y - 1].join()]);
        }
    }
    if (turn === 1) {
        if (!map[y + 1]?.[x] && !map[y + 1]?.[x - 1] && !map[y + 1]?.[x + 1]) {
            return candidates.push([[x, y].join(), [x, y + 1].join()]);
        }
    }
    if (turn === 2) {
        if (!map[y - 1]?.[x - 1] && !map[y][x - 1] && !map[y + 1]?.[x - 1]) {
            return candidates.push([[x, y].join(), [x - 1, y].join()]);
        }
    }
    if (turn === 3) {
        if (!map[y - 1]?.[x + 1] && !map[y][x + 1] && !map[y + 1]?.[x + 1]) {
            return candidates.push([[x, y].join(), [x + 1, y].join()]);
        }
    }
}


let round = 0;
while (true) {
    round++;
    let candidates = [];
    for (let y in map) {
        y = Number(y);
        for (let x in map[y]) {
            x = Number(x);
            if (map[y][x]) {
                if (neighbors.every(([dx, dy]) => !map[y + dy]?.[x + dx]))
                    continue;
                for (let i = round; i < round + 4; i++) {
                    if (request((i - 1) % 4, x, y, candidates))
                        break;
                }
            }
        }
    }

    const candidates_count = candidates.reduce((acc, [, to]) => {
        acc[to] = (acc[to] || 0) + 1;
        return acc;
    }, {});

    candidates = candidates.filter(([, to]) => candidates_count[to] === 1);

    if (!candidates.length)
        break;

    for (let [from, to] of candidates) {
        const [x1, y1] = from.split(',').map(Number);
        const [x2, y2] = to.split(',').map(Number);
        map[y1][x1] = 0;
        map[y2] = map[y2] ?? [];
        map[y2][x2] = 1;
    }
}

console.log(round);