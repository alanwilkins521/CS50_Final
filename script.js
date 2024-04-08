let totalScore = 0;
let roundScore = 0;
let handScore = 0;
let cpuScore = 0;
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
    updateScoreDisplay();
    displayDice();
}

function endTurn() {

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
            calculateScore();
        });

        diceContainer.appendChild(dieImg);
    });
}

function calculateScore() {
    handScore = 0;

    // Filter out only the selected dice
    const selectedDice = currentDice.filter(die => die.keep);

    // Sort the selected dice values for checking straights
    const sortedDice = selectedDice.map(die => die.value).sort((a, b) => a - b);

    if (sortedDice.join('') === '123456') {
        handScore = 1500;
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
        handScore = 1500;
        freshDice();
        return;
    }
    else if (threeOfAKind === 2) {
        handScore = 2500;
        freshDice();
        return;
    }

    for (const value in counts) {
        if (counts[value] === 1) {
            if (value == 1) {
                handScore += 100;
            }
            else if (value == 5) {
                handScore += 50;
            }
        }
        else if (counts[value] === 2) {
            if (value == 1) {
                handScore += 200;
            }
            else if (value == 5) {
                handScore += 100;
            }
        }
        else if (counts[value] === 3) {
            if (value == 1) {
                handScore += 1000;
            }
            else {
                handScore += 100 * value;
            }
        }
        else if (counts[value] === 4) {
            handScore += 1000;
            if (pairs === 1) {
                handScore += 500;
                if (counts[1] === 2) {
                    handScore -= 200;
                }
                else if (counts[5] === 2) {
                    handScore -= 100;
                }
            freshDice();
            }
        }
        else if (counts[value] === 5) {
            handScore += 2000;
        }
        else if (counts[value] === 6) {
            handScore += 3000;
            freshDice();
        }
    }

    updateScoreDisplay();
}


function updateScoreDisplay() {
    const currentScoreElement = document.getElementById("round_score");
    const totalScoreElement = document.getElementById("total_score");
    const cpuScoreElement = document.getElementById("cpu_score");

    currentScoreElement.innerHTML = handScore;
    totalScoreElement.innerHTML = totalScore;
    cpuScoreElement.innerHTML = cpuScore;
}

function initializeGame() {
    for (i = 0; i < 6; i++) {
        currentDice.push({ value: rollDie(), keep: false });
    }
}

document.getElementById("roll").addEventListener("click", function() {
    calculateScore();
    if (currentDice.length == 0) {
        initializeGame();
    }

    else if (handScore === 0) {
        alert("Roll failed to score!");
        currentDice = [];
        rollAllDice();
        updateScoreDisplay();
        displayDice();
    }
    rollAllDice();
});

document.getElementById("pass").addEventListener("click", function() {
    if (handScore < 1000 && totalScore === 0) {
        alert("Failed to reach 1000 points!");
        handScore = 0;
    }
    totalScore += handScore;
    handScore = 0;
    currentDice = [];
    rollAllDice();
    updateScoreDisplay();
    displayDice();
});



displayDice();
updateScoreDisplay();
