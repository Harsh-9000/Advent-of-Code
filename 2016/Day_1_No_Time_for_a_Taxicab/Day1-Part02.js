const fs = require('fs');

function part2(input) {
    const directions = input.trim().split(", ");
    let x = 0, y = 0;
    let facing = 0; // 0: North, 1: East, 2: South, 3: West
    let visited = new Set();
    visited.add(`0,0`);

    const move = (x, y, steps, facing) => {
        const positions = [];
        for (let i = 0; i < steps; i++) {
            switch (facing) {
                case 0: y += 1; break; // North
                case 1: x += 1; break; // East
                case 2: y -= 1; break; // South
                case 3: x -= 1; break; // West
            }
            positions.push([x, y]);
        }
        return positions;
    };

    for (let direction of directions) {
        const turn = direction.charAt(0);
        const steps = parseInt(direction.slice(1), 10);
        
        if (turn === 'R') {
            facing = (facing + 1) % 4;
        } else if (turn === 'L') {
            facing = (facing + 3) % 4;
        }

        const positions = move(x, y, steps, facing);
        for (let [newX, newY] of positions) {
            const key = `${newX},${newY}`;
            if (visited.has(key)) {
                return Math.abs(newX) + Math.abs(newY);
            }
            visited.add(key);
        }

        [x, y] = positions[positions.length - 1];
    }

    return -1;
}

const filePath = 'Day1.txt';
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    console.log(part2(data));
});
