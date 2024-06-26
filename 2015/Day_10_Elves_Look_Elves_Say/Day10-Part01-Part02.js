function lookAndSay(input) {
    let iterations = 50;
    while (iterations--) {
        let count = 1;
        let temp = "";
        let curr = input[0];

        for (let i = 1; i < input.length; i++) { 
            if (input[i] === input[i - 1]) {
                count++;
            } else {
                temp += count + curr;
                curr = input[i];
                count = 1;
            }
        }
        temp += count + curr;
        input = temp;
    }

    return input.length;
}

console.log(lookAndSay('1113122113'));
