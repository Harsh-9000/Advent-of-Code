const fs = require('fs');

class Reindeer {
    constructor(name, speed, topSpeedDuration, restTime) {
        this.name = name;
        this.speed = parseInt(speed);
        this.topSpeedDuration = parseInt(topSpeedDuration);
        this.restTime = parseInt(restTime);
    }

    calculateDistance(totalTime) {
        let cycleDuration = this.topSpeedDuration + this.restTime;
        let fullCycles = Math.floor(totalTime / cycleDuration);
        let remainingTime = totalTime % cycleDuration;

        let distance = fullCycles * this.speed * this.topSpeedDuration;
        distance += Math.min(remainingTime, this.topSpeedDuration) * this.speed;

        return distance;
    }
}

function calculateWinningDistance(reindeers, totalTime) {
    let maxDistance = 0;
    reindeers.forEach(reindeer => {
        let distance = reindeer.calculateDistance(totalTime);
        if (distance > maxDistance) {
            maxDistance = distance;
        }
    });

    return maxDistance;
}

function parseInput(input) {
    const lines = input.trim().split("\n");
    let reindeers = [];
    lines.forEach(line => {
        const parts = line.split(" ");
        const name = parts[0];
        const speed = parts[3];
        const topSpeedDuration = parts[6];
        const restTime = parts[13];
        reindeers.push(new Reindeer(name, speed, topSpeedDuration, restTime));
    });

    return reindeers;
}

const filePath = 'Day14.txt';
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    const reindeers = parseInput(data);
    const totalTime = 2503;
    const winningDistance = calculateWinningDistance(reindeers, totalTime);

    console.log('Winning Distance:', winningDistance);
});
