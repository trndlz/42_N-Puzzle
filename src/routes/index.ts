import { Router } from "express";
import Puzzle from "./puzzle"
const router = Router();
router.use("/puzzle", Puzzle);
export default router;