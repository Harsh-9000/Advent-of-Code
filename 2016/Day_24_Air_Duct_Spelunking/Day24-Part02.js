const fs = require('fs');

function shortestPath(map, from, to) {
    let paths = [[[...from]]];
    let nextPaths = [];
    let visited = new Set();

    while (paths.length) {
        nextPaths = [];

        for (let i = 0; i < paths.length; i++) {
            const path = paths[i];
            const [px, py] = path.slice(-1)[0];

            const moves = [
                [px, py + 1],
                [px + 1, py],
                [px, py - 1],
                [px - 1, py],
            ];

            for (let m = 0; m < moves.length; m++) {
                const [qx, qy] = moves[m];

                if (map[qy][qx] && !visited.has(`${qx},${qy}`)) {
                    nextPaths.push([...path, [qx, qy]]);
                    visited.add(`${qx},${qy}`);
                }
            }
        }

        paths = nextPaths;

        for (let i = 0; i < nextPaths.length; i++) {
            const path = nextPaths[i];
            const [px, py] = path.slice(-1)[0];
            const [tx, ty] = to;

            if (px === tx && py === ty) {
                return path.length - 1;
            }
        }
    }
}

function main() {
    const input = fs.readFileSync('Day24.txt', 'utf-8');
    const map = input
        .split('\r\n')
        .map((line) => line.trim().split(''));

    const targets = new Map();
    const nodes = [];

    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            if (/\d/.test(map[y][x])) {
                targets.set(`${x},${y}`, parseInt(map[y][x]));
                nodes.push([x, y]);

                map[y][x] = true;
            } else {
                map[y][x] = map[y][x] === '.';
            }
        }
    }

    const distances = new Map();

    for (let n = 0; n < nodes.length; n++) {
        const [px, py] = nodes[n];
        const otherNodes = [...nodes.slice(0, n), ...nodes.slice(n + 1)];

        for (let o = 0; o < otherNodes.length; o++) {
            const [ox, oy] = otherNodes[o];

            if (!distances.has(`${targets.get(`${px},${py}`)}-${targets.get(`${ox},${oy}`)}`)) {
                const distance = shortestPath(map, [px, py], [ox, oy]);

                distances.set(`${targets.get(`${px},${py}`)}-${targets.get(`${ox},${oy}`)}`, distance);
                distances.set(`${targets.get(`${ox},${oy}`)}-${targets.get(`${px},${py}`)}`, distance);
            }
        }
    }

    const permute = (paths = [[0]], remaining = []) => {
        let all = [];

        if (!remaining.length) {
            return paths;
        }

        for (let r = 0; r < remaining.length; r++) {
            for (let p = 0; p < paths.length; p++) {
                const newPaths = paths.map((path) => [...path, remaining[r]]);
                const newRemaining = [...remaining.slice(0, r), ...remaining.slice(r + 1)];

                for (let n = 0; n < newPaths.length; n++) {
                    const permutations = permute(newPaths, newRemaining);

                    all = all.concat(permutations);
                }
            }
        }

        return all;
    };

    const paths = permute([[0]], [...targets.values()].filter((v) => v !== 0));

    const result = paths.reduce((maxSteps, path) => {
        let totalSteps = path.reduce((steps, node, i, path) => {
            return steps + (i > 0 ? distances.get(`${path[i - 1]}-${path[i]}`) : 0);
        }, 0);

        totalSteps += distances.get(`${path.slice(-1)[0]}-0`);

        return totalSteps < maxSteps ? totalSteps : maxSteps;
    }, Infinity);

    console.log(result);
}

main();
