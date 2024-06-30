const fs = require('fs');

const input = fs.readFileSync('Day22.txt', 'utf8').split('\r\n');
const grid = input.slice(0, input.findIndex(line => line.trim() === '')).map(line => line.split(''));
const moves = input[input.findIndex(line => line.trim() === '') + 1].match(/\d+|[RL]/g);

const width = Math.max(...grid.map(line => line.length));
const height = grid.length;

function moveCount(pos, num) {
    let lastGoodPos = pos;
    while (num > 0) {
        pos = newPos(pos);
        if (pos.x >= grid[pos.y].length) continue;
        if (grid[pos.y][pos.x] === '#') return lastGoodPos;
        if (grid[pos.y][pos.x] === '.') {
            lastGoodPos = pos;
            num--;
        }
    }
    return pos;
}

function newPos(p) {
    return {
        x: (p.x + [1, 0, -1, 0][p.d] + width) % width,
        y: (p.y + [0, 1, 0, -1][p.d] + height) % height,
        d: p.d
    };
}

let pos = { x: 0, y: 0, d: 0 }; // d: 0 - right, 1 - down, 2 - left, 3 - up

moves.forEach(move => {
    if (['R', 'L'].includes(move)) {
        pos.d = (pos.d + (move === 'R' ? 1 : -1) + 4) % 4;
    } else {
        pos = moveCount(pos, parseInt(move, 10));
    }
});

const result = 1000 * (pos.y + 1) + 4 * (pos.x + 1) + pos.d;
console.log(result);
