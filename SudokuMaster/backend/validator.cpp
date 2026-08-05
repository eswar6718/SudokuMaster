#include "validator.h"

// Checks if num can be placed at board[row][col].
bool Validator::isSafe(int board[9][9], int row, int col, int num) {
    for (int i = 0; i < 9; i++) {
        if (board[row][i] == num) {
            return false;
        }
    }

    for (int i = 0; i < 9; i++) {
        if (board[i][col] == num) {
            return false;
        }
    }

    int startRow = row - row % 3;
    int startCol = col - col % 3;

    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3; j++) {
            if (board[startRow + i][startCol + j] == num) {
                return false;
            }
        }
    }

    return true;
}

// Checks if all filled cells follow Sudoku rules.
bool Validator::isBoardValid(int board[9][9]) {
    for (int row = 0; row < 9; row++) {
        for (int col = 0; col < 9; col++) {
            int value = board[row][col];

            if (value != 0) {
                board[row][col] = 0;

                if (!isSafe(board, row, col, value)) {
                    board[row][col] = value;
                    return false;
                }

                board[row][col] = value;
            }
        }
    }

    return true;
}
