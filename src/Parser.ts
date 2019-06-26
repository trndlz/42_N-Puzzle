import { board } from "./Types";
import { flatten } from "lodash";

// For lines not starting with # : check if any other character than whitespace or digit is present
const areForbiddenChars = (lines: string[]) => {
    return lines.filter(line => (line[0] !== "#" && /[^\d\s]/g.test(line))).length > 0
}

// Check if size given in header is the same than puzzle lines
const isSizeInputConform = (height: number, size?: number) => {
    return (size && size !== height)
}

// Check if given size is the same than number of lines
const isSizeConsistent = (puzzle: board, height: number) => {
    return (puzzle.filter(p => p.length !== height).length > 0);
}

// Check if all required numbers are in the array
const areEachNumbers = (puzzle: board, height: number) => {
    let counter = height * height;
    while (--counter >= 0) {
        if (!flatten(puzzle).includes(counter)) { 
            return true;
        }
    }
    return false;
}

// Check input data consistency
const isInputDataConsistent = (puzzle: board, size?: number) => {
    const height = puzzle.length;
    if (isSizeInputConform(height, size) || isSizeConsistent(puzzle, height) || areEachNumbers(puzzle, height)) { 
        return true;
    }
    return false;
}

// Convert input string to board (type: board)
export const parseInputString = (input: string) => {
    const lines: string[] = input.split(/\n/);
    if (areForbiddenChars(lines)) {
        console.log("ALERTE !!!")
    }
    const pp: string[][] = lines.map(line => line.match(/[\d]+/g)).filter(Boolean).map((value, index, array) => value)
    const bb: board = pp.map(a => a.map(b => parseInt(b, 10))).filter(a => a.length !== 1)
    if (isInputDataConsistent(bb)) {
        console.log("ALERTE !!!")
    }      
    return bb;
}

export const isBoardSolvable = (target: board, current: board) => {
    const target1D = flatten(target);
    const current1D = flatten(current);
    let currentInv = countInversions(current1D);
    let targetInv = countInversions(target1D);
    if (current.length % 2 === 0) {
        currentInv += Math.floor(current1D.indexOf(0) / current.length);
        targetInv += Math.floor(target1D.indexOf(0) / target.length);
    }
    return (currentInv % 2 === targetInv % 2)
}

const countInversions = (p: number[]) => {
    let inversions = 0;
    for (let a = 0; a < p.length - 1; a++) {
        for (let b = a + 1; b < p.length; b++) {
            if (p[b] && p[a] && p[a] > p[b]) {
                inversions++;
            }
        }
    }
    return inversions
}
