import { parseInputString } from "./Parser";
import { IParsedData, board2D, board1D } from "./Types";
import { spiralArray } from "./components/spiralArray";
import { isEqual, flatten } from "lodash";
import NBoard from "./Puzzle";
import PriorityQueue from "./PriorityQueue"

export default class Solver {

    public size: number;
    public startBoard: board1D;
    public currentPuzzle: NBoard;
    public heuristics: string;
    public targetBoard: board1D;
    public moves: number;
    public hasError: string[];
    public solutionPath: NBoard[];

    constructor(input: IParsedData) {
        const puzzle = parseInputString(input.inputStr);
        const puzzleSize = puzzle.board.length;
        this.startBoard = flatten(puzzle.board);
        this.targetBoard = flatten(spiralArray(puzzleSize));
        this.size = puzzleSize;
        this.hasError = puzzle.error;
        this.heuristics = "manhattan";
        this.solutionPath = [];
    }

    public isBoardInASet(set: NBoard[], b: NBoard): boolean {
        let test = false;
        set.forEach((i) => {
            if (isEqual(i.currentPuzzle, b.currentPuzzle)) {
                test = true;
            }
        })
        return test;
    }

    public buildHistory(curr: NBoard) {
        while (curr) {
            this.solutionPath.unshift(curr);
            curr = curr.parent;
        }
    }

    public aStar() {
        let isSolutionFound = false;
        let counter = 0;
        const closedSet: NBoard[] = [];
        const init = new NBoard(this.startBoard, this.targetBoard, 0);
        const openQueue = new PriorityQueue();
        openQueue.enqueue(init);
        if (init.isTarget) {
            this.solutionPath.push(init);
            isSolutionFound = true;
        }
        while (!isSolutionFound && counter < 40000) {
            counter++;
            this.currentPuzzle = openQueue.dequeue();
            closedSet.push(this.currentPuzzle);
            const children = this.currentPuzzle.childrenPuzzles.map(element => {
                return new NBoard(element, this.targetBoard, this.currentPuzzle.moves + 1, this.currentPuzzle)
            });
            children.forEach((child) => {
                if (child.isTarget) {
                    isSolutionFound = true;
                    closedSet.push(child)
                    this.buildHistory(child);
                }
                // To be improved with a nice searching algo
                else if (this.isBoardInASet(closedSet, child)) {
                    // Nothing to do !
                }
                else if (this.isBoardInASet(openQueue.items, child)) {
                    // Do we add a Board if already in the openSet ?
                    // Nothing to do !
                }
                else {
                    openQueue.enqueue(child);
                }
            })
        }
    }
}