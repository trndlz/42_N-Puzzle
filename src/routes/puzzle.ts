import express = require("express");
import { Request, Response } from "express";
import Solver from "../Solver";
const router = express.Router();

router.post("/", (req: Request, res: Response) => {

    const rawPuzzle = req.body.rawPuzzle;
    const heuristicsInput = req.body.heuristics;
    const searchAlgo = req.body.searchAlgo;
    const aStarWeight = parseInt(req.body.aStarWeight, 10);

    if (!rawPuzzle) {
        return res.status(200).json({
            "error": true,
            "details": ["No input"],
        })
    }  
    const solver = new Solver(rawPuzzle, heuristicsInput, searchAlgo, aStarWeight);
    if (solver.hasError.length > 0) {
        return res.status(200).json({
            "error": true,
            "details": solver.hasError,
        })
    } else {
        const start = +new Date();
        solver.aStar();
        if (!solver.isSolutionFound) {
            return res.status(200).json({
                "error": true,
                "details": ["Puzzle could not be solved :("]
            })
        }
        const elapsed = +new Date() - start;
        return res.status(200).json({
            "error": false,
            "moves": solver.solutionPath.length - 1,
            "path": solver.solutionPath.map(e => e.currentPuzzle.toString()),
            "timer": elapsed + "ms",
            "target": solver.targetBoard.toString(),
            "heuristics": solver.heuristics,
            "timeComplexity": solver.timeComplexity,
            "sizeComplexity": solver.sizeComplexity,
        })
    }
});

export default router;
