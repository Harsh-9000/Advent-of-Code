const fs = require('fs');
const filePath = 'Day06.txt';

function lightsLit(input) {
    let matrix = [];
    const size = 1000;
    let totalBrightness = 0;
    let x1 = 0, x2 = 0, y1 = 0, y2 = 0;

    for (let i = 0; i < size; i++) {
        matrix[i] = [];
        for (let j = 0; j < size; j++) {
            matrix[i][j] = 0;
        }
    }

    const lines = input.trim().split('\n');

    lines.forEach(line => {
        instruction = line.split(" ");

        switch (instruction[0]) {
            case "toggle":
                x1 = parseInt(instruction[1].split(",")[0]);
                y1 = parseInt(instruction[1].split(",")[1]);
                x2 = parseInt(instruction[3].split(",")[0]);
                y2 = parseInt(instruction[3].split(",")[1]);
                for (let i = x1; i <= x2; i++) {
                    for (let j = y1; j <= y2; j++) {
                        matrix[i][j] += 2;
                    }
                }
                break;
            case "turn":
                switch (instruction[1]) {
                    case "on":
                        x1 = parseInt(instruction[2].split(",")[0]);
                        y1 = parseInt(instruction[2].split(",")[1]);
                        x2 = parseInt(instruction[4].split(",")[0]);
                        y2 = parseInt(instruction[4].split(",")[1]);
                        for (let i = x1; i <= x2; i++) {
                            for (let j = y1; j <= y2; j++) {
                                matrix[i][j]++;
                            }
                        }
                        break;
                    case "off":
                        x1 = parseInt(instruction[2].split(",")[0]);
                        y1 = parseInt(instruction[2].split(",")[1]);
                        x2 = parseInt(instruction[4].split(",")[0]);
                        y2 = parseInt(instruction[4].split(",")[1]);
                        for (let i = x1; i <= x2; i++) {
                            for (let j = y1; j <= y2; j++) {
                                if (matrix[i][j] > 0) {
                                    matrix[i][j]--;
                                }
                            }
                        }
                        break;
                }
                break
            default:
                console.log("Error");
        }
    });

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            totalBrightness += matrix[i][j];
        }
    }

    return totalBrightness;
}

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    console.log(lightsLit(data));
});