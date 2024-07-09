const fs = require('fs');

function part2(input) {
    let opcodes = input.split(",").map(Number);
    let i = 0;
    for (let j = 0; j <= 99; j++) {
        for (let k = 0; k <= 99; k++) {
            opcodes[1] = j;
            opcodes[2] = k;

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

            if (opcodes[0] === 19690720){
                return 100 * j + k;
            }

            opcodes = input.split(",").map(Number)
            i = 0;
        }
    }

    return -1;
}

const filePath = 'Day2.txt';
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    console.log(part2(data));
});
