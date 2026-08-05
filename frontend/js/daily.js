function dateSeedForDifficulty(difficulty) {
    var date = todayString().replaceAll("-", "");
    var bonus = difficulty === "easy" ? 11 : difficulty === "medium" ? 37 : 73;
    return Number(date) + bonus;
}

function renderDailyOptions() {
    var list = document.getElementById("dailyList");
    if (!list) return;

    var status = getDailyStatus();
    var difficulties = ["easy", "medium", "hard"];

    list.innerHTML = difficulties.map(function (difficulty) {
        var completed = status[difficulty];
        var label = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);

        if (completed) {
            return "<div class='daily-item'><div><h3>" + label +
                " Challenge Completed</h3><p>Come Back Tomorrow</p></div><button class='btn' disabled>Done</button></div>";
        }

        return "<div class='daily-item'><div><h3>" + label +
            " Challenge</h3><p>Today's puzzle is ready.</p></div><button class='btn primary daily-start' data-difficulty='" +
            difficulty + "'>Start</button></div>";
    }).join("");

    var buttons = document.querySelectorAll(".daily-start");
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", function (event) {
            var difficulty = event.target.dataset.difficulty;
            var generated = generateSudoku(difficulty, dateSeedForDifficulty(difficulty));
            startGame(difficulty, { mode: "daily", generated: generated });
            showMessage("Daily " + difficulty + " challenge started.");
            document.getElementById("playArea").scrollIntoView({ behavior: "smooth" });
        });
    }
}

document.addEventListener("DOMContentLoaded", function () {
    if (document.body.dataset.page === "daily") {
        buildNumberPad();
        bindGameControls();
        renderDailyOptions();
    }
});
