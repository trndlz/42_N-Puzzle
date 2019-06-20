import flatten from "lodash/flatten"

enum Direction {
    Up,
    Down,
    Left,
    Right,
}

export interface IPuzzleInput {
    inputStr: string;
    heuristics: string;
    size: number;
    solvable?: boolean;
}

export type puzzleArray = number[][];

export interface IPuzzleNode {
    values: puzzleArray;
    f: number;
    g: number;
    h: number;
    parentNode: IPuzzleNode;
}

export interface ICoord {
    x: number;
    y: number;
}

export default class NPuzzle {
    public input: IPuzzleInput;
    constructor(input: IPuzzleInput) {
        this.input = input;
    }

    public parseInputString(input: string): puzzleArray {
        const lines: string[] = input.split(/\n/);
        if (this.isForbidenChars(lines)) {
            console.log("ALERTE !!!")
        }
        const pp: string[][] = lines.map(line => line.match(/[\d]+/g)).filter(Boolean).map((value, index, array) => value)
        const bb: puzzleArray = pp.map(a => a.map(b => parseInt(b, 10))).filter(a => a.length !== 1)
        if (this.isUnexpectedNumbers(bb)) {
            console.log("ALERTE !!!")
        }
        return bb;
    }

    public getZeroPosition(puzzle: puzzleArray): ICoord {
        let res: ICoord = {x: -1, y: -1}
        puzzle.forEach((arr, y) => {
            arr.forEach((val, x) => {
                if (val === 0) {
                    res = {x: x, y: y}
                }
            })
        })
        return res
    }



    private isForbidenChars(lines: string[]): boolean {
        // For lines not starting with # : check if any other character than whitespace or digit is present
       return lines.filter(line => (line[0] !== "#" && /[^\d\s]/g.test(line))).length > 0
    }

    private isUnexpectedNumbers(puzzle: puzzleArray, size?: number): boolean {
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
}