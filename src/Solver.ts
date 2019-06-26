import { parseInputString } from "./Parser";
import { IParsedData, board, INode } from "./Types";
import { spiralArray } from "./components/spiralArray";
import { isEqual, remove, flatten } from "lodash";
import NBoard from "./Puzzle";
import chalk from "chalk"

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
    public startPuzzle: board;
    public heuristics: string;
    public targetPuzzle: board;
    public moves: number;
    public solver: ISolver;
    public initialNode: INode;
    public hasError: string[];
    
    constructor(input: IParsedData) {
        const puzzle = parseInputString(input.inputStr);
        const puzzleSize = puzzle.board.length;
        this.hasError = puzzle.error;
        this.startPuzzle = puzzle.board;
        this.targetPuzzle = spiralArray(puzzleSize);
        this.size = puzzleSize;
        this.heuristics = "manhattan";
        this.solver = {
            solutionPath: [],
            moves: 0,
            queue: []
        }
    }

    public isBoardInClosedSet(set: NBoard[], b: NBoard): boolean {
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
        return res ;
    }

    public aStar() {
        let hoho = false;
        let i = 0;
        const openSet: NBoard[] = [];
        const closedSet: NBoard[] = [];
        

        const init = new NBoard(this.startPuzzle, this.targetPuzzle, 0);
        openSet.push(init);
        console.log(chalk.magentaBright(`Target:\t`) + this.targetPuzzle)
        console.log(chalk.blue(`Round : ${0}`))
        while (openSet.length > 0) {
            i++;
            const current = this.boardWithLowestScore(openSet)
            closedSet.push(current);
            remove(openSet, current);
            console.log(chalk.blue.inverse(`Round : ${current.moves + 1}`))
            const children = current.childrenPuzzles.map(element => {
                return new NBoard(element, this.targetPuzzle, current.moves + 1, current)
            });
            children.forEach((b) => {
                if (b.isTarget) {
                    console.log(this.printColoredDiff(this.targetPuzzle, b.currentPuzzle))
                    hoho = true;
                    closedSet.push(b)
                    return closedSet;
                }
                else if (this.isBoardInClosedSet(closedSet, b)) {
                    console.log(chalk.gray(b.currentPuzzle.toString()) + " score : " + b.score)
                }
                else {
                    console.log(this.printColoredDiff(this.targetPuzzle, b.currentPuzzle) + " score : " + b.score)
                    openSet.push(b)
                }
            })
            if (hoho) {
                return closedSet ;
            }
        }
    }
}