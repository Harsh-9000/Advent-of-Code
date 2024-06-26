const fs = require('fs');
const filePath = 'Day08.txt';

function characters(data) {
    const lines = data.split('\n').filter(line => line.trim() !== '');
    let totalCodeChars = 0;
    let totalEncodedChars = 0;

    lines.forEach(line => {
        const trimmedLine = line.trim();
        totalCodeChars += trimmedLine.length;

        let encodedString = '"';
        for (let i = 0; i < trimmedLine.length; i++) {
            if (trimmedLine[i] === '\\' || trimmedLine[i] === '"') {
                encodedString += '\\' + trimmedLine[i];
            } else {
                encodedString += trimmedLine[i];
            }
        }
        encodedString += '"';
        totalEncodedChars += encodedString.length;
    });

    const difference = totalEncodedChars - totalCodeChars;
    console.log(`Total characters of code: ${totalCodeChars}`);
    console.log(`Total characters in encoded strings: ${totalEncodedChars}`);
    console.log(`Difference: ${difference}`);
}

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    characters(data);
});
