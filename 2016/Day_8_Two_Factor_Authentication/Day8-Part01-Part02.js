const fs = require('fs');

function printScreen(screen) {
    for (let i = 0; i < screen.length; i++) {
        console.log(screen[i].join(' '));
    }
    console.log("");
}

function countLitPixels(screen) {
    let count = 0;

    for (let i = 0; i < screen.length; i++) {
        for (let j = 0; j < screen[0].length; j++) {
            if (screen[i][j] === "#") {
                count++;
            }
        }
    }

    return count;
}

function screenDisplay(input) {
    const operations = input.split("\r\n");
    let screen = [];
    const rows = 6;
    const columns = 50

    for (let i = 0; i < rows; i++) {
        let arr = [];
        for (let j = 0; j < columns; j++) {
            arr.push('.');
        }
        screen.push(arr);
    }

    operations.forEach(operation => {
        const action = operation.split(" ")[0];

        if (action === "rect") {
            let rows = parseInt(operation.split(" ")[1].split("x")[0]);
            let columns = parseInt(operation.split(" ")[1].split("x")[1]);
            for (let i = 0; i < columns; i++) {
                for (let j = 0; j < rows; j++) {
                    screen[i][j] = "#";
                }
            }
        } else if (action === "rotate") {
            let rowOrColumn = operation.split(" ")[1];
            let index = parseInt(operation.split("=")[1].split(" ")[0]);
            let shift = parseInt(operation.split("by ")[1]);

            if (rowOrColumn === "row") {
                let newRow = new Array(columns);
                for (let i = 0; i < columns; i++) {
                    newRow[(i + shift) % columns] = screen[index][i];
                }
                screen[index] = newRow;
            } else if (rowOrColumn === "column") {
                let newCol = new Array(rows);
                for (let i = 0; i < rows; i++) {
                    newCol[(i + shift) % rows] = screen[i][index];
                }
                for (let i = 0; i < rows; i++) {
                    screen[i][index] = newCol[i];
                }
            }
        }
        // printScreen(screen);
    });

    printScreen(screen);

    return countLitPixels(screen);
}

const filePath = 'Day8.txt';
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    console.log(screenDisplay(data));
});
