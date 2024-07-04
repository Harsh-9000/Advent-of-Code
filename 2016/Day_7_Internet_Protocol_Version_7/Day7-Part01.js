const fs = require('fs');

function countSupportTLS(input) {
    const ipAddress = input.split("\r\n");
    const regex1 = /\[[a-zA-Z]*([a-zA-Z])(?!\1)([a-zA-Z])\2\1[a-zA-Z]*\]/g;
    const regex2 = /([a-zA-Z])(?!\1)([a-zA-Z])\2\1/g;
    let countTLS = 0;

    ipAddress.forEach(address => {
        if (!regex1.test(address)) {
            if (regex2.test(address)) {
                countTLS++;
            }
        }
    })

    return countTLS
}

const filePath = 'Day7.txt';
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    console.log(countSupportTLS(data));
});
