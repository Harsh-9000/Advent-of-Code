const fs = require('fs');

function countSafeTiles(firstRow, totalRows) {
    let currentRow = firstRow;
    let safeTilesCount = 0;

    function getNextRow(previousRow) {
        let newRow = '';
        for (let i = 0; i < previousRow.length; i++) {
            let left = i > 0 ? previousRow[i - 1] : '.';
            let center = previousRow[i];
            let right = i < previousRow.length - 1 ? previousRow[i + 1] : '.';

            if (
                (left === '^' && center === '^' && right === '.') ||
                (left === '.' && center === '^' && right === '^') ||
                (left === '^' && center === '.' && right === '.') ||
                (left === '.' && center === '.' && right === '^')
            ) {
                newRow += '^';
            } else {
                newRow += '.';
            }
        }
        return newRow;
    }

    for (let rowIndex = 0; rowIndex < totalRows; rowIndex++) {
        safeTilesCount += (currentRow.match(/\./g) || []).length;
        currentRow = getNextRow(currentRow);
    }

    return safeTilesCount;
}

const filePath = 'Day18.txt';
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    const totalRows = 400000;
    console.log(countSafeTiles(data, totalRows));
});
