const fs = require('fs');
const filePath = 'Day07.txt';

function signal(input) {
    let wires = {};

    class Wire {
        constructor(instruction) {
            this.instruction = instruction;
            this.value = undefined;
        }

        getValue() {
            if (this.value === undefined) {
                this.value = this.checkRange(this.calculate());
            }
            return this.value;
        }

        checkRange(i) {
            let n = 65536;
            return ((i % n) + n) % n;
        }

        calculate() {
            const parseValue = key => {
                let i = parseInt(key);
                return isNaN(i) ? wires[key].getValue() : i;
            };

            let assignMatch, opMatch;
            if (assignMatch = /^(NOT )?([0-9]+|[a-z]+)$/.exec(this.instruction)) {
                let value = parseValue(assignMatch[2]);
                if (assignMatch[1]) value = ~value;
                return value;
            } else if (opMatch = /^([a-z]+|[0-9]+) (AND|OR|LSHIFT|RSHIFT) ([a-z]+|[0-9]+)$/.exec(this.instruction)) {
                let left = parseValue(opMatch[1]);
                let right = parseValue(opMatch[3]);
                switch (opMatch[2]) {
                    case 'AND': return left & right;
                    case 'OR': return left | right;
                    case 'LSHIFT': return left << right;
                    case 'RSHIFT': return left >> right;
                }
            }
        }
    }

    input.split('\n').forEach(line => {
        if (line.trim()) {
            let match = /(.*) -> ([a-z]+)/.exec(line);
            if (match) {
                wires[match[2]] = new Wire(match[1]);
            }
        }
    });

    let partOne = wires['a'].getValue();
    console.log('Part One:', partOne);

    Object.keys(wires).forEach(key => {
        wires[key].value = undefined;
    });
    wires['b'].value = partOne;

    let partTwo = wires['a'].getValue();
    console.log('Part Two:', partTwo);
}

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }
    signal(data);
});
