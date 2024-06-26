const fs = require('fs');

function sumNumbers(data) {
    let sum = 0;

    function recursiveSum(data) {
        if (typeof data === 'number') {
            sum += data;
        } else if (typeof data === 'object' && data !== null) {
            if (!Array.isArray(data)) {
                for (let key in data) {
                    if (data[key] === 'red') {
                        return;
                    }
                }
            }

            for (let key in data) {
                if (data.hasOwnProperty(key)) {
                    recursiveSum(data[key]);
                }
            }
        }
    }

    recursiveSum(data);
    return sum;
}

const filePath = 'Day12.txt';
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    console.log(sumNumbers(JSON.parse(data)));
});
