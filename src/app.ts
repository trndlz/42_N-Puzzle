
import * as bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import routes from "./routes";

const spiralArray = (n) => {
    const result = new Array(n);
    for (let p = 0; p < result.length; p++) {
        result[p] = new Array(n);
    }
    let counter = 1;
    let startCol = 0;
    let endCol = n - 1;
    let startRow = 0;
    let endRow = n - 1;
    const total = n * n;
    while (startCol <= endCol && startRow <= endRow) {
        for (let i = startCol; i <= endCol; i++) {
            result[startRow][i] = counter === total ? 0 : counter++;
        }
        startRow++;
        for (let j = startRow; j <= endRow; j++) {
            result[j][endCol] = counter === total ? 0 : counter++;
        }
        endCol--;
        for (let i = endCol; i >= startCol; i--) {
            result[endRow][i] = counter === total ? 0 : counter++;
        }
        endRow--;
        for (let i = endRow; i >= startRow; i--) {
            result[i][startCol] = counter === total ? 0 : counter++;
        }
        startCol++;
    }
    return result;

}


class App {

    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
        const a = spiralArray(5)
        a.forEach(i => console.log(i))
    }



    private config(): void {
        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use("/api/v1", routes);
    }
}

export default new App().app;