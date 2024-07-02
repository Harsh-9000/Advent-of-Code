const fs = require('fs');

function isRealRoom(name, checksum) {
    const nameWithoutDashes = name.replace(/-/g, '');
    const letterCounts = {};

    for (let char of nameWithoutDashes) {
        if (letterCounts[char]) {
            letterCounts[char]++;
        } else {
            letterCounts[char] = 1;
        }
    }

    const sortedLetters = Object.keys(letterCounts).sort((a, b) => {
        if (letterCounts[a] === letterCounts[b]) {
            return a.localeCompare(b);
        }
        return letterCounts[b] - letterCounts[a];
    });

    const calculatedChecksum = sortedLetters.slice(0, 5).join('');

    return calculatedChecksum === checksum;
}

function part1(input) {
    const rooms = input.trim().split("\r\n");
    let sectorIdSum = 0;

    rooms.forEach(room => {
        const parts = room.match(/^([a-z-]+)-(\d+)\[([a-z]+)\]$/);
        if (parts) {
            const name = parts[1];
            const sectorId = parseInt(parts[2], 10);
            const checksum = parts[3];

            if (isRealRoom(name, checksum)) {
                sectorIdSum += sectorId;
            }
        }
    });

    return sectorIdSum;
}

const filePath = 'Day4.txt';
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    console.log(part1(data));
});
