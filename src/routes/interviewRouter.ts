import express, { Request, Response, NextFunction, Router } from "express";
import ErrorHandler from "../utils/ErrorHandler.js";
import createInterview from "./../controller/createInterview.js";
import validateInterviewMiddleware from "./../middleware/validateInterviewMiddleware.js";
const interviewRouter: Router = express.Router();

interviewRouter.post("/", [validateInterviewMiddleware, createInterview]);

interviewRouter.use((error: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
  res.status(error.statusCode).json({ status: "fail", statusCode: error.statusCode, message: error.message });
});
export default interviewRouter;
