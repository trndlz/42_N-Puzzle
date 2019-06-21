
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
        const a = spiralArray(3)
        // console.table(a)

        
        const test = new NPuzzle({
            inputStr: "1 2 3 4 5 6 7 8 0",
            heuristics: "manhattan",
        })

        const bbb = fs.readFileSync("test1").toString("utf-8");
        const cb = test.parseInputString(bbb)
        // console.log(ba)
        console.table(cb)
        const z = test.getNeighboursZero(cb);
        console.table(z)
        z.map((coord) => {
            const newW = test.swapZeroPosition(cb, test.getZeroPosition(cb), coord)
            console.table(newW)
        })
        
        console.log(test.manhattanPriority(cb, a, 0))
        // console.log(cb)


        

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