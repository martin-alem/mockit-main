import { Request, Response, NextFunction } from "express";
import ErrorHandler from "./../utils/ErrorHandler.js";
import Logger from "./../utils/Logger.js";
import mongoose from "mongoose";
import QuestionModel from "./../model/QuestionModel.js";
import { findOne } from "./../service/query.js";

async function getQuestion(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { questionId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(questionId)) {
      res.status(400).json({ status: "fail", statusCode: 400, message: "invalid field found" });
    } else {
      const question = await findOne(QuestionModel, { _id: questionId });
      if (question) {
        res.status(200).json({ status: "ok", statusCode: 200, question });
      } else {
        next(new ErrorHandler("Internal server error", 500));
      }
    }
  } catch (error) {
    Logger.log("error", error as Error, import.meta.url);
    next(new ErrorHandler("Internal server error", 500));
  }
}

export default getQuestion;
