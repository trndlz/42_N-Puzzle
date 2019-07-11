import { isEqual, cloneDeep } from "lodash"
import { board1D, ICoord, board2D } from "./Types";

// Check if two boards are equal
export const arePuzzlesEqual = (a: board1D, b: board1D) => {
    return isEqual(a, b);
}

// Vector addition
export const addCoord = (a: ICoord, b: ICoord) => {
    return {
        "x": a.x + b.x,
        "y": a.y + b.y
    }
}

export const swapZeroPosition = (puzzle: number[], oldZero: number, newZero: number) => {
    const newPuzzle = cloneDeep(puzzle);
    newPuzzle[oldZero] = puzzle[newZero];
    newPuzzle[newZero] = 0;
    return newPuzzle;
}