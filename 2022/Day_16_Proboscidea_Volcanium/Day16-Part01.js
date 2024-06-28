const fs = require('fs');

let nodes = [], nodeByName = {};

const activeNodes = () => nodes.filter(n => n.rate > 0);

const distanceMap = (startName, distances = {}) => {
    if (nodeByName[startName].distanceMap) return nodeByName[startName].distanceMap;
    const spread = (name, steps) => {
        if (distances[name] != undefined && distances[name] <= steps) return;
        distances[name] = steps;
        nodeByName[name].connections.forEach(n => spread(n, steps + 1));
    }
    spread(startName, 0);
    nodeByName[startName].distanceMap = distances;
    return distances;
}

const computePaths = (timeLeft) => {
    let paths = [{
        curr: 'AA',
        active: activeNodes().map(n => n.name),
        timeLeft: timeLeft,
        finished: false,
        steps: [],
        releasedPressure: 0
    }];
    let max = 0;

    for (let n = 0; n < paths.length; n++) {
        let path = paths[n];
        if (path.timeLeft <= 0) path.finished = true;
        if (path.finished) continue;

        let distances = distanceMap(path.curr), moved = false;
        path.active.forEach(act => {
            if (act == path.curr) return true;
            if (path.timeLeft - distances[act] <= 1) return true;
            moved = true;
            paths.push({
                curr: act,
                active: path.active.filter(v => v != act),
                timeLeft: path.timeLeft - distances[act] - 1,
                finished: false,
                steps: [...path.steps, act],
                releasedPressure: path.releasedPressure + (path.timeLeft - distances[act] - 1) * nodeByName[act].rate
            });
        });
        if (!moved) path.finished = true;
        if (path.finished && path.releasedPressure > max) max = path.releasedPressure;
    }

    return paths.filter(p => p.finished).sort((a, b) => b.releasedPressure - a.releasedPressure);
}

const part1 = () => {
    return computePaths(30)[0].releasedPressure;
}

const filePath = 'Day16.txt';
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    nodes = data.trim().split("\n").map((row, id) => {
        let tmp = row.split(' ');
        return {
            id: id,
            name: tmp[1],
            rate: Number(tmp[4].match(/\d+/g)[0]),
            connections: tmp.slice(tmp.indexOf('to') + 2).map(v => v.substr(0, 2))
        };
    });

    nodes.forEach((n, i) => nodeByName[n.name] = n);

    console.log(part1());
});
