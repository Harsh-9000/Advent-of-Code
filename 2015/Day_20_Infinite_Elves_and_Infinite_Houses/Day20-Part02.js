function sumOfDivisorsWithLimit(n, limit) {
    let sum = 0;
    for (let i = 1; i <= Math.sqrt(n); i++) {
        if (n % i === 0) {
            if (i * limit >= n) {
                sum += i;
            }
            if (i !== n / i && (n / i) * limit >= n) {
                sum += n / i;
            }
        }
    }
    return sum;
}

function findHouseWithLimit(target, limit, multiplier) {
    let houseNumber = 1;
    while (true) {
        let presents = sumOfDivisorsWithLimit(houseNumber, limit) * multiplier;
        if (presents >= target) {
            return houseNumber;
        }
        houseNumber++;
        console.log(houseNumber);
    }
}

const target = 34000000;
const result = findHouseWithLimit(target, 50, 11);
console.log(`The lowest house number to get at least ${target} presents is: ${result}`);
