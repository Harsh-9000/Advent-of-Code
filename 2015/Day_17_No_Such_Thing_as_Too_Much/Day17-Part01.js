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

function findMinContainers(containers, target) {
    let dp = Array(target + 1).fill(Infinity);
    dp[0] = 0;

    for (let i = 0; i < containers.length; i++) {
        for (let j = containers[i]; j <= target; j++) {
            if (dp[j - containers[i]] !== Infinity) {
                dp[j] = Math.min(dp[j], dp[j - containers[i]] + 1);
            }
        }
    }
    
    let ways = countCombinations(target, containers.filter(c => c <= target));

    return ways;
}

const containers = [50, 44, 11, 49, 42, 46, 18, 32, 26, 40, 21, 7, 18, 43, 10, 47, 36, 24, 22, 40];
const target = 150;

const ways = findMinContainers(containers, target);
console.log(`Number of ways with minimum containers: ${ways}`);
