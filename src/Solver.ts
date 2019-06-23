import { parseInputString } from "./Parser";
import { IParsedData, board, INode } from "./Types";
import { spiralArray } from "./components/spiralArray";
import NPuzzle from "./Puzzle";

interface ISolver {
    path: INode[];
    moves: number;
    queue: INode[];
}

export default class Solver {

    public size: number;
    public startPuzzle: board;
    public heuristics: string;
    public targetPuzzle: board;
    public moves: number;
    
    constructor(input: IParsedData, size: number) {

        const puzzle = parseInputString(input.inputStr);
        const puzzleSize = puzzle.length;
        
        this.startPuzzle = puzzle;
        this.size = puzzleSize;
        this.targetPuzzle = spiralArray(puzzleSize);
        this.heuristics = "manhattan";
    }

    public aStar() {
        console.log("TEST")
    }
}