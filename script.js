let round_score = 0;
let total_score = 0;
let cpu_score = 0;

function updateScoreDisplay() {
    const currentScoreElement = document.getElementById("round_score");
    const totalScoreElement = document.getElementById("total_score");
    const cpuScoreElement = document.getElementById("cpu_score");

    currentScoreElement.innerHTML = round_score;
    totalScoreElement.innerHTML = total_score;
    cpuScoreElement.innerHTML = cpu_score;
}

updateScoreDisplay();