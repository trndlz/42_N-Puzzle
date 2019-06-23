import { parseInputString } from "./Parser";
import { IParsedData, board, INode } from "./Types";
import { spiralArray } from "./components/spiralArray";
import NBoard from "./Puzzle";

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

    public aStar() {
        // let queue = []
        // let solver = []
        const init = new NBoard(this.startPuzzle, this.targetPuzzle, 0);
        const children = init.childrenPuzzles.map(element => {
            return new NBoard(element, this.targetPuzzle, 1)
        });
        children.sort((a, b) => a.heuristics - b.heuristics)
        children.forEach(a => {
            // console.table(a.currentPuzzle)
            // console.log("heuristics", a.heuristics)
            // console.log("moves", a.moves)
        })
        // solver.push(children[0])
        // console.log(children[0].currentPuzzle)
        // console.log(children[0].childrenPuzzles)
        const children1 = children[0].childrenPuzzles.map(ttt => {
            return new NBoard(ttt, this.targetPuzzle, 2)
        });
        children1.sort((a, b) => a.heuristics - b.heuristics)
        children1.forEach(a => {
            console.table(a.currentPuzzle)
            console.log("heuristics", a.heuristics)
            console.log("moves", a.moves)
        })
    }
}