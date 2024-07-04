const fs = require('fs');

function decompressedLengthV2(input) {
    function computeLength(s, start, end) {
        let length = 0;
        let i = start;

        while (i < end) {
            if (s[i] === '(') {
                let endMarker = s.indexOf(')', i);
                let marker = s.substring(i + 1, endMarker);
                let [charsToTake, repeatCount] = marker.split('x').map(Number);
                let segmentLength = computeLength(s, endMarker + 1, endMarker + 1 + charsToTake);

                length += segmentLength * repeatCount;
                i = endMarker + 1 + charsToTake;
            } else {
                length += 1;
                i += 1;
            }
        }

        return length;
    }

    return computeLength(input, 0, input.length);
}

const filePath = 'Day9.txt';
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    const input = data.replace(/\s+/g, '');
    console.log(decompressedLengthV2(input));
});
