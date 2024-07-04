const fs = require('fs');

function findABASequences(str) {
    let abaSequences = [];
    for (let i = 0; i < str.length - 2; i++) {
        if (str[i] === str[i + 2] && str[i] !== str[i + 1]) {
            abaSequences.push(str.substring(i, i + 3));
        }
    }
    return abaSequences;
}

function convertABAToBAB(aba) {
    return aba[1] + aba[0] + aba[1];
}

function supportsSSL(ip) {
    let hypernetSequences = [];
    let supernetSequences = [];
    let parts = ip.split(/[\[\]]/);

    for (let i = 0; i < parts.length; i++) {
        if (i % 2 === 0) {
            supernetSequences.push(parts[i]);
        } else {
            hypernetSequences.push(parts[i]);
        }
    }

    let babCandidates = new Set();
    for (let seq of hypernetSequences) {
        let abas = findABASequences(seq);
        for (let aba of abas) {
            babCandidates.add(convertABAToBAB(aba));
        }
    }

    if (babCandidates.size === 0) {
        return false;
    }

    for (let supernet of supernetSequences) {
        for (let bab of babCandidates) {
            if (supernet.includes(bab)) {
                return true;
            }
        }
    }

    return false;
}

function countSupportSSL(input) {
    const ipAddress = input.split("\r\n");
    let countSSL = 0;

    ipAddress.forEach(address => {
        if (supportsSSL(address)) {
            countSSL++;
        }
    });

    return countSSL;
}

const filePath = 'Day7.txt';
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    console.log(countSupportSSL(data));
});
