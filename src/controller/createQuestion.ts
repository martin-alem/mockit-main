import { Request, Response, NextFunction } from "express";
import ErrorHandler from "./../utils/ErrorHandler.js";
import Logger from "./../utils/Logger.js";
import QuestionModel from "./../model/QuestionModel.js";
import { insertOne } from "./../service/query.js";

async function createQuestion(req: Request, res: Response, next: NextFunction) {
  try {
    const { title, editorContent, difficulty } = req.body;
    const data = { title, content: editorContent, difficulty, createdAt: new Date() };
    const result = await insertOne(QuestionModel, data);
    if (result) {
      res.status(201).json({ status: "ok", statusCode: 201, question: result });
    } else {
      next(new ErrorHandler("Internal server error", 500));
    }
  } catch (error) {
    Logger.log("error", error as Error, import.meta.url);
    next(new ErrorHandler("Internal server error", 500));
  }
}

export default createQuestion;
