
import * as bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import routes from "./routes";
import { spiralArray } from "./components/spiralArray";
import NPuzzle from "./Puzzle";
import fs from "fs";

class App {

    public app: express.Application;



    constructor() {
        this.app = express();
        this.config();
        const a = spiralArray(3)
        // console.table(a)


        const testPuzzle = fs.readFileSync("test1").toString("utf-8");
        const test = new NPuzzle({
            inputStr: testPuzzle,
            heuristics: "TEST"
        }, 5)

        
        const puzzle = test.startPuzzle;
        const initBoard = test.createNode(puzzle, 0);
        console.table(puzzle)
        console.log(initBoard.h)
        initBoard.childrePuzzle.forEach(b => {
            const secBoard = test.createNode(b, 1)
            console.table(b);
            console.log(secBoard.h)
        })
        // console.table(initBoard.childrePuzzle)
    }

    private config(): void {
        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use("/api/v1", routes);
    }
}

export default new App().app;