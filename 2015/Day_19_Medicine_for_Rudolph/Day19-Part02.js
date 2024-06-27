const fs = require('fs');

function parseReplacementsAndMolecule(input) {
    const lines = input.trim().split('\r\n');
    const replacements = [];
    let molecule;

    for (const line of lines) {
        if (line.includes('=>')) {
            const [from, to] = line.split(' => ');
            replacements.push([from, to]);
        } else if (line.trim()) {
            molecule = line.trim();
        }
    }

    return { replacements, molecule };
}

function getMoleculeVariants(molecule, [from, to]) {
    const variants = [];
    let pos = molecule.indexOf(from);

    while (pos !== -1) {
        const newMolecule = molecule.slice(0, pos) + to + molecule.slice(pos + from.length);
        variants.push(newMolecule);
        pos = molecule.indexOf(from, pos + 1);
    }

    return variants;
}

function part2(input) {
    const { replacements, molecule } = parseReplacementsAndMolecule(input);
    const replacementsByLength = replacements.sort(([, x], [, y]) => y.length - x.length);

    let variant = molecule;
    let steps = 0;

    while (variant !== 'e') {
        for (const [from, to] of replacementsByLength) {
            const variants = getMoleculeVariants(variant, [to, from]);
            if (variants.length > 0) {
                variant = variants[0];
                console.log(variant);
                steps += 1;
                break;
            }
        }
    }

    return steps;
}

const filePath = 'Day19.txt';
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    const result = part2(data);
    console.log(result);
});
