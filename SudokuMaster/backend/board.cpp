#include "board.h"
#include <iostream>

using namespace std;

Board::Board() {
    clearBoard();
}

// Makes both puzzle and solution arrays empty.
void Board::clearBoard() {
    for (int i = 0; i < 9; i++) {
        for (int j = 0; j < 9; j++) {
            grid[i][j] = 0;
            solution[i][j] = 0;
        }
    }
}

// Copies one 9x9 array into another 9x9 array.
void Board::copyBoard(int source[9][9], int destination[9][9]) {
    for (int i = 0; i < 9; i++) {
        for (int j = 0; j < 9; j++) {
            destination[i][j] = source[i][j];
        }
    }
}

void Board::setPuzzle(int puzzle[9][9]) {
    copyBoard(puzzle, grid);
}

void Board::setSolution(int solvedBoard[9][9]) {
    copyBoard(solvedBoard, solution);
}

int Board::getValue(int row, int col) {
    return grid[row][col];
}

void Board::setValue(int row, int col, int value) {
    grid[row][col] = value;
}

int Board::getSolutionValue(int row, int col) {
    return solution[row][col];
}

// Prints the Sudoku board in a readable table format.
void Board::printBoard() {
    cout << "+-------+-------+-------+" << endl;

    for (int i = 0; i < 9; i++) {
        cout << "| ";

        for (int j = 0; j < 9; j++) {
            if (grid[i][j] == 0) {
                cout << ". ";
            } else {
                cout << grid[i][j] << " ";
            }

            if ((j + 1) % 3 == 0) {
                cout << "| ";
            }
        }

        cout << endl;

        if ((i + 1) % 3 == 0) {
            cout << "+-------+-------+-------+" << endl;
        }
    }
}

void Board::printSolution() {
    int oldGrid[9][9];
    copyBoard(grid, oldGrid);
    copyBoard(solution, grid);
    printBoard();
    copyBoard(oldGrid, grid);
}
