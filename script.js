let roundScore = 0;
let rollScore = 0;
let highScore = 0;
const rollSound = new Audio("dice-rolling.mp3");
let currentDice = [];

function rollDie() {
    return Math.floor(Math.random() * 6) + 1;
}

function rollAllDice() {
    currentDice.forEach((die) => {
        if (!die.keep) {
            die.value = rollDie();
        }
    });
    displayDice();
    rollSound.play();
}

function freshDice() {
    currentDice.forEach((die) => {
        die.keep = false;
        die.value = rollDie();
    })

    alert("Fresh dice!");
    roundScore += rollScore;
    updateScoreDisplay();
    displayDice();
}


function displayDice() {
    const diceContainer = document.getElementById("dice-container");
    diceContainer.innerHTML = "";

    currentDice.forEach((die ,index) => {
        const dieImg = document.createElement("img");
        dieImg.src = `Die${die.value}.png`;
        dieImg.classList.add("die");

        if (die.keep) {
            dieImg.classList.add("selected");
        }

        dieImg.addEventListener("click", () => {
            currentDice[index].keep = !currentDice[index].keep;
            displayDice();
            calculateRollScore();
            updateScoreDisplay();
        });

        diceContainer.appendChild(dieImg);
    });
}

function calculateRollScore() {
    rollScore = 0;

    // Filter out only the selected dice
    const selectedDice = currentDice.filter(die => die.keep);

    // Sort the selected dice values for checking straights
    const sortedDice = selectedDice.map(die => die.value).sort((a, b) => a - b);

    if (sortedDice.join('') === '123456') {
        rollScore = 1500;
        freshDice();
        return;
    }
    
    // Count occurrences of each value in selected dice
    const counts = {};
    for (const die of selectedDice) {
        counts[die.value] = counts[die.value] ? counts[die.value] + 1 : 1;
    }

    let pairs = 0;
    let threeOfAKind = 0;

    for (const value in counts) {
        if (counts[value] === 2) {
            pairs += 1;
        }
        else if (counts[value] === 3) {
            threeOfAKind += 1;
        }
    }

    if (pairs === 3) {
        rollScore = 1500;
        freshDice();
        return;
    }
    else if (threeOfAKind === 2) {
        rollScore = 2500;
        freshDice();
        return;
    }

    for (const value in counts) {
        if (counts[value] === 1) {
            if (value == 1) {
                rollScore += 100;
            }
            else if (value == 5) {
                rollScore += 50;
            }
        }
        else if (counts[value] === 2) {
            if (value == 1) {
                rollScore += 200;
            }
            else if (value == 5) {
                rollScore += 100;
            }
        }
        else if (counts[value] === 3) {
            if (value == 1) {
                rollScore += 1000;
            }
            else {
                rollScore += 100 * value;
            }
        }
        else if (counts[value] === 4) {
            rollScore += 1000;
            if (pairs === 1) {
                rollScore += 500;
                if (counts[1] === 2) {
                    rollScore -= 200;
                }
                else if (counts[5] === 2) {
                    rollScore -= 100;
                }
            freshDice();
            }
            else if (counts[1] === 1 && counts[5] === 1) {
                freshDice();
            }
        }
        else if (counts[value] === 5) {
            rollScore += 2000;
        }
        else if (counts[value] === 6) {
            rollScore += 3000;
            freshDice();
        }
    }
    updateScoreDisplay();
}

function updateScoreDisplay() {
    const rollScoreElement = document.getElementById("roll_score");
    const roundScoreElement = document.getElementById("round_score");
    const highScoreElement = document.getElementById("high_score");

    rollScoreElement.innerHTML = rollScore;
    roundScoreElement.innerHTML = roundScore;
    highScoreElement.innerHTML = highScore
}

function initializeGame() {
    for (i = 0; i < 6; i++) {
        currentDice.push({ value: rollDie(), keep: false });
    }
    displayDice();
    rollSound.play();
}

document.getElementById("roll").addEventListener("click", function() {
    const unselectedDice = currentDice.filter(die => !die.keep);
    if (currentDice.length == 0) {
        initializeGame();
    }
    else if (rollScore === 0) {
        alert("Roll failed to score!");
        if (roundScore > highScore) {
            highScore = roundScore;
        }
        roundScore = 0;
        currentDice = [];
        updateScoreDisplay();
    }
    else {
        roundScore += rollScore;
        rollScore = 0;
        updateScoreDisplay();
        currentDice = unselectedDice;
        if (currentDice.length === 0) {
            freshDice();
        }
        rollAllDice();
    }
});


displayDice();
updateScoreDisplay();