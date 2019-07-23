import TargetBoard from "./TargetBoard";
import { consoleTestResultHandler } from "tslint/lib/test";

const swapEmpty = (s, p) => {
    let index = -1;
    p.forEach((v, i) => {
        if (v === 0) {
            index = i;
        }
    })
    const poss = [];
	if (index % s > 0) {
		poss.push(index - 1);
	}
	if (index % s < s - 1) {
		poss.push(index + 1)
	}
	if (Math.floor(index / s) > 0) {
		poss.push(index - s)
	}
	if (Math.floor(index / s) < s - 1) {
		poss.push(index + s)
    }
    const switcher = poss[Math.floor(Math.random() * poss.length)];
	p[index] = p[switcher]
    p[switcher] = 0
}

const RandomBoard = (size) => {
    let puzzle = TargetBoard(size);
    for (let i = 0; i < 500; i++) {
        swapEmpty(size, puzzle);
    }
    return BoardToString(puzzle, size);
}

const BoardToString = (board, size) => {
    let str = "";
    board.forEach((v, i) => {
        if ((i + 1) % size === 0) {
            str += v+"\n";
        } else {
            str += v+"  ";
        }
    })
    return str;
}

export default RandomBoard;
