const crypto = require('crypto');

const input = 'yjdafjpo';

const triples = ['000', '111', '222', '333', '444', '555', '666', '777', '888', '999', 'aaa', 'bbb', 'ccc', 'ddd', 'eee', 'fff'];

const quints = ['00000', '11111', '22222', '33333', '44444', '55555', '66666', '77777', '88888', '99999', 'aaaaa', 'bbbbb', 'ccccc', 'ddddd', 'eeeee', 'fffff'];

const md5map = {};

const repeated_md5 = function (s, n) {
    for (let i = 0; i < n; i++) {
        s = crypto.createHash('md5').update(s).digest('hex');
    }
    return s;
};

const md5hash = function (s) {
    if (md5map[s] === undefined) {
        // Part 1:
        // md5map[s] = repeated_md5(s, 1);
        // Part 2:
        md5map[s] = repeated_md5(s, 2017);
    }
    return md5map[s];
};

const producesKey = function (n) {
    const hash = md5hash(input + n);
    let index = Number.MAX_VALUE;
    let saved_i = 17;

    for (let i = 0; i < 16; i++) {
        const index2 = hash.indexOf(triples[i]);
        if (index2 !== -1 && index2 < index) {
            index = index2;
            saved_i = i;
        }
    }
    if (index < Number.MAX_VALUE) {
        for (let j = 0; j < 1000; j++) {
            const n2 = n + 1 + j;
            const hash2 = md5hash(input + n2);
            if (hash2.indexOf(quints[saved_i]) !== -1) {
                return true;
            }
        }
    }
    return false;
};

let n = 0;
const foundkeys = [];

while (foundkeys.length < 64) {
    if (producesKey(n)) {
        console.log(n);
        foundkeys.push(n);
    }
    n++;
}
