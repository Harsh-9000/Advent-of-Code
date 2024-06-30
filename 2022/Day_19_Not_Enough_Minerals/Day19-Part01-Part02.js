const fs = require('fs');

const part1 = (rawInput) => {
    const blueprints = parseInput(rawInput);

    let qualityLevel = 0;
    for (const blueprint of blueprints) {
        qualityLevel += blueprint.number * testBlueprint(blueprint, 24);
    }
    return qualityLevel;
};

const part2 = (rawInput) => {
    const blueprints = parseInput(rawInput);

    let result = 1;
    for (let i = 0; i < 3; i++) {
        result *= testBlueprint(blueprints[i], 32);
    }
    return result;
};

const testBlueprint = (blueprint, time) => {
    let maxRobots = {
        ore: Math.max(
            blueprint.oreCost,
            blueprint.clayCost,
            blueprint.obsidianCost[0],
            blueprint.geodeCost[0]
        ),
        clay: blueprint.obsidianCost[1],
    };

    let maxGeode = 0;
    const search = (time, oreRobots, clayRobots, obsidianRobots, ore, clay, obsidian, geodes) => {
        if (time < 1) return;

        if (geodes + (time * (time + 1)) / 2 < maxGeode) {
            return;
        }
        if (geodes > maxGeode) {
            maxGeode = geodes;
        }

        // Build geode robot
        if (obsidianRobots > 0) {
            let canBuildGeodeNow =
                blueprint.geodeCost[0] <= ore && blueprint.geodeCost[1] <= obsidian;
            let timeSkip =
                1 +
                (canBuildGeodeNow
                    ? 0
                    : Math.max(
                        Math.ceil((blueprint.geodeCost[0] - ore) / oreRobots),
                        Math.ceil((blueprint.geodeCost[1] - obsidian) / obsidianRobots)
                    ));

            search(
                time - timeSkip,
                oreRobots,
                clayRobots,
                obsidianRobots,
                ore + timeSkip * oreRobots - blueprint.geodeCost[0],
                clay + timeSkip * clayRobots,
                obsidian + timeSkip * obsidianRobots - blueprint.geodeCost[1],
                geodes + time - timeSkip
            );

            if (canBuildGeodeNow) return;
        }

        // Build obsidian robot
        if (clayRobots > 0) {
            let canBuildObsidianNow =
                blueprint.obsidianCost[0] <= ore && blueprint.obsidianCost[1] <= clay;
            let timeSkip =
                1 +
                (canBuildObsidianNow
                    ? 0
                    : Math.max(
                        Math.ceil((blueprint.obsidianCost[0] - ore) / oreRobots),
                        Math.ceil((blueprint.obsidianCost[1] - clay) / clayRobots)
                    ));

            if (time - timeSkip > 2) {
                search(
                    time - timeSkip,
                    oreRobots,
                    clayRobots,
                    obsidianRobots + 1,
                    ore + timeSkip * oreRobots - blueprint.obsidianCost[0],
                    clay + timeSkip * clayRobots - blueprint.obsidianCost[1],
                    obsidian + timeSkip * obsidianRobots,
                    geodes
                );
            }
        }

        // Build clay robot
        if (clayRobots < maxRobots.clay) {
            let canBuildClayNow = blueprint.clayCost <= ore;
            let timeSkip =
                1 + (canBuildClayNow ? 0 : Math.ceil((blueprint.clayCost - ore) / oreRobots));

            if (time - timeSkip > 3) {
                search(
                    time - timeSkip,
                    oreRobots,
                    clayRobots + 1,
                    obsidianRobots,
                    ore + timeSkip * oreRobots - blueprint.clayCost,
                    clay + timeSkip * clayRobots,
                    obsidian + timeSkip * obsidianRobots,
                    geodes
                );
            }
        }

        // Build ore robot
        if (oreRobots < maxRobots.ore) {
            let canBuildOreNow = blueprint.oreCost <= ore;
            let timeSkip =
                1 + (canBuildOreNow ? 0 : Math.ceil((blueprint.oreCost - ore) / oreRobots));

            if (time - timeSkip > 4) {
                search(
                    time - timeSkip,
                    oreRobots + 1,
                    clayRobots,
                    obsidianRobots,
                    ore + timeSkip * oreRobots - blueprint.oreCost,
                    clay + timeSkip * clayRobots,
                    obsidian + timeSkip * obsidianRobots,
                    geodes
                );
            }
        }
    };

    search(time, 1, 0, 0, 0, 0, 0, 0);
    console.log('Blueprint max: ' + maxGeode);
    return maxGeode;
};

const parseInput = (rawInput) =>
    rawInput.split('\n').map((blueprint) => {
        let bp = blueprint.match(/\d+/g);
        return new Blueprint(bp[0], bp[1], bp[2], [bp[3], bp[4]], [bp[5], bp[6]]);
    });

class Blueprint {
    constructor(blueprintNum, oreCost, clayCost, obsidianCost, geodeCost) {
        this.number = blueprintNum;
        this.oreCost = oreCost;
        this.clayCost = clayCost;
        this.obsidianCost = obsidianCost;
        this.geodeCost = geodeCost;
    }
}

const rawInput = fs.readFileSync('Day19.txt', 'utf-8');
console.log('Part 1:', part1(rawInput));
console.log('Part 2:', part2(rawInput));
