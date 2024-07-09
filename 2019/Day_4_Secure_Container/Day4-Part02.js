function countValidPasswords(start, end) {
    let validPasswordCount = 0;

    for (let num = start; num <= end; num++) {
        if (isValidPassword(num)) {
            validPasswordCount++;
        }
    }

    return validPasswordCount;
}

function isValidPassword(num) {
    const str = num.toString();
    let hasValidDouble = false;
    let neverDecreases = true;

    for (let i = 0; i < str.length - 1; i++) {
        if (str[i] > str[i + 1]) {
            neverDecreases = false;
            break;
        }
    }

    if (neverDecreases) {
        const counts = {};
        for (let i = 0; i < str.length; i++) {
            counts[str[i]] = (counts[str[i]] || 0) + 1;
        }

        hasValidDouble = Object.values(counts).includes(2);
    }

    return hasValidDouble && neverDecreases;
}

const start = 246515;
const end = 739105;
const result = countValidPasswords(start, end);

console.log(`Number of valid passwords: ${result}`);
