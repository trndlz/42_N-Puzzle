
import * as bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import routes from "./routes";
import { spiralArray } from "./components/spiralArray";
import NPuzzle from "./Puzzle";
import fs from "fs";
import Solver from "./Solver";

class App {

    public app: express.Application;



    constructor() {
        this.app = express();
        this.config();
        const a = spiralArray(3)
        // console.table(a)


        const testPuzzle = fs.readFileSync("test1").toString("utf-8");
        const solver = new Solver({
            inputStr: testPuzzle,
            heuristics: "BLQBLQ"
        })
        solver.aStar()
    }

    private config(): void {
        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use("/api/v1", routes);
    }
}

export default new App().app;