const fs = require('fs');
const crypto = require('crypto');
const filePath = 'Day04.txt';

function md5Hash(secretKey) {
    let number = 1;
    while (true) {
        const combinedString = secretKey + number;

        const hash = crypto.createHash('md5').update(combinedString).digest('hex');

        if (hash.startsWith('00000')) {
            return number;
        }
        console.log(number);
        number += 1;
    }
}

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    console.log(md5Hash(data));
});