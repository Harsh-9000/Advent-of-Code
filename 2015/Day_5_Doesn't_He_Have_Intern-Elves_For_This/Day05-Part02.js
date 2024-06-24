const fs = require('fs');
const filePath = 'Day05.txt';

function niceStrings(input) {
    const lines = input.trim().split('\n');
    let niceCount = 0;

    lines.forEach(line => {
        let hasPair = false;
        let hasRepeatWithGap = false;

        for (let i = 0; i < line.length - 1; i++) {
            const pair = line.substring(i, i + 2);
            if (line.indexOf(pair, i + 2) !== -1) {
                hasPair = true;
                break;
            }
        }

        for (let i = 0; i < line.length - 2; i++) {
            if (line[i] === line[i + 2]) {
                hasRepeatWithGap = true;
                break;
            }
        }
        
        if (hasPair && hasRepeatWithGap) {
            niceCount++;
        }
    });

    return niceCount;
}

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    console.log(niceStrings(data));
});