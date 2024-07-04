const crypto = require('crypto');

function md5(string) {
    return crypto.createHash('md5').update(string).digest('hex');
}
const directions = [
    { dir: 'U', dx: 0, dy: -1 },
    { dir: 'D', dx: 0, dy: 1 },
    { dir: 'L', dx: -1, dy: 0 },
    { dir: 'R', dx: 1, dy: 0 }
];

function isWithinBounds(x, y) {
    return x >= 0 && x < 4 && y >= 0 && y < 4;
}

function findShortestPath(passcode) {
    let queue = [{ x: 0, y: 0, path: '' }];

    while (queue.length > 0) {
        const { x, y, path } = queue.shift();

        if (x === 3 && y === 3) {
            return path;
        }

        const hash = md5(passcode + path);

        for (let i = 0; i < 4; i++) {
            const { dir, dx, dy } = directions[i];
            const newX = x + dx;
            const newY = y + dy;

            if (isWithinBounds(newX, newY) && 'bcdef'.includes(hash[i])) {
                queue.push({ x: newX, y: newY, path: path + dir });
            }
        }
    }

    return '';
}

const passcode = 'bwnlcvfs';
const shortestPath = findShortestPath(passcode);
console.log(shortestPath);
