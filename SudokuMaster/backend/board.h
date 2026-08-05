#ifndef BOARD_H
#define BOARD_H

#include <string>

class Board {
private:
    int grid[9][9];
    int solution[9][9];

public:
    Board();

    void clearBoard();
    void copyBoard(int source[9][9], int destination[9][9]);
    void setPuzzle(int puzzle[9][9]);
    void setSolution(int solvedBoard[9][9]);
    int getValue(int row, int col);
    void setValue(int row, int col, int value);
    int getSolutionValue(int row, int col);
    void printBoard();
    void printSolution();
};

#endif
