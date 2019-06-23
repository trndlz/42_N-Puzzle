import { board } from "../Types";

export function spiralArray(n: number): board {
    const result = new Array(n);
    for (let p = 0; p < result.length; p++) {
        result[p] = new Array(n);
    }
    let counter = 1;
    let startCol = 0;
    let endCol = n - 1;
    let startRow = 0;
    let endRow = n - 1;
    const total = n * n;
    while (startCol <= endCol && startRow <= endRow) {
        for (let i = startCol; i <= endCol; i++) {
            result[startRow][i] = counter === total ? 0 : counter++;
        }
        startRow++;
        for (let j = startRow; j <= endRow; j++) {
            result[j][endCol] = counter === total ? 0 : counter++;
        }
        endCol--;
        for (let i = endCol; i >= startCol; i--) {
            result[endRow][i] = counter === total ? 0 : counter++;
        }
        endRow--;
        for (let i = endRow; i >= startRow; i--) {
            result[i][startCol] = counter === total ? 0 : counter++;
        }
        startCol++;
    }
    return result;
}