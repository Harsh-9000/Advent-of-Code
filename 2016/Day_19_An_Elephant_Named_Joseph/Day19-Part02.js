function winner(n) {
    let w = 1;

    for (let i = 1; i < n; i++) {
        w = w % i + 1;

        if (w > (i + 1) / 2) {
            w++;
        }
    }

    return w;
}

console.log(winner(3001330));
