#ifndef SOLVER_H
#define SOLVER_H

#include "validator.h"

class Solver {
private:
    Validator validator;

public:
    bool solveSudoku(int board[9][9]);
};

#endif
