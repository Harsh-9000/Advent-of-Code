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

function rotateBasedOnPositionReverse(str, x) {
    const arr = str.split('');
    const index = arr.indexOf(x);
    let steps;
    if (index % 2 === 1) {
        steps = (index + 1) / 2;
    } else if (index === 0) {
        steps = 1;
    } else {
        steps = (index / 2) + 5;
    }
    return rotateLeft(str, steps);
}

function reversePositions(str, x, y) {
    return str.slice(0, x) + str.slice(x, y + 1).split('').reverse().join('') + str.slice(y + 1);
}

function movePositionReverse(str, x, y) {
    let arr = str.split('');
    const char = arr.splice(y, 1)[0];
    arr.splice(x, 0, char);
    return arr.join('');
}

function unscramble(input, operations) {
    let unscrambled = input;

    operations.reverse().forEach(op => {
        const parts = op.split(' ');
        if (op.startsWith('swap position')) {
            unscrambled = swapPosition(unscrambled, parseInt(parts[2]), parseInt(parts[5]));
        } else if (op.startsWith('swap letter')) {
            unscrambled = swapLetter(unscrambled, parts[2], parts[5]);
        } else if (op.startsWith('rotate left')) {
            unscrambled = rotateRight(unscrambled, parseInt(parts[2]));
        } else if (op.startsWith('rotate right')) {
            unscrambled = rotateLeft(unscrambled, parseInt(parts[2]));
        } else if (op.startsWith('rotate based on position of letter')) {
            unscrambled = rotateBasedOnPositionReverse(unscrambled, parts[6]);
        } else if (op.startsWith('reverse positions')) {
            unscrambled = reversePositions(unscrambled, parseInt(parts[2]), parseInt(parts[4]));
        } else if (op.startsWith('move position')) {
            unscrambled = movePositionReverse(unscrambled, parseInt(parts[2]), parseInt(parts[5]));
        }
    });

    return unscrambled;
}

fs.readFile('Day21.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    const operations = data.trim().split('\r\n');
    const result = unscramble('fbgdceah', operations);
    console.log('Unscrambled password:', result);
});
