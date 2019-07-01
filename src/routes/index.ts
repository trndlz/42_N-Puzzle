import { Router } from "express";
import Puzzle from "./puzzle"
const router = Router();
router.use("/", Puzzle);
export default router;