function findCode(row, column) {
    const initialCode = 20151125;
    const multiplier = 252533;
    const modulus = 33554393;

    const diagonalNumber = row + column - 1;
    const position = ((diagonalNumber - 1) * diagonalNumber) / 2 + column;

    let code = initialCode;
    for (let i = 1; i < position; i++) {
        code = (code * multiplier) % modulus;
    }

    return code;
}

const row = 2947;
const column = 3029;
const resultCode = findCode(row, column);

console.log(`The code at row ${row}, column ${column} is ${resultCode}`);
