# Sudoku Master

**DSA Based Sudoku Game Using Basic C++**

[Live Website](https://eswar6718.github.io/SudokuMaster/frontend/index.html) |
[Play Sudoku](https://eswar6718.github.io/SudokuMaster/frontend/game.html) |
[Daily Challenge](https://eswar6718.github.io/SudokuMaster/frontend/daily.html)

Sudoku Master is a polished college DSA mini-project that focuses on a clean and explainable C++ implementation of Sudoku generation, validation, and solving. The project also includes a modern static website built with HTML, CSS, and vanilla JavaScript.

The C++ code is intentionally simple and viva-friendly. It uses arrays, loops, functions, classes, objects, recursion, and backtracking without advanced templates, smart pointers, multithreading, or external C++ libraries.

## Project Highlights

- Complete Sudoku generator using recursive backtracking
- Sudoku solver using simple backtracking
- `isSafe(row, col, num)` validation for row, column, and 3 by 3 box
- Easy, Medium, and Hard difficulty levels
- Console-based C++ menu system
- Responsive web version with dark mode
- Daily Challenge with date-based puzzle generation
- Local Storage statistics and achievements
- Timer, score, hints, undo, restart, submit, solve, and new game controls
- GitHub Pages and Vercel-ready static deployment

## Live Demo

Open the deployed website here:

[https://eswar6718.github.io/SudokuMaster/frontend/index.html](https://eswar6718.github.io/SudokuMaster/frontend/index.html)

Quick links:

- [Home](https://eswar6718.github.io/SudokuMaster/frontend/index.html)
- [Play](https://eswar6718.github.io/SudokuMaster/frontend/game.html)
- [Daily Challenge](https://eswar6718.github.io/SudokuMaster/frontend/daily.html)
- [Statistics](https://eswar6718.github.io/SudokuMaster/frontend/stats.html)
- [About](https://eswar6718.github.io/SudokuMaster/frontend/about.html)

## Tech Stack

| Part | Technology |
| --- | --- |
| Core Logic | Basic C++ |
| Algorithms | Recursion and Backtracking |
| Data Structures | 2D Arrays and Vector |
| Website | HTML, CSS, Vanilla JavaScript |
| Storage | Browser Local Storage |
| Deployment | GitHub Pages / Vercel |

## Folder Structure

```text
SudokuMaster/
  backend/
    main.cpp
    board.h
    board.cpp
    generator.h
    generator.cpp
    solver.h
    solver.cpp
    validator.h
    validator.cpp
  frontend/
    index.html
    game.html
    daily.html
    stats.html
    about.html
    css/
      style.css
    js/
      game.js
      daily.js
      storage.js
      timer.js
      theme.js
  CMakeLists.txt
  package.json
  vercel.json
  README.md
```

## DSA Concepts Used

- 2D arrays for representing the Sudoku board
- Functions for separating logic into small reusable blocks
- Classes and objects for board, generator, solver, and validator modules
- Recursion for filling and solving the board
- Backtracking for undoing invalid choices
- Vector for shuffled number lists
- Basic randomization for puzzle generation

## Algorithms

### Sudoku Generation

1. Start with an empty 9 by 9 board.
2. Find an empty cell.
3. Shuffle numbers from 1 to 9.
4. Try each number one by one.
5. Check if the number is valid using `isSafe`.
6. Continue recursively.
7. If no number works, backtrack.
8. After the board is complete, remove cells based on difficulty.

### Sudoku Solving

The solver searches for an empty cell, tries numbers from 1 to 9, validates each number, and recursively continues until the puzzle is solved. If a number leads to a dead end, the solver resets that cell and tries another number.

### Validation

`isSafe(int row, int col, int num)` checks:

- Row repetition
- Column repetition
- 3 by 3 box repetition

## Difficulty Levels

| Difficulty | Cells Removed |
| --- | ---: |
| Easy | 30 |
| Medium | 40 |
| Hard | 50 |

## Console Menu

```text
===== Sudoku Master =====

1. New Easy Game

2. New Medium Game

3. New Hard Game

4. Solve Current Puzzle

5. Exit
```

## Website Features

- Home page with navigation
- Play page with unlimited puzzles
- Daily Challenge page with one Easy, Medium, and Hard puzzle per day
- Statistics page for games played, wins, losses, fastest times, and streaks
- Achievement badges such as First Win, 10 Games, Perfect Game, and Fast Solver
- About page explaining Sudoku, recursion, backtracking, and DSA concepts
- Dark mode and light mode
- Mobile-friendly responsive layout

## Run the C++ Console Version

Using CMake:

```bash
cmake -S . -B build
cmake --build build
```

Run the executable:

```bash
./build/SudokuMaster
```

On Windows, the executable may be:

```bash
./build/SudokuMaster.exe
```

Using g++:

```bash
g++ backend/main.cpp backend/board.cpp backend/generator.cpp backend/solver.cpp backend/validator.cpp -o SudokuMaster
./SudokuMaster
```

## Run the Website Locally

The website is static, so you can open this file directly:

```text
frontend/index.html
```

Or run a local server:

```bash
npm install
npm start
```

## Deploy on Vercel

1. Push the repository to GitHub.
2. Import the repository into Vercel.
3. Keep it as a static project.
4. Vercel uses `vercel.json` to serve the frontend files.

No backend server is required.

## Screenshots

Suggested screenshots to add:

- Home page
- Play page
- Daily Challenge page
- Statistics page
- Dark mode view

## Future Improvements

- Add a unique-solution puzzle checker
- Add note-taking mode
- Add keyboard arrow navigation
- Add difficulty-based scoring improvements
- Add more themes

## License

This project is released under the MIT License.
