const fs = require('fs');

const auntSue = {
    children: 3,
    cats: 7,
    samoyeds: 2,
    pomeranians: 3,
    akitas: 0,
    vizslas: 0,
    goldfish: 5,
    trees: 3,
    cars: 2,
    perfumes: 1,
}

function parseInput(input) {
    const aunts = [];
    const descriptions = input.trim().split("\n");

    descriptions.forEach(description => {
        description = description.trim();
        const regex = /^Sue \d+: (.+)$/;
        const match = description.match(regex);

        if (match) {
            const details = match[1].split(',').map(pair => pair.trim());
            const aunt = { id: aunts.length + 1 };

            details.forEach(pair => {
                const [key, value] = pair.split(':').map(item => item.trim());
                aunt[key] = parseInt(value);
            });

            aunts.push(aunt);
        }
    });

    return aunts;
}

function findAuntSue(auntSue, aunts) {
    let bestMatchId = -1;
    let bestMatchCount = -1;

    aunts.forEach((aunt) => {
        let matchCount = 0;

        for (let key in auntSue) {
            if (aunt.hasOwnProperty(key) && aunt[key] === auntSue[key]) {
                matchCount++;
            }
        }

        if (matchCount > bestMatchCount) {
            bestMatchCount = matchCount;
            bestMatchId = aunt.id;
        }
    });

    return bestMatchId;
}

const filePath = 'Day16.txt';
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    let input = parseInput(data);
    console.log(findAuntSue(auntSue, input));
});
