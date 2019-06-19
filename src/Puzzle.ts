// const targetPuzzle: Puzzle {

// }

// interface Puzzle {
//     initialArray 
// }

enum Direction {
    Up,
    Down,
    Left,
    Right,
}

export interface IPuzzleInput {
    inputStr: string;
    heuristics: string;
    size: number;
    solvable?: boolean;
}

type puzzleArray = number[][];

interface IPuzzleNode {
    values: puzzleArray;
    f: number;
    g: number;
    h: number;
    parentNode: IPuzzleNode;
}

export default class NPuzzle {
    public input: IPuzzleInput;
    constructor(input: IPuzzleInput) {
        this.input = input;
    }

    public parseInputString(input: string) {
        const isError = false;
        const lines = input.split(/\n/);
        lines.forEach(line => {
            if (line[0] !== "#" && line.match(/[^\d]/g)) {
                console.log(line.replace(/\s/g, ""))
            }
        })

        // const puzzleArray = lines.map(line => line.match(/[\d]+/g)).filter(Boolean);
        console.log(lines);
        // const size = lines.map(line => line.find(i => i.length === 1)
        // console.log(size);
    }

    // parentNode(input: IPuzzleInput): IPuzzleNode {
        
    // }
}