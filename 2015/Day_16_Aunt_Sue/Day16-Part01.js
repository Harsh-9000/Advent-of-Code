function countCombinations(target, containers) {
    let memo = {};

    function countHelper(target, index) {
        if (target === 0) return 1;
        if (target < 0 || index >= containers.length) return 0;

        if (memo.hasOwnProperty(`${target}-${index}`)) {
            return memo[`${target}-${index}`];
        }

        let includeCurrent = countHelper(target - containers[index], index + 1);
        let excludeCurrent = countHelper(target, index + 1);

        let total = includeCurrent + excludeCurrent;
        memo[`${target}-${index}`] = total;

        return total;
    }

    return countHelper(target, 0);
}

const containers = [50, 44, 11, 49, 42, 46, 18, 32, 26, 40, 21, 7, 18, 43, 10, 47, 36, 24, 22, 40];
const target = 150;

console.log(`Number of combinations: ${countCombinations(target, containers)}`);
