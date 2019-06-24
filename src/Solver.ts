import { parseInputString } from "./Parser";
import { IParsedData, board, INode } from "./Types";
import { spiralArray } from "./components/spiralArray";
import { isEqual, remove } from "lodash";
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
    
    constructor(input: IParsedData) {

        const puzzle = parseInputString(input.inputStr);
        const puzzleSize = puzzle.length;
        
        this.startPuzzle = puzzle;
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

    public boardWithLowestHeuristic(set: NBoard[]): NBoard {
        return set.sort((a, b) => a.heuristics - b.heuristics)[0];
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
        // let i = 0;
        const openSet: NBoard[] = [];
        const closedSet: NBoard[] = [];
        
        const init = new NBoard(this.startPuzzle, this.targetPuzzle, 0);
        openSet.push(init);
        console.log(chalk.magentaBright(`Target:\t`) + this.targetPuzzle)
        console.log(chalk.blue(`Round : ${0}`))
        while (openSet.length > 0) {
            const current = this.boardWithLowestHeuristic(openSet)
            closedSet.push(current);
            remove(openSet, current);
            console.log(chalk.blue.inverse(`Round : ${current.moves + 1}`))
            const children = current.childrenPuzzles.map(element => {
                return new NBoard(element, this.targetPuzzle, current.moves + 1)
            });
            children.forEach((b) => {
                if (b.isTarget) {
                    console.log(this.printColoredDiff(this.targetPuzzle, b.currentPuzzle))
                    hoho = true;
                    closedSet.push(b)
                    return closedSet;
                }
                else if (this.isBoardInClosedSet(closedSet, b)) {
                    console.log(chalk.gray(b.currentPuzzle.toString()) + " score : " + b.heuristics)
                }
                else {
                    console.log(this.printColoredDiff(this.targetPuzzle, b.currentPuzzle) + " score : " + b.heuristics)
                    openSet.push(b)
                }
            })
            // console.log()
            if (hoho) {
                // console.log("OPEN SET");
                // openSet.forEach(a => {
                //     console.log(a.currentPuzzle)
                // })
                return closedSet ;
            }
        }

        console.log(openSet.length)
        
        // children.forEach(a => {
        //     // console.table(a.currentPuzzle)
        //     // console.log("heuristics", a.heuristics)
        //     // console.log("moves", a.moves)
        // })
        // solver.push(children[0])
        // console.log(children[0].currentPuzzle)
        // console.log(children[0].childrenPuzzles)
        // const children1 = children[0].childrenPuzzles.map(ttt => {
        //     return new NBoard(ttt, this.targetPuzzle, 2)
        // });
        // children1.sort((a, b) => a.heuristics - b.heuristics)
        // children1.forEach(a => {
        //     console.table(a.currentPuzzle)
        //     console.log("heuristics", a.heuristics)
        //     console.log("moves", a.moves)
        // })
    }
}