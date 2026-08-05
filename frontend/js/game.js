var currentPuzzle = [];
var solvedPuzzle = [];
var originalPuzzle = [];
var selectedRow = -1;
var selectedCol = -1;
var mistakes = 0;
var hintsLeft = 3;
var score = 1000;
var undoStack = [];
var currentDifficulty = "easy";
var currentMode = "play";
var gameFinished = false;

function hasActivePuzzle() {
    return currentPuzzle.length === 9 && solvedPuzzle.length === 9;
}

function createEmptyBoard() {
    var board = [];

    for (var i = 0; i < 9; i++) {
        board[i] = [];
        for (var j = 0; j < 9; j++) {
            board[i][j] = 0;
        }
    }

    return board;
}

function copyBoard(board) {
    var copy = [];

    for (var i = 0; i < 9; i++) {
        copy[i] = board[i].slice();
    }

    return copy;
}

function shuffleNumbers(numbers, randomFunction) {
    for (var i = numbers.length - 1; i > 0; i--) {
        var j = Math.floor(randomFunction() * (i + 1));
        var temp = numbers[i];
        numbers[i] = numbers[j];
        numbers[j] = temp;
    }

    return numbers;
}

function randomValue() {
    return Math.random();
}

function seededRandom(seed) {
    var value = seed % 2147483647;
    if (value <= 0) {
        value += 2147483646;
    }

    return function () {
        value = value * 16807 % 2147483647;
        return (value - 1) / 2147483646;
    };
}

function isSafe(board, row, col, num) {
    for (var i = 0; i < 9; i++) {
        if (board[row][i] === num) {
            return false;
        }
    }

    for (var j = 0; j < 9; j++) {
        if (board[j][col] === num) {
            return false;
        }
    }

    var startRow = row - row % 3;
    var startCol = col - col % 3;

    for (var r = 0; r < 3; r++) {
        for (var c = 0; c < 3; c++) {
            if (board[startRow + r][startCol + c] === num) {
                return false;
            }
        }
    }

    return true;
}

function fillBoard(board, randomFunction) {
    for (var row = 0; row < 9; row++) {
        for (var col = 0; col < 9; col++) {
            if (board[row][col] === 0) {
                var numbers = shuffleNumbers([1, 2, 3, 4, 5, 6, 7, 8, 9], randomFunction);

                for (var i = 0; i < numbers.length; i++) {
                    var num = numbers[i];

                    if (isSafe(board, row, col, num)) {
                        board[row][col] = num;

                        if (fillBoard(board, randomFunction)) {
                            return true;
                        }

                        board[row][col] = 0;
                    }
                }

                return false;
            }
        }
    }

    return true;
}

function cellsToRemove(difficulty) {
    if (difficulty === "easy") return 30;
    if (difficulty === "medium") return 40;
    return 50;
}

function removeCells(board, count, randomFunction) {
    while (count > 0) {
        var row = Math.floor(randomFunction() * 9);
        var col = Math.floor(randomFunction() * 9);

        if (board[row][col] !== 0) {
            board[row][col] = 0;
            count--;
        }
    }
}

function generateSudoku(difficulty, seed) {
    var randomFunction = seed ? seededRandom(seed) : randomValue;
    var solution = createEmptyBoard();
    fillBoard(solution, randomFunction);

    var puzzle = copyBoard(solution);
    removeCells(puzzle, cellsToRemove(difficulty), randomFunction);

    return {
        puzzle: puzzle,
        solution: solution
    };
}

function renderBoard() {
    var grid = document.getElementById("sudokuGrid");
    if (!grid) return;

    grid.innerHTML = "";

    for (var row = 0; row < 9; row++) {
        for (var col = 0; col < 9; col++) {
            var cell = document.createElement("button");
            cell.className = "cell";
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.textContent = currentPuzzle[row][col] === 0 ? "" : currentPuzzle[row][col];

            if (originalPuzzle[row][col] !== 0) {
                cell.classList.add("fixed");
            }

            if (row === selectedRow && col === selectedCol) {
                cell.classList.add("selected");
            } else if (selectedRow >= 0 && currentPuzzle[row][col] !== 0 &&
                currentPuzzle[row][col] === currentPuzzle[selectedRow][selectedCol]) {
                cell.classList.add("same");
            }

            if (currentPuzzle[row][col] !== 0 && currentPuzzle[row][col] !== solvedPuzzle[row][col]) {
                cell.classList.add("wrong");
            }

            cell.addEventListener("click", selectCell);
            grid.appendChild(cell);
        }
    }
}

function selectCell(event) {
    selectedRow = Number(event.target.dataset.row);
    selectedCol = Number(event.target.dataset.col);
    renderBoard();
}

function updateGameInfo() {
    var difficulty = document.getElementById("difficultyLabel");
    var mistakesBox = document.getElementById("mistakesLabel");
    var hintsBox = document.getElementById("hintsLabel");
    var scoreBox = document.getElementById("scoreLabel");

    if (difficulty) difficulty.textContent = currentDifficulty.toUpperCase();
    if (mistakesBox) mistakesBox.textContent = mistakes;
    if (hintsBox) hintsBox.textContent = hintsLeft;
    if (scoreBox) scoreBox.textContent = score;
}

function showMessage(text, danger) {
    var message = document.getElementById("gameMessage");
    if (!message) return;

    message.textContent = text;
    message.classList.toggle("danger-text", !!danger);
}

function placeNumber(num) {
    if (selectedRow < 0 || selectedCol < 0 || gameFinished) {
        return;
    }

    if (originalPuzzle[selectedRow][selectedCol] !== 0) {
        showMessage("Original numbers cannot be changed.", true);
        return;
    }

    undoStack.push({
        row: selectedRow,
        col: selectedCol,
        oldValue: currentPuzzle[selectedRow][selectedCol]
    });

    currentPuzzle[selectedRow][selectedCol] = num;

    if (num !== 0 && num !== solvedPuzzle[selectedRow][selectedCol]) {
        mistakes++;
        score = Math.max(0, score - 50);
        showMessage("That number does not fit here.", true);

        if (mistakes >= 3) {
            finishGame(false);
        }
    } else {
        showMessage("");
    }

    renderBoard();
    updateGameInfo();
}

function useHint() {
    if (!hasActivePuzzle() || selectedRow < 0 || selectedCol < 0 || hintsLeft <= 0 || gameFinished) {
        return;
    }

    if (originalPuzzle[selectedRow][selectedCol] !== 0 || currentPuzzle[selectedRow][selectedCol] !== 0) {
        return;
    }

    undoStack.push({ row: selectedRow, col: selectedCol, oldValue: 0 });
    currentPuzzle[selectedRow][selectedCol] = solvedPuzzle[selectedRow][selectedCol];
    hintsLeft--;
    score = Math.max(0, score - 100);
    renderBoard();
    updateGameInfo();
}

function undoMove() {
    if (!hasActivePuzzle() || undoStack.length === 0 || gameFinished) {
        return;
    }

    var move = undoStack.pop();
    currentPuzzle[move.row][move.col] = move.oldValue;
    renderBoard();
}

function isCompleteAndCorrect() {
    if (!hasActivePuzzle()) {
        return false;
    }

    for (var row = 0; row < 9; row++) {
        for (var col = 0; col < 9; col++) {
            if (currentPuzzle[row][col] !== solvedPuzzle[row][col]) {
                return false;
            }
        }
    }

    return true;
}

function showConfetti() {
    var colors = ["#2563eb", "#0f9f77", "#f59e0b", "#ef4444", "#8b5cf6"];

    for (var i = 0; i < 70; i++) {
        var piece = document.createElement("div");
        piece.className = "confetti";
        piece.style.left = Math.random() * 100 + "vw";
        piece.style.background = colors[i % colors.length];
        piece.style.animationDelay = Math.random() * 0.6 + "s";
        document.body.appendChild(piece);

        setTimeout(function (element) {
            element.remove();
        }, 2400, piece);
    }
}

function finishGame(won) {
    if (gameFinished) {
        return;
    }

    gameFinished = true;
    SudokuTimer.stop();
    recordGameResult(currentDifficulty, won, SudokuTimer.getSeconds(), mistakes, currentMode === "daily");

    if (won && currentMode === "daily") {
        var dailyStatus = getDailyStatus();
        dailyStatus[currentDifficulty] = true;
        saveDailyStatus(dailyStatus);

        if (typeof renderDailyOptions === "function") {
            renderDailyOptions();
        }
    }

    if (won) {
        document.getElementById("sudokuGrid").classList.add("win");
        showConfetti();
        showMessage("Puzzle completed. Great solve!");
    } else {
        showMessage("Game over. Too many mistakes.", true);
    }
}

function submitGame() {
    if (isCompleteAndCorrect()) {
        finishGame(true);
    } else {
        showMessage("Some cells are still empty or incorrect.", true);
    }
}

function solveCurrentGame() {
    if (!hasActivePuzzle()) {
        return;
    }

    currentPuzzle = copyBoard(solvedPuzzle);
    SudokuTimer.stop();
    gameFinished = true;
    renderBoard();
    showMessage("Solution displayed.");
}

function restartGame() {
    if (!hasActivePuzzle()) {
        return;
    }

    if (currentMode === "daily" && getDailyStatus()[currentDifficulty]) {
        showMessage("This daily challenge is already completed. Come back tomorrow.");
        return;
    }

    currentPuzzle = copyBoard(originalPuzzle);
    mistakes = 0;
    hintsLeft = 3;
    score = 1000;
    undoStack = [];
    selectedRow = -1;
    selectedCol = -1;
    gameFinished = false;
    SudokuTimer.start("timerLabel");
    showMessage("");
    renderBoard();
    updateGameInfo();
}

function startGame(difficulty, options) {
    options = options || {};
    currentDifficulty = difficulty;
    currentMode = options.mode || "play";

    var generated = options.generated || generateSudoku(difficulty, options.seed);
    currentPuzzle = copyBoard(generated.puzzle);
    solvedPuzzle = copyBoard(generated.solution);
    originalPuzzle = copyBoard(generated.puzzle);

    mistakes = 0;
    hintsLeft = 3;
    score = 1000;
    undoStack = [];
    selectedRow = -1;
    selectedCol = -1;
    gameFinished = false;

    SudokuTimer.start("timerLabel");
    renderBoard();
    updateGameInfo();
    showMessage("");
}

function buildNumberPad() {
    var pad = document.getElementById("numberPad");
    if (!pad) return;

    pad.innerHTML = "";

    for (var i = 1; i <= 9; i++) {
        var button = document.createElement("button");
        button.className = "btn";
        button.textContent = i;
        button.addEventListener("click", function (event) {
            placeNumber(Number(event.target.textContent));
        });
        pad.appendChild(button);
    }

    var clear = document.createElement("button");
    clear.className = "btn";
    clear.textContent = "Clear";
    clear.addEventListener("click", function () {
        placeNumber(0);
    });
    pad.appendChild(clear);
}

function bindGameControls() {
    var difficultySelect = document.getElementById("difficultySelect");
    var newGameButton = document.getElementById("newGameButton");
    var hintButton = document.getElementById("hintButton");
    var undoButton = document.getElementById("undoButton");
    var restartButton = document.getElementById("restartButton");
    var submitButton = document.getElementById("submitButton");
    var solveButton = document.getElementById("solveButton");

    if (newGameButton) {
        newGameButton.addEventListener("click", function () {
            startGame(difficultySelect ? difficultySelect.value : "easy");
        });
    }

    if (hintButton) hintButton.addEventListener("click", useHint);
    if (undoButton) undoButton.addEventListener("click", undoMove);
    if (restartButton) restartButton.addEventListener("click", restartGame);
    if (submitButton) submitButton.addEventListener("click", submitGame);
    if (solveButton) solveButton.addEventListener("click", solveCurrentGame);

    document.addEventListener("keydown", function (event) {
        if (event.key >= "1" && event.key <= "9") {
            placeNumber(Number(event.key));
        }

        if (event.key === "Backspace" || event.key === "Delete") {
            placeNumber(0);
        }
    });
}

document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("sudokuGrid") && document.body.dataset.page === "game") {
        buildNumberPad();
        bindGameControls();
        startGame("easy");
    }
});
