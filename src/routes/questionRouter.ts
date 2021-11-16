import express, { Request, Response, NextFunction, Router } from "express";
import ErrorHandler from "./../utils/ErrorHandler.js";
import getAllQuestion from "./../controller/getAllQuestion.js";

const questionRouter: Router = express.Router();

questionRouter.route("/").get([getAllQuestion]).post([]).put([]).delete([]);

questionRouter.use((error: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
  res.status(error.statusCode).json({ status: "fail", statusCode: error.statusCode, message: error.message });
});
export default questionRouter;
