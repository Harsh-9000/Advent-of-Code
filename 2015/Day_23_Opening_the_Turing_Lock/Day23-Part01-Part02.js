const fs = require('fs');

function registerValue(input) {
    const lines = input.split('\r\n');
    let register;
    let a = 1; // 0 for Part 1
    let b = 0;
    for (let i = 0; i < lines.length; i++) {
        let instruction = lines[i].split(" ")[0];
        switch (instruction) {
            case "hlf":
                register = lines[i].split(" ")[1];
                switch (register) {
                    case "a":
                        a = a / 2;
                        break;

                    case "b":
                        b = b / 2;
                        break;

                    default:
                        break;
                }
                break;

            case "tpl":
                register = lines[i].split(" ")[1];
                switch (register) {
                    case "a":
                        a = a * 3;
                        break;

                    case "b":
                        b = b * 3;
                        break;

                    default:
                        break;
                }
                break;

            case "inc":
                register = lines[i].split(" ")[1];
                switch (register) {
                    case "a":
                        a = a + 1;
                        break;

                    case "b":
                        b = b + 1;
                        break;

                    default:
                        break;
                }
                break;

            case "jmp":
                i = i + parseInt(lines[i].split(" ")[1]) - 1;
                break;

            case "jie":
                register = lines[i].split(" ")[1].slice(0, -1);
                switch (register) {
                    case "a":
                        if (a % 2 === 0) {
                            i = i + parseInt(lines[i].split(" ")[2]) - 1;
                        }
                        break;

                    case "b":
                        if (b % 2 === 0) {
                            i = i + parseInt(lines[i].split(" ")[2]) - 1;
                        }
                        break;

                    default:
                        break;
                }
                break;

            case "jio":
                register = lines[i].split(" ")[1].slice(0, -1);
                switch (register) {
                    case "a":
                        if (a === 1) {
                            i = i + parseInt(lines[i].split(" ")[2]) - 1;
                        }
                        break;

                    case "b":
                        if (b === 1) {
                            i = i + parseInt(lines[i].split(" ")[2]) - 1;
                        }
                        break;

                    default:
                        break;
                }
                break;

            default:
                break;
        }
    }

    return b;
}

const filePath = 'Day23.txt';
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    const result = registerValue(data);
    console.log(result);
});
