#include "solver.h"

// Solves Sudoku using recursive backtracking.
bool Solver::solveSudoku(int board[9][9]) {
    int row = -1;
    int col = -1;
    bool emptyCellFound = false;

    for (int i = 0; i < 9; i++) {
        for (int j = 0; j < 9; j++) {
            if (board[i][j] == 0) {
                row = i;
                col = j;
                emptyCellFound = true;
                break;
            }
        }

        if (emptyCellFound) {
            break;
        }
    }

    if (!emptyCellFound) {
        return true;
    }

    for (int num = 1; num <= 9; num++) {
        if (validator.isSafe(board, row, col, num)) {
            board[row][col] = num;

            if (solveSudoku(board)) {
                return true;
            }

            board[row][col] = 0;
        }
    }

    return false;
}
