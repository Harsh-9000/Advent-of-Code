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

function findLongestPath(passcode) {
    let longestPathLength = 0;

    function dfs(x, y, path) {
        if (x === 3 && y === 3) {
            if (path.length > longestPathLength) {
                longestPathLength = path.length;
            }
            return;
        }

        const hash = md5(passcode + path);

        for (let i = 0; i < 4; i++) {
            const { dir, dx, dy } = directions[i];
            const newX = x + dx;
            const newY = y + dy;

            if (isWithinBounds(newX, newY) && 'bcdef'.includes(hash[i])) {
                dfs(newX, newY, path + dir);
            }
        }
    }

    dfs(0, 0, '');

    return longestPathLength;
}

const passcode = 'bwnlcvfs';
const longestPathLength = findLongestPath(passcode);
console.log(longestPathLength);
