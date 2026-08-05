# Sudoku Master - DSA Based Sudoku Game Using Basic C++

Sudoku Master is a college DSA mini-project that demonstrates Sudoku generation and solving using simple C++ concepts such as 2D arrays, classes, functions, recursion, and backtracking. It also includes a modern static website built with HTML, CSS, and vanilla JavaScript.

## Features

- Modular C++ console project
- Valid Sudoku board generation
- Recursive backtracking Sudoku solver
- Row, column, and 3 by 3 box validation
- Easy, Medium, and Hard difficulty levels
- Static responsive website
- Unlimited play mode
- Daily challenge mode
- Local Storage statistics
- Achievement badges
- Dark mode and light mode
- Confetti and winning animation
- Vercel-ready deployment files

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
README.md
CMakeLists.txt
package.json
vercel.json
```

## Algorithms Used

### Sudoku Generation

1. Start with an empty 9 by 9 board.
2. Find an empty cell.
3. Shuffle numbers from 1 to 9.
4. Try each number.
5. Check whether the number is safe.
6. Continue recursively.
7. If no number works, backtrack.
8. After a full board is created, remove cells according to difficulty.

### Sudoku Solving

The solver uses recursive backtracking. It searches for an empty cell, tries numbers from 1 to 9, checks each number using `isSafe`, and continues until the board is solved.

### Validation

`isSafe(int row, int col, int num)` checks:

- The selected row
- The selected column
- The related 3 by 3 box

## DSA Concepts

- 2D arrays
- Recursion
- Backtracking
- Functions
- Classes and objects
- Vectors
- Random shuffling
- Modular programming

## Screenshots

Add screenshots after running the website locally or deploying it on Vercel.

Recommended screenshots:

- Home page
- Play page
- Daily challenge page
- Statistics page
- Dark mode view

## Installation

Clone or download the repository, then open the `SudokuMaster` folder.

```bash
cd SudokuMaster
```

## Compile the C++ Code

Using CMake:

```bash
cmake -S . -B build
cmake --build build
```

Using g++:

```bash
g++ backend/main.cpp backend/board.cpp backend/generator.cpp backend/solver.cpp backend/validator.cpp -o SudokuMaster
```

## Run the Console Version

After compiling with CMake:

```bash
./build/SudokuMaster
```

On Windows, the executable may be:

```bash
./build/Debug/SudokuMaster.exe
```

## Run the Website

The website is fully static. Open this file directly in a browser:

```text
frontend/index.html
```

Optional local server:

```bash
npm install
npm start
```

## Deploy on Vercel

1. Push this project to GitHub.
2. Import the repository into Vercel.
3. Keep the default static deployment settings.
4. Vercel will use `vercel.json` to serve the `frontend` folder.

No backend server is required for deployment.

## Future Improvements

- Add a puzzle uniqueness check
- Add note-taking mode
- Add keyboard navigation
- Add downloadable game reports
- Add more visual themes

## License

This project is released under the MIT License.
