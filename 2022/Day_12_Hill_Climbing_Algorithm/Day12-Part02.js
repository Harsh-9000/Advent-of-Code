const fs = require('fs');
const filePath = 'Day12.txt';

function minSteps(data) {
    const grid = data.trim().split('\n').map(line => line.split(''));
    const rows = grid.length;
    const cols = grid[0].length;
    const startPositions = [];
    let end;

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c] === 'S' || grid[r][c] === 'a') {
                startPositions.push([r, c]);
                if (grid[r][c] === 'S') grid[r][c] = 'a';
            } else if (grid[r][c] === 'E') {
                end = [r, c];
                grid[r][c] = 'z';
            }
        }
    }

    const directions = [
        [-1, 0],
        [1, 0], 
        [0, -1],
        [0, 1]   
    ];

    function isValidMove(r, c, newR, newC) {
        if (newR < 0 || newR >= rows || newC < 0 || newC >= cols) {
            return false;
        }
        const currentElevation = grid[r][c].charCodeAt(0);
        if (grid[newR][newC]) {
            const newElevation = grid[newR][newC].charCodeAt(0);
            return newElevation <= currentElevation + 1;
        }

        return false;
    }

    function bfs(start) {
        const queue = [[...start, 0]]; // [row, col, steps]
        const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
        visited[start[0]][start[1]] = true;

        while (queue.length > 0) {
            const [r, c, steps] = queue.shift();

            if (r === end[0] && c === end[1]) {
                return steps;
            }

            for (const [dr, dc] of directions) {
                const newR = r + dr;
                const newC = c + dc;

                if (isValidMove(r, c, newR, newC) && !visited[newR][newC]) {
                    visited[newR][newC] = true;
                    queue.push([newR, newC, steps + 1]);
                }
            }
        }
        return Infinity; 
    }

    let minSteps = Infinity;

    for (const start of startPositions) {
        const steps = bfs(start);
        if (steps < minSteps) {
            minSteps = steps;
        }
    }

    console.log(minSteps === Infinity ? 'No valid path found' : minSteps);
    return minSteps === Infinity ? -1 : minSteps; 
}

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    minSteps(data);
});
