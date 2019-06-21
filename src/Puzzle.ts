import {flatten, isEqual, flatMap, cloneDeep} from "lodash";

export interface IPuzzleInput {
    inputStr: string;
    heuristics: string;
}

export type puzzleArray = number[][];

// Link between puzzleArray and coordinates : pArray[y][x] ! Careful !
export interface ICoord {
    x: number;
    y: number;
}

export interface IPuzzleNode {
    board: puzzleArray;
    size: number;
    f: number;
    g: number;
    h: number;
    parentNode?: IPuzzleNode;
    childrenNode: IPuzzleNode[];
    zeroPosition: ICoord;
    toString: string;
}



export default class NPuzzle {

    public possibleMoves: ICoord[] = [
        { "x": 0, "y": 1 }, // Right
        { "x": -1, "y": 0 }, // Down
        { "x": 0, "y": -1 }, // Left
        { "x": 1, "y": 0 }, // Up
    ]

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

    public swapZeroPosition(puzzle: puzzleArray, oldZero: ICoord, newZero: ICoord): puzzleArray {
        const newPuzzle = cloneDeep(puzzle);
        newPuzzle[oldZero.y][oldZero.x] = puzzle[newZero.y][newZero.x];
        newPuzzle[newZero.y][newZero.x] = 0;
        return newPuzzle;
    }

    public addCoord(a: ICoord, b: ICoord): ICoord {
        return {
            "x": a.x + b.x,
            "y": a.y + b.y
        }
    }

    public arePuzzlesEqual(a: puzzleArray, b: puzzleArray): boolean {
        return isEqual(a, b);
    }

    public nArrayToKeyCoord(puzzle: puzzleArray) {
        const keyCoord = [];
        puzzle.forEach((arr, y) => {
            arr.forEach((val, x) => {
                keyCoord[val] = {"x": x, "y": y};
            })
        })
        return keyCoord ;
    }


    // Hamming priority function.
    // The number of blocks in the wrong position + number of moves made so far
    public hammingPriority(current: puzzleArray, target: puzzleArray, m: number): number {
        let i = 0;
        current.forEach((arr, y) => {
            arr.forEach((val, x) => {
                if (val !== 0 && val !== target[y][x]) {
                    i++;
                }
            })
        })
        return (i + m);
    }

    public manhattanDistance(c1: ICoord, c2: ICoord): number {
        return (Math.abs(c1.x - c2.x) + Math.abs(c1.y - c2.y))
    }

    // Manhattan priority function
    // The sum of the Manhattan distances + number of moves made so far
    public manhattanPriority(current: puzzleArray, target: puzzleArray, m: number): number {
        let i = 0;
        const targetCoordArr = this.nArrayToKeyCoord(target);
        current.forEach((arr, y) => {
            arr.forEach((val, x) => {
                if (val !== 0 && val !== target[y][x]) {
                    const targetCoord = targetCoordArr[val]
                    i += this.manhattanDistance(targetCoord, {"x": x, "y": y});
                }
            })
        })
        return (i + m);
    }
    

    public getNeighboursZero(puzzle: puzzleArray, initZero?: ICoord): ICoord[] {
        const size = puzzle.length;
        const neighbours = [];
        const zero = initZero || this.getZeroPosition(puzzle);
        this.possibleMoves.forEach((dir) => {
            const testCoord = this.addCoord(zero, dir);
            if (testCoord.x >= 0 && testCoord.x < (size - 1) && testCoord.y >= 0 && testCoord.y < (size - 1)) {
                neighbours.push(testCoord)
            }
        })
        return neighbours;
    }

    public getZeroPosition(puzzle: puzzleArray): ICoord {
        let res: ICoord = { x: -1, y: -1 }
        puzzle.forEach((arr, y) => {
            arr.forEach((val, x) => {
                if (val === 0) {
                    res = { "x": x, "y": y }
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