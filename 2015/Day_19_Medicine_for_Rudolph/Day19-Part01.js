const fs = require('fs');

function distinctMolecules(input) {
    const lines = input.trim().split('\r\n');
    const replacements = [];
    let molecule;

    for (const line of lines) {
        if (line.includes('=>')) {
            const [from, to] = line.split(' => ');
            replacements.push({ from, to });
        } else if (line.trim()) {
            molecule = line.trim();
        }
    }

    const distinctMoleculesSet = new Set();

    for (const { from, to } of replacements) {
        let pos = molecule.indexOf(from);
        while (pos !== -1) {
            const newMolecule = molecule.slice(0, pos) + to + molecule.slice(pos + from.length);
            distinctMoleculesSet.add(newMolecule);
            pos = molecule.indexOf(from, pos + 1);
        }
    }

    return distinctMoleculesSet.size;
}

const filePath = 'Day19.txt';
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    const result = distinctMolecules(data);
    console.log(result);
});
