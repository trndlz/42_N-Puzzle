import express = require("express");
import { Request, Response } from "express";
const router = express.Router();

router.get("/", (req: Request, res: Response) => {
     console.log(req.body)
     return res.status(200).json({
                      hello: true,
                      messsage: "rewrewr"
                  });
});
export default router;
