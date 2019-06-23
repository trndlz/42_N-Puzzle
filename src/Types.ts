// Parsed data
export interface IParsedData {
    inputStr: string;
    heuristics: string;
}

export type board = number[][];

// Link between board and coordinates : pArray[y][x] ! Careful !
export interface ICoord {
    x: number;
    y: number;
}

export interface INode {
    board: board;
    size: number;
    f: number;
    g: number;
    h: number;
    isTarget: boolean;
    parentNode?: INode;
    childrenNode?: INode[];
    childrePuzzle: board[];
    open: boolean;
}