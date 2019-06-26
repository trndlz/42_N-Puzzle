
import { spiralArray } from "./components/spiralArray";
import fs from "fs";
import { range } from "lodash";
import { parseInputString, isBoardSolvable } from "./Parser";

class Test {
    public testSolvability() {
        const dimensions = range(3, 7);
        const puzzlesPerDim = range(1, 30);
        const solvability = [{
            path: "puzzlesInput/solvable/",
            solvable: true
        },
        {
            path: "puzzlesInput/unsolvable/",
            solvable: false
        }];
        dimensions.forEach(d => {
            puzzlesPerDim.forEach(p => {
                const target = spiralArray(d);
                solvability.forEach((s) => {
                    const testPuzzle = fs.readFileSync(s.path+p+"-size"+d).toString("utf-8");
                    const puzzle = parseInputString(testPuzzle);
                    const isSolvable = isBoardSolvable(target, puzzle)
                    if (s.solvable === isSolvable) {
                        console.log("dim", d, "puzzle", p, "solvable", s.solvable, "OK")
                    } else {
                        console.log("dim", d, "puzzle", p, "solvable", s.solvable, "NOK")
                    }
                })
            })
        })
    }
}

export default new Test().testSolvability;