// Parsed data
export interface IParsedData {
    inputStr: string;
    heuristics: string;
}

export type board2D = number[][];

export type board1D = number[] ;

// Link between board and coordinates : pArray[y][x] ! Careful !
export interface ICoord {
    x: number;
    y: number;
}