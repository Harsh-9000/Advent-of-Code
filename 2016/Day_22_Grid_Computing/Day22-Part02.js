const fs = require('fs');

const input = fs.readFileSync('Day22.txt', 'utf8').trim().split('\n');

const nodes = input.slice(2).map(line => {
    const parts = line.match(/\/dev\/grid\/node-x(\d+)-y(\d+)\s+(\d+)T\s+(\d+)T\s+(\d+)T\s+(\d+)%/);
    return {
        x: parseInt(parts[1], 10),
        y: parseInt(parts[2], 10),
        size: parseInt(parts[3], 10),
        used: parseInt(parts[4], 10),
        avail: parseInt(parts[5], 10),
        usePercent: parseInt(parts[6], 10)
    };
});

const grid = [];
const emptyNode = { x: 0, y: 0 };
let goalNode = { x: 0, y: 0 };
let maxX = 0;
let maxY = 0;

nodes.forEach(node => {
    if (!grid[node.y]) {
        grid[node.y] = [];
    }
    grid[node.y][node.x] = node;

    if (node.used === 0) {
        emptyNode.x = node.x;
        emptyNode.y = node.y;
    }
    if (node.y === 0 && node.x > maxX) {
        goalNode.x = node.x;
        goalNode.y = node.y;
        maxX = node.x;
    }
    if (node.x > maxX) maxX = node.x;
    if (node.y > maxY) maxY = node.y;
});

const isValidMove = (nodeA, nodeB) => {
    return nodeA.used > 0 && nodeA.used <= nodeB.avail;
};

const bfs = (start, target) => {
    const directions = [
        { dx: -1, dy: 0 },
        { dx: 1, dy: 0 },
        { dx: 0, dy: -1 },
        { dx: 0, dy: 1 }
    ];

    const queue = [{ ...start, steps: 0 }];
    const visited = new Set([`${start.x},${start.y}`]);

    while (queue.length > 0) {
        const { x, y, steps } = queue.shift();

        if (x === target.x && y === target.y) {
            return steps;
        }

        for (const { dx, dy } of directions) {
            const nx = x + dx;
            const ny = y + dy;

            if (nx >= 0 && ny >= 0 && nx <= maxX && ny <= maxY && !visited.has(`${nx},${ny}`)) {
                const nextNode = grid[ny][nx];
                if (nextNode.size <= 100) { // Consider 100T as a safe threshold for large nodes
                    queue.push({ x: nx, y: ny, steps: steps + 1 });
                    visited.add(`${nx},${ny}`);
                }
            }
        }
    }
    return Infinity;
};

const adjacentGoalSteps = Math.min(
    bfs(emptyNode, { x: goalNode.x - 1, y: goalNode.y }),
    bfs(emptyNode, { x: goalNode.x + 1, y: goalNode.y }),
    bfs(emptyNode, { x: goalNode.x, y: goalNode.y - 1 }),
    bfs(emptyNode, { x: goalNode.x, y: goalNode.y + 1 })
);

const moveGoalSteps = (goalNode.x - 1) * 5 + 1;

const totalSteps = adjacentGoalSteps + moveGoalSteps;
console.log(`Fewest number of steps required: ${totalSteps}`);
