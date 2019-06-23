import { isEqual, cloneDeep } from "lodash"
import { board, ICoord } from "./Types";


// Check if two boards are equal
export const arePuzzlesEqual = (a: board, b: board) => {
    return isEqual(a, b);
}

// Converts number[][] to ICoord[] 
export const  boardToICoordArr = (puzzle: board) => {
    const keyCoord = [];
    puzzle.forEach((arr, y) => {
        arr.forEach((val, x) => {
            keyCoord[val] = { "x": x, "y": y };
        })
    })
    return keyCoord;
}

// Vector addition
export const addCoord = (a: ICoord, b: ICoord) => {
    return {
        "x": a.x + b.x,
        "y": a.y + b.y
    }
}

// Inverts zero and returns new board
export const swapZeroPosition = (puzzle: board, oldZero: ICoord, newZero: ICoord) => {
    const newPuzzle = cloneDeep(puzzle);
    newPuzzle[oldZero.y][oldZero.x] = puzzle[newZero.y][newZero.x];
    newPuzzle[newZero.y][newZero.x] = 0;
    return newPuzzle;
}