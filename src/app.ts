
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
        const a = spiralArray(5)
        // a.forEach(i => console.log(i))

        const test = new NPuzzle({
            inputStr: "1 2 3 4 5 6 7 8 0",
            heuristics: "manhattan",
            size: 8,
        })

        const bbb = fs.readFileSync("test1").toString("utf-8");
        // console.log(bbb)
        const ba = test.parseInputString(bbb)
        console.log(ba)
        const aze = test.getZeroPosition(ba)
        const ppp = test.createNewPuzzle(ba, aze, {"x": 1, "y": 1})
        console.log(ppp)
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