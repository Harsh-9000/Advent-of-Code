function countCombinations(target, containers, minContainers) {
    let memo = {};

    function countHelper(target, index, currentCount) {
        if (target === 0) return currentCount === minContainers ? 1 : 0;
        if (target < 0 || index >= containers.length) return 0;

        let key = `${target}-${index}-${currentCount}`;
        if (memo.hasOwnProperty(key)) {
            return memo[key];
        }

        let includeCurrent = countHelper(target - containers[index], index + 1, currentCount + 1);
        let excludeCurrent = countHelper(target, index + 1, currentCount);

        let total = includeCurrent + excludeCurrent;
        memo[key] = total;

        return total;
    }

    return countHelper(target, 0, 0);
}

function findMinContainersAndCount(containers, target) {
    let dp = Array(target + 1).fill(Infinity);
    dp[0] = 0;

    for (let i = 0; i < containers.length; i++) {
        for (let j = target; j >= containers[i]; j--) {
            if (dp[j - containers[i]] !== Infinity) {
                dp[j] = Math.min(dp[j], dp[j - containers[i]] + 1);
            }
        }
    }

    const minContainers = dp[target];
    const ways = countCombinations(target, containers, minContainers);

    return { minContainers, ways };
}

const containers = [50, 44, 11, 49, 42, 46, 18, 32, 26, 40, 21, 7, 18, 43, 10, 47, 36, 24, 22, 40];
const target = 150;

const result = findMinContainersAndCount(containers, target);
console.log(`Minimum number of containers: ${result.minContainers}`);
console.log(`Number of ways to achieve this: ${result.ways}`);
