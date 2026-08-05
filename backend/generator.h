#ifndef GENERATOR_H
#define GENERATOR_H

#include "validator.h"
#include <string>
#include <vector>

class Generator {
private:
    Validator validator;

    std::vector<int> shuffleNumbers();
    bool fillBoard(int board[9][9]);
    int getCellsToRemove(std::string difficulty);

public:
    void generateBoard(int puzzle[9][9], int solution[9][9], std::string difficulty);
    void removeCells(int board[9][9], int cellsToRemove);
};

#endif
