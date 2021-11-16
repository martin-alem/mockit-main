import { Request, Response, NextFunction } from "express";
import ErrorHandler from "./../utils/ErrorHandler.js";
import Logger from "./../utils/Logger.js";

function getAllQuestion(req: Request, res: Response, next: NextFunction) {
  try {
    res.status(200).json({ questions: [] });
  } catch (error) {
      Logger.log( "error", error as Error, import.meta.url );
      next(new ErrorHandler("Internal server error", 500));
  }
}

export default getAllQuestion;
