import { ICoord, board2D, board1D } from "./Types";
import { isEqual, flatten, find, findIndex } from "lodash"
import { addCoord, swapZeroPosition } from "./Helpers";

export default class NBoard {

    public possibleMoves: ICoord[] = [
        { "x": 0, "y": 1 }, // Right
        { "x": -1, "y": 0 }, // Down
        { "x": 0, "y": -1 }, // Left
        { "x": 1, "y": 0 }, // Up
    ]

    public isTarget: boolean;
    public currentPuzzle: board1D;
    public targetPuzzle: board1D;
    public current2D: ICoord[];
    public target2D: ICoord[];
    public previousPuzzle?: board1D;
    public childrenPuzzles: board1D[];
    public zeroPosition: number;
    public nextZeroPositions: number[];
    public heuristics: number;
    public score: number;
    public moves: number;
    public size: number;
    public parent: NBoard;

    constructor(current: board1D, target: board1D, move: number, parent?: NBoard) {
        this.currentPuzzle = current;
        this.targetPuzzle = target;
        this.size = Math.floor(Math.sqrt(current.length));
        this.current2D = this.convert1Dto2D(current);
        this.target2D = this.convert1Dto2D(target);
        this.moves = move;
        this.zeroPosition = current.indexOf(0);
        this.nextZeroPositions = this.getNeighboursZero();
        this.heuristics = this.manhattanPriority();
        this.score = this.heuristics + this.moves;
        this.childrenPuzzles = this.getChildrenPuzzles();
        this.isTarget = isEqual(current, target);
        this.parent = parent;
    }

    private linearConflict(): number {
        let conflicts = 0;
        const values = this.size * this.size;
        for (let i = 1; i < values - 1; i++) {
            for (let j = 2; j < values; j++) {
                const currI = this.getIndexCoordinates(this.currentPuzzle, i);
                const currJ = this.getIndexCoordinates(this.currentPuzzle, j);
                const targI = this.getIndexCoordinates(this.targetPuzzle, i);
                const targJ = this.getIndexCoordinates(this.targetPuzzle, j);
                if (currI.x === currJ.x && targI.x === targJ.x) {
                    if ((currI.y < currJ.y && targI.y > targJ.y) || (currI.y > currJ.y && targI.y < targJ.y)) {
                        conflicts++;
                    }
                }
                if (currI.y === currJ.y && targI.y === targJ.y) {
                    if ((currI.x < currJ.x && targI.x > targJ.x) || (currI.x > currJ.x && targI.x < targJ.x)) {
                        conflicts++;
                    }
                }
            }
        }
        return 2 * conflicts;
    }

    private convert1Dto2D(board: board1D): ICoord[] {
        return board.map((val, index) => {
            const a = board.indexOf(index);
            return this.convertIndexToArray(a)
        })
    }

    private manhattanDistance(c1: ICoord, c2: ICoord): number {
        return (Math.abs(c1.x - c2.x) + Math.abs(c1.y - c2.y))
    }

    // Manhattan priority function
    // The sum of the Manhattan distances + number of moves made so far
    private manhattanPriority(): number {
        let i = 0;
        this.current2D.forEach((val, index) => {
            if (index !== 0 && val !== this.target2D[index]) {
                i += this.manhattanDistance(val, this.target2D[index]);
            }
        })
        return (i);
    }

    private getNeighboursZero(): number[] {
        const neighbours = [];
        this.possibleMoves.forEach((dir) => {
            const testCoord = addCoord(this.convertIndexToArray(this.zeroPosition), dir);
            if (testCoord.x >= 0 && testCoord.x < this.size && testCoord.y >= 0 && testCoord.y < this.size) {
                neighbours.push(testCoord.y * this.size + testCoord.x)
            }
        })
        return neighbours;
    }

    private getIndexCoordinates(puzzle: board1D, value: number): ICoord {
        const index = puzzle.indexOf(value)
        return (this.convertIndexToArray(index))
    }

    private convertIndexToArray(index: number): ICoord {
        return { x: Math.floor(index % this.size), y: Math.floor(index / this.size), }
    }

    private getChildrenPuzzles(): number[][] {
        return this.nextZeroPositions.map((next) => {
            return swapZeroPosition(this.currentPuzzle, this.zeroPosition, next)
        })
    }
}