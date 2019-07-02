import express = require("express");
import { Request, Response } from "express";
import fs from "fs";
import Solver from "../Solver";
const router = express.Router();

router.post("/", (req: Request, res: Response) => {

    const rawPuzzle = req.body.rawPuzzle;
    const heuristics = req.body.heuristics;

    if (!rawPuzzle) {
        return res.status(200).json({
            "error": "Error in input file",
            "details": "No input",
        })
    }  
    const solver = new Solver({
        inputStr: rawPuzzle,
        heuristics: heuristics || "Manhattan"
    });
    if (solver.hasError.length > 0) {
        return res.status(200).json({
            "error": "Error in input file",
            "details": solver.hasError,
        })
    } else {
        const start = +new Date();
        solver.aStar();
        const elapsed = +new Date() - start;
        return res.status(200).json({
            "moves": solver.solutionPath.length - 1,
            "path": solver.solutionPath.map(e => e.currentPuzzle.toString()),
            "timer": elapsed + "ms",
            "target": solver.targetBoard.toString(),
            "heuristics": solver.heuristics,
        })
    }
});
export default router;
