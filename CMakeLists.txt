cmake_minimum_required(VERSION 3.10)
project(SudokuMaster)

set(CMAKE_CXX_STANDARD 11)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

add_executable(SudokuMaster
    backend/main.cpp
    backend/board.cpp
    backend/generator.cpp
    backend/solver.cpp
    backend/validator.cpp
)
