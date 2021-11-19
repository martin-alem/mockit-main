import express, { Request, Response, NextFunction, Router } from "express";
import ErrorHandler from "../utils/ErrorHandler.js";
import createInterview from "./../controller/createInterview.js";
import validateInterviewMiddleware from "./../middleware/validateInterviewMiddleware.js";
import getInterview from "./../controller/getInterview.js"
const interviewRouter: Router = express.Router();

interviewRouter.post( "/", [ validateInterviewMiddleware, createInterview ] );
interviewRouter.get("/:room", [getInterview])

interviewRouter.use((error: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
  res.status(error.statusCode).json({ status: "fail", statusCode: error.statusCode, message: error.message });
});
export default interviewRouter;
