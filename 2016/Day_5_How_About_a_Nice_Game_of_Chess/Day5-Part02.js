const crypto = require('crypto');

function part2(secretKey) {
    let number = 1;
    let passwordLength = 8;
    let password = [-1, -1, -1, -1, -1, -1, -1, -1];

    while (passwordLength) {
        const combinedString = secretKey + number;

        const hash = crypto.createHash('md5').update(combinedString).digest('hex');

        if (hash.startsWith('00000')) {
            if (!isNaN(hash[5]) && parseInt(hash[5]) < password.length && password[parseInt(hash[5])] === -1) {
                password[parseInt(hash[5])] = hash[6];
                passwordLength--;
            }
        }

        number += 1;
    }

    return password
}

console.log(part2("wtnhxymk"));