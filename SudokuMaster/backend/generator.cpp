#include "generator.h"
#include <algorithm>
#include <ctime>
#include <random>

using namespace std;

// Returns numbers 1 to 9 in random order.
vector<int> Generator::shuffleNumbers() {
    vector<int> numbers;

    for (int i = 1; i <= 9; i++) {
        numbers.push_back(i);
    }

    static random_device rd;
    static mt19937 generator(rd());
    shuffle(numbers.begin(), numbers.end(), generator);

    return numbers;
}

// Recursively fills all empty cells to create a complete valid board.
bool Generator::fillBoard(int board[9][9]) {
    for (int row = 0; row < 9; row++) {
        for (int col = 0; col < 9; col++) {
            if (board[row][col] == 0) {
                vector<int> numbers = shuffleNumbers();

                for (int i = 0; i < numbers.size(); i++) {
                    int num = numbers[i];

                    if (validator.isSafe(board, row, col, num)) {
                        board[row][col] = num;

                        if (fillBoard(board)) {
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

int Generator::getCellsToRemove(string difficulty) {
    if (difficulty == "easy") {
        return 30;
    }

    if (difficulty == "medium") {
        return 40;
    }

    return 50;
}

// Removes cells randomly according to the selected difficulty.
void Generator::removeCells(int board[9][9], int cellsToRemove) {
    srand((unsigned int)time(0));

    while (cellsToRemove > 0) {
        int row = rand() % 9;
        int col = rand() % 9;

        if (board[row][col] != 0) {
            board[row][col] = 0;
            cellsToRemove--;
        }
    }
}

// Creates one solved Sudoku board and one puzzle board.
void Generator::generateBoard(int puzzle[9][9], int solution[9][9], string difficulty) {
    for (int i = 0; i < 9; i++) {
        for (int j = 0; j < 9; j++) {
            puzzle[i][j] = 0;
            solution[i][j] = 0;
        }
    }

    fillBoard(solution);

    for (int i = 0; i < 9; i++) {
        for (int j = 0; j < 9; j++) {
            puzzle[i][j] = solution[i][j];
        }
    }

    removeCells(puzzle, getCellsToRemove(difficulty));
}
