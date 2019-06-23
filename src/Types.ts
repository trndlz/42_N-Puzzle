// Parsed data
export interface IParsedData {
    inputStr: string;
    heuristics: string;
}

export type puzzleArray = number[][];

// Link between puzzleArray and coordinates : pArray[y][x] ! Careful !
export interface ICoord {
    x: number;
    y: number;
}

export interface IBoard {
    board: puzzleArray;
    size: number;
    f: number;
    g: number;
    h: number;
    isTarget: boolean;
    parentNode?: IBoard;
    childrenNode?: IBoard[];
    childrePuzzle: puzzleArray[];
}