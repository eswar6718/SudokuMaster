function applyTheme() {
    var theme = localStorage.getItem("sudokuTheme") || "light";
    document.body.classList.toggle("dark", theme === "dark");

    var button = document.getElementById("themeToggle");
    if (button) {
        button.textContent = theme === "dark" ? "Light" : "Dark";
        button.title = theme === "dark" ? "Light mode" : "Dark mode";
    }
}

function toggleTheme() {
    var isDark = document.body.classList.contains("dark");
    localStorage.setItem("sudokuTheme", isDark ? "light" : "dark");
    applyTheme();
}

document.addEventListener("DOMContentLoaded", function () {
    applyTheme();

    var button = document.getElementById("themeToggle");
    if (button) {
        button.addEventListener("click", toggleTheme);
    }
});
