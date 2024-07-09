const fs = require('fs');

function part1(input) {
    let opcodes = input.split(",").map(Number);
    let i = 0;
    opcodes[1] = 12;
    opcodes[2] = 2;

    while (i < opcodes.length) {
        if (opcodes[i] === 99) {
            break;
        }

        if (opcodes[i] === 1) {
            opcodes[opcodes[i + 3]] = opcodes[opcodes[i + 1]] + opcodes[opcodes[i + 2]];
        }

        if (opcodes[i] === 2) {
            opcodes[opcodes[i + 3]] = opcodes[opcodes[i + 1]] * opcodes[opcodes[i + 2]];
        }

        if (opcodes[i] !== 1 && opcodes[i] !== 2) {
            console.log("Error");
            break;
        }

        i += 4;
    }

    return opcodes[0];
}

const filePath = 'Day2.txt';
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    console.log(part1(data));
});
