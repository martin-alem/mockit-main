import { Request, Response, NextFunction } from "express";
import ErrorHandler from "./../utils/ErrorHandler.js";
import Logger from "./../utils/Logger.js";
import InterviewModel from "./../model/InterviewModel.js";
import QuestionModel from "./../model/QuestionModel.js";
import { insertOne, findAll } from "./../service/query.js";

async function createInterview(req: Request, res: Response, next: NextFunction) {
  try {
    const interview = req.body;
    if (interview["question"] === "") {
      // pick a random question from database
      const result = await findAll(QuestionModel);
      if (result) {
        const randomInt = Math.floor(Math.random() + result.length - 1);
        const question = result[randomInt];
        interview["question"] = question["_id"];
      } else {
        next(new ErrorHandler("Internal server error", 500));
      }
    }
    interview["startTime"] = new Date();
    const result = await insertOne(InterviewModel, interview);
    if (result) {
      res.status(201).json({ status: "ok", statusCode: 201, interview });
    } else {
      next(new ErrorHandler("Internal server error", 500));
    }
  } catch (error) {
    Logger.log("error", error as Error, import.meta.url);
    next(new ErrorHandler("Internal server error", 500));
  }
}

export default createInterview;
