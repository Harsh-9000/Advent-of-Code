function findFirstValidTime(discs) {
    let time = 0;
    while (true) {
        let allAligned = true;
        for (let i = 0; i < discs.length; i++) {
            const { positions, initial } = discs[i];
            if ((initial + time + i + 1) % positions !== 0) {
                allAligned = false;
                break;
            }
        }
        if (allAligned) {
            return time;
        }
        time++;
    }
}

const discs = [
    { positions: 13, initial: 1 },
    { positions: 19, initial: 10 },
    { positions: 3, initial: 2 },
    { positions: 7, initial: 1 },
    { positions: 5, initial: 3 },
    { positions: 17, initial: 5 },
    { positions: 11, initial: 0 },
];

console.log(findFirstValidTime(discs));
