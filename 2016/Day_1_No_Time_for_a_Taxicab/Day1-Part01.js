const fs = require('fs');

function part1(input) {
    const directions = input.trim().split(", ");
    let x = 0, y = 0;
    let facing = 0;

    directions.forEach(direction => {
        const turn = direction.charAt(0);
        const steps = parseInt(direction.slice(1), 10);

        if (turn === 'R') {
            facing = (facing + 1) % 4;
        } else if (turn === 'L') {
            facing = (facing + 3) % 4;
        }

        switch (facing) {
            case 0: // North
                y += steps;
                break;
            case 1: // East
                x += steps;
                break;
            case 2: // South
                y -= steps;
                break;
            case 3: // West
                x -= steps;
                break;
        }
    });

    console.log(`(${x}, ${y})`);
    return Math.abs(x) + Math.abs(y);
}

const filePath = 'Day1.txt';
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    console.log(part1(data));
});
