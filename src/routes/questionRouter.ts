import express, { Request, Response, NextFunction, Router } from "express";
import ErrorHandler from "./../utils/ErrorHandler.js";
import getAllQuestion from "./../controller/getAllQuestion.js";
import createQuestion from "./../controller/createQuestion.js";
import validateQuestionMiddleware from "./../middleware/validateQuestionMiddleware.js";

const questionRouter: Router = express.Router();

questionRouter.route("/").get([getAllQuestion]).post([validateQuestionMiddleware, createQuestion]).put([]).delete([]);

questionRouter.use((error: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
  res.status(error.statusCode).json({ status: "fail", statusCode: error.statusCode, message: error.message });
});
export default questionRouter;
