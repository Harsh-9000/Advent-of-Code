const fs = require('fs');

function swapPosition(str, x, y) {
    let arr = str.split('');
    [arr[x], arr[y]] = [arr[y], arr[x]];
    return arr.join('');
}

function swapLetter(str, x, y) {
    return str.replace(new RegExp(x, 'g'), '_')
        .replace(new RegExp(y, 'g'), x)
        .replace(new RegExp('_', 'g'), y);
}

function rotateLeft(str, steps) {
    steps = steps % str.length;
    return str.slice(steps) + str.slice(0, steps);
}

function rotateRight(str, steps) {
    steps = steps % str.length;
    return str.slice(-steps) + str.slice(0, -steps);
}

function rotateBasedOnPosition(str, x) {
    const index = str.indexOf(x);
    const steps = 1 + index + (index >= 4 ? 1 : 0);
    return rotateRight(str, steps);
}

function reversePositions(str, x, y) {
    return str.slice(0, x) + str.slice(x, y + 1).split('').reverse().join('') + str.slice(y + 1);
}

function movePosition(str, x, y) {
    let arr = str.split('');
    const char = arr.splice(x, 1)[0];
    arr.splice(y, 0, char);
    return arr.join('');
}

function scramble(input, operations) {
    let scrambled = input;

    operations.forEach(op => {
        const parts = op.split(' ');
        if (op.startsWith('swap position')) {
            scrambled = swapPosition(scrambled, parseInt(parts[2]), parseInt(parts[5]));
        } else if (op.startsWith('swap letter')) {
            scrambled = swapLetter(scrambled, parts[2], parts[5]);
        } else if (op.startsWith('rotate left')) {
            scrambled = rotateLeft(scrambled, parseInt(parts[2]));
        } else if (op.startsWith('rotate right')) {
            scrambled = rotateRight(scrambled, parseInt(parts[2]));
        } else if (op.startsWith('rotate based on position of letter')) {
            scrambled = rotateBasedOnPosition(scrambled, parts[6]);
        } else if (op.startsWith('reverse positions')) {
            scrambled = reversePositions(scrambled, parseInt(parts[2]), parseInt(parts[4]));
        } else if (op.startsWith('move position')) {
            scrambled = movePosition(scrambled, parseInt(parts[2]), parseInt(parts[5]));
        }
    });

    return scrambled;
}

fs.readFile('Day21.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    const operations = data.trim().split('\r\n');
    const result = scramble('abcdefgh', operations);
    console.log('Scrambled password:', result);
});
