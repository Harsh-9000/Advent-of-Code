const fs = require('fs');

function getErrorCorrectedMessage(input) {
    const lines = input.trim().split("\r\n");
    const columnCount = lines[0].length;
    const columns = Array.from({ length: columnCount }, () => []);

    lines.forEach(line => {
        for (let i = 0; i < columnCount; i++) {
            columns[i].push(line[i]);
        }
    });

    const correctedMessage = columns.map(column => {
        const frequency = {};
        column.forEach(char => {
            if (frequency[char]) {
                frequency[char]++;
            } else {
                frequency[char] = 1;
            }
        });

        return Object.keys(frequency).reduce((a, b) => frequency[a] < frequency[b] ? a : b);
    }).join('');

    return correctedMessage;
}

const filePath = 'Day6.txt';
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    console.log(getErrorCorrectedMessage(data));
});
