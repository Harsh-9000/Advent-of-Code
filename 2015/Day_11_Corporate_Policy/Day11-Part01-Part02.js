function hasIncreasingStraight(str) {
    for (let i = 0; i <= str.length - 3; i++) {
        let firstChar = str.charCodeAt(i);
        let secondChar = str.charCodeAt(i + 1);
        let thirdChar = str.charCodeAt(i + 2);

        if (secondChar === firstChar + 1 && thirdChar === secondChar + 1) {
            return true;
        }
    }
    return false;
}

function hasTwoNonOverlappingPairs(str) {
    let pairs = new Set();
    let i = 0;

    while (i < str.length - 1) {
        if (str[i] === str[i + 1]) {
            pairs.add(str.substring(i, i + 2));
            i += 2;
        } else {
            i++;
        }
        
        if (pairs.size >= 2) {
            return true;
        }
    }
    return false;
}

function containsIOL(str) {
    if (str.includes('i')) {
        return false;
    } else if (str.includes('o')) {
        return false;
    } else if (str.includes('l')) {
        return false;
    }

    return true;
}

function incrementString(str) {
    let arr = str.split('');
    let carry = 1;

    for (let i = arr.length - 1; i >= 0; i--) {
        if (carry === 0) {
            break;
        }

        let newChar = arr[i].charCodeAt(0) + carry;

        if (newChar > 'z'.charCodeAt(0)) {
            arr[i] = 'a';
            carry = 1;
        } else {
            arr[i] = String.fromCharCode(newChar);
            carry = 0;
        }
    }

    if (carry === 1) {
        arr.unshift('a');
    }

    return arr.join('');
}

function password(str) {
    do {
        str = incrementString(str);
    } while (!(hasIncreasingStraight(str) && containsIOL(str) && hasTwoNonOverlappingPairs(str)));

    return str;
}

console.log("Solution: " + password("cqjxxyzz"));
