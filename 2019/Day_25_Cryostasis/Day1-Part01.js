const fs = require('fs');

function part1(input) {

}

const filePath = 'Day1.txt';
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    console.log(part1(data));
});
