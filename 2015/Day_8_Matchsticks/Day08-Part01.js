const fs = require('fs');
const filePath = 'Day08.txt';

function characters(data) {
    const lines = data.split('\n').filter(line => line.trim() !== '');
    let totalCodeChars = 0;
    let totalMemoryChars = 0;

    lines.forEach(line => {
        const trimmedLine = line.trim();
        totalCodeChars += trimmedLine.length;

        let memoryLength = 0;
        for (let i = 1; i < trimmedLine.length - 1; i++) {
            if (trimmedLine[i] === '\\') {
                if (trimmedLine[i + 1] === '\\' || trimmedLine[i + 1] === '"') {
                    memoryLength += 1;
                    i += 1;
                } else if (trimmedLine[i + 1] === 'x') {
                    memoryLength += 1;
                    i += 3;
                }
            } else {
                memoryLength += 1;
            }
        }

        totalMemoryChars += memoryLength;
    });

    const difference = totalCodeChars - totalMemoryChars;
    console.log(`Total characters of code: ${totalCodeChars}`);
    console.log(`Total characters in memory: ${totalMemoryChars}`);
    console.log(`Difference: ${difference}`);
}

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    characters(data);
});
