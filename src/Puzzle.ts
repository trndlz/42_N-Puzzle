import { flatten, isEqual, flatMap, cloneDeep } from "lodash";
import { spiralArray } from "./components/spiralArray";
import { ICoord, IParsedData, puzzleArray, IBoard } from "./Types";
import { parseInputString } from "./Parser";

export default class NPuzzle {

    public possibleMoves: ICoord[] = [
        { "x": 0, "y": 1 }, // Right
        { "x": -1, "y": 0 }, // Down
        { "x": 0, "y": -1 }, // Left
        { "x": 1, "y": 0 }, // Up
    ]

    public input: IParsedData;
    public size: number;
    public startPuzzle: puzzleArray;
    constructor(input: IParsedData, size: number) {
        this.input = input;
        this.size = size;
        this.startPuzzle = parseInputString(input.inputStr)
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
                keyCoord[val] = { "x": x, "y": y };
            })
        })
        return keyCoord;
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
                    i += this.manhattanDistance(targetCoord, { "x": x, "y": y });
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

    public getChildrenPuzzles(puzzle: puzzleArray): puzzleArray[] {
        const zero: ICoord = this.getZeroPosition(puzzle);
        const nextZeros: ICoord[] = this.getNeighboursZero(puzzle, zero);
        return nextZeros.map((next) => {
            return this.swapZeroPosition(puzzle, zero, next)
        })
    }

    public createBoard(puzzle: puzzleArray, move: number): IBoard {
        const size = puzzle.length;
        const target = spiralArray(size);
        const heuristics = this.manhattanPriority(puzzle, target, 0);
        const moves = move++;
        const childPuzzles = this.getChildrenPuzzles(puzzle)
        const board: IBoard = {
            board: puzzle,
            size: puzzle.length,
            f: moves+heuristics,
            g: move,
            h: heuristics,
            isTarget: this.arePuzzlesEqual(puzzle, target),
            childrePuzzle: childPuzzles
        }
        return board;
    }

    
}