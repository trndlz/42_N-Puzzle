
import * as bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import routes from "./routes";
import { spiralArray } from "./components/spiralArray";

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