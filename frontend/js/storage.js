var STORAGE_KEYS = {
    stats: "sudokuStats",
    daily: "sudokuDaily",
    achievements: "sudokuAchievements"
};

var ACHIEVEMENTS = [
    { id: "firstWin", name: "First Win", text: "Complete your first puzzle." },
    { id: "tenGames", name: "10 Games", text: "Play 10 games." },
    { id: "twentyFiveGames", name: "25 Games", text: "Play 25 games." },
    { id: "fiftyGames", name: "50 Games", text: "Play 50 games." },
    { id: "hundredGames", name: "100 Games", text: "Play 100 games." },
    { id: "sevenDayStreak", name: "7-Day Streak", text: "Finish daily challenges for 7 days." },
    { id: "thirtyDayStreak", name: "30-Day Streak", text: "Finish daily challenges for 30 days." },
    { id: "perfectGame", name: "Perfect Game", text: "Win without mistakes." },
    { id: "fastSolver", name: "Fast Solver", text: "Win any puzzle under 5 minutes." }
];

function todayString() {
    var date = new Date();
    var year = date.getFullYear();
    var month = String(date.getMonth() + 1).padStart(2, "0");
    var day = String(date.getDate()).padStart(2, "0");
    return year + "-" + month + "-" + day;
}

function defaultStats() {
    return {
        gamesPlayed: 0,
        gamesWon: 0,
        gamesLost: 0,
        totalTime: 0,
        fastestEasy: 0,
        fastestMedium: 0,
        fastestHard: 0,
        currentDailyStreak: 0,
        longestDailyStreak: 0,
        lastDailyWinDate: ""
    };
}

function getStats() {
    var stats = JSON.parse(localStorage.getItem(STORAGE_KEYS.stats));
    return stats || defaultStats();
}

function saveStats(stats) {
    localStorage.setItem(STORAGE_KEYS.stats, JSON.stringify(stats));
}

function getAchievements() {
    var data = JSON.parse(localStorage.getItem(STORAGE_KEYS.achievements));
    return data || {};
}

function saveAchievements(data) {
    localStorage.setItem(STORAGE_KEYS.achievements, JSON.stringify(data));
}

function getDailyStatus() {
    var status = JSON.parse(localStorage.getItem(STORAGE_KEYS.daily));
    var today = todayString();

    if (!status || status.date !== today) {
        status = { date: today, easy: false, medium: false, hard: false };
        localStorage.setItem(STORAGE_KEYS.daily, JSON.stringify(status));
    }

    return status;
}

function saveDailyStatus(status) {
    localStorage.setItem(STORAGE_KEYS.daily, JSON.stringify(status));
}

function daysBetween(first, second) {
    var a = new Date(first + "T00:00:00");
    var b = new Date(second + "T00:00:00");
    return Math.round((b - a) / 86400000);
}

function updateFastest(stats, difficulty, seconds) {
    var key = "fastest" + difficulty.charAt(0).toUpperCase() + difficulty.slice(1);

    if (!stats[key] || seconds < stats[key]) {
        stats[key] = seconds;
    }
}

function recordGameResult(difficulty, won, seconds, mistakes, isDaily) {
    var stats = getStats();
    var achievements = getAchievements();

    stats.gamesPlayed++;

    if (won) {
        stats.gamesWon++;
        stats.totalTime += seconds;
        updateFastest(stats, difficulty, seconds);
        achievements.firstWin = true;

        if (mistakes === 0) {
            achievements.perfectGame = true;
        }

        if (seconds < 300) {
            achievements.fastSolver = true;
        }
    } else {
        stats.gamesLost++;
    }

    if (stats.gamesPlayed >= 10) achievements.tenGames = true;
    if (stats.gamesPlayed >= 25) achievements.twentyFiveGames = true;
    if (stats.gamesPlayed >= 50) achievements.fiftyGames = true;
    if (stats.gamesPlayed >= 100) achievements.hundredGames = true;

    if (won && isDaily) {
        var today = todayString();

        if (stats.lastDailyWinDate !== today) {
            if (stats.lastDailyWinDate && daysBetween(stats.lastDailyWinDate, today) === 1) {
                stats.currentDailyStreak++;
            } else {
                stats.currentDailyStreak = 1;
            }

            stats.lastDailyWinDate = today;
            stats.longestDailyStreak = Math.max(stats.longestDailyStreak, stats.currentDailyStreak);
        }

        if (stats.currentDailyStreak >= 7) achievements.sevenDayStreak = true;
        if (stats.currentDailyStreak >= 30) achievements.thirtyDayStreak = true;
    }

    saveStats(stats);
    saveAchievements(achievements);
}

function formatTime(totalSeconds) {
    if (!totalSeconds) {
        return "--";
    }

    var minutes = Math.floor(totalSeconds / 60);
    var seconds = totalSeconds % 60;
    return String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0");
}

function renderStatistics() {
    var stats = getStats();
    var achievements = getAchievements();
    var average = stats.gamesWon ? Math.round(stats.totalTime / stats.gamesWon) : 0;

    var statsBox = document.getElementById("statsGrid");
    if (statsBox) {
        statsBox.innerHTML = [
            ["Games Played", stats.gamesPlayed],
            ["Games Won", stats.gamesWon],
            ["Games Lost", stats.gamesLost],
            ["Average Time", formatTime(average)],
            ["Fastest Easy", formatTime(stats.fastestEasy)],
            ["Fastest Medium", formatTime(stats.fastestMedium)],
            ["Fastest Hard", formatTime(stats.fastestHard)],
            ["Current Daily Streak", stats.currentDailyStreak],
            ["Longest Daily Streak", stats.longestDailyStreak]
        ].map(function (item) {
            return "<div class='stat-card'><span>" + item[0] + "</span><strong>" + item[1] + "</strong></div>";
        }).join("");
    }

    var achievementBox = document.getElementById("achievementGrid");
    if (achievementBox) {
        achievementBox.innerHTML = ACHIEVEMENTS.map(function (item) {
            var unlocked = achievements[item.id];
            return "<div class='achievement " + (unlocked ? "" : "locked") + "'><h3>" +
                (unlocked ? "[Unlocked] " : "[Locked] ") + item.name + "</h3><p>" + item.text + "</p></div>";
        }).join("");
    }
}

document.addEventListener("DOMContentLoaded", renderStatistics);
