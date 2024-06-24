const fs = require('fs');
const filePath = 'Day05.txt';

function niceStrings(input) {
    const lines = input.trim().split('\n');
    let naughtyCount = 0;

    lines.forEach(line => {
        let vowelCount = 0;
        let continuousCount = 0;

        for (let i = 0; i < line.length; i++) {
            if (line[i] === 'a' || line[i] === 'e' || line[i] === 'i' || line[i] === 'o' || line[i] === 'u') {
                vowelCount++;
            }

            if (i !== line.length - 1) {
                if (line[i] === line[i + 1]) {
                    continuousCount++;
                }
            }
        }

        if (vowelCount < 3 || continuousCount < 1 || line.includes("ab") || line.includes("cd") || line.includes("pq") || line.includes("xy")) {
            naughtyCount++;
        }
    });

    return lines.length - naughtyCount;
}

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    console.log(niceStrings(data));
});