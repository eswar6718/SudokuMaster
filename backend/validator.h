#ifndef VALIDATOR_H
#define VALIDATOR_H

class Validator {
public:
    bool isSafe(int board[9][9], int row, int col, int num);
    bool isBoardValid(int board[9][9]);
};

#endif
