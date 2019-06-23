import { spiralArray } from "./components/spiralArray";
import { ICoord, IParsedData, board, INode } from "./Types";
import { parseInputString } from "./Parser";
import { addCoord, boardToICoordArr, arePuzzlesEqual, swapZeroPosition } from "./Helpers";

export default class NPuzzle {

    public possibleMoves: ICoord[] = [
        { "x": 0, "y": 1 }, // Right
        { "x": -1, "y": 0 }, // Down
        { "x": 0, "y": -1 }, // Left
        { "x": 1, "y": 0 }, // Up
    ]

    public input: IParsedData;
    public size: number;
    public startPuzzle: board;
    constructor(input: IParsedData, size: number) {
        this.input = input;
        this.size = size;
        this.startPuzzle = parseInputString(input.inputStr)
    } 

    // Hamming priority function.
    // The number of blocks in the wrong position + number of moves made so far
    public hammingPriority(current: board, target: board, m: number): number {
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
    public manhattanPriority(current: board, target: board, m: number): number {
        let i = 0;
        const targetCoordArr = boardToICoordArr(target);
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


    public getNeighboursZero(puzzle: board, initZero?: ICoord): ICoord[] {
        const size = puzzle.length;
        const neighbours = [];
        const zero = initZero || this.getZeroPosition(puzzle);
        this.possibleMoves.forEach((dir) => {
            const testCoord = addCoord(zero, dir);
            if (testCoord.x >= 0 && testCoord.x < (size - 1) && testCoord.y >= 0 && testCoord.y < (size - 1)) {
                neighbours.push(testCoord)
            }
        })
        return neighbours;
    }

    public getZeroPosition(puzzle: board): ICoord {
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

    // Returns array of puzzles 
    public getChildrenPuzzles(puzzle: board): board[] {
        const zero: ICoord = this.getZeroPosition(puzzle);
        const nextZeros: ICoord[] = this.getNeighboursZero(puzzle, zero);
        return nextZeros.map((next) => {
            return swapZeroPosition(puzzle, zero, next)
        })
    }

    public createNode(puzzle: board, move: number): INode {
        const size = puzzle.length;
        const target = spiralArray(size);
        const heuristics = this.manhattanPriority(puzzle, target, 0);
        const moves = move++;
        const childPuzzles = this.getChildrenPuzzles(puzzle)
        const node: INode = {
            board: puzzle,
            size: puzzle.length,
            f: moves+heuristics,
            g: move,
            h: heuristics,
            isTarget: arePuzzlesEqual(puzzle, target),
            childrePuzzle: childPuzzles
        }
        return node;
    }
}