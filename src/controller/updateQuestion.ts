import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import ErrorHandler from "./../utils/ErrorHandler.js";
import Logger from "./../utils/Logger.js";
import QuestionModel from "./../model/QuestionModel.js";
import { findAndUpdate } from "./../service/query.js";

async function updateQuestion(req: Request, res: Response, next: NextFunction) {
  try {
    const { title, editorContent, difficulty } = req.body;
    const { questionId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(questionId)) {
      res.status(400).json({ status: "fail", statusCode: 400, message: "invalid field provided" });
    }
    const data = { title, content: editorContent, difficulty, createdAt: new Date() };
    const result = await findAndUpdate(QuestionModel, { _id: questionId }, data);
    if (result) {
      res.status(200).json({ status: "ok", statusCode: 200, question: result });
    } else {
      next(new ErrorHandler("Internal server error", 500));
    }
  } catch (error) {
    Logger.log("error", error as Error, import.meta.url);
    next(new ErrorHandler("Internal server error", 500));
  }
}

export default updateQuestion;
