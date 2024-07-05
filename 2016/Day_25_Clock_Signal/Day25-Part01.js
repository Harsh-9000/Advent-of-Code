const fs = require('fs');

function assembunnyInterpreter(input, initialA) {
    const lines = input.trim().split('\r\n');
    let registers = { a: initialA, b: 0, c: 0, d: 0 };
    let output = [];
    let maxOutputLength = 100; // Adjust this to detect the pattern

    function getValue(x) {
        if (isNaN(parseInt(x))) {
            return registers[x];
        }
        return parseInt(x);
    }

    function toggleInstruction(instruction) {
        const parts = instruction.split(" ");
        switch (parts.length) {
            case 2:
                return parts[0] === "inc" ? "dec " + parts[1] : "inc " + parts[1];
            case 3:
                return parts[0] === "jnz" ? "cpy " + parts[1] + " " + parts[2] : "jnz " + parts[1] + " " + parts[2];
        }
        return instruction;
    }

    for (let i = 0; i < lines.length;) {
        let parts = lines[i].split(" ");
        let instruction = parts[0];

        switch (instruction) {
            case "cpy":
                let value = getValue(parts[1]);
                let reg = parts[2];
                if (["a", "b", "c", "d"].includes(reg)) {
                    registers[reg] = value;
                }
                break;

            case "inc":
                let incReg = parts[1];
                if (["a", "b", "c", "d"].includes(incReg)) {
                    registers[incReg]++;
                }
                break;

            case "dec":
                let decReg = parts[1];
                if (["a", "b", "c", "d"].includes(decReg)) {
                    registers[decReg]--;
                }
                break;

            case "jnz":
                let checkValue = getValue(parts[1]);
                let jumpValue = getValue(parts[2]);
                if (checkValue !== 0) {
                    i += jumpValue;
                    continue;
                }
                break;

            case "tgl":
                let x = getValue(parts[1]);
                let targetIndex = i + x;
                if (targetIndex >= 0 && targetIndex < lines.length) {
                    lines[targetIndex] = toggleInstruction(lines[targetIndex]);
                }
                break;

            case "out":
                let outValue = getValue(parts[1]);
                output.push(outValue);
                if (output.length > maxOutputLength) {
                    return output;
                }
                break;

            default:
                break;
        }

        i++;
    }

    return output;
}

function isClockSignal(output) {
    for (let i = 0; i < output.length; i++) {
        if (output[i] !== i % 2) {
            return false;
        }
    }
    return true;
}

const filePath = 'Day25.txt';
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    let initialA = 1;
    while (true) {
        const output = assembunnyInterpreter(data, initialA);
        if (isClockSignal(output)) {
            console.log(`The lowest positive integer that generates the clock signal is: ${initialA}`);
            break;
        }
        initialA++;
    }
});
