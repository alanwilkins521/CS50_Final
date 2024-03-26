let totalScore = 0;
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
    roundScore = 0;
    keptDie = 0;
    currentDice.forEach((die) => {
        if (die.keep) {
            keptDie += 1;
            if (die.value === 5) {
                roundScore += 50;
                
            }
            else if (die.value === 1) {
                roundScore += 100;
            }
        }
    }
    );
    updateScoreDisplay();
    }


function updateScoreDisplay() {
    const currentScoreElement = document.getElementById("round_score");
    const totalScoreElement = document.getElementById("total_score");
    const cpuScoreElement = document.getElementById("cpu_score");

    currentScoreElement.innerHTML = roundScore;
    totalScoreElement.innerHTML = totalScore;
    cpuScoreElement.innerHTML = cpuScore;
}

function initializeGame() {
    for (i = 0; i < 6; i++) {
        currentDice.push({ value: rollDie(), keep: false });
    }
}

document.getElementById("roll").addEventListener("click", function() {
    if (currentDice.length == 0) {
        initializeGame();
    }
    rollAllDice();
});

document.getElementById("pass").addEventListener("click", function() {
    totalScore += roundScore;
    roundScore = 0;
    currentDice = [];
    rollAllDice();
    displayDice();
});

displayDice();
updateScoreDisplay();
