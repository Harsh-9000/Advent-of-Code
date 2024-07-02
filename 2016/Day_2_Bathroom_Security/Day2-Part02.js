const fs = require('fs');

function part2(input) {
    const keypad = [[0, 0, 1, 0, 0], [0, 2, 3, 4, 0], [5, 6, 7, 8, 9], [0, 'A', 'B', 'C', 0], [0, 0, 'D', 0, 0]];
    let currNumber = 5;
    let x = 2, y = 0;
    let code = [];
    const instructions = input.split("\r\n");

    instructions.forEach(instruction => {
        let moves = instruction.split("");
        for (let i in moves) {
            switch (moves[i]) {
                case "U":
                    if (x - 1 >= 0 && keypad[x - 1][y] !== 0) {
                        x--;
                        currNumber = keypad[x][y];
                    }
                    break;

                case "D":
                    if (x + 1 < keypad.length && keypad[x + 1][y] !== 0) {
                        x++;
                        currNumber = keypad[x][y];
                    }
                    break;

                case "L":
                    if (y - 1 >= 0 && keypad[x][y - 1] !== 0) {
                        y--;
                        currNumber = keypad[x][y];
                    }
                    break;

                case "R":
                    if (y + 1 < keypad[0].length && keypad[x][y + 1] !== 0) {
                        y++;
                        currNumber = keypad[x][y];
                    }
                    break;

                default:
                    break;
            }
        }

        code.push(currNumber);
    });

    return code
}

const filePath = 'Day2.txt';
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    console.log(part2(data));
});
