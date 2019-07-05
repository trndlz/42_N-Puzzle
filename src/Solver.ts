import { parseInputString } from "./Parser";
import { IParsedData, board, INode } from "./Types";
import { spiralArray } from "./components/spiralArray";
import { isEqual, remove, flatten, deepClone } from "lodash";
import NBoard from "./Puzzle";
import chalk from "chalk"
import PriorityQueue from "./PriorityQueue"

interface ISolver {
    solutionPath: INode[];
    moves: number;
    queue: INode[];
}

interface IPuzzleTree {
    current: NBoard;
    children: NBoard[];
    priority: number;
    move: number;
}

export default class Solver {

    public size: number;
    public startBoard: board;
    public currentPuzzle: NBoard;
    public heuristics: string;
    public targetBoard: board;
    public moves: number;
    public solver: ISolver;
    public initialNode: INode;
    public hasError: string[];
    public solutionPath: NBoard[];
    
    constructor(input: IParsedData) {
        const puzzle = parseInputString(input.inputStr);
        const puzzleSize = puzzle.board.length;
        this.hasError = puzzle.error;
        this.startBoard = puzzle.board;
        this.targetBoard = spiralArray(puzzleSize);
        this.size = puzzleSize;
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
        return test ;
    }

    public removeBoardFromSet(set: NBoard[], c: NBoard): NBoard[] {
        return remove(set, (a => isEqual(c, a)));
    }

    public boardWithLowestScore(set: NBoard[]): NBoard {
        return set.sort((a, b) => a.score - b.score)[0];
    }

    public printColoredDiff(target: board, current: board): string {
        const targetStr = target.toString();
        const currentStr = current.toString();
        let res: string = "";

        currentStr.split("").forEach((letter, index) => {
            if (letter === ",") {
                res +=  " ";
            } else if (letter === targetStr[index]) {
                res += `\x1b[32m${letter}\x1b[0m`
            } else {
                res += `\x1b[31m${letter}\x1b[0m`
            }
        })
        return res;
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
            console.log("????")
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
                else {
                    openQueue.enqueue(child);
                }
            })
        }
    }
}