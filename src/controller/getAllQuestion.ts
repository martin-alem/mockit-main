import { Request, Response, NextFunction } from "express";
import ErrorHandler from "./../utils/ErrorHandler.js";
import Logger from "./../utils/Logger.js";
import QuestionModel from "./../model/QuestionModel.js";
import { findAll } from "./../service/query.js";

async function getAllQuestion(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const questions = await findAll(QuestionModel);
    if (questions) {
      res.status(200).json({ status: "ok", statusCode: 200, length: questions.length, questions });
    } else {
      next(new ErrorHandler("Internal server error", 500));
    }
  } catch (error) {
    Logger.log("error", error as Error, import.meta.url);
    next(new ErrorHandler("Internal server error", 500));
  }
}

export default getAllQuestion;
