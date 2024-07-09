const fs = require('fs');

function part1(input) {
    let moduleMasses = input.split("\r\n");
    let sum = 0;


    moduleMasses.forEach(moduleMass => {
        sum += (Math.floor(moduleMass / 3) - 2);
    })

    return sum;
}

const filePath = 'Day1.txt';
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    console.log(part1(data));
});
