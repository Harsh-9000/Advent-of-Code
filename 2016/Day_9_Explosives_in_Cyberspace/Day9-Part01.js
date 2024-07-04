const fs = require('fs');

function decompressedLength(input) {
    let length = 0;
    let i = 0;

    while (i < input.length) {
        if (input[i] === '(') {
            let endMarker = input.indexOf(')', i);
            let marker = input.substring(i + 1, endMarker);
            let [charsToTake, repeatCount] = marker.split('x').map(Number);

            i = endMarker + 1;
            length += charsToTake * repeatCount;
            i += charsToTake;
        } else {
            length += 1;
            i += 1;
        }
    }

    return length;
}

const filePath = 'Day9.txt';
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    const input = data.replace(/\s+/g, '');
    console.log(decompressedLength(input));
});
