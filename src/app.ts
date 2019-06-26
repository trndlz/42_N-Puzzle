
import * as bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import routes from "./routes";
import { spiralArray } from "./components/spiralArray";
import NPuzzle from "./Puzzle";
import fs from "fs";
import Solver from "./Solver";
import { parseInputString, isBoardSolvable } from "./Parser";

class App {

    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
        const dim = 3;
        const a = spiralArray(dim)
        const testPuzzle = fs.readFileSync("generatePuzzlesInput/solvable/3-size3").toString("utf-8");
        const puzzle = parseInputString(testPuzzle);
        

        const solver = new Solver({
            inputStr: testPuzzle,
            heuristics: "manhattan"
        });
        if (solver.hasError.length) {
            console.log("Error in input file:");
            solver.hasError.forEach(e => console.log(e));
        } else {
            solver.aStar();
        }
        
    }

    private config(): void {
        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use("gi/api/v1", routes);
    }
}

export default new App().app;