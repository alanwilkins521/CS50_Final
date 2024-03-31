    let totalScore = 0;
    let roundScore = 0;
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
        const straight = false;
    
        // Filter out only the selected dice
        const selectedDice = currentDice.filter(die => die.keep);
    
        // Sort the selected dice values for checking straights
        const sortedDice = selectedDice.map(die => die.value).sort((a, b) => a - b);
        if (sortedDice.join('') === '123456') {
            straight = true;
            roundScore += 1500;
        }
    
        // Count occurrences of each value in selected dice
        const counts = {};
        for (const die of selectedDice) {
            counts[die.value] = counts[die.value] ? counts[die.value] + 1 : 1;
        }

        const pairs = Object.values(counts).filter(count => count === 2).length;
        if (pairs === 3) {
            roundScore += 2500;
        }
    
        // Scoring rules based on selected dice
        for (const [value, count] of Object.entries(counts)) {
            if (count < 3) {
                if (straight = false) {
                    if (value == 1) {
                        roundScore += 100 * count;
                    
                } else if (value == 5) {
                    roundScore += 50 * count;
                }
                }
            }
            if (count == 3) {
                if (value == 1) {
                    roundScore += 1000;
                } else {
                    roundScore += 100 * value;
                }
            }
            if (count == 4) {
                if (pairs === 1) {
                    roundScore += 1500;
                }
                else {
                    roundScore += 1000;
                }

            }
            if (count == 5) {
                roundScore += 2000;
            }
            if (count == 6) {
                roundScore += 3000;
            }
        }
        
    
    
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
        updateScoreDisplay();
        displayDice();
    });

    displayDice();
    updateScoreDisplay();
