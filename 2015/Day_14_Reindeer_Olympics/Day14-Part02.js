const fs = require('fs');

class Reindeer {
    constructor(name, speed, topSpeedDuration, restTime) {
        this.name = name;
        this.speed = parseInt(speed);
        this.topSpeedDuration = parseInt(topSpeedDuration);
        this.restTime = parseInt(restTime);
        this.distance = 0;
        this.points = 0;
        this.timeRemaining = this.topSpeedDuration;
        this.isFlying = true;
    }

    tick() {
        if (this.isFlying) {
            this.distance += this.speed;
            this.timeRemaining--;
            if (this.timeRemaining === 0) {
                this.isFlying = false;
                this.timeRemaining = this.restTime;
            }
        } else {
            this.timeRemaining--;
            if (this.timeRemaining === 0) {
                this.isFlying = true;
                this.timeRemaining = this.topSpeedDuration;
            }
        }
    }
}

function calculateWinningPoints(reindeers, totalTime) {
    for (let i = 0; i < totalTime; i++) {
        reindeers.forEach(reindeer => {
            reindeer.tick();
        });

        let maxDistance = Math.max(...reindeers.map(reindeer => reindeer.distance));

        reindeers.forEach(reindeer => {
            if (reindeer.distance === maxDistance) {
                reindeer.points++;
            }
        });
    }

    let maxPoints = Math.max(...reindeers.map(reindeer => reindeer.points));
    return maxPoints;
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
    const winningPoints = calculateWinningPoints(reindeers, totalTime);

    console.log('Winning Points:', winningPoints);
});
