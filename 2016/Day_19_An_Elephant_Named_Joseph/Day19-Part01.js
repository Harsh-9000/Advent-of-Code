function winner(n) {
    let binaryStr = n.toString(2);

    if (binaryStr.length === 1) {
        return n;
    }

    let modifiedBinaryStr = binaryStr.slice(1) + binaryStr[0];

    let newNumber = parseInt(modifiedBinaryStr, 2);

    return newNumber;
}

console.log(winner(3001330));
