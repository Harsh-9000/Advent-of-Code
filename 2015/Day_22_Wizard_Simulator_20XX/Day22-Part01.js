class State {
    constructor(playerHP, playerMana, bossHP, bossDamage, manaSpent, shieldTimer, poisonTimer, rechargeTimer, playerArmor) {
        this.playerHP = playerHP;
        this.playerMana = playerMana;
        this.bossHP = bossHP;
        this.bossDamage = bossDamage;
        this.manaSpent = manaSpent;
        this.shieldTimer = shieldTimer;
        this.poisonTimer = poisonTimer;
        this.rechargeTimer = rechargeTimer;
        this.playerArmor = playerArmor;
    }
}

function applyEffects(state) {
    if (state.shieldTimer > 0) {
        state.playerArmor = 7;
        state.shieldTimer--;
    } else {
        state.playerArmor = 0;
    }
    if (state.poisonTimer > 0) {
        state.bossHP -= 3;
        state.poisonTimer--;
    }
    if (state.rechargeTimer > 0) {
        state.playerMana += 101;
        state.rechargeTimer--;
    }
}

function leastManaToWin(playerHP, playerMana, bossHP, bossDamage) {
    let queue = [new State(playerHP, playerMana, bossHP, bossDamage, 0, 0, 0, 0, 0)];
    let minManaSpent = Infinity;

    while (queue.length > 0) {
        let current = queue.shift();

        applyEffects(current);
        if (current.bossHP <= 0) {
            minManaSpent = Math.min(minManaSpent, current.manaSpent);
            continue;
        }

        let availableSpells = [];

        if (current.playerMana >= 53) availableSpells.push('Magic Missile');
        if (current.playerMana >= 73) availableSpells.push('Drain');
        if (current.playerMana >= 113 && current.shieldTimer === 0) availableSpells.push('Shield');
        if (current.playerMana >= 173 && current.poisonTimer === 0) availableSpells.push('Poison');
        if (current.playerMana >= 229 && current.rechargeTimer === 0) availableSpells.push('Recharge');

        for (let spell of availableSpells) {
            let next = new State(current.playerHP, current.playerMana, current.bossHP, current.bossDamage, current.manaSpent, current.shieldTimer, current.poisonTimer, current.rechargeTimer, current.playerArmor);

            switch (spell) {
                case 'Magic Missile':
                    next.playerMana -= 53;
                    next.manaSpent += 53;
                    next.bossHP -= 4;
                    break;
                case 'Drain':
                    next.playerMana -= 73;
                    next.manaSpent += 73;
                    next.bossHP -= 2;
                    next.playerHP += 2;
                    break;
                case 'Shield':
                    next.playerMana -= 113;
                    next.manaSpent += 113;
                    next.shieldTimer = 6;
                    break;
                case 'Poison':
                    next.playerMana -= 173;
                    next.manaSpent += 173;
                    next.poisonTimer = 6;
                    break;
                case 'Recharge':
                    next.playerMana -= 229;
                    next.manaSpent += 229;
                    next.rechargeTimer = 5;
                    break;
            }

            if (next.manaSpent >= minManaSpent) continue;

            applyEffects(next);
            if (next.bossHP <= 0) {
                minManaSpent = Math.min(minManaSpent, next.manaSpent);
                continue;
            }

            let damageTaken = Math.max(1, next.bossDamage - next.playerArmor);
            next.playerHP -= damageTaken;

            if (next.playerHP > 0) {
                queue.push(next);
            }
        }
    }

    return minManaSpent;
}

let playerHP = 50;
let playerMana = 500;
let bossHP = 51;
let bossDamage = 9;

console.log(leastManaToWin(playerHP, playerMana, bossHP, bossDamage));
