import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import ErrorHandler from "./../utils/ErrorHandler.js";
import Logger from "./../utils/Logger.js";
import QuestionModel from "./../model/QuestionModel.js";
import { findAndDelete } from "./../service/query.js";

async function deleteQuestion(req: Request, res: Response, next: NextFunction) {
  try {
    const { questionId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(questionId)) {
      res.status(400).json({ status: "fail", statusCode: 400, message: "invalid field provided" });
    } else {
      const result = await findAndDelete(QuestionModel, { _id: questionId });
      if (result) {
        res.status(200).json({ status: "ok", statusCode: 200, question: result });
      } else {
        next(new ErrorHandler("Internal server error", 500));
      }
    }
  } catch (error) {
    Logger.log("error", error as Error, import.meta.url);
    next(new ErrorHandler("Internal server error", 500));
  }
}

export default deleteQuestion;
