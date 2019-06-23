import { puzzleArray } from "./Types";
import { flatten } from "lodash";

// For lines not starting with # : check if any other character than whitespace or digit is present
const isForbidenChars = (lines: string[]) => {
    return lines.filter(line => (line[0] !== "#" && /[^\d\s]/g.test(line))).length > 0
}

// Check input data consistency
const isUnexpectedNumbers = (puzzle: puzzleArray, size?: number) => {
    const height = puzzle.length;
    if (puzzle.filter(p => p.length !== height).length > 0) { // Check if height and width is consistent
        return true;
    }
    if (size && size !== height) { // Check if given size is the same than number of lines
        return true;
    }
    let counter = height * height;
    while (--counter >= 0) {
        if (!flatten(puzzle).includes(counter)) { // Check if all required numbers are in the array
            return true;
        }
    }
    return false;
}

export const parseInputString = (input: string) => {
    const lines: string[] = input.split(/\n/);
    if (isForbidenChars(lines)) {
        console.log("ALERTE !!!")
    }
    const pp: string[][] = lines.map(line => line.match(/[\d]+/g)).filter(Boolean).map((value, index, array) => value)
    const bb: puzzleArray = pp.map(a => a.map(b => parseInt(b, 10))).filter(a => a.length !== 1)
    if (isUnexpectedNumbers(bb)) {
        console.log("ALERTE !!!")
    }
    return bb;
}