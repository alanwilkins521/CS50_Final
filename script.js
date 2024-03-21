let roundScore = 0;
let totalScore = 0;
let cpuScore = 0;
let currentDice = [];


function rollDie() {
    return Math.floor(Math.random() * 6) + 1;
}

function rollAllDice() {
    let dice = [];
    for (let i = 0; i < 6; i++) {
        if (!currentDice[i].keep) {
            dice.push(rollDie());
        }
        else {
            dice.push(currentDice[i].value);
        }
    }
    return dice;
}

function displayDice() {
    const diceContainer = document.getElementById("dice-container");
    diceContainer.innerHTML = "";

    currentDice.forEach((die, index) => {
        const dieImg = document.createElement("img");
        dieImg.src = `Die${die.value}.png`;
        dieImg.classList.add("die");

        if (die.keep) {
            dieImg.classList.add("selected");
        }

        dieImg.addEventListener("click", () => {
            currentDice[index].keep = !currentDice[index].keep;
            displayDice();
        });

        diceContainer.appendChild(dieImg);
    });
}

function updateScoreDisplay() {
    const currentScoreElement = document.getElementById("round_score");
    const totalScoreElement = document.getElementById("total_score");
    const cpuScoreElement = document.getElementById("cpu_score");

    currentScoreElement.innerHTML = roundScore;
    totalScoreElement.innerHTML = totalScore;
    cpuScoreElement.innerHTML = cpuScore;
}

function rollDice() {
    currentDice = [
        { value: rollDie(), keep: false },
        { value: rollDie(), keep: false },
        { value: rollDie(), keep: false },
        { value: rollDie(), keep: false },
        { value: rollDie(), keep: false },
        { value: rollDie(), keep: false }
    ];
    displayDice();

    const rollSound = new Audio("dice-rolling.mp3");
    rollSound.play();
}

document.getElementById("roll").addEventListener("click",rollDice);
updateScoreDisplay();