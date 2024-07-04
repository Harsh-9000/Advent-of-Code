const fs = require('fs');

function registerValue(input) {
    const lines = input.split('\r\n');
    let a = 0;
    let b = 0;
    let c = 1; // 0 for Part 1
    let d = 0;

    function getValue(x) {
        if (isNaN(parseInt(x))) {
            return eval(x);
        }
        return parseInt(x);
    }

    for (let i = 0; i < lines.length; i++) {
        let parts = lines[i].split(" ");
        let instruction = parts[0];

        switch (instruction) {
            case "cpy":
                let value = getValue(parts[1]);
                let reg = parts[2];
                if (["a", "b", "c", "d"].includes(reg)) {
                    eval(`${reg} = ${value}`);
                }
                break;

            case "inc":
                let incReg = parts[1];
                if (["a", "b", "c", "d"].includes(incReg)) {
                    eval(`${incReg}++`);
                }
                break;

            case "dec":
                let decReg = parts[1];
                if (["a", "b", "c", "d"].includes(decReg)) {
                    eval(`${decReg}--`);
                }
                break;

            case "jnz":
                let checkValue = getValue(parts[1]);
                let jumpValue = getValue(parts[2]);
                if (checkValue !== 0) {
                    i += jumpValue - 1;
                }
                break;

            default:
                break;
        }
    }

    return a;
}

const filePath = 'Day12.txt';
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    const result = registerValue(data);
    console.log(result);
});
