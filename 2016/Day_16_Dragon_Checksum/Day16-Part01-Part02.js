function dragonCurve(data) {
    let b = data.split("").reverse().map(char => char === "0" ? "1" : "0").join("");
    return data + "0" + b;
}

function generateData(initialState, length) {
    let data = initialState;
    while (data.length < length) {
        data = dragonCurve(data);
    }
    return data.slice(0, length);
}

function calculateChecksum(data) {
    let checksum = data;
    while (checksum.length % 2 === 0) {
        let tempChecksum = "";
        for (let i = 0; i < checksum.length; i += 2) {
            if (checksum[i] === checksum[i + 1]) {
                tempChecksum += "1";
            } else {
                tempChecksum += "0";
            }
        }
        checksum = tempChecksum;
    }
    return checksum;
}

function findChecksum(initialState, length) {
    const data = generateData(initialState, length);
    const checksum = calculateChecksum(data);
    return checksum;
}

const initialState = "00111101111101000";
const diskLength = 35651584;
const checksum = findChecksum(initialState, diskLength);
console.log(checksum);
