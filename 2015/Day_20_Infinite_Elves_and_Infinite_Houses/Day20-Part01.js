function sumOfDivisors(n) {
    let sum = 0;
    for (let i = 1; i <= Math.sqrt(n); i++) {
        if (n % i === 0) {
            sum += i;
            if (i !== n / i) {
                sum += n / i;
            }
        }
    }
    return sum;
}

function findHouse(target) {
    let houseNumber = 1;
    while (true) {
        let presents = sumOfDivisors(houseNumber) * 10;
        if (presents >= target) {
            return houseNumber;
        }
        houseNumber++;
    }
}

const target = 34000000;
const result = findHouse(target);
console.log(`The lowest house number to get at least ${target} presents is: ${result}`);
