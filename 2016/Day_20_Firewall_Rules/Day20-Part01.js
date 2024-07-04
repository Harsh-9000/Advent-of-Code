const fs = require('fs');

function lowestIP(input) {
    let ips = input.split("\r\n");
    let ipRanges = [];

    ips.forEach(ip => {
        let range = [parseInt(ip.split("-")[0]), parseInt(ip.split("-")[1])];
        ipRanges.push(range);
    });

    ipRanges.sort((a, b) => a[0] - b[0]);

    let mergedRanges = [];
    let currentRange = ipRanges[0];

    for (let i = 1; i < ipRanges.length; i++) {
        let nextRange = ipRanges[i];
        if (currentRange[1] + 1 >= nextRange[0]) {
            currentRange[1] = Math.max(currentRange[1], nextRange[1]);
        } else {
            mergedRanges.push(currentRange);
            currentRange = nextRange;
        }
    }
    mergedRanges.push(currentRange);

    if (mergedRanges[0][0] > 0) {
        return 0;
    }

    for (let i = 0; i < mergedRanges.length - 1; i++) {
        if (mergedRanges[i][1] + 1 < mergedRanges[i + 1][0]) {
            return mergedRanges[i][1] + 1;
        }
    }

    if (mergedRanges[mergedRanges.length - 1][1] < 4294967295) {
        return mergedRanges[mergedRanges.length - 1][1] + 1;
    }

    return -1;
}

const filePath = 'Day20.txt';
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    console.log(lowestIP(data));
});
