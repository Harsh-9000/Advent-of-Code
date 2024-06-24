const fs = require('fs');
const filePath = 'Day02.txt';

function ribbonLength(input) {
    let totalAmount = 0;
    const lines = input.trim().split('\n');
    const dimensionsArray = lines.map(line => {
        const dimensions = line.split('x');
        return dimensions.map(Number);
    });

    dimensionsArray.forEach(dimensions => {
        totalAmount += dimensions[0] * dimensions[1] * dimensions[2];

        let smallest = Math.min(dimensions[0], dimensions[1], dimensions[2]);
        let secondSmallest;

        if (dimensions[0] === smallest) {
            secondSmallest = Math.min(dimensions[1], dimensions[2]);
        } else if (dimensions[1] === smallest) {
            secondSmallest = Math.min(dimensions[0], dimensions[2]);
        } else {
            secondSmallest = Math.min(dimensions[0], dimensions[1]);
        }

        totalAmount += (2 * smallest) + (2 * secondSmallest);
    });

    return totalAmount;
}

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    console.log(ribbonLength(data));
});