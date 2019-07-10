import { parseInputString } from "./Parser";
import { IParsedData, board2D, board1D } from "./Types";
import { spiralArray } from "./components/spiralArray";
import { isEqual, flatten } from "lodash";
import NBoard from "./Puzzle";
import PriorityQueue from "./PriorityQueue";
import { BloomFilter } from "bloomfilter";

export default class Solver {

    public size: number;
    public startBoard: board1D;
    public currentPuzzle: NBoard;
    public heuristics: string;
    public targetBoard: board1D;
    public moves: number;
    public hasError: string[];
    public solutionPath: NBoard[];

    // Time Complexity
    // Total number of states ever selected in the "opened" set
    public timeComplexity: number;
    // Size Complexity
    // Maximum number of states ever represented in memory at the same time during the search 
    public sizeComplexity: number;
    public isSolutionFound: boolean;
    public searchAlgo: string;
    public weight: number;

    constructor(inputStr: string, heuristics: string, searchAlgo: string, aStarWeight: number) {
        const puzzle = parseInputString(inputStr);
        const puzzleSize = puzzle.board.length;
        this.startBoard = flatten(puzzle.board);
        this.targetBoard = flatten(spiralArray(puzzleSize));
        this.size = puzzleSize;
        this.hasError = puzzle.error;
        this.heuristics = heuristics || "MANHATTAN";
        this.searchAlgo = searchAlgo || "A_STAR";
        this.weight = aStarWeight || 1.001;
        this.solutionPath = [];
        this.sizeComplexity = 0;
        this.timeComplexity = 1;
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
        let closedList = 0;
        // My closedSet is a new bloom filter
        const closedSet = new BloomFilter(32 * 1024 * 40000, 32);
        // I create the first Board with parsed input and then add it into the priority queue using enqueue() method
		const init = new NBoard(this.startBoard, this.targetBoard, 0, this.heuristics, this.searchAlgo, this.weight);
        const openQueue = new PriorityQueue();
        openQueue.enqueue(init);
        // If this this puzzle is already the target => Solution is found no A* is launched
		if (init.isTarget) {
            this.solutionPath.push(init);
            this.isSolutionFound = true;
        }
        while (!this.isSolutionFound && counter < 500000) {
            counter++;
			// currentPuzzle is Board on top of the PriorityQueue
            this.currentPuzzle = openQueue.dequeue();
            // As we "explore" this Board, a hash representing the board is added to the closedSet
            closedSet.add(this.currentPuzzle.currentPuzzle.toString());
            
			// I create an array of all possible moves of my current puzzle
            const children = this.currentPuzzle.childrenPuzzles.map(element => {
                return new NBoard(element, this.targetBoard, this.currentPuzzle.moves + 1, this.heuristics, this.searchAlgo, this.weight, this.currentPuzzle)
            });
            // For each child, 4 possibilities
            for (let c = 0; c < children.length; c++) {
				// 1) Child is the target => We're done and build the history path from this chid to the initial state
                if (children[c].isTarget) {
                    this.isSolutionFound = true;
                    this.sizeComplexity = openQueue.items.length + closedList;
                    this.buildHistory(children[c]);
                    break ;
                }
                // 2) Child has already been explored so it is in closedSet
                else if (closedSet.test(children[c].currentPuzzle.toString())) {
                    closedList++;
                }
				// 3) Child is added in the priority queue and will be explored according to it's score
                else {
                    this.timeComplexity++;
                    openQueue.enqueue(children[c]);
                }
            }
        }
    }
}