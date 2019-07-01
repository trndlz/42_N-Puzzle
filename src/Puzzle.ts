import { spiralArray } from "./components/spiralArray";
import { ICoord, IParsedData, board, INode } from "./Types";
import { parseInputString } from "./Parser";
import { isEqual, cloneDeep } from "lodash"
import { addCoord, boardToICoordArr, arePuzzlesEqual, swapZeroPosition } from "./Helpers";

export default class NBoard {

    public possibleMoves: ICoord[] = [
        { "x": 0, "y": 1 }, // Right
        { "x": -1, "y": 0 }, // Down
        { "x": 0, "y": -1 }, // Left
        { "x": 1, "y": 0 }, // Up
    ]

    public node: INode;
    public isTarget: boolean;
    public currentPuzzle: board;
    public targetPuzzle: board;
    public previousPuzzle?: board;
    public childrenPuzzles: board[];
    public zeroPosition: ICoord;
    public nextZeroPositions: ICoord[];
    public heuristics: number;
    public score: number;
    public moves: number;
    public size: number;
    public parent: NBoard;

    constructor(current: board, target: board, move: number, parent?: NBoard) {
        this.currentPuzzle = current;
        this.targetPuzzle = target;
        this.size = current.length;
        this.moves = move;
        this.zeroPosition = this.getZeroPosition(current);
        this.nextZeroPositions = this.getNeighboursZero();
        this.heuristics = this.manhattanPriority();
        this.score = this.heuristics + this.moves;
        this.childrenPuzzles = this.getChildrenPuzzles();
        this.isTarget = isEqual(current, target);
        this.parent = parent;
    }

    // Hamming priority function.
    // The number of blocks in the wrong position + number of moves made so far
    private hammingPriority(): number {
        let i = 0;
        this.currentPuzzle.forEach((arr, y) => {
            arr.forEach((val, x) => {
                if (val !== 0 && val !== this.targetPuzzle[y][x]) {
                    i++;
                }
            })
        })
        return (i + this.moves);
    }

    private manhattanDistance(c1: ICoord, c2: ICoord): number {
        return (Math.abs(c1.x - c2.x) + Math.abs(c1.y - c2.y))
    }

    // Manhattan priority function
    // The sum of the Manhattan distances + number of moves made so far
    private manhattanPriority(): number {
        let i = 0;
        const targetCoordArr = boardToICoordArr(this.targetPuzzle);
        this.currentPuzzle.forEach((arr, y) => {
            arr.forEach((val, x) => {
                if (val !== 0 && val !== this.targetPuzzle[y][x]) {
                    const targetCoord = targetCoordArr[val]
                    i += this.manhattanDistance(targetCoord, { "x": x, "y": y });
                }
            })
        })
        return (i);
    }

    private getNeighboursZero(): ICoord[] {
        const neighbours = [];
        this.possibleMoves.forEach((dir) => {
            const testCoord = addCoord(this.zeroPosition, dir);
            if (testCoord.x >= 0 && testCoord.x < this.size && testCoord.y >= 0 && testCoord.y < this.size) {
                neighbours.push(testCoord)
            }
        })
        return neighbours;
    }

    private getZeroPosition(puzzle: board): ICoord {
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
    private getChildrenPuzzles(): board[] {
        return this.nextZeroPositions.map((next) => {
            return swapZeroPosition(this.currentPuzzle, this.zeroPosition, next)
        })
    }
}