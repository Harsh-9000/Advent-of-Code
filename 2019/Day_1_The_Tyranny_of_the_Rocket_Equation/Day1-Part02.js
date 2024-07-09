const fs = require('fs');

function part2(input) {
    let moduleMasses = input.split("\r\n");
    let sum = 0;


    moduleMasses.forEach(moduleMass => {
        let currentMass = (Math.floor(moduleMass / 3) - 2);
        sum += currentMass;

        while (currentMass > 0) {
            currentMass = (Math.floor(currentMass / 3) - 2);
            if (currentMass >= 0) {
                sum += currentMass;
            }
        }
    })

    return sum;
}

const filePath = 'Day1.txt';
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    console.log(part2(data));
});
