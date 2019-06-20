
import * as bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import routes from "./routes";
import { spiralArray } from "./components/spiralArray";
import NPuzzle, { puzzleArray } from "./Puzzle";
import fs from "fs";

class App {

    public app: express.Application;

   

    constructor() {
        this.app = express();
        this.config();
        const a = spiralArray(4)

        
        const test = new NPuzzle({
            inputStr: "1 2 3 4 5 6 7 8 0",
            heuristics: "manhattan",
        })

        const bbb = fs.readFileSync("test1").toString("utf-8");
        const ccc = fs.readFileSync("test2").toString("utf-8");
        // console.log(bbb)
        const ba = test.parseInputString(bbb)
        const cb = test.parseInputString(ccc)
        // console.log(ba)
        // console.log(test.getNeighboursZero(ba))
        // console.log(cb)
        // console.log(test.getNeighboursZero(cb))
        console.log(test.hammingPriority(ba, cb, 0))
        console.log(test.manhattanPriority(ba, cb, 0))


        

        // console.log(aze)

        
    }  

    private config(): void {
        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use("/api/v1", routes);
    }
}

export default new App().app;