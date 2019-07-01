import express = require("express");
import { Request, Response } from "express";
import fs from "fs";
import Solver from "../Solver";
const router = express.Router();

router.get("/", (req: Request, res: Response) => {

    const testPuzzle = fs.readFileSync("generatePuzzlesInput/solvable/5-size3").toString("utf-8");      
    const solver = new Solver({
        inputStr: testPuzzle,
        heuristics: "manhattan"
    });
    if (solver.hasError.length > 0) {
        return res.status(200).json({
            "error": "Error in input file",
            "details": solver.hasError.map(e => e + "\n"),
        })
    } else {
        const start = +new Date();
        solver.aStar();
        const elapsed = +new Date() - start;
        return res.status(200).json({
            "moves": solver.solutionPath.length - 1,
            "path": solver.solutionPath.map(e => e.currentPuzzle.toString()),
            "timer": elapsed + "ms",
        })
    }
});
export default router;
