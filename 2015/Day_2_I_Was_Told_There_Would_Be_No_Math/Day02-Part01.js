const fs = require('fs');
const filePath = 'Day02.txt';

function wrappingPaper(input) {
    let totalAmount = 0;
    const lines = input.trim().split('\n');
    const dimensionsArray = lines.map(line => {
        const dimensions = line.split('x');
        return dimensions.map(Number);
    });

    dimensionsArray.forEach(dimensions => {
        totalAmount += 2 * dimensions[0] * dimensions[1];
        totalAmount += 2 * dimensions[1] * dimensions[2];
        totalAmount += 2 * dimensions[2] * dimensions[0];

        totalAmount += Math.min(dimensions[0] * dimensions[1], dimensions[1] * dimensions[2], dimensions[2] * dimensions[0]);
    });

    return totalAmount;
}

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    console.log(wrappingPaper(data));
});