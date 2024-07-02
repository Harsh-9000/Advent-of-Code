const crypto = require('crypto');

function part1(secretKey) {
    let number = 1;
    let passwordLength = 8;
    let password = "";

    while (passwordLength) {
        const combinedString = secretKey + number;

        const hash = crypto.createHash('md5').update(combinedString).digest('hex');

        if (hash.startsWith('00000')) {
            password += hash[5];
            passwordLength--;
        }

        number += 1;
    }

    return password
}

console.log(part1("wtnhxymk"));