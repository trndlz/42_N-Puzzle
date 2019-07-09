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
    public complexityInTime: number;
    public complexityInSpace: number;
    public isSolutionFound: boolean;

    constructor(inputStr: string, heuristics: string) {
        const puzzle = parseInputString(inputStr);
        const puzzleSize = puzzle.board.length;
        this.startBoard = flatten(puzzle.board);
        this.targetBoard = flatten(spiralArray(puzzleSize));
        this.size = puzzleSize;
        this.hasError = puzzle.error;
        this.heuristics = heuristics || "MANHATTAN";
        this.solutionPath = [];
        this.complexityInSpace = 1;
        this.complexityInTime = 1;
        this.isSolutionFound = false;
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
        
        let counter = 0;
		// My closedSet is just a normal array. This can definitely be optimized
        const closedSet: NBoard[] = [];
        // I create the first Board with parsed input and then add it into the priority queue using enqueue() method
		const init = new NBoard(this.startBoard, this.targetBoard, 0, this.heuristics);
        const openQueue = new PriorityQueue();
        openQueue.enqueue(init);
        // If this this puzzle is already the target => Solution is found no A* is launched
		if (init.isTarget) {
            this.solutionPath.push(init);
            this.isSolutionFound = true;
        }
		// Main loop that I limit arbitrary to 40000
        while (!this.isSolutionFound && counter < 40000) {
            counter++;
			// currentPuzzle is Board on top of the PriorityQueue
            this.currentPuzzle = openQueue.dequeue();
            this.complexityInSpace = Math.max(this.complexityInSpace, openQueue.items.length);
            // As we "explore" this Board, it goes into the closedSet
			closedSet.push(this.currentPuzzle);
			// I create an array of all possible moves of my current puzzle
            const children = this.currentPuzzle.childrenPuzzles.map(element => {
                return new NBoard(element, this.targetBoard, this.currentPuzzle.moves + 1, this.heuristics, this.currentPuzzle)
            });
			// For each child, 4 possibilities
            children.forEach((child) => {
				// 1) Child is the target => We're done and build the history path from this chid to the initial state
                if (child.isTarget) {
                    this.isSolutionFound = true;
                    closedSet.push(child);
                    this.complexityInTime = closedSet.length;
                    this.buildHistory(child);
                }
                // 2) Child has already been explored so it is in closedSet. To be improved with a nice searching algo ?
                else if (this.isBoardInASet(closedSet, child)) {
                    // Nothing to do here
                }
				// 3) Child is already in the priorityQueue. Do we add it in the Queue again ?
                else if (this.isBoardInASet(openQueue.items, child)) {
                    // Do we add a Board if already in the openSet ?
                    // Here I do nothing
                }
				// 4) Child is added in the priority queue and will be explored according to it's score
                else {
                    openQueue.enqueue(child);
                }
            })
        }
    }
}