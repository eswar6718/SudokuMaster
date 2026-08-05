#include "board.h"
#include "generator.h"
#include "solver.h"
#include <iostream>
#include <string>

using namespace std;

void createNewGame(Board &board, Generator &generator, string difficulty) {
    int puzzle[9][9];
    int solution[9][9];

    generator.generateBoard(puzzle, solution, difficulty);
    board.setPuzzle(puzzle);
    board.setSolution(solution);

    cout << endl << "New " << difficulty << " puzzle generated!" << endl;
    board.printBoard();
}

int main() {
    Board board;
    Generator generator;
    Solver solver;
    int choice;
    bool gameCreated = false;

    do {
        cout << endl;
        cout << "===== Sudoku Master =====" << endl << endl;
        cout << "1. New Easy Game" << endl << endl;
        cout << "2. New Medium Game" << endl << endl;
        cout << "3. New Hard Game" << endl << endl;
        cout << "4. Solve Current Puzzle" << endl << endl;
        cout << "5. Exit" << endl << endl;
        cout << "Enter your choice: ";
        cin >> choice;

        if (choice == 1) {
            createNewGame(board, generator, "easy");
            gameCreated = true;
        } else if (choice == 2) {
            createNewGame(board, generator, "medium");
            gameCreated = true;
        } else if (choice == 3) {
            createNewGame(board, generator, "hard");
            gameCreated = true;
        } else if (choice == 4) {
            if (!gameCreated) {
                cout << "Please create a puzzle first." << endl;
            } else {
                int currentBoard[9][9];

                for (int i = 0; i < 9; i++) {
                    for (int j = 0; j < 9; j++) {
                        currentBoard[i][j] = board.getValue(i, j);
                    }
                }

                if (solver.solveSudoku(currentBoard)) {
                    cout << endl << "Solved Puzzle:" << endl;
                    board.setPuzzle(currentBoard);
                    board.printBoard();
                } else {
                    cout << "No solution found." << endl;
                }
            }
        } else if (choice == 5) {
            cout << "Thank you for playing Sudoku Master!" << endl;
        } else {
            cout << "Invalid choice. Please try again." << endl;
        }
    } while (choice != 5);

    return 0;
}
